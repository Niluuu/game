import React, { useEffect, useRef } from "react";
import thumbsUpGif from "../images/thumbs-up.gif";
import successSound from "../audio/Zor.m4a";

const SuccessAnimation = ({ show }) => {
  const audioRef = useRef(new Audio(successSound));

  useEffect(() => {
    if (show) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      <img src={thumbsUpGif} alt="Success" width="100" height="100" />
    </div>
  );
};

export default SuccessAnimation;
