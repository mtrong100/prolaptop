import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../validation/productSchema";
import TitleSection from "../components/TitleSection";
import { Select, Option, Button } from "@material-tailwind/react";
import JoditEditor from "jodit-react";
import FieldInput from "../components/FieldInput";
import FieldTexarea from "../components/FieldTexarea";
import useGetCategories from "../hooks/useGetCategories";
import {
  LAPTOP_BRANDS,
  LAPTOP_COLORS,
  LAPTOP_CPUS,
  LAPTOP_GRAPHIC_CARDS,
  LAPTOP_HARD_DRIVES,
  LAPTOP_RAMS,
  LAPTOP_SCREENS,
  PRODUCT_RATING,
} from "../utils/constants";
import { displayRating } from "../utils/helper";
import useCreateProduct from "../hooks/useCreateProduct";
import UploadProductThumbnail from "../components/UploadProductThumbnail";
import UploadProductImages from "../components/UploadProductImages";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      originalPrice: 0,
      discountPrice: 0,
      stock: 1000,
    },
  });

  const editor = useRef(null);
  const { categories } = useGetCategories();

  console.log(categories);

  const {
    handleUploadImages,
    handleCreateProduct,
    handleDeleteThumbnail,
    handleDeleteImage,
    setForm,
    form,
    loading,
    loadingImages,
    images,
    handleUploadThumbnail,
    loadingThumbnail,
    thumbnail,
  } = useCreateProduct();

  return (
    <div>
      <TitleSection>Form thêm mới sản phẩm</TitleSection>

      <div className="mt-5 w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="space-y-6"
        >
          <FieldInput
            labelTitle="Tên"
            labelText="Tên"
            register={register}
            name="name"
            errorMessage={errors?.name?.message}
          />

          <FieldTexarea
            labelTitle="Mô tả"
            labelText="Mô tả"
            register={register}
            name="description"
            errorMessage={errors?.description?.message}
          />

          <FieldInput
            labelTitle="Giá gốc"
            type="number"
            labelText="Giá gốc"
            register={register}
            name="originalPrice"
            errorMessage={errors?.originalPrice?.message}
          />

          <FieldInput
            labelTitle="Giá sau giảm"
            type="number"
            labelText="Giá sau giảm"
            register={register}
            name="discountPrice"
            errorMessage={errors?.discountPrice?.message}
          />

          <FieldInput
            labelTitle="Tồn kho"
            type="number"
            labelText="Tồn kho"
            register={register}
            name="stock"
            errorMessage={errors?.stock?.message}
          />

          <div>
            <h1 className="mb-2 font-semibold">Danh mục</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Danh mục"
              onChange={(val) => setForm({ ...form, category: val })}
            >
              {categories.map((item) => (
                <Option key={item?._id} value={item?.name}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Thương hiệu</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Thương hiệu"
              onChange={(val) => setForm({ ...form, brand: val })}
            >
              {LAPTOP_BRANDS.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Hệ điều hành</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Hệ điều hành"
              onChange={(val) => setForm({ ...form, operatingSystem: val })}
            >
              {["Window", "macOS"].map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Ram</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Ram"
              onChange={(val) => setForm({ ...form, ram: val })}
            >
              {LAPTOP_RAMS.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Ổ cứng</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Ổ cứng"
              onChange={(val) => setForm({ ...form, hardDrive: val })}
            >
              {LAPTOP_HARD_DRIVES.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">CPU</h1>
            <Select
              className="capitalize"
              size="lg"
              label="CPU"
              onChange={(val) => setForm({ ...form, cpu: val })}
            >
              {LAPTOP_CPUS.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Card đồ họa</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Card đồ họa"
              onChange={(val) => setForm({ ...form, graphicCard: val })}
            >
              {LAPTOP_GRAPHIC_CARDS.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Màn hình</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Màn hình"
              onChange={(val) => setForm({ ...form, screen: val })}
            >
              {LAPTOP_SCREENS.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Màu sắc</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Màu sắc"
              onChange={(val) => setForm({ ...form, color: val })}
            >
              {LAPTOP_COLORS.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Đánh giá</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Đánh giá"
              onChange={(val) => setForm({ ...form, rating: val })}
            >
              {PRODUCT_RATING.map((item) => (
                <Option key={item} value={String(item)}>
                  {displayRating(item)}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Thông tin chi tiết</h1>
            <JoditEditor
              ref={editor}
              value={form.detail}
              onChange={(newContent) =>
                setForm({ ...form, detail: newContent })
              }
            />
          </div>

          <UploadProductThumbnail
            onChange={handleUploadThumbnail}
            thumbnail={thumbnail}
            uploading={loadingThumbnail}
            onDelete={handleDeleteThumbnail}
          />

          <UploadProductImages
            onChange={handleUploadImages}
            images={images}
            uploading={loadingImages}
            onDelete={handleDeleteImage}
          />

          <Button
            disabled={loading}
            color="blue"
            className="w-full"
            size="lg"
            type="submit"
          >
            {loading ? "Loading..." : "Thêm mới"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
