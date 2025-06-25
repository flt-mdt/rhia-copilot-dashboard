
import React, { useState, useMemo } from 'react';
import TopBarControls from '@/components/todo/TopBarControls';
import RecruiterTaskCard from '@/components/todo/RecruiterTaskCard';
import TaskFilterSidebar from '@/components/todo/TaskFilterSidebar';
import CreateTaskDialog from '@/components/todo/CreateTaskDialog';
import { useRecruiterTasks } from '@/hooks/useRecruiterTasks';
import { Loader2 } from 'lucide-react';

const CopiloteRH = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('custom_order');
  const [activeFilter, setActiveFilter] = useState('all');

  const {
    tasks,
    tags,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleTaskPriority,
    toggleTaskFavorite,
    reorderTasks
  } = useRecruiterTasks();

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.candidate_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      switch (activeFilter) {
        case 'myTasks':
          matchesFilter = !task.is_completed && !task.is_deleted;
          break;
        case 'favorites':
          matchesFilter = task.is_favorite && !task.is_deleted;
          break;
        case 'done':
          matchesFilter = task.is_completed && !task.is_deleted;
          break;
        case 'deleted':
          matchesFilter = task.is_deleted;
          break;
        default:
          matchesFilter = !task.is_deleted;
      }
      
      return matchesSearch && matchesFilter;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (orderBy) {
        case 'deadline':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'priority':
          if (a.priority === b.priority) return 0;
          return a.priority ? -1 : 1;
        case 'candidate':
          return a.candidate_name.localeCompare(b.candidate_name);
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default: // custom_order
          return a.custom_order - b.custom_order;
      }
    });

    return filtered;
  }, [tasks, searchTerm, activeFilter, orderBy]);

  // Task counts for sidebar
  const taskCounts = useMemo(() => ({
    all: tasks.filter(t => !t.is_deleted).length,
    myTasks: tasks.filter(t => !t.is_completed && !t.is_deleted).length,
    favorites: tasks.filter(t => t.is_favorite && !t.is_deleted).length,
    done: tasks.filter(t => t.is_completed && !t.is_deleted).length,
    deleted: tasks.filter(t => t.is_deleted).length,
  }), [tasks]);

  const handleCreateTask = async (taskData: {
    title: string;
    description?: string;
    candidate_name: string;
    priority: boolean;
    due_date?: string;
    selectedTags: string[];
  }) => {
    try {
      await createTask(taskData);
      console.log('Task created successfully');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleEditTask = (taskId: string) => {
    console.log('Edit task:', taskId);
    // TODO: Implement edit dialog
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement des tâches...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <div className="flex-1 flex flex-col">
        <TopBarControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          orderBy={orderBy}
          onOrderByChange={setOrderBy}
          onAddTask={() => {}} // Not used, handled by CreateTaskDialog
          notificationCount={taskCounts.myTasks}
          customAddButton={
            <CreateTaskDialog
              tags={tags}
              onCreateTask={handleCreateTask}
            />
          }
        />
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredAndSortedTasks.map((task) => (
              <RecruiterTaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                candidateName={task.candidate_name}
                tags={task.tags?.map(tag => ({
                  label: tag.name,
                  color: tag.color
                })) || []}
                assignees={task.assignees || []}
                priority={task.priority}
                dueDate={task.due_date ? new Date(task.due_date).toLocaleDateString('fr-FR') : undefined}
                isCompleted={task.is_completed}
                onComplete={toggleTaskCompletion}
                onTogglePriority={toggleTaskPriority}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
            
            {filteredAndSortedTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">
                  Aucune tâche trouvée
                </div>
                <p className="text-gray-500 mt-2">
                  {searchTerm ? 'Essayez de modifier votre recherche' : 'Créez votre première tâche pour commencer'}
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
