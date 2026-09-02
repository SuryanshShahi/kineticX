"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Frame =
  | { kind: "bitmap"; img: ImageBitmap }
  | { kind: "element"; img: HTMLImageElement; url: string };

async function decodeBlob(blob: Blob): Promise<Frame> {
  try {
    const img = await createImageBitmap(blob);
    return { kind: "bitmap", img };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("img decode failed"));
      img.src = url;
    });
    return { kind: "element", img, url };
  }
}

function releaseFrame(f: Frame) {
  if (f.kind === "bitmap") f.img.close();
  else URL.revokeObjectURL(f.url);
}

export function useFrameSequence(name: string) {
  const frames = useRef<Map<number, Frame>>(new Map());
  const countRef = useRef(0);
  const lastDrawnIndex = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/frames/${name}/manifest.json`);
        if (!res.ok) return;
        const m = await res.json();
        if (!alive) return;
        countRef.current = m.count;
        const url = (i: number) =>
          `/${m.pattern.replace("%03d", String(i + 1).padStart(3, "0"))}`;

        // Fetch and decode all frames eagerly
        await Promise.all(
          Array.from({ length: m.count }, async (_, i) => {
            try {
              const blob = await fetch(url(i)).then((r) => r.blob());
              if (!alive) return;
              const f = await decodeBlob(blob);
              if (!alive) {
                releaseFrame(f);
                return;
              }
              frames.current.set(i, f);
            } catch {
              /* skip failed frames */
            }
          })
        );
        if (!alive) return;
        setReady(true);
      } catch {
        // manifest fetch fallback
      }
    })();
    return () => {
      alive = false;
      frames.current.forEach(releaseFrame);
      frames.current.clear();
    };
  }, [name]);

  // Stable draw function that never changes identity — safe for useEffect deps
  const draw = useCallback(function draw(canvas: HTMLCanvasElement | null, progress: number) {
    if (!canvas || countRef.current === 0) return;
    const i = Math.round(Math.min(1, Math.max(0, progress)) * (countRef.current - 1));
    if (i === lastDrawnIndex.current && frames.current.has(i)) return;

    let frame = frames.current.get(i);
    if (!frame) {
      for (let d = 1; d < countRef.current; d++) {
        if (frames.current.has(i - d)) { frame = frames.current.get(i - d); break; }
        if (frames.current.has(i + d)) { frame = frames.current.get(i + d); break; }
      }
    }
    if (!frame) return;

    const src = frame.img;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr);
    const ch = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, cw, ch);
    const s = Math.min(cw / src.width, ch / src.height);
    const w = src.width * s;
    const h = src.height * s;
    ctx.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
    lastDrawnIndex.current = i;
  }, []);

  return { ready, draw };
}
