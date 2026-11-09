import Hero from "./Hero.jsx";
import Products from "./Products.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

const HomepageLayout = () => {
  usePageMeta(
    "ExportYard | Source Quality Products from India",
    "Find Indian suppliers for spices, rice, minerals and more. ExportYard helps international buyers clarify product needs and coordinate sourcing, export documents and shipping."
  );

  return (
    <>
      <Hero />
      <Products />
    </>
  );
};

export default HomepageLayout;