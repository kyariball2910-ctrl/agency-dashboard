import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">Agency Dashboard</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Lead pipeline with encrypted API key vault, email outreach, and AI chat.
      </p>
      <div className="flex gap-3">
        <Link href="/signup" className="rounded-md bg-black px-4 py-2 text-sm text-white">
          Sign up
        </Link>
        <Link href="/login" className="rounded-md border px-4 py-2 text-sm">
          Log in
        </Link>
        <Link href="/admin" className="rounded-md border px-4 py-2 text-sm">
          Admin
        </Link>
      </div>
    </div>
  );
}
