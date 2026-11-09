import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";
import ProductCard from "./ProductCard.jsx";
import ServiceCard from "./ServiceCard.jsx";
import { products, services } from "../data/websiteContent.js";

const companyHighlights = [
  {
    title: "Global sourcing",
    description: "We help clarify requirements and explore suitable supply options.",
    image: "/Images/sourcing.webp",
  },
  {
    title: "Quality coordination",
    description: "Coordinate product specifications and inspection requirements.",
    image: "/Images/quality-assurance.jpg",
  },
  {
    title: "Reliable logistics",
    description: "Plan export documentation and shipment coordination together.",
    image: "/Images/logistics.avif",
  },
];

const process = [
  ["01", "Requirement & enquiry", "Share the product, quantity, destination and specifications."],
  ["02", "Product sourcing", "Review potential supply options and align on next steps."],
  ["03", "Quality & documentation", "Confirm requirements and coordinate relevant export documents."],
  ["04", "Shipment coordination", "Coordinate shipment details with the parties involved."],
];

export default function Products() {
  return (
    <div className="bg-[#F7F5EF] text-[#252b27]">
      <section
        id="who-we-are"
        className="scroll-mt-24 px-5 py-14 sm:px-8 lg:px-12 lg:py-20"
        aria-labelledby="who-we-are-title"
      >
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.8fr_1.7fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
              Who we are
            </p>
            <h2 id="who-we-are-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A practical partner for trade from India.
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-[#C47A45]" />
            <p className="mt-5 leading-7 text-[#59655d]">
              ExportYard connects international buyers with Indian suppliers.
              We help bring product requirements, sourcing conversations and
              export coordination together in one place.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex rounded-md bg-[#C47A45] px-5 py-3 text-sm font-bold text-[#1a211d] transition-colors hover:bg-[#d99b6b]"
            >
              Learn more
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {companyHighlights.map((item) => (
              <article key={item.title}>
                <ImageFrame
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3] rounded-md"
                />
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#4b5563]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="trade-services"
        className="scroll-mt-24 bg-[#F7F5EF] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="trade-services-title"
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
            Our core services
          </p>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="trade-services-title" className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Support for the steps behind every trade.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#59655d]">
                Practical coordination shaped around product, supplier and
                destination requirements.
              </p>
            </div>
            <Link
              to="/services"
              className="self-start text-sm font-bold text-[#854a31] hover:text-[#653b2b] md:self-auto"
            >
              View all services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                number={`0${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="product-categories"
        className="scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="product-categories-title"
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
            Product categories
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="product-categories-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Explore sourcing possibilities.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#59655d]">
                Product availability, specifications and packaging are confirmed
                for each enquiry.
              </p>
            </div>
            <Link
              to="/products"
              className="self-start rounded-md border border-[#183F35]/20 px-4 py-2.5 text-sm font-bold text-[#183F35] transition-colors hover:border-[#C47A45] hover:bg-[#C47A45]/10 md:self-auto"
            >
              Browse products
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="global-markets"
        className="scroll-mt-24 bg-[#183F35] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="global-markets-title"
      >
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5ae83]">
              Global trade
            </p>
            <h2 id="global-markets-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Connecting product needs with supply from India.
            </h2>
            <p className="mt-4 leading-7 text-white/80">
              Every enquiry starts with the details that matter: product,
              specifications, quantity, packaging and destination. We review
              the request with you before agreeing on the right next steps.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Destination requirements and shipment options vary by product and
              market; details are confirmed for each trade.
            </p>
            <Link
              to="/sourcing-solutions"
              className="mt-6 inline-flex rounded-md bg-[#C47A45] px-5 py-3 text-sm font-bold text-[#1a211d] transition-colors hover:bg-[#d99b6b]"
            >
              Explore sourcing solutions
            </Link>
          </div>
          <ImageFrame
            src="/Images/global-shipping.webp"
            alt="International cargo shipping"
            className="aspect-[16/10] rounded-md border border-white/10"
          />
        </div>
      </section>

      <section
        id="export-process"
        className="scroll-mt-24 bg-[#F7F5EF] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="export-process-title"
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#854a31]">
            How it works
          </p>
          <h2 id="export-process-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A clear path from brief to shipment.
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, description]) => (
              <li key={number} className="border-t-2 border-[#C47A45] bg-white p-5">
                <span className="text-sm font-bold tracking-widest text-[#854a31]">
                  {number}
                </span>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#59655d]">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
