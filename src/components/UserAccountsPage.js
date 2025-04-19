import React from 'react';
import mapsData from './MapData';

const UserAccountPage = () => {
  // Temporary user data
  const user = {
    username: 'JohnDoe',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder profile picture
  };

  // Generate temporary site setups as user posts
  const userPosts = mapsData.flatMap((map) =>
    map.floors.map((floor, index) => ({
      id: `${map.id}-${index}`,
      map: map.name,
      floor: floor.name,
      title: `${map.name} - ${floor.name}`,
      image: floor.image || map.thumbnail,
    }))
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      {/* Profile Section */}
      <div className="p-4 flex flex-col items-center border-b border-gray-300">
        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold mt-4">{user.username}</h1>
      </div>

      {/* User Posts Feed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {userPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <h2 className="text-sm font-semibold">{post.title}</h2>
              <p className="text-gray-600 text-xs mt-1">
                <strong>Map:</strong> {post.map} | <strong>Floor:</strong> {post.floor}
              </p>
            </div>
          </div>
        ))}

        {/* No Posts Message */}
        {userPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-6 col-span-full">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserAccountPage;