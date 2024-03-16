import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [processing, setProcessing] = useState(false)

  const recursiveFibonacci = () => {
    setProcessing(true);
    setTimeout(() => {
      const fib = (n: number): number => {
        if (n <= 1) {
          return n;
        }
        return fib(n - 1) + fib(n - 2);
      };
      const result = fib(count);
      console.log(result);
      setProcessing(false);
    }, 0);
  };

  const workerFibonacci = () => {
    setProcessing(true)
    const worker = new Worker(new URL('./workers/fibonacciWorker.ts', import.meta.url))
    worker.postMessage(count)
    worker.onmessage = (e) => {
      console.log(e.data)
      setProcessing(false)
    }
  }

  return (
    <div className="content">
      <button className="countButton" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <div className="workerButtonContainer">
        <button onClick={recursiveFibonacci}>Fibonacci (Frontend)</button>
        <button onClick={workerFibonacci}>Fibonacci (Worker)</button>
      </div>
      <div className="notification">{processing ? 'Processing' : ''}</div>
    </div>
  )
}

export default App
