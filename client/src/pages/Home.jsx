import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Flashsale from "../components/Flashsale";
import Banner2 from "../components/Banner2";
import Banner3 from "../components/Banner3";
import SuggestForToday from "../components/SuggestForToday";
import TopSellingProduct from "../components/TopSellingProduct";
import Service from "../components/Service";
import OurBrand from "../components/OurBrand";
import Faq from "../components/Faq";

const Home = () => {
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      <Banner />
      <Flashsale />
      <Banner2 />
      <Banner3 />
      <OurBrand />
      <SuggestForToday />
      <TopSellingProduct />
      <Service />
      <Faq />
    </div>
  );
};

export default Home;
