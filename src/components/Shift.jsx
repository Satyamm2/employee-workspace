import { useState, useEffect } from "react";
import { Button } from "./Button";

export default function Shift() {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    setIsShiftActive(true);
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setTimerId(id);
  };

  const handleEnd = () => {
    setIsShiftActive(false);
    clearInterval(timerId);
    setTimerId(null);
  };

  useEffect(() => {
    return () => clearInterval(timerId);
  }, [timerId]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300">
        Shift
      </h2>

      {isShiftActive ? (
        <>
          <p className="text-lg mb-4">
            <span className=" bg-green-300 rounded-lg px-2 py-1 ">
              Time: {formatTime(time)}
            </span>
          </p>
          <Button label="End Shift" onClick={handleEnd} />
        </>
      ) : (
        <>
          {time > 0 && (
            <p className="text-lg mb-4 ">
              <span className="bg-yellow-200 px-2 py-1 rounded-lg">
                Last Shift Duration: {formatTime(time)}
              </span>
            </p>
          )}
          <Button label="Start Now" onClick={handleStart} />
        </>
      )}
    </div>
  );
}
