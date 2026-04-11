"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SubmitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [prUrl, setPrUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({ playerName: "", evidence: "", submittedBy: "" });

  const allFilled = Object.values(fields).every((v) => v.trim() !== "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const payload = {
      playerName: fd.get("playerName"),
      reason: "",
      description: "",
      evidence: fd.get("evidence"),
      submittedBy: fd.get("submittedBy"),
    };

    const res = await fetch("/api/submit-ban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      setPrUrl(data.pr);
      setStatus("success");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Something went wrong. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full border-2 border-[#FF2D6E] py-12 px-6 text-center">
        <span className="block font-bold text-[28px] text-[#FF2D6E] uppercase tracking-wide">
          Submission received
        </span>
        <span className="block text-[#FF2D6E] mt-2 italic">
          Your ban request has been submitted for review.
        </span>
        <a
          href={prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-2 border-2 border-[#FF2D6E] text-[#FF2D6E] text-sm uppercase tracking-widest hover:bg-[#FF2D6E] hover:text-[#141414] transition-colors"
        >
          View PR
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF2D6E]/60">Player to ban</span>
        <input
          name="playerName"
          type="text"
          placeholder="Player name (exact, as it appears in-game)"
          required
          value={fields.playerName}
          onChange={(e) => setFields((f) => ({ ...f, playerName: e.target.value }))}
          className="w-full px-4 py-4 text-base bg-transparent text-[#FF2D6E] placeholder-[#FF2D6E]/60 border-2 border-[#FF2D6E] outline-none"
        />
        <textarea
          name="evidence"
          placeholder="Evidence — tournament results or community banlist links"
          required
          rows={4}
          value={fields.evidence}
          onChange={(e) => setFields((f) => ({ ...f, evidence: e.target.value }))}
          className="w-full px-4 py-3 text-base bg-transparent text-[#FF2D6E] placeholder-[#FF2D6E]/60 border-2 border-[#FF2D6E] outline-none resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF2D6E]/60">Reporter information</span>
        <input
          name="submittedBy"
          type="text"
          placeholder="Your in-game name (for confirmation purposes)"
          required
          value={fields.submittedBy}
          onChange={(e) => setFields((f) => ({ ...f, submittedBy: e.target.value }))}
          className="w-full px-4 py-4 text-base bg-transparent text-[#FF2D6E] placeholder-[#FF2D6E]/60 border-2 border-[#FF2D6E] outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-[#FF2D6E] border-2 border-[#FF2D6E] px-4 py-3 text-sm">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!allFilled || status === "loading"}
        className="w-full py-4 border-2 border-[#FF2D6E] text-[#FF2D6E] uppercase tracking-widest font-bold text-base cursor-pointer hover:enabled:bg-[#FF2D6E] hover:enabled:text-[#141414] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting…" : "Submit ban request"}
      </button>
    </form>
  );
}
