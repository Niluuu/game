import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function 
Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
    left: `${props?.left}px`,
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable_content">
      {props.children}
    </div>
  );
}
