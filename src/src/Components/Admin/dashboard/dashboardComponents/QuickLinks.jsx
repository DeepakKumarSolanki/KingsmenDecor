import React, { useState } from "react";
import one from "../../../../assets/quicklinks/1.jpg";
import two from "../../../../assets/quicklinks/2.jpg";
import three from "../../../../assets/quicklinks/3.jpg";
import four from "../../../../assets/quicklinks/4.jpg";
import five from "../../../../assets/quicklinks/5.jpg";
import six from "../../../../assets/quicklinks/6.jpg";

const QuickLinks = ({ isSidebarAnimating }) => {
  const links = [
    { name: "Home", imgsrc: one, url: "/home" },
    { name: "Employees", imgsrc: two, url: "/employees" },
    { name: "Tickets", imgsrc: three, url: "/tickets" },
    { name: "Leaves", imgsrc: four, url: "/leaves" },
    { name: "Reimbursement", imgsrc: five, url: "/reimbursement" },
    { name: "Policies", imgsrc: six, url: "/policies" },
  ];

  return (
    <div
    className="scrollbar-custom"
      style={{
        overflowX: isSidebarAnimating ? "hidden" : "scroll",
        display: "flex",
        gap: "15px",
        padding: "10px",
        transition: "overflowX 0.3s ease",
      }}
    >
      {links.map((link, index) => (
        <div
          key={index}
          style={{
            flex: "0 0 auto",
            width: "150px",
            height: "150px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
          }}
        >
          <a
            href={link.url}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${link.imgsrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.7)",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            ></div>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              {link.name}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default QuickLinks;
