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
    <main className="bg-white text-[#172536]">
      <PageHero
        eyebrow="Contact ExportYard"
        title="Let’s discuss your trade requirements."
        description="Share a buyer or supplier enquiry and include the product, quantity, destination and any specifications you already know."
      />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-lg border border-slate-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Business enquiry</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#4b5563]">
              Use the enquiry form to tell us whether you are looking to source
              a product or introduce a supply opportunity. You’ll need to log
              in before submitting.
            </p>
            <Link
              to="/enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#d9a441] px-5 py-3 text-sm font-bold text-[#071c30] hover:bg-[#e8b85d]"
            >
              Open enquiry form <ArrowRight size={17} />
            </Link>
          </div>
          <aside className="bg-[#f5f6f7] p-6 sm:p-8">
            <Mail className="text-[#9c6a11]" size={25} strokeWidth={1.7} />
            <h2 className="mt-5 text-xl font-bold">Email our team</h2>
            <p className="mt-2 text-sm leading-6 text-[#4b5563]">
              For general business enquiries, contact us by email.
            </p>
            <a
              href="mailto:contact@exportyard.com"
              className="mt-4 inline-block break-all font-semibold text-[#8b5e0b] underline underline-offset-4"
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
