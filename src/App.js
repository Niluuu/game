import { useEffect } from "react";
import "./App.css";
import animals from "./animal.json";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggble";
import Droppable from "./Droppable";

function Example(props) {
  const { animal } = props;
  const [parent, setParent] = useState(null);
  const voiceRef = React.useRef(null);
  const nameSoundRef = React.useRef(null);

  const imagePath = require(`./${animal.imagePath}`);

  const draggable = (
    <Draggable id={animal.name} key={animal.name} left={animal.left}>
      <img src={imagePath} alt={animal.name} width={100} />
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {!parent ? draggable : null}
      <Droppable id={animal.name} left={animal.left}>
        {parent === animal.name ? (
          <Draggable id={animal.name} key={animal.name} left={animal.left}>
            <img
              src={imagePath}
              alt={animal.name}
              width={100}
              className="base_img"
            />
          </Draggable>
        ) : (
          <img
            src={imagePath}
            alt={animal.name}
            width={100}
            className="drop_img"
          />
        )}
      </Droppable>
      <audio ref={voiceRef} src={animal.voiceMedia}></audio>
      <audio ref={nameSoundRef} src={animal.nameSound}></audio>
    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);

    if (voiceRef.current) {
      voiceRef.current.play();
    }
  }

  function handleDragStart({ over }) {
    setParent(over ? over.id : null);

    if (nameSoundRef.current) {
      nameSoundRef.current.volume = 0.5;
      nameSoundRef.current.play();
    }
  }
}

const animalsWithPosition = (animals) => {
  let result = animals.map((animal, index) =>
    Object.assign({
      ...animal,
      left: index * 200,
    })
  );

  return result;
};

function App() {
  return (
    <div className="layout">
      <div className="row_flex first_game">
        {animalsWithPosition(animals).map((animal) => (
          <Example animal={animal} />
        ))}
      </div>
    </div>
  );
}

export default App;
