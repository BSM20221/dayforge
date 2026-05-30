function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function calculateCurrentStreak(entries) {
  if (entries.length === 0) {
    return 0;
  }

  const entryDates = new Set(
    entries
      .map((entry) => entry.date)
      .filter(Boolean)
  );

  let streak = 0;
  const currentDate = new Date();

  while (entryDates.has(getLocalDateString(currentDate))) {
    streak += 1;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

function StatsPanel({ entries }) {
  const totalEntries = entries.length;

  const averageProductivity =
    totalEntries === 0
      ? 0
      : entries.reduce((sum, entry) => sum + Number(entry.productivityScore || 0), 0) /
        totalEntries;

  const currentStreak = calculateCurrentStreak(entries);

  const germanPracticeCount = entries.filter((entry) =>
    entry.germanPractice?.trim()
  ).length;

  const stats = [
    {
      label: "Total entries",
      value: totalEntries,
      description: "Days recorded",
    },
    {
      label: "Average productivity",
      value: totalEntries === 0 ? "0/10" : `${averageProductivity.toFixed(1)}/10`,
      description: "Your average score",
    },
    {
      label: "Current streak",
      value: `${currentStreak} day${currentStreak === 1 ? "" : "s"}`,
      description: "Consecutive writing days",
    },
    {
      label: "German practice",
      value: germanPracticeCount,
      description: "Entries with German writing",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
        >
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {stat.value}
          </p>
          <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
        </div>
      ))}
    </section>
  );
}

export default StatsPanel;