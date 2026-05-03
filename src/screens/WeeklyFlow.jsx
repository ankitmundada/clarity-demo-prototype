import { useState } from "react";
import {
  ScreenHeader,
  PersonaBanner,
  PrimaryButton,
  OutlineButton,
  ClarityMark,
  TagChip,
} from "../components/Common";
import { PERSONAS, WEEKLY } from "../data";

export default function WeeklyFlow({ onComplete, onBack }) {
  const [bannerOn, setBannerOn] = useState(true);
  const [checked, setChecked] = useState({});

  const toggle = (i) =>
    setChecked((s) => ({ ...s, [i]: !s[i] }));

  return (
    <div>
      {bannerOn && (
        <PersonaBanner
          text={`${PERSONAS.weekly.name} ${PERSONAS.weekly.context}`}
          onDismiss={() => setBannerOn(false)}
        />
      )}
      <ScreenHeader title="Your weekly shop, optimized" onBack={onBack} />

      <div className="px-4 py-4 space-y-4">
        <p className="text-[12px] text-slate-500 -mt-1">
          Across 4 retailers in Barcelona · Updated 2 minutes ago
        </p>

        {/* Info banner */}
        <div className="bg-slate-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
          <ClarityMark className="w-4 h-4 text-tiendeo-red mt-0.5 shrink-0" />
          <p className="text-[12px] text-slate-700 italic leading-relaxed">
            Built from your last 6 weeks of shopping, your dietary preferences (low-sugar), and your household size (4)
          </p>
        </div>

        {/* Items */}
        <ul className="space-y-2">
          {WEEKLY.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2.5"
            >
              <button
                onClick={() => toggle(i)}
                className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition ${
                  checked[i]
                    ? "bg-tiendeo-red border-tiendeo-red"
                    : "border-slate-300 bg-white"
                }`}
              >
                {checked[i] && (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <div className="w-12 h-12 bg-slate-100 shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="object-cover w-full h-full"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-bold leading-tight ${checked[i] ? "line-through text-slate-400" : "text-slate-900"}`}>
                  {item.name}
                </p>
                <p className="text-[12px] mt-0.5">
                  <span className="font-bold text-slate-900">{item.retailer}</span>
                  <span className="text-tiendeo-red font-bold"> · {item.price}</span>
                </p>
                <div className="mt-1">
                  <TagChip tone={item.tagTone}>{item.tag}</TagChip>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Totals strip */}
        <div className="bg-slate-50 rounded-xl px-4 py-3 flex justify-between items-center">
          <div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Total</p>
            <p className="text-[18px] font-extrabold text-slate-900">{WEEKLY.total}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Saving</p>
            <p className="text-[18px] font-extrabold text-emerald-600">{WEEKLY.saving}</p>
            <p className="text-[10px] text-slate-400 italic">vs. single-retailer shop</p>
          </div>
        </div>

        {/* Clarity's plan */}
        <div className="bg-tiendeo-redTint rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ClarityMark className="w-4 h-4 text-tiendeo-red" />
            <span className="text-[14px] font-extrabold text-slate-900">
              Clarity's plan for this week
            </span>
          </div>
          <p className="text-[13px] text-slate-800 italic leading-relaxed">
            "{WEEKLY.plan}"
          </p>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 pt-1 pb-4">
          <PrimaryButton onClick={onComplete} className="flex-1">
            Looks good — start the trip
          </PrimaryButton>
          <OutlineButton onClick={onComplete} className="px-4">
            Adjust the list
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}
