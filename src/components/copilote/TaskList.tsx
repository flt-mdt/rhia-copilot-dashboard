
import React, { useState } from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  employee: string;
  avatar: string;
  tags: string[];
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  hasComments: boolean;
  completed: boolean;
}

interface TaskListProps {
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ title }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Valider la période d\'essai de Victor Martin',
      employee: 'Victor Martin',
      avatar: '/placeholder.svg',
      tags: ['Urgent', 'Période d\'essai'],
      deadline: '2024-01-15',
      priority: 'high',
      hasComments: true,
      completed: false
    },
    {
      id: '2',
      title: 'Préparer l\'entretien annuel de Clara',
      employee: 'Clara Dubois',
      avatar: '/placeholder.svg',
      tags: ['Entretien', 'Planifié'],
      deadline: '2024-01-18',
      priority: 'medium',
      hasComments: false,
      completed: false
    },
    {
      id: '3',
      title: 'Finaliser le dossier formation de Julien',
      employee: 'Julien Moreau',
      avatar: '/placeholder.svg',
      tags: ['Formation', 'OPCO'],
      deadline: '2024-01-20',
      priority: 'low',
      hasComments: true,
      completed: false
    }
  ]);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-charcoal mb-6">{title}</h2>
      <div className="space-y-4">
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={handleTaskComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
