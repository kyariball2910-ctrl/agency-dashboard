"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partner = searchParams.get("partner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { partner_code: partner ?? null } },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/leads");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4 rounded-xl border p-6">
        <div>
          <h1 className="text-xl font-semibold">Create account</h1>
          {partner && <p className="text-sm text-green-600 mt-1">Partner invite accepted</p>}
        </div>
        <input type="email" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Password (6+ characters)" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-md bg-black px-3 py-2 text-sm text-white disabled:opacity-50">{loading ? "Creating\u2026" : "Sign up"}</button>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <a href="/login" className="underline">Log in</a></p>
      </form>
    </div>
  );
}
