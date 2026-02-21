import { Configuration, ConfigurationResponse } from "../types/configuration";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/supabaseClient";

class ConfigurationService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient();
  }

  async getConfigurationByUserId(
    userId: string,
  ): Promise<ConfigurationResponse> {
    try {
      const { data, error } = await this.supabase
        .from("configurations")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        data,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching configuration:", error);
      return {
        data: null,
        error: (error as Error).message || "An unknown error occurred",
      };
    }
  }

  async createConfiguration(
    configData: Configuration,
    userId: string,
  ): Promise<ConfigurationResponse> {
    try {
      const { data, error } = await this.supabase
        .from("configurations")
        .insert([
          {
            ...configData,
            user_id: userId,
          },
        ])
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message || "An unknown error occurred",
      };
    }
  }

  async updateConfiguration(
    configData: Partial<Configuration>,
  ): Promise<ConfigurationResponse> {
    try {
      const { data, error } = await this.supabase
        .from("configurations")
        .update({ ...configData })
        .eq("id", configData.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message || "An unknown error occurred",
      };
    }
  }

  async deleteConfiguration(configId: string): Promise<ConfigurationResponse> {
    try {
      const { data, error } = await this.supabase
        .from("configurations")
        .delete()
        .eq("id", configId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message || "An unknown error occurred",
      };
    }
  }
  async uploadMedia(
    file: File,
    bucket: string,
    userId: string,
  ): Promise<string | null> {
    try {
      const filePath = `${userId}/${Date.now()}-${file.name}`;
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) {
        throw new Error(error.message);
      }
      const {
        data: { publicUrl },
      } = this.supabase.storage.from(bucket).getPublicUrl(filePath);

      return { url: publicUrl, error: null }.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }

  async checkSlugAvailability(slug: string, userId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from("configurations")
        .select("id, user_id")
        .eq("slug", slug);

      if (error) {
        throw new Error(error.message);
      }

      if (data.length === 0) {
        return true;
      }

      const existingConfig = data[0];
      console.log(
        "Existing config for slug:",
        existingConfig,
        "User ID:",
        userId,
      );
      return existingConfig.user_id === userId;
    } catch (error) {
      console.error("Error checking slug availability:", error);
      return false;
    }
  }
}

export const configurationService = new ConfigurationService();
