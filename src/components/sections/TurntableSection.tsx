"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotateCw, ShieldCheck, Sliders } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TurntableSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeColor, setActiveColor] = useState("volt");

  const colors = [
    { id: "volt", name: "CYBER VOLT", color: "#a3e635", border: "border-lime-400" },
    { id: "cyan", name: "OBSIDIAN CYAN", color: "#06b6d4", border: "border-cyan-400" },
    { id: "stealth", name: "STEALTH CARBON", color: "#71717a", border: "border-neutral-500" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const deg = Math.round(self.progress * 360);
            setRotationAngle(deg);
          },
        },
      });

      tl.to("#turntable-visual", {
        rotateY: 45,
        rotateX: -10,
        scale: 1.05,
        ease: "none",
      }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="turntable"
      ref={rootRef}
      className="relative w-full h-screen flex flex-col justify-between items-center py-16 px-4 sm:px-8 overflow-hidden bg-[#050507] cyber-grid text-white"
    >
      {/* Ambient Ring Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-neutral-800/80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-neutral-900/60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 text-xs font-mono mb-2">
          <RotateCw className="w-3.5 h-3.5 text-lime-400" />
          <span>360° SPATIAL INSPECTOR · AERODYNAMIC LAB</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white uppercase">
          360° AERODYNAMIC PROFILE
        </h2>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1 max-w-xl">
          Scroll or scrub to rotate. Aerodynamically sculpted to minimize drag coefficient to 0.22 Cd.
        </p>
      </div>

      {/* Center Turntable Visual Stage */}
      <div className="relative w-full max-w-4xl h-[380px] sm:h-[420px] flex items-center justify-center my-auto">
        {/* Turntable Floor Ring */}
        <div className="absolute bottom-4 w-[500px] sm:w-[650px] h-32 rounded-full border border-lime-400/20 bg-lime-500/5 transform rotate-x-60 pointer-events-none flex items-center justify-center shadow-[0_0_30px_rgba(163,230,53,0.15)]">
          <div className="w-[85%] h-[85%] rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: "25s" }} />
        </div>

        <div
          id="turntable-visual"
          className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center will-change-transform"
          style={{
            filter:
              activeColor === "cyan"
                ? "hue-rotate(140deg)"
                : activeColor === "stealth"
                ? "grayscale(100%) brightness(0.85)"
                : "none",
          }}
        >
          <img
            src="/img/hero.jpg"
            alt="Kinetix Stride-01 Turntable Inspection"
            className="w-full h-full object-contain img-blend drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none"
          />
        </div>

        {/* Real-time Angle Indicator HUD */}
        <div className="absolute top-6 left-6 font-mono text-xs bg-black/70 backdrop-blur-md border border-neutral-800 px-3 py-2 rounded-lg shadow-lg">
          <span className="text-[10px] text-neutral-500 block">ROTATION AZIMUTH</span>
          <span className="text-lime-400 font-bold text-sm">
            {rotationAngle}° / 360°
          </span>
        </div>

        {/* Wind Tunnel Telemetry */}
        <div className="absolute top-6 right-6 font-mono text-xs bg-black/70 backdrop-blur-md border border-neutral-800 px-3 py-2 rounded-lg text-right shadow-lg">
          <span className="text-[10px] text-neutral-500 block">DRAG COEFFICIENT</span>
          <span className="text-cyan-400 font-bold text-sm">0.22 Cd (LAB TESTED)</span>
        </div>
      </div>

      {/* Bottom Configurator Bar */}
      <div className="w-full max-w-3xl z-10 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <Sliders className="w-4 h-4 text-lime-400" />
          <span className="font-mono text-xs text-neutral-400 uppercase">COLORWAY PROFILE:</span>
        </div>

        <div className="flex items-center gap-3">
          {colors.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveColor(c.id)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs flex items-center gap-2 border transition-all ${
                activeColor === c.id
                  ? `${c.border} bg-neutral-800 text-white shadow-lg`
                  : "border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          <span>AEROSPACE GRADE CARBON</span>
        </div>
      </div>
    </section>
  );
}
