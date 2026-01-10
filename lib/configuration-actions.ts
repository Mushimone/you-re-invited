"use server";

import { createAdminClient } from "@/utils/supabase/admin";

/**
 * Check if a slug is available for use
 * This runs on the server and can bypass RLS policies
 *
 * @param slug - The slug to check
 * @param userId - The current user's ID
 * @returns true if the slug is available, false if it's taken by another user
 */
export async function checkSlugAvailability(
  slug: string,
  userId: string
): Promise<boolean> {
  console.log("🟢 SERVER ACTION: checkSlugAvailability called", {
    slug,
    userId,
  });

  try {
    const supabase = createAdminClient();

    console.log("🟢 SERVER ACTION: Querying Supabase for slug:", slug);
    const { data, error } = await supabase
      .from("configurations")
      .select("id, user_id")
      .eq("slug", slug);

    console.log("🟢 SERVER ACTION: Query result:", {
      data,
      error,
      dataLength: data?.length,
    });

    if (error) {
      console.error("❌ SERVER ACTION: Error checking slug:", error);
      return false;
    }

    // If no configuration exists with this slug, it's available
    if (!data || data.length === 0) {
      console.log("✅ SERVER ACTION: Slug is AVAILABLE (no matches found)");
      return true;
    }

    // If the slug exists but belongs to the current user, it's available (they can reuse their own slug)
    const isOwner = data[0].user_id === userId;
    console.log("🟢 SERVER ACTION: Slug exists. Owner check:", {
      existingUserId: data[0].user_id,
      currentUserId: userId,
      isOwner,
    });

    return isOwner;
  } catch (error) {
    console.error("💥 SERVER ACTION: Exception caught:", error);
    return false;
  }
}
