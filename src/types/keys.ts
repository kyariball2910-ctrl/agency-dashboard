export type Provider =
  | "vercel"
  | "github"
  | "supabase"
  | "agentmail"
  | "openai"
  | "anthropic";

export type KeyStatus = "untested" | "ok" | "failed";

export interface PublicKeyInfo {
  provider: Provider;
  last4: string;
  status: KeyStatus;
  last_tested_at: string | null;
  last_error: string | null;
  meta: Record<string, string>;
}
