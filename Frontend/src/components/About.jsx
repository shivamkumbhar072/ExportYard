import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Sourcing",
    text: "We find the product you need from reliable suppliers in India and check it before it ships.",
  },
  {
    title: "Export paperwork",
    text: "Invoices, packing lists and shipping documents are prepared for you, so nothing holds up your cargo.",
  },
  {
    title: "Shipping",
    text: "We book the container, track it to the destination port and keep you updated along the way.",
  },
];

const steps = [
  {
    title: "Send an enquiry",
    text: "Tell us the product, quantity and destination port.",
  },
  {
    title: "Get a quote",
    text: "We reply with pricing and an estimated timeline.",
  },
  {
    title: "We source and prepare",
    text: "Your order is sourced, packed and documented for export.",
  },
  {
    title: "We ship",
    text: "Your cargo is loaded and tracked until it reaches port.",
  },
];

const About = () => {
  // SEO: set page title and meta description on mount
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "About ExportYard | Export from India, Handled End to End";

    let meta = document.querySelector('meta[name="description"]');
    let created = false;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
      created = true;
    }
    const previousDescription = meta.getAttribute("content");
    meta.setAttribute(
      "content",
      "ExportYard connects overseas buyers with products made in India. We source, document and ship — one team from enquiry to delivery."
    );

    return () => {
      document.title = previousTitle;
      if (created) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <main className="ab-page">
      <style>{css}</style>

      {/* Intro */}
      <section className="ab-hero" aria-labelledby="ab-hero-title">
        <div className="ab-wrap">
          <h1 id="ab-hero-title" className="ab-title">
            Export from India, handled end to end.
          </h1>
          <p className="ab-lead">
            ExportYard connects overseas buyers with products made in India. We
            source, document and ship, so you can deal with one team from
            enquiry to delivery.
          </p>
          <div className="ab-actions">
            <Link
              to="/enquiry"
              className="ab-btn ab-btn-solid"
              aria-label="Request an export enquiry"
            >
              Request an enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="ab-section" aria-labelledby="ab-services-title">
        <div className="ab-wrap">
          <h2 id="ab-services-title" className="ab-h2">
            What we do
          </h2>
          <div className="ab-grid">
            {services.map((s) => (
              <div className="ab-card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="ab-section" aria-labelledby="ab-products-title">
        <div className="ab-wrap">
          <h2 id="ab-products-title" className="ab-h2">
            What we export
          </h2>
          <div className="ab-products">
            <div className="ab-product">
              <h3>Available now</h3>
              <p>
                Packaged mineral water bottles, shipped in container loads.
              </p>
            </div>

            <div className="ab-product ab-product-accent">
              <h3>Anything else, on request</h3>
              <p>
                Looking for a different product? Send us an enquiry with what
                you need and we will check what we can source for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process: a real sequence, so numbering is meaningful */}
      <section className="ab-section" aria-labelledby="ab-process-title">
        <div className="ab-wrap">
          <h2 id="ab-process-title" className="ab-h2">
            How it works
          </h2>
          <ol className="ab-steps">
            {steps.map((s, i) => (
              <li className="ab-step" key={s.title}>
                <span className="ab-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing call to action */}
      <section
        className="ab-section ab-last"
        aria-labelledby="ab-cta-title"
      >
        <div className="ab-wrap">
          <div className="ab-cta">
            <h2 id="ab-cta-title">Have a product in mind?</h2>
            <p>
              Tell us what you want to import and where it needs to go. We will
              get back to you with a quote.
            </p>
            <Link
              to="/enquiry"
              className="ab-btn ab-btn-solid"
              aria-label="Request an export enquiry"
            >
              Request an enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const css = `
.ab-page {
  min-height: 100vh;
  background: #0a1628;
  color: #fff;
}

.ab-wrap {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ---------- intro ---------- */
.ab-hero {
  /* extra top space clears the fixed navbar */
  padding: 8.5rem 0 4.5rem;
  background:
    radial-gradient(60rem 28rem at 85% -10%, rgba(56,189,208,.16), transparent 60%),
    #0a1628;
  border-bottom: 1px solid rgba(56,189,208,.15);
}

.ab-title {
  max-width: 18ch;
  margin: 0 0 1.25rem;
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -.02em;
  animation: ab-rise .6s ease both;
}

.ab-lead {
  max-width: 38rem;
  margin: 0 0 2rem;
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.65;
  color: rgba(255,255,255,.75);
  animation: ab-rise .6s .1s ease both;
}

.ab-actions {
  animation: ab-rise .6s .2s ease both;
}

/* ---------- buttons ---------- */
.ab-btn {
  display: inline-block;
  padding: .85rem 1.6rem;
  border-radius: 999px;
  font-size: .85rem;
  font-weight: 600;
  letter-spacing: .02em;
  text-decoration: none;
  transition: background .2s, transform .2s;
}

.ab-btn-solid {
  background: #ffc58f;
  color: #10222e;
}

.ab-btn-solid:hover {
  background: #ffd7b0;
  transform: translateY(-1px);
}

.ab-btn:focus-visible {
  outline: 2px solid #ffd9a0;
  outline-offset: 3px;
}

/* ---------- sections ---------- */
.ab-section {
  padding: 4rem 0 0;
}

.ab-last {
  padding-bottom: 5rem;
}

.ab-h2 {
  margin: 0 0 1.75rem;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -.01em;
}

.ab-card h3,
.ab-product h3,
.ab-step h3 {
  margin: 0 0 .4rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.ab-card p,
.ab-product p,
.ab-step p {
  margin: 0;
  font-size: .95rem;
  line-height: 1.6;
  color: rgba(255,255,255,.7);
}

/* what we do */
.ab-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.ab-card {
  padding: 1.5rem;
  border: 1px solid rgba(56,189,208,.2);
  border-radius: 14px;
  background: rgba(255,255,255,.03);
}

/* products */
.ab-products {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.ab-product {
  padding: 1.75rem;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 14px;
}

.ab-product-accent {
  border-color: rgba(255,197,143,.45);
  background: rgba(255,197,143,.07);
}

.ab-product-accent h3 {
  color: #ffc58f;
}

/* steps */
.ab-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

.ab-step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.ab-step-num {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  font-size: .9rem;
  font-weight: 700;
  color: #10222e;
  background: #38bdd0;
}

/* closing call to action */
.ab-cta {
  padding: 2.5rem 1.5rem;
  text-align: center;
  border: 1px solid rgba(56,189,208,.25);
  border-radius: 18px;
  background: linear-gradient(160deg, rgba(56,189,208,.12), rgba(56,189,208,.02));
}

.ab-cta h2 {
  margin: 0 0 .6rem;
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  font-weight: 700;
}

.ab-cta p {
  max-width: 32rem;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
  color: rgba(255,255,255,.72);
}

@keyframes ab-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (min-width: 640px) {
  .ab-products {
    grid-template-columns: 1fr 1fr;
  }

  .ab-steps {
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem 2rem;
  }
}

@media (min-width: 900px) {
  .ab-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .ab-hero {
    padding: 10rem 0 5.5rem;
  }

  .ab-cta {
    padding: 3.5rem 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ab-title,
  .ab-lead,
  .ab-actions {
    animation: none;
  }

  .ab-btn {
    transition: none;
  }
}
`;

export default About;