import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import FirstSection from "./FirstSection";
import KitchenInterior from "../Price-Calculator/KitchenInterior/MainInterior";
import HomeInterior from "../Price-Calculator/WardrobeInterior";
import HomeInteriorsCarousel from "./HomeInteriorsCarousel";
import CommercialInteriorsCarousel from "./CommercialInteriorsCarousel";
import InteriorDesignDragDrop from "./InteriorDesignDragDrop";
import MainInterior from "../Price-Calculator/WardrobeInterior/MainInterior";

const ServicePage = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Services_Page_bannaer_1920x500.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Services_Mobile_Version_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <FirstSection />
      <HomeInteriorsCarousel />
      <KitchenInterior />
      {/* <InteriorDesignDragDrop/> */}
      <MainInterior />
      {/* <CommercialInteriorsCarousel /> */}
    </div>
  );
};

export default ServicePage;
