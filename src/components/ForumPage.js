import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ForumPage = ({handleLoadSetup}) => {
  const [filter, setFilter] = useState('');
  const [forumSetups, setForumSetups] = useState([]);

  useEffect(() => {
    supabase
      .from('site_setups')
      .select('*')
      .eq('is_posted', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setForumSetups(data);
      });
  }, []);

  // Filtered setups based on the filter state
  const filteredSetups = forumSetups.filter((setup) => {
    const filterText = filter.toLowerCase();
    return (
      (setup.map_name && setup.map_name.toLowerCase().includes(filterText)) ||
      (setup.floor_name && setup.floor_name.toLowerCase().includes(filterText)) ||
      (setup.title && setup.title.toLowerCase().includes(filterText))
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
          <div key={setup.id} 
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:ring-2 ring-blue-400 transition"
            onClick={() => handleLoadSetup(setup)}>
            
            {setup.image && (
              <img
                src={setup.image}
                alt={setup.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{setup.title || 'Untitled'}</h2>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Map:</strong> {setup.map_name} | <strong>Floor:</strong> {setup.floor_name}
              </p>
              {setup.description && (
                <p className="text-gray-600 text-sm mt-2">{setup.description}</p>
              )}
              {setup.username && (
                <p className="text-gray-500 text-xs mt-2">Posted by: {setup.username}</p>
              )}
              {setup.created_at && (() => {
                const d = new Date(setup.created_at);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                return (
                  <p className="text-gray-500 text-xs mt-2">
                    {`${day}/${month}/${year} ${hours}:${minutes}`}
                  </p>
                );
              })()}
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