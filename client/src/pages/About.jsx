import {
  CircleDollarSign,
  CreditCard,
  Mail,
  Phone,
  ShoppingBag,
  Store,
} from "lucide-react";
import TitleSection from "../components/TitleSection";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Image from "../assets/images/Typing-bro.png";
import { useEffect } from "react";

const stastisticCard = [
  {
    icon: <Store size={30} />,
    amount: "10.5k",
    caption: "Người bán hàng đang hoạt động trên trang web của chúng tôi",
  },
  {
    icon: <CircleDollarSign size={30} />,
    amount: "33k",
    caption: "Doanh số sản phẩm hàng tháng",
  },
  {
    icon: <ShoppingBag size={30} />,
    amount: "45.5k",
    caption: "Khách hàng đang hoạt động trên trang web của chúng tôi",
  },
  {
    icon: <CreditCard size={30} />,
    amount: "25k",
    caption: "Doanh thu gộp hàng năm trên trang web của chúng tôi",
  },
];

const About = () => {
  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="mt-5">
      {/* BANNER */}
      <div className="grid grid-cols-2 gap-[75px] items-center">
        <div>
          <h1 className="text-6xl font-semibold tracking-wider">Giới thiệu</h1>
          <p className="mt-[40px]">
            Ra mắt vào năm 2015, Prolaptop là trang mua sắm trực tuyến hàng đầu
            Nam Á makterplace có sự hiện diện tích cực ở Bangladesh. Được hỗ trợ
            rộng rãi loạt các giải pháp tiếp thị, dữ liệu và dịch vụ phù hợp,
            Prolaptop có 10.500 người bán và 300 thương hiệu và phục vụ 3 triệu
            khách hàng Trên toàn khu vực.
          </p>
          <p className="mt-[24px]">
            Prolaptop có hơn 1 triệu sản phẩm để cung cấp, tăng trưởng với tốc
            độ rất nhanh. Prolaptop cung cấp nhiều loại sản phẩm đa dạng khác
            nhau từ người tiêu dùng.
          </p>
        </div>

        <div className="aspect-square">
          <img src={Image} alt="twoGirls" className="img-cover rounded-sm" />
        </div>
      </div>

      {/* STASTISTIC */}
      <div className="mt-10 grid grid-cols-4 gap-[30px]">
        {stastisticCard.map((item) => (
          <div
            key={item.amount}
            className="border border-gray-300 rounded-md flex items-center hover:bg-red-500 hover:text-white transition-all justify-center flex-col aspect-square p-5"
          >
            <div className="flex items-center justify-center rounded-full bg-black text-white w-[55px] h-[55px]">
              {item.icon}
            </div>
            <h1 className="mt-[24px] text-4xl font-semibold">{item.amount}</h1>
            <p className="mt-[12px] text-center">{item.caption}</p>
          </div>
        ))}
      </div>

      {/* CONTACT */}
      <div className="mt-20">
        <TitleSection>Liên lạc với chúng tôi</TitleSection>
        <div className="mt-[50px] grid grid-cols-[270px_minmax(0,_1fr)] gap-[60px]">
          <section>
            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-red-500 text-white">
                  <Phone size={20} />
                </span>
                <p className="font-medium">Call To Us</p>
              </div>
              <p className="mt-[32px]">We are available 24/7, 7 days a week.</p>
              <p className="mt-[16px]">Phone: +8801611112222</p>
            </div>

            <hr className="my-2 border-blue-gray-50" />

            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-red-500 text-white">
                  <Mail size={20} />
                </span>
                <p className="font-medium">Write To US</p>
              </div>
              <p className="mt-5">
                Điền vào biểu mẫu của chúng tôi và chúng tôi sẽ liên lạc với bạn
                trong vòng 24 giờ.
              </p>
              <p className="mt-[16px]">Emails: customer@exclusive.com</p>
            </div>
          </section>

          <section className="w-full">
            <div className="grid gap-5">
              <Input
                size="lg"
                variant="outlined"
                label="Email"
                placeholder="Enter your email..."
              />
              <Input
                size="lg"
                variant="outlined"
                label="Name"
                placeholder="Enter your Name..."
              />
              <Input
                size="lg"
                variant="outlined"
                label="Phone"
                placeholder="Enter your Phone..."
              />
            </div>
            <div className="mt-[32px]">
              <Textarea size="lg" variant="outlined" label="Message" />
            </div>
            <Button
              size="lg"
              color="red"
              className="mt-5 flex justify-end ml-auto"
            >
              Send Massage
            </Button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
