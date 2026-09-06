import { supabase } from "@/integrations/supabase/client";

export const NEWS_BUCKET = "news-images";

/** Resolve stored image paths into temporary viewable links. */
export async function resolveNewsImages(paths: string[]): Promise<Record<string, string>> {
  const unique = Array.from(new Set(paths.filter(Boolean)));
  if (unique.length === 0) return {};
  const { data } = await supabase.storage.from(NEWS_BUCKET).createSignedUrls(unique, 60 * 60 * 24 * 7);
  const map: Record<string, string> = {};
  (data ?? []).forEach((item, index) => {
    const path = item.path ?? unique[index];
    if (path && item.signedUrl) map[path] = item.signedUrl;
  });
  return map;
}

export async function uploadNewsImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(NEWS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return path;
}
