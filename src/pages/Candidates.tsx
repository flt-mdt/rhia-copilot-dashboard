
import React from 'react';
import Header from '@/components/layout/Header';

const Candidates = () => {
  return (
    <div className="ml-64 p-8">
      <Header title="Candidates" />
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-medium mb-4">Candidates List</h2>
        <p className="text-gray-500">This page will display all candidates and their applications.</p>
      </div>
    </div>
  );
};

export default Candidates;
