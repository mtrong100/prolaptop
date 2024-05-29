import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { formatCurrencyVND } from "../utils/helper.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_ACCOUNT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendConfirmationEmail = async (email, token) => {
  const verificationLink = `${process.env.LOCAL_CLIENT_URL}/verify-email?token=${token}`;

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff ;
            text-decoration: none ;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Vui lòng xác minh email đăng kí của bạn</h1>
          <a href="${verificationLink}" class="btn">Verify Email</a>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: '"ProLaptop 👻" <ProLaptop@gmail.com>',
    to: email,
    subject: "Vui lòng xác minh emails",
    text: `Cảm ơn bạn đã tạo một tài khoản. Xác minh email của bạn để bạn có thể thiết lập và nhanh chóng.`,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendOtpResetPassword = async (email, otp) => {
  const mailOptions = {
    from: '"ProLaptop 👻" <ProLaptop99@gmail.com>',
    to: email,
    subject: "Mã OTP đặt lại mật khẩu",
    text: `Mã OTP đặt lại mật khẩu của bạn là: `,
    html: `<h1>${otp}</h1>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendEmailCompletePurchase = async (
  orderItems,
  shippingAddress,
  shippingMethod,
  couponCodeUsed,
  paymentMethod,
  totalCost
) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
          }

          h2 {
            color: #4CAF50;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
          }

          img {
            max-width: 100px;
            max-height: 100px;
          }

          p {
            line-height: 1.6;
          }

          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Cảm ơn ${shippingAddress?.fullName} vì đã mua hàng!</h1>
        <p>Xin chào, Chúng tôi rất vui mừng được thông báo rằng đơn hàng của bạn đã được đặt thành công. Dưới đây là thông tin chi tiết về việc mua hàng của bạn</p>
        
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá tiền</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems
              .map(
                (item) => `
              <tr>
                <td>
                  <div style="margin: 0 auto;">
                    <img src="${item?.image}" alt="${item?.name}">
                  </div>
                </td>
                <td>${item?.name}</td>
                <td>${item?.quantity}</td>
                <td>${formatCurrencyVND(item.quantity * item.price)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div>Phương thức thanh toán: ${paymentMethod} </div>
        <div>Phương thức ship hàng: ${
          shippingMethod?.name
        } : ${formatCurrencyVND(shippingMethod?.price)}</div>
        <div>Mã giảm giá đã dùng: ${couponCodeUsed?.name} - ${
    couponCodeUsed?.discount
  }%</div>

        <h2>Tổng cộng: ${formatCurrencyVND(totalCost)}</h2>
        
        <p>Cảm ơn bạn đã lựa chọn sản phẩm của chúng tôi. Nếu bạn có bất kỳ câu hỏi hoặc mối quan tâm nào, vui lòng liên hệ với chúng tôi.</p>
        
        <p>Trân trọng cảm ơn,<br>ProLaptop Shop Team</p>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: '"ProLaptop 👻" <ProLaptop@gmail.com>',
    to: shippingAddress?.email,
    subject: "Xác nhận đơn hàng",
    text: "Cám ơn vì đã mua hàng! Chi tiết đặt hàng của bạn được đính kèm.",
    html: htmlContent,
  });
};
