import React from "react";
import PageHomeBanner from "../common/PageHomeBanner";
import MainBlog from "./MainBlog";
import BlogGrid from "./BlogGrid"

function HomeInterior () {
  return (
    <div>
      {/* Large screen banner */}
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Blog_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/Blog_Mobile_Version_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Other components */}
      <MainBlog/>
      <BlogGrid/>
    </div>
  );
}

export default HomeInterior;
