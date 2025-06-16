
-- D'abord, récupérer l'ID de l'utilisateur flomaud07@gmail.com
-- (nous devrons remplacer USER_ID_HERE par l'ID réel)

-- Temporairement désactiver le trigger pour éviter l'erreur
DROP TRIGGER IF EXISTS candidate_notification_trigger ON public.candidates;

-- Insérer les candidats de démonstration sans déclencher les notifications
INSERT INTO public.candidates (
  name,
  email,
  phone_number,
  ai_score,
  ai_status,
  status,
  ai_summary,
  location,
  experience_years,
  current_company,
  current_position,
  linkedin_url,
  created_at
) VALUES (
  'Marie Dubois',
  'marie.dubois@email.com',
  '+33 6 12 34 56 78',
  85,
  'analyzed',
  'in_review',
  'Candidate avec un excellent profil technique en développement web. Expérience solide en React et Node.js. Démontre de bonnes compétences en communication et capacité d''adaptation.',
  'Paris, France',
  5,
  'Tech Solutions Inc.',
  'Développeuse Full Stack Senior',
  'https://linkedin.com/in/marie-dubois',
  now()
);

-- Insérer un deuxième candidat
INSERT INTO public.candidates (
  name,
  email,
  phone_number,
  ai_score,
  ai_status,
  status,
  ai_summary,
  location,
  experience_years,
  current_company,
  current_position,
  linkedin_url,
  created_at
) VALUES (
  'Thomas Martin',
  'thomas.martin@email.com',
  '+33 6 98 76 54 32',
  92,
  'analyzed',
  'interview_scheduled',
  'Profil exceptionnel avec une expertise approfondie en architecture logicielle. Leadership démontré et capacité à gérer des équipes techniques. Très bon fit culturel.',
  'Lyon, France',
  8,
  'Digital Innovations',
  'Architecte Logiciel',
  'https://linkedin.com/in/thomas-martin',
  now() - interval '2 days'
);

-- Insérer un troisième candidat
INSERT INTO public.candidates (
  name,
  email,
  phone_number,
  ai_score,
  ai_status,
  status,
  ai_summary,
  location,
  experience_years,
  current_company,
  current_position,
  created_at
) VALUES (
  'Sophie Chen',
  'sophie.chen@email.com',
  '+33 7 45 67 89 12',
  78,
  'analyzed',
  'to_analyze',
  'Profil junior prometteur avec de bonnes bases techniques. Formation récente et motivation élevée. Nécessite un accompagnement mais potentiel intéressant.',
  'Toulouse, France',
  2,
  'StartupTech',
  'Développeuse Frontend',
  now() - interval '1 day'
);

-- Recréer le trigger pour les futurs candidats
CREATE TRIGGER candidate_notification_trigger
  AFTER INSERT OR UPDATE ON public.candidates
  FOR EACH ROW EXECUTE FUNCTION create_candidate_notification();
