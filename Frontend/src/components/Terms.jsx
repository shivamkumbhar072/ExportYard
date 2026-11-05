import React from "react";
import { Link } from "react-router-dom";

const LAST_UPDATED = "31 October 2026";
const COMPANY = "ExportYard";
const EMAIL = "support@exportyard.com"; // TODO: replace with your real email
const LOCATION = "Mumbai, Maharashtra, India";

// The short version, shown at the top of the page
const highlights = [
  {
    title: "Written confirmation seals the deal",
    text: "A quotation or website information is not a contract. Your order is binding only when we confirm it in writing.",
  },
  {
    title: "Payment first, then dispatch",
    text: "Goods ship only after the agreed advance or payment instrument has been received and verified.",
  },
  {
    title: "Report problems within 7 days",
    text: "Inspect on arrival and tell us in writing, with photos and documents, within 7 days of delivery at the destination port.",
  },
  {
    title: "No cancellation once sourcing starts",
    text: "Confirmed orders cannot be cancelled after sourcing, production or packing has begun.",
  },
];

// Each item can be plain text or { label, text }
const sections = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      `By using this website or placing an enquiry or order with ${COMPANY}, you agree to these Terms & Conditions. If you do not agree, please do not use our website or services.`,
    ],
  },
  {
    id: "services",
    title: "Our business",
    body: [
      `${COMPANY} supplies and exports products from India to business buyers, distributors and importers worldwide, shipped from ${LOCATION}.`,
      "Information on this website is for general guidance and is not an offer. A binding contract is formed only when we confirm your order in writing.",
    ],
  },
  {
    id: "orders",
    title: "Enquiries, quotations and orders",
    list: [
      {
        label: "Validity",
        text: "Quotations are valid for the period stated on them, or 15 days if none is stated.",
      },
      {
        label: "What a quotation covers",
        text: "The product, packaging, quantity, price, Incoterm and delivery port.",
      },
      {
        label: "Acceptance",
        text: "An order is accepted only after our written confirmation and, where applicable, receipt of advance payment.",
      },
      {
        label: "Minimum quantities",
        text: "Minimum order quantities apply and may vary by product and destination.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing and payment",
    list: [
      {
        label: "Currency and taxes",
        text: "Prices are in the currency stated on the quotation and exclude bank charges, duties, taxes and import levies in the destination country, unless the Incoterm says otherwise.",
      },
      {
        label: "Payment terms",
        text: "Terms such as advance, T/T or Letter of Credit are agreed in writing for each order.",
      },
      {
        label: "Before dispatch",
        text: "Goods are dispatched only after the agreed advance or payment instrument has been received and verified.",
      },
      {
        label: "Late payment",
        text: "Late payment may lead to suspension of shipment, and storage or demurrage charges are payable by the buyer.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping and risk",
    list: [
      {
        label: "How we ship",
        text: "By sea in containers, or as otherwise agreed, under the Incoterms 2020 rule stated in the order (for example FOB, CIF or CFR).",
      },
      {
        label: "Risk",
        text: "Risk passes to the buyer as defined by the applicable Incoterm.",
      },
      {
        label: "Delivery dates",
        text: "Dates are estimates. Delays caused by shipping lines, weather, port congestion, customs, strikes or other events outside our control are not a breach of contract.",
      },
      {
        label: "Import compliance",
        text: "The buyer is responsible for import licences, customs clearance, duties and destination-country compliance, unless agreed otherwise.",
      },
    ],
  },
  {
    id: "quality",
    title: "Quality and claims",
    list: [
      {
        label: "Packing",
        text: "Products are packed to the specifications confirmed in the order and to the Indian standards that apply to them.",
      },
      {
        label: "Inspection",
        text: "The buyer should inspect goods on arrival and report visible damage, shortage or non-conformity in writing, with photos and shipping documents, within 7 days of delivery at the destination port.",
      },
      {
        label: "Late claims",
        text: "Claims made after this period, or for goods stored or handled improperly after delivery, may not be accepted.",
      },
      {
        label: "Our remedy",
        text: "For a valid claim, we will replace the affected goods or give a credit or refund of their invoice value, at our discretion.",
      },
    ],
  },
  {
    id: "cancellation",
    title: "Cancellations and returns",
    body: [
      "Confirmed orders cannot be cancelled once sourcing, production or packing has begun. Goods are not returnable except for valid claims under Section 6.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      `All content on this website, including the ${COMPANY} name, logo, text, images and design, belongs to ${COMPANY} or its licensors and may not be copied or used without our written consent. For private-label or custom-branded orders, the buyer confirms they own or are licensed to use the branding supplied.`,
    ],
  },
  {
    id: "liability",
    title: "Liability and force majeure",
    body: [
      `To the maximum extent permitted by law, ${COMPANY} is not liable for indirect or consequential losses, including loss of profit or business. Our total liability for any claim is limited to the invoice value of the goods concerned.`,
      "We are also not liable for failure or delay caused by events beyond our reasonable control, including natural disasters, war, government action, export or import restrictions, pandemics, shipping disruptions or supply shortages.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "We use the details you submit only to respond to you, process orders and meet legal requirements. We do not sell your personal data.",
    ],
    link: { to: "/privacy-policy", label: "Read our Privacy Policy" },
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: [
      `These Terms are governed by the laws of India. After good-faith attempts to settle a dispute amicably, it is subject to the exclusive jurisdiction of the courts at ${LOCATION}.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these Terms from time to time. The updated version applies from the date posted on this page.",
    ],
  },
];

const ListItem = ({ item }) =>
  typeof item === "string" ? (
    <li>{item}</li>
  ) : (
    <li>
      <strong>{item.label}.</strong> {item.text}
    </li>
  );

const Terms = () => {
  return (
    <main className="tc-page">
      <style>{css}</style>

      {/* Header */}
      <header className="tc-hero">
        <div className="tc-wrap">
          <h1 className="tc-title">Clear terms for clear trade.</h1>
          <p className="tc-lead">
            These are the {COMPANY} Terms &amp; Conditions. They explain how
            enquiries, orders, payment and shipping work, so both sides know
            what to expect before a container leaves port.
          </p>
          <p className="tc-meta">Last updated {LAST_UPDATED}</p>
        </div>
      </header>

      {/* The short version */}
      <section className="tc-wrap tc-highlights" aria-label="Summary">
        {highlights.map((h) => (
          <div className="tc-highlight" key={h.title}>
            <h2>{h.title}</h2>
            <p>{h.text}</p>
          </div>
        ))}
      </section>

      {/* Terms sections */}
      <div className="tc-wrap">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="tc-row">
            <div className="tc-row-head">
              <span className="tc-num" aria-hidden="true">
                {i + 1}
              </span>
              <h2>{s.title}</h2>
            </div>

            <div className="tc-row-body">
              {s.body?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}

              {s.list && (
                <ul>
                  {s.list.map((item, j) => (
                    <ListItem item={item} key={j} />
                  ))}
                </ul>
              )}

              {s.link && (
                <p>
                  <Link to={s.link.to} className="tc-link">
                    {s.link.label}
                  </Link>
                </p>
              )}
            </div>
          </section>
        ))}

        {/* Contact */}
        <section className="tc-contact">
          <div>
            <h2>Questions about these terms?</h2>
            <p>
              Ask before you order and we will clear it up. {COMPANY},{" "}
              {LOCATION}.
            </p>
          </div>
          <a href={`mailto:${EMAIL}`} className="tc-contact-mail">
            {EMAIL}
          </a>
        </section>
      </div>
    </main>
  );
};

const css = `
.tc-page {
  min-height: 100vh;
  padding-bottom: 5rem;
  background: #0a1628;
  color: #fff;
}

/* full-width container: fluid side padding, no narrow column */
.tc-wrap {
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
}

/* ---------- header ---------- */
.tc-hero {
  /* extra top space clears the fixed navbar */
  padding: 8rem 0 3.5rem;
  background:
    radial-gradient(70rem 30rem at 85% -10%, rgba(56,189,208,.18), transparent 60%),
    #0a1628;
  border-bottom: 1px solid rgba(56,189,208,.15);
}

.tc-title {
  max-width: 20ch;
  margin: 0 0 1.25rem;
  font-size: clamp(2.3rem, 6.5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -.02em;
  animation: tc-rise .6s ease both;
}

.tc-lead {
  max-width: 46rem;
  margin: 0 0 1.25rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.65;
  color: rgba(255,255,255,.78);
  animation: tc-rise .6s .1s ease both;
}

.tc-meta {
  margin: 0;
  font-size: .9rem;
  color: rgba(255,255,255,.6);
  animation: tc-rise .6s .2s ease both;
}

.tc-link {
  color: #38bdd0;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.tc-link:hover {
  color: #ffc58f;
}

.tc-link:focus-visible,
.tc-contact-mail:focus-visible {
  outline: 2px solid #ffd9a0;
  outline-offset: 3px;
  border-radius: 2px;
}

/* ---------- the short version ---------- */
.tc-highlights {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 2.5rem;
}

.tc-highlight {
  padding: 1.4rem 1.5rem;
  border: 1px solid rgba(56,189,208,.22);
  border-radius: 14px;
  background: rgba(255,255,255,.03);
}

.tc-highlight h2 {
  margin: 0 0 .45rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #38bdd0;
}

.tc-highlight p {
  margin: 0;
  font-size: .92rem;
  line-height: 1.6;
  color: rgba(255,255,255,.72);
}

/* ---------- sections: heading left, content right on wide screens ---------- */
.tc-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,.1);
  scroll-margin-top: 6rem;
}

.tc-row-head {
  display: flex;
  align-items: center;
  gap: .9rem;
}

.tc-num {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: .85rem;
  font-weight: 700;
  color: #10222e;
  background: #38bdd0;
}

.tc-row-head h2 {
  margin: 0;
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -.01em;
}

.tc-row-body p {
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255,255,255,.76);
  overflow-wrap: anywhere;
}

.tc-row-body ul {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  display: grid;
  gap: .65rem;
}

.tc-row-body li {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255,255,255,.76);
  overflow-wrap: anywhere;
}

.tc-row-body li::marker {
  color: #38bdd0;
}

.tc-row-body li strong {
  font-weight: 600;
  color: #fff;
}

.tc-row-body > *:last-child {
  margin-bottom: 0;
}

/* ---------- contact ---------- */
.tc-contact {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.5rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid rgba(255,197,143,.45);
  border-radius: 16px;
  background: rgba(255,197,143,.07);
}

.tc-contact h2 {
  margin: 0 0 .4rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffc58f;
}

.tc-contact p {
  margin: 0;
  font-size: .95rem;
  line-height: 1.6;
  color: rgba(255,255,255,.75);
}

.tc-contact-mail {
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #ffc58f;
  text-underline-offset: 4px;
  overflow-wrap: anywhere;
}

.tc-contact-mail:hover {
  color: #ffc58f;
}

@keyframes tc-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (min-width: 640px) {
  .tc-highlights {
    grid-template-columns: 1fr 1fr;
  }

  .tc-contact {
    padding: 2rem;
  }
}

@media (min-width: 900px) {
  .tc-hero {
    padding: 10rem 0 4.5rem;
  }

  .tc-row {
    grid-template-columns: minmax(14rem, 1fr) 2.4fr;
    gap: 3rem;
    padding: 3rem 0;
  }

  .tc-row-head {
    align-self: start;
    position: sticky;
    top: 6rem;
  }

  .tc-contact {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2.25rem 2.5rem;
  }
}

@media (min-width: 1100px) {
  .tc-highlights {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tc-title,
  .tc-lead,
  .tc-meta {
    animation: none;
  }
}
`;

export default Terms;