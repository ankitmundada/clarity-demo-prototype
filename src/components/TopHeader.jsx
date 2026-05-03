export default function TopHeader({ searchPlaceholder = "Ask Clarity anything..." }) {
  return (
    <div className="bg-white pt-9 px-4 pb-3 border-b border-slate-100">
      {/* Status-bar spacing already covered by pt-9 (notch) */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-[15px] text-slate-700">
          You are in <span className="font-bold text-slate-900">Barcelona - 08028</span>
        </span>
        <ChevronDown className="w-4 h-4 text-tiendeo-red" />
        <PinIcon className="w-5 h-5 text-tiendeo-red ml-1" />
      </div>

      <div className="bg-slate-100 rounded-full flex items-center gap-2 px-4 py-2.5">
        <SearchIcon className="w-4 h-4 text-slate-400" />
        <span className="text-[14px] text-slate-400">{searchPlaceholder}</span>
      </div>
    </div>
  );
}

function ChevronDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}
