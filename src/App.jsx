import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [intervalId, setIntervalId] = useState(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const shortBreakDuration = 5 * 60;
  const longBreakDuration = 15 * 60;

  const handleStart = () => {
    setIsStarted(true);
    const newIntervalId = setInterval(() => {
      setCurrentTime((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handlePause = () => {
    setIsStarted(false);
    clearInterval(intervalId);
  };

  const handleReset = () => {
    setIsStarted(false);
    clearInterval(intervalId);
    setCurrentTime(25 * 60);
  };

  useEffect(() => {
    if (currentTime === 0) {
      if (isShortBreak) {
        setIsShortBreak(false);
        setCurrentTime(25 * 60);
        setPomodoroCount(pomodoroCount + 1);
      } else {
        setIsShortBreak(true);
        setCurrentTime(shortBreakDuration);
      }
    }
  }, [currentTime, isShortBreak]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleLongBreak = () => {
    if (pomodoroCount % 4 === 0 && !isShortBreak) {
      setIsStarted(false);
      clearInterval(intervalId);
      setCurrentTime(longBreakDuration);
    }
  };

  return (
    <div className="pomodoro-container">
      <h1 className="pomodoro-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 64 64">
          <path fill="#ff6161" d="M61.96 31.649C60.747 10.563 49.854 7.48 41.072 7.479h-.001c-2.219.001-4.301.197-6.06.351c-.015-.959.026-1.986.187-3.121c.003-.016-.004-.03-.006-.045c.002-.008.006-.016.006-.024c0-.353-.664-.64-1.486-.64c-.82 0-1.484.287-1.484.64a24.454 24.454 0 0 1-.917 3.371c-11.587.07-26.85 1.908-29.18 22.922C.441 46.184 15.336 60 32.093 60S62.841 46.975 61.96 31.649M35.635 10.787c.409-.036.833-.073 1.269-.108c-.524.211-1.033.43-1.512.65c-.035-.158-.059-.346-.091-.514zm-5.559.238c-.131.273-.259.535-.382.776a9.36 9.36 0 0 0-.933-.742c.438-.015.876-.025 1.315-.034m22.571 37.301C47.442 53.839 39.95 57 32.093 57c-8.007 0-15.96-3.544-21.276-9.48c-4.307-4.811-6.333-10.584-5.704-16.257c1.181-10.648 5.892-15.734 11.938-18.143c5.858-1.088 11.37.91 11.37.91s-12.529-3.11-17.442 12.988c6.183-9.639 16.823-6.802 19.622-10.355c0 6.869 4.992 3.536 7.515 6.63c3.246 3.978 4.434 11.106 8.168 12.51c-3.678-7.896 2.344-7.588-6.117-18.185c4.457 2.769 6.768-.033 12.854 2.462c-5.207-8.511-13.537-6.05-13.537-6.05s3.39-3.089 6.984-3.003c6.072 1.418 11.657 6.189 12.498 20.795c.342 5.965-1.902 11.826-6.319 16.504" /></svg>
        Pomodoro Timer</h1>
      <div className="timer-display">
        {formatTime(currentTime)}
      </div>
      <div className="controls">
        {isStarted ? (
          <button onClick={handlePause} className="control-button">
            Pause
          </button>
        ) : (
          <button onClick={handleStart} className="control-button">
            Start
          </button>
        )}
        <button onClick={handleReset} className="control-button">
          Reset
        </button>
        <button onClick={handleLongBreak} className="control-button" disabled={!isShortBreak}>
          Long Break
        </button>
      </div>
      <div className="pomodoro-count">
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="1.5em" 
        height="1.5em" 
        viewBox="0 0 64 64">
          <circle cx="31.963" 
          cy="31.963" 
          r="31.963" 
          fill="#ffd257" />
          <path fill="#422700" 
          d="M29.358 25.15c-1.369-3.739-4.476-7.317-8.764-7.233c-4 .076-6.412 4.308-7.716 7.512c-.813 2 2.424 2.861 3.23.89c.837-2.057 2.071-4.33 4.333-5.02c2.591-.794 4.962 2.765 5.686 4.74c.736 2.01 3.975 1.143 3.231-.891m5.812-.028c1.368-3.739 4.474-7.317 8.764-7.235c4 .078 6.41 4.31 7.714 7.512c.815 2-2.424 2.863-3.228.892c-.837-2.059-2.073-4.33-4.334-5.02c-2.593-.792-4.964 2.767-5.686 4.742c-.737 2.01-3.973 1.139-3.23-.891m19.825 9.752c-.619 0-2.642-.133-2.931.21c-.014.016-.023-.001-.037.006c-.062.082-.137.117-.188.221c-8.477 17.07-31.18 17.217-39.656.154c-.231-.465-.796-.591-1.296-.591h-1.86c-1.226 0-1.756 1.092-1.296 2.097c9.707 21.259 38.855 21.345 48.561.082c.459-1.01-.07-2.179-1.297-2.179" /><path fill="#f45d5d" d="M62.24 43.42c-.56-1.843-1.736-3.135-3.172-4.159a2.88 2.88 0 0 0-.48-.507l-2.895-2.251c-1.631-1.271-9.476 9.943-8.652 10.231c3.34 1.159 3.225 4.062 5.976 6.077c2.325 1.697 5.377.731 7.362-.985c2.349-2.03 2.708-5.618 1.861-8.406" /></svg>
          Pomodor yeb bo'ldim
        : {pomodoroCount}
      </div>
    </div>
  );
}

export default App;
