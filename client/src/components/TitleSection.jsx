import { Typography } from "@material-tailwind/react";
import React from "react";

const TitleSection = ({ children }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[15px] h-[30px] rounded-lg bg-red-500"></div>
      <Typography variant="h2" color="red" className="font-bold ">
        {children}
      </Typography>
    </div>
  );
};

export default TitleSection;
