import { Typography } from "@material-tailwind/react";
import React from "react";

const TitleSection = ({ children }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[15px] h-[30px] rounded-lg bg-red-600"></div>
      <Typography
        variant="h4"
        color="blue-gray"
        className="font-bold uppercase"
      >
        {children}
      </Typography>
    </div>
  );
};

export default TitleSection;
