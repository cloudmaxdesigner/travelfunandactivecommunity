import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/site.functions";

export function NewsletterForm() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("loading");
        setError(null);
        try {
          await subscribe({ data: { email } });
          setStatus("ok");
          setEmail("");
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm text-cream placeholder-cream/50 outline-none focus:border-sunset"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-sunset px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sunset/90 disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Join"}
      </button>
      {status === "ok" && <p className="text-xs text-amber sm:w-full">Thanks — you're on the list.</p>}
      {status === "error" && <p className="text-xs text-destructive sm:w-full">{error}</p>}
    </form>
  );
}
