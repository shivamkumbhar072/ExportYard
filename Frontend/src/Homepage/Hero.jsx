import { Link } from "react-router-dom";

const Hero = () => (
  <section className="ey-hero" aria-label="ExportYard">
    <style>{css}</style>
    <div className="ey-inner">
      <div className="ey-copy">
        <h1>Trade connections from India to the world.</h1>
        <p>
          ExportYard helps international buyers source products from India and
          connects Indian suppliers with global trade opportunities.
        </p>
        <div className="ey-actions">
          <Link to="/enquiry" className="ey-btn">
            Request an enquiry
          </Link>
          <a href="#trade-services" className="ey-more">
            Explore how it works
          </a>
        </div>
      </div>
    </div>
  </section>
);

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
  padding: 7.5rem clamp(1.25rem, 5vw, 5rem) 3rem;
  box-sizing: border-box;
  color: #fff;
  background:
    radial-gradient(40rem 24rem at 10% 0%, rgba(255,197,143,.07), transparent 60%),
    #0a1628;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
}

.ey-inner {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

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

@keyframes ey-rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 699px) {
  .ey-hero {
    padding-top: 6.5rem;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ey-copy h1,
  .ey-copy p,
  .ey-actions {
    animation: none;
  }
}
`;

export default Hero;
