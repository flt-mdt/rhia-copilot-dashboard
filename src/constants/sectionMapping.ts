
// Mapping des noms de sections visibles vers les identifiants techniques attendus par le backend
export const SECTION_LABELS_TO_IDS: Record<string, string> = {
  "Titre & Job Family": "titre_job_family",
  "Contexte & Business Case": "contexte",
  "Finalité/Mission": "finalite_mission",
  "Objectifs & KPIs": "objectifs_kpis",
  "Responsabilités clés": "responsabilites_cles",
  "Périmètre budgétaire & managérial": "perimetre_budgetaire",
  "Environnement & contraintes": "environnement_contraintes",
  "Compétences & exigences": "competences_exigences",
  "Qualifications & expériences": "qualifications_experiences",
  "Employee Value Proposition": "employee_value_proposition",
  "Perspectives d'évolution": "perspectives_evolution",
  "Rémunération & avantages": "remuneration_avantages",
  "Cadre contractuel": "cadre_contractuel",
  "Mesure de la performance & cadence": "performance_cadence",
  "Parties prenantes & RACI": "parties_prenantes_raci",
  "Inclusion, conformité & sécurité": "inclusion_conformite",
  "Onboarding & développement": "onboarding_developpement",
  "Processus de recrutement": "processus_recrutement"
};

// Mapping inverse pour récupérer le nom visible depuis l'ID technique
export const SECTION_IDS_TO_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(SECTION_LABELS_TO_IDS).map(([label, id]) => [id, label])
);
