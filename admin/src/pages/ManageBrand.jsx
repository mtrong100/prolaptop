import React from "react";
import TitleSection from "../components/TitleSection";
import {
  Input,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import { formatDate } from "../utils/helper";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import useManageBrands from "../hooks/useManageBrands";

const TABLE_HEAD = ["ID", "Tên", "Tổng sản phẩm", "Ngày thêm", "Thao tác"];

const ManageBrand = () => {
  const {
    isAdding,
    isUpdating,
    query,
    setQuery,
    val,
    setVal,
    updateVal,
    setUpdateVal,
    open,
    filterBrands,
    handleCreateBrand,
    handleDeleteBrand,
    handleUpdateBrand,
    handleOpenDialog,
    handleOpen,
  } = useManageBrands();

  return (
    <div>
      <TitleSection>Quản lí thương hiệu</TitleSection>

      <div className="flex items-center justify-between mt-5">
        <div className=" w-full max-w-[450px] flex items-center gap-1">
          <Input
            size="lg"
            color="red"
            label="Thương hiệu"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Button
            color="red"
            type="submit"
            disabled={isAdding}
            onClick={handleCreateBrand}
            className="w-[180px] h-[44px] flex items-center justify-center"
          >
            {isAdding ? "Đang chờ..." : "Thêm mới"}
          </Button>
        </div>

        <div className="flex items-center gap-1 w-full max-w-xs">
          <Input
            size="lg"
            color="red"
            label="Tìm kiếm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <IconButton color="red" size="md" className="flex-shrink-0 h-[44px]">
            <IoSearchOutline size={20} color="white" />
          </IconButton>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
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
              {filterBrands.map((item) => {
                return (
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
                      <Chip
                        value={item?.name || ""}
                        size="sm"
                        variant="ghost"
                        className="w-fit"
                      />
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.productCount}
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
                      <div className="flex items-center gap-3">
                        <IconButton
                          onClick={() => handleOpenDialog(item)}
                          color="green"
                          size="md"
                        >
                          <MdOutlineEdit size={20} color="white" />
                        </IconButton>
                        <IconButton
                          color="red"
                          size="md"
                          onClick={() => handleDeleteBrand(item?._id)}
                        >
                          <MdDelete size={20} color="white" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} size="sm">
        <DialogHeader className="text-xl">Cập nhật thương hiệu</DialogHeader>
        <DialogBody>
          <Input
            size="lg"
            color="blue"
            label="Thương hiệu"
            value={updateVal.name}
            onChange={(e) =>
              setUpdateVal({ ...updateVal, name: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button
            disabled={isUpdating}
            variant="gradient"
            color="green"
            onClick={handleUpdateBrand}
          >
            <span>Cập nhật</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ManageBrand;
