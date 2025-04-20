import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import mapsData from './MapData';


const UserAccountPage = ({handleLoadSetup}) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [setups, setSetups] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalSetup, setModalSetup] = useState(null);
  const [form, setForm] = useState({ title: '', description: '' });

  const openPostModal = (setup) => {
    // Find the map and floor objects
    const mapObj = mapsData.find(m => m.name === setup.map_name);
    const floorObj = mapObj?.floors.find(f => f.name === setup.floor_name);
  
    setModalSetup({
      ...setup,
      image: floorObj?.image || mapObj?.thumbnail // Always set the image for posting
    });
    setForm({
      title: setup.title || '',
      description: setup.description || ''
    });
    setShowModal(true);
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitToForum = async () => {
    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }
    const { error } = await supabase.from('site_setups').update(
      {
        user_id: user.id,
        map_name: modalSetup.map_name,
        floor_name: modalSetup.floor_name,
        title: form.title,
        description: form.description,
        data: modalSetup.data,
        username: user?.user_metadata?.username || user?.email || 'Unknown',
        is_posted: true,
        image :modalSetup.image || modalSetup.thumbnail
      }
    ).eq('id', modalSetup.id);
    if (!error) {
      alert('Posted to forum!');
      setShowModal(false);
    } else {
      alert('Failed to post.');
    }
  };

  useEffect(() => {
    if (user?.id) {
      supabase
        .from('site_setups')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          console.log('Fetched setups:', data, error);
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
    <div className="flex flex-col w-full h-full bg-gray-100 overflow-y-auto">
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
      <div className="flex-1 bg-gray-800 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
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
              {setups.map((setup) => {
                // Find the map and floor objects for each setup
                const mapObj = mapsData.find(m => m.name === setup.map_name);
                const floorObj = mapObj?.floors.find(f => f.name === setup.floor_name);
                const imageUrl = setup.image || floorObj?.image || mapObj?.thumbnail;

                return (
                  <div
                    key={setup.id}
                    className="bg-gray-300 rounded-lg h-50 flex flex-col items-center justify-center text-gray-800 cursor-pointer hover:bg-gray-400 transition p-4"
                    onClick={() => handleLoadSetup(setup)}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={setup.title || 'Setup thumbnail'}
                        className="w-full h-16 object-cover rounded mb-2"
                      />
                    )}
                    <div className="font-bold">{setup.title || 'Untitled'}</div>
                    <div className="text-xs">{setup.map_name} - {setup.floor_name}</div>
                    <div className="text-xs text-gray-600 mt-2">{new Date(setup.created_at).toLocaleString()}</div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-4 w-full"
                      onClick={e => {
                        e.stopPropagation();
                        openPostModal(setup);
                      }}
                    >
                      Post to Forum
                    </button>
                  </div>
                );
              })}
                  {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div
                        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
                        onClick={e => e.stopPropagation()} // Prevent modal click from bubbling
                      >
                        <h2 className="text-xl font-bold mb-4">Post Setup to Forum</h2>
                        <label className="block mb-2 font-semibold">Title</label>
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleFormChange}
                          className="w-full p-2 border rounded mb-4"
                          placeholder="Enter a title for your setup"
                        />
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleFormChange}
                          className="w-full p-2 border rounded mb-4"
                          placeholder="Describe your setup (optional)"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            className="bg-gray-300 px-4 py-2 rounded"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={submitToForum}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              <div className="bg-green-400 rounded-lg h-50 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-green-500 transition">
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