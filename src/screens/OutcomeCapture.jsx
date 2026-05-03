import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/Common";

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

const RECEIPT_IMAGE =
  "https://images.unsplash.com/photo-1731686602391-7484df33a03c?auto=format&fit=crop&w=600&q=80";

const DETECTED_ITEMS = [
  { name: "Pasta — Barilla 500g", qty: 1, price: "€0.99" },
  { name: "Olive oil — 1L", qty: 1, price: "€5.90" },
  { name: "Coffee beans — 500g", qty: 1, price: "€4.20" },
  { name: "Greek yogurt — 4-pack", qty: 1, price: "€2.49" },
  { name: "Bananas — 1kg", qty: 1, price: "€1.20" },
  { name: "Toilet paper — 12-pack", qty: 1, price: "€4.99" },
  { name: "Laundry detergent — 1.5L", qty: 1, price: "€6.49" },
  { name: "Children's cereal — 500g", qty: 1, price: "€2.99" },
];
const DETECTED_TOTAL = "€29.25";

// state: ask | picking | scanning-receipt | capturing-receipt | receipt-result | confirmed
export default function OutcomeCapture({ flow = "shelf", onDone }) {
  const [state, setState] = useState("ask");
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
  const onSnapReceipt = () => setState("scanning-receipt");
  const onCaptureReceipt = () => {
    setState("capturing-receipt");
    setTimeout(() => setState("receipt-result"), 900);
  };
  const onConfirmReceipt = () => {
    setConfirmation("Thanks Andrea — we've logged this trip. Clarity will use it to sharpen your next recommendations. +50 points.");
    setState("confirmed");
  };

  const framing = FRAMING[flow] || FRAMING.shelf;
  const heading = `${framing.prefix} ${framing.question}`;

  // Receipt scanner is a full-screen replacement
  if (state === "scanning-receipt" || state === "capturing-receipt") {
    return (
      <ReceiptScannerScreen
        capturing={state === "capturing-receipt"}
        onCapture={onCaptureReceipt}
        onBack={() => setState("ask")}
      />
    );
  }

  if (state === "receipt-result") {
    return (
      <ReceiptResultScreen
        onConfirm={onConfirmReceipt}
        onEdit={() => showToast("Edit not available for demo")}
        onBack={() => setState("scanning-receipt")}
        toast={toast}
      />
    );
  }

  return (
    <div className="relative min-h-full bg-white">
      <div className="flex items-center px-2 pt-3">
        <button
          onClick={onDone}
          aria-label="Back to Clarity"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="px-4 pb-5">
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
            <p className="text-[11px] text-slate-400 mt-3">Returning to Clarity…</p>
          </div>
        )}

        {state === "ask" && (
          <>
            <div className="my-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-slate-200" />
              <span className="text-[10.5px] font-bold tracking-widest text-slate-400">
                OR LET CLARITY VERIFY FOR YOU
              </span>
              <span className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              onClick={onSnapReceipt}
              data-testid="snap-receipt"
              className="w-full bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800 transition-colors fade-in-up"
            >
              <span className="w-12 h-12 rounded-xl bg-tiendeo-red/90 flex items-center justify-center shrink-0">
                <CameraIcon className="w-6 h-6 text-white" />
              </span>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-extrabold leading-tight">
                  Snap your receipt
                </p>
                <p className="text-[12px] text-slate-300 mt-0.5">
                  Clarity will match every item automatically
                </p>
              </div>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => showToast("Coming soon")}
              className="mt-2 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-slate-700 flex items-center justify-center gap-2"
            >
              <span>💳</span> Or connect your CardPlus loyalty card
            </button>
          </>
        )}

        {toast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[12px] px-4 py-2 rounded-full shadow-lg fade-in-up">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

function ReceiptScannerScreen({ capturing, onCapture, onBack }) {
  return (
    <div className="bg-white">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center -ml-1"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[16px] font-bold text-slate-900 flex-1">Snap your receipt</h1>
      </div>

      <div className="px-4 py-5">
        <div
          className="relative bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden mx-auto"
          style={{ height: 380 }}
        >
          {/* Receipt-shaped reticle (taller than wide) */}
          <div
            className={`reticle border-2 ${capturing ? "border-tiendeo-red" : "border-white/80"} rounded-md relative`}
            style={{ width: "55%", height: "82%" }}
          >
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((p, i) => (
              <div
                key={i}
                className={`absolute ${p} w-4 h-4`}
                style={{
                  borderTop: p.includes("top") ? "2px solid #E51E2C" : "none",
                  borderBottom: p.includes("bottom") ? "2px solid #E51E2C" : "none",
                  borderLeft: p.includes("left") ? "2px solid #E51E2C" : "none",
                  borderRight: p.includes("right") ? "2px solid #E51E2C" : "none",
                }}
              />
            ))}
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-slate-300 text-[12px]">
            {capturing ? "Reading receipt…" : "Fit the entire receipt in the frame"}
          </p>
        </div>

        <div className="mt-5">
          <PrimaryButton onClick={onCapture} full>
            {capturing ? "Capturing…" : "Tap to capture"}
          </PrimaryButton>
        </div>

        <p className="text-[11px] text-slate-400 mt-3 text-center italic">
          Demo only — capture is simulated
        </p>
      </div>
    </div>
  );
}

function ReceiptResultScreen({ onConfirm, onEdit, onBack, toast }) {
  return (
    <div className="bg-white relative">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center -ml-1"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[16px] font-bold text-slate-900 flex-1">Receipt captured</h1>
      </div>

      <div className="px-4 py-4 space-y-4 fade-in-up">
        {/* Captured receipt thumbnail */}
        <div className="flex items-start gap-3 bg-slate-50 rounded-2xl p-3">
          <div className="w-20 h-28 bg-white shrink-0 overflow-hidden border border-slate-200">
            <img
              src={RECEIPT_IMAGE}
              alt="Captured receipt"
              className="object-cover w-full h-full"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Capture successful
            </p>
            <p className="text-[14px] font-extrabold text-slate-900 mt-1 leading-tight">
              {DETECTED_ITEMS.length} items detected
            </p>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Total <span className="font-bold text-slate-900">{DETECTED_TOTAL}</span>
            </p>
          </div>
        </div>

        {/* Detected items list */}
        <div>
          <p className="text-[12px] font-bold text-slate-700 mb-2">
            Review the items Clarity found
          </p>
          <ul className="border border-slate-200 rounded-xl divide-y divide-slate-100">
            {DETECTED_ITEMS.map((item, i) => (
              <li key={i} className="flex items-center justify-between px-3 py-2.5 text-[13px]">
                <div className="flex items-center gap-2 min-w-0">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-semibold text-slate-900 truncate">{item.name}</span>
                  {item.qty > 1 && (
                    <span className="text-slate-500 text-[11px]">×{item.qty}</span>
                  )}
                </div>
                <span className="text-slate-700 font-semibold shrink-0 ml-3">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onConfirm}
            className="flex-1 bg-tiendeo-red hover:bg-tiendeo-redDark text-white font-bold text-[14px] py-3 rounded-full transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={onEdit}
            className="px-5 border border-tiendeo-red text-tiendeo-red font-bold text-[14px] py-3 rounded-full bg-white hover:bg-tiendeo-redTint transition-colors"
          >
            Edit list
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[12px] px-4 py-2 rounded-full shadow-lg fade-in-up z-30">
          {toast}
        </div>
      )}
    </div>
  );
}

function CameraIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 8h2.5l1.5-2h6l1.5 2H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}
