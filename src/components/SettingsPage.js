import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkMode";

const SettingsPage = () => {

  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // Example settings state (expand as needed)
  const [toolLayout, setToolLayout] = React.useState("horizontal");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {/* <div className="mb-6">
        <label className="block font-semibold mb-1">Tool Layout</label>
        <select
          className="w-full p-2 border rounded"
          value={toolLayout}
          onChange={e => setToolLayout(e.target.value)}
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div> */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Dark Mode</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={e => setDarkMode(e.target.checked)}
        />{" "}
        Enable dark mode
      </div>
      {/* Add more settings here */}
      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/suggest-changes")}
        >
          Suggest Changes
        </button>
        <Link
          to="/"
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Back to Map
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;