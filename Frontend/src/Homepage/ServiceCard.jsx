export default function ServiceCard({ icon: Icon, title, description, number }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#C47A45]/10 text-[#854a31]">
          <Icon size={21} strokeWidth={1.7} />
        </span>
        {number && (
          <span className="text-xs font-semibold tracking-widest text-slate-400">
            {number}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#252b27]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#59655d]">{description}</p>
    </article>
  );
}
