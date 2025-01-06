import React from "react";
import PageHomeBanner from "../../common/PageHomeBanner";
import MainInterior from "./MainInterior";
import HomeFAQ from "./HomeFAQ"

function HomeInterior () {
  return (
    <div>
      {/* Large screen banner */}
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="./Banners/Home_Interior_Banner.jpg"
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
      <MainInterior/>
      <HomeFAQ/>
    </div>
  );
}

export default HomeInterior;
