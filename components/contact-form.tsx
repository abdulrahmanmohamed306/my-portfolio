"use client";

import { useState } from "react";
import { profile } from "@/lib/site";

export function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  const field =
    "mt-1.5 w-full rounded-sm border border-rule-strong bg-sheet px-3 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-soft">
          Your name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-medium text-ink-soft">
          Your email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm font-medium text-ink-soft">
        Message
        <textarea name="message" rows={5} required className={field} placeholder="Tell me about the role or project." />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-sm bg-ledger px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ledger-dark"
        >
          Write the email
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          {opened
            ? "Your email app should be open with the message ready. Press Send there."
            : "This opens your email app with the message filled in."}
        </p>
      </div>
    </form>
  );
}
