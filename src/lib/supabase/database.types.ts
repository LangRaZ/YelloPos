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
          email: string
          id: string
          name: string 
          phone_number: string
          role_id: number | null
          username: string
        }
        Insert: {
          access_code?: string | null
          business_profile_id?: number | null
          created_at?: string
          email?: string
          id?: string
          name?: String
          phone_number?: string
          role_id?: number | null
          username?: string
        }
        Update: {
          access_code?: string | null
          business_profile_id?: number | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone_number?: string 
          role_id?: number | null
          username?: string
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
          completed_time: string | null
          created_at: string
          id: number
          total_payment: number | null
          transaction_status: string
          processed_by_account_id: string | null
          processed_time: string | null
          payment_method: string
        }
        Insert: {
          business_profile_id?: number | null
          completed_time?: string | null
          created_at?: string
          id?: number
          payment_method?: string
          processed_by_account_id?: string | null
          processed_time?: string | null
          total_payment?: number | null
          transaction_status?: string
        }
        Update: {
          business_profile_id?: number | null
          completed_time?: string | null
          created_at?: string
          id?: number
          payment_method?: string
          processed_by_account_id?: string | null
          processed_time?: string | null
          total_payment?: number | null
          transaction_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_processed_by_account_id_fkey"
            columns: ["processed_by_account_id"]
            isOneToOne: false
            referencedRelation: "Accounts"
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
      Report: {
        Row: {
          business_profile_id: number | null
          created_at: string
          id: number
          is_monthly: boolean | null
          is_yearly: boolean | null
          month: number | null
          report_url: string | null
          year: number | null
          report_name: string
        }
        Insert: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          is_monthly?: boolean | null
          is_yearly?: boolean | null
          month?: number | null
          report_url?: string | null
          year?: number | null
          report_name?: string
        }
        Update: {
          business_profile_id?: number | null
          created_at?: string
          id?: number
          is_monthly?: boolean | null
          is_yearly?: boolean | null
          month?: number | null
          report_url?: string | null
          year?: number | null
          report_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Report_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "BusinessProfile"
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
      get_order_count: {
        Args: { businessprofileid: number }
        Returns: number
      }
      get_order_count_completed: {
        Args: { businessprofileid: number }
        Returns: number
      }
      get_order_count_completed_yearly: {
        Args: { businessprofileid: number }
        Returns: {
          month: string
          count: number
        }[]
      }
      get_order_count_yearly: {
        Args: { businessprofileid: number }
        Returns: {
          month: string
          count: number
        }[]
      }
      get_profit: {
        Args: { businessprofileid: number }
        Returns: number
      }
      get_profit_yearly: {
        Args: { businessprofileid: number }
        Returns: {
          month: string
          sum: number
        }[]
      }
      get_yearly_tax_report: {
        Args: { businessprofileid: number; year: number }
        Returns: {
          month: string
          sum: number
          pph: number
        }[]
      }
      topselling: {
        Args: { businessprofileid: number }
        Returns: {
          id: number
          product_name: string
          total_quantity_sold: number
        }[]
      }
      update_product_stock: {
        Args: { orderquantity: number; orderproductid: number }
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
