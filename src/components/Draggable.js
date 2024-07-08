import React, { useState, useRef, useEffect } from "react";

const Draggable = ({
  children,
  defaultPosition,
  position,
  scale,
  onStart,
  onDrag,
  onStop,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState(defaultPosition || { x: 0, y: 0 });
  const dragRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (position) {
      setTranslate(position);
    }
  }, [position]);

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    lastPositionRef.current = { x: clientX, y: clientY };
    if (onStart) onStart({ clientX, clientY });
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;

    const delta = {
      x: (clientX - lastPositionRef.current.x) / scale,
      y: (clientY - lastPositionRef.current.y) / scale,
    };

    const newTranslate = {
      x: translate.x + delta.x,
      y: translate.y + delta.y,
    };

    setTranslate(newTranslate);
    lastPositionRef.current = { x: clientX, y: clientY };
    if (onDrag) onDrag({ clientX, clientY }, newTranslate);
  };

  const handleEnd = (clientX, clientY) => {
    setIsDragging(false);
    if (onStop) onStop({ clientX, clientY }, translate);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => handleStart(e.clientX, e.clientY);
  const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const handleMouseUp = (e) => handleEnd(e.clientX, e.clientY);

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    handleEnd(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, translate]);

  return (
    <div
      ref={dragRef}
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};

export default Draggable;
