import { useEffect, useState } from "react";

const FRAMING = {
  shelf: { prefix: "Quick check —", question: "what did you actually buy?" },
  weekly: { prefix: "Quick check —", question: "how did this week's trip go?" },
  considered: { prefix: "Quick check —", question: "did you end up buying it?" },
};

const ALT_PICKS = {
  shelf: ["Mutti Pomodoro & Basilico", "Barilla Sugo Naturale", "Cirio Rustica", "Other store brand", "Other"],
  weekly: ["Made all the swaps", "Skipped a couple of items", "Used a different store", "Other"],
  considered: ["Hisense U7N", "TCL C805", "Samsung Q60D", "A different model", "Other"],
};

export default function OutcomeCapture({ flow = "shelf", onDone }) {
  const [state, setState] = useState("ask"); // ask | picking | confirmed
  const [confirmation, setConfirmation] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (state !== "confirmed") return;
    const t = setTimeout(() => onDone(), 2000);
    return () => clearTimeout(t);
  }, [state, onDone]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const onRecommended = () => {
    setConfirmation("Got it. Clarity learned from this trip. +50 points.");
    setState("confirmed");
  };
  const onDifferent = () => setState("picking");
  const onNothing = () => {
    setConfirmation("No problem. We'll check in next time.");
    setState("confirmed");
  };
  const pick = () => {
    setConfirmation("Thanks — knowing what you actually picked makes our next recommendation better.");
    setState("confirmed");
  };

  const framing = FRAMING[flow] || FRAMING.shelf;
  const heading = `${framing.prefix} ${framing.question}`;

  return (
    <div className="px-4 py-5 relative min-h-full bg-white">
      <div className="text-center mb-5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-[20px] font-extrabold text-slate-900 leading-tight">
          {heading}
        </h1>
        <p className="text-[13px] text-slate-500 mt-1.5 italic">
          This helps Clarity get sharper next time.
        </p>
      </div>

      {state === "ask" && (
        <div className="space-y-3 fade-in-up">
          <button
            onClick={onRecommended}
            data-testid="outcome-recommended"
            className="w-full text-left bg-tiendeo-redTint border border-tiendeo-red/30 hover:border-tiendeo-red rounded-2xl p-4 flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-full bg-tiendeo-red text-white flex items-center justify-center font-bold">✓</span>
            <span className="font-bold text-slate-900 text-[14px]">
              I bought what Clarity recommended
            </span>
          </button>
          <button
            onClick={onDifferent}
            data-testid="outcome-different"
            className="w-full text-left bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-4 flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-lg">🔄</span>
            <span className="font-bold text-slate-900 text-[14px]">
              I bought something different
            </span>
          </button>
          <button
            onClick={onNothing}
            data-testid="outcome-nothing"
            className="w-full text-left bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-4 flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-lg">⏸</span>
            <span className="font-bold text-slate-900 text-[14px]">
              Didn't buy anything this trip
            </span>
          </button>
        </div>
      )}

      {state === "picking" && (
        <div className="space-y-2 fade-in-up">
          <p className="text-[13px] text-slate-600 mb-2">What did you pick instead?</p>
          {(ALT_PICKS[flow] || ALT_PICKS.shelf).map((p) => (
            <button
              key={p}
              onClick={pick}
              className="w-full text-left bg-white border border-slate-200 hover:border-tiendeo-red rounded-xl px-4 py-3 text-[14px] font-semibold text-slate-800"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {state === "confirmed" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center scale-in">
          <div className="w-12 h-12 rounded-full bg-tiendeo-red flex items-center justify-center mx-auto mb-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[14px] font-bold text-slate-900 leading-relaxed">
            {confirmation}
          </p>
          <p className="text-[11px] text-slate-400 mt-3">Returning to DECIDE…</p>
        </div>
      )}

      {state === "ask" && (
        <div className="mt-8 pt-5 border-t border-slate-100">
          <p className="text-[12px] font-bold text-slate-700 mb-3">
            Other ways Clarity verifies:
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => showToast("Coming soon")}
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-slate-700 flex items-center justify-center gap-2"
            >
              <span>💳</span> Connect CardPlus
            </button>
            <button
              onClick={() => showToast("Coming soon")}
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-slate-700 flex items-center justify-center gap-2"
            >
              <span>📷</span> Snap a receipt
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[12px] px-4 py-2 rounded-full shadow-lg fade-in-up">
          {toast}
        </div>
      )}
    </div>
  );
}
