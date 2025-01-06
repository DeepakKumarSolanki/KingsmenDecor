import React, { useState, useEffect } from "react";

const brands = [
  // Add the array of brand objects here...
];

const DragAndDropGame = () => {
  const [draggableBrands, setDraggableBrands] = useState([]);
  const [droppableBrands, setDroppableBrands] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const totalDraggableItems = 5;
  const totalMatchingPairs = 5;

  useEffect(() => {
    initiateGame();
  }, []);

  const initiateGame = () => {
    const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
    const randomDroppableBrands =
      totalMatchingPairs < totalDraggableItems
        ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands)
        : randomDraggableBrands;

    setDraggableBrands(randomDraggableBrands);
    setDroppableBrands(
      [...randomDroppableBrands].sort((a, b) =>
        a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase())
      )
    );
    setCorrect(0);
    setTotal(0);
  };

  const handleDragStart = (event, iconName) => {
    event.dataTransfer.setData("text", iconName);
  };

  const handleDrop = (event, droppableBrand) => {
    event.preventDefault();
    const draggableBrand = event.dataTransfer.getData("text");

    if (draggableBrand === droppableBrand) {
      setCorrect((prev) => prev + 1);
      const updatedDraggableBrands = draggableBrands.filter(
        (brand) => brand.iconName !== draggableBrand
      );
      setDraggableBrands(updatedDraggableBrands);
      setDroppableBrands((prev) =>
        prev.map((brand) =>
          brand.iconName === droppableBrand
            ? { ...brand, isDropped: true }
            : brand
        )
      );
    }
    setTotal((prev) => prev + 1);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const playAgain = () => {
    initiateGame();
  };

  const generateRandomItemsArray = (n, originalArray) => {
    let res = [];
    let clonedArray = [...originalArray];
    if (n > clonedArray.length) n = clonedArray.length;
    for (let i = 1; i <= n; i++) {
      const randomIndex = Math.floor(Math.random() * clonedArray.length);
      res.push(clonedArray[randomIndex]);
      clonedArray.splice(randomIndex, 1);
    }
    return res;
  };

  return (
    <div>
      <section className="score">
        <span className="correct">{correct}</span>/<span className="total">{total}</span>
        <button id="play-again-btn" onClick={playAgain}>
          Play Again
        </button>
      </section>

      <section className="draggable-items">
        {draggableBrands.map((brand) => (
          <i
            key={brand.iconName}
            className={`fab fa-${brand.iconName} draggable`}
            draggable={!brand.isDropped}
            style={{ color: brand.color }}
            onDragStart={(event) => handleDragStart(event, brand.iconName)}
          ></i>
        ))}
      </section>

      <section className="matching-pairs">
        {droppableBrands.map((brand) => (
          <div className="matching-pair" key={brand.iconName}>
            <span className="label">{brand.brandName}</span>
            <span
              className={`droppable ${brand.isDropped ? "dropped" : ""}`}
              data-brand={brand.iconName}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, brand.iconName)}
            >
              {brand.isDropped && (
                <i
                  className={`fab fa-${brand.iconName}`}
                  style={{ color: brand.color }}
                ></i>
              )}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DragAndDropGame;
