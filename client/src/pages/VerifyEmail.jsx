import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailApi } from "../api/authApi";
import { Button } from "@material-tailwind/react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    async function fetchVerifyEmailApi() {
      try {
        const res = await verifyEmailApi(token);
        setIsVerified(res?.verified);
      } catch (error) {
        console.log("Lỗi: ", error);
        setIsVerified(false);
      }
    }
    fetchVerifyEmailApi();
  }, [token]);

  return (
    <div className="flex items-center h-screen justify-center">
      <section className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            Email đã{" "}
            <span className="text-green-600">
              {isVerified ? "xác minh" : "chưa xác minh"}
            </span>
          </h1>
          {isVerified ? (
            <p className="opacity-90">Xác minh hoàn tất</p>
          ) : (
            <p className="opacity-90">Lỗi xác minh email</p>
          )}
          <Button
            size="lg"
            color="red"
            onClick={() => navigate("/login")}
            className="w-full"
          >
            Quay trờ về đăng nhập
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VerifyEmail;
