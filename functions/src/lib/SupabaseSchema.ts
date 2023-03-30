export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      notice: {
        Row: {
          created_at: string | null
          id_room: number | null
          id_user: string | null
          message: string | null
          notice_id: number
          notice_status: number
          notice_type: number
          pushed: boolean
          uid: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id_room?: number | null
          id_user?: string | null
          message?: string | null
          notice_id?: number
          notice_status?: number
          notice_type: number
          pushed?: boolean
          uid: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id_room?: number | null
          id_user?: string | null
          message?: string | null
          notice_id?: number
          notice_status?: number
          notice_type?: number
          pushed?: boolean
          uid?: string
          updated_at?: string | null
        }
      }
      room: {
        Row: {
          deleted: boolean | null
          description: string
          enter_type: number
          max_number: number
          owner: string
          password: string | null
          place_type: number
          room_id: number
          start_time: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          deleted?: boolean | null
          description?: string
          enter_type: number
          max_number: number
          owner: string
          password?: string | null
          place_type: number
          room_id?: number
          start_time: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          deleted?: boolean | null
          description?: string
          enter_type?: number
          max_number?: number
          owner?: string
          password?: string | null
          place_type?: number
          room_id?: number
          start_time?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
      }
      room_chat: {
        Row: {
          name: string
          photo: string
          room_chat_id: number
          room_id: number
          text: string
          uid: string
          updated_at: string
        }
        Insert: {
          name: string
          photo: string
          room_chat_id?: number
          room_id: number
          text: string
          uid: string
          updated_at?: string
        }
        Update: {
          name?: string
          photo?: string
          room_chat_id?: number
          room_id?: number
          text?: string
          uid?: string
          updated_at?: string
        }
      }
      room_private: {
        Row: {
          inner_description: string | null
          place_url: string | null
          room_id: number
          updated_at: string
        }
        Insert: {
          inner_description?: string | null
          place_url?: string | null
          room_id: number
          updated_at?: string
        }
        Update: {
          inner_description?: string | null
          place_url?: string | null
          room_id?: number
          updated_at?: string
        }
      }
      room_user: {
        Row: {
          password: string | null
          room_id: number
          room_user_type: number
          uid: string
          updated_at: string
        }
        Insert: {
          password?: string | null
          room_id: number
          room_user_type: number
          uid: string
          updated_at?: string
        }
        Update: {
          password?: string | null
          room_id?: number
          room_user_type?: number
          uid?: string
          updated_at?: string
        }
      }
      user: {
        Row: {
          discord_name: string
          follower_number: number
          follows: string[]
          greeting: string
          name: string | null
          photo: string
          tags: string[]
          uid: string
          updated_at: string
        }
        Insert: {
          discord_name: string
          follower_number?: number
          follows?: string[]
          greeting?: string
          name?: string | null
          photo: string
          tags?: string[]
          uid: string
          updated_at?: string
        }
        Update: {
          discord_name?: string
          follower_number?: number
          follows?: string[]
          greeting?: string
          name?: string | null
          photo?: string
          tags?: string[]
          uid?: string
          updated_at?: string
        }
      }
      user_private: {
        Row: {
          blocks: string[]
          fcm_tokens: string[]
          no_push_list: number[]
          notice_read_time: string | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          blocks?: string[]
          fcm_tokens?: string[]
          no_push_list?: number[]
          notice_read_time?: string | null
          uid: string
          updated_at?: string | null
        }
        Update: {
          blocks?: string[]
          fcm_tokens?: string[]
          no_push_list?: number[]
          notice_read_time?: string | null
          uid?: string
          updated_at?: string | null
        }
      }
      wait_time: {
        Row: {
          end_time: string
          start_time: string
          uid: string
          updated_at: string
          wait_time_id: number
          wait_time_type: number
        }
        Insert: {
          end_time: string
          start_time: string
          uid: string
          updated_at?: string
          wait_time_id?: number
          wait_time_type: number
        }
        Update: {
          end_time?: string
          start_time?: string
          uid?: string
          updated_at?: string
          wait_time_id?: number
          wait_time_type?: number
        }
      }
    }
    Views: {
      v_notice: {
        Row: {
          created_at: string | null
          id_room: number | null
          id_user: string | null
          message: string | null
          notice_id: number | null
          notice_status: number | null
          notice_type: number | null
          room: Json | null
          uid: string | null
          updated_at: string | null
          user: Json | null
        }
      }
      v_notice_push: {
        Row: {
          created_at: string | null
          fcm_tokens: string[] | null
          notice_id: number | null
          notice_type: number | null
          room_title: string | null
          uid: string | null
          user_name: string | null
        }
      }
    }
    Functions: {
      follow: {
        Args: {
          followee: string
        }
        Returns: undefined
      }
      room_insert_check: {
        Args: {
          p_uid: string
        }
        Returns: boolean
      }
      room_user_insert_check: {
        Args: {
          p_uid: string
          p_room_id: number
          p_password: string
        }
        Returns: boolean
      }
      select_tag_count: {
        Args: {
          tag: string
          p_start_time: string
          p_end_time: string
        }
        Returns: {
          cal: string
          n: number
        }[]
      }
      unfollow: {
        Args: {
          followee: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
