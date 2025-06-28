import { v4 as uuidv4 } from 'uuid';

const BRIEF_API_BASE = (
  import.meta.env.VITE_API_BRIEF_URL ||
  'https://rhia-copilot-dashboard.onrender.com'
).replace(/\/$/, '');

export interface UserPreferences {
  sections: boolean[]; // 18 sections
  language: 'fr' | 'en';
  seniority: 'Stagiaire' | 'Junior' | 'Senior' | 'C-level';
}

export interface BriefData {
  // Keys are section slugs (e.g. "titre_job_family") and values hold
  // the data previously saved for each section with job_function included.
  [sectionId: string]: {
    job_function: string;
    [key: string]: any;
  };
}

export interface GenerateResponse {
  markdown: string;
  confidence: number;
  fallback_needed: boolean;
}

export interface FeedbackResponse {
  markdown: string;
  confidence: number;
}

export class BriefBackendApi {
  private sessionId: string;

  constructor() {
    this.sessionId = uuidv4();
    console.log('BriefBackendApi initialized with session ID:', this.sessionId);
    console.log('API Base URL:', BRIEF_API_BASE);
  }

  getSessionId(): string {
    return this.sessionId;
  }

  resetSession(): void {
    this.sessionId = uuidv4();
  }

  /**
   * Envoie les préférences utilisateur à l'endpoint /v1/config
   */
  async sendUserPreferences(preferences: UserPreferences): Promise<void> {
    const payload = {
      session_id: this.sessionId,
      sections: preferences.sections,
      language: preferences.language,
      seniority: preferences.seniority
    };

    const url = `${BRIEF_API_BASE}/v1/config`;
    
    console.log('=== SENDING CONFIG REQUEST ===');
    console.log('URL:', url);
    console.log('Session ID:', this.sessionId);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('=== API ERROR ===');
        console.error('Status:', response.status);
        console.error('Error text:', errorText);
        throw new Error(`Erreur lors de la sauvegarde des préférences: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('=== CONFIG SAVED SUCCESSFULLY ===');
      console.log('Result:', result);
    } catch (error) {
      console.error('=== FETCH ERROR ===');
      console.error('Error:', error);
      throw error;
    }
  }

  async storeUserPreferences(preferences: UserPreferences): Promise<void> {
    console.log('storeUserPreferences called with:', preferences);
    return this.sendUserPreferences(preferences);
  }

  /**
   * Met à jour les données d'une section spécifique du brief
   */
  async updateBriefData(sectionId: string, data: Record<string, any>): Promise<void> {
    console.log('Updating brief data:', { sectionId, data });
    
    const response = await fetch(`${BRIEF_API_BASE}/v1/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: this.sessionId,
        section_id: sectionId,
        data
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des données');
    }
  }

  async generateSection(
    sectionId: string, 
    userPreferences: UserPreferences, 
    briefData: BriefData
  ): Promise<GenerateResponse> {
    console.log('Generate section payload:', {
      session_id: this.sessionId,
      section_id: sectionId,
      user_preferences: userPreferences,
      brief_data: briefData
    });

    const response = await fetch(`${BRIEF_API_BASE}/v1/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: this.sessionId,
        section_id: sectionId,
        user_preferences: userPreferences,
        brief_data: briefData
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération de la section');
    }

    return response.json();
  }

  async provideFeedback(
    sectionId: string,
    userFeedback: string,
    previousMarkdown: string,
    userPreferences: UserPreferences,
    briefData: BriefData
  ): Promise<FeedbackResponse> {
    console.log('Feedback payload:', {
      session_id: this.sessionId,
      section_id: sectionId,
      user_feedback: userFeedback,
      previous_markdown: previousMarkdown,
      user_preferences: userPreferences,
      brief_data: briefData
    });

    const response = await fetch(`${BRIEF_API_BASE}/v1/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: this.sessionId,
        section_id: sectionId,
        user_feedback: userFeedback,
        previous_markdown: previousMarkdown,
        user_preferences: userPreferences,
        brief_data: briefData
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la reformulation');
    }

    return response.json();
  }

  async storeSectionApproval(
    sectionId: string,
    markdown: string,
    status: string = 'approved'
  ): Promise<void> {
    const response = await fetch(`${BRIEF_API_BASE}/v1/approval`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: this.sessionId,
        section_id: sectionId,
        markdown,
        status
      })
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'enregistrement de la validation");
    }
  }

  async getFinalBrief(): Promise<string> {
    const response = await fetch(`${BRIEF_API_BASE}/v1/brief/${this.sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du brief final');
    }

    return response.text();
  }

  /**
   * Récupère les données d'une section spécifique en utilisant l'identifiant technique
   */
  async getSectionData(sectionId: string): Promise<Record<string, any> | null> {
    try {
      console.log('Getting section data for:', sectionId);
      
      const response = await fetch(`${BRIEF_API_BASE}/v1/data/${this.sessionId}/${sectionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        console.log('Section data not found for:', sectionId);
        return null;
      }

      const data = await response.json();
      console.log('Section data retrieved:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return null;
    }
  }

  /**
   * Sauvegarde le brief final dans la base de données Supabase
   */
  async saveFinalBrief(briefData: {
    title: string;
    sections: Array<{
      name: string;
      content: string;
    }>;
    userPreferences: UserPreferences;
  }): Promise<string> {
    try {
      console.log('Saving final brief:', briefData);
      
      // Créer le contenu markdown complet du brief
      const markdownContent = briefData.sections
        .map(section => `## ${section.name}\n\n${section.content}`)
        .join('\n\n---\n\n');

      // Sauvegarder dans la table ai_briefs via Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      const briefRecord = {
        title: briefData.title,
        is_complete: true,
        conversation_data: {
          session_id: this.sessionId,
          user_preferences: briefData.userPreferences,
          sections: briefData.sections
        },
        brief_summary: {
          markdown: markdownContent,
          sections_count: briefData.sections.length,
          created_at: new Date().toISOString()
        }
      };

      const { data, error } = await supabase
        .from('ai_briefs')
        .insert(briefRecord)
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la sauvegarde du brief:', error);
        throw new Error(`Erreur lors de la sauvegarde: ${error.message}`);
      }

      console.log('Brief sauvegardé avec succès:', data);
      return data.id;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du brief final:', error);
      throw error;
    }
  }
}

export const briefBackendApi = new BriefBackendApi();
