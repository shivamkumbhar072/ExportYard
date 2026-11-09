import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="au-page">
      <style>{css}</style>
      <Link to="/" className="au-brand" aria-label="ExportYard home">
        <img src="/Images/logo.png" alt="ExportYard" />
      </Link>
      <main className="au-card">
        <span className="au-eyebrow">ExportYard account</span>
        <h1>{title}</h1>
        <p className="au-sub">{subtitle}</p>
        {children}
        <p className="au-foot">{footer}</p>
      </main>
    </div>
  );
}

const css = `
.au-page {
  min-height: calc(100vh - 76px);
  min-height: calc(100svh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  padding: 6rem 1rem 3rem;
  background: #f5f6f7;
  color: #172536;
}
.au-brand {
  position: absolute;
  top: 1.5rem;
  left: max(1.25rem, calc((100vw - 88rem) / 2));
  line-height: 0;
}
.au-brand img {
  width: auto;
  height: 2.5rem;
}
.au-brand:focus-visible {
  outline: 2px solid #d9a441;
  outline-offset: 4px;
}
.au-card {
  width: 100%;
  max-width: 430px;
  box-sizing: border-box;
  padding: clamp(1.5rem, 5vw, 2.25rem);
  border: 1px solid #e1e5e9;
  border-top: 3px solid #d9a441;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 18px 48px -32px rgba(7,28,48,.35);
}
.au-eyebrow {
  display: block;
  margin-bottom: .65rem;
  color: #8b5e0b;
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
}
.au-card h1 {
  margin: 0;
  color: #071c30;
  font-size: clamp(1.8rem, 6vw, 2.25rem);
  font-weight: 750;
  letter-spacing: -.035em;
  line-height: 1.08;
  text-wrap: balance;
}
.au-sub {
  margin: .65rem 0 1.4rem;
  color: #4b5563;
  font-size: .95rem;
  line-height: 1.55;
}
.au-card button[type="submit"] {
  background: #d9a441 !important;
  color: #071c30 !important;
  font-weight: 700 !important;
}
.au-card button[type="submit"]:hover:not(:disabled) {
  background: #e8b85d !important;
}
.au-card a {
  color: #8b5e0b;
}
.au-foot {
  margin: 1.25rem 0 0;
  color: #4b5563;
  font-size: .875rem;
  text-align: center;
}
.au-foot a {
  font-weight: 650;
  text-decoration: none;
}
.au-foot a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
@media (max-width: 380px) {
  .au-page { padding-right: .75rem; padding-left: .75rem; }
}
`;
