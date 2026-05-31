import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` }
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. You can sign in now.");
      setMode("login");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate({ to: "/admin" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-lg p-8 shadow-glow border-t-4 border-brand-yellow space-y-4">
        <h1 className="font-display text-2xl uppercase">Admin {mode === "login" ? "Sign In" : "Sign Up"}</h1>
        <p className="text-xs text-muted-foreground">The first registered account becomes the site administrator.</p>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 border rounded p-2" />
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 border rounded p-2" />
        </div>
        <button disabled={loading} className="w-full bg-cta text-brand-navy py-3 rounded font-bold uppercase text-sm disabled:opacity-50">
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="w-full text-sm text-brand-blue underline">
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
