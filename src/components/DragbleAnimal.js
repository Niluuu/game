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

  const imagePath = require(`../${animal?.imagePath}`);
  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      //   grid={[25, 25]}
      scale={1}
      onStart={() => eventLogger}
      onDrag={() => eventLogger}
    >
      <div className="handle" style={{ cursor: "pointer" }}>
        <img src={imagePath} alt={animal?.name} width={100} />
        <audio ref={voiceRef} src={animal?.voiceMedia}></audio>
        <audio ref={nameSoundRef} src={animal?.nameSound}></audio>
      </div>
    </Draggable>
  );
}
