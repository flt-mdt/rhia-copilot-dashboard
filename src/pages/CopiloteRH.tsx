
import React, { useState } from 'react';
import Header from '@/components/copilote/Header';
import FilterBar from '@/components/copilote/FilterBar';
import TaskList from '@/components/copilote/TaskList';
import RecurringTasks from '@/components/copilote/RecurringTasks';
import SmartSuggestionsAI from '@/components/copilote/SmartSuggestionsAI';
import Employee360 from '@/components/copilote/Employee360';
import FocusMode from '@/components/copilote/FocusMode';
import CompletedTasks from '@/components/copilote/CompletedTasks';

const CopiloteRH = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [filters, setFilters] = useState({
    period: 'today',
    employee: '',
    search: ''
  });

  if (focusMode) {
    return (
      <div className="min-h-screen bg-cream">
        <Header 
          focusMode={focusMode} 
          onToggleFocus={() => setFocusMode(!focusMode)} 
        />
        <FocusMode onExit={() => setFocusMode(false)} />
      </div>
    );
  }

  return (
    <div className="transition-all duration-300 ease-in-out bg-cream min-h-screen"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <Header 
        focusMode={focusMode} 
        onToggleFocus={() => setFocusMode(!focusMode)} 
      />
      
      <FilterBar filters={filters} onFiltersChange={setFilters} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <TaskList title="Tâches prioritaires du jour" />
            <RecurringTasks />
          </div>
          
          <div className="space-y-8">
            <SmartSuggestionsAI />
            <Employee360 />
          </div>
        </div>
        
        <CompletedTasks />
      </div>
    </div>
  );
};

export default CopiloteRH;
