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
          bank_account_name: string | null
          bank_account_number: string | null
          business_name: string
          code: string
          created_at: string
          email: string
          id: number
          phone_number: string
        }
        Insert: {
          address: string
          bank_account_name?: string | null
          bank_account_number?: string | null
          business_name: string
          code: string
          created_at?: string
          email: string
          id?: number
          phone_number: string
        }
        Update: {
          address?: string
          bank_account_name?: string | null
          bank_account_number?: string | null
          business_name?: string
          code?: string
          created_at?: string
          email?: string
          id?: number
          phone_number?: string
        }
        Relationships: []
      }
      Category: {
        Row: {
          business_profile_id: number | null
          category_name: string | null
          created_at: string
          id: number
          is_active: boolean | null
        }
        Insert: {
          business_profile_id?: number | null
          category_name?: string | null
          created_at?: string
          id?: number
          is_active?: boolean | null
        }
        Update: {
          business_profile_id?: number | null
          category_name?: string | null
          created_at?: string
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
          transaction_status: string | null
        }
        Insert: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          total_payment?: number | null
          transaction_status?: string | null
        }
        Update: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          total_payment?: number | null
          transaction_status?: string | null
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
          need_quantity: boolean | null
          product_category_id: number | null
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
          need_quantity?: boolean | null
          product_category_id?: number | null
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
          need_quantity?: boolean | null
          product_category_id?: number | null
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
