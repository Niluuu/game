import React, { useRef, useState } from "react";
import "../App.css";
import Draggable from "./Draggable";

export default function DragbleAnimal(props) {
  const voiceRef = useRef();
  const nameSoundRef = useRef();
  const { animal, onCorrectPlacement } = props;
  const [success, set_success] = useState(false);

  const eventLogger = (e, data) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  };

  const handleDragEnd = (event) => {
    console.log("animal id", animal.id, event.clientX, event.clientY);
    const XDropOffset = Math.abs(event.clientX - animal.targetPosition[0]);
    const YDropOffset = Math.abs(event.clientY - animal.targetPosition[1]);
    console.log(XDropOffset, YDropOffset);
    if (XDropOffset < 100 && YDropOffset < 100) {
      set_success(true);
      onCorrectPlacement(animal.id);
      nameSoundRef.current.play();
    }
  };

  const imagePath = require(`../${animal?.imagePath}`);
  return (
    <Draggable
      defaultPosition={{ x: animal.position[0], y: animal.position[1] }}
      position={
        success
          ? { x: animal.targetPosition[0], y: animal.targetPosition[1] }
          : null
      }
      scale={1}
      onStart={() => eventLogger}
      onDrag={() => eventLogger}
      onStop={handleDragEnd}
      disabled={success}
    >
      <div className="handle float" style={{ cursor: "pointer" }}>
        <img src={imagePath} alt={animal?.name} width={100} />
        <audio ref={voiceRef} src={animal?.voiceMedia}></audio>
        <audio ref={nameSoundRef} src={animal?.nameSound}></audio>
      </div>
    </Draggable>
  );
}
