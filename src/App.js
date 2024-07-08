import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import animals from "./animal.json";
import DragbleAnimal from "./components/DragbleAnimal";

const animalsWithPosition = (animals) => {
  let result = animals.map((animal, index) =>
    Object.assign({
      ...animal,
      x: index * 200,
      y: 200,
    })
  );

  return result;
};

function App() {
  return (
    <div className="layout">
      <div className="">
        <div className="">
          {animalsWithPosition(animals).map((animal) => (
            <div
              key={animal.id}
              id={animal.id}
              style={{
                opacity: "0.5",
                position: "absolute",
                left: `${animal.targetPosition[0]}px`,
                top: `${animal.targetPosition[1]}px`,
              }}
            >
              <img
                src={require(`./${animal?.imagePath}`)}
                alt={animal?.name}
                width={100}
              />
            </div>
          ))}
        </div>

        <div className="">
          {animalsWithPosition(animals).map((animal) => (
            <DragbleAnimal key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
