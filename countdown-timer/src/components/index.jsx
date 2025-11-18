import { useEffect, useState } from "react";
import Timer from "./timer";
import bgVid from "../assets/bgVid.mp4";

const computeTotalCentiseconds = (h, m, s, ms) => (((h * 60) + m) * 60 + s) * 100 + ms;

function Index () {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [initialCentiseconds, setInitialCentiseconds] = useState(0);

  useEffect(() => {
    let interval;
    if(isRunning){
        interval = setInterval(() => {
            setMilliseconds((prevMs) => {
                if (prevMs > 0) {
                    return prevMs - 1;
                } else {
                    // Milliseconds reached 0, check seconds
                    setSeconds((prevSec) => {
                        if (prevSec > 0) {
                            return prevSec - 1;
                        } else {
                            // Seconds reached 0, check minutes
                            setMinutes((prevMin) => {
                                if (prevMin > 0) {
                                    return prevMin - 1;
                                } else {
                                    // Minutes reached 0, check hours
                                    setHours((prevHr) => {
                                        if (prevHr > 0) {
                                            return prevHr - 1;
                                        } else {
                                            // All time reached 0
                                            setIsRunning(false);
                                            return 0;
                                        }
                                    });
                                    return 59; // Reset minutes to 59
                                }
                            });
                            return 59; // Reset seconds to 59
                        }
                    });
                    return 99; // Reset milliseconds to 99
                }
            });
        }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Check if timer reached 0
  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
      if (isRunning) {
        setIsRunning(false);
      }
      if (initialCentiseconds !== 0) {
        setInitialCentiseconds(0);
      }
    }
  }, [hours, minutes, seconds, milliseconds, isRunning, initialCentiseconds]);

  // handlers
  const syncInitialWithInputs = (nextHours, nextMinutes, nextSeconds, nextMilliseconds) => {
    if (!isRunning) {
      setInitialCentiseconds(computeTotalCentiseconds(nextHours, nextMinutes, nextSeconds, nextMilliseconds));
    }
  };

  const changeSeconds = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 59) {
      setSeconds(value);
      syncInitialWithInputs(hours, minutes, value, milliseconds);
    }
  }

  const changeMinutes = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 59) {
      setMinutes(value);
      syncInitialWithInputs(hours, value, seconds, milliseconds);
    }
  }

  const changeHours = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0) {
      setHours(value);
      syncInitialWithInputs(value, minutes, seconds, milliseconds);
    }
  }

  const handleStart = () => {
    const total = computeTotalCentiseconds(hours, minutes, seconds, milliseconds);
    if (total > 0) {
      if (initialCentiseconds === 0) {
        setInitialCentiseconds(total);
      }
      setIsRunning(true);
    }
  }

  const handlePause = () => {
    setIsRunning(false);
  }

  const handleStop = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setInitialCentiseconds(0);
  }

  const remainingCentiseconds = computeTotalCentiseconds(hours, minutes, seconds, milliseconds);
  const progressRatio = initialCentiseconds > 0 
    ? Math.min(Math.max(1 - (remainingCentiseconds / initialCentiseconds), 0), 1)
    : 0;

    return (
      <div className="relative min-h-screen overflow-hidden">
        <video 
          src={bgVid} 
          autoPlay 
          loop 
          muted 
          className="fixed inset-0 w-full h-full object-cover"
        />
        <div className="fixed inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8">
          <h1 className='text-4xl font-bold text-white mb-6 text-center text-shadow-neutral-700'>Countdown Timer</h1>

          <div className="w-full max-w-4xl">
            <Timer 
              milliseconds={milliseconds} 
              seconds={seconds} 
              minutes={minutes} 
              hours={hours}
              changeSeconds={changeSeconds}
              changeMinutes={changeMinutes}
              changeHours={changeHours}
              isRunning={isRunning}
              progress={progressRatio}
            />
          </div>
            <br />

            <div className="flex gap-4 justify-center items-center mt-6">
              {!isRunning ? (
                <button 
                  onClick={handleStart}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0}
                >
                  Start
                </button>
              ) : (
                <button 
                  onClick={handlePause}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Pause
                </button>
              )}
              <button 
                onClick={handleStop}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Stop
              </button>
            </div>
        </div>
      </div>
    )
  }
  
  export default Index