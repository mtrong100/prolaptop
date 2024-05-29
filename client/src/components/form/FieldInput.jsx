import { Input } from "@material-tailwind/react";
import React from "react";

const FieldInput = ({
  labelText,
  register,
  name,
  errorMessage,
  type,
  labelTitle,
}) => {
  return (
    <div>
      <h1 className="font-semibold mb-2">{labelTitle}</h1>
      <Input type={type} size="lg" {...register(`${name}`)} label={labelText} />
      {errorMessage && (
        <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FieldInput;
