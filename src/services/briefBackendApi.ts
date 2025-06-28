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
  // the data previously saved for each section.
  [sectionId: string]: Record<string, any>;
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
    console.log('Sending config to backend:', {
      session_id: this.sessionId,
      ...preferences
    });

    const response = await fetch(`${BRIEF_API_BASE}/v1/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: this.sessionId,
        sections: preferences.sections,
        language: preferences.language,
        seniority: preferences.seniority
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Erreur lors de la sauvegarde des préférences: ${response.status}`);
    }

    const result = await response.json();
    console.log('Config saved successfully:', result);
  }

  async storeUserPreferences(preferences: UserPreferences): Promise<void> {
    return this.sendUserPreferences(preferences);
  }

  /**
   * Met à jour les données d'une section spécifique du brief
   */
  async updateBriefData(sectionId: string, data: Record<string, any>): Promise<void> {
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
   * Récupère les données d'une section spécifique
   */
  async getSectionData(sectionId: string): Promise<Record<string, any> | null> {
    try {
      const response = await fetch(`${BRIEF_API_BASE}/v1/data/${this.sessionId}/${sectionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        return null;
      }

      return response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return null;
    }
  }
}

export const briefBackendApi = new BriefBackendApi();
