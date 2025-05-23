import React, { useState, useEffect } from 'react';
import './Timer.css'; // Assuming you have a CSS file for styling

interface TimerProps {
  startTime: string;
  endTime: string;
  status: string;
  onTimeComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ startTime, endTime, status, onTimeComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const calculateInitialTime = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();

      if (now < start) {
        // Contest hasn't started
        setTimeLeft(Math.floor((start - now) / 1000));
        setIsActive(false);
      } else if (now >= start && now < end) {
        // Contest is ongoing
        setTimeLeft(Math.floor((end - now) / 1000));
        setIsActive(true);
      } else {
        // Contest has ended
        setTimeLeft(0);
        setIsActive(false);
        onTimeComplete();
      }
    };

    calculateInitialTime();

    const timer = setInterval(() => {
      calculateInitialTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime, status, onTimeComplete]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className={`timer-circle ${isActive && timeLeft <= 300 ? 'urgent' : isActive ? 'active' : ''}`}>      
      <div className="time-text">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default Timer;