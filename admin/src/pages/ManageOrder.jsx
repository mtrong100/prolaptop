import React from "react";
import TitleSection from "../components/TitleSection";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
  IconButton,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineFileDownload,
  MdDelete,
} from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { displayStatus, formatCurrencyVND, formatDate } from "../utils/helper";
import useManageOrder from "../hooks/useManageOrder";
import { IoEye, IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { ORDER_STATUS } from "../utils/constants";
import { useEffect } from "react";
import { updateOrderApi } from "../api/orderApi";
import { toast } from "react-toastify";

const ManageOrder = () => {
  const {
    loading,
    paginate,
    query,
    filterMyorders,
    handleNextPage,
    handlePrevPage,
    handleQueryOrder,
    setStatus,
    status,
    handleDeleteOrder,
  } = useManageOrder();

  return (
    <div>
      <TitleSection>Quản lí đơn hàng</TitleSection>

      <div className="mt-8  flex items-center justify-between">
        <div className="w-72">
          <Select
            size="lg"
            label="Tình trạng"
            color="red"
            value={status}
            onChange={(val) => setStatus(val)}
          >
            {ORDER_STATUS.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-1 w-full max-w-xs">
          <Input
            size="lg"
            color="red"
            label="Tìm kiếm"
            value={query}
            onChange={handleQueryOrder}
            className="w-full"
          />
          <IconButton color="red" size="md" className="flex-shrink-0 h-[44px]">
            <IoSearchOutline size={20} color="white" />
          </IconButton>
        </div>
      </div>

      <div className="mt-5">
        {loading && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Đang tìm kiếm...
          </p>
        )}

        {!loading && filterMyorders?.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Không tìm thấy đơn hàng
          </p>
        ) : (
          <TableWithStripedRows
            results={filterMyorders}
            onDelete={handleDeleteOrder}
          />
        )}
      </div>

      {paginate.totalDocs > 12 && (
        <div className="mt-10 mb-10 flex items-center justify-end gap-4">
          <IconButton onClick={handlePrevPage} size="md">
            <MdChevronLeft size={25} color="white" />
          </IconButton>
          <div className="text-xl font-semibold opacity-60">
            {paginate.currentPage}/{paginate.totalPages}
          </div>
          <IconButton onClick={handleNextPage} size="md">
            <MdChevronRight size={25} color="white" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;

const TableWithStripedRows = ({ results = [], onDelete }) => {
  return (
    <div className="h-full w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              ID
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Ngày đặt hàng
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tổng tiền
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Tình trạng đơn hàng
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item) => (
            <tr key={item?._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item?._id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {formatDate(item?.createdAt)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="h5" color="red" className="font-bold">
                  {formatCurrencyVND(item?.totalCost)}
                </Typography>
              </td>
              <td className="p-4">
                <Chip
                  variant="ghost"
                  className="w-fit font-bold"
                  size="lg"
                  color={displayStatus(item?.status)}
                  value={item?.status}
                ></Chip>
              </td>
              <td className="p-4 ">
                <div className="flex items-center gap-3">
                  <DialogDefault order={item} />
                  <IconButton
                    onClick={() => onDelete(item?._id)}
                    color="red"
                    size="md"
                  >
                    <MdDelete size={20} color="white" />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function DialogDefault({ order }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const exportToPDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Add title "Billing Details" centered
    doc.setFontSize(20);
    doc.setTextColor("#333333");
    doc.text("Hóa đơn đặt hàng", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add content to the PDF document
    doc.setFontSize(12);
    doc.setTextColor("#666666");
    doc.text(`Order ID: #${order?._id}`, 20, 40);
    doc.text(`Người mua: ${order?.shippingAddress?.fullName}`, 20, 50);
    doc.text(`Ngày: ${formatDate(order?.createdAt)}`, 20, 60);
    doc.text(`Phương thức thanh toán: ${order?.paymentMethod}`, 20, 60);

    // Additional information
    if (order?.couponCodeUsed) {
      doc.text(
        `Mã giảm giá: ${
          order?.couponCodeUsed?.name - order?.couponCodeUsed?.discount
        }`,
        20,
        80
      );
    }
    if (order?.shippingMethod) {
      doc.text(
        `Phí giao hàng: ${order?.shippingMethod?.name} - Cost ${order?.shippingMethod?.price}$`,
        20,
        90
      );
    }

    if (order?.totalCost) {
      doc.text(`Tổng: ${formatCurrencyVND(order?.totalCost)}`, 20, 100);
    }

    // Add a table for order items
    const orderItems = order?.orderItems || [];
    const tableData = orderItems.map((item) => [
      item.name,
      `$${item.price}`,
      `x${item.quantity}`,
      `$${formatCurrencyVND(item.quantity * item.price)}`,
    ]);
    doc.autoTable({
      startY: 120,
      head: [["Sản phẩm", "Giá tiền", "Số lượng", "Tổng"]],
      body: tableData,
      theme: "grid",
      styles: {
        font: "Arial",
        fontSize: 10,
        textColor: "#333333",
        lineWidth: 0.5,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
      },
    });

    // Add a footer with the current date
    const currentDate = formatDate(new Date());
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text(
      `Generated on: ${currentDate}`,
      doc.internal.pageSize.getWidth() - 70,
      doc.internal.pageSize.getHeight() - 10
    );

    // Save the PDF document
    doc.save("billing_details.pdf");
  };

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      await updateOrderApi(order?._id, { status });
      toast.success("Cập nhật đơn hàng hoàn tất");
    } catch (error) {
      toast.error("Lỗi cập nhật đơn hàng");
      console.log("Lỗi cập nhật đơn hàng: ", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (order) {
      setStatus(order?.status);
    }
  }, [order]);

  return (
    <>
      <IconButton color="blue" size="md" onClick={handleOpen} variant="filled">
        <IoEye size={20} color="white" />
      </IconButton>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader className="flex items-center justify-between">
          Mã đơn hàng: #{order?._id}{" "}
          <Button
            variant="gradient"
            color="red"
            onClick={exportToPDF}
            className="flex items-center gap-2"
          >
            <MdOutlineFileDownload size={20} />
            Xuất file PDF
          </Button>
        </DialogHeader>
        <DialogBody className="overflow-y-auto max-h-[600px]">
          {/* Billing Details */}
          <div className="flex flex-col border rounded-lg p-4 border-gray-400">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-semibold text-black">
                Chi tiết hóa đơn
              </h1>
              <div className="w-72">
                <Select
                  size="lg"
                  label="Tình trạng"
                  color="red"
                  value={status}
                  onChange={(val) => setStatus(val)}
                >
                  {ORDER_STATUS.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-gray-900">
                Người mua: {order?.shippingAddress?.fullName}
              </span>
              <span className="text-gray-900">
                Ngày: {formatDate(order?.createdAt)}
              </span>
              <span className="text-gray-900">
                Phương thức thanh toán: {order?.paymentMethod}
              </span>
              {order?.couponCodeUsed && (
                <span className="text-gray-900">
                  Mã giảm giá sử dụng:{" "}
                  <span className="uppercase text-blue-600 font-semibold">
                    {order?.couponCodeUsed?.name} -{" "}
                    {order?.couponCodeUsed?.discount}%
                  </span>
                </span>
              )}
              <span className="text-gray-900">
                Tiền ship: {order?.shippingMethod?.name} -{" "}
                <span className="text-green-600 font-semibold">
                  {formatCurrencyVND(order?.shippingMethod?.price)}
                </span>
              </span>
              <span className="text-gray-900">
                Tổng tiền:{" "}
                <span className="text-red-600 font-semibold text-xl">
                  {formatCurrencyVND(order?.totalCost)}
                </span>
              </span>
            </div>
          </div>

          {/* OrderItems table */}
          <table className="w-full text-left mt-5">
            <thead>
              <tr>
                <th className="border-b w-[500px] border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Sản phẫm
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Số lượng
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Giá tiền
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Tổng
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item) => (
                <tr key={item?._id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-5">
                      <div className="w-[60px] h-[60px] flex-shrink-0">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>{item?.name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal "
                    >
                      x{item?.quantity}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="font-semibold "
                    >
                      {formatCurrencyVND(item?.price)}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="h5"
                      color="red"
                      className="font-semibold"
                    >
                      {formatCurrencyVND(item.quantity * item.price)}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogBody>
        <DialogFooter>
          <div className="flex items-center gap-3">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Đóng</span>
            </Button>
            <Button
              variant="filled"
              color="green"
              disabled={loading}
              onClick={handleUpdateStatus}
              className="mr-1"
            >
              <span>{loading ? "Đang cập nhật" : "Cập nhật"}</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
