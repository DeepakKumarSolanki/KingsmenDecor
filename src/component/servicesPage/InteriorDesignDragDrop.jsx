import React, { useState, useEffect, useCallback } from "react";

const interiorItems = [
  { id: "living Room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "bathroom", name: "Bathroom" },
  { id: "balcony", name: "Balcony" },
  { id: "outdoor", name: "Outdoor" },
];

const imageUrls = [
  "https://i.pinimg.com/originals/b2/77/4a/b2774ade393c2612fbe949c7a7098930.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUajTzhJG-Bwgw0oTslq-rR1pJWWIlI-zIsA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSecEAlFpFiiq-OdkB_O20Ee3wq5tlOfdkzEA&s",
  "https://www.thaigardendesign.com/wp-content/uploads/2017/03/6a010534c75d2a970c01761771d45b970c.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBR7XEUrP5rFfjdUE2xDbHxpt8almv6AczmA&s"
];

export default function InteriorDesignDragDrop() {
  const [droppedItems, setDroppedItems] = useState({});
  const [positions, setPositions] = useState(
    interiorItems.map((item) => item.id)
  );
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  useEffect(() => {
    const positionInterval = setInterval(() => {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        for (let i = newPositions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newPositions[i], newPositions[j]] = [
            newPositions[j],
            newPositions[i],
          ];
        }
        return newPositions;
      });
    }, 2000);

    const popupInterval = setInterval(() => {
      setShowPopup(true);
    }, 5000);

    return () => {
      clearInterval(positionInterval);
      clearInterval(popupInterval);
    };
  }, []);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, position) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    if (id === position) {
      setDroppedItems((prev) => ({ ...prev, [position]: id }));
    } else {
      e.target.classList.add("incorrect");
      setTimeout(() => {
        e.target.classList.remove("incorrect");
      }, 1000);
    }
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup();
    }
  };

  return (
    <div className="interior-design-container">
      <section className="draggable-elements top-spacing bottom-spacing">
        {interiorItems.map((item, index) => (
          <div
            key={item.id}
            className={`draggable ${
              Object.values(droppedItems).includes(item.id) ? "dragged" : ""
            }`}
            id={item.id}
            draggable={!Object.values(droppedItems).includes(item.id)}
            onDragStart={(e) => onDragStart(e, item.id)}
          >
            <div className="flex flex-col gap-3">
              <img loading="lazy" src={imageUrls[index]} alt={item.name} />
              <p className="text-sm">{item.name}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="droppable-elements">
        <h2>Drop your interior items here</h2>
        <div className="room-layout">
          {positions.map((position, index) => {
            const item = interiorItems.find((i) => i.id === position);
            return (
              <div
                key={item.id}
                className={`drop-zone ${item.id}`}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, item.id)}
                style={{ gridArea: `area-${index + 1}` }}
              >
                {droppedItems[item.id] ? (
                  <div className="dropped-item">
                    <img
                      src={
                        imageUrls[
                          interiorItems.findIndex((i) => i.id === item.id)
                        ]
                      }
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                  </div>
                ) : (
                  <p>{item.name}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* {showPopup && (
        <div className="popup" onClick={handlePopupClick}>
          <div
            className="popup-content"
            role="dialog"
            aria-labelledby="popup-title"
          >
            <h2 id="popup-title">
              YOU NEED US FOR YOUR PERFECT HOME DESIGN SO CONTACT US
            </h2>
            <button
              className="contact-button"
              onClick={(e) => e.stopPropagation()}
            >
              Contact Us
            </button>
            <button
              className="close-button"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ×
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}