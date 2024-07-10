import React, { useEffect, useRef } from "react";
import thumbsUpGif from "../images/thumbs-up.gif";
import successSound from "../audio/Zor.m4a";

const SuccessAnimation = ({ show }) => {
  const audioRef = useRef(new Audio(successSound));
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (show) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to play the audio after 5 seconds
      timeoutRef.current = setTimeout(() => {
        audioRef.current
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
      }, 3000);
    } else {
      // If the animation is hidden, clear the timeout and reset the audio
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
