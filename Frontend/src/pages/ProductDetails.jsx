import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CTASection from "../Homepage/CTASection.jsx";
import ImageFrame from "../Homepage/ImageFrame.jsx";
import PageHero from "../components/PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { products } from "../data/websiteContent.js";

export default function ProductDetails() {
  const { slug } = useParams();
  const product = useMemo(
    () =>
      products.find(
        (item) =>
          item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ===
          slug
      ),
    [slug]
  );

  usePageMeta(
    product ? `${product.title} | ExportYard` : "Product not found | ExportYard",
    product
      ? `Explore ${product.title} sourcing requirements with ExportYard.`
      : "The requested product category could not be found."
  );

  if (!product) {
    return (
      <main className="min-h-[60vh] bg-white px-5 pb-16 pt-36 text-[#172536]">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Link className="mt-5 inline-flex text-sm font-bold text-[#8b5e0b]" to="/products">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-[#172536]">
      <PageHero eyebrow={product.category} title={product.title} description={product.description} />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-2 lg:items-start">
          <ImageFrame src={product.image} alt={product.title} className="aspect-[4/3] rounded-md" />
          <div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b5e0b]">
              <ArrowLeft size={16} /> All products
            </Link>
            <h2 className="mt-5 text-2xl font-bold">Discuss your requirements</h2>
            <p className="mt-3 leading-7 text-[#4b5563]">
              Product specifications, grades, available packaging, order
              quantities and destination requirements are confirmed for each
              enquiry. Share the details you have and our team can discuss next
              steps with you.
            </p>
            <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {[
                ["Specifications", "To be discussed for your enquiry"],
                ["Packaging", "Options confirmed based on product and supplier"],
                ["Order quantity", "Discussed and confirmed per order"],
                ["Destination requirements", "Reviewed for the destination and shipment"],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="text-sm font-semibold">{label}</dt>
                  <dd className="text-sm text-[#4b5563]">{value}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/enquiry"
              state={{ draft: { productName: product.title } }}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#d9a441] px-5 py-3 text-sm font-bold text-[#071c30] hover:bg-[#e8b85d]"
            >
              Request a Quote <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <CTASection title={`Enquire about ${product.title}`} />
    </main>
  );
}
