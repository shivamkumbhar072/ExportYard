import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

export default function ProductCard({ title, description, image }) {
  return (
    <article className="overflow-hidden rounded-md border border-slate-200 bg-white">
      <ImageFrame src={image} alt={title} className="aspect-[4/3]" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#172536]">{title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-[#4b5563]">
          {description}
        </p>
        <Link
          to={`/products/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#8b5e0b] hover:underline"
        >
          Explore product <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
