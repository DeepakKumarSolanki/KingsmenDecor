import React from "react";
import PageHomeBanner from "../../component/common/PageHomeBanner";
import SortDescription from "./SortDescription";
import WoodFinishes from "./WoodFinishes";
import TextureFinish from "./TextureFinish";
import LuxuryMetallicFinishes from "./MetalicFinishes";
import AcrylicFinishes from "./AcrylicFinishes";
import VeneerFinishes from "./VeneerFinishes";

const Finishes = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Finishes.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Finishes_Mobile_Version_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <SortDescription />
      <WoodFinishes />
      <TextureFinish />
      <LuxuryMetallicFinishes/>
      <AcrylicFinishes/>
      <VeneerFinishes/>
    </div>
  );
};

export default Finishes;
