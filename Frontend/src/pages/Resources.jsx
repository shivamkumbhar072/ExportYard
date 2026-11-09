import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, HelpCircle, PackageSearch } from "lucide-react";
import CTASection from "../Homepage/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

const guides = [
  {
    icon: PackageSearch,
    title: "Prepare a sourcing brief",
    text: "Include the product, grade or specifications, estimated quantity, packaging and destination.",
  },
  {
    icon: FileText,
    title: "Discuss export documents",
    text: "Document requirements can vary by product, destination and agreed trade terms. Confirm them for each shipment.",
  },
  {
    icon: HelpCircle,
    title: "Frequently asked questions",
    text: "Learn what details are useful to share and how enquiry follow-up works.",
  },
];

const questions = [
  ["What should I include in an enquiry?", "Share the product, specifications, approximate quantity, preferred packaging and destination. Add a timeline or target price if available."],
  ["Can suppliers submit an enquiry?", "Yes. Choose Supplier on the enquiry form and include product, supply origin, capacity and market details."],
  ["Are prices and minimum quantities fixed?", "No. Pricing, order quantities and packaging are discussed and confirmed for each specific product and enquiry."],
];

export default function Resources() {
  usePageMeta(
    "Trade Resources | ExportYard",
    "Helpful guidance for preparing sourcing enquiries and discussing export documentation."
  );

  return (
    <main className="bg-[#F7F5EF] text-[#252b27]">
      <PageHero
        eyebrow="Resources"
        title="Clear information for better trade conversations."
        description="Use these practical starting points to prepare your product enquiry and understand what to discuss with our team."
      />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-5 md:grid-cols-3">
            {guides.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="text-[#854a31]" size={24} strokeWidth={1.7} />
                <h2 className="mt-5 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#59655d]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
              Common questions
            </p>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {questions.map(([question, answer]) => (
                <details key={question} className="group py-4">
                  <summary className="cursor-pointer list-none pr-6 font-semibold marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {question}
                      <span className="text-[#854a31] transition group-open:rotate-45" aria-hidden="true">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-[#59655d]">{answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-5">
              <Link to="/terms" className="inline-flex items-center gap-1 text-sm font-semibold text-[#854a31]">
                Terms & Conditions <ArrowUpRight size={15} />
              </Link>
              <Link to="/privacy-policy" className="inline-flex items-center gap-1 text-sm font-semibold text-[#854a31]">
                Privacy Policy <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
