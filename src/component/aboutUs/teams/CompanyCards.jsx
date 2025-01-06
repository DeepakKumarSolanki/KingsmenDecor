import React from "react";

const CompanyCards = () => {
  const company_cards = [
    {
      img: "https://templates.thememodern.com/theratio/images/client3.svg",
    },
    {
      img: "https://templates.thememodern.com/theratio/images/client4.svg",
    },
    {
      img: "https://templates.thememodern.com/theratio/images/client1.svg",
    },
    {
      img: "https://templates.thememodern.com/theratio/images/client2.svg",
    },
    {
      img: "https://templates.thememodern.com/theratio/images/client3.svg",
    },
  ];
  return (
    <section className="bg-black top-spacing bottom-spacing">
      <div className="main-container flex justify-between">
      {company_cards.map((items, i) => (
        <div key={i} className="py-10">
          <img loading="lazy" src={items.img} className="h-12" alt="photo" />
        </div>
      ))}
      </div>
    </section>
  );
};

export default CompanyCards;
