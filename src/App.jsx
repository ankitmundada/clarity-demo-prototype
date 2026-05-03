import { useState, useCallback } from "react";
import TopHeader from "./components/TopHeader";
import BottomNav from "./components/BottomNav";
import DecideHome from "./screens/DecideHome";
import OutcomeCapture from "./screens/OutcomeCapture";
import ShelfFlow from "./screens/ShelfFlow";
import WeeklyFlow from "./screens/WeeklyFlow";
import ConsideredFlow from "./screens/ConsideredFlow";

const HOME = "home";

export default function App() {
  const [screen, setScreen] = useState(HOME);
  const [flow, setFlow] = useState(null);

  const goHome = useCallback(() => {
    setScreen(HOME);
    setFlow(null);
  }, []);

  const startFlow = useCallback((name) => {
    setFlow(name);
    setScreen(name);
  }, []);

  const goOutcome = useCallback(() => setScreen("outcome"), []);

  const renderScreen = () => {
    switch (screen) {
      case "shelf":
        return <ShelfFlow onComplete={goOutcome} onBack={goHome} />;
      case "weekly":
        return <WeeklyFlow onComplete={goOutcome} onBack={goHome} />;
      case "considered":
        return <ConsideredFlow onComplete={goOutcome} onBack={goHome} />;
      case "outcome":
        return <OutcomeCapture flow={flow} onDone={goHome} />;
      case HOME:
      default:
        return <DecideHome onPick={startFlow} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-6 px-4 relative">
      <button
        onClick={goHome}
        className="absolute top-4 right-6 text-xs text-slate-500 hover:text-slate-800 underline"
      >
        Restart Demo
      </button>

      <p className="text-xs text-slate-500 mb-3 mt-2 tracking-wide">
        Clarity Prototype — Demo Mode · Tiendeo for ShopFully
      </p>

      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <TopHeader />
          <main className="flex-1 overflow-y-auto phone-scroll bg-white">
            {renderScreen()}
          </main>
          <BottomNav onHome={goHome} />
        </div>
      </PhoneFrame>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div
      className="rounded-[44px] bg-black p-[6px] shadow-2xl"
      style={{ width: 402, height: 856 }}
    >
      <div
        className="rounded-[38px] overflow-hidden bg-white relative"
        style={{ width: 390, height: 844 }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50" />
        {children}
      </div>
    </div>
  );
}
