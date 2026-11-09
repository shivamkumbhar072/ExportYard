export default function ServiceCard({ icon: Icon, title, description, number }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#d9a441]/10 text-[#9c6a11]">
          <Icon size={21} strokeWidth={1.7} />
        </span>
        {number && (
          <span className="text-xs font-semibold tracking-widest text-slate-400">
            {number}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#172536]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#4b5563]">{description}</p>
    </article>
  );
}
