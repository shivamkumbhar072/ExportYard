import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MAP,
  MUMBAI,
  DESTINATIONS,
  INDIA_DOTS,
  WORLD_DOTS,
} from "./Worldmapdata.jsx"

const CYCLE = 12; // seconds for one full route animation
const STAGGER = 1.3; // seconds between routes starting

// Curved route from Mumbai to a destination (quadratic curve bowing upward)
function routePath(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  
  const dist = Math.hypot(dx, dy) || 1;
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const cx = mx + nx * dist * 0.25;
  const cy = my + ny * dist * 0.25;
  return `M${a.x} ${a.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}

const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

const Hero = () => {
  const routes = useMemo(
    () =>
      DESTINATIONS.map((d, i) => ({
        ...d,
        path: routePath(MUMBAI, d),
        delay: `${(i * STAGGER).toFixed(2)}s`,
      })),
    []
  );

  return (
    <section className="ey-hero" aria-label="ExportYard">
      <style>{css}</style>

      <div className="ey-inner">
        {/* Copy */}
        <div className="ey-copy">
          <h1>From Mumbai to ports around the world.</h1>
          <p>
            ExportYard ships bottled mineral water from Mumbai in full-container
            loads, with the export documents handled for you.
          </p>

          <div className="ey-actions">
            <Link to="/enquiry" className="ey-btn">
              Request an enquiry
            </Link>
            <a href="#products" className="ey-more">
              See our product
            </a>
          </div>
        </div>

        {/* Animated map */}
        <div
          className="ey-map"
          style={{ aspectRatio: `${MAP.w} / ${MAP.h}` }}
          role="img"
          aria-label="Map showing shipping routes from Mumbai port to destinations around the world"
        >
          <svg
            viewBox={`0 0 ${MAP.w} ${MAP.h}`}
            className="ey-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* land dots */}
            <path d={WORLD_DOTS} className="ey-land" />
            <path d={INDIA_DOTS} className="ey-india" />

            {/* routes */}
            {routes.map((r) => (
              <g key={r.name} style={{ "--d": r.delay }}>
                <path d={r.path} pathLength="1" className="ey-arc" />
                <path d={r.path} pathLength="1" className="ey-travel" />
                <circle cx={r.x} cy={r.y} r="6" className="ey-ring" />
                <circle cx={r.x} cy={r.y} r="3.6" className="ey-dest" />
              </g>
            ))}

            {/* Mumbai port */}
            <circle cx={MUMBAI.x} cy={MUMBAI.y} r="5" className="ey-hub-ring" />
            <circle
              cx={MUMBAI.x}
              cy={MUMBAI.y}
              r="5"
              className="ey-hub-ring ey-hub-ring-2"
            />
            <circle cx={MUMBAI.x} cy={MUMBAI.y} r="5" className="ey-hub" />
          </svg>

          {/* labels (HTML so the text stays readable at any size) */}
          {routes.map((r) => (
            <span
              key={r.name}
              className="ey-pin"
              data-pos={r.pos || "top"}
              style={{
                left: pct(r.x, MAP.w),
                top: pct(r.y, MAP.h),
                "--d": r.delay,
              }}
            >
              <span className="ey-tag">{r.name}</span>
            </span>
          ))}

          <span
            className="ey-pin ey-pin-hub"
            data-pos="bottom"
            style={{ left: pct(MUMBAI.x, MAP.w), top: pct(MUMBAI.y, MAP.h) }}
          >
            <span className="ey-tag">Mumbai port</span>
          </span>
        </div>
      </div>
    </section>
  );
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap');

.ey-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  /* extra top space clears the fixed navbar */
  padding: 7.5rem clamp(1.25rem, 5vw, 5rem) 3rem;
  box-sizing: border-box;
  color: #fff;
  background:
    radial-gradient(60rem 34rem at 78% 55%, rgba(56,189,208,.16), transparent 65%),
    radial-gradient(40rem 24rem at 10% 0%, rgba(255,197,143,.07), transparent 60%),
    #0a1628;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
}

.ey-inner {
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
  align-items: center;
}

/* ---------- copy ---------- */
.ey-copy h1 {
  margin: 0;
  max-width: 14ch;
  font-size: clamp(2.3rem, 6vw, 4.4rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -.03em;
  text-wrap: balance;
  animation: ey-rise .7s ease both;
}

.ey-copy p {
  margin: 1.25rem 0 0;
  max-width: 34rem;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.65;
  color: rgba(255,255,255,.8);
  animation: ey-rise .7s .1s ease both;
}

.ey-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1.9rem;
  animation: ey-rise .7s .2s ease both;
}

.ey-btn {
  display: inline-block;
  padding: .85rem 1.6rem;
  border-radius: 999px;
  background: #ffc58f;
  color: #10222e;
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: .02em;
  text-decoration: none;
  transition: background .2s, transform .2s;
}

.ey-btn:hover {
  background: #ffd7b0;
  transform: translateY(-1px);
}

.ey-more {
  color: #fff;
  font-size: .95rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #38bdd0;
  text-underline-offset: 5px;
}

.ey-more:hover {
  color: #38bdd0;
}

.ey-btn:focus-visible,
.ey-more:focus-visible {
  outline: 2px solid #ffd9a0;
  outline-offset: 3px;
  border-radius: 4px;
}

/* ---------- map ---------- */
.ey-map {
  position: relative;
  width: 100%;
  animation: ey-fade 1.2s .2s ease both;
}

.ey-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.ey-land {
  fill: none;
  stroke: #7fb4c8;
  stroke-opacity: .38;
  stroke-width: 4.2;
  stroke-linecap: round;
}

.ey-india {
  fill: none;
  stroke: #ffc58f;
  stroke-opacity: .95;
  stroke-width: 4.8;
  stroke-linecap: round;
}

/* route line draws from Mumbai, holds, then fades */
.ey-arc {
  fill: none;
  stroke: #38bdd0;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
  animation: ey-draw ${CYCLE}s ease-in-out infinite;
  animation-delay: var(--d);
}

/* bright dot that travels along the route */
.ey-travel {
  fill: none;
  stroke: #fff;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: .001 3;
  stroke-dashoffset: 0;
  opacity: 0;
  animation: ey-travel ${CYCLE}s ease-in-out infinite;
  animation-delay: var(--d);
}

.ey-dest {
  fill: #fff;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: ey-dest ${CYCLE}s ease-out infinite;
  animation-delay: var(--d);
}

.ey-ring {
  fill: none;
  stroke: #38bdd0;
  stroke-width: 1.6;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: ey-ring ${CYCLE}s ease-out infinite;
  animation-delay: var(--d);
}

/* Mumbai port marker */
.ey-hub {
  fill: #ffc58f;
}

.ey-hub-ring {
  fill: none;
  stroke: #ffc58f;
  stroke-width: 1.8;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: ey-hub 3s ease-out infinite;
}

.ey-hub-ring-2 {
  animation-delay: 1.5s;
}

/* labels */
.ey-pin {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

.ey-tag {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .02em;
  color: rgba(255,255,255,.88);
  text-shadow: 0 1px 8px rgba(10,22,40,.9);
  opacity: 0;
  animation: ey-label ${CYCLE}s ease-out infinite;
  animation-delay: var(--d);
}

.ey-pin[data-pos="top"] .ey-tag {
  bottom: 9px;
}

.ey-pin[data-pos="bottom"] .ey-tag {
  top: 9px;
}

.ey-pin-hub .ey-tag {
  opacity: 1;
  animation: none;
  top: 11px;
  font-size: .8rem;
  font-weight: 700;
  color: #ffc58f;
}

/* ---------- keyframes ---------- */
@keyframes ey-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}

@keyframes ey-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ey-draw {
  0%   { stroke-dashoffset: 1; opacity: 1; }
  32%  { stroke-dashoffset: 0; opacity: 1; }
  78%  { stroke-dashoffset: 0; opacity: .85; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@keyframes ey-travel {
  0%   { stroke-dashoffset: 0; opacity: 1; }
  32%  { stroke-dashoffset: -1; opacity: 1; }
  33%  { stroke-dashoffset: -1; opacity: 0; }
  100% { stroke-dashoffset: -1; opacity: 0; }
}

@keyframes ey-dest {
  0%, 30% { opacity: 0; transform: scale(0); }
  36%     { opacity: 1; transform: scale(1.5); }
  44%     { opacity: 1; transform: scale(1); }
  78%     { opacity: 1; transform: scale(1); }
  100%    { opacity: 0; transform: scale(1); }
}

@keyframes ey-ring {
  0%, 31% { opacity: 0; transform: scale(.3); }
  33%     { opacity: .9; transform: scale(.3); }
  55%     { opacity: 0; transform: scale(2.8); }
  100%    { opacity: 0; transform: scale(2.8); }
}

@keyframes ey-label {
  0%, 30% { opacity: 0; }
  40%     { opacity: 1; }
  78%     { opacity: 1; }
  100%    { opacity: 0; }
}

@keyframes ey-hub {
  0%   { opacity: .9; transform: scale(.6); }
  100% { opacity: 0; transform: scale(3.6); }
}

/* ---------- responsive ---------- */
@media (min-width: 1000px) {
  .ey-inner {
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.5fr);
    gap: 3rem;
  }
}

/* phones: thicker lines so they stay visible, only the Mumbai label */
@media (max-width: 699px) {
  .ey-hero {
    padding-top: 6.5rem;
    align-items: flex-start;
  }

  .ey-arc {
    stroke-width: 2.8;
  }

  .ey-travel {
    stroke-width: 7;
  }

  .ey-tag {
    display: none;
  }

  .ey-pin-hub .ey-tag {
    display: block;
    font-size: .7rem;
  }
}

/* ---------- reduced motion: show the finished map, no movement ---------- */
@media (prefers-reduced-motion: reduce) {
  .ey-copy h1,
  .ey-copy p,
  .ey-actions,
  .ey-map {
    animation: none;
  }

  .ey-arc {
    animation: none;
    stroke-dashoffset: 0;
    opacity: .7;
  }

  .ey-travel,
  .ey-ring,
  .ey-hub-ring {
    animation: none;
    opacity: 0;
  }

  .ey-dest {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .ey-tag {
    animation: none;
    opacity: 1;
  }

  .ey-btn {
    transition: none;
  }
}
`;

export default Hero;