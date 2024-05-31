import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { sendEmailCompletePurchase } from "../services/emailService.js";
import dotenv from "dotenv";
import crypto from "crypto";
import dateFormat from "dateformat";
import querystring from "qs";

dotenv.config();

const ORDER_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "desc",
};

export const getOrderCollection = async (req, res) => {
  const { status } = req.query;

  try {
    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in send getOrderCollection controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  const {
    page = ORDER_QUERY.PAGE,
    limit = ORDER_QUERY.LIMIT,
    order = ORDER_QUERY.ORDER,
    status,
  } = req.query;
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const filter = {};
    if (status) filter.status = status;

    const options = {
      page,
      limit,
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const orders = await Order.paginate(filter, options);

    if (!orders.docs || orders.docs.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getOrders controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log("Error in getOrderDetail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const {
      page = ORDER_QUERY.PAGE,
      limit = ORDER_QUERY.LIMIT,
      order = ORDER_QUERY.ORDER,
      status,
    } = req.query;

    const userId = req.params.id;

    const filter = { user: userId };

    if (status) {
      filter.status = status;
    }

    const options = {
      page,
      limit,
      sort: {
        createdAt: order === "asc" ? 1 : -1,
      },
    };

    const orders = await Order.paginate(filter, options);

    if (!orders.docs || orders.docs.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getUserOrders controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      shippingMethod,
      couponCodeUsed,
      paymentMethod,
      totalCost,
    } = req.body;

    for (const order of orderItems) {
      await Product.findOneAndUpdate(
        {
          _id: order.id,
          stock: { $gte: order.quantity },
        },
        {
          $inc: {
            stock: -order.quantity,
            sold: +order.quantity,
          },
        },
        { new: true }
      );
    }

    const newOrder = new Order(req.body);
    await newOrder.save();

    await sendEmailCompletePurchase(
      orderItems,
      shippingAddress,
      shippingMethod,
      couponCodeUsed,
      paymentMethod,
      totalCost
    );

    return res.status(200).json(newOrder);
  } catch (error) {
    console.log("Error in createOrder controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const userRole = req.user.role;
    const { status } = req.body;
    const { id } = req.params;

    // Check if the user is an admin
    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ error: "You do not have permission to perform this action" });
    }

    // Validate that the order ID is provided
    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Validate that the status is provided
    if (!status) {
      return res.status(400).json({ error: "Order status is required" });
    }

    // Update the order in the database
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status },
      {
        new: true,
      }
    );

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Return the updated order
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error in updateOrder controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (order.status === "Đã hủy") {
      return res.status(400).json({ message: "Đơn hàng đã bị hủy trước đó" });
    }

    // Check if the order is in the correct status to be canceled
    if (order.status === "Chờ xác nhận") {
      order.status = "Đã hủy";
      await order.save();
      return res.status(200).json({ message: "Hủy đơn hàng thành công" });
    } else {
      return res
        .status(400)
        .json({ message: "Không thể hủy đơn hàng lúc này" });
    }
  } catch (error) {
    console.error("Error in cancelOrder controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const vnPayPayment = async (req, res) => {
  try {
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var config = require("config");
    var dateFormat = require("dateformat");

    var tmnCode = config.get(`${process.env.VNPAY_TMN_CODE}`);
    var secretKey = config.get(`${process.env.VNPAY_HASH_SECRET}`);
    var vnpUrl = config.get(`${process.env.VNPAY_URL}`);
    var returnUrl = config.get(`${process.env.VNPAY_RETURN_URL}`);

    var date = new Date();

    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl);
  } catch (error) {
    console.error("Error in vnPayPayment controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
