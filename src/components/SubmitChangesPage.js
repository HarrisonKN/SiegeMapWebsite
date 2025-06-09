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
            className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center w-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        className="bg-gray-400 text-white px-4 py-2 rounded justify-center text-center items-center flex"
      >
        Back to Settings
      </Link>

      {/* Progress Section */}
      <div className="w-full max-w-4xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Development Progress</h2>
          <div className="grid gap-8 mb-8">
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="font-semibold text-green-700 text-2xl mb-4 text-center">✅ Completed</h3>
              <ul className="list-disc list-inside text-xl space-y-2 text-center">
                <li>Map selection and floor switching</li>
                <li>Operator drag-and-drop placement</li>
                <li>Annotation tools (lines, shapes, text)</li>
                <li>Downloading site images / uploading site setups</li>
                <li>Dark mode support</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-600 text-2xl mb-4 text-center">🛠️ In Progress</h3>
              <ul className="list-disc list-inside text-xl space-y-2 text-center">
                <li>Operator ability usage tracking</li>
                <li>Getting unique ability images for each operator</li>
                <li>Improved mobile UI</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-700 text-2xl mb-4 text-center">💡 Future Ideas</h3>
              <ul className="list-disc list-inside text-xl space-y-2 text-center">
                <li>Team sharing and collaboration</li>
                <li>Adjusting sizes of things in settings page</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SuggestChangesPage;