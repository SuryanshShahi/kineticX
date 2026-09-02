"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Cpu, CheckCircle2, Sliders, Wind, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  {
    category: "PROPULSION & CHASSIS",
    items: [
      { label: "Plate Architecture", val: "AeroCarbon™ Full-Length Spoon Curvature" },
      { label: "Torsional Rigidity", val: "84 N·m/deg (Tunable Longitudinal Flex)" },
      { label: "Total Mass (Men's US 9.5)", val: "168g (5.9 oz) Featherweight" },
      { label: "Stack Height", val: "38mm Heel / 32mm Forefoot (6mm Drop)" },
    ],
  },
  {
    category: "CUSHIONING & KINETICS",
    items: [
      { label: "Midsole Compound", val: "HyperNitro™ Nitrogen-Injected PEBA" },
      { label: "Kinetic Return", val: "98.4% Documented Lab Velocity Rebound" },
      { label: "Air Cushioning", val: "BioCell™ Dual-Chamber Pressurized Pods" },
      { label: "Impact Dissipation", val: "-42% Peak Tibial Shock Acceleration" },
    ],
  },
  {
    category: "UPPER & AERODYNAMICS",
    items: [
      { label: "Upper Matrix", val: "Bio-engineered Monofilament Weave" },
      { label: "Aerodynamic Drag", val: "0.22 Cd Wind-Tunnel Tested" },
      { label: "Lacing Lock", val: "Micro-cable Tensile Lockdown Web" },
      { label: "Thermal Regulation", val: "Zone-Engineered Airflow Portals" },
    ],
  },
];

export default function SpecsShowcaseSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".spec-card-anim", {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="specs"
      ref={rootRef}
      className="relative w-full py-16 sm:py-28 px-4 sm:px-8 bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16 border-b border-neutral-800/80 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>LABORATORY BENCHMARK DATA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-white uppercase">
              TECHNICAL TELEMETRY
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-mono text-neutral-400">
            Every millimeter computed with computational fluid dynamics (CFD) and verified by Olympic marathon test athletes.
          </p>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {SPECS.map((group, idx) => (
            <div
              key={idx}
              className="spec-card-anim bg-neutral-900/40 border border-neutral-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:border-neutral-700 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 sm:pb-3 mb-3 sm:mb-6">
                <span className="font-mono text-xs font-bold text-lime-400 tracking-wider">
                  {group.category}
                </span>
                <span className="font-mono text-[10px] text-neutral-500">
                  SEC // 0{idx + 1}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {group.items.map((item, i) => (
                  <div key={i} className="font-mono">
                    <div className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-200 mt-0.5">
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Benchmark Metric Callout */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/90 border border-lime-400/30 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_0_40px_rgba(163,230,53,0.08)]">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-lime-400/10 border border-lime-400/40 flex items-center justify-center text-lime-400 flex-shrink-0">
              <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-mono text-xs sm:text-sm font-bold text-white">
                WORLD ATHLETICS COMPLIANT
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-neutral-400 mt-0.5">
                38mm max stack, single carbon plate certified for competition.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono self-stretch lg:self-auto justify-between border-t lg:border-t-0 border-neutral-800 pt-4 lg:pt-0">
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 block">MARATHON EFFICIENCY</span>
              <span className="text-lime-400 font-bold text-lg">+4.8% FASTER</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 block">DURABILITY RATING</span>
              <span className="text-cyan-400 font-bold text-lg">1,200+ KM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
