// Shared small UI primitives
export function SectionHeader({ icon, title, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <h2 className="text-[18px] font-extrabold text-slate-900 flex items-center gap-2">
        {icon && <span className="text-[16px]">{icon}</span>}
        {title}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="text-[14px] font-semibold text-tiendeo-red"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function ScoreBadge({ value, label, tone = "amber", size = "md" }) {
  const tones = {
    green: "bg-emerald-100 text-emerald-700",
    lightgreen: "bg-lime-100 text-lime-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  };
  const sizes = {
    sm: "text-[11px] px-1.5 py-0.5 rounded-md font-semibold",
    md: "text-[13px] px-2 py-0.5 rounded-md font-semibold",
    lg: "text-[15px] px-2.5 py-1 rounded-lg font-bold",
  };
  return (
    <span className={`inline-flex items-center gap-1 ${sizes[size]} ${tones[tone]}`}>
      <span>{value}/100</span>
      <span className="opacity-80">·</span>
      <span>{label}</span>
    </span>
  );
}

export function PersonaBanner({ text, onDismiss }) {
  return (
    <div className="bg-slate-900 text-white px-4 py-2 flex items-start justify-between gap-3 border-b border-amber-300/30">
      <div className="flex-1">
        <p className="text-[9px] font-extrabold tracking-[0.18em] text-amber-300">
          DEMO SCENARIO
        </p>
        <p className="text-[12.5px] leading-snug mt-0.5">{text}</p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="text-white/70 hover:text-white text-lg leading-none mt-1"
      >
        ×
      </button>
    </div>
  );
}

export function ScreenHeader({ title, onBack, suffix }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center -ml-1"
        aria-label="Back"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h1 className="text-[16px] font-bold text-slate-900 flex-1 truncate">{title}</h1>
      {suffix}
    </div>
  );
}

export function PrimaryButton({ children, onClick, full = false, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-tiendeo-red hover:bg-tiendeo-redDark active:bg-tiendeo-redDark text-white font-bold text-[14px] py-3 rounded-full transition-colors ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, full = false, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`border border-tiendeo-red text-tiendeo-red font-bold text-[14px] py-3 rounded-full bg-white hover:bg-tiendeo-redTint transition-colors ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export function Chip({ children, onClick, tone = "outline" }) {
  const tones = {
    outline: "border-tiendeo-red text-tiendeo-red bg-white hover:bg-tiendeo-redTint",
    filled: "bg-tiendeo-red text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`border rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export function TagChip({ tone = "gray", children }) {
  const tones = {
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    gray: "bg-slate-100 text-slate-600",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function ClarityMark({ className = "w-4 h-4 text-tiendeo-red" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.5c.6 4.8 3.6 7.8 8.4 8.4-4.8.6-7.8 3.6-8.4 8.4-.6-4.8-3.6-7.8-8.4-8.4 4.8-.6 7.8-3.6 8.4-8.4z" />
    </svg>
  );
}
