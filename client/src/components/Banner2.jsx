import React from "react";
import { Carousel } from "@material-tailwind/react";
import Banner5 from "../assets/banners/banner5.webp";
import Banner6 from "../assets/banners/banner6.webp";
import Banner7 from "../assets/banners/banner7.png";

const Banner2 = () => {
  return (
    <Carousel className="rounded-sm h-[210px] mt-20">
      <img
        src={Banner5}
        alt="image 1"
        className="h-full w-full rounded-sm object-cover"
      />
      <img
        src={Banner6}
        alt="image 2"
        className="h-full w-full rounded-sm object-cover"
      />
      <img
        src={Banner7}
        alt="image 3"
        className="h-full w-full rounded-sm object-cover"
      />
    </Carousel>
  );
};

export default Banner2;
