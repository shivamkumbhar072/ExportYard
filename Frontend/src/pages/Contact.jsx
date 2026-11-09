import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../Homepage/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

export default function Contact() {
  usePageMeta(
    "Contact ExportYard | Trade Enquiries",
    "Contact ExportYard about sourcing products from India or introducing your supplier capabilities."
  );

  return (
    <main className="bg-[#F7F5EF] text-[#252b27]">
      <PageHero
        eyebrow="Contact ExportYard"
        title="Let’s discuss your trade requirements."
        description="Share a buyer or supplier enquiry and include the product, quantity, destination and any specifications you already know."
      />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">Business enquiry</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#59655d]">
              Use the enquiry form to tell us whether you are looking to source
              a product or introduce a supply opportunity. You’ll need to log
              in before submitting.
            </p>
            <Link
              to="/enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#C47A45] px-5 py-3 text-sm font-bold text-[#1a211d] transition-colors hover:bg-[#d99b6b]"
            >
              Open enquiry form <ArrowRight size={17} />
            </Link>
          </div>
          <aside className="bg-[#F7F5EF] p-6 sm:p-8">
            <Mail className="text-[#854a31]" size={25} strokeWidth={1.7} />
            <h2 className="mt-5 text-xl font-bold">Email our team</h2>
            <p className="mt-2 text-sm leading-6 text-[#59655d]">
              For general business enquiries, contact us by email.
            </p>
            <a
              href="mailto:contact@exportyard.com"
              className="mt-4 inline-block break-all font-semibold text-[#854a31] underline underline-offset-4"
            >
              contact@exportyard.com
            </a>
          </aside>
        </div>
      </section>
      <CTASection title="Start with the details you have." />
    </main>
  );
}
