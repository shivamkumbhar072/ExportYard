import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousKey = useRef(null);
  const positions = useRef(new Map());

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (previousKey.current) {
      positions.current.set(previousKey.current, window.scrollY);
    }

    if (navigationType === "POP") {
      window.scrollTo({
        left: 0,
        top: positions.current.get(location.key) ?? 0,
        behavior: "instant",
      });
    } else if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      document.getElementById(targetId)?.scrollIntoView();
    } else {
      window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    }

    previousKey.current = location.key;
  }, [location.hash, location.key, navigationType]);

  return null;
}
