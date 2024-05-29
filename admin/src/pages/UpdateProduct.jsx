import React, { useEffect, useRef } from "react";
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
import UploadProductThumbnail from "../components/UploadProductThumbnail";
import UploadProductImages from "../components/UploadProductImages";
import { useParams } from "react-router-dom";
import useGetProductDetail from "../hooks/useGetProductDetail";
import useUpdateProduct from "../hooks/useUpdateProduct";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
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
  const { product } = useGetProductDetail(productId);

  const {
    handleUploadImages,
    handleUpdateProduct,
    handleDeleteThumbnail,
    handleDeleteImage,
    setForm,
    form,
    loading,
    loadingImages,
    images,
    setImages,
    handleUploadThumbnail,
    loadingThumbnail,
    thumbnail,
    setThumbnail,
  } = useUpdateProduct();

  // RESET FIELDS
  useEffect(() => {
    if (product) {
      reset({
        name: product?.name,
        description: product?.description,
        discountPrice: product?.discountPrice,
        originalPrice: product?.originalPrice,
        stock: product?.stock,
      });
      setForm({
        category: product?.category,
        color: product?.color,
        brand: product?.brand,
        rating: product?.rating,
        detail: product?.detail,
        operatingSystem: product?.operatingSystem,
        cpu: product?.cpu,
        graphicCard: product?.graphicCard,
        hardDrive: product?.hardDrive,
        ram: product?.ram,
        screen: product?.screen,
      });
      setImages(product?.images);
      setThumbnail(product?.thumbnail);
    }
  }, [product, reset, setForm, setImages, setThumbnail]);

  return (
    <div>
      <TitleSection>Form cập nhật sản phẩm</TitleSection>

      <div className="mt-5 w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
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
            {form.category && (
              <Select
                className="capitalize"
                size="lg"
                label="Danh mục"
                value={form.category}
                onChange={(val) => setForm({ ...form, category: val })}
              >
                {categories.map((item) => (
                  <Option key={item?._id} value={item?.name}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Thương hiệu</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Thương hiệu"
              value={form.brand}
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
              value={form.operatingSystem}
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
              value={form.ram}
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
              value={form.hardDrive}
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
            {form.cpu && (
              <Select
                className="capitalize"
                size="lg"
                label="CPU"
                value={form.cpu}
                onChange={(val) => setForm({ ...form, cpu: val })}
              >
                {LAPTOP_CPUS.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Card đồ họa</h1>
            <Select
              className="capitalize"
              size="lg"
              label="Card đồ họa"
              value={form.graphicCard}
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
              value={form.screen}
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
              value={form.color}
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
              value={String(form.rating)}
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
            {loading ? "Loading..." : "Cập nhật"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
