import React from "react";
import Image1 from "../assets/brands/acer.jpg";
import Image2 from "../assets/brands/asus.jpg";
import Image3 from "../assets/brands/dell.jpg";
import Image4 from "../assets/brands/hp.png";
import Image5 from "../assets/brands/lenovo.png";
import Image6 from "../assets/brands/macos.jpg";
import Image7 from "../assets/brands/msi.png";

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];

const OurBrand = () => {
  return (
    <div className="mt-20 flex flex-wrap justify-between gap-5">
      {images.map((image, index) => (
        <div key={index} className="flex-1">
          <img
            src={image}
            alt={`Brand ${index + 1}`}
            className="w-full h-32 object-contain rounded-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default OurBrand;
