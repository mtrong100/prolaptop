import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import TitleSection from "./TitleSection";

const Faq = () => {
  return (
    <div className="mt-20">
      <TitleSection>Câu hỏi thường gặp</TitleSection>
      <div className="mt-5 bg-gray-100 shadow-sm rounded-sm border border-gray-300 p-5">
        <DefaultAccordion />
      </div>
    </div>
  );
};

export default Faq;

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function DefaultAccordion() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Tại sao nên mua laptop từ website của chúng tôi?
        </AccordionHeader>
        <AccordionBody>
          Khi mua laptop từ website của chúng tôi, bạn sẽ được hưởng những ưu
          đãi đặc biệt như giá cả cạnh tranh, bảo hành dài hạn và dịch vụ hỗ trợ
          khách hàng 24/7. Chúng tôi cam kết cung cấp các sản phẩm chính hãng,
          chất lượng cao từ các thương hiệu uy tín như Acer, Asus, Dell, HP,
          Lenovo, và nhiều thương hiệu khác. Bên cạnh đó, chúng tôi thường xuyên
          có các chương trình khuyến mãi và giảm giá đặc biệt dành cho khách
          hàng.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Chính sách bảo hành và đổi trả của website là gì?
        </AccordionHeader>
        <AccordionBody>
          Chúng tôi cung cấp chính sách bảo hành và đổi trả linh hoạt nhằm đảm
          bảo quyền lợi tốt nhất cho khách hàng. Tất cả các sản phẩm laptop mua
          từ website của chúng tôi đều được bảo hành chính hãng từ 12 đến 24
          tháng. Nếu bạn gặp phải bất kỳ vấn đề nào với sản phẩm trong thời gian
          bảo hành, chúng tôi sẽ hỗ trợ sửa chữa hoặc đổi mới sản phẩm một cách
          nhanh chóng và tiện lợi. Ngoài ra, chúng tôi cũng áp dụng chính sách
          đổi trả trong vòng 30 ngày nếu sản phẩm có lỗi từ nhà sản xuất.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Làm thế nào để lựa chọn laptop phù hợp với nhu cầu của tôi?
        </AccordionHeader>
        <AccordionBody>
          Việc lựa chọn laptop phù hợp phụ thuộc vào nhu cầu sử dụng cụ thể của
          bạn. Nếu bạn cần một chiếc laptop để làm việc văn phòng và học tập,
          bạn nên chọn những mẫu máy có cấu hình vừa phải, pin lâu và thiết kế
          gọn nhẹ. Nếu bạn là một game thủ hoặc làm việc với đồ họa, bạn cần một
          laptop có cấu hình mạnh mẽ, card đồ họa rời và màn hình chất lượng
          cao. Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc
          lựa chọn sản phẩm phù hợp nhất với nhu cầu của mình.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(4)}>
          Phương thức thanh toán và vận chuyển như thế nào?
        </AccordionHeader>
        <AccordionBody>
          Chúng tôi cung cấp nhiều phương thức thanh toán linh hoạt và an toàn
          như thanh toán qua thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng và
          thanh toán khi nhận hàng (COD). Sản phẩm sẽ được vận chuyển đến tay
          bạn trong thời gian nhanh nhất có thể thông qua các đối tác vận chuyển
          uy tín. Đối với các đơn hàng trong nội thành, chúng tôi cung cấp dịch
          vụ giao hàng trong ngày hoặc ngày kế tiếp. Đối với các đơn hàng ngoại
          thành, thời gian giao hàng sẽ dao động từ 2-5 ngày làm việc.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(5)}>
          Tôi có thể nhận được hỗ trợ kỹ thuật từ đâu?
        </AccordionHeader>
        <AccordionBody>
          Chúng tôi cung cấp dịch vụ hỗ trợ kỹ thuật 24/7 để giải quyết mọi thắc
          mắc và vấn đề kỹ thuật mà bạn gặp phải. Bạn có thể liên hệ với chúng
          tôi qua số điện thoại hỗ trợ, email, hoặc trò chuyện trực tuyến trên
          website. Đội ngũ kỹ thuật viên chuyên nghiệp và giàu kinh nghiệm của
          chúng tôi luôn sẵn sàng hỗ trợ bạn một cách nhanh chóng và hiệu quả.
          Ngoài ra, bạn cũng có thể tìm thấy các hướng dẫn và tài liệu hữu ích
          trên trang web của chúng tôi để tự giải quyết các vấn đề cơ bản.
        </AccordionBody>
      </Accordion>
    </>
  );
}
