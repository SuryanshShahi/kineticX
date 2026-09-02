"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Sparkles, Cpu, Wind, Zap } from "lucide-react";
import { useFrameSequence } from "@/hooks/useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    id: "upper", num: "01", name: "ENGINEERED MATRIX UPPER",
    img: "/img/layer-1-upper.webp", material: "Bio-engineered Monofilament Weave",
    thickness: "0.8mm Micro-Ply", benefit: "Zero hotspots, seamless dynamic expansion, 360° breathability.",
    accent: "text-cyan-400", border: "border-cyan-400/40", yOffset: -140, icon: Wind,
  },
  {
    id: "carbon", num: "02", name: "AEROCARBON™ PLATE",
    img: "/img/layer-2-carbon.webp", material: "High-Modulus 3K Forged Carbon",
    thickness: "1.2mm Curved Spoon Contour", benefit: "98.4% impact-to-forward kinetic conversion.",
    accent: "text-lime-400", border: "border-lime-400/50", yOffset: -65, icon: Zap,
  },
  {
    id: "foam", num: "03", name: "HYPERNITRO™ MIDSOLE",
    img: "/img/layer-3-foam.webp", material: "Supercritical Nitrogen-Injected PEBA",
    thickness: "34mm Heel / 28mm Forefoot", benefit: "Ultra-cushioned shock dispersion.",
    accent: "text-white", border: "border-neutral-600", yOffset: 0, icon: Cpu,
  },
  {
    id: "airpod", num: "04", name: "BIOCELL™ AIR PODS",
    img: "/img/layer-4-airpod.webp", material: "Dual-Chamber Thermoplastic",
    thickness: "20 PSI Dual Fluid Flow", benefit: "Instant hydraulic rebound under impact.",
    accent: "text-lime-400", border: "border-lime-400/40", yOffset: 65, icon: Sparkles,
  },
  {
    id: "outsole", num: "05", name: "HYPERGRIP™ OUTSOLE",
    img: "/img/layer-5-outsole.webp", material: "Vulcanized Razor-Siped Rubber",
    thickness: "2.5mm Contact Lug", benefit: "Maximum wet/dry grip without rotational weight.",
    accent: "text-cyan-400", border: "border-cyan-400/40", yOffset: 140, icon: Layers,
  },
];

export default function ExplodedLayersSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready, draw } = useFrameSequence("exploded");
  const [activeLayer, setActiveLayer] = useState(0);
  const [viewMode, setViewMode] = useState<"frame_scrub" | "anatomical_slices">("frame_scrub");

  useEffect(() => {
    if (canvasRef.current) draw(canvasRef.current, 0);
  }, [ready]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const frameObj = { progress: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current, start: "top top", end: "+=180%",
          scrub: 0.3, pin: true, anticipatePin: 1,
        },
      });

      tl.to(frameObj, {
        progress: 1, ease: "none",
        onUpdate: () => {
          if (canvasRef.current) draw(canvasRef.current, frameObj.progress);
          setActiveLayer(Math.min(LAYERS.length - 1, Math.floor(frameObj.progress * LAYERS.length)));
        },
      }, 0);

      LAYERS.forEach((layer) => {
        tl.to(`#layer-${layer.id}`, { y: layer.yOffset * 1.6, scale: 1.05, opacity: 1, ease: "none" }, 0);
        tl.to(`#pin-${layer.id}`, { opacity: 1, x: 0, ease: "none" }, 0.2);
      });
    }, rootRef);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="deconstructed"
      ref={rootRef}
      className="relative w-full h-screen flex flex-col justify-between items-center pt-20 sm:pt-24 pb-4 sm:pb-8 px-3 sm:px-12 overflow-hidden bg-[#040406] cyber-grid text-white"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1100px] h-[400px] sm:h-[700px] bg-lime-500/10 rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="text-center z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-[10px] sm:text-xs font-mono mb-1 sm:mb-2 shadow-lg">
          <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">PINNED DECONSTRUCTION · 5 DISCRETE LAYERS</span>
          <span className="sm:hidden">5-LAYER DECONSTRUCTION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black font-mono tracking-tight text-white uppercase">
          EXPLODED ARCHITECTURE
        </h2>
        <p className="text-[10px] sm:text-sm font-mono text-neutral-400 mt-1 max-w-xl hidden sm:block">
          Scroll controls mechanical separation frame-by-frame.
        </p>

        {/* Mode Switcher */}
        <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 p-0.5 sm:p-1 rounded-full shadow-xl">
          <button
            onClick={() => setViewMode("frame_scrub")}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all ${
              viewMode === "frame_scrub"
                ? "bg-lime-400 text-neutral-950 font-bold shadow-[0_0_15px_#a3e635]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            FRAME-SCRUB
          </button>
          <button
            onClick={() => setViewMode("anatomical_slices")}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all ${
              viewMode === "anatomical_slices"
                ? "bg-cyan-400 text-neutral-950 font-bold shadow-[0_0_15px_#06b6d4]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            SLICES
          </button>
        </div>
      </div>

      {/* Center Canvas Stage */}
      <div className="relative w-full max-w-6xl h-[40vh] sm:h-[52vh] md:h-[58vh] max-h-[640px] flex items-center justify-center my-auto z-10">
        {viewMode === "frame_scrub" ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full object-contain img-blend drop-shadow-[0_25px_60px_rgba(6,182,212,0.35)] select-none pointer-events-none" />
            {!ready && <img src="/img/exploded.jpg" alt="Loading" className="absolute inset-0 w-full h-full object-contain img-blend pointer-events-none select-none" />}
          </div>
        ) : (
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center">
            {LAYERS.map((layer) => {
              const Icon = layer.icon;
              return (
                <div key={layer.id} id={`layer-${layer.id}`} className="relative w-full flex items-center justify-center py-0.5 sm:py-1 will-change-transform">
                  <img src={layer.img} alt={layer.name} className="w-full h-auto max-h-[60px] sm:max-h-[115px] object-contain img-fade-x select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]" />
                  <div id={`pin-${layer.id}`} className="hidden lg:flex items-center gap-3 absolute right-[-220px] opacity-0 will-change-transform z-20">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-lime-400/80 to-transparent" />
                    <div className={`px-4 py-2.5 rounded-xl bg-neutral-950/90 backdrop-blur-xl border ${layer.border} text-left font-mono w-60 shadow-2xl`}>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span>LAYER {layer.num}</span>
                        <Icon className={`w-3.5 h-3.5 ${layer.accent}`} />
                      </div>
                      <div className="text-xs font-bold text-white truncate mt-0.5">{layer.name}</div>
                      <div className={`text-[10px] ${layer.accent} mt-0.5`}>{layer.material}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Telemetry Card */}
      <div className="w-full max-w-5xl z-10 bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800/80 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-800/80 pb-2 sm:pb-3 mb-2 sm:mb-3 gap-1">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-neutral-400">LAYER:</span>
            <span className="text-lime-400 font-bold text-xs sm:text-sm">
              {LAYERS[activeLayer].num} / {LAYERS[activeLayer].name}
            </span>
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-neutral-500">
            {activeLayer + 1} OF 5
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono">
          <div>
            <span className="text-[9px] sm:text-[10px] text-neutral-500 block uppercase">COMPOSITION</span>
            <span className="text-white font-medium text-xs sm:text-sm">{LAYERS[activeLayer].material}</span>
          </div>
          <div>
            <span className="text-[9px] sm:text-[10px] text-neutral-500 block uppercase">GAUGE</span>
            <span className="text-cyan-400 font-medium text-xs sm:text-sm">{LAYERS[activeLayer].thickness}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] text-neutral-500 block uppercase">IMPACT</span>
            <span className="text-neutral-300 font-normal leading-relaxed">{LAYERS[activeLayer].benefit}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
