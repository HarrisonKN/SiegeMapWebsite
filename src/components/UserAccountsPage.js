import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const UserAccountPage = ({handleLoadSetup}) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [setups, setSetups] = useState([]);

  useEffect(() => {
    if (user?.id) {
      supabase
        .from('site_setups')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          console.log('Fetched setups:', data, error); // <-- Add this line
          setSetups(data || []);
        });
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-100">
      <div className="p-4 flex flex-col items-center border-b border-gray-300">
        <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center overflow-hidden">
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={`${user.email}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl text-white font-bold">
              {user?.user_metadata?.username?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                "U"}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold mt-4">
          {user?.user_metadata?.username || "No username"}
        </h1>
        <h2 className="text-xl text-gray-700">{user?.email || "No user"}</h2>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Saved Setups */}
      <div className="flex-1 bg-gray-800 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {setups.length === 0 ? (
            // No setups: show 6 placeholders
            [...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-300 rounded-lg h-32 flex items-center justify-center text-gray-500 shimmer-tile"
              >
                No Setup
              </div>
            ))
          ) : (
            // Show all setups, then a "Keep Making More" tile
            <>
              {setups.map((setup) => (
                <div
                  key={setup.id}
                  className="bg-gray-300 rounded-lg h-32 flex flex-col items-center justify-center text-gray-800 cursor-pointer hover:bg-gray-400 transition"
                  onClick={() => handleLoadSetup(setup)}
                >
                  <div className="font-bold">{setup.title || 'Untitled'}</div>
                  <div className="text-xs">{setup.map_name} - {setup.floor_name}</div>
                  <div className="text-xs text-gray-600 mt-2">{new Date(setup.created_at).toLocaleString()}</div>
                </div>
              ))}
              <div className="bg-green-400 rounded-lg h-32 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-green-500 transition">
                Keep Making More
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;