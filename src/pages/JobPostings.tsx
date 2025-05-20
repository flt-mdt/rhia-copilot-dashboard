
import React from 'react';
import Header from '@/components/layout/Header';

const JobPostings = () => {
  return (
    <div className="ml-64 p-8">
      <Header title="Job Postings" />
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-medium mb-4">Job Postings List</h2>
        <p className="text-gray-500">This page will display all active and past job postings.</p>
      </div>
    </div>
  );
};

export default JobPostings;
