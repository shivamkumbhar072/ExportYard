import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";
import ProductCard from "./ProductCard.jsx";
import ServiceCard from "./ServiceCard.jsx";
import { products, services } from "../data/websiteContent.js";

const companyHighlights = [
  {
    title: "Global sourcing",
    description: "We help clarify requirements and explore suitable supply options.",
    image: "/Images/sourcing.jpg",
  },
  {
    title: "Quality coordination",
    description: "Coordinate product specifications and inspection requirements.",
    image: "/Images/quality-assurance.jpg",
  },
  {
    title: "Reliable logistics",
    description: "Plan export documentation and shipment coordination together.",
    image: "/Images/logistics.jpg",
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
    <div className="bg-white text-[#172536]">
      <section
        id="who-we-are"
        className="scroll-mt-24 px-5 py-14 sm:px-8 lg:px-12 lg:py-20"
        aria-labelledby="who-we-are-title"
      >
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.8fr_1.7fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9c6a11]">
              Who we are
            </p>
            <h2 id="who-we-are-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A practical partner for trade from India.
            </h2>
            <div className="mt-4 h-1 w-14 bg-[#d9a441]" />
            <p className="mt-5 leading-7 text-[#4b5563]">
              ExportYard connects international buyers with Indian suppliers.
              We help bring product requirements, sourcing conversations and
              export coordination together in one place.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex rounded-md bg-[#d9a441] px-5 py-3 text-sm font-bold text-[#071c30] transition hover:bg-[#e8b85d]"
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
        className="scroll-mt-24 bg-[#f5f6f7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="trade-services-title"
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9c6a11]">
            Our core services
          </p>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="trade-services-title" className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Support for the steps behind every trade.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#4b5563]">
                Practical coordination shaped around product, supplier and
                destination requirements.
              </p>
            </div>
            <Link
              to="/services"
              className="self-start text-sm font-bold text-[#8b5e0b] hover:text-[#5d3d06] md:self-auto"
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9c6a11]">
            Product categories
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="product-categories-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Explore sourcing possibilities.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#4b5563]">
                Product availability, specifications and packaging are confirmed
                for each enquiry.
              </p>
            </div>
            <Link
              to="/products"
              className="self-start rounded-md border border-[#071c30]/20 px-4 py-2.5 text-sm font-bold text-[#071c30] hover:border-[#d9a441] hover:bg-[#d9a441]/10 md:self-auto"
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
        className="scroll-mt-24 bg-[#071c30] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="global-markets-title"
      >
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8b85d]">
              Global trade
            </p>
            <h2 id="global-markets-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Connecting product needs with supply from India.
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              Every enquiry starts with the details that matter: product,
              specifications, quantity, packaging and destination. We review
              the request with you before agreeing on the right next steps.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Destination requirements and shipment options vary by product and
              market; details are confirmed for each trade.
            </p>
            <Link
              to="/sourcing-solutions"
              className="mt-6 inline-flex rounded-md bg-[#d9a441] px-5 py-3 text-sm font-bold text-[#071c30] hover:bg-[#e8b85d]"
            >
              Explore sourcing solutions
            </Link>
          </div>
          <ImageFrame
            src="/Images/global-shipping.jpg"
            alt="International cargo shipping"
            className="aspect-[16/10] rounded-md border border-white/10"
          />
        </div>
      </section>

      <section
        id="export-process"
        className="scroll-mt-24 bg-[#f5f6f7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        aria-labelledby="export-process-title"
      >
        <div className="mx-auto max-w-[88rem]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9c6a11]">
            How it works
          </p>
          <h2 id="export-process-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A clear path from brief to shipment.
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, description]) => (
              <li key={number} className="border-t-2 border-[#d9a441] bg-white p-5">
                <span className="text-sm font-bold tracking-widest text-[#9c6a11]">
                  {number}
                </span>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4b5563]">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
