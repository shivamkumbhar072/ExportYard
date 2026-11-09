import { useEffect, useRef, useState } from "react";

export default function useFitWidth(max = 340) {
  const ref = useRef(null);
  const [width, setWidth] = useState(280);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const measure = () =>
      setWidth(Math.max(200, Math.min(max, Math.floor(element.clientWidth))));
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [max]);

  return [ref, String(width)];
}
