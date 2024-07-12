import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import base_music from "../audio/base-music.mp3";

function GameList() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef?.current?.play();
  });

  return (
    <div
      className="home"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <audio src={base_music} autoPlay ref={audioRef} />
      <div>
        <Link to="/gameOne">
          <img src={require(`../images/lion.png`)} alt="game" width={100} />
        </Link>
      </div>
      <div>
        <Link to="/gameTwo">
          <img
            src={require(`../images/toys/kamaz.png`)}
            alt="game"
            width={100}
          />
        </Link>
      </div>
    </div>
  );
}

export default GameList;
