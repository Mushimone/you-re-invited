export interface Configuration {
  id?: string;
  user_id: string;
  layout: number;
  title?: string;
  config: {
    // Personal Info
    deceased_name?: string;
    epitaph?: string;
    date_of_birth?: string;
    date_of_death?: string;
    // Media
    profile_image?: string | null;
    bg_image?: string | null;
    gallery_images?: string[] | null;
    video_url?: string | null;
    music_url?: string | null;
    visibility?: {
      deceased_name?: boolean;
      epitaph?: boolean;
      date_of_birth?: boolean;
      date_of_death?: boolean;
      profile_image?: boolean;
      bg_image?: boolean;
      gallery_images?: boolean;
      video_url?: boolean;
      music_url?: boolean;
    };
  };
  created_at: string;
  slug?: string | null;
  published?: boolean;
}

export interface ConfigurationResponse {
  data: Configuration | null;
  error: string | null;
}
