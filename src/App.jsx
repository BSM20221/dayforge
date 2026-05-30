import { useState } from "react";

import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import SearchAndFilter from "./components/SearchAndFilter";
import StatsPanel from "./components/StatsPanel";

import {
  addEntry,
  deleteEntry,
  getEntries,
  updateEntry,
} from "./utils/storage";

function App() {
  const [entries, setEntries] = useState(() => getEntries());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);

  function handleAddEntry(entryData) {
    const newEntry = addEntry(entryData);

    setEntries((currentEntries) => [newEntry, ...currentEntries]);
  }

  function handleStartEdit(entry) {
    setEditingEntry(entry);

    // Move the user back to the form after clicking Edit.
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleUpdateEntry(entryId, updatedData) {
    const updatedEntries = updateEntry(entryId, updatedData);

    setEntries(updatedEntries);
    setEditingEntry(null);
  }

  function handleCancelEdit() {
    setEditingEntry(null);
  }

  function handleDeleteEntry(entryId) {
    const shouldDelete = confirm("Are you sure you want to delete this entry?");

    if (!shouldDelete) {
      return;
    }

    const updatedEntries = deleteEntry(entryId);

    setEntries(updatedEntries);

    if (editingEntry?.id === entryId) {
      setEditingEntry(null);
    }
  }

  const filteredEntries = entries.filter((entry) => {
    const tags = entry.tags || [];

    const searchableText = [
      entry.title,
      entry.mainText,
      entry.lessonLearned,
      entry.challenge,
      entry.improvement,
      entry.germanPractice,
      ...tags,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag ? tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <header className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Personal growth journal
          </p>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            DayForge
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto">
            Forge your life, one day at a time. Reflect on your day, track your
            productivity, and practice German through daily writing.
          </p>
        </header>

        <StatsPanel entries={entries} />

        <EntryForm
          onAddEntry={handleAddEntry}
          editingEntry={editingEntry}
          onUpdateEntry={handleUpdateEntry}
          onCancelEdit={handleCancelEdit}
        />

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
        />

        <EntryList
          entries={filteredEntries}
          onDeleteEntry={handleDeleteEntry}
          onStartEdit={handleStartEdit}
        />
      </div>
    </main>
  );
}

export default App;