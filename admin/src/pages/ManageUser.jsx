/* eslint-disable react/display-name */
import React, { forwardRef, useRef } from "react";
import TitleSection from "../components/TitleSection";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  Button,
  Chip,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  List,
  ListItem,
  Switch,
} from "@material-tailwind/react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdDelete,
  MdOutlineFileDownload,
} from "react-icons/md";
import useManageUser from "../hooks/useManageUser";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";

const TABLE_HEAD = ["ID", "Tên", "Email", "Số điện thoại", "Khóa", "Thao tác"];

const ORDER_OPTIONS = [
  {
    label: "Mới nhất",
    value: "desc",
  },
  {
    label: "Cũ nhất",
    value: "asc",
  },
];

const ManageUser = () => {
  const tableRef = useRef(null);

  const {
    handleNextPage,
    handlePrevPage,
    handleDeleteUser,
    handleBlockUser,
    filterUsers,
    isLoading,
    filter,
    setFilter,
    paginate,
  } = useManageUser();

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleSection>Quản lí người dùng</TitleSection>
        <DownloadTableExcel
          filename="Bảng người dùng"
          sheet="Danh sách người dùng"
          currentTableRef={tableRef.current}
        >
          <Button
            color="green"
            variant="gradient"
            size="md"
            className="flex items-center gap-2"
          >
            <MdOutlineFileDownload size={20} />
            Tải về file excel
          </Button>
        </DownloadTableExcel>
      </div>

      {/* Action */}
      <div className="w-full grid grid-cols-[minmax(0,_1fr)_250px] gap-3 mt-8">
        <Input
          label="Tìm kiếm"
          size="lg"
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        />
        <Select
          size="lg"
          label="Sắp xếp theo"
          onChange={(val) => setFilter({ ...filter, order: val })}
        >
          {ORDER_OPTIONS.map((item) => (
            <Option value={item.value} key={item}>
              <span className={`capitalize font-semibold`}>{item.label}</span>
            </Option>
          ))}
        </Select>
      </div>

      {/* Render users */}
      <div className="mt-5">
        {isLoading && (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Đang tìm kiếm...
          </p>
        )}

        {!isLoading && filterUsers?.length === 0 ? (
          <p className="text-center my-5 text-lg opacity-60 font-semibold">
            Không tìm thấy người dùng
          </p>
        ) : (
          <TableWithStripedRows
            ref={tableRef}
            results={filterUsers}
            onDelete={handleDeleteUser}
            onSwitch={handleBlockUser}
          />
        )}
      </div>

      {paginate.totalDocs > 12 && (
        <div className="mt-5 mb-10 flex items-center justify-end gap-4">
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
export default ManageUser;

const TableWithStripedRows = forwardRef(
  ({ results = [], onDelete, onSwitch }, ref) => {
    const navigate = useNavigate();

    return (
      <div className="h-full w-full">
        <table ref={ref} className="w-full text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
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
                    {item?.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal "
                  >
                    {item?.email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal "
                  >
                    {item?.phone || "Chưa cập nhật"}
                  </Typography>
                </td>
                <td className="p-4">
                  <Switch
                    color="green"
                    checked={item?.blocked}
                    onChange={() => onSwitch(item?._id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <DialogDefault data={item} />
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
  }
);

export function DialogDefault({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <IconButton onClick={handleOpen} color="blue" size="md">
        <IoEye size={20} color="white" />
      </IconButton>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Thông tin người dùng</DialogHeader>
        <DialogBody>
          <div className="w-[120px] h-[120px] mx-auto">
            <img
              src={data?.avatar}
              alt={data?.name}
              className="img-cover rounded-lg"
            />
          </div>
          <List className="mt-3 text-sm">
            <ListItem>ID: {data?._id}</ListItem>
            <ListItem>
              Quyền:
              <Chip
                className="w-fit ml-2"
                color="red"
                size="sm"
                variant="ghost"
                value={data?.role}
              />
            </ListItem>
            <ListItem>Email: {data?.email}</ListItem>
            <ListItem>
              Địa chỉ:
              <Chip
                className="w-fit ml-2"
                color="gray"
                size="sm"
                variant="ghost"
                value={data?.address || " Chưa cập nhật"}
              />
            </ListItem>
            <ListItem>
              Số điện thoại:
              <Chip
                className="w-fit ml-2"
                color="gray"
                size="sm"
                variant="ghost"
                value={data?.phone || " Chưa cập nhật"}
              />
            </ListItem>
            <ListItem>
              Phương thức đăng nhập:
              <Chip
                className="w-fit ml-2"
                color="blue"
                size="sm"
                variant="ghost"
                value={data?.provider}
              />
            </ListItem>
            <ListItem>
              Tài khoản:
              <Chip
                className="w-fit ml-2"
                color="green"
                size="sm"
                variant="ghost"
                value={data?.verified && "Đã xác minh"}
              />
            </ListItem>
            <ListItem>
              Trạng thái:
              <Chip
                className="w-fit ml-2"
                color="green"
                size="sm"
                variant="ghost"
                value={data?.blocked ? "Đã bị khóa" : "Bình thường"}
              />
            </ListItem>
          </List>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
