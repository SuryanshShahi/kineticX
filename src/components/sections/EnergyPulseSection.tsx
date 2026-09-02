"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Activity, Gauge, BatteryCharging, Flame } from "lucide-react";
import { useFrameSequence } from "@/hooks/useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

export default function EnergyPulseSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready, draw } = useFrameSequence("pulse");
  const [pulseMetrics, setPulseMetrics] = useState({
    watts: 480,
    velocity: 24.8,
    efficiency: 98.4,
    pressure: 18.2,
  });

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, 0);
    }
  }, [ready]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const frameObj = { progress: 0 };
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setPulseMetrics({
              watts: Math.round(350 + p * 420),
              velocity: parseFloat((18.0 + p * 14.5).toFixed(1)),
              efficiency: parseFloat((92.0 + p * 6.4).toFixed(1)),
              pressure: parseFloat((14.0 + p * 8.2).toFixed(1)),
            });
          },
        },
      });

      // Frame scrubbing
      tl.to(frameObj, {
        progress: 1,
        ease: "none",
        onUpdate: () => {
          if (canvasRef.current) {
            draw(canvasRef.current, frameObj.progress);
          }
        },
      }, 0);

      // Ambient glows and shockwave
      tl.set("#sole-glow-pool", { opacity: 0.2, scale: 0.8 });
      tl.set("#energy-shockwave", { opacity: 0, scale: 0.5 });
      tl.set("#toe-spring-fire", { opacity: 0, scale: 0 });

      // Laser path animation
      tl.to("#laser-beam", {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "none",
      }, 0);

      // Heel Chamber callout
      tl.to("#heel-callout", {
        opacity: 1,
        x: 0,
        duration: 0.3,
      }, 0.1);

      // Midsole wave
      tl.to("#sole-glow-pool", {
        opacity: 0.8,
        scale: 1.2,
        duration: 0.4,
      }, 0.3);

      tl.to("#midfoot-callout", {
        opacity: 1,
        x: 0,
        duration: 0.3,
      }, 0.4);

      // Toe Launch fire
      tl.to("#toe-spring-fire", {
        opacity: 1,
        scale: 1.3,
        duration: 0.3,
        ease: "back.out(2)",
      }, 0.6);

      tl.to("#toe-callout", {
        opacity: 1,
        x: 0,
        duration: 0.3,
      }, 0.7);

      // Full shockwave flash
      tl.to("#energy-shockwave", {
        opacity: 1,
        scale: 1.8,
        duration: 0.3,
      }, 0.8);
    }, rootRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="energy-pulse"
      ref={rootRef}
      className="relative w-full h-screen flex flex-col justify-between items-center pt-24 pb-8 px-6 sm:px-12 overflow-hidden bg-[#040406] cyber-grid text-white"
    >
      {/* Ambient Backlight Aura */}
      <div
        id="sole-glow-pool"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] bg-gradient-to-r from-cyan-500/20 via-lime-500/30 to-lime-400/20 rounded-full blur-[180px] pointer-events-none transition-all"
      />

      {/* Shockwave expanding ring */}
      <div
        id="energy-shockwave"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] border border-lime-400/60 rounded-full blur-sm pointer-events-none"
      />

      {/* Header */}
      <div className="text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-xs font-mono mb-2 shadow-lg">
          <Zap className="w-3.5 h-3.5 fill-cyan-400" />
          <span>KINETIC FLUID DYNAMICS · FRAME SCRUB</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white uppercase">
          ENERGY PULSE IN THE SOLE
        </h2>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1 max-w-xl">
          Scroll drives the frame sequence frame-by-frame as the bioluminescent laser wave propagates through the sole.
        </p>
      </div>

      {/* Center: Full-Width Sole Macro Frame-Canvas Scrub Stage */}
      <div className="relative w-full max-w-6xl h-[52vh] sm:h-[58vh] max-h-[640px] flex items-center justify-center my-auto z-10">
        <div
          id="sole-img-container"
          className="relative w-full h-full flex items-center justify-center will-change-transform overflow-visible"
        >
          {/* Sneaker Sole Pulse Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain img-blend-soft drop-shadow-[0_25px_60px_rgba(6,182,212,0.4)] select-none"
          />
          {!ready && (
            <img
              src="/img/pulse.jpg"
              alt="Sole loading fallback"
              className="absolute inset-0 w-full h-full object-contain img-blend-soft"
            />
          )}

          {/* SVG Overlay for Dynamic Laser Beam */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 180 380 Q 320 460 520 420 T 820 320"
              stroke="rgba(6,182,212,0.2)"
              strokeWidth="4"
              strokeDasharray="6 6"
            />

            <path
              id="laser-beam"
              d="M 180 380 Q 320 460 520 420 T 820 320"
              stroke="url(#pulse-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="800"
              style={{ filter: "drop-shadow(0 0 14px #a3e635)" }}
            />

            <defs>
              <linearGradient
                id="pulse-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Toe launch burst icon */}
          <div
            id="toe-spring-fire"
            className="absolute right-8 sm:right-16 top-24 p-3.5 rounded-full bg-lime-400 text-neutral-950 shadow-[0_0_35px_#a3e635] pointer-events-none z-20"
          >
            <Flame className="w-6 h-6 fill-current" />
          </div>

          {/* Annotation: Heel Strike */}
          <div
            id="heel-callout"
            className="opacity-0 -translate-x-6 absolute -left-2 sm:left-4 top-2/3 bg-neutral-950/90 backdrop-blur-xl border border-cyan-400/40 p-4 rounded-xl font-mono text-left w-52 shadow-2xl z-20"
          >
            <div className="text-xs text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              01. HEEL ABSORPTION
            </div>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              BioCell™ pods compress & trap vertical kinetic inertia.
            </p>
          </div>

          {/* Annotation: Midfoot Transition */}
          <div
            id="midfoot-callout"
            className="opacity-0 translate-y-6 absolute left-1/2 -translate-x-1/2 -bottom-2 sm:bottom-4 bg-neutral-950/90 backdrop-blur-xl border border-lime-400/40 p-4 rounded-xl font-mono text-left w-56 shadow-2xl z-20"
          >
            <div className="text-xs text-lime-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              02. CARBON FULCRUM
            </div>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              AeroCarbon™ lever stores torque with zero rotational loss.
            </p>
          </div>

          {/* Annotation: Forefoot Launch */}
          <div
            id="toe-callout"
            className="opacity-0 translate-x-6 absolute -right-2 sm:right-4 top-1/4 bg-neutral-950/90 backdrop-blur-xl border border-lime-400/40 p-4 rounded-xl font-mono text-left w-52 shadow-2xl z-20"
          >
            <div className="text-xs text-lime-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              03. TOE PROPULSION
            </div>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              Explosive return vector launches runner into next stride.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Real-time Telemetry Hud Bar */}
      <div className="w-full max-w-5xl z-10 bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left font-mono">
          <div className="border-l-2 border-lime-400 pl-4">
            <div className="text-[10px] text-neutral-500 flex items-center gap-1.5">
              <BatteryCharging className="w-3.5 h-3.5 text-lime-400" />
              <span>PROPULSION OUTPUT</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {pulseMetrics.watts} <span className="text-xs text-lime-400 font-normal">WATTS</span>
            </div>
          </div>

          <div className="border-l-2 border-cyan-400 pl-4">
            <div className="text-[10px] text-neutral-500 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENERGY RETURN</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
              {pulseMetrics.efficiency}%
            </div>
          </div>

          <div className="border-l-2 border-lime-400 pl-4">
            <div className="text-[10px] text-neutral-500 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-lime-400" />
              <span>POD HYDRAULICS</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {pulseMetrics.pressure} <span className="text-xs text-lime-400 font-normal">PSI</span>
            </div>
          </div>

          <div className="border-l-2 border-cyan-400 pl-4">
            <div className="text-[10px] text-neutral-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAUNCH VELOCITY</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {pulseMetrics.velocity} <span className="text-xs text-cyan-400 font-normal">KM/H</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
