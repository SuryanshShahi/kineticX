"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Prevent mobile address bar resize from causing layout jumps/locks on touch devices
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Also sync direct native window scroll events
    const onWindowScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    return () => {
      gsap.ticker.remove(updateRaf);
      window.removeEventListener("scroll", onWindowScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
