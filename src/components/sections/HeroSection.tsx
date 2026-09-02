"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Flame, Shield, Activity, Compass, Cpu, Zap } from "lucide-react";
import { useFrameSequence } from "@/hooks/useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const { ready, draw } = useFrameSequence("hero");

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, 0);
    }
  }, [ready]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
      })
      .from(".hero-char", {
        opacity: 0,
        y: 60,
        rotateX: -45,
        stagger: 0.02,
        duration: 1,
      }, "-=0.5")
      .from("#hero-canvas-wrap", {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.8")
      .from(telemetryRef.current?.children || [], {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -40 : 40),
        stagger: 0.1,
        duration: 0.8,
      }, "-=0.6");

      // ScrollTrigger scrub
      const frameObj = { progress: 0 };
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      scrubTl.to(frameObj, {
        progress: 1,
        ease: "none",
        onUpdate: () => {
          if (canvasRef.current) {
            draw(canvasRef.current, frameObj.progress);
          }
        },
      }, 0);

      scrubTl.to(headlineRef.current, {
        y: -40,
        opacity: 0.3,
        ease: "none",
      }, 0);
    }, rootRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headline = "HYPER·PROPULSION";

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen flex flex-col justify-between items-center pt-24 pb-8 px-6 sm:px-12 overflow-hidden bg-[#040406] cyber-grid text-white"
    >
      {/* Expansive Ambient Radial Glow Aura */}
      <div className="absolute inset-0 ambient-glow-mesh pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-lime-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top telemetry badge */}
      <div className="hero-badge flex items-center gap-3 px-5 py-2 rounded-full border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl text-xs font-mono text-neutral-300 z-10 shadow-2xl">
        <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping" />
        <span className="text-lime-400 font-bold">FRAME-SCRUB TURNTABLE</span>
        <span className="text-neutral-600">|</span>
        <span className="text-neutral-400">360° SPATIAL ROTATION ENGINE</span>
      </div>

      {/* Main Full-Width Visual Stage */}
      <div className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center my-auto z-10">
        {/* Giant Background Title */}
        <div className="w-full text-center overflow-hidden mb-2">
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700"
          >
            {headline.split("").map((char, i) => (
              <span key={i} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Center Canvas Stage filling the viewport */}
        <div
          id="hero-canvas-wrap"
          className="relative w-full h-[52vh] sm:h-[58vh] max-h-[680px] flex items-center justify-center will-change-transform"
        >
          {/* Floor Ring & Reflection Aura */}
          <div className="absolute bottom-2 w-[70%] h-24 bg-gradient-to-t from-lime-500/25 to-transparent rounded-full blur-3xl transform scale-y-50 pointer-events-none" />
          <div className="absolute bottom-6 w-[85%] h-36 rounded-full border border-lime-400/20 bg-lime-500/5 transform rotate-x-65 pointer-events-none shadow-[0_0_50px_rgba(163,230,53,0.15)]" />

          {/* Canvas without clipping borders */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain img-blend drop-shadow-[0_25px_60px_rgba(163,230,53,0.35)] select-none"
          />
          {!ready && (
            <img
              src="/img/hero.jpg"
              alt="Loading sneaker frame"
              className="absolute inset-0 w-full h-full object-contain img-blend"
            />
          )}

          {/* HUD Telemetry Badges Floating in Viewport Space */}
          <div
            ref={telemetryRef}
            className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 sm:p-4 z-20"
          >
            {/* Top Left Spec */}
            <div className="flex items-center gap-3 self-start bg-neutral-950/80 backdrop-blur-xl border border-lime-400/40 px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-neutral-400">ENERGY RETURN</div>
                <div className="text-sm font-bold text-lime-400">+98.4% PER STRIDE</div>
              </div>
            </div>

            {/* Top Right Spec */}
            <div className="flex items-center gap-3 self-end bg-neutral-950/80 backdrop-blur-xl border border-cyan-400/40 px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="text-right font-mono">
                <div className="text-[10px] text-neutral-400">CHASSIS MASS</div>
                <div className="text-sm font-bold text-cyan-400">168 GRAMS (ULTRALIGHT)</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Left Spec */}
            <div className="flex items-center gap-3 self-start bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-neutral-400">PROPULSION PLATE</div>
                <div className="text-sm font-bold text-white">FORGED CARBON 3K</div>
              </div>
            </div>

            {/* Bottom Right Spec */}
            <div className="flex items-center gap-3 self-end bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="text-right font-mono">
                <div className="text-[10px] text-neutral-400">GEOMETRY</div>
                <div className="text-sm font-bold text-white">38MM STACK / 6MM DROP</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-center text-xs sm:text-sm text-neutral-400 font-mono tracking-wide mt-2">
          Scroll down to rotate the chassis 360° and begin mechanical layer separation.
        </p>
      </div>

      {/* Bottom scroll tracker */}
      <div className="flex flex-col items-center gap-1.5 text-neutral-500 font-mono text-[10px] tracking-widest animate-bounce z-10">
        <span>SCROLL TO DECONSTRUCT</span>
        <ArrowDown className="w-3.5 h-3.5 text-lime-400" />
      </div>
    </section>
  );
}
