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
  const [qty, setQty] = useState({});
  const [toast, setToast] = useState(null);

  const toggle = (k) => setChecked((s) => ({ ...s, [k]: !s[k] }));
  const setQ = (k, n) => setQty((s) => ({ ...s, [k]: Math.max(1, n) }));
  const getQ = (k) => qty[k] ?? 1;
  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="relative">
      {bannerOn && (
        <PersonaBanner
          text={`${PERSONAS.weekly.name} ${PERSONAS.weekly.context}`}
          onDismiss={() => setBannerOn(false)}
        />
      )}
      <ScreenHeader title="Your weekly shop, optimized" onBack={onBack} />

      <div className="px-4 pt-3 pb-4">
        {/* Top totals strip — Tiendeo savings list pattern */}
        <div className="flex items-center justify-end mb-3">
          <div className="text-right">
            <p className="text-[14px] text-slate-700">
              total <span className="font-extrabold text-slate-900">{WEEKLY.total}</span>
            </p>
            <p className="text-[14px] text-slate-700">
              saving <span className="font-extrabold text-emerald-600">{WEEKLY.saving}</span>
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-tiendeo-redTint rounded-xl px-3 py-2.5 flex items-start gap-2 mb-4">
          <ClarityMark className="w-4 h-4 text-tiendeo-red mt-0.5 shrink-0" />
          <p className="text-[12px] text-slate-800 italic leading-relaxed">
            Built from your last 6 weeks of shopping, your dietary preferences (low-sugar), and your household size (4)
          </p>
        </div>

        {/* Store groups */}
        <div className="space-y-5">
          {WEEKLY.groups.map((group) => (
            <StoreGroup
              key={group.retailer}
              group={group}
              checked={checked}
              toggle={toggle}
              getQ={getQ}
              setQ={setQ}
            />
          ))}
        </div>

        {/* Clarity's plan */}
        <div className="bg-tiendeo-redTint rounded-2xl p-4 mt-6">
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
        <div className="flex gap-2 pt-4">
          <PrimaryButton onClick={onComplete} className="flex-1">
            Looks good — start the trip
          </PrimaryButton>
          <OutlineButton
            onClick={() => showToast("Not available for demo")}
            className="px-4"
          >
            Adjust the list
          </OutlineButton>
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

function StoreGroup({ group, checked, toggle, getQ, setQ }) {
  return (
    <div>
      {/* Store header — Tiendeo pattern */}
      <div className="flex items-center gap-3 mb-1">
        <div
          className={`w-9 h-9 rounded-full ${group.logoBg} border border-slate-200 flex items-center justify-center shrink-0`}
        >
          <span className={`text-[10px] font-extrabold ${group.logoText}`}>
            {group.retailer.slice(0, 4).toLowerCase()}
          </span>
        </div>
        <h3 className="text-[18px] font-extrabold text-slate-900 flex-1">
          {group.retailer}
        </h3>
        <button
          aria-label="Share"
          className="w-7 h-7 flex items-center justify-center text-tiendeo-red"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="18" cy="18" r="2.5" />
            <path d="M8.2 11l7.6-3.8M8.2 13l7.6 3.8" strokeLinecap="round" />
          </svg>
        </button>
        <button
          aria-label="Remove"
          className="w-7 h-7 flex items-center justify-center text-slate-500"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Sub-line: address + distance */}
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[12.5px] text-slate-500 leading-snug">
          {group.address} · <span className="text-slate-700">{group.distance}</span>
        </p>
      </div>

      {/* Items */}
      <ul className="space-y-2.5">
        {group.items.map((item) => {
          const k = `${group.retailer}-${item.name}`;
          return (
            <li key={k} className="flex items-start gap-3">
              <button
                onClick={() => toggle(k)}
                className={`mt-1 w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition ${
                  checked[k]
                    ? "bg-tiendeo-red border-tiendeo-red"
                    : "border-slate-300 bg-white"
                }`}
              >
                {checked[k] && (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <div className="w-16 h-16 bg-slate-100 shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="object-cover w-full h-full"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className={`text-[13px] font-bold leading-tight ${checked[k] ? "line-through text-slate-400" : "text-slate-900"}`}>
                  {item.name}
                </p>
                <p className="text-[14px] mt-1 leading-none">
                  <span className="text-tiendeo-red font-bold">{item.price}</span>
                  {item.original && (
                    <span className="text-slate-400 line-through ml-2 text-[12px]">{item.original}</span>
                  )}
                </p>
                <div className="mt-1.5">
                  <TagChip tone={item.tagTone}>{item.tag}</TagChip>
                </div>
              </div>
              <QtyStepper value={getQ(k)} onChange={(n) => setQ(k, n)} />
            </li>
          );
        })}
      </ul>

      {/* Per-store totals */}
      <div className="text-right mt-3 space-y-0.5">
        <p className="text-[13px] text-slate-700">
          total <span className="font-extrabold text-slate-900">{group.total}</span>
        </p>
        {group.saving && (
          <p className="text-[13px] text-slate-700">
            saving <span className="font-extrabold text-emerald-600">{group.saving}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function QtyStepper({ value, onChange }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-100 rounded-md px-1.5 py-1 shrink-0">
      <button
        onClick={() => onChange(value - 1)}
        className="w-5 h-5 flex items-center justify-center text-slate-700 font-bold leading-none"
      >
        −
      </button>
      <span className="text-[13px] font-bold text-slate-900 w-3 text-center">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-5 h-5 flex items-center justify-center text-slate-700 font-bold leading-none"
      >
        +
      </button>
    </div>
  );
}
