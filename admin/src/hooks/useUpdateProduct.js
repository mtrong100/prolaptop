import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { firebaseConfig } from "../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { updateProductApi } from "../api/productApi";

initializeApp(firebaseConfig);

export default function useUpdateProduct() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingThumbnail, setLoadingThumbnail] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    category: "",
    color: "",
    brand: "",
    rating: "",
    detail: "",
    operatingSystem: "",
    ram: "",
    screen: "",
    cpu: "",
    hardDrive: "",
    graphicCard: "",
  });

  const handleValidateForm = () => {
    const {
      category,
      color,
      brand,
      rating,
      detail,
      operatingSystem,
      ram,
      screen,
      cpu,
      hardDrive,
      graphicCard,
    } = form;

    if (
      !(
        color ||
        brand ||
        category ||
        rating ||
        operatingSystem ||
        ram ||
        cpu ||
        hardDrive ||
        screen ||
        graphicCard
      )
    ) {
      toast.info("Vui lòng chọn đầy đủ các trường");
      return;
    }

    if (images.length === 0) {
      toast.info("Tải lên 5 ảnh cho 1 sản phẩm");
      return;
    }

    if (images.length > 5) {
      toast.info("Tối đa 5 ảnh cho 1 sản phẩm");
      return;
    }

    if (!thumbnail) {
      toast.info("Tải lên 1 ảnh thumbnail cho sản phẩm");
      return;
    }

    if (!detail.trim()) {
      toast.info("Thông tin chi tiết sản phẩm là bắt buộc");
      return;
    }
  };

  const handleUpdateProduct = async (values) => {
    setLoading(true);

    handleValidateForm();

    const { originalPrice, discountPrice } = values;

    const {
      category,
      color,
      brand,
      rating,
      detail,
      operatingSystem,
      ram,
      screen,
      cpu,
      hardDrive,
      graphicCard,
    } = form;

    if (discountPrice > originalPrice) {
      toast.info("Giá sau giảm phài nhỏ hơn giá gốc");
      return;
    }

    try {
      const req = {
        ...values,
        images,
        thumbnail,
        color,
        brand,
        category,
        detail,
        operatingSystem,
        ram,
        screen,
        hardDrive,
        cpu,
        rating: Number(rating),
        graphicCard,
      };

      await updateProductApi(productId, req);
      toast.success("Cập nhật sản phẩm hoàn tất");
      navigate("/admin/manage-product");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Lỗi cập nhật sản phẩm: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImages = async (event) => {
    setLoadingImages(true);

    const files = event.target.files;
    if (!files || files.length === 0) {
      setLoadingImages(false);
      return;
    }

    const storage = getStorage();

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(storage, "pictures/" + file.name + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, file);
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.log("Lỗi tải lên hình ảnh: ", error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleUploadThumbnail = async (event) => {
    setLoadingThumbnail(true);

    const file = event.target.files[0];
    if (!file) {
      setLoadingThumbnail(false);
      return;
    }
    const storage = getStorage();

    try {
      const storageRef = ref(storage, "pictures/" + file.name + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, file);

      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      setThumbnail(downloadURL);
    } catch (error) {
      console.log("Lỗi tải lên ảnh thumbnail: ", error);
      toast.error("Lỗi tải lên ảnh thumbnail");
    } finally {
      setLoadingThumbnail(false);
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
  };

  const handleDeleteImage = (url) => {
    const newImages = images.filter((item) => item !== url);
    setImages(newImages);
  };

  return {
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
  };
}
