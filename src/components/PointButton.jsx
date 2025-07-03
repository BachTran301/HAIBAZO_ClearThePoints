import React from "react";

function PointButton({ index, item, zIndex, handleClickPoint, timeCountdown }) {
  return (
    <button
      onClick={handleClickPoint}
      style={{ top: `${item.top}px`, left: `${item.left}px`, zIndex: zIndex }}
      className='point'
      value={index + 1}
    >
      {index + 1}
      <span style={{ display: item.countdown === timeCountdown ? "none" : "block" }} value={index + 1}>
        {(item.countdown / 1000).toFixed(1)}s
      </span>
    </button>
  );
}

export default PointButton; 