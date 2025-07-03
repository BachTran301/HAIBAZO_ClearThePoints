import React from "react";
import "../layout/Layout.css";

function GameInfo({ win, error, points, time, onChangePoint, onRestart, auto, setAuto }) {
  return (
    <div>
      {!error && (
        <h3 className={`game-title ${win ? 'win' : ''}`}>
          {win ? "ALL CLEARED" : "Let's Play"}
        </h3>
      )}
      {error && <h3 className="game-title error">Game Over</h3>}

      <p className="inline-block">Points:</p>
      <input onChange={onChangePoint} value={points} className="game-input" type="text" />

      <div>
        <p className="inline-block">Time:</p>
        <span>{time.toFixed(1)}</span>
      </div>

      <div className="flex-row">
        <button onClick={onRestart}>Restart</button>
        {(time > 0 && !win && !error) && (
          <button onClick={() => setAuto(!auto)}>
            Auto Play {auto ? "OFF" : "ON"}
          </button>
        )}
      </div>
      
    </div>
  );
}

export default GameInfo;
