import { useState, useRef, useEffect } from "react";
import {
  ScreenHeader,
  PersonaBanner,
  ScoreBadge,
  Chip,
  ClarityMark,
} from "../components/Common";
import { PERSONAS, TVS } from "../data";

const FIRST_MSG = {
  who: "clarity",
  text: "Hi Andrea — I see you've been comparing TVs for a while. Want me to help narrow it down? Tell me what matters most.",
  chips: ["Best picture for movies", "Gaming, mostly PS5", "Best value under €800"],
};

export default function ConsideredFlow({ onComplete, onBack }) {
  const [bannerOn, setBannerOn] = useState(true);
  const [messages, setMessages] = useState([FIRST_MSG]);
  const [typing, setTyping] = useState(false);
  const [toast, setToast] = useState(null);
  const [stage, setStage] = useState(0); // 0 awaiting choice, 1 after TVs, 2 after stock
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 1600);
  };

  const addClarityMessage = (text, extras = {}) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { who: "clarity", text, ...extras }]);
    }, 1100);
  };

  const onChoose = (text) => {
    setMessages((m) => [
      ...m.map((mm, i) => (i === m.length - 1 ? { ...mm, chips: undefined } : mm)),
      { who: "user", text },
    ]);

    if (stage === 0) {
      setStage(1);
      addClarityMessage(
        "Got it. Under €800, here are 3 TVs worth considering. I've factored in your past purchases (you tend to keep electronics 5+ years) and your living room (~25m², from your last chat).",
        { tvs: TVS }
      );
      // follow-up message
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            who: "clarity",
            text:
              "My honest pick: the **Hisense U7N**. €749 at MediaMarkt is the lowest verified price right now. Want me to check stock at the MediaMarkt nearest you?",
            chips: ["Yes — check stock", "What about returns?"],
          },
        ]);
      }, 2400);
    } else if (stage === 1) {
      setStage(2);
      if (text === "What about returns?") {
        addClarityMessage(
          "MediaMarkt offers 30-day no-questions returns on TVs and free home delivery on orders over €500. Should I check stock at your nearest one?",
          { chips: ["Yes — check stock", "Save to my list"] }
        );
      } else {
        addClarityMessage(
          "✓ In stock at MediaMarkt Diagonal Mar (3.2km). They offer 30-day no-questions returns and free home delivery on orders over €500. Want me to save this to your list, or are you ready to head over?",
          { chips: ["Save to my list", "I'll head over"] }
        );
      }
    } else {
      // any final choice → outcome
      setTimeout(onComplete, 400);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {bannerOn && (
        <PersonaBanner
          text={`${PERSONAS.considered.name} ${PERSONAS.considered.context}`}
          onDismiss={() => setBannerOn(false)}
        />
      )}
      <ScreenHeader
        title="Ask Clarity"
        onBack={onBack}
        suffix={<ClarityMark className="w-5 h-5 text-tiendeo-red" />}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto phone-scroll px-4 py-4 space-y-3 bg-white">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} onChip={onChoose} />
        ))}
        {typing && <TypingBubble />}
      </div>

      {/* Fake input */}
      <div className="border-t border-slate-100 p-3 bg-white">
        <button
          onClick={() => showToast("Demo mode — tap a suggestion above")}
          className="w-full bg-slate-100 rounded-full flex items-center px-4 py-2.5 text-left text-[13px] text-slate-400 gap-2"
        >
          <span className="flex-1">Type a message...</span>
          <span className="w-7 h-7 rounded-full bg-tiendeo-red flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {toast && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[12px] px-4 py-2 rounded-full shadow-lg fade-in-up z-30">
          {toast}
        </div>
      )}
    </div>
  );
}

function Message({ msg, onChip }) {
  if (msg.who === "user") {
    return (
      <div className="flex justify-end fade-in-up">
        <div className="max-w-[85%] bg-tiendeo-redTint border border-tiendeo-red/20 rounded-2xl rounded-br-md px-3 py-2 text-[13px] text-slate-900">
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div className="fade-in-up">
      <div className="flex items-center gap-1.5 mb-1">
        <ClarityMark className="w-3.5 h-3.5 text-tiendeo-red" />
        <span className="text-[11px] font-bold text-slate-700">Clarity</span>
        <span className="text-[10px] text-slate-400">just now</span>
      </div>
      <div className="bg-slate-100 rounded-2xl rounded-tl-md px-3 py-2.5 text-[13px] text-slate-900 leading-relaxed max-w-[92%]">
        {renderText(msg.text)}
      </div>

      {msg.tvs && (
        <div className="mt-3 space-y-2.5">
          {msg.tvs.map((tv, i) => (
            <TvCard key={i} tv={tv} />
          ))}
        </div>
      )}

      {msg.chips && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {msg.chips.map((c) => (
            <Chip key={c} onClick={() => onChip(c)}>
              {c}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

// Bold simple **markdown**
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-bold">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function TvCard({ tv }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="w-full bg-slate-100 h-40">
        <img
          src={tv.image}
          alt=""
          className="object-cover w-full h-full"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <div className="p-3">
        <p className="text-[14px] font-extrabold text-slate-900">{tv.name}</p>
        <div className="mt-1.5">
          <ScoreBadge value={tv.score} label={tv.label} tone={tv.tone} size="sm" />
        </div>
        <p className="text-[12px] mt-2 text-tiendeo-red font-bold">{tv.prices}</p>
        <p className="text-[12px] text-slate-500 italic mt-1">{tv.tag}</p>
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-2 text-[12px] font-bold text-tiendeo-red"
        >
          {open ? "Show less" : "Tell me more"}
        </button>
        {open && (
          <p className="text-[12px] text-slate-700 leading-relaxed mt-2 fade-in-up">
            {tv.detail}
          </p>
        )}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="fade-in-up">
      <div className="flex items-center gap-1.5 mb-1">
        <ClarityMark className="w-3.5 h-3.5 text-tiendeo-red" />
        <span className="text-[11px] font-bold text-slate-700">Clarity</span>
      </div>
      <div className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-2.5 inline-flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full typing-dot" />
        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full typing-dot" />
        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full typing-dot" />
      </div>
    </div>
  );
}
