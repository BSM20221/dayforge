const TAG_OPTIONS = [
  "German",
  "Coding",
  "University",
  "Health",
  "Money",
  "Family",
  "Discipline",
];

function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagChange,
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Search and filter</h2>
        <p className="text-sm text-slate-500 mt-1">
          Find old entries by title, text, German practice, or tag.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search your journal..."
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Filter by tag
          </label>
          <select
            value={selectedTag}
            onChange={(event) => onTagChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="">All tags</option>

            {TAG_OPTIONS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(searchTerm || selectedTag) && (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            onTagChange("");
          }}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
        >
          Clear search and filter
        </button>
      )}
    </section>
  );
}

export default SearchAndFilter;