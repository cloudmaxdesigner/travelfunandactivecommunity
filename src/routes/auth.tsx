import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import logo from "@/assets/tfac-logo.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign in — TFAC" },
      { name: "description", content: "TFAC administrator sign in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 lg:py-28">
        <img src={logo.url} alt="" className="h-16 w-16 rounded-full object-cover" width={64} height={64} />
        <h1 className="mt-6 font-display text-3xl font-semibold text-navy">Admin sign in</h1>
        <p className="mt-2 text-center text-sm text-navy/70">
          Team access only. The founder email is auto-granted admin on first sign-up.
        </p>

        <form
          className="mt-8 w-full rounded-2xl border border-border/60 bg-cream/40 p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr(null);
            setLoading(true);
            try {
              if (mode === "signin") {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
              } else {
                const { error } = await supabase.auth.signUp({
                  email,
                  password,
                  options: { emailRedirectTo: window.location.origin + "/admin" },
                });
                if (error) throw error;
              }
              navigate({ to: "/admin" });
            } catch (er) {
              setErr(er instanceof Error ? er.message : "Sign-in failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-navy">Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          <label className="mt-3 flex flex-col gap-1 text-sm">
            <span className="font-medium text-navy">Password</span>
            <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
          {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
          <button disabled={loading} className="mt-5 w-full rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-navy/90 disabled:opacity-60">
            {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-3 w-full text-xs text-navy/70 hover:text-sunset">
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </form>
        <Link to="/" className="mt-6 text-sm text-navy/60 hover:text-sunset">← Back to site</Link>
      </div>
    </SiteLayout>
  );
}
