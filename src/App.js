import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import animals from "./animal.json";
import DragbleAnimal from "./components/DragbleAnimal";
import SuccessAnimation from "./components/SuccessAnimation";

const animalsWithPosition = (animals) => {
  return animals.map((animal, index) => ({
    ...animal,
    x: (index % 3) * 200, // This ensures consistent horizontal spacing
    y: Math.floor(index / 3) * 200 + 200, // This ensures consistent vertical spacing
    targetPosition: [animal.targetPosition[0], animal.targetPosition[1]],
  }));
};

function App() {
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [correctlyPlaced, setCorrectlyPlaced] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const successAnimationRef = useRef();
  const allAnimalsWithPosition = useRef(animalsWithPosition(animals));

  useEffect(() => {
    setCurrentAnimals(allAnimalsWithPosition.current.slice(0, 3));
  }, []);

  const playSuccessAnimation = () => {
    setShowAnimation(true);
    if (successAnimationRef.current) {
      successAnimationRef.current.playAudio();
    }
    setTimeout(() => {
      setShowAnimation(false);
      setCurrentGroup((prevGroup) => {
        const nextGroup = prevGroup + 1;
        setCurrentAnimals(
          allAnimalsWithPosition.current.slice(
            nextGroup * 3,
            (nextGroup + 1) * 3
          )
        );
        return nextGroup;
      });
    }, 2000);
  };

  useEffect(() => {
    if (
      correctlyPlaced.length === (currentGroup + 1) * 3 &&
      correctlyPlaced.length < animals.length
    ) {
      playSuccessAnimation();
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
          {allAnimalsWithPosition.current.map((animal) => (
            <div
              key={animal.id}
              id={animal.id}
              style={{
                opacity: currentAnimals.some((a) => a.id === animal.id)
                  ? "0.5"
                  : "0",
                position: "absolute",
                left: `${animal.targetPosition[0]}px`,
                top: `${animal.targetPosition[1]}px`,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <img
                src={require(`./${animal.imagePath}`)}
                alt={animal.name}
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
      <SuccessAnimation ref={successAnimationRef} show={showAnimation} />
    </div>
  );
}

export default App;
