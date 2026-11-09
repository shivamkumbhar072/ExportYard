import { ArrowUpRight, Boxes, FileCheck2, Globe2, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

const pathways = [
  {
    title: "For buyers",
    description:
      "Tell us what you want to source, the specifications that matter and where you need it delivered.",
    points: ["Product and quality requirements", "Quantity and target timeline", "Destination or delivery details"],
    icon: PackageSearch,
  },
  {
    title: "For suppliers",
    description:
      "Introduce the products you offer, your capabilities and the countries or markets you serve.",
    points: ["Product range and specifications", "Supply capacity and origin", "Export and certification details"],
    icon: Boxes,
  },
];

const services = [
  {
    title: "Product sourcing",
    description: "Understand requirements and identify suitable supply opportunities.",
    icon: PackageSearch,
  },
  {
    title: "Trade coordination",
    description: "Keep buyers and suppliers aligned on specifications and next steps.",
    icon: Globe2,
  },
  {
    title: "Export documentation",
    description: "Coordinate the documentation and shipment details agreed for each trade.",
    icon: FileCheck2,
  },
];

export default function Products() {
  return (
    <section
      id="trade-services"
      className="scroll-mt-20 border-t border-[#38bdd0]/15 bg-[#08111d] px-4 py-20 text-white sm:px-6 lg:py-28"
      aria-labelledby="trade-services-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#72d3df]">
          Buyers · Suppliers · Trade
        </p>
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="trade-services-title"
              className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              A clearer way to start an international trade conversation.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              One enquiry works for both sides of the market. Tell us what you
              need or what you supply, and we’ll help establish whether there’s
              a fit.
            </p>
          </div>
          <Link
            to="/enquiry"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#ffc58f] px-6 py-3 text-sm font-semibold text-[#10222e] transition hover:-translate-y-0.5 hover:bg-[#ffd7b0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffd9a0] md:self-auto"
          >
            Start an enquiry
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {pathways.map(({ title, description, points, icon: Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#38bdd0]/10 text-[#72d3df]">
                <Icon size={23} />
              </span>
              <h3 className="mt-5 text-2xl font-bold">{title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-white/70">{description}</p>
              <ul className="mt-5 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffc58f]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <h3 className="text-xl font-bold">From first brief to next steps</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0a1628] p-5"
              >
                <div className="flex items-center justify-between">
                  <Icon className="text-[#72d3df]" size={21} />
                  <span className="text-xs font-bold tracking-[0.15em] text-white/40">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="mt-4 font-semibold">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
