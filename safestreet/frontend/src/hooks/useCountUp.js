import { useState, useEffect, useRef } from "react";

export default function useCountUp(end, duration = 1000) {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef(null);

  useEffect(() => {
    startTimestamp.current = null;

    const step = (timestamp) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = Math.min((timestamp - startTimestamp.current) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const handle = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(handle);
  }, [end, duration]);

  return count;
}
