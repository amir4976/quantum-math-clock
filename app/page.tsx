"use client";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { formulas } from "./formulas";
import Image from "next/image";

export default function MathClock() {
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      console.log( now.getHours())
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  const hourFormula = formulas[time.hours] || "0";
  const minuteFormula = formulas[time.minutes] || "0";

  return (
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center text-green-400 font-mono relative overflow-hidden">
      {/* پس‌زمینه‌ای با خطوط نرم و نویز سبک */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,255,200,0.1)_0%,transparent_70%)]"></div>
      <Image src={'/1298129.jpg'} alt={'back'} width={'1080'} height={1080} className="absolute z-0 opacity-20"/>
      {/* افکت درخشش متن */}
      <style jsx>{`
        .glow {
          text-shadow:
            0 0 10px #00ffaa,
            0 0 20px #00ffaa,
            0 0 40px #00ffaa;
          transition: all 0.3s ease-in-out;
        }
        .clock-text {
          font-size: clamp(1rem, 1vw + 0.7rem, 1.8rem);
        }
      `}</style>

      <div className="glow text-4xl md:text-6xl text-center leading-snug p-4 backdrop-blur-sm bg-opacity-10 bg-white/5 rounded-2xl border border-green-500/40 shadow-[0_0_15px_#00ffaa66]">
        <div className="clock-text">
          <InlineMath math={hourFormula} />{" "}
          <span className="text-green-600 mx-3">:</span>{" "}
          <InlineMath math={minuteFormula} />
        </div>
      </div>

      <div className="absolute bottom-10 text-xs text-green-700 opacity-50 select-none">
        Quantum Math Clock — powered by KaTeX & Next.js
      </div>
    </div>
  );
}
