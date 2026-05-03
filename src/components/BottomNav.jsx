// Bottom nav: 5 tabs, DECIDE always shown active in this prototype
export default function BottomNav() {
  const tabs = [
    { key: "featured", label: "FEATURED", Icon: StarIcon },
    { key: "favourites", label: "FAVOURITES", Icon: HeartIcon },
    { key: "decide", label: "DECIDE", Icon: SparkleIcon, primary: true },
    { key: "mylist", label: "MY LIST", Icon: ListIcon },
    { key: "account", label: "ACCOUNT", Icon: PersonIcon },
  ];
  return (
    <nav className="bg-white border-t border-slate-200 pt-1 pb-2 px-2 flex items-end justify-around">
      {tabs.map((t) => (
        <Tab key={t.key} Icon={t.Icon} label={t.label} primary={t.primary} />
      ))}
    </nav>
  );
}

function Tab({ Icon, label, primary }) {
  if (primary) {
    return (
      <button className="flex flex-col items-center gap-0.5 px-1 -mt-2">
        <span className="w-9 h-9 rounded-full bg-tiendeo-red flex items-center justify-center shadow-md shadow-tiendeo-red/30">
          <Icon className="w-5 h-5 text-white" />
        </span>
        <span className="text-[10px] font-bold text-tiendeo-red tracking-wide">
          {label}
        </span>
      </button>
    );
  }
  return (
    <button className="flex flex-col items-center gap-0.5 px-1 py-1">
      <Icon className="w-6 h-6 text-slate-400" strokeWidth={1.6} />
      <span className="text-[9.5px] font-semibold text-slate-500 tracking-wide">
        {label}
      </span>
    </button>
  );
}

function StarIcon({ className, strokeWidth = 1.5 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M12 2.5l3 6.4 7 .9-5 4.7 1.3 6.9L12 17.9l-6.3 3.5L7 14.5 2 9.8l7-.9 3-6.4z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ className, strokeWidth = 1.5 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M20.8 7.4a5 5 0 00-8.8-1.7A5 5 0 003.2 7.4c0 6 8.8 11.6 8.8 11.6s8.8-5.6 8.8-11.6z" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.5c.6 4.8 3.6 7.8 8.4 8.4-4.8.6-7.8 3.6-8.4 8.4-.6-4.8-3.6-7.8-8.4-8.4 4.8-.6 7.8-3.6 8.4-8.4z" />
    </svg>
  );
}

function ListIcon({ className, strokeWidth = 1.5 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon({ className, strokeWidth = 1.5 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M5.5 19c1.4-3 3.8-4.5 6.5-4.5s5.1 1.5 6.5 4.5" strokeLinecap="round" />
    </svg>
  );
}
