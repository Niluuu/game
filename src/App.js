import React, { useEffect, useState } from "react";
import "./App.css";
import animals from "./animal.json";
import DragbleAnimal from "./components/DragbleAnimal";
import SuccessAnimation from "./components/SuccessAnimation";

const animalsWithPosition = (animals) => {
  return animals.map((animal, index) => ({
    ...animal,
    x: index * 200,
    y: 200,
    targetPosition: [index * 200, 200], // Assuming this is the correct position
  }));
};

function App() {
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [correctlyPlaced, setCorrectlyPlaced] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const initialAnimals = animalsWithPosition(animals);
    setCurrentAnimals(initialAnimals.slice(0, 3));
  }, []);

  useEffect(() => {
    if (
      correctlyPlaced.length === (currentGroup + 1) * 3 &&
      correctlyPlaced.length < animals.length
    ) {
       setTimeout(() => {
        setShowAnimation(false);
        setCurrentGroup(currentGroup + 1);
        const nextGroupAnimals = animalsWithPosition(animals).slice(
          (currentGroup + 1) * 3,
          (currentGroup + 2) * 3
        );
        setCurrentAnimals(nextGroupAnimals);
      }, 2000);
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        setCurrentGroup(currentGroup + 1);
        const nextGroupAnimals = animalsWithPosition(animals).slice(
          (currentGroup + 1) * 3,
          (currentGroup + 2) * 3
        );
        setCurrentAnimals(nextGroupAnimals);
      }, 2000); // Increased delay to allow animation to play
    }
  }, [correctlyPlaced, currentGroup]);

  const handleAnimalPlaced = (animalId) => {
    if (!correctlyPlaced.includes(animalId)) {
      setCorrectlyPlaced((prev) => [...prev, animalId]);
    }
  };

  return (
    <div className="layout">
      <div className="">
        <div className="">
          {currentAnimals.map((animal) => (
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
          {currentAnimals.map((animal) => (
            <DragbleAnimal
              key={animal.id}
              animal={animal}
              onCorrectPlacement={() => handleAnimalPlaced(animal.id)}
            />
          ))}
        </div>
      </div>
      <SuccessAnimation show={showAnimation} />
    </div>
  );
}

export default App;
