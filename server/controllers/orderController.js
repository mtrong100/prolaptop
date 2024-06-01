import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { sendEmailCompletePurchase } from "../services/emailService.js";
import dotenv from "dotenv";
dotenv.config();
const stripe = await import("stripe").then((module) =>
  module.default(process.env.STRIPE_SECRET_KEY)
);

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

export const stripeCheckout = async (req, res) => {
  const { products, shippingMethod, couponCodeUsed } = req.body;

  try {
    const lineItems = products.map((item) => {
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      };
    });

    let couponId;
    if (couponCodeUsed && couponCodeUsed.name) {
      try {
        const existingCoupon = await stripe.coupons.retrieve(
          couponCodeUsed.name
        );
        couponId = existingCoupon.id;
      } catch (error) {
        if (error.code === "resource_missing") {
          const coupon = await stripe.coupons.create({
            percent_off: couponCodeUsed.discount,
            duration: "once",
            id: couponCodeUsed.name,
          });
          couponId = coupon.id;
        } else {
          throw error;
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.LOCAL_CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.LOCAL_CLIENT_URL}/checkout`,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["VN"],
      },
      discounts: couponId ? [{ coupon: couponId }] : [],
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingMethod.price,
              currency: "vnd",
            },
            display_name: shippingMethod.name,
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
    });

    return res.json({ id: session.id });
  } catch (error) {
    console.log("Error in stripeCheckout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkoutSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const [session, lineItems] = await Promise.all([
      stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent.payment_method"],
      }),
      stripe.checkout.sessions.listLineItems(sessionId),
    ]);

    return res.json({ session, lineItems });
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
