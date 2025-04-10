export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      Accounts: {
        Row: {
          access_code: string | null
          business_profile_id: number | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone_number: string | null
          role_id: number | null
          username: string | null
        }
        Insert: {
          access_code?: string | null
          business_profile_id?: number | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone_number?: string | null
          role_id?: number | null
          username?: string | null
        }
        Update: {
          access_code?: string | null
          business_profile_id?: number | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone_number?: string | null
          role_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Accounts_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Accounts_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
        ]
      }
      BusinessProfile: {
        Row: {
          address: string
          bank_account_name: string
          bank_account_number: string
          business_name: string
          code: string
          created_at: string
          email: string
          id: number
          last_profile_update: string
          last_qr_update: string
          phone_number: string
          profile_image_url: string
          qr_image_url: string
        }
        Insert: {
          address?: string
          bank_account_name?: string
          bank_account_number?: string
          business_name?: string
          code?: string
          created_at?: string
          email?: string
          id?: number
          last_profile_update?: string
          last_qr_update?: string
          phone_number?: string
          profile_image_url?: string
          qr_image_url?: string
        }
        Update: {
          address?: string
          bank_account_name?: string
          bank_account_number?: string
          business_name?: string
          code?: string
          created_at?: string
          email?: string
          id?: number
          last_profile_update?: string
          last_qr_update?: string
          phone_number?: string
          profile_image_url?: string
          qr_image_url?: string
        }
        Relationships: []
      }
      Category: {
        Row: {
          business_profile_id: number | null
          category_name: string | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean | null
        }
        Insert: {
          business_profile_id?: number | null
          category_name?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
        }
        Update: {
          business_profile_id?: number | null
          category_name?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Category_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
            referencedColumns: ["id"]
          },
        ]
      }
      Order: {
        Row: {
          business_profile_id: number | null
          created_at: string
          id: number
          total_payment: number | null
          transaction_status: string
          payment_method: string
        }
        Insert: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          total_payment?: number | null
          transaction_status?: string
          payment_method?: string
        }
        Update: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          total_payment?: number | null
          transaction_status?: string
          payment_method?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
            referencedColumns: ["id"]
          },
        ]
      }
      OrderDetail: {
        Row: {
          created_at: string
          id: number
          order_id: number
          product_id: number
          quantity: number
          total_price: number
        }
        Insert: {
          created_at?: string
          id?: number
          order_id: number
          product_id: number
          quantity: number
          total_price: number
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "OrderDetail_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OrderDetail_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Product: {
        Row: {
          business_profile_id: number | null
          buy_price: number | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean | null
          last_image_update: string
          need_quantity: boolean | null
          product_category_id: number | null
          product_image: string | null
          product_name: string | null
          quantity: number | null
          sell_price: number | null
        }
        Insert: {
          business_profile_id?: number | null
          buy_price?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          last_image_update?: string
          need_quantity?: boolean | null
          product_category_id?: number | null
          product_image?: string | null
          product_name?: string | null
          quantity?: number | null
          sell_price?: number | null
        }
        Update: {
          business_profile_id?: number | null
          buy_price?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          last_image_update?: string
          need_quantity?: boolean | null
          product_category_id?: number | null
          product_image?: string | null
          product_name?: string | null
          quantity?: number | null
          sell_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Product_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_product_category_id_fkey"
            columns: ["product_category_id"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
        ]
      }
      Roles: {
        Row: {
          created_at: string
          id: number
          role_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          role_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          role_name?: string | null
        }
        Relationships: []
      }
      "Tax Module": {
        Row: {
          business_profile_id: number | null
          created_at: string
          id: number
          is_pph: boolean | null
          is_ppn: boolean | null
          monthly_bruto: number | null
          pph_percentage: number | null
          pph_type: string | null
          ppn_percentage: number | null
          yearly_bruto: number | null
        }
        Insert: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          is_pph?: boolean | null
          is_ppn?: boolean | null
          monthly_bruto?: number | null
          pph_percentage?: number | null
          pph_type?: string | null
          ppn_percentage?: number | null
          yearly_bruto?: number | null
        }
        Update: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          is_pph?: boolean | null
          is_ppn?: boolean | null
          monthly_bruto?: number | null
          pph_percentage?: number | null
          pph_type?: string | null
          ppn_percentage?: number | null
          yearly_bruto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Tax Module_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_categories_with_product_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          category_name: string
          is_active: boolean
          created_at: string
          business_profile_id: number
          description: string
          product_count: number
        }[]
      }
      get_categories_with_product_count2: {
        Args: { businessprofileid: number }
        Returns: {
          id: number
          category_name: string
          is_active: boolean
          created_at: string
          business_profile_id: number
          description: string
          product_count: number
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
