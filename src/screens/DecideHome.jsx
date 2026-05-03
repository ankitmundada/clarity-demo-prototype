import { ClarityMark, SectionHeader } from "../components/Common";

export default function DecideHome({ onPick }) {
  return (
    <div className="px-4 py-4 space-y-6">
      <DemoScenarioCard />

      {/* Hero card */}
      <div className="bg-tiendeo-redTint rounded-2xl p-4">
        <div className="flex items-start gap-2">
          <ClarityMark className="w-5 h-5 text-tiendeo-red mt-1 shrink-0" />
          <div>
            <h2 className="text-[17px] font-extrabold text-slate-900 leading-snug">
              Hi Andrea — what are you trying to decide today?
            </h2>
            <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed">
              Clarity learns from your shopping, your favorites, and your household to help you choose with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Three pain cards */}
      <section>
        <SectionHeader
          icon={<ClarityMark className="w-4 h-4 text-tiendeo-red" />}
          title="Three ways Clarity can help"
          action="Discover more"
        />
        <div className="space-y-2.5">
          <PainCard
            emoji="🛒"
            headline="Scan a product at the shelf"
            onClick={() => onPick("shelf")}
            testId="card-shelf"
          />
          <PainCard
            emoji="🔍"
            headline="Ask Clarity to help you decide"
            onClick={() => onPick("considered")}
            testId="card-considered"
          />
          <PainCard
            emoji="🏷️"
            headline="Build a smart shopping list"
            onClick={() => onPick("weekly")}
            testId="card-weekly"
          />
        </div>
      </section>

      {/* Footer block */}
      <section className="pb-4">
        <h3 className="text-[15px] font-extrabold text-slate-900 mb-3">
          How Clarity gets smarter
        </h3>
        <div className="space-y-3">
          <SmartRow icon="🎯" title="Personalized to you" desc="Learns your preferences, household, and history" />
          <SmartRow icon="🔄" title="Cross-retailer" desc="Compares every store near you" />
          <SmartRow icon="✓" title="Verified outcomes" desc="Every decision feeds the next one" />
        </div>
      </section>
    </div>
  );
}

function PainCard({ emoji, headline, onClick, testId }) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className="w-full bg-white border border-slate-200 hover:border-tiendeo-red/50 rounded-2xl p-3 flex items-center gap-3 text-left shadow-sm hover:shadow-md transition-all"
    >
      <span className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
        {emoji}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-slate-900 leading-snug">
          {headline}
        </p>
      </div>
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function DemoScenarioCard() {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-3.5 border border-amber-300/30">
      <p className="text-[9.5px] font-extrabold tracking-[0.18em] text-amber-300 mb-1.5">
        DEMO SCENARIO · VISIBLE IN PROTOTYPE ONLY
      </p>
      <p className="text-[12.5px] leading-relaxed text-slate-100">
        You are <span className="font-bold">Andrea</span>, a Tiendeo user in
        Barcelona. The three options below walk through three real moments
        in his week — a shelf decision, his weekly shop, and a research-heavy
        purchase.
      </p>
    </div>
  );
}

function SmartRow({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[18px] w-6 text-center shrink-0">{icon}</span>
      <div>
        <p className="text-[13px] font-bold text-slate-900">{title}</p>
        <p className="text-[12px] text-slate-500 italic mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
