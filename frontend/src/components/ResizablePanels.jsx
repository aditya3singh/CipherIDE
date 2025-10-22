import { useState } from 'react';

export default function ResizablePanels({ left, center, right }) {
  const [leftWidth, setLeftWidth] = useState(280);
  const [rightWidth, setRightWidth] = useState(window.innerWidth * 0.4);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const handleMouseDown = (side) => (e) => {
    e.preventDefault();
    if (side === 'left') setIsDraggingLeft(true);
    else setIsDraggingRight(true);
  };

  const handleMouseMove = (e) => {
    if (isDraggingLeft) {
      const newWidth = Math.max(200, Math.min(500, e.clientX));
      setLeftWidth(newWidth);
    }
    if (isDraggingRight && right) {
      const newWidth = Math.max(300, Math.min(window.innerWidth - 500, window.innerWidth - e.clientX));
      setRightWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  return (
    <div 
      style={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ ...styles.panel, width: `${leftWidth}px` }}>
        {left}
      </div>
      
      <div
        style={{
          ...styles.resizer,
          background: isDraggingLeft ? '#58a6ff' : '#30363d'
        }}
        onMouseDown={handleMouseDown('left')}
      />
      
      <div style={{ ...styles.panel, flex: 1, minWidth: 0 }}>
        {center}
      </div>
      
      {right && (
        <>
          <div
            style={{
              ...styles.resizer,
              background: isDraggingRight ? '#58a6ff' : '#30363d'
            }}
            onMouseDown={handleMouseDown('right')}
          />
          <div style={{ ...styles.panel, width: `${rightWidth}px` }}>
            {right}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    userSelect: 'none'
  },
  panel: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  resizer: {
    width: '4px',
    cursor: 'col-resize',
    background: '#30363d',
    transition: 'background 0.2s',
    flexShrink: 0
  }
};
