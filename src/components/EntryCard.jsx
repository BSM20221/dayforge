function EntryCard({ entry, onDeleteEntry }) {
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{formattedDate}</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {entry.title}
          </h3>
        </div>

        <div className="text-3xl" title="Mood">
          {entry.mood}
        </div>
      </div>

      <div className="text-sm text-slate-600">
        Productivity:{" "}
        <span className="font-semibold text-slate-900">
          {entry.productivityScore}/10
        </span>
      </div>

      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <section>
        <h4 className="text-sm font-semibold text-slate-900">
          What happened today?
        </h4>
        <p className="text-slate-700 mt-1 whitespace-pre-line">
          {entry.mainText}
        </p>
      </section>

      {entry.lessonLearned && (
        <section>
          <h4 className="text-sm font-semibold text-slate-900">
            Lesson learned
          </h4>
          <p className="text-slate-700 mt-1 whitespace-pre-line">
            {entry.lessonLearned}
          </p>
        </section>
      )}

      {entry.challenge && (
        <section>
          <h4 className="text-sm font-semibold text-slate-900">
            Mistake or challenge
          </h4>
          <p className="text-slate-700 mt-1 whitespace-pre-line">
            {entry.challenge}
          </p>
        </section>
      )}

      {entry.improvement && (
        <section>
          <h4 className="text-sm font-semibold text-slate-900">
            Improvement for tomorrow
          </h4>
          <p className="text-slate-700 mt-1 whitespace-pre-line">
            {entry.improvement}
          </p>
        </section>
      )}

      {entry.germanPractice && (
        <section className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <h4 className="text-sm font-semibold text-slate-900">
            Mein Tag auf Deutsch 🇩🇪
          </h4>
          <p className="text-slate-700 mt-1 whitespace-pre-line">
            {entry.germanPractice}
          </p>
        </section>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => onDeleteEntry(entry.id)}
          className="rounded-xl border border-red-200 text-red-600 px-4 py-2 text-sm font-medium hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default EntryCard;