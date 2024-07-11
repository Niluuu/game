import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import successSound from "../audio/base-music.mp3";

function GameList() {
  const audioRef = useRef(new Audio(successSound));

  useEffect(() => {
    const playAudio = () => {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay prevented. Will play on user interaction.");
      });
      audioRef.current.volume = 0.1
      // Remove the event listener after the first interaction
      document.removeEventListener("click", playAudio);
    };

    // Try to play immediately
    playAudio();

    // If immediate play fails, set up event listener for user interaction
    document.addEventListener("click", playAudio);

    return () => {
      audioRef.current.pause();
      document.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <div
      className="layout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid grey",
          background: "yellow",
          height: "110px",
        }}
      >
        <Link to="/gameOne">
          <img src={require(`../images/lion.png`)} alt="game" width={100} />
        </Link>
      </div>
      <div
        style={{
          border: "1px solid grey",
          background: "yellow",
          height: "110px",
        }}
      >
        <Link to="/gameOne">
          <img src={require(`../images/ayiq.png`)} alt="game" width={100} />
        </Link>
      </div>
    </div>
  );
}

export default GameList;
