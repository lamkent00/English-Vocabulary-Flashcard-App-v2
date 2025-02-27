export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      flashcards: {
        Row: {
          id: number
          category_id: string
          word: string
          pronunciation: string
          image_url: string
          audio_url: string
          meaning: string
          created_at: string
          bucket_url?: string
        }
        Insert: {
          id: number
          category_id: string
          word: string
          pronunciation: string
          image_url: string
          audio_url: string
          meaning: string
          created_at?: string
          bucket_url?: string
        }
        Update: {
          id?: number
          category_id?: string
          word?: string
          pronunciation?: string
          image_url?: string
          audio_url?: string
          meaning?: string
          created_at?: string
          bucket_url?: string
        }
      }
      flashcards_duplicate: {
        Row: {
          id: number
          category_id: string
          word: string
          pronunciation: string
          image_url: string
          audio_url: string
          meaning: string
          created_at: string
        }
        Insert: {
          id: number
          category_id: string
          word: string
          pronunciation: string
          image_url: string
          audio_url: string
          meaning: string
          created_at?: string
        }
        Update: {
          id?: number
          category_id?: string
          word?: string
          pronunciation?: string
          image_url?: string
          audio_url?: string
          meaning?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}