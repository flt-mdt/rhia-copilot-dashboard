export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_briefs: {
        Row: {
          brief_summary: Json | null
          conversation_data: Json | null
          created_at: string | null
          generated_job_posting_id: string | null
          id: string
          is_complete: boolean | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          brief_summary?: Json | null
          conversation_data?: Json | null
          created_at?: string | null
          generated_job_posting_id?: string | null
          id?: string
          is_complete?: boolean | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          brief_summary?: Json | null
          conversation_data?: Json | null
          created_at?: string | null
          generated_job_posting_id?: string | null
          id?: string
          is_complete?: boolean | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_briefs_generated_job_posting_id_fkey"
            columns: ["generated_job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_briefs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_skills: {
        Row: {
          candidate_id: string | null
          id: string
          is_match: boolean | null
          level: number | null
          skill_id: string | null
        }
        Insert: {
          candidate_id?: string | null
          id?: string
          is_match?: boolean | null
          level?: number | null
          skill_id?: string | null
        }
        Update: {
          candidate_id?: string | null
          id?: string
          is_match?: boolean | null
          level?: number | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          ai_score: number | null
          ai_status: string | null
          ai_summary: string | null
          created_at: string | null
          current_company: string | null
          current_position: string | null
          email: string | null
          experience_years: number | null
          hr_comment: string | null
          id: string
          is_favorite: boolean | null
          linkedin_url: string | null
          location: string | null
          name: string
          phone_number: string | null
          portfolio_url: string | null
          status: Database["public"]["Enums"]["candidate_status"] | null
          target_job_id: string | null
          updated_at: string | null
        }
        Insert: {
          ai_score?: number | null
          ai_status?: string | null
          ai_summary?: string | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          email?: string | null
          experience_years?: number | null
          hr_comment?: string | null
          id?: string
          is_favorite?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          phone_number?: string | null
          portfolio_url?: string | null
          status?: Database["public"]["Enums"]["candidate_status"] | null
          target_job_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_score?: number | null
          ai_status?: string | null
          ai_summary?: string | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          email?: string | null
          experience_years?: number | null
          hr_comment?: string | null
          id?: string
          is_favorite?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone_number?: string | null
          portfolio_url?: string | null
          status?: Database["public"]["Enums"]["candidate_status"] | null
          target_job_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_target_job_id_fkey"
            columns: ["target_job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          candidate_id: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          name: string
          uploaded_at: string | null
        }
        Insert: {
          candidate_id?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          name: string
          uploaded_at?: string | null
        }
        Update: {
          candidate_id?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          name?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string | null
          candidate_id: string | null
          id: string
          job_posting_id: string | null
          notes: string | null
          status: Database["public"]["Enums"]["candidate_status"] | null
        }
        Insert: {
          applied_at?: string | null
          candidate_id?: string | null
          id?: string
          job_posting_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["candidate_status"] | null
        }
        Update: {
          applied_at?: string | null
          candidate_id?: string | null
          id?: string
          job_posting_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["candidate_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          benefits: string[] | null
          contract_type: Database["public"]["Enums"]["contract_type"] | null
          created_at: string | null
          created_by: string | null
          department: Database["public"]["Enums"]["department_type"] | null
          description: string | null
          experience_level: string | null
          id: string
          is_active: boolean | null
          location: string | null
          salary_max: number | null
          salary_min: number | null
          skills_required: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string | null
          created_by?: string | null
          department?: Database["public"]["Enums"]["department_type"] | null
          description?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string | null
          created_by?: string | null
          department?: Database["public"]["Enums"]["department_type"] | null
          description?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      personality_traits: {
        Row: {
          candidate_id: string | null
          company_fit: number | null
          id: string
          score: number | null
          trait_name: string
        }
        Insert: {
          candidate_id?: string | null
          company_fit?: number | null
          id?: string
          score?: number | null
          trait_name: string
        }
        Update: {
          candidate_id?: string | null
          company_fit?: number | null
          id?: string
          score?: number | null
          trait_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "personality_traits_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      timeline_events: {
        Row: {
          action: string
          candidate_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
        }
        Insert: {
          action: string
          candidate_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          action?: string
          candidate_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_events_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      candidate_status:
        | "to_analyze"
        | "in_review"
        | "contacted"
        | "interview_scheduled"
        | "offer_sent"
        | "hired"
        | "rejected"
      contract_type: "CDI" | "CDD" | "Freelance" | "Stage" | "Alternance"
      department_type:
        | "Engineering"
        | "Design"
        | "Product"
        | "Marketing"
        | "Sales"
        | "HR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      candidate_status: [
        "to_analyze",
        "in_review",
        "contacted",
        "interview_scheduled",
        "offer_sent",
        "hired",
        "rejected",
      ],
      contract_type: ["CDI", "CDD", "Freelance", "Stage", "Alternance"],
      department_type: [
        "Engineering",
        "Design",
        "Product",
        "Marketing",
        "Sales",
        "HR",
      ],
    },
  },
} as const
