"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wind,
  Zap,
  Shield,
  Activity,
  ArrowRight,
  Quote,
  Check,
  Award,
  Sliders,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BrandHomepage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const windVideoRef = useRef<HTMLVideoElement>(null);
  const [activeColor, setActiveColor] = useState("volt");

  const colors = [
    { id: "volt", name: "CYBER VOLT", color: "#a3e635", border: "border-lime-400" },
    { id: "cyan", name: "OBSIDIAN CYAN", color: "#06b6d4", border: "border-cyan-400" },
    { id: "stealth", name: "STEALTH CARBON", color: "#71717a", border: "border-neutral-500" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal all brand cards on scroll
      gsap.utils.toArray<HTMLElement>(".brand-reveal").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full bg-neutral-950 text-white">
      {/* 1. MANIFESTO */}
      <section className="py-20 sm:py-28 px-6 max-w-5xl mx-auto text-center brand-reveal">
        <span className="text-lime-400 font-mono text-xs tracking-widest uppercase block mb-4">
          // OUR MANIFESTO
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 leading-tight">
          GRAVITY IS A VARIABLE. PROPULSION IS CONSTANT.
        </h2>
        <p className="mt-8 max-w-2xl mx-auto text-neutral-400 font-mono text-sm sm:text-base leading-relaxed">
          We dismantled traditional foam vulcanization to engineer a kinetic energy system that returns what human biomechanics put in. Every gram stripped, every watt returned.
        </p>
      </section>

      {/* 2. CRAFT STORIES */}
      <section id="craft" className="py-16 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        <div className="text-center mb-16 brand-reveal">
          <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase block mb-2">
            // AEROSPACE CRAFT
          </span>
          <h3 className="text-3xl sm:text-4xl font-black font-mono uppercase text-white">
            MATERIALS FROM THE STRATOSPHERE
          </h3>
        </div>

        <div className="space-y-20">
          {/* Craft Split 1: Wind Tunnel Flow Video */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center brand-reveal">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <video
                ref={windVideoRef}
                src="/videos/windtunnel.mp4"
                poster="/img/windtunnel.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-lime-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
                <span>WIND TUNNEL SIMULATION #409 · 0.22 Cd</span>
              </div>
            </div>
            <div className="space-y-4">
              <span className="font-mono text-xs text-lime-400 font-bold uppercase">
                01. COMPUTATIONAL FLUID DYNAMICS
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                VORTEX-SHEDDING UPPER LATTICE
              </h4>
              <p className="text-neutral-400 font-mono text-xs sm:text-sm leading-relaxed">
                By modeling turbulent air separation around the ankle collar and forefoot strike zones, our bio-monofilament weave actively channels air through internal micro-venturi portals, reducing thermal buildup by 3.8°C over 42.195 km.
              </p>
              <div className="flex items-center gap-6 pt-2 font-mono text-xs">
                <div className="border-l-2 border-lime-400 pl-3">
                  <span className="text-neutral-500 block text-[10px]">DRAG REDUCTION</span>
                  <span className="text-white font-bold">-14.2%</span>
                </div>
                <div className="border-l-2 border-cyan-400 pl-3">
                  <span className="text-neutral-500 block text-[10px]">VENTILATION FLOW</span>
                  <span className="text-cyan-400 font-bold">120 L/MIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Split 2: Carbon Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center brand-reveal lg:flex-row-reverse">
            <div className="space-y-4 order-2 lg:order-1">
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase">
                02. FORGED CARBON LAB
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                AEROCARBON™ TUNED SPOON LEVER
              </h4>
              <p className="text-neutral-400 font-mono text-xs sm:text-sm leading-relaxed">
                Unlike uniform flat carbon plates that induce calf fatigue, our variable-thickness 3K forged structure features longitudinal stiffness channels. It yields under initial heel deflection then locks rigid under forefoot load to catapult the runner forward.
              </p>
              <div className="flex items-center gap-6 pt-2 font-mono text-xs">
                <div className="border-l-2 border-cyan-400 pl-3">
                  <span className="text-neutral-500 block text-[10px]">TORSIONAL RESISTANCE</span>
                  <span className="text-white font-bold">84 N·m/deg</span>
                </div>
                <div className="border-l-2 border-lime-400 pl-3">
                  <span className="text-neutral-500 block text-[10px]">KINETIC REBOUND</span>
                  <span className="text-lime-400 font-bold">98.4%</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group order-1 lg:order-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <img
                src="/img/carbon.jpg"
                alt="Forged carbon plate macro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-400">
                TELEMETRY SCAN · 3K FORGED CARBON MATRIX
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COLORWAY & DESIGN CONFIGURATOR */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-neutral-900 brand-reveal">
        <div className="text-center mb-10">
          <span className="text-lime-400 font-mono text-xs tracking-widest uppercase block mb-2">
            // COLORWAY LAB
          </span>
          <h3 className="text-3xl font-black font-mono uppercase text-white">
            CUSTOM FINISHES & TELEMETRY
          </h3>
        </div>

        <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 flex flex-col items-center gap-8 shadow-2xl">
          <div
            className="relative w-full max-w-md aspect-[16/9] flex items-center justify-center transition-all duration-500"
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
              alt="Kinetix Stride-01 Finish"
              className="w-full h-full object-contain img-blend drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
              <Sliders className="w-4 h-4 text-lime-400" />
              <span>SELECT PROFILE:</span>
            </div>

            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveColor(c.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs flex items-center gap-2 border transition-all ${
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
        </div>
      </section>

      {/* 4. NUMBERS STRIP */}
      <section className="py-16 px-6 bg-neutral-900/40 border-y border-neutral-800/80 brand-reveal">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
          <div>
            <div className="text-4xl sm:text-6xl font-black text-lime-400">168g</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Total Shoe Mass
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-6xl font-black text-white">+4.8%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Running Economy
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-6xl font-black text-cyan-400">38mm</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Max World Stack
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-6xl font-black text-lime-400">1,200</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Kilometer Lifespan
            </div>
          </div>
        </div>
      </section>

      {/* 5. ATHLETE VOICES */}
      <section className="py-20 px-6 max-w-5xl mx-auto brand-reveal">
        <div className="text-center mb-12">
          <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase block mb-2">
            // ATHLETE TESTED
          </span>
          <h3 className="text-3xl font-black font-mono uppercase text-white">
            FIELD TRIAL REPORTS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 font-mono space-y-4">
            <Quote className="w-6 h-6 text-lime-400" />
            <p className="text-sm text-neutral-300 leading-relaxed">
              "At kilometer 35 when your legs usually turn into lead, the toe-spring fulcrum takes over. It feels less like running and more like controlled low-altitude flight."
            </p>
            <div className="text-xs text-lime-400 font-bold pt-2 border-t border-neutral-800">
              MARCUS V. · SUB-2:06 MARATHONER (BERLIN)
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 font-mono space-y-4">
            <Quote className="w-6 h-6 text-cyan-400" />
            <p className="text-sm text-neutral-300 leading-relaxed">
              "The dampening from the nitrogen PEBA pods absorbs the harsh asphalt pounding without any of the squishy energy sink you find in typical supershoes."
            </p>
            <div className="text-xs text-cyan-400 font-bold pt-2 border-t border-neutral-800">
              ELENA K. · 5,000M OLYMPIC FINALIST
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRE-ORDER / RESERVATION CTA */}
      <section id="order" className="py-20 px-6 max-w-4xl mx-auto text-center brand-reveal">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-lime-400/40 relative overflow-hidden shadow-[0_0_80px_rgba(163,230,53,0.15)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-block px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-mono mb-4">
            BATCH 01 · 999 PAIRS WORLDWIDE
          </span>

          <h3 className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white uppercase">
            SECURE YOUR PAIR
          </h3>
          <p className="mt-4 max-w-lg mx-auto text-xs sm:text-sm text-neutral-400 font-mono">
            Crafted on demand with individualized carbon plate flex calibration. Includes telemetry tracking chip and custom travel pod.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-lime-400 text-neutral-950 font-mono font-black text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-lime-300 transition-all shadow-[0_0_25px_rgba(163,230,53,0.5)]">
              <span>PRE-ORDER · $295 USD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-6 py-4 rounded-full border border-neutral-700 bg-neutral-900/60 font-mono text-xs text-neutral-300 hover:text-white hover:border-neutral-500 transition-all">
              DOWNLOAD LAB WHITEPAPER
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-lime-400" /> Free Global Express
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-lime-400" /> 30-Day Track Trial
            </span>
          </div>
        </div>
      </section>

      {/* 7. FUTURISTIC FOOTER */}
      <footer className="py-16 px-6 border-t border-neutral-900 font-mono text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm mb-3">
              <Zap className="w-4 h-4 text-lime-400 fill-lime-400" />
              <span>KINETIX AERO</span>
            </div>
            <p className="text-neutral-500 text-[11px] leading-relaxed">
              Propulsion physics laboratory dedicated to redefining human mechanical velocity limits.
            </p>
          </div>

          <div>
            <div className="text-neutral-300 font-bold uppercase mb-3">ARCHITECTURE</div>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#deconstructed" className="hover:text-lime-400">Exploded 5 Layers</a></li>
              <li><a href="#energy-pulse" className="hover:text-cyan-400">Energy Pulse Wave</a></li>
              <li><a href="#specs" className="hover:text-white">CFD Telemetry</a></li>
              <li><a href="#craft" className="hover:text-white">Craft Laboratory</a></li>
            </ul>
          </div>

          <div>
            <div className="text-neutral-300 font-bold uppercase mb-3">LAB & RESEARCH</div>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-white">Supercritical Nitrogen PEBA</a></li>
              <li><a href="#" className="hover:text-white">Olympic Marathon Protocol</a></li>
              <li><a href="#" className="hover:text-white">Wind Tunnel Testing</a></li>
              <li><a href="#" className="hover:text-white">World Athletics Cert</a></li>
            </ul>
          </div>

          <div>
            <div className="text-neutral-300 font-bold uppercase mb-3">TELEMETRY SYSTEM</div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[10px] space-y-1">
              <div className="text-lime-400 font-bold">STATUS: LAB SERVERS ONLINE</div>
              <div>LOC: TOKYO / ZURICH LABS</div>
              <div>FW: V4.1.889-KINETIC</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© 2026 KINETIX PROPULSION LABS INC. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">PRIVACY</a>
            <a href="#" className="hover:text-white">TELEMETRY TERMS</a>
            <a href="#" className="hover:text-white">PATENT PORTFOLIO</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
