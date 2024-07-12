import React, { useEffect, useState, useRef } from "react";
import SuccessAnimation from "../components/SuccessAnimation";
import { Link } from "react-router-dom";
import "../App.css";
import toys from "../toys.json";
import itemPick from "../audio/item-pick.mp3";

function GameOne() {
  const [showAnimation, setShowAnimation] = useState(false);
  const successAnimationRef = useRef();
  const questionVoise = useRef();
  const pick = useRef(new Audio(itemPick));
  const [selectedToy, setselectedToy] = useState([]);

  const getToy = () => {
    // Function to shuffle the array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Randomly select a toy
    const randomlySelectToy = () => {
      const shuffledToys = shuffleArray([...toys]);
      return [shuffledToys[0]]; // Return the first item from the shuffled array
    };

    setselectedToy(randomlySelectToy());
  };

  useEffect(() => {
    getToy();
  }, [toys, 1]);

  const playSuccessAnimation = () => {
    setShowAnimation(true);
    if (successAnimationRef.current) {
      successAnimationRef.current.playAudio();
    }
    setTimeout(() => {
      setShowAnimation(false);
    }, 6000);
  };

  const handleClick = (id) => {
    pick.current.volume = 0.4;

    pick.current.play();

    if (id === selectedToy[0].id) {
      playSuccessAnimation();

      setTimeout(() => {
        getToy();
      }, 4000);
    } else {
    }
  };

  return (
    <div className="game_two">
      <Link to="/">
        <img
          src={require(`../images/back.png`)}
          alt="game"
          width={100}
          className="transform rotate-180"
        />
      </Link>

      <div className="flex justify-center align-bottom ">
        <div className="w-52 h-52 absolute bottom-0">
          <img src={require(`../images/boy.png`)} alt="boy" />
          {selectedToy.map((toy) => (
            <>
              <img
                src={require(`../${toy.imagePath}`)}
                alt="toy"
                className="absolute top-0 w-20 h-20 right-4"
              />
              <audio src={toy.questionVoise} autoPlay />
            </>
          ))}
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full max-w-3xl mx-auto">
          {toys.map((toy, index) => (
            <div
              key={toy.id}
              className="flex justify-center items-center mt-24"
            >
              <img
                src={require(`../${toy.imagePath}`)}
                alt={toy.name}
                className="w-24 h-24 object-cover rounded-lg shadow-md pointer"
                onClick={() => handleClick(toy.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <SuccessAnimation ref={successAnimationRef} show={showAnimation} />
    </div>
  );
}

export default GameOne;
