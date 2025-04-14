import React from 'react';

const UserAccountPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Account</h1>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <p className="text-gray-600">Name: John Doe</p>
          <p className="text-gray-600">Email: johndoe@example.com</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Commented on a post</li>
            <li>Uploaded a map setup</li>
            <li>Updated profile picture</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-gray-600">Manage your account settings here.</p>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;