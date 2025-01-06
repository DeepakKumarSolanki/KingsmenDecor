import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Elements from "../component/aboutUs/elements";
import LeadPage from "../component/leadPage";
import Process from "../component/aboutUs/process";
import Teams from "../component/aboutUs/teams";
import FAQ from "../component/leadPage/FAQ";
import GridEssential from "../component/products/essentialProducts/GridEssential";
import LineEssential from "../component/products/essentialProducts/LineEssential";
import ListingEssential from "../component/products/essentialProducts/ListingEssential";
import GridPremium from "../component/products/premiumProducts/GridPremium";
import LinePremium from "../component/products/premiumProducts/LinePremium";
import ListingPremium from "../component/products/premiumProducts/ListingPremium";
import GridLuxury from "../component/products/luxuryProducts/GridLuxury";
import LineLuxury from "../component/products/luxuryProducts/LineLuxury";
import ListingLuxury from "../component/products/luxuryProducts/ListingLuxury";
import EssentialProducts from "../component/products/essentialProducts";
import PremiumProducts from "../component/products/premiumProducts/index";
import LuxuryProducts from "../component/products/luxuryProducts/index";
import ContactUs from "../component/leadPage/ContactUs";
import AllProjects from "../component/portfolio/AllProjects";
import BlogLayout from "../component/blog/index";
import ModularJourney from "../component/modularJourney/index";
import HowItWorks from "../component/howItWorks/index";
import HomeInterior from "../component/Price-Calculator/HomeInterior/index";
import FirstPageForm from "../component/Price-Calculator/HomeInterior/PriceEstimationForm/FirstPageForm";
import SecondPageForm from "../component/Price-Calculator/HomeInterior/PriceEstimationForm/SecondPageForm";
import ThirdPageForm from "../component/Price-Calculator/HomeInterior/PriceEstimationForm/ThirdPageForm";
import FinalPageForm from "../component/Price-Calculator/HomeInterior/PriceEstimationForm/FinalPageForm";

import KitchenInterior from "../component/Price-Calculator/KitchenInterior/index";
import FirstPageKitchen from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/FirstPageKitchen";
import LshapedPage2 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Lshaped/LshapedPage2";
import LshapedPage3 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Lshaped/LshapedPage3";
import LshapedFinalPage from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Lshaped/LshapedFinalPage";
import UshapedPage2 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Ushaped/UshapedPage2";
import UshapedPage3 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Ushaped/UshapedPage3";
import UshapedFinalPage from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Ushaped/UshapedFinalPage";
import StraightPage2 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Straight/StraightPage2";
import StraightPage3 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Straight/StraightPage3";
import StraightFinalPage from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Straight/StraightFinalPage";
import ParallelPage2 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Parallel/ParallelPage2";
import ParallelPage3 from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Parallel/ParallelPage3";
import ParallelFinalPage from "../component/Price-Calculator/KitchenInterior/PriceEstimationKitchen/Parallel/ParallelFinalPage";

import WardrobeInterior from "../component/Price-Calculator/WardrobeInterior/index";
import WardrobePage1 from "../component/Price-Calculator/WardrobeInterior/PriceEstimationWardrobeForm/WardrobePage1";
import WardrobePage2 from "../component/Price-Calculator/WardrobeInterior/PriceEstimationWardrobeForm/WordrobePage2";
import WardrobePage3 from "../component/Price-Calculator/WardrobeInterior/PriceEstimationWardrobeForm/WordrobePage3";
import WardrobePage4 from "../component/Price-Calculator/WardrobeInterior/PriceEstimationWardrobeForm/WordrobePage4";
import WardrobeFinalPage from "../component/Price-Calculator/WardrobeInterior/PriceEstimationWardrobeForm/WardrobeFinalPage";
import OurManagement from "../component/aboutUs/management/OurManagement";
import Finishes from "../component/finishes";
import WoodFinishes from "../component/finishes/WoodFinishes";
import ServicePage from "../component/servicesPage"
import BlogOne from "../component/blog/BlogOne";
import BlogTwo from "../component/blog/BlogTwo";
import BlogThree from "../component/blog/BlogThree";
import BlogFour from "../component/blog/BlogFour";
import BlogFive from "../component/blog/BlogFive";
import BlogSix from "../component/blog/BlogSix";

const AllRoutes = () => {
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<LeadPage />} />
        <Route path="/management" element={<OurManagement />} />
        <Route path="/process" element={<Process />} />
        <Route path="/teams" element={<Teams />} />

        <Route path="/essentialProducts" element={<EssentialProducts />} />
        <Route path="/premiumProducts" element={<PremiumProducts />} />
        <Route path="/luxuryProducts" element={<LuxuryProducts />} />
        {/* essential */}
        <Route path="/gridEssential" element={<GridEssential />} />
        <Route path="/lineEssential" element={<LineEssential />} />
        <Route path="/listEssential" element={<ListingEssential />} />
        {/* premium */}
        <Route path="/gridPremium" element={<GridPremium />} />
        <Route path="/linePremium" element={<LinePremium />} />
        <Route path="/listPremium" element={<ListingPremium />} />
        {/* luxury */}
        <Route path="/gridLuxury" element={<GridLuxury />} />
        <Route path="/lineLuxury" element={<LineLuxury />} />
        <Route path="/listLuxury" element={<ListingLuxury />} />

        <Route path="/finishes" element={<Finishes/>}/>
        <Route path="/woodFinishes" element={<WoodFinishes/>}/>

        <Route path="/servicesPage" element={<ServicePage />} />

        <Route path="/blogOne" element={ <BlogOne/> }/>
        <Route path="/blogTwo" element={ <BlogTwo/> }/>
        <Route path="/blogThree" element={ <BlogThree/> }/>

        <Route path="/blogFour" element={ <BlogFour/> }/>
        <Route path="/blogFive" element={ <BlogFive /> }/>
        <Route path="/blogSix" element={ <BlogSix /> }/>

        {/* HomeInterior */}
        {/* <Route path="/homeinterior" element={<HomeInterior />} />
        <Route path="/homeinterior/bhk" element={<FirstPageForm />} /> */}
        <Route
          path="/homeinterior/bhk/rooms-design"
          element={<SecondPageForm />}
        />
        <Route
          path="/homeinterior/bhk/rooms-design/package"
          element={<ThirdPageForm />}
        />
        <Route
          path="/homeinterior/bhk/rooms-design/package/estimate-form"
          element={<FinalPageForm />}
        />

        {/* KitchenInterior */}
        <Route path="/kitcheninterior" element={<KitchenInterior />} />
        <Route path="/kitcheninterior/layout" element={<FirstPageKitchen />} />

        {/* L-shaped */}
        <Route
          path="/kitcheninterior/layout/lshape-size"
          element={<LshapedPage2 />}
        />
        <Route
          path="/kitcheninterior/layout/lshape-size/package"
          element={<LshapedPage3 />}
        />
        <Route
          path="/kitcheninterior/layout/lshape-size/package/estimate-form"
          element={<LshapedFinalPage />}
        />

        {/* Ushaped Shape */}
        <Route
          path="/kitcheninterior/layout/ushape-size"
          element={<UshapedPage2 />}
        />
        <Route
          path="/kitcheninterior/layout/ushape-size/package"
          element={<UshapedPage3 />}
        />
        <Route
          path="/kitcheninterior/layout/ushape-size/package/estimate-form"
          element={<UshapedFinalPage />}
        />

        {/* Straight shape */}
        <Route
          path="/kitcheninterior/layout/straight-size"
          element={<StraightPage2 />}
        />
        <Route
          path="/kitcheninterior/layout/straight-size/package"
          element={<StraightPage3 />}
        />
        <Route
          path="/kitcheninterior/layout/straight-size/package/estimate-form"
          element={<StraightFinalPage />}
        />

        {/* Parallel shape */}
        <Route
          path="/kitcheninterior/layout/parallel-size"
          element={<ParallelPage2 />}
        />
        <Route
          path="/kitcheninterior/layout/parallel-size/package"
          element={<ParallelPage3 />}
        />
        <Route
          path="/kitcheninterior/layout/parallel-size/package/estimate-form"
          element={<ParallelFinalPage />}
        />

        {/* Wardrobe Form Routing */}
        <Route path="/wardrobeinterior" element={<WardrobeInterior />} />
        <Route path="/wardrobe-height" element={<WardrobePage1 />} />
        <Route
          path="/wardrobe-height/wardrobe-type"
          element={<WardrobePage2 />}
        />
        <Route
          path="/wardrobe-height/wardrobe-type/material"
          element={<WardrobePage3 />}
        />
        <Route
          path="/wardrobe-height/wardrobe-type/material/accessories"
          element={<WardrobePage4 />}
        />
        <Route
          path="/wardrobe-height/wardrobe-type/material/accessories/estimate-form"
          element={<WardrobeFinalPage />}
        />

        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/allProjects" element={<AllProjects />} />

        <Route path="/blog" element={<BlogLayout />} />
        <Route path="/modularJourney" element={<ModularJourney />} />
        <Route path="/howItWorks" element={<HowItWorks />} />
        {/* <Route path="/carrier" element={<Carrier />} /> */}
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
};

export default AllRoutes;
