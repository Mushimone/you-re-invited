export interface Configuration {
  id?: string;
  user_id: string;
  layout: number;
  title?: string;
  config: {
    subtitle?: string;
    mainContent?: string;
    image?: string | null;
  };
  created_at: string;
  slug?: string | null;
  published?: boolean;
}

export interface ConfigurationResponse {
  data: Configuration | null;
  error: string | null;
}
