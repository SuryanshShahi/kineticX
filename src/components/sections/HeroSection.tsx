"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Flame, Shield, Activity, Compass } from "lucide-react";
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
      className="relative w-full h-screen flex flex-col justify-between items-center pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-12 overflow-hidden bg-[#040406] cyber-grid text-white"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 ambient-glow-mesh pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[400px] sm:h-[700px] bg-lime-500/10 rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      {/* Top telemetry badge */}
      <div className="hero-badge flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl text-[10px] sm:text-xs font-mono text-neutral-300 z-10 shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
        <span className="text-lime-400 font-bold">FRAME-SCRUB</span>
        <span className="text-neutral-600 hidden sm:inline">|</span>
        <span className="text-neutral-400 hidden sm:inline">360° SPATIAL ROTATION</span>
      </div>

      {/* Main Visual Stage */}
      <div className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center my-auto z-10">
        {/* Title */}
        <div className="w-full text-center overflow-hidden mb-1 sm:mb-2">
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700"
          >
            {headline.split("").map((char, i) => (
              <span key={i} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Canvas Stage */}
        <div
          id="hero-canvas-wrap"
          className="relative w-full h-[40vh] sm:h-[52vh] md:h-[58vh] max-h-[680px] flex items-center justify-center will-change-transform"
        >
          {/* Floor glow */}
          <div className="absolute bottom-2 w-[70%] h-16 sm:h-24 bg-gradient-to-t from-lime-500/25 to-transparent rounded-full blur-3xl transform scale-y-50 pointer-events-none" />

          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain img-blend drop-shadow-[0_25px_60px_rgba(163,230,53,0.35)] select-none pointer-events-none"
          />
          {!ready && (
            <img
              src="/img/hero.jpg"
              alt="Loading sneaker frame"
              className="absolute inset-0 w-full h-full object-contain img-blend pointer-events-none select-none"
            />
          )}

          {/* Telemetry Badges */}
          <div
            ref={telemetryRef}
            className="absolute inset-0 pointer-events-none flex flex-col justify-between p-1 sm:p-4 z-20"
          >
            {/* Top Left */}
            <div className="flex items-center gap-2 sm:gap-3 self-start bg-neutral-950/80 backdrop-blur-xl border border-lime-400/40 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400 flex-shrink-0" />
              <div className="text-left font-mono">
                <div className="text-[8px] sm:text-[10px] text-neutral-400">ENERGY RETURN</div>
                <div className="text-[10px] sm:text-sm font-bold text-lime-400">+98.4%</div>
              </div>
            </div>

            {/* Top Right */}
            <div className="flex items-center gap-2 sm:gap-3 self-end bg-neutral-950/80 backdrop-blur-xl border border-cyan-400/40 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
              <div className="text-right font-mono">
                <div className="text-[8px] sm:text-[10px] text-neutral-400">CHASSIS MASS</div>
                <div className="text-[10px] sm:text-sm font-bold text-cyan-400">168G</div>
              </div>
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
            </div>

            {/* Bottom Left */}
            <div className="flex items-center gap-2 sm:gap-3 self-start bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400 flex-shrink-0" />
              <div className="text-left font-mono">
                <div className="text-[8px] sm:text-[10px] text-neutral-400">PLATE</div>
                <div className="text-[10px] sm:text-sm font-bold text-white">CARBON 3K</div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="flex items-center gap-2 sm:gap-3 self-end bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
              <div className="text-right font-mono">
                <div className="text-[8px] sm:text-[10px] text-neutral-400">STACK</div>
                <div className="text-[10px] sm:text-sm font-bold text-white">38MM / 6MM</div>
              </div>
              <Compass className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-center text-[10px] sm:text-sm text-neutral-400 font-mono tracking-wide mt-1 sm:mt-2">
          Scroll down to rotate the chassis 360° and begin layer separation.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-1 text-neutral-500 font-mono text-[9px] sm:text-[10px] tracking-widest animate-bounce z-10">
        <span>SCROLL TO DECONSTRUCT</span>
        <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime-400" />
      </div>
    </section>
  );
}
