import axios from "axios";

const PRODUCT_PARAMS = {
  PAGE: 1,
  LIMIT: 12,
  SORT: "name",
  ORDER: "desc",
  QUERY: "",
  CATEGORY: "",
  SIZE: "",
  COLOR: "",
  BRAND: "",
  MIN_PRICE: undefined,
  MAX_PRICE: undefined,
  RAM: "",
  CPU: "",
  HARD_DRIVE: "",
  GRAPHIC_CARD: "",
  SCREEN: "",
};

export const getAllProductsApi = async ({
  page = PRODUCT_PARAMS.PAGE,
  limit = PRODUCT_PARAMS.LIMIT,
  sort = PRODUCT_PARAMS.SORT,
  order = PRODUCT_PARAMS.ORDER,
  query = PRODUCT_PARAMS.QUERY,
  category = PRODUCT_PARAMS.CATEGORY,
  size = PRODUCT_PARAMS.SIZE,
  color = PRODUCT_PARAMS.COLOR,
  brand = PRODUCT_PARAMS.BRAND,
  minPrice = PRODUCT_PARAMS.MIN_PRICE,
  maxPrice = PRODUCT_PARAMS.MAX_PRICE,
  ram = PRODUCT_PARAMS.RAM,
  cpu = PRODUCT_PARAMS.CPU,
  hardDrive = PRODUCT_PARAMS.HARD_DRIVE,
  graphicCard = PRODUCT_PARAMS.GRAPHIC_CARD,
  screen = PRODUCT_PARAMS.SCREEN,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/product/products`,
    {
      params: {
        page,
        limit,
        sort,
        order,
        query,
        category,
        size,
        color,
        brand,
        minPrice,
        maxPrice,
        ram,
        cpu,
        hardDrive,
        graphicCard,
        screen,
      },
    }
  );

  return res.data;
};

export const getProductDetailApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/product/${id}`
  );
  return res.data;
};

export const createProductApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/product/create`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateProductApi = async (id, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/product/update/${id}`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteProductApi = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/product/delete/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const viewProductApi = async (id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/product/view/${id}`
  );
  return res.data;
};

export const flashSaleProductApi = async (id) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/product/flashsale/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
};
