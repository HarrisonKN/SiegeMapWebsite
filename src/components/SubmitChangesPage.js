import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // adjust path if needed

const SuggestChangesPage = () => {
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    // Insert suggestion into Supabase
    const { error } = await supabase
      .from("suggestions")
      .insert([{ suggestion }]);
    if (error) {
      setError(error.message || "Failed to submit suggestion. Please try again.");
      return;
    }
    setSubmitted(true);
    setSuggestion("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Suggest Changes</h1>
      {submitted ? (
        <div className="mb-4 text-green-700 font-semibold">
          Thank you for your suggestion!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2 font-semibold">
            What would you like to see improved or added?
          </label>
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={6}
            value={suggestion}
            onChange={e => setSuggestion(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Suggestion
          </button>
          {error && (
            <div className="text-red-600 mt-2">{error}</div>
          )}
        </form>
      )}
      <Link
        to="/settingsPage"
        className="bg-gray-400 text-white px-4 py-2 rounded"
      >
        Back to Settings
      </Link>
    </div>
  );
};

export default SuggestChangesPage;