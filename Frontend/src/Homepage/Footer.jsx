import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#183F35] text-white">
    <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-12 lg:py-16">
      <div>
        <Link to="/" className="inline-flex" aria-label="ExportYard home">
          <img className="h-11 w-auto" src="/Images/logo.png" alt="ExportYard" />
        </Link>
        <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
          Connecting international buyers with Indian suppliers through clear
          sourcing conversations and export coordination.
        </p>
        <a
          className="mt-4 inline-block text-sm font-semibold text-[#e5ae83] hover:text-white"
          href="mailto:contact@exportyard.com"
        >
          contact@exportyard.com
        </a>
        <p className="mt-6 text-sm text-white/75">Have a product in mind?</p>
        <Link
          className="mt-2 inline-flex rounded-md bg-[#C47A45] px-4 py-2.5 text-sm font-semibold text-[#1a211d] transition-colors hover:bg-[#d99b6b]"
          to="/enquiry"
        >
          Request a Quote
        </Link>
      </div>

      <nav className="flex flex-col items-start gap-3" aria-label="Company links">
        <h2 className="mb-1 text-sm font-bold text-white">Company</h2>
        <Link className="footer-link" to="/about">About Us</Link>
        <Link className="footer-link" to="/services">Our Services</Link>
        <Link className="footer-link" to="/sourcing-solutions">Sourcing Solutions</Link>
        <Link className="footer-link" to="/resources">Resources</Link>
        <Link className="footer-link" to="/contact">Contact Us</Link>
      </nav>

      <nav className="flex flex-col items-start gap-3" aria-label="Product categories">
        <h2 className="mb-1 text-sm font-bold text-white">Products</h2>
        <Link className="footer-link" to="/products">Browse categories</Link>
        <Link className="footer-link" to="/products/mineral-water">Mineral Water</Link>
        <Link className="footer-link" to="/products/spices-seeds">Spices & Seeds</Link>
        <Link className="footer-link" to="/products/rice-agricultural-products">Rice & Agriculture</Link>
      </nav>

      <nav className="flex flex-col items-start gap-3" aria-label="Legal">
        <h2 className="mb-1 text-sm font-bold text-white">Information</h2>
        <Link className="footer-link" to="/privacy-policy">Privacy Policy</Link>
        <Link className="footer-link" to="/terms">Terms & Conditions</Link>
        <p className="mt-2 text-xs leading-5 text-white/45">
          Product, destination and shipment requirements are confirmed for each trade.
        </p>
      </nav>
    </div>
    <div className="border-t border-white/10">
      <p className="mx-auto max-w-[88rem] px-5 py-4 text-xs text-white/50 sm:px-8 lg:px-12">
        © {new Date().getFullYear()} ExportYard. All rights reserved.
      </p>
    </div>
    <style>{`
      .footer-link {
        color: rgba(255,255,255,.65);
        font-size: .875rem;
        text-decoration: none;
        transition: color .2s ease;
      }
      .footer-link:hover,
      .footer-link:focus-visible {
        color: #e5ae83;
      }
      .footer-link:focus-visible {
        outline: 2px solid #e5ae83;
        outline-offset: 3px;
      }
    `}</style>
  </footer>
);

export default Footer;
