import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[670px] items-center bg-[#183F35] py-28 text-white sm:min-h-[640px] sm:py-32">
      <ImageFrame
        src="/Images/hero-port-optimized.webp"
        alt=""
        className="absolute inset-0 -z-20"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102b24]/95 via-[#183F35]/78 to-[#183F35]/25" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e5ae83]">
            ExportYard · India
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Source products from India.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            We help international buyers connect with Indian suppliers and
            coordinate product requirements, export documents and shipping.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[#C47A45] px-5 py-3 text-sm font-bold text-[#1a211d] transition-colors hover:bg-[#d99b6b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Our Products <ArrowRight size={17} />
            </Link>
            <Link
              to="/enquiry"
              className="inline-flex items-center rounded-md border border-white/60 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-[#e5ae83] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5ae83]"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
