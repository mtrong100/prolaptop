import { Textarea } from "@material-tailwind/react";
import React from "react";

const FieldTexarea = ({
  labelText,
  register,
  name,
  errorMessage,
  labelTitle,
}) => {
  return (
    <div>
      <h1 className="font-semibold mb-2">{labelTitle}</h1>
      <Textarea
        size="lg"
        {...register(`${name}`)}
        label={labelText}
        className="min-h-[150px] "
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default FieldTexarea;
