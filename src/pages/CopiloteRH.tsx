
import React, { useState } from 'react';
import TopBarControls from '@/components/todo/TopBarControls';
import RecruiterTaskCard from '@/components/todo/RecruiterTaskCard';
import TaskFilterSidebar from '@/components/todo/TaskFilterSidebar';

interface Task {
  id: string;
  title: string;
  candidateName: string;
  tags: Array<{
    label: string;
    color: string;
  }>;
  assignees: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  priority: boolean;
  dueDate?: string;
  isCompleted: boolean;
  category: string;
}

const CopiloteRH = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('deadline');
  const [activeFilter, setActiveFilter] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finaliser entretien technique avec le candidat',
      candidateName: 'Sarah Martin',
      tags: [
        { label: 'Entretien', color: 'red' },
        { label: 'Technique', color: 'blue' },
      ],
      assignees: [
        { id: '1', name: 'Julie Laurent', avatar: '/placeholder.svg' },
        { id: '2', name: 'Marc Dubois', avatar: '/placeholder.svg' },
        { id: '3', name: 'Clara Petit', avatar: '/placeholder.svg' },
        { id: '4', name: 'Tom Wilson', avatar: '/placeholder.svg' },
      ],
      priority: false,
      dueDate: 'Aujourd\'hui',
      isCompleted: false,
      category: 'myTasks',
    },
    {
      id: '2',
      title: 'Préparer feedback manager pour Clara Dubois',
      candidateName: 'Clara Dubois',
      tags: [
        { label: 'Feedback', color: 'orange' },
        { label: 'Manager', color: 'purple' },
      ],
      assignees: [
        { id: '1', name: 'Julie Laurent', avatar: '/placeholder.svg' },
        { id: '2', name: 'Marc Dubois', avatar: '/placeholder.svg' },
        { id: '3', name: 'Clara Petit', avatar: '/placeholder.svg' },
      ],
      priority: true,
      dueDate: 'Demain',
      isCompleted: false,
      category: 'favorites',
    },
    {
      id: '3',
      title: 'Relancer Victor pour documents manquants',
      candidateName: 'Victor Martin',
      tags: [
        { label: 'Documents', color: 'teal' },
        { label: 'Relance', color: 'yellow' },
      ],
      assignees: [
        { id: '1', name: 'Julie Laurent', avatar: '/placeholder.svg' },
        { id: '2', name: 'Marc Dubois', avatar: '/placeholder.svg' },
      ],
      priority: false,
      dueDate: 'Cette semaine',
      isCompleted: false,
      category: 'myTasks',
    },
    {
      id: '4',
      title: 'Programmer entretien RH avec candidat freelance',
      candidateName: 'Alex Johnson',
      tags: [
        { label: 'Freelance', color: 'green' },
        { label: 'RH', color: 'blue' },
      ],
      assignees: [
        { id: '1', name: 'Julie Laurent', avatar: '/placeholder.svg' },
      ],
      priority: false,
      isCompleted: true,
      category: 'done',
    },
    {
      id: '5',
      title: 'Validation finale dossier candidature',
      candidateName: 'Marie Rousseau',
      tags: [
        { label: 'Validation', color: 'purple' },
        { label: 'Final', color: 'pink' },
      ],
      assignees: [
        { id: '1', name: 'Julie Laurent', avatar: '/placeholder.svg' },
        { id: '2', name: 'Marc Dubois', avatar: '/placeholder.svg' },
      ],
      priority: true,
      isCompleted: false,
      category: 'favorites',
    },
  ]);

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isCompleted: true, category: 'done' } : task
    ));
  };

  const handleTogglePriority = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, priority: !task.priority } : task
    ));
  };

  const handleEditTask = (taskId: string) => {
    console.log('Edit task:', taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, category: 'deleted' } : task
    ));
  };

  const handleAddTask = () => {
    console.log('Add new task');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || task.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const taskCounts = {
    all: tasks.length,
    myTasks: tasks.filter(task => task.category === 'myTasks').length,
    favorites: tasks.filter(task => task.category === 'favorites').length,
    done: tasks.filter(task => task.category === 'done').length,
    deleted: tasks.filter(task => task.category === 'deleted').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <div className="flex-1 flex flex-col">
        <TopBarControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          orderBy={orderBy}
          onOrderByChange={setOrderBy}
          onAddTask={handleAddTask}
          notificationCount={2}
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredTasks.map((task) => (
              <RecruiterTaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                candidateName={task.candidateName}
                tags={task.tags}
                assignees={task.assignees}
                priority={task.priority}
                dueDate={task.dueDate}
                isCompleted={task.isCompleted}
                onComplete={handleCompleteTask}
                onTogglePriority={handleTogglePriority}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">
                  Aucune tâche trouvée
                </div>
                <p className="text-gray-500 mt-2">
                  Essayez de modifier vos filtres ou ajoutez une nouvelle tâche
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <TaskFilterSidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        taskCounts={taskCounts}
      />
    </div>
  );
};

export default CopiloteRH;
