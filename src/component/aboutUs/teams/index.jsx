import React from "react";
import HighQualityTeam from "./HighQualityTeam";
import PageHomeBanner from "../../common/PageHomeBanner";
import CompanyCards from "./CompanyCards";
import TeamDes from "./TeamDes";
import FAQ from "../../leadPage/FAQ";
import  { useEffect } from "react";

const Teams = () => {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/AboutUs.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/OurTeam_Mobile_Version_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <TeamDes />
      <HighQualityTeam />
      <FAQ />
    </div>
  );
};

export default Teams;
