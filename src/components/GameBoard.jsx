import React from "react";
import PointButton from "./PointButton";

function GameBoard({ arrDisplay, gamePlayRef, handleClickPoint, timeCountdown }) {
  return (
    <div ref={gamePlayRef} className="game-play">
      {arrDisplay.map((item, index) => {
        const zIndex = arrDisplay.length - index;
        return (
          <PointButton
            key={item.id}
            index={index}
            item={item}
            zIndex={zIndex}
            handleClickPoint={handleClickPoint}
            timeCountdown={timeCountdown}
          />
        );
      })}
    </div>
  );
}

export default GameBoard; 