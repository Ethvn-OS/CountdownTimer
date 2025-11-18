import React from "react";

function Timer({milliseconds, seconds, minutes, hours, changeSeconds, changeMinutes, changeHours, isRunning, progress}) {
    return (
        <>
            <div 
                className={`timer-progress ${isRunning ? "timer-progress--active" : ""}`} 
                style={{ "--timer-progress": progress }}
            >
                <div className="timer-card flex flex-row items-center justify-center w-full gap-8 bg-gray-900 text-white rounded-2xl px-12 py-8 overflow-hidden">
                    <div className="flex flex-row gap-8 justify-center items-center">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <label>hh</label>
                        <input 
                            type="number"
                            value={!isRunning && hours === 0 ? "" : hours} 
                            placeholder="0"
                            onChange={changeHours} 
                            disabled={isRunning}
                            className="w-20 h-20 focus:outline-1 focus:outline-gray-200 focus:text-black rounded-md text-center focus:bg-white text-4xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <label>mm</label>
                        <input 
                            type="number"
                            value={!isRunning && minutes === 0 ? "" : minutes} 
                            placeholder="0"
                            onChange={changeMinutes} 
                            disabled={isRunning}
                            className="w-20 h-20 focus:outline-1 focus:outline-gray-200 focus:text-black rounded-md text-center focus:bg-white text-4xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <label>ss</label>
                        <input 
                            type="number"
                            value={!isRunning && seconds === 0 ? "" : seconds} 
                            placeholder="0"
                            onChange={changeSeconds} 
                            disabled={isRunning}
                            className="w-20 h-20 focus:outline-1 focus:outline-gray-200 focus:text-black rounded-md text-center focus:bg-white text-4xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <label>ms</label>
                        <input 
                            type="number"
                            value={milliseconds} 
                            disabled
                            className="w-20 h-20 focus:outline-1 focus:outline-gray-200 focus:text-black rounded-md text-center focus:bg-white text-4xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Timer