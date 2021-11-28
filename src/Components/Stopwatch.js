import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import Timer from "./Timer";
import styles from "./Stopwatch.module.css";
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [buttonName, setButtonName] = useState("Start");
  const [onWait, setOnWait] = useState(false);

  const handleStartStop = () => {
    setIsActive((prevState) => !prevState);
    if (buttonName === "Stop") {
      setTime(0);
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };
  let timer;
  const handleWait = (e) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => {
        setIsActive(true);
        setOnWait(false);
      }, 300);
    } else if (e.detail === 2) {
      setIsActive(false);
      setOnWait(true);
    }
  };

  const handleReset = () => setTime(0);

  useEffect(() => {
    !isActive ? setButtonName("Start") : setButtonName("Stop");
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (onWait) {
      clearInterval(interval);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, onWait]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>MY REACT STOPWATCH</p>
      <Timer time={time} />
      <Buttons
        buttonName={buttonName}
        handleStartStop={handleStartStop}
        handleWait={handleWait}
        handleReset={handleReset}
      />
    </div>
  );
};

export default Stopwatch;
