import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import MainModularJourney from "./MainModularJourney";

function HomeInterior() {
  return (
    <div>
      {/* Large screen banner */}
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="./Banners/Modular_Page_Banner.jpg "
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="./Banners/Home_Interior_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Other components */}
      <MainModularJourney />
    </div>
  );
}

export default HomeInterior;
