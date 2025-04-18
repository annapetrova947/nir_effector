
import React, { useCallback, useRef, useState } from 'react';
import { useUnit } from 'effector-react';
import { $counter, increment } from './store';

function Subscriber({ id, onRender }) {
  const counter = useUnit($counter);

  React.useEffect(() => {
    onRender(id);
  }, [id, onRender]);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 text-center">
      <div className="text-sm text-gray-500">Подписчик #{id + 1}</div>
      <div className="text-xl font-bold text-blue-600">{counter}</div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(10);
  const renderStart = useRef();
  const memoryStart = useRef(0);
  const [initialRender, setInitialRender] = useState(false);
  const [performanceMsg, setPerformanceMsg] = useState('');

  const handleRender = useCallback((id) => {
    if (id === count - 1 && renderStart.current) {
      const duration = performance.now() - renderStart.current;
      let memoryMessage = '';

      if (performance.memory) {
        const after = performance.memory.usedJSHeapSize;
        const diffMB = ((after - memoryStart.current) / 1024 / 1024).toFixed(2);
        memoryMessage = ` | 📦 Память: ${diffMB} MB`;
      }

      if (initialRender) {
        setPerformanceMsg(`⏱ Время рендера: ${duration.toFixed(2)} ms${memoryMessage}`);
      } else {
        setInitialRender(true);
      }
    }
  }, [count, initialRender]);

  const rerender = () => {
    setPerformanceMsg('');
    renderStart.current = performance.now();
    memoryStart.current = performance.memory?.usedJSHeapSize || 0;
    setInitialRender(false);
    setCount((prev) => prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="flex gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={() => increment()}
        >
          Увеличить счётчик
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={() => setCount(count + 10)}
        >
          Добавить 10 подписчиков
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl"
          onClick={rerender}
        >
          Перерендер
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <Subscriber key={i} id={i} onRender={handleRender} />
        ))}
      </div>

      {performanceMsg && (
        <div className="text-sm text-gray-600 mt-4">
          {performanceMsg}
        </div>
      )}
    </div>
  );
}

export default App;
