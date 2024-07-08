import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";

export default function DragbleAnimal(props) {
  const voiceRef = useRef();
  const nameSoundRef = useRef();
  const { animal } = props;

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
      console.log('SUCCESS!!!!')
    }
  }

  const imagePath = require(`../${animal?.imagePath}`);
  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: animal.position[0], y: animal.position[1] }}
      position={null}
      //   grid={[25, 25]}
      scale={1}
      onStart={() => eventLogger}
      onDrag={() => eventLogger}
      onStop={handleDragEnd}
    >
      <div className="handle" style={{ cursor: "pointer" }}>
        <img src={imagePath} alt={animal?.name} width={100} />
        <audio ref={voiceRef} src={animal?.voiceMedia}></audio>
        <audio ref={nameSoundRef} src={animal?.nameSound}></audio>
      </div>
    </Draggable>
  );
}
