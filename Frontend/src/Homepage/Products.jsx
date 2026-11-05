import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ---------- edit these to match your actual product ---------- */
const SIZES = [
  {
    label: "500 ml",
    note: "Single-serve size, suited to retail shelves and hospitality.",
    scale: [0.8, 0.78],
  },
  {
    label: "1 L",
    note: "Everyday size for shops, offices and households.",
    scale: [0.95, 1],
  },
  {
    label: "5 L",
    note: "Bulk size for homes and workplaces.",
    scale: [1.12, 1],
  },
];

const PARTS = [
  {
    id: "cap",
    title: "Cap",
    text: "Tamper-evident screw cap, so the bottle stays sealed from our packing line to your warehouse.",
  },
  {
    id: "label",
    title: "Label",
    text: "Clear label with brand, size and batch details. Private-label and custom branding are available on request.",
  },
  {
    id: "bottle",
    title: "Bottle",
    text: "Clear, food-safe bottle in 500 ml, 1 L and 5 L sizes.",
  },
  {
    id: "pack",
    title: "Packing for export",
    text: "Packed in cartons and palletised for sea freight, with export documents handled by us.",
  },
];

const ORDER_INFO = [
  ["Minimum order", "One full container load"],
  ["Shipping from", "Mumbai, India"],
  ["Destination", "Ports worldwide"],
  ["Export documents", "Handled by us"],
];

/* ---------- bottle drawing ---------- */
const Bottle = ({ size, active }) => {
  const on = (id) => (active === id ? " is-on" : "");
  const [sx, sy] = SIZES[size].scale;

  return (
    <svg
      viewBox="0 0 220 420"
      className="pd-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${SIZES[size].label} mineral water bottle`}
    >
      <defs>
        <linearGradient id="pd-water" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#38bdd0" stopOpacity=".28" />
          <stop offset=".5" stopColor="#7fd6e4" stopOpacity=".5" />
          <stop offset="1" stopColor="#38bdd0" stopOpacity=".26" />
        </linearGradient>
        <linearGradient id="pd-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f6f86" />
          <stop offset=".5" stopColor="#38bdd0" />
          <stop offset="1" stopColor="#1f6f86" />
        </linearGradient>
        <clipPath id="pd-body-clip">
          <path d="M92 51 H128 V76 C128 96 168 104 168 140 V372 C168 388 156 398 140 398 H80 C64 398 52 388 52 372 V140 C52 104 92 96 92 76 Z" />
        </clipPath>
      </defs>

      <g
        className="pd-bottle"
        style={{ transform: `scale(${sx}, ${sy})` }}
      >
        {/* body */}
        <path
          className={`pd-part pd-body${on("bottle")}`}
          d="M92 51 H128 V76 C128 96 168 104 168 140 V372 C168 388 156 398 140 398 H80 C64 398 52 388 52 372 V140 C52 104 92 96 92 76 Z"
          fill="url(#pd-water)"
        />

        <g clipPath="url(#pd-body-clip)">
          {/* water line + gloss */}
          <rect x="52" y="120" width="116" height="280" fill="#38bdd0" opacity=".14" />
          <rect x="64" y="110" width="9" height="270" rx="4" fill="#fff" opacity=".22" />

          {/* base ridges */}
          <path
            d="M52 372 H168 M52 382 H168"
            stroke="#fff"
            strokeOpacity=".25"
            strokeWidth="1.5"
          />

          {/* label */}
          <rect
            className={`pd-part pd-label${on("label")}`}
            x="52"
            y="176"
            width="116"
            height="112"
            fill="#f4f7f9"
          />
          <rect x="52" y="176" width="116" height="12" fill="#38bdd0" />
          <rect x="52" y="276" width="116" height="12" fill="#ffc58f" />
          <text
            x="110"
            y="222"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            letterSpacing="1.5"
            fill="#0a1628"
          >
            EXPORTYARD
          </text>
          <text
            x="110"
            y="240"
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            letterSpacing="1.4"
            fill="#2a5d78"
          >
            MINERAL WATER
          </text>
          <text
            x="110"
            y="265"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#0a1628"
          >
            {SIZES[size].label}
          </text>
        </g>

        {/* cap + tamper ring */}
        <g className={`pd-part pd-cap${on("cap")}`}>
          <rect x="86" y="14" width="48" height="30" rx="6" fill="url(#pd-cap)" />
          <path
            d="M94 18 V40 M101 18 V40 M108 18 V40 M115 18 V40 M122 18 V40 M129 18 V40"
            stroke="#0a1628"
            strokeOpacity=".25"
            strokeWidth="1.5"
          />
          <rect x="85" y="44" width="50" height="7" rx="2" fill="#1f6f86" />
        </g>
      </g>
    </svg>
  );
};

/* ---------- section ---------- */
const Products = () => {
  const [size, setSize] = useState(1);
  const [active, setActive] = useState(null);

  return (
    <section id="products" className="pd-sec">
      <style>{css}</style>

      <div className="pd-wrap">
        <h2 className="pd-h">Our product</h2>
        <p className="pd-lead">
          Right now we export one product: packaged mineral water. Looking for
          something else? Tell us in your enquiry and we will check what we can
          source for you.
        </p>

        <div className="pd-grid">
          {/* Bottle stage */}
          <div className="pd-stage">
            <div className="pd-bottle-box">
              <Bottle size={size} active={active} />
            </div>

            <div className="pd-sizes" role="group" aria-label="Bottle size">
              {SIZES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={size === i}
                  onClick={() => setSize(i)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="pd-size-note">{SIZES[size].note}</p>
          </div>

          {/* Details */}
          <div className="pd-details">
            <h3 className="pd-name">Packaged mineral water</h3>
            <p className="pd-desc">
              Clean, sealed bottles packed for the journey. Hover over a part
              below to see it on the bottle.
            </p>

            <div className="pd-parts">
              {PARTS.map((p) => (
                <div
                  key={p.id}
                  className="pd-part-card"
                  tabIndex={0}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.id)}
                  onBlur={() => setActive(null)}
                >
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>

            <dl className="pd-info">
              {ORDER_INFO.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <Link to="/enquiry" className="pd-btn">
              Enquire about this product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const css = `
.pd-sec {
  padding: 5rem 0;
  background: linear-gradient(#0a1628, #08111d);
  border-top: 1px solid rgba(56,189,208,.15);
  color: #fff;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  scroll-margin-top: 4rem;
}

/* full-width container with fluid side padding */
.pd-wrap {
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
  box-sizing: border-box;
}

.pd-h {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -.03em;
}

.pd-lead {
  max-width: 44rem;
  margin: 1rem 0 0;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.65;
  color: rgba(255,255,255,.76);
}

.pd-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
  margin-top: 2.75rem;
}

/* ---------- bottle stage ---------- */
.pd-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.25rem 1.75rem;
  border: 1px solid rgba(56,189,208,.22);
  border-radius: 18px;
  background:
    radial-gradient(22rem 18rem at 50% 38%, rgba(56,189,208,.16), transparent 70%),
    rgba(255,255,255,.03);
}

.pd-bottle-box {
  width: min(100%, 15rem);
}

.pd-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.pd-bottle {
  transform-box: view-box;
  transform-origin: 110px 398px;
  transition: transform .5s cubic-bezier(.65, 0, .2, 1);
}

.pd-part {
  transition: stroke .2s, stroke-width .2s;
}

.pd-body {
  stroke: rgba(255,255,255,.55);
  stroke-width: 2;
}

.pd-label {
  stroke: transparent;
  stroke-width: 0;
}

.pd-part.is-on {
  stroke: #ffc58f;
  stroke-width: 3.5;
}

.pd-cap.is-on rect {
  stroke: #ffc58f;
  stroke-width: 3;
}

.pd-sizes {
  display: inline-flex;
  gap: 2px;
  margin-top: 1.5rem;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.14);
}

.pd-sizes button {
  padding: .5rem 1.2rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255,255,255,.8);
  font: inherit;
  font-size: .85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s, color .2s;
}

.pd-sizes button:hover {
  background: rgba(255,255,255,.1);
}

.pd-sizes button[aria-pressed="true"] {
  background: #ffc58f;
  color: #10222e;
}

.pd-size-note {
  min-height: 2.8em;
  max-width: 22rem;
  margin: 1rem 0 0;
  text-align: center;
  font-size: .9rem;
  line-height: 1.55;
  color: rgba(255,255,255,.7);
}

/* ---------- details ---------- */
.pd-name {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -.02em;
}

.pd-desc {
  max-width: 40rem;
  margin: .7rem 0 0;
  line-height: 1.65;
  color: rgba(255,255,255,.74);
}

.pd-parts {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  margin-top: 1.75rem;
}

.pd-part-card {
  padding: 1.15rem 1.25rem;
  border: 1px solid rgba(56,189,208,.2);
  border-left: 3px solid #38bdd0;
  border-radius: 0 12px 12px 0;
  background: rgba(255,255,255,.03);
  transition: background .2s, border-color .2s;
}

.pd-part-card:hover,
.pd-part-card:focus-visible {
  background: rgba(255,197,143,.07);
  border-color: rgba(255,197,143,.45);
  border-left-color: #ffc58f;
  outline: none;
}

.pd-part-card h4 {
  margin: 0 0 .35rem;
  font-size: 1rem;
  font-weight: 600;
}

.pd-part-card p {
  margin: 0;
  font-size: .92rem;
  line-height: 1.6;
  color: rgba(255,255,255,.72);
}

.pd-info {
  margin: 2rem 0 0;
  border-top: 1px solid rgba(255,255,255,.12);
}

.pd-info div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: .8rem 0;
  border-bottom: 1px solid rgba(255,255,255,.1);
  font-size: .95rem;
}

.pd-info dt {
  color: rgba(255,255,255,.62);
}

.pd-info dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}

.pd-btn {
  display: inline-block;
  margin-top: 1.75rem;
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

.pd-btn:hover {
  background: #ffd7b0;
  transform: translateY(-1px);
}

.pd-btn:focus-visible,
.pd-sizes button:focus-visible {
  outline: 2px solid #ffd9a0;
  outline-offset: 3px;
}

/* ---------- responsive ---------- */
@media (min-width: 640px) {
  .pd-parts {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 960px) {
  .pd-sec {
    padding: 6.5rem 0;
  }

  .pd-grid {
    grid-template-columns: minmax(0, .9fr) minmax(0, 1.5fr);
    gap: 3rem;
    align-items: start;
  }

  .pd-stage {
    position: sticky;
    top: 6rem;
    padding: 2.5rem 1.5rem 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pd-bottle,
  .pd-part,
  .pd-part-card,
  .pd-sizes button,
  .pd-btn {
    transition: none;
  }
}
`;

export default Products;