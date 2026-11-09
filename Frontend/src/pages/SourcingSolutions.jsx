import { ArrowRight, ClipboardList, Search, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../Homepage/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

const steps = [
  {
    icon: ClipboardList,
    title: "Share your brief",
    text: "Tell us what product you need or supply, along with quantity, specifications and destination.",
  },
  {
    icon: Search,
    title: "Review sourcing options",
    text: "Discuss potential suppliers or product opportunities relevant to the requirements.",
  },
  {
    icon: MessagesSquare,
    title: "Agree on next steps",
    text: "Align on pricing discussions, packaging, quality expectations and shipment details.",
  },
];

export default function SourcingSolutions() {
  usePageMeta(
    "Sourcing Solutions | ExportYard",
    "Learn how ExportYard helps buyers and suppliers define product requirements and coordinate sourcing discussions."
  );

  return (
    <main className="bg-white text-[#172536]">
      <PageHero
        eyebrow="Sourcing solutions"
        title="A sourcing process built around your requirements."
        description="Whether you are buying or supplying, begin with a clear product brief and align on the details before moving forward."
        image="/Images/sourcing.jpg"
      />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <Icon className="text-[#9c6a11]" size={24} strokeWidth={1.7} />
                  <span className="text-xs font-bold tracking-widest text-slate-400">
                    STEP 0{index + 1}
                  </span>
                </div>
                <h2 className="mt-5 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#4b5563]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              ["For buyers", "Share target products, specifications, quantity, packaging preferences and destination details."],
              ["For suppliers", "Introduce your product range, origin, available capacity and the markets you can serve."],
            ].map(([title, text]) => (
              <article key={title} className="bg-[#f5f6f7] p-6 sm:p-8">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-[#4b5563]">{text}</p>
                <Link
                  to="/enquiry"
                  state={{ draft: { enquiryType: title === "For buyers" ? "Buyer" : "Supplier" } }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b5e0b]"
                >
                  Start an enquiry <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Have a custom sourcing requirement?" />
    </main>
  );
}
