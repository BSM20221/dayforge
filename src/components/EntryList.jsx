import EntryCard from "./EntryCard";

function EntryList({ entries, onDeleteEntry }) {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">No entries yet</h2>
        <p className="text-slate-500 mt-2">
          Write your first DayForge entry above. Small daily reflections become big life data.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Your entries</h2>
        <p className="text-sm text-slate-500 mt-1">
          Review your previous days and notice your patterns.
        </p>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onDeleteEntry={onDeleteEntry}
          />
        ))}
      </div>
    </section>
  );
}

export default EntryList;