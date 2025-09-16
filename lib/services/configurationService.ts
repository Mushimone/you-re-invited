import { Configuration, ConfigurationResponse } from "../types/configuration";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/supabaseClient";

class ConfigurationService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient();
  }

  async getConfigurationByUserId(
    userId: string
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
      return {
        data: null,
        error: (error as Error).message || "An unknown error occurred",
      };
    }
  }

  async createConfiguration(
    configData: Configuration,
    userId: string
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
    configData: Partial<Configuration>
  ): Promise<ConfigurationResponse> {
    try {
      const { data, error } = await this.supabase
        .from("configurations")
        .update({ ...configData })
        .eq("id", configData.id)
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
  async uploadImage(file: File, userId: string): Promise<string | null> {
    try {
      const filePath = `configurations/${userId}/${Date.now()}-${file.name}`;
      const { data, error } = await this.supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        throw new Error(error.message);
      }
      const {
        data: { publicUrl },
      } = this.supabase.storage.from("images").getPublicUrl(filePath);

      return { url: publicUrl, error: null }.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }
}
export const configurationService = new ConfigurationService();
