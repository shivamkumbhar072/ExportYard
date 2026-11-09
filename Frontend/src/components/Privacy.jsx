import { useEffect } from "react";

const LAST_UPDATED = "31 October 2026";
const COMPANY = "ExportYard";
const SITE = "exportyard.com";
const SITE_URL = "https://exportyard.com";
const EMAIL = "support@exportyard.com"; // TODO: must be a real, monitored address
const LOCATION = "Mumbai, Maharashtra, India";

// The short version, shown at the top of the page
const highlights = [
  {
    title: "We never sell your data",
    text: "Your details are used to answer enquiries and ship orders. Nothing else.",
  },
  {
    title: "Google sign-in stays minimal",
    text: "We only receive your name, email and profile picture. We never see your password or touch Gmail, Drive or contacts.",
  },
  {
    title: "No AI training",
    text: "Google user data is never used to train AI or machine learning models.",
  },
];

// Each item can be plain text or { label, text }
const sections = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      `${COMPANY} ("we", "us", "our") runs ${SITE} (the "Service"), where businesses can enquire about our export services. This policy explains in plain language what personal information we collect, why we need it, who sees it, how long we keep it and how you can take control of it. By using the Service you agree to this policy.`,
      `It is written to comply with Indian law, including the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, and with the Google API Services User Data Policy for people who choose to sign in with Google.`,
    ],
  },
  {
    id: "collect",
    title: "What we collect",
    body: ["We collect only what we need to deal with your enquiry or order."],
    list: [
      {
        label: "What you give us",
        text: "Name, company, email, phone or WhatsApp number, country, and enquiry details such as product, quantity, destination port and your message.",
      },
      {
        label: "For orders",
        text: "Billing and delivery addresses, import or tax numbers, and the documents needed for shipping, customs and payment.",
      },
      {
        label: "From Google, if you use it",
        text: "Only the items listed in the Google user data section below.",
      },
      {
        label: "Automatically",
        text: "IP address, browser and device type, and pages visited, through server logs and cookies that keep you signed in and the Service secure.",
      },
    ],
  },
  {
    id: "google",
    title: "Google user data",
    highlight: true,
    body: [
      `If you choose Sign in with Google, ${COMPANY} requests access to the following through Google OAuth:`,
    ],
    list: [
      {
        label: "Email address (userinfo.email)",
        text: "Used to create and identify your account and to contact you about your enquiries and orders.",
      },
      {
        label: "Name and profile picture (userinfo.profile)",
        text: "Used to personalise your account.",
      },
      {
        label: "Google account identifier (openid)",
        text: "Used to recognise you when you sign in again.",
      },
    ],
    blocks: [
      {
        label: "How we use it",
        text: "Only to provide the features you ask for: signing you in, managing your account, and contacting you about your enquiries and orders. We do not access your Gmail messages, contacts, calendar, Drive files or any other Google data.",
      },
      {
        label: "How we share it",
        text: "We do not sell, rent or transfer Google user data to third parties, and we never use it for advertising. We disclose it only where needed to provide the Service you requested (for example, to our hosting provider), to comply with law, or as part of a merger or acquisition, with notice to you.",
      },
      {
        label: "No human access, no AI training",
        text: "Our staff do not read your Google user data unless you give explicit permission, it is needed for security or abuse investigation, or the law requires it. We do not use it to develop, improve or train generalised AI or machine learning models.",
      },
      {
        label: "How we protect it",
        text: "It is stored in an access-controlled database on secured servers, sent over HTTPS, and available only to authorised people who need it to run the Service. We never see or store your Google password.",
      },
      {
        label: "How long we keep it",
        text: "Only while your account is active. Email us (see Your rights below) and we will delete your account and all associated Google user data within 30 days, except limited records we must keep by law.",
      },
      {
        label: "Taking access back",
        text: "You can withdraw our access to your Google account at any time at",
        href: "https://myaccount.google.com/permissions",
        hrefText: "myaccount.google.com/permissions",
      },
    ],
    note: {
      text: `${COMPANY}'s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.`,
      href: "https://developers.google.com/terms/api-services-user-data-policy",
      hrefText: "Read Google's policy",
    },
  },
  {
    id: "use",
    title: "How we use your information",
    list: [
      "To answer enquiries and prepare quotations.",
      "To create and manage your account.",
      "To process orders and arrange shipping, customs documents and payments.",
      "To keep the Service secure and prevent fraud or abuse.",
      "To meet legal, tax, export and customs obligations.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: [
      "We do not sell your personal information. We share it only where needed to deliver our services, with:",
    ],
    list: [
      "Freight forwarders, shipping lines, customs agents and logistics partners handling your order.",
      "Banks and payment providers that process payments.",
      "Hosting and email providers who process data on our behalf.",
      "Government or regulatory authorities where required by law.",
    ],
    after: ["Sharing of Google user data is limited as described above."],
  },
  {
    id: "retention",
    title: "How long we keep it",
    list: [
      {
        label: "Enquiries and contact details",
        text: "Up to 24 months after our last communication.",
      },
      {
        label: "Orders, invoices and shipping records",
        text: "For the period required by Indian tax, accounting and customs law.",
      },
      {
        label: "Account data, including Google user data",
        text: "While your account is active, and deleted within 30 days of a verified deletion request.",
      },
      {
        label: "Server logs",
        text: "Up to 90 days.",
      },
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    body: [
      "We use reasonable technical and organisational safeguards, including HTTPS, access controls and secured hosting, to protect your information. No method of transmission or storage is completely secure. If a breach affecting your data occurs, we will tell you and the authorities as required by law.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: ["Subject to applicable law, you can ask us to:"],
    list: [
      "Tell you what personal information we hold about you.",
      "Correct anything that is inaccurate or incomplete.",
      "Delete your information and account, including any Google user data.",
      "Stop using your information for marketing, or withdraw your consent.",
    ],
    after: [
      `To make a request, email ${EMAIL} from the address linked to your account with the subject "Privacy request". We may need to verify your identity, and we will reply within 30 days.`,
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    body: [
      "The Service is for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has given us information, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The latest version is always on this page with its updated date. If we make material changes, including to how we use Google user data, we will tell you by email or a notice on the Service before they take effect.",
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

const Privacy = () => {
  // SEO: set page title, meta description and canonical on mount
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Privacy Policy | ${COMPANY}`;

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
      `${COMPANY}'s Privacy Policy: what personal data we collect, how we use it, how Google sign-in data is handled, and how you can access or delete your information.`
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    let canonicalCreated = false;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
      canonicalCreated = true;
    }
    const previousCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", `${SITE_URL}/privacy`);

    return () => {
      document.title = previousTitle;
      if (created) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
      if (canonicalCreated) {
        canonical.remove();
      } else if (previousCanonical !== null) {
        canonical.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  return (
    <main className="pv-page">
      <style>{css}</style>

      {/* Header */}
      <header className="pv-hero">
        <div className="pv-wrap">
          <h1 className="pv-title">Your data, handled with care.</h1>
          <p className="pv-lead">
            This is the {COMPANY} Privacy Policy. In short: we collect only what
            we need to answer your enquiry and ship your order, we never sell
            it, and you can ask us to delete it at any time.
          </p>
          <p className="pv-meta">
            <a href={SITE_URL} className="pv-link" aria-label={`Visit ${SITE}`}>
              {SITE}
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;Last updated{" "}
            <time dateTime="2026-10-31">{LAST_UPDATED}</time>
          </p>
        </div>
      </header>

      {/* The short version */}
      <section className="pv-wrap pv-highlights" aria-label="Summary">
        {highlights.map((h) => (
          <div className="pv-highlight" key={h.title}>
            <h2>{h.title}</h2>
            <p>{h.text}</p>
          </div>
        ))}
      </section>

      {/* Policy sections */}
      <div className="pv-wrap">
        {sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`pv-row${s.highlight ? " pv-row-google" : ""}`}
            aria-labelledby={`${s.id}-title`}
          >
            <div className="pv-row-head">
              <span className="pv-num" aria-hidden="true">
                {i + 1}
              </span>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
            </div>

            <div className="pv-row-body">
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

              {s.blocks && (
                <div className="pv-blocks">
                  {s.blocks.map((b) => (
                    <div className="pv-block" key={b.label}>
                      <h3>{b.label}</h3>
                      <p>
                        {b.text}
                        {b.href && (
                          <>
                            {" "}
                            <a
                              href={b.href}
                              className="pv-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {b.hrefText}
                            </a>
                            .
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {s.note && (
                <p className="pv-note">
                  {s.note.text}{" "}
                  <a
                    href={s.note.href}
                    className="pv-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.note.hrefText}
                  </a>
                  .
                </p>
              )}

              {s.after?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {/* Contact */}
        <section className="pv-contact" aria-labelledby="pv-contact-title">
          <div>
            <h2 id="pv-contact-title">Questions about your privacy?</h2>
            <p>
              Write to us and a real person will reply. {COMPANY}, {LOCATION}.
            </p>
          </div>
          <a href={`mailto:${EMAIL}`} className="pv-contact-mail">
            {EMAIL}
          </a>
        </section>
      </div>
    </main>
  );
};

const css = `
.pv-page {
  min-height: 100vh;
  padding-bottom: 5rem;
  background: #183F35;
  color: #fff;
}

/* full-width container: fluid side padding, no narrow column */
.pv-wrap {
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 5rem);
}

/* ---------- header ---------- */
.pv-hero {
  /* extra top space clears the fixed navbar */
  padding: 8rem 0 3.5rem;
  background:
    radial-gradient(70rem 30rem at 85% -10%, rgba(196,122,69,.18), transparent 60%),
    #183F35;
  border-bottom: 1px solid rgba(196,122,69,.2);
}

.pv-title {
  max-width: 20ch;
  margin: 0 0 1.25rem;
  font-size: clamp(2.3rem, 6.5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -.02em;
  animation: pv-rise .6s ease both;
}

.pv-lead {
  max-width: 46rem;
  margin: 0 0 1.25rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.65;
  color: rgba(255,255,255,.78);
  animation: pv-rise .6s .1s ease both;
}

.pv-meta {
  margin: 0;
  font-size: .9rem;
  color: rgba(255,255,255,.6);
  animation: pv-rise .6s .2s ease both;
}

.pv-link {
  color: #e5ae83;
  text-decoration: underline;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

.pv-link:hover {
  color: #d99b6b;
}

.pv-link:focus-visible,
.pv-contact-mail:focus-visible {
  outline: 2px solid #e5ae83;
  outline-offset: 3px;
  border-radius: 2px;
}

/* ---------- the short version ---------- */
.pv-highlights {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 2.5rem;
}

.pv-highlight {
  padding: 1.4rem 1.5rem;
  border: 1px solid rgba(196,122,69,.28);
  border-radius: 14px;
  background: rgba(255,255,255,.03);
}

.pv-highlight h2 {
  margin: 0 0 .45rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #e5ae83;
}

.pv-highlight p {
  margin: 0;
  font-size: .92rem;
  line-height: 1.6;
  color: rgba(255,255,255,.72);
}

/* ---------- sections: heading left, content right on wide screens ---------- */
.pv-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,.1);
  scroll-margin-top: 6rem;
}

.pv-row-head {
  display: flex;
  align-items: center;
  gap: .9rem;
}

.pv-num {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: .85rem;
  font-weight: 700;
  color: #1a211d;
  background: #C47A45;
}

.pv-row-head h2 {
  margin: 0;
  font-size: clamp(1.25rem, 2.5vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -.01em;
}

.pv-row-body p {
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255,255,255,.76);
  overflow-wrap: anywhere;
}

.pv-row-body ul {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  display: grid;
  gap: .65rem;
}

.pv-row-body li {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255,255,255,.76);
  overflow-wrap: anywhere;
}

.pv-row-body li::marker {
  color: #e5ae83;
}

.pv-row-body li strong {
  font-weight: 600;
  color: #fff;
}

.pv-row-body > *:last-child {
  margin-bottom: 0;
}

/* Google section gets a highlighted panel */
.pv-row-google {
  margin: 1.5rem 0;
  padding: 2.5rem 1.25rem;
  border: 1px solid rgba(196,122,69,.32);
  border-radius: 18px;
  background: linear-gradient(160deg, rgba(196,122,69,.12), rgba(196,122,69,.03));
}

.pv-blocks {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 1.5rem 0 1rem;
}

.pv-block {
  padding: 1.1rem 1.25rem;
  border-left: 3px solid #C47A45;
  background: rgba(10,22,40,.55);
  border-radius: 0 10px 10px 0;
}

.pv-block h3 {
  margin: 0 0 .35rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.pv-block p {
  margin: 0;
  font-size: .95rem;
  line-height: 1.7;
}

.pv-row-body .pv-note {
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,.12);
  font-size: .9rem;
  color: rgba(255,255,255,.7);
}

/* ---------- contact ---------- */
.pv-contact {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.5rem;
  padding: 1.75rem 1.5rem;
  border: 1px solid rgba(255,197,143,.45);
  border-radius: 16px;
  background: rgba(255,197,143,.07);
}

.pv-contact h2 {
  margin: 0 0 .4rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #e5ae83;
}

.pv-contact p {
  margin: 0;
  font-size: .95rem;
  line-height: 1.6;
  color: rgba(255,255,255,.75);
}

.pv-contact-mail {
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #e5ae83;
  text-underline-offset: 4px;
  overflow-wrap: anywhere;
}

.pv-contact-mail:hover {
  color: #e5ae83;
}

@keyframes pv-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (min-width: 640px) {
  .pv-highlights {
    grid-template-columns: 1fr 1fr;
  }

  .pv-row-google {
    padding: 2.5rem 2rem;
  }

  .pv-contact {
    padding: 2rem;
  }
}

@media (min-width: 900px) {
  .pv-hero {
    padding: 10rem 0 4.5rem;
  }

  .pv-row {
    grid-template-columns: minmax(14rem, 1fr) 2.4fr;
    gap: 3rem;
    padding: 3rem 0;
  }

  .pv-row-head {
    align-self: start;
    position: sticky;
    top: 6rem;
  }

  .pv-row-google {
    padding: 3rem 2.5rem;
  }

  .pv-blocks {
    grid-template-columns: 1fr 1fr;
  }

  .pv-contact {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2.25rem 2.5rem;
  }
}

@media (min-width: 1100px) {
  .pv-highlights {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pv-title,
  .pv-lead,
  .pv-meta {
    animation: none;
  }
}
`;

export default Privacy;