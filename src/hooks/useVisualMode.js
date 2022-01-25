import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

    function transition(mode, replace = false) {
      if (replace) {
        setMode(mode);
        history[history.length - 1] = mode;
      } else {
        setMode(mode);
        setHistory(prev => ([...prev, mode])); 
        // history.push(mode); //alternative way to push new mode to history
      }
    }

    function back() {
      //should not return to previous mode if already at initial
      if (history.length <= 1) {
        return;
      }

      history.pop();
      setMode(history[history.length - 1]);
    }

  return { mode, transition, back};
}
