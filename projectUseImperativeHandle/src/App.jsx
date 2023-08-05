import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);

  const divRef = useRef();

  useLayoutEffect(() => {
    const now = Date.now();
    while (Date.now() < now + 200);
    divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight;
  });

  const handleClick = () => {
    setCounted((c) => [...c, +c.slice(-1) + 1]);
    divRef.current.handleClick();
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React - useLayoutEffect</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h2>Olá</h2>
      </div>
      <div>
        <button onClick={handleClick}>Contador {counted.slice(-1)} </button>
      </div>
      <div>
        <DisplayCounted counted={counted} ref={divRef} />
      </div>
    </>
  );
}

export default App;

export const DisplayCounted = forwardRef(function DisplayCounted(
  { counted },
  ref
) {
  const [rand, setRand] = useState('0.248');
  const divRef = useRef();

  const handleClick = () => {
    setRand(Math.random().toFixed(2));
  };

  useImperativeHandle(ref, () => ({ handleClick, divRef: divRef.current }));

  return (
    <div
      ref={divRef}
      style={{ height: '200px', width: '150px', overflow: 'scroll' }}
    >
      {counted.map((c) => {
        return (
          <p onClick={handleClick} key={`c-${c}`}>
            {' '}
            {c} +++ {rand}
          </p>
        );
      })}
    </div>
  );
});
