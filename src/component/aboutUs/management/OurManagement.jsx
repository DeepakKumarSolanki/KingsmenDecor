import React from 'react';
import PageHomeBanner from '../../common/PageHomeBanner';
import FounderSection from './FounderSection';

const OurManagement = () => {
  return (
   <section>
      {/* Large screen banner */}
      <div className="hidden lg:block">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/AboutUs.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>

      {/* Mobile or tablet screen banner */}
      <div className="block lg:hidden">
        <PageHomeBanner
          title=""
          subtitle=""
          buttonText=""
          backgroundImage="/src/assets/About_Us_Mobile_Version_Banner.jpg"
          onButtonClick={() => alert("Button Clicked!")}
        />
      </div>
      <article>
        <FounderSection/>
      </article>
    </section>
  )
}

export default OurManagement
