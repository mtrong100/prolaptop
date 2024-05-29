import React from "react";
import useGoogleLogin from "../hooks/useGoogleLogin";
import { Button } from "@material-tailwind/react";

const GoogleLogin = () => {
  const { handleGoogleLogin, loading } = useGoogleLogin();

  return (
    <Button
      disabled={loading}
      onClick={handleGoogleLogin}
      type="button"
      size="lg"
      variant="outlined"
      color="blue-gray"
      className="flex w-full justify-center items-center gap-3"
    >
      <img
        src="https://docs.material-tailwind.com/icons/google.svg"
        alt="metamask"
        className="h-6 w-6"
      />
      Tiếp tục với google
    </Button>
  );
};

export default GoogleLogin;
