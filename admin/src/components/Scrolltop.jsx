import { useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const Scrolltop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`rounded-full fixed z-50 bottom-20 lg:bottom-28 xl:bottom-10 right-5 md:bottom-24 md:right-10 shadow-lg text-white lg:right-10 hover:bg-blue-gray-900 w-[45px] h-[45px] items-center justify-center bg-blue-gray-800 ${
        isVisible ? "flex" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <BiUpArrowAlt size={25} />
    </button>
  );
};

export default Scrolltop;
