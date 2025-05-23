import React, { useRef, useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';

const BUTTON_SIZE = 46; 
const EDGE_MARGIN = 8;  

const getMaxWidth = () => Math.max(window.innerWidth, document.documentElement.scrollWidth);
const getMaxHeight = () => Math.max(window.innerHeight, document.documentElement.scrollHeight);

const DraggableButton = ({ onClick, isVisible = true }) => {
  const [pos, setPos] = useState({
    x: getMaxWidth() - BUTTON_SIZE - EDGE_MARGIN,
    y: Math.floor((getMaxHeight() / 2) - (BUTTON_SIZE / 2)),
  });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

   useEffect(() => {
    const handleResizeOrScroll = () => {
      setPos((prev) => ({
        x: Math.max(EDGE_MARGIN, Math.min(prev.x, getMaxWidth() - BUTTON_SIZE - EDGE_MARGIN)),
        y: Math.max(EDGE_MARGIN, Math.min(prev.y, getMaxHeight() - BUTTON_SIZE - EDGE_MARGIN)),
      }));
    };
    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll);
    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, []);

  // Snap to nearest edge (left or right)
  const snapToEdge = ({ x, y }) => {
    const screenW = getMaxWidth();
    const screenH = getMaxHeight();
    // Snap X to left or right edge
    const snapX = x + BUTTON_SIZE / 2 < screenW / 2
      ? EDGE_MARGIN
      : screenW - BUTTON_SIZE - EDGE_MARGIN;
    // Clamp Y to top/bottom edges
    const snapY = Math.max(EDGE_MARGIN, Math.min(y, screenH - BUTTON_SIZE - EDGE_MARGIN));
    return { x: snapX, y: snapY };
  };

  const handleDragStart = (e) => {
    setDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    dragOffset.current = {
      x: clientX - pos.x,
      y: clientY - pos.y,
    };
    e.stopPropagation();
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    let newX = clientX - dragOffset.current.x;
    let newY = clientY - dragOffset.current.y;
    // Clamp to viewport
    newX = Math.max(EDGE_MARGIN, Math.min(newX, getMaxWidth() - BUTTON_SIZE - EDGE_MARGIN));
    newY = Math.max(EDGE_MARGIN, Math.min(newY, getMaxHeight() - BUTTON_SIZE - EDGE_MARGIN));
    setPos({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setDragging(false);
    setPos((prev) => snapToEdge(prev));
  };

  // Only trigger onClick if not dragging
  const handleClick = (e) => {
    if (!dragging && onClick) onClick(e);
  };

  // useEffect for desktop mouse drag support
  useEffect(() => {
    if (!dragging) return;

    const handleWindowMouseMove = (e) => {
      handleDrag(e);
    };
    const handleWindowMouseUp = () => {
      handleDragEnd();
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [dragging]);

  return (
    <button
      type="button"
      aria-label="Open chat"
      onClick={handleClick}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        zIndex: 50,
        touchAction: 'none',
        transition: dragging 
          ? 'none' 
          : 'all 0.3s ease-in-out',
        boxShadow: dragging 
          ? '0 0 0 4px rgba(255, 255, 255, 0.2)' 
          : '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        cursor: dragging ? 'grabbing' : 'pointer',
        userSelect: 'none',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        mixBlendMode: 'difference',
      }}
      className="bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center 
        focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95 backdrop-blur-md
        before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
        before:from-white/10 before:to-transparent before:animate-gradient"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
    >
      <FaRobot className="text-2xl" />
    </button>
  );
};

export default DraggableButton;
