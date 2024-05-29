import React from "react";
import { Carousel } from "@material-tailwind/react";
import Banner1 from "../assets/banners/banner1.webp";
import Banner2 from "../assets/banners/banner2.jpg";
import Banner3 from "../assets/banners/banner3.png";
import Banner4 from "../assets/banners/banner4.png";

const Banner = () => {
  return (
    <Carousel className="rounded-sm h-[500px] mt-5">
      <img src={Banner1} alt="image 1" className="h-full w-full object-cover" />
      <img src={Banner2} alt="image 2" className="h-full w-full object-cover" />
      <img src={Banner3} alt="image 3" className="h-full w-full object-cover" />
      <img src={Banner4} alt="image 3" className="h-full w-full object-cover" />
    </Carousel>
  );
};

export default Banner;
