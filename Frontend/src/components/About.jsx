import { ArrowRight, Compass, Handshake, Target } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../Homepage/CTASection.jsx";
import ImageFrame from "../Homepage/ImageFrame.jsx";
import PageHero from "./PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

const principles = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "Make international sourcing conversations clearer by connecting product requirements with relevant supply opportunities from India.",
  },
  {
    icon: Compass,
    title: "Our vision",
    description:
      "Build lasting trade relationships through thoughtful coordination, transparent communication and practical support.",
  },
  {
    icon: Handshake,
    title: "Our approach",
    description:
      "Listen first, align on product and shipment details, and agree on the right next steps with each buyer and supplier.",
  },
];

const steps = [
  ["01", "Understand the brief", "We learn about the product, specifications, quantity and destination."],
  ["02", "Explore supply", "We discuss potential sourcing options and requirements with you."],
  ["03", "Coordinate details", "We align on quality, packaging and documentation needs."],
  ["04", "Plan next steps", "We coordinate shipment details based on the agreed trade."],
];

export default function About() {
  usePageMeta(
    "About ExportYard | Global Sourcing from India",
    "Learn how ExportYard connects international buyers with Indian suppliers and supports sourcing and export coordination."
  );

  return (
    <main className="bg-[#F7F5EF] text-[#252b27]">
      <PageHero
        eyebrow="About ExportYard"
        title="Trade from India, built on clear communication."
        description="We connect international buyers with Indian suppliers and help coordinate the details that move a trade enquiry forward."
        image="/Images/hero-port.jpg"
      />

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
              Who we are
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A considered approach to global sourcing.
            </h2>
            <p className="mt-5 leading-7 text-[#59655d]">
              ExportYard helps buyers share what they need and gives suppliers
              a place to introduce what they can offer. Our work starts with a
              clear brief and continues through practical sourcing and export
              coordination.
            </p>
            <p className="mt-4 leading-7 text-[#59655d]">
              Each product, destination and shipment has its own requirements.
              We discuss these details with the parties involved before
              confirming a way forward.
            </p>
            <Link
              to="/enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#C47A45] px-5 py-3 text-sm font-bold text-[#1a211d] transition-colors hover:bg-[#d99b6b]"
            >
              Talk to our team <ArrowRight size={17} />
            </Link>
          </div>
          <ImageFrame
            src="/Images/sourcing.webp"
            alt="Business partners discussing a sourcing requirement"
            className="aspect-[16/10] rounded-md"
          />
        </div>
      </section>

      <section className="bg-[#F7F5EF] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[88rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
            What guides us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Our mission, vision and approach.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="text-[#854a31]" size={25} strokeWidth={1.7} />
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#59655d]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
              How we work
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From a clear brief to coordinated next steps.
            </h2>
            <p className="mt-4 leading-7 text-[#59655d]">
              We keep requirements and responsibilities visible at each stage,
              so buyers and suppliers can make informed decisions.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map(([number, title, description]) => (
              <li key={number} className="border-l-2 border-[#C47A45] bg-[#F7F5EF] p-5">
                <span className="text-xs font-bold tracking-widest text-[#854a31]">
                  {number}
                </span>
                <h3 className="mt-2 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#59655d]">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Let’s talk about your trade requirements."
        description="Tell us what you want to source or supply and we’ll discuss suitable next steps."
      />
    </main>
  );
}
