import { useState } from "react";

const TAG_OPTIONS = [
  "German",
  "Coding",
  "University",
  "Health",
  "Money",
  "Family",
  "Discipline",
];

const MOOD_OPTIONS = ["😄", "🙂", "😐", "😔", "😡", "😰"];

const initialFormData = {
  date: new Date().toISOString().split("T")[0],
  title: "",
  mainText: "",
  lessonLearned: "",
  challenge: "",
  improvement: "",
  mood: "🙂",
  productivityScore: 5,
  tags: [],
  germanPractice: "",
};

function EntryForm({ onAddEntry }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleTagToggle(tag) {
    setFormData((currentData) => {
      const tagAlreadySelected = currentData.tags.includes(tag);

      return {
        ...currentData,
        tags: tagAlreadySelected
          ? currentData.tags.filter((item) => item !== tag)
          : [...currentData.tags, tag],
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.mainText.trim()) {
      alert("Please add at least a title and the main journal text.");
      return;
    }

    onAddEntry({
      ...formData,
      productivityScore: Number(formData.productivityScore),
    });

    setFormData({
      ...initialFormData,
      date: new Date().toISOString().split("T")[0],
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900">Write today&apos;s entry</h2>
        <p className="text-sm text-slate-500 mt-1">
          Reflect, learn, and forge tomorrow.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: A productive coding day"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          What happened today?
        </label>
        <textarea
          name="mainText"
          value={formData.mainText}
          onChange={handleChange}
          rows="5"
          placeholder="Write about your day..."
          className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Lesson learned
          </label>
          <textarea
            name="lessonLearned"
            value={formData.lessonLearned}
            onChange={handleChange}
            rows="3"
            placeholder="What did you learn?"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mistake or challenge
          </label>
          <textarea
            name="challenge"
            value={formData.challenge}
            onChange={handleChange}
            rows="3"
            placeholder="What was difficult?"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Improvement for tomorrow
          </label>
          <textarea
            name="improvement"
            value={formData.improvement}
            onChange={handleChange}
            rows="3"
            placeholder="What will you improve?"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Mood
          </label>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() =>
                  setFormData((currentData) => ({
                    ...currentData,
                    mood,
                  }))
                }
                className={`text-2xl rounded-xl border px-3 py-2 transition ${
                  formData.mood === mood
                    ? "border-slate-900 bg-slate-900"
                    : "border-slate-300 bg-white hover:bg-slate-100"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Productivity score: {formData.productivityScore}/10
          </label>
          <input
            type="range"
            name="productivityScore"
            min="1"
            max="10"
            value={formData.productivityScore}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`rounded-full px-3 py-1 text-sm border transition ${
                formData.tags.includes(tag)
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Mein Tag auf Deutsch 🇩🇪
        </label>
        <textarea
          name="germanPractice"
          value={formData.germanPractice}
          onChange={handleChange}
          rows="4"
          placeholder="Example: Heute habe ich Deutsch gelernt..."
          className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-slate-900 text-white font-semibold py-3 hover:bg-slate-700 transition"
      >
        Save entry
      </button>
    </form>
  );
}

export default EntryForm;