import React from 'react';

const ForumPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Forum</h1>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>How to set up a map for defense?</li>
            <li>Best operator placements for Clubhouse</li>
            <li>Tips for attacking on Oregon</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
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