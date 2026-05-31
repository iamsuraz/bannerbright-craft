import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/settings")({ component: Settings });

function Settings() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const e = data.user?.email ?? "";
      setCurrentEmail(e);
      setEmail(e);
    });
  }, []);

  async function updateEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email || email === currentEmail) return toast.error("Enter a new email address.");
    setLoadingEmail(true);
    const { error } = await supabase.auth.updateUser({ email });
    setLoadingEmail(false);
    if (error) return toast.error(error.message);
    toast.success("Confirmation email sent. Check both inboxes to confirm the change.");
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    setLoadingPwd(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoadingPwd(false);
    if (error) return toast.error(error.message);
    setPassword(""); setConfirm("");
    toast.success("Password updated.");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl uppercase">Account Settings</h1>
      <p className="text-muted-foreground mt-2">Update the admin sign-in email and password.</p>

      <form onSubmit={updateEmail} className="bg-white rounded-lg shadow-card border-t-4 border-brand-blue p-6 mt-6 space-y-4">
        <h2 className="font-display text-xl uppercase">Change Email</h2>
        <div className="text-xs text-muted-foreground">Current: <span className="font-semibold">{currentEmail || "—"}</span></div>
        <div>
          <label className="text-sm font-semibold">New Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 border rounded p-2" />
        </div>
        <button disabled={loadingEmail} className="bg-cta text-brand-navy py-2 px-5 rounded font-bold uppercase text-sm disabled:opacity-50">
          {loadingEmail ? "Updating…" : "Update Email"}
        </button>
      </form>

      <form onSubmit={updatePassword} className="bg-white rounded-lg shadow-card border-t-4 border-brand-yellow p-6 mt-6 space-y-4">
        <h2 className="font-display text-xl uppercase">Change Password</h2>
        <div>
          <label className="text-sm font-semibold">New Password</label>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 border rounded p-2" />
        </div>
        <div>
          <label className="text-sm font-semibold">Confirm Password</label>
          <input type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full mt-1 border rounded p-2" />
        </div>
        <button disabled={loadingPwd} className="bg-cta text-brand-navy py-2 px-5 rounded font-bold uppercase text-sm disabled:opacity-50">
          {loadingPwd ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
