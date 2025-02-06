import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = daysOfWeek[currentTime.getDay()];
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col items-center animate-bounce">
        <span className="countdown font-mono text-5xl">{day}</span>
        <span>Day</span>
      </div>
      <div className="flex flex-col items-center animate-bounce">
        <span className="countdown font-mono text-5xl">{hours}</span>
        <span>Hours</span>
      </div>
      <div className="flex flex-col items-center animate-bounce">
        <span className="countdown font-mono text-5xl">{minutes}</span>
        <span>Minutes</span>
      </div>
      <div className="flex flex-col items-center animate-bounce">
        <span className="countdown font-mono text-5xl">{seconds}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};

export default Clock;
