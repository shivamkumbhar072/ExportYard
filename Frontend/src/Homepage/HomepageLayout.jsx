import Hero from "./Hero.jsx";
import Products from "./Products.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

const HomepageLayout = () => {
  usePageMeta(
    "ExportYard | Global Sourcing and Exports from India",
    "Connect with ExportYard for product sourcing, supplier coordination and export support from India."
  );

  return (
    <>
      <Hero />
      <Products />
    </>
  );
};

export default HomepageLayout;