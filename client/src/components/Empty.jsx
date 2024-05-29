import React from "react";
import emptyImage from "../assets/images/empty-cart.png";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Empty = ({ firstCaption, secondCaption, link, buttonText }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-[400px] h-[400px] mx-auto">
        <img src={emptyImage} alt="empty-cart" className="img-cover" />
      </div>
      <p className="text-lg text-center">
        {firstCaption} <br /> {secondCaption}
      </p>
      <Button
        onClick={() => navigate(link)}
        size="lg"
        variant="gradient"
        color="red"
        className="mt-5"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default Empty;
