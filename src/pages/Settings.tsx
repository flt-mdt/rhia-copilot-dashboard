
import React from 'react';
import Header from '@/components/layout/Header';

const Settings = () => {
  return (
    <div className="ml-64 p-8">
      <Header title="Settings" />
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-medium mb-4">Account Settings</h2>
        <p className="text-gray-500">This page will allow users to manage their account settings and preferences.</p>
      </div>
    </div>
  );
};

export default Settings;
