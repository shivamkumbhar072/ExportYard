import { Link } from "react-router-dom";
import CTASection from "../Homepage/CTASection.jsx";
import ServiceCard from "../Homepage/ServiceCard.jsx";
import PageHero from "../components/PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { services } from "../data/websiteContent.js";

export default function Services() {
  usePageMeta(
    "Export Services | ExportYard",
    "Explore sourcing, supplier identification, quality, packaging, documentation and logistics coordination services."
  );

  return (
    <main className="bg-white text-[#172536]">
      <PageHero
        eyebrow="Our services"
        title="Practical support for international trade."
        description="Coordinate sourcing, product requirements and export details with a team focused on clear communication."
        image="/Images/logistics.jpg"
      />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                number={`0${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-12 rounded-lg bg-[#f5f6f7] p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Service details depend on your trade.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-[#4b5563]">
              The product, destination and parties involved determine the
              requirements for each transaction. We discuss the scope and
              responsibilities with you before any service is confirmed.
            </p>
            <Link to="/enquiry" className="mt-5 inline-flex font-bold text-[#8b5e0b]">
              Discuss your requirements <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CTASection title="Tell us what support you need." />
    </main>
  );
}
