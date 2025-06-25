
-- Supprimer les politiques RLS existantes qui causent la récursion
DROP POLICY IF EXISTS "Users can view assignees for accessible tasks" ON public.task_assignees;
DROP POLICY IF EXISTS "Task owners can manage assignees" ON public.task_assignees;

-- Créer des politiques RLS plus simples et non récursives pour task_assignees
CREATE POLICY "Users can view task assignees for their own tasks" 
  ON public.task_assignees 
  FOR SELECT 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert task assignees for their own tasks" 
  ON public.task_assignees 
  FOR INSERT 
  WITH CHECK (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update task assignees for their own tasks" 
  ON public.task_assignees 
  FOR UPDATE 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete task assignees for their own tasks" 
  ON public.task_assignees 
  FOR DELETE 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );
