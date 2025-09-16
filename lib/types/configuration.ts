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
}

export interface ConfigurationResponse {
  data: Configuration | null;
  error: string | null;
}
