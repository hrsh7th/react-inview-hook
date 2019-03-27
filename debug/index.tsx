import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useInView, _debug } from "../src";

const App = () => {
  const [inViewState, setInViewState] = useState({
    isEnter: false,
    onEnterCount: 0,
    onLeaveCount: 0
  });
  const [mount, setMount] = useState(false);
  const [, setRevision] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRevision(rev => rev + 1), 100);
    return () => clearInterval(id);
  });

  return (
    <div className="App">
      <div className="App-indicator">
        <div>
          {(_debug as any).groups.map((group: any, i: number) => (
            <div>
              group{i + 1}: {group.map.size}
            </div>
          ))}
        </div>
        <div>
          <div>isEnter: {inViewState.isEnter ? "true" : "false"}</div>
          <div>onEnterCount: {inViewState.onEnterCount}</div>
          <div>onLeaveCount: {inViewState.onLeaveCount}</div>
        </div>
      </div>
      <div>
        <button onClick={() => setMount(!mount)}>mount</button>
      </div>
      <div className="App-sandbox">
        {mount ? <InView onChange={state => setInViewState(state)} /> : null}
      </div>
    </div>
  );
};

type InViewState = {
  isEnter: boolean;
  onEnterCount: number;
  onLeaveCount: number;
};

const InView = ({ onChange }: { onChange: (s: InViewState) => void }) => {
  const [state, setState] = useState<InViewState>({
    isEnter: false,
    onEnterCount: 0,
    onLeaveCount: 0
  });

  useEffect(() => {
    onChange(state);
  }, [state]);

  const ref = useRef(null);
  useInView({
    ref,
    onEnter: () =>
      setState(state => ({
        ...state,
        onEnterCount: state.onEnterCount + 1,
        isEnter: true
      })),
    onLeave: () =>
      setState(state => ({
        ...state,
        onLeaveCount: state.onLeaveCount + 1,
        isEnter: false
      }))
  });
  return (
    <div className="InView" ref={ref}>
      InView
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app")!);
