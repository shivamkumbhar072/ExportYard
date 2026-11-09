import { useMemo, useState } from "react";
import ProductCard from "../Homepage/ProductCard.jsx";
import CTASection from "../Homepage/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { products } from "../data/websiteContent.js";

const categories = ["All categories", ...new Set(products.map((product) => product.category))];

export default function ProductCatalog() {
  usePageMeta(
    "Products | ExportYard",
    "Explore product categories available for sourcing enquiries through ExportYard."
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === categories[0] || product.category === category;
      const matchesQuery =
        !search ||
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="bg-white text-[#172536]">
      <PageHero
        eyebrow="Our products"
        title="Explore sourcing categories."
        description="Browse the categories and share your product, specification and packaging requirements with our team."
      />
      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[88rem]">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search product categories"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#d9a441] focus:ring-2 focus:ring-[#d9a441]/20"
              />
            </label>
            <label>
              <span className="sr-only">Filter product category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#d9a441] focus:ring-2 focus:ring-[#d9a441]/20 sm:min-w-56"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="mt-4 text-sm text-[#4b5563]" aria-live="polite">
            {filteredProducts.length} product categories
          </p>
          {filteredProducts.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-md bg-[#f5f6f7] p-6 text-sm text-[#4b5563]">
              No categories match your search. Try another term or send us a
              custom product enquiry.
            </p>
          )}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
