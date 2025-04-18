import React, { useCallback, useRef, useState } from 'react';
import { useUnit } from 'effector-react';
import { $counter, increment} from './store';

function Subscriber({ id, onRender }) {
  const counter = useUnit($counter);
  React.useEffect(() => {
    onRender(id);
  });
  return <div>#{id} — Counter: {counter}</div>;
}

function App() {
  const [count, setCount] = useState(10);
  const renderStart = useRef();
  const memoryStart = useRef(0);
  const [initialRender, setInitialRender] = useState(false);

  const handleRender = useCallback((id) => {
    if (id === count - 1 && renderStart.current) {
      const duration = performance.now() - renderStart.current;
      let memoryMessage = '';

      if (performance.memory) {
        const after = performance.memory.usedJSHeapSize;
        const diffMB = ((after - memoryStart.current) / 1024 / 1024).toFixed(2);
        memoryMessage = `\n📦 Memory usage: ${diffMB} MB`;
      }

      if (initialRender) {
        alert(`⏱ Initial Render of ${count} components: ${duration.toFixed(2)}ms${memoryMessage}`);
        setInitialRender(false);
      } else {
        alert(`✅ Updated ${count} components in ${duration.toFixed(2)}ms${memoryMessage}`);
      }
    }
  }, [count, initialRender]);

  const triggerUpdate = () => {
    if (performance.memory) {
      memoryStart.current = performance.memory.usedJSHeapSize;
    }
    renderStart.current = performance.now();
    increment();
  };

  const triggerInitialRender = () => {
    if (performance.memory) {
      memoryStart.current = performance.memory.usedJSHeapSize;
    }
    renderStart.current = performance.now();
    setInitialRender(true);
    setCount((prev) => prev); // Триггер перерендера
  };


  return (
      <div style={{ padding: 20 }}>
        <h1>Effector Benchmark</h1>

        <label>
          Components to render:
          <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={100}>100</option>
            <option value={1000}>1000</option>
          </select>
        </label>

        <button onClick={triggerUpdate}>▶ Test Render Performance</button>
        <button onClick={triggerInitialRender}>🛠 Test Initial Render</button>

        <div style={{ marginTop: 20 }}>
          {Array.from({ length: count }, (_, i) => (
              <Subscriber key={i} id={i} onRender={handleRender} />
          ))}
        </div>
      </div>
  );
}

export default App;
