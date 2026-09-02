"use client";

import { useEffect, useState } from "react";
import { Zap, Volume2, VolumeX, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const p = Math.min(100, Math.max(0, self.progress * 100));
        setScrollProgress(p);
        setScrolled(self.scroll() > 100);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <>
      {/* Top progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-900 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-lime-400 via-cyan-400 to-lime-400 transition-all duration-75 shadow-[0_0_10px_#a3e635]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-40 w-[96%] sm:w-[92%] max-w-6xl transition-all duration-500 ${
          scrolled
            ? "bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/80 py-2.5 sm:py-3 px-4 sm:px-6 rounded-2xl sm:rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-3 sm:py-5 px-3 sm:px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lime-400 group-hover:border-lime-400/50 transition-all flex-shrink-0">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-lime-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-xs sm:text-sm tracking-widest font-black text-white">
                  KINETIX
                </span>
                <span className="hidden xs:inline px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-semibold bg-lime-400/10 text-lime-400 border border-lime-400/30">
                  STRIDE-01
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-500 hidden sm:block">
                AERO-PROPULSION LAB
              </p>
            </div>
          </a>

          {/* Center Links — Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-neutral-400">
            <a href="#deconstructed" className="hover:text-lime-400 transition-colors">
              [ 01. DECONSTRUCTED ]
            </a>
            <a href="#energy-pulse" className="hover:text-cyan-400 transition-colors">
              [ 02. ENERGY SOLE ]
            </a>
            <a href="#specs" className="hover:text-lime-400 transition-colors">
              [ 03. TELEMETRY ]
            </a>
            <a href="#craft" className="hover:text-white transition-colors">
              [ 04. MATERIALS ]
            </a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSoundActive(!soundActive)}
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all text-xs hidden sm:flex items-center gap-1.5"
              title="Ambient Audio"
            >
              {soundActive ? (
                <Volume2 className="w-3.5 h-3.5 text-lime-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline font-mono text-[10px]">
                {soundActive ? "SYNTH ON" : "MUTE"}
              </span>
            </button>

            <a
              href="#order"
              className="relative group px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-lime-400 text-neutral-950 font-mono font-bold text-[10px] sm:text-xs tracking-wider flex items-center gap-1.5 sm:gap-2 overflow-hidden shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:shadow-[0_0_30px_rgba(163,230,53,0.7)] transition-all"
            >
              <span className="relative z-10">RESERVE</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-lime-300 via-white to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-neutral-800/60 flex flex-col gap-3 font-mono text-xs tracking-wider text-neutral-400">
            <a href="#deconstructed" onClick={() => setMobileOpen(false)} className="hover:text-lime-400 transition-colors py-1">
              01. DECONSTRUCTED
            </a>
            <a href="#energy-pulse" onClick={() => setMobileOpen(false)} className="hover:text-cyan-400 transition-colors py-1">
              02. ENERGY SOLE
            </a>
            <a href="#specs" onClick={() => setMobileOpen(false)} className="hover:text-lime-400 transition-colors py-1">
              03. TELEMETRY
            </a>
            <a href="#craft" onClick={() => setMobileOpen(false)} className="hover:text-white transition-colors py-1">
              04. MATERIALS
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
