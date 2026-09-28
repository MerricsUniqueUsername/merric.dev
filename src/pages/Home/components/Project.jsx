export default function Project({ image, title, technologies, description }) {
  return (
    <article className="group flex flex-col sm:flex-row gap-6 py-10 first:pt-0 border-b border-slate-800/70 last:border-b-0">

      {/* Image */}
      <div className="shrink-0 w-full sm:w-56 aspect-video sm:aspect-square rounded-lg overflow-hidden border border-slate-700/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-neutral-100 text-2xl font-[Georgia]">{title}</h3>

        {technologies && (
          <div className="flex flex-wrap items-center gap-3">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                title={tech.name}
                className="flex items-center opacity-80 hover:opacity-100 transition-opacity"
              >
                {tech.icon}
              </span>
            ))}
          </div>
        )}

        <p className="text-slate-400 leading-relaxed max-w-prose">{description}</p>
      </div>
    </article>
  )
}