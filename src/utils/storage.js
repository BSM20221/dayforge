const STORAGE_KEY = "dayforge_entries";

/**
 * Get all journal entries from localStorage.
 * If there are no entries yet, return an empty array.
 */
export function getEntries() {
  try {
    const savedEntries = localStorage.getItem(STORAGE_KEY);

    if (!savedEntries) {
      return [];
    }

    return JSON.parse(savedEntries);
  } catch (error) {
    console.error("Failed to load entries from localStorage:", error);
    return [];
  }
}

/**
 * Save all journal entries to localStorage.
 */
export function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save entries to localStorage:", error);
  }
}

/**
 * Add a new journal entry.
 */
export function addEntry(entry) {
  const entries = getEntries();

  const newEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedEntries = [newEntry, ...entries];

  saveEntries(updatedEntries);

  return newEntry;
}

/**
 * Update an existing journal entry.
 */
export function updateEntry(entryId, updatedData) {
  const entries = getEntries();

  const updatedEntries = entries.map((entry) => {
    if (entry.id === entryId) {
      return {
        ...entry,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
    }

    return entry;
  });

  saveEntries(updatedEntries);

  return updatedEntries;
}

/**
 * Delete a journal entry.
 */
export function deleteEntry(entryId) {
  const entries = getEntries();

  const updatedEntries = entries.filter((entry) => entry.id !== entryId);

  saveEntries(updatedEntries);

  return updatedEntries;
}

/**
 * Delete all entries.
 * Useful for testing, but use carefully.
 */
export function clearEntries() {
  localStorage.removeItem(STORAGE_KEY);
}