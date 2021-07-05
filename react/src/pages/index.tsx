import { useState, useEffect, useMemo, useCallback } from 'react';
import './index.less';

function App() {
  const [num, setNum] = useState(0);
  const [numB, setNumB] = useState(0);
  const onClick = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setNum(num + 1);
        console.log(num);
      }, 1000);
    }
  };

  const onClickB = () => {
    setNumB(numB + 1);
  };

  const calculateSum = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < num; i++) {
      sum += i;
    }
    return sum;
  }, [num]);

  useEffect(() => {
    console.log('useEffect', num, numB);
  });
  return (
    <div className="app">
      <p>
        num A = {num} | num B = {numB}
      </p>
      <p>sum = {calculateSum}</p>
      <p>
        <a onClick={onClick}>Add Num A</a>
        <br />
        <a onClick={onClickB}>Add Num B</a>
      </p>
    </div>
  );
}

export default App;
