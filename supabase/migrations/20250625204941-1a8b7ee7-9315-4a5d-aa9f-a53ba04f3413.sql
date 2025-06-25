
-- Table pour les tâches de recrutement
CREATE TABLE public.recruiter_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  candidate_name TEXT NOT NULL,
  candidate_id UUID REFERENCES public.candidates(id),
  priority BOOLEAN NOT NULL DEFAULT false, -- true = high priority (starred)
  is_completed BOOLEAN NOT NULL DEFAULT false,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  due_date TIMESTAMP WITH TIME ZONE,
  custom_order INTEGER NOT NULL DEFAULT 0, -- pour l'ordre personnalisé
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les tags/étiquettes
CREATE TABLE public.task_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL, -- red, orange, yellow, green, teal, blue, purple, pink, gray
  category TEXT NOT NULL, -- 'process', 'urgency', 'type', 'custom'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table de liaison entre tâches et tags
CREATE TABLE public.task_tag_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID REFERENCES public.recruiter_tasks(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.task_tags(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(task_id, tag_id)
);

-- Table pour les assignations (qui est responsable de la tâche)
CREATE TABLE public.task_assignees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID REFERENCES public.recruiter_tasks(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(task_id, user_id)
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.recruiter_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_tag_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_assignees ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour recruiter_tasks
CREATE POLICY "Users can view their own tasks or assigned tasks" 
  ON public.recruiter_tasks 
  FOR SELECT 
  USING (
    user_id = auth.uid() OR 
    id IN (SELECT task_id FROM public.task_assignees WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create their own tasks" 
  ON public.recruiter_tasks 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own tasks or assigned tasks" 
  ON public.recruiter_tasks 
  FOR UPDATE 
  USING (
    user_id = auth.uid() OR 
    id IN (SELECT task_id FROM public.task_assignees WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete their own tasks" 
  ON public.recruiter_tasks 
  FOR DELETE 
  USING (user_id = auth.uid());

-- Politiques RLS pour task_tags (lecture publique, création par utilisateurs authentifiés)
CREATE POLICY "Anyone can view tags" 
  ON public.task_tags 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create tags" 
  ON public.task_tags 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Politiques RLS pour task_tag_assignments
CREATE POLICY "Users can view tag assignments for accessible tasks" 
  ON public.task_tag_assignments 
  FOR SELECT 
  USING (
    task_id IN (
      SELECT id FROM public.recruiter_tasks 
      WHERE user_id = auth.uid() OR 
      id IN (SELECT task_id FROM public.task_assignees WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage tag assignments for their tasks" 
  ON public.task_tag_assignments 
  FOR ALL 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

-- Politiques RLS pour task_assignees
CREATE POLICY "Users can view assignees for accessible tasks" 
  ON public.task_assignees 
  FOR SELECT 
  USING (
    task_id IN (
      SELECT id FROM public.recruiter_tasks 
      WHERE user_id = auth.uid() OR 
      id IN (SELECT task_id FROM public.task_assignees WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Task owners can manage assignees" 
  ON public.task_assignees 
  FOR ALL 
  USING (
    task_id IN (SELECT id FROM public.recruiter_tasks WHERE user_id = auth.uid())
  );

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_recruiter_tasks_updated_at 
  BEFORE UPDATE ON public.recruiter_tasks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insérer des tags par défaut
INSERT INTO public.task_tags (name, color, category) VALUES
-- Tags de processus de recrutement
('Entretien', 'blue', 'process'),
('Relance', 'orange', 'process'),
('Feedback', 'purple', 'process'),
('Validation', 'green', 'process'),
('Documents', 'teal', 'process'),
('Référence', 'gray', 'process'),

-- Tags d'urgence
('Urgent', 'red', 'urgency'),
('Important', 'yellow', 'urgency'),
('À faire aujourd''hui', 'orange', 'urgency'),

-- Tags de type
('Technique', 'blue', 'type'),
('RH', 'purple', 'type'),
('Manager', 'green', 'type'),
('Freelance', 'teal', 'type'),
('CDI', 'blue', 'type'),
('Stage', 'pink', 'type'),

-- Tags personnalisés
('Suivi', 'gray', 'custom'),
('Planification', 'yellow', 'custom'),
('Formation', 'green', 'custom');

-- Index pour améliorer les performances
CREATE INDEX idx_recruiter_tasks_user_id ON public.recruiter_tasks(user_id);
CREATE INDEX idx_recruiter_tasks_custom_order ON public.recruiter_tasks(custom_order);
CREATE INDEX idx_recruiter_tasks_due_date ON public.recruiter_tasks(due_date);
CREATE INDEX idx_task_assignees_task_id ON public.task_assignees(task_id);
CREATE INDEX idx_task_assignees_user_id ON public.task_assignees(user_id);
CREATE INDEX idx_task_tag_assignments_task_id ON public.task_tag_assignments(task_id);
