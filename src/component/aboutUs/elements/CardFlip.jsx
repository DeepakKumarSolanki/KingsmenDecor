import React from "react";

const CardFlip = () => {
  return (
    <section className="main-container">
      <h1 className="lg:text-4xl text-xl font-semibold text-[#104438] ">
        Flip Boxes
      </h1>
      <div className="container">
        <div className="card">
          <div className="img-box">
            <img src="/images/support1.jpg" />
          </div>
          <div className="content text-[#104438] !text-base ">
            <h2>Our Mission</h2>
            <p>
              Kingsmen Decors is committed to the art of creating outstanding
              living and working spaces that are characterized by elegance,
              functionality, and comfort. Our commitment to innovation,
              craftsmanship, and personalized service ensures that every project
              reflects the unique vision.
            </p>
            {/* <div className="py-8">
              <button className="bg-[#104438] text-white py-4 px-2 rounded-md">
                READ MORE
              </button>
            </div> */}
          </div>
        </div>

        <div className="card">
          <div className="img-box">
            <img src="/images/support2.jpg" />
          </div>
          <div className="content text-[#104438] !text-base ">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be the premium provider of premium decor and
              interior solutions, known for our creativity, quality, and client
              satisfaction. We see a future where our designs inspire and enrich
              lives, set new standards in interior aesthetics and functionality,
              and bring dreams to life.
            </p>
            {/* <div className="py-8">
              <button className="bg-[#104438] text-white py-4 px-2 rounded-md">
                READ MORE
              </button>
            </div> */}
          </div>
        </div>
        <div className="card">
          <div className="img-box">
            <img src="/images/support3.jpg" />
          </div>
          <div className="content text-[#104438] !text-base">
            <h2>Our Values</h2>
            <p>
              We are pride ourselves in quality craftsmanship, utilizing
              excellent material and inventive techniques to provide superb
              results from every activity.We operate with honesty, transparency,
              and integrity in all our dealings, building trust and long-lasting
              relationships with our clients and partners.
            </p>
            {/* <div className="py-8">
              <button className="bg-[#104438] text-white py-4 px-2 rounded-md">
                READ MORE
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardFlip;
