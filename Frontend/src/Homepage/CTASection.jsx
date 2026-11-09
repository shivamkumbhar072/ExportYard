import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection({
  eyebrow = "Start a conversation",
  title = "Ready to source from India?",
  description = "Share your requirements and our team will be in touch to discuss the next steps.",
}) {
  return (
    <section className="bg-[#071c30] px-5 py-16 text-white sm:px-8 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8b85d]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 leading-7 text-white/70">{description}</p>
        </div>
        <Link
          to="/enquiry"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[#d9a441] px-5 py-3 text-sm font-bold text-[#071c30] hover:bg-[#e8b85d] md:self-auto"
        >
          Get a Quote <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
