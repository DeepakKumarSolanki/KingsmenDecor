import React from "react";
import HomeBanner from "./HomeBanner";
import AboutCompany from "./AboutCompany";
import Services from "./Services";
import InteriorDesigns from "./InteriorDesigns";
import CountDown from "./CountDown";
import TrendingHome from "./TrendingHome";
import FAQ from "./FAQ";
import ClientTestimonial from "./ClientTestimonial";
import AdvertisemnetBanner from "./AdvertisemnetBanner";
import ServicesBanner from "./ServicesBanner";

const LeadPage = () => {
  return (
    <>
      <HomeBanner />
      <AboutCompany />
      <Services />
      <ServicesBanner/>
      <CountDown />
      <InteriorDesigns />
      <TrendingHome />
      <AdvertisemnetBanner />
      <FAQ />
      {/* <ClientTestimonial /> */}
    </>
  );
};

export default LeadPage;
