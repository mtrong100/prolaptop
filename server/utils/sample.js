import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const LAPTOP_BRANDS = ["Dell", "HP", "Asus", "Acer", "Apple", "MSI", "Lenovo"];
const cpusData = [
  {
    brand: "Intel",
    tech: "Core i9",
    type: "Desktop",
    speed: "3.5 GHz",
  },
  {
    brand: "Intel",
    tech: "Core i7",
    type: "Laptop",
    speed: "3.0 GHz",
  },
  {
    brand: "AMD",
    tech: "Ryzen 9",
    type: "Desktop",
    speed: "3.8 GHz",
  },
  {
    brand: "AMD",
    tech: "Ryzen 7",
    type: "Desktop",
    speed: "3.6 GHz",
  },
  {
    brand: "Intel",
    tech: "Core i5",
    type: "Laptop",
    speed: "2.6 GHz",
  },
  {
    brand: "AMD",
    tech: "Ryzen 5",
    type: "Desktop",
    speed: "3.4 GHz",
  },
  {
    brand: "Intel",
    tech: "Core i3",
    type: "Desktop",
    speed: "3.1 GHz",
  },
  {
    brand: "AMD",
    tech: "Ryzen 3",
    type: "Desktop",
    speed: "3.5 GHz",
  },
  {
    brand: "Intel",
    tech: "Pentium Gold",
    type: "Desktop",
    speed: "3.7 GHz",
  },
  {
    brand: "Intel",
    tech: "Celeron",
    type: "Desktop",
    speed: "2.9 GHz",
  },
  {
    brand: "AMD",
    tech: "Athlon",
    type: "Desktop",
    speed: "3.2 GHz",
  },
  {
    brand: "Intel",
    tech: "Xeon",
    type: "Server",
    speed: "3.0 GHz",
  },
  {
    brand: "AMD",
    tech: "Opteron",
    type: "Server",
    speed: "2.5 GHz",
  },
  {
    brand: "Apple",
    tech: "M1",
    type: "Desktop",
    speed: "3.2 GHz",
  },
  {
    brand: "Apple",
    tech: "M1",
    type: "Laptop",
    speed: "3.2 GHz",
  },
];
const laptopScreensData = [
  {
    size: 15.6,
    resolution: "1920x1080",
    type: "IPS",
  },
  {
    size: 13.3,
    resolution: "2560x1600",
    type: "Retina",
  },
  {
    size: 14,
    resolution: "1920x1080",
    type: "LED",
  },
  {
    size: 16,
    resolution: "1920x1080",
    type: "TN",
  },
  {
    size: 12.5,
    resolution: "1920x1080",
    type: "IPS",
  },
  {
    size: 15.4,
    resolution: "2880x1800",
    type: "Retina",
  },
  {
    size: 13.9,
    resolution: "3000x2000",
    type: "Touchscreen",
  },
  {
    size: 14,
    resolution: "1366x768",
    type: "LED",
  },
  {
    size: 14,
    resolution: "2560x1440",
    type: "IPS",
  },
  {
    size: 15.6,
    resolution: "3840x2160",
    type: "OLED",
  },
  {
    size: 13.3,
    resolution: "1920x1080",
    type: "IPS",
  },
  {
    size: 16,
    resolution: "2560x1440",
    type: "IPS",
  },
  {
    size: 14,
    resolution: "3840x2160",
    type: "IPS",
  },
  {
    size: 15.6,
    resolution: "1366x768",
    type: "LED",
  },
  {
    size: 12,
    resolution: "2304x1440",
    type: "Retina",
  },
];
const laptopRamsData = [
  {
    type: "DDR4",
    capacity: "8GB",
  },
  {
    type: "DDR4",
    capacity: "16GB",
  },
  {
    type: "DDR4",
    capacity: "32GB",
  },
  {
    type: "DDR4",
    capacity: "64GB",
  },
  {
    type: "DDR4",
    capacity: "128GB",
  },
  {
    type: "DDR4",
    capacity: "256GB",
  },
  {
    type: "DDR4",
    capacity: "512GB",
  },
  {
    type: "DDR4",
    capacity: "1TB",
  },
  {
    type: "DDR4",
    capacity: "2TB",
  },
  {
    type: "DDR4",
    capacity: "4TB",
  },
  {
    type: "DDR4",
    capacity: "8TB",
  },
  {
    type: "DDR4",
    capacity: "16TB",
  },
  {
    type: "DDR4",
    capacity: "32TB",
  },
];
const laptopHardDrivesData = [
  {
    type: "SSD",
    capacity: "128GB",
  },
  {
    type: "SSD",
    capacity: "256GB",
  },
  {
    type: "SSD",
    capacity: "512GB",
  },
  {
    type: "SSD",
    capacity: "1TB",
  },
];

// export const insertData = async () => {
//   try {
//     await HardDrive.insertMany(laptopHardDrivesData);
//     console.log("Dữ liệu đã được thêm thành công!");
//   } catch (error) {
//     console.log("Lỗi thêm data: ", error);
//   }
// };

export const convertData = async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      let categoryObjectId, brandObjectId;

      // Check if product.category is a string before attempting to trim it
      if (typeof product.category === "string") {
        const trimmedCategoryName = product.category.trim().toLowerCase();

        // Find the category by name (case-insensitive) and get its ObjectId
        const category = await Category.findOne({
          name: { $regex: new RegExp("^" + trimmedCategoryName + "$", "i") },
        });
        if (category) {
          categoryObjectId = category._id;
        }
      }

      // Check if product.brand is a string before attempting to trim it
      if (typeof product.brand === "string") {
        const trimmedBrandName = product.brand.trim().toLowerCase();

        // Find the brand by name (case-insensitive) and get its ObjectId
        const brand = await Brand.findOne({
          name: { $regex: new RegExp("^" + trimmedBrandName + "$", "i") },
        });
        if (brand) {
          brandObjectId = brand._id;
        }
      }

      // If valid ObjectId values are found, update the product document
      if (categoryObjectId && brandObjectId) {
        product.category = categoryObjectId;
        product.brand = brandObjectId;
        await product.save();
      }
    }

    console.log("Data conversion completed successfully.");
  } catch (error) {
    console.error("Error occurred during data conversion:", error);
  }
};

// Category
// 6646c44b526804a970bf6229 - Laptop chơi game
// 6646c9a4b5b75a41110e76fe - Laptop văn phòng
// 6646d9b299a69c11fc9c5853 - Laptop học tập
// 6646d9ca99a69c11fc9c585b - Laptop đồ họa
// 6646d9d799a69c11fc9c585f - Laptop doanh nhân
// 6648066dbd566e55430927d9 - Laptop mỏng nhẹ

// Brand
// 665d2a001bf1043eede1e01c - Lenovo
// 665d2a001bf1043eede1e022 - Asus
// 665d2a011bf1043eede1e027 - HP
// 665d2a0f7830713ae618cfbc - MSI
// 665d2b786e7d40b2df1ed344 - Dell
// 665d2b796e7d40b2df1ed34e - Acer
// 665d2b796e7d40b2df1ed353 - Apple
