
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

  // Fetch tasks with their tags
  const fetchTasks = async () => {
    try {
      console.log('🔄 Fetching tasks...');
      
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('❌ Auth error:', userError);
        throw userError;
      }
      
      if (!userData.user) {
        console.error('❌ No authenticated user found');
        throw new Error('User not authenticated');
      }

      console.log('✅ User authenticated:', userData.user.id);

      const { data: tasksData, error: tasksError } = await supabase
        .from('recruiter_tasks')
        .select(`
          *,
          task_tag_assignments(
            task_tags(id, name, color, category)
          )
        `)
        .order('custom_order', { ascending: true });

      if (tasksError) {
        console.error('❌ Tasks fetch error:', tasksError);
        throw tasksError;
      }

      console.log('✅ Tasks fetched successfully:', tasksData?.length || 0, 'tasks');

      const formattedTasks = tasksData?.map(task => ({
        ...task,
        tags: task.task_tag_assignments?.map(tta => tta.task_tags).filter(Boolean) || [],
        assignees: [] // Pour l'instant vide, on ajoutera les assignés plus tard
      })) || [];

      setTasks(formattedTasks);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les tâches: " + (error instanceof Error ? error.message : 'Erreur inconnue'),
        variant: "destructive"
      });
    }
  };

  // Fetch available tags
  const fetchTags = async () => {
    try {
      console.log('🔄 Fetching tags...');
      
      const { data, error } = await supabase
        .from('task_tags')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('❌ Tags fetch error:', error);
        throw error;
      }
      
      console.log('✅ Tags fetched successfully:', data?.length || 0, 'tags');
      setTags(data || []);
    } catch (error) {
      console.error('❌ Error fetching tags:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les tags: " + (error instanceof Error ? error.message : 'Erreur inconnue'),
        variant: "destructive"
      });
    }
  };

  // Create new task
  const createTask = async (taskData: {
    title: string;
    description?: string;
    candidate_name: string;
    priority: boolean;
    due_date?: string;
    selectedTags: string[];
  }) => {
    try {
      console.log('🔄 Starting task creation with data:', taskData);
      
      // Vérifier l'authentification
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('❌ Auth error during task creation:', userError);
        throw new Error('Erreur d\'authentification: ' + userError.message);
      }

      if (!userData.user) {
        console.error('❌ No authenticated user found during task creation');
        throw new Error('Utilisateur non authentifié');
      }

      console.log('✅ User authenticated for task creation:', userData.user.id);

      // Calculer l'ordre personnalisé
      const maxOrder = Math.max(...tasks.map(t => t.custom_order), 0);
      
      const taskInsertData = {
        title: taskData.title,
        description: taskData.description,
        candidate_name: taskData.candidate_name,
        priority: taskData.priority,
        due_date: taskData.due_date,
        user_id: userData.user.id,
        custom_order: maxOrder + 1
      };

      console.log('🔄 Inserting task with data:', taskInsertData);

      // Insérer la tâche
      const { data: insertedTask, error: insertError } = await supabase
        .from('recruiter_tasks')
        .insert(taskInsertData)
        .select()
        .single();

      if (insertError) {
        console.error('❌ Task insertion error:', insertError);
        throw new Error('Erreur lors de la création de la tâche: ' + insertError.message);
      }

      console.log('✅ Task created successfully:', insertedTask);

      // Ajouter les tags à la tâche
      if (taskData.selectedTags.length > 0) {
        console.log('🔄 Adding tags to task:', taskData.selectedTags);
        
        const tagAssignments = taskData.selectedTags.map(tagId => ({
          task_id: insertedTask.id,
          tag_id: tagId
        }));

        const { error: tagError } = await supabase
          .from('task_tag_assignments')
          .insert(tagAssignments);

        if (tagError) {
          console.error('❌ Error adding tags:', tagError);
          toast({
            title: "Attention",
            description: "Tâche créée mais erreur lors de l'ajout des tags: " + tagError.message,
            variant: "destructive"
          });
        } else {
          console.log('✅ Tags added successfully');
        }
      }

      toast({
        title: "Tâche créée",
        description: "La nouvelle tâche a été ajoutée avec succès"
      });

      // Actualiser les tâches pour afficher la nouvelle
      await fetchTasks();
      return insertedTask;
      
    } catch (error) {
      console.error('❌ Error creating task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue lors de la création';
      toast({
        title: "Erreur",
        description: errorMessage,
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
      console.log('🔄 Initializing task data...');
      setLoading(true);
      await Promise.all([fetchTasks(), fetchTags()]);
      setLoading(false);
      console.log('✅ Task data initialization complete');
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
