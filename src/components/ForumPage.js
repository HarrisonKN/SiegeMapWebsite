import React, { useState } from 'react';
import mapsData from './MapData';

const ForumPage = () => {
  const [filter, setFilter] = useState('');

  // Generate site setups dynamically from mapsData
  const siteSetups = mapsData.flatMap((map) =>
    map.floors.map((floor, index) => ({
      id: `${map.id}-${index}`, // Unique ID for each setup
      map: map.name,
      floor: floor.name,
      title: `${map.name} - ${floor.name}`,
      description: `Explore strategies for ${floor.name} on ${map.name}.`,
      image: floor.image || map.thumbnail, // Use floor image or fallback to map thumbnail
    }))
  );

  // Filtered setups based on the filter state
  const filteredSetups = siteSetups.filter((setup) => {
    const filterText = filter.toLowerCase();
    return (
      setup.map.toLowerCase().includes(filterText) || // Match map name
      setup.floor.toLowerCase().includes(filterText) || // Match floor name
      setup.title.toLowerCase().includes(filterText) // Match title
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Site Setups</h1>

      {/* Filter Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by map, floor, or title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Site Setups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSetups.map((setup) => (
          <div key={setup.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={setup.image}
              alt={setup.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{setup.title}</h2>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Map:</strong> {setup.map} | <strong>Floor:</strong> {setup.floor}
              </p>
              <p className="text-gray-600 text-sm mt-2">{setup.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredSetups.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No site setups found. Try adjusting your filter.</p>
      )}

      {/* Forum Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Forum</h1>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>How to set up a map for defense?</li>
            <li>Best operator placements for Clubhouse</li>
            <li>Tips for attacking on Oregon</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Popular Discussions</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Best strategies for ranked games</li>
            <li>How to counter roamers effectively</li>
            <li>Favorite maps and why</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;