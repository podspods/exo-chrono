import { StrictMode, useEffect, useState } from "react";
import { AppGlobalStyle, Trigger } from "../style/App.style";
/**
 * main component for the application
 * @returns
 *
 */
const nbSecondeParMinute: number = 60;
const interval: number = 100;

type duration = {
  minute: number;
  second: number;
};

export type DisplayTimingsProps = {
  timings: duration[];
};

export function PlayButton(props: any) {
  //   let iconClassName: string = ;
  //   if (props.state) iconClassName = ;

  return (
    <>
      <button onClick={props.onClick}>
        {props.state ? (
          <i className="fa-sharp fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </button>
    </>
  );
}

export function DisplayTimings({ timings }: DisplayTimingsProps) {
  return (
    <>
      <ul>
        {timings.map((performance: duration, index: number) => (
          <li key={index}>{`${performance.minute}:${performance.second}`}</li>
        ))}
      </ul>
    </>
  );
}

export default function App() {
  // STATE : useState

  const [timings, setTimings] = useState<duration[]>([]);
  const [isStarted, setStarted] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  let secondCounting: number = 0;

  // ACTIONS

  //     setTimming (timming.push(performance))

  function toggleTimer() {
    setStarted(!isStarted);
  }

  function resetTimer() {
    const performance: duration = { minute: minute, second: second };
    timings.push(performance);
    setTimings(timings);
    console.log(timings.length);
    setStarted(false);
    setSecond(0);
    setMinute(0);
  }

  //   // EFFET : useEffect : counter
  useEffect(() => {
    //    case isStarted === false
    if (!isStarted) {
			console.log(isStarted)
      if (minute > 0 || second > 0) {
        const performance: duration = { minute: minute, second: second };
        timings.push(performance);
        setTimings((timings) =>timings);
				console.log(performance)
				console.log(timings.length)
				console.log(timings)

			}
      return;
    }

    // case isStarted === true

    let timer = window.setInterval(() => {
      secondCounting += 1;
      if (secondCounting >= nbSecondeParMinute) {
        const newMinute = Math.floor(secondCounting / nbSecondeParMinute);
        setMinute((minute) => newMinute);
        setSecond((second) => secondCounting % nbSecondeParMinute);
      } else setSecond((second) => secondCounting);
    }, interval);

    // clean up
    return () => {
      window.clearInterval(timer);
    };
  }, [isStarted]);

  return (
    <StrictMode>
      <AppGlobalStyle />
      <p>{`${(minute < 10 ? "0" : "") + minute}:${
        (second < 10 ? "0" : "") + second
      }`}</p>
      <PlayButton onClick={toggleTimer} state={isStarted} />
      <button onClick={resetTimer}>
        <i className="fa-solid fa-arrows-spin"></i>
      </button>
      <DisplayTimings timings={timings} />
    </StrictMode>
  );
}
