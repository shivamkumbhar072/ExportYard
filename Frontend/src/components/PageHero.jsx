import ImageFrame from "../Homepage/ImageFrame.jsx";

export default function PageHero({ eyebrow, title, description, image }) {
  return (
    <header className="relative isolate overflow-hidden bg-[#183F35] px-5 pb-16 pt-36 text-white sm:px-8 sm:pb-20 lg:px-12">
      {image && (
        <>
          <ImageFrame src={image} alt="" className="absolute inset-0 -z-20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102b24]/95 via-[#183F35]/85 to-[#183F35]/60" />
        </>
      )}
      <div className="mx-auto max-w-[88rem]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5ae83]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
