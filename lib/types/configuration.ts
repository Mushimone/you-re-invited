export interface Configuration {
  id: string;
  user_id: string;
  layout: number;
  config: {
    title?: string;
    subtitle?: string;
    mainContent?: string;
    image?: string;
  };
  created_at: string;
}

export interface ConfigurationResponse {
  data: Configuration | null;
  error: string | null;
}
