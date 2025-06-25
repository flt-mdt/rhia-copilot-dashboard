
-- Supprimer TOUTES les politiques RLS existantes sur recruiter_tasks
DROP POLICY IF EXISTS "Users can view their own tasks only" ON public.recruiter_tasks;
DROP POLICY IF EXISTS "Users can view their own tasks or assigned tasks" ON public.recruiter_tasks;
DROP POLICY IF EXISTS "Users can create their own tasks" ON public.recruiter_tasks;
DROP POLICY IF EXISTS "Users can update their own tasks only" ON public.recruiter_tasks;
DROP POLICY IF EXISTS "Users can update their own tasks or assigned tasks" ON public.recruiter_tasks;
DROP POLICY IF EXISTS "Users can delete their own tasks" ON public.recruiter_tasks;

-- Créer des politiques RLS simplifiées pour recruiter_tasks (sans références à task_assignees)
CREATE POLICY "Users can view their own tasks only" 
  ON public.recruiter_tasks 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own tasks" 
  ON public.recruiter_tasks 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own tasks only" 
  ON public.recruiter_tasks 
  FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own tasks" 
  ON public.recruiter_tasks 
  FOR DELETE 
  USING (user_id = auth.uid());

-- Supprimer TOUTES les politiques existantes sur task_tag_assignments
DROP POLICY IF EXISTS "Users can view tag assignments for accessible tasks" ON public.task_tag_assignments;
DROP POLICY IF EXISTS "Users can manage tag assignments for their tasks" ON public.task_tag_assignments;
DROP POLICY IF EXISTS "Users can view tag assignments for their tasks" ON public.task_tag_assignments;
DROP POLICY IF EXISTS "Users can insert tag assignments for their tasks" ON public.task_tag_assignments;
DROP POLICY IF EXISTS "Users can update tag assignments for their tasks" ON public.task_tag_assignments;
DROP POLICY IF EXISTS "Users can delete tag assignments for their tasks" ON public.task_tag_assignments;

-- Créer les nouvelles politiques pour task_tag_assignments
CREATE POLICY "Users can view tag assignments for their tasks" 
  ON public.task_tag_assignments 
  FOR SELECT 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert tag assignments for their tasks" 
  ON public.task_tag_assignments 
  FOR INSERT 
  WITH CHECK (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update tag assignments for their tasks" 
  ON public.task_tag_assignments 
  FOR UPDATE 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete tag assignments for their tasks" 
  ON public.task_tag_assignments 
  FOR DELETE 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );
