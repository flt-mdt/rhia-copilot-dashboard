
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RecruiterTask {
  id: string;
  title: string;
  description?: string;
  candidate_name: string;
  candidate_id?: string;
  priority: boolean;
  is_completed: boolean;
  is_deleted: boolean;
  is_favorite: boolean;
  due_date?: string;
  custom_order: number;
  created_at: string;
  updated_at: string;
  tags?: TaskTag[];
  assignees?: TaskAssignee[];
}

export interface TaskTag {
  id: string;
  name: string;
  color: string;
  category: string;
}

export interface TaskAssignee {
  id: string;
  name: string;
  avatar: string;
}

export const useRecruiterTasks = () => {
  const [tasks, setTasks] = useState<RecruiterTask[]>([]);
  const [tags, setTags] = useState<TaskTag[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch tasks with their tags and assignees
  const fetchTasks = async () => {
    try {
      const { data: tasksData, error: tasksError } = await supabase
        .from('recruiter_tasks')
        .select(`
          *,
          task_tag_assignments(
            task_tags(id, name, color, category)
          ),
          task_assignees(
            profiles(id, name, avatar_url)
          )
        `)
        .order('custom_order', { ascending: true });

      if (tasksError) throw tasksError;

      const formattedTasks = tasksData?.map(task => ({
        ...task,
        tags: task.task_tag_assignments?.map(tta => tta.task_tags).filter(Boolean) || [],
        assignees: task.task_assignees?.map(ta => ({
          id: ta.profiles?.id || '',
          name: ta.profiles?.name || 'Unknown',
          avatar: ta.profiles?.avatar_url || '/placeholder.svg'
        })).filter(Boolean) || []
      })) || [];

      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les tâches",
        variant: "destructive"
      });
    }
  };

  // Fetch available tags
  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('task_tags')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  // Create new task
  const createTask = async (taskData: Partial<RecruiterTask>) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const maxOrder = Math.max(...tasks.map(t => t.custom_order), 0);
      
      const { data, error } = await supabase
        .from('recruiter_tasks')
        .insert({
          ...taskData,
          user_id: userData.user.id,
          custom_order: maxOrder + 1
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tâche créée",
        description: "La nouvelle tâche a été ajoutée avec succès"
      });

      fetchTasks();
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la tâche",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Update task
  const updateTask = async (taskId: string, updates: Partial<RecruiterTask>) => {
    try {
      const { error } = await supabase
        .from('recruiter_tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ));

      toast({
        title: "Tâche mise à jour",
        description: "Les modifications ont été sauvegardées"
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la tâche",
        variant: "destructive"
      });
    }
  };

  // Delete task (soft delete)
  const deleteTask = async (taskId: string) => {
    try {
      await updateTask(taskId, { is_deleted: true });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    await updateTask(taskId, { is_completed: !task.is_completed });
  };

  // Toggle task priority
  const toggleTaskPriority = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    await updateTask(taskId, { priority: !task.priority });
  };

  // Toggle task favorite
  const toggleTaskFavorite = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    await updateTask(taskId, { is_favorite: !task.is_favorite });
  };

  // Reorder tasks
  const reorderTasks = async (draggedTaskId: string, targetIndex: number) => {
    try {
      const tasksCopy = [...tasks];
      const draggedTaskIndex = tasksCopy.findIndex(t => t.id === draggedTaskId);
      const draggedTask = tasksCopy[draggedTaskIndex];
      
      tasksCopy.splice(draggedTaskIndex, 1);
      tasksCopy.splice(targetIndex, 0, draggedTask);

      // Update custom_order for all affected tasks
      const updates = tasksCopy.map((task, index) => ({
        id: task.id,
        custom_order: index
      }));

      for (const update of updates) {
        await supabase
          .from('recruiter_tasks')
          .update({ custom_order: update.custom_order })
          .eq('id', update.id);
      }

      setTasks(tasksCopy);
    } catch (error) {
      console.error('Error reordering tasks:', error);
      toast({
        title: "Erreur",
        description: "Impossible de réorganiser les tâches",
        variant: "destructive"
      });
    }
  };

  // Add tag to task
  const addTagToTask = async (taskId: string, tagId: string) => {
    try {
      const { error } = await supabase
        .from('task_tag_assignments')
        .insert({ task_id: taskId, tag_id: tagId });

      if (error) throw error;
      fetchTasks();
    } catch (error) {
      console.error('Error adding tag to task:', error);
    }
  };

  // Remove tag from task
  const removeTagFromTask = async (taskId: string, tagId: string) => {
    try {
      const { error } = await supabase
        .from('task_tag_assignments')
        .delete()
        .eq('task_id', taskId)
        .eq('tag_id', tagId);

      if (error) throw error;
      fetchTasks();
    } catch (error) {
      console.error('Error removing tag from task:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchTags()]);
      setLoading(false);
    };

    initializeData();
  }, []);

  return {
    tasks,
    tags,
    loading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleTaskPriority,
    toggleTaskFavorite,
    reorderTasks,
    addTagToTask,
    removeTagFromTask,
    refreshTasks: fetchTasks
  };
};
