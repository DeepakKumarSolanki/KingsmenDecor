import React from "react";
import PageHomeBanner from "../../common/PageHomeBanner";
import Feature from "./Feature";
import FlipBox from "./AccordionTabs";
import CardFlip from "./CardFlip";

function Elements() {
  return (
    <div>
      {/* Large screen banner */}
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="./banner/download2.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="./banner/Element.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Other components */}
      <Feature />
      <CardFlip />
      <FlipBox />
    </div>
  );
}

export default Elements;
