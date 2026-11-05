import React from "react";
import { Link } from "react-router-dom";

const EMAIL = "contact@exportyard.com";

const Footer = () => {
  return (
    <footer className="ft-footer">
      <style>{css}</style>

      <div className="ft-inner">
        {/* Logo */}
        <Link to="/" className="ft-logo" aria-label="ExportYard home">
          <img src="/Images/logo.png" alt="ExportYard logo" />
        </Link>

        {/* Company links */}
        <nav className="ft-col" aria-label="Footer">
          <h2 className="ft-heading">Company</h2>
          <Link to="/about" className="ft-link">
            About
          </Link>
          <Link to="/privacy-policy" className="ft-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="ft-link">
            Terms of Service
          </Link>
        </nav>

        {/* Enquiries */}
        <div className="ft-col">
          <h2 className="ft-heading">Enquiries</h2>
          <a href={`mailto:${EMAIL}`} className="ft-link">
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          &copy; {new Date().getFullYear()} ExportYard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const css = `
.ft-footer {
  background: #0a1628;
  border-top: 1px solid rgba(56,189,208,.2);
  color: #fff;
}

.ft-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.ft-logo {
  display: inline-flex;
  line-height: 0;
  justify-self: start;
}

.ft-logo img {
  height: 2.5rem;
  width: auto;
  display: block;
}

.ft-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .6rem;
}

.ft-heading {
  margin: 0 0 .2rem;
  font-size: .85rem;
  font-weight: 600;
  color: #fff;
}

.ft-link {
  font-size: .9rem;
  color: rgba(255,255,255,.65);
  text-decoration: none;
  transition: color .2s;
}

.ft-link:hover {
  color: #38bdd0;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ft-link:focus-visible,
.ft-logo:focus-visible {
  outline: 2px solid #ffd9a0;
  outline-offset: 3px;
  border-radius: 2px;
}

.ft-bottom {
  border-top: 1px solid rgba(255,255,255,.08);
}

.ft-bottom-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  font-size: .8rem;
  color: rgba(255,255,255,.5);
}

@media (min-width: 640px) {
  .ft-inner {
    grid-template-columns: 1fr auto auto;
    gap: 4rem;
    align-items: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ft-link {
    transition: none;
  }
}
`;

export default Footer;