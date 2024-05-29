import React from "react";
import { Input, Button } from "@material-tailwind/react";

const Newsletter = () => {
  return (
    <div className="w-full bg-gradient-to-r h-[200px] from-red-500 to-pink-500 text-white flex items-center justify-center mt-10 ">
      <div className="page-container flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:w-1/2 ">
          <h2 className="text-4xl font-bold mb-3">
            Theo dõi bản tin của chúng tôi
          </h2>
          <p>
            Nhận các bản cập nhật và ưu đãi mới nhất trực tiếp trong hộp thư đến
            của bạn.
          </p>
        </div>
        <div className="md:w-1/2 flex items-center">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full bg-white h-[48px] px-3 text-black border-none outline-none"
          />

          <Button
            size="lg"
            variant="gradient"
            className="rounded-none w-[150px]"
          >
            Đăng kí
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

export function InputWithButton() {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        type="email"
        label="Email Address"
        value={email}
        onChange={onChange}
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={email ? "gray" : "blue-gray"}
        disabled={!email}
        className="!absolute right-1 top-1 rounded"
      >
        Invite
      </Button>
    </div>
  );
}
