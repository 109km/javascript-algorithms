import { useState, useEffect, useMemo, useCallback } from 'react';
import './index.less';

function App() {
  const [num, setNum] = useState(0);
  const onClick = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setNum(num + 1);
        console.log(num);
      }, 1000);
    }
  };

  const calculateSum = useMemo(() => {
    return num + 100;
  }, [num]);

  useEffect(() => {
    console.log('useEffect', num);
  });
  return (
    <div className="app">
      <p>{num}</p>
      <p>sum = {calculateSum}</p>
      <p>
        <a onClick={onClick}>Click</a>
      </p>
    </div>
  );
}

export default App;
