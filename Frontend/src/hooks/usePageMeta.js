import { useEffect } from "react";

export default function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    const previousDescription = meta.content;
    meta.content = description;

    return () => {
      document.title = previousTitle;
      if (created) meta.remove();
      else meta.content = previousDescription;
    };
  }, [title, description]);
}
