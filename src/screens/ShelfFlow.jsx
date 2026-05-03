import { useState } from "react";
import {
  ScreenHeader,
  PersonaBanner,
  ScoreBadge,
  PrimaryButton,
  OutlineButton,
  ClarityMark,
  TagChip,
  SectionHeader,
} from "../components/Common";
import { PERSONAS, SHELF } from "../data";

export default function ShelfFlow({ onComplete, onBack }) {
  const [step, setStep] = useState("scan"); // scan | scanning | result
  const [bannerOn, setBannerOn] = useState(true);
  const [whyOpen, setWhyOpen] = useState(false);

  const startScan = () => {
    setStep("scanning");
    setTimeout(() => setStep("result"), 700);
  };

  return (
    <div className="bg-white">
      {bannerOn && (
        <PersonaBanner
          text={`${PERSONAS.shelf.name} ${PERSONAS.shelf.context}`}
          onDismiss={() => setBannerOn(false)}
        />
      )}
      {step !== "result" ? (
        <>
          <ScreenHeader title="Scan to decide" onBack={onBack} />
          <ScannerScreen scanning={step === "scanning"} onScan={startScan} />
        </>
      ) : (
        <>
          <ScreenHeader title="Casa Verdi — Tomato & Basil Sauce" onBack={onBack} />
          <ResultScreen
            whyOpen={whyOpen}
            onToggleWhy={() => setWhyOpen((v) => !v)}
            onComplete={onComplete}
          />
        </>
      )}
    </div>
  );
}

function ScannerScreen({ scanning, onScan }) {
  return (
    <div className="px-4 py-5">
      <div className="relative bg-slate-900 rounded-2xl aspect-[3/4] flex items-center justify-center overflow-hidden">
        <div className={`reticle border-2 border-white/80 rounded-2xl ${scanning ? "border-tiendeo-red" : ""}`} style={{ width: "70%", height: "55%" }}>
          {/* Corner accents */}
          <div className="absolute inset-0">
            {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((p, i) => (
              <div key={i} className={`absolute ${p} w-4 h-4 border-tiendeo-red`} style={{
                borderTop: p.includes("top") ? "2px solid" : "none",
                borderBottom: p.includes("bottom") ? "2px solid" : "none",
                borderLeft: p.includes("left") ? "2px solid" : "none",
                borderRight: p.includes("right") ? "2px solid" : "none",
              }} />
            ))}
          </div>
        </div>
        <p className="absolute bottom-4 left-0 right-0 text-center text-slate-300 text-[12px]">
          {scanning ? "Scanning…" : "Center the barcode"}
        </p>
      </div>
      <div className="mt-5">
        <PrimaryButton onClick={onScan} full>
          {scanning ? "Scanning…" : "Tap to scan"}
        </PrimaryButton>
      </div>
    </div>
  );
}

function ResultScreen({ whyOpen, onToggleWhy, onComplete }) {
  const { product, score, alternatives } = SHELF;
  return (
    <div className="px-4 py-4 space-y-4 fade-in-up">
      {/* Product card */}
      <div>
        <div className="w-full bg-slate-50 rounded-2xl overflow-hidden h-56 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
        <h2 className="mt-3 text-[15px] font-extrabold text-slate-900 leading-snug">
          {product.name}, {product.size}
        </h2>
        <p className="text-[14px] mt-1">
          <span className="text-tiendeo-red font-bold">{product.price}</span>{" "}
          <span className="text-slate-500">at {product.retailer}</span>
        </p>
      </div>

      {/* Score block */}
      <div className="bg-amber-100 rounded-2xl p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-black text-amber-700 leading-none">
            {score.value}
          </span>
          <span className="text-[14px] text-amber-700 font-bold">/ 100</span>
          <span className="ml-auto text-amber-800 font-bold text-[14px]">{score.label}</span>
        </div>
        <p className="text-[13px] text-amber-900 mt-2 leading-snug">{score.summary}</p>
      </div>

      {/* Why this score */}
      <div className="border border-slate-200 rounded-2xl">
        <button
          onClick={onToggleWhy}
          className="w-full px-4 py-3 flex items-center justify-between"
          data-testid="why-toggle"
        >
          <span className="text-[14px] font-bold text-slate-900">Why this score</span>
          <svg viewBox="0 0 24 24" className={`w-4 h-4 text-slate-500 transition-transform ${whyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" />
          </svg>
        </button>
        {whyOpen && (
          <ul className="px-4 pb-3 space-y-1.5">
            {score.reasons.map((r, i) => (
              <li key={i} className="text-[13px] text-slate-700 flex justify-between gap-3">
                <span>{r.text}</span>
                {r.flag && (
                  <span className={`italic shrink-0 ${
                    r.flag === "positive" ? "text-emerald-600" : "text-amber-700"
                  }`}>
                    {r.flag}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Personalization callout */}
      <div className="bg-tiendeo-redTint border-l-4 border-tiendeo-red rounded-r-2xl rounded-l p-4">
        <div className="flex items-start gap-2">
          <ClarityMark className="w-4 h-4 text-tiendeo-red mt-0.5 shrink-0" />
          <p className="text-[13px] text-slate-800 italic leading-relaxed">
            "Andrea, you flagged 'low-sodium' as a household priority. This product is high in sodium."
          </p>
        </div>
      </div>

      {/* Alternatives */}
      <div className="pt-2">
        <SectionHeader title="3 better alternatives near you" action="Why these?" />
        <div className="space-y-2.5">
          {alternatives.map((a, i) => (
            <AltCard key={i} alt={a} />
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-2 pt-2 pb-4">
        <PrimaryButton
          onClick={onComplete}
          className="flex-1"
        >
          I'll go with an alternative
        </PrimaryButton>
        <OutlineButton onClick={onComplete} className="px-4">
          Stick with original
        </OutlineButton>
      </div>
    </div>
  );
}

function AltCard({ alt }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2.5">
      <div className="w-16 h-16 bg-slate-100 shrink-0 overflow-hidden">
        <img
          src={alt.image}
          alt=""
          className="object-cover w-full h-full"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-slate-900 leading-tight">{alt.name}</p>
        <div className="mt-1">
          <ScoreBadge value={alt.score} label={alt.label} tone={alt.tone} size="sm" />
        </div>
        <p className="text-[12px] mt-1">
          <span className="text-tiendeo-red font-bold">{alt.price}</span>
          <span className="text-slate-500"> — {alt.retailer}</span>
        </p>
        <p className="text-[11px] text-slate-500 italic mt-0.5">{alt.tag}</p>
      </div>
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
