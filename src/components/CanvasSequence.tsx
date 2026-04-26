"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";

// ─── Public API exposed via ref ───────────────────────────────────────────────
export interface CanvasSequenceHandle {
  drawFrame: (index: number) => void;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface CanvasSequenceProps {
  totalFrames: number;
  /** Called with progress 0–100 as frames preload */
  onProgress: (progress: number) => void;
  /** Override the default URL builder */
  frameUrlPattern?: (zeroBasedIndex: number) => string;
}

// Default URL pattern — matches /public/ezgif-74c7f3fc83153b71-jpg/ezgif-frame-001.jpg … 136.jpg
const defaultUrl = (i: number) =>
  `/ezgif-74c7f3fc83153b71-jpg/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

// ─── Component ────────────────────────────────────────────────────────────────
const CanvasSequence = forwardRef<CanvasSequenceHandle, CanvasSequenceProps>(
  ({ totalFrames, onProgress, frameUrlPattern }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const dprRef = useRef<number>(1);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);
    const rafIdRef = useRef<number | null>(null);

    const getUrl = frameUrlPattern ?? defaultUrl;

    // ── Canvas setup (DPI-aware) ─────────────────────────────────────────────
    const setupCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;

      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.scale(dpr, dpr);
        // Re-apply after scale (some browsers reset on resize)
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctxRef.current = ctx;
      }
    }, []);

    // ── Draw a single frame (object-fit: contain) ────────────────────────────
    const paintFrame = useCallback((index: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      const img = imagesRef.current[index];
      
      const dpr = dprRef.current;
      const canW = canvas.width / dpr;
      const canH = canvas.height / dpr;

      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canW, canH);

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      const scale = Math.max(canW / iW, canH / iH);
      const drawW = iW * scale;
      const drawH = iH * scale;
      const x = (canW - drawW) / 2;
      const y = (canH - drawH) / 2;

      ctx.drawImage(img, x, y, drawW, drawH);
    }, []);

    // ── Scheduled paint (via rAF, avoids double-paints on same frame) ────────
    const schedulePaint = useCallback(
      (index: number) => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          paintFrame(index);
        });
      },
      [paintFrame]
    );

    // ── Imperative handle exposed to parent ──────────────────────────────────
    useImperativeHandle(
      ref,
      () => ({
        drawFrame: (index: number) => {
          const clamped = Math.max(0, Math.min(index, totalFrames - 1));
          currentFrameRef.current = clamped;
          schedulePaint(clamped);
        },
      }),
      [totalFrames, schedulePaint]
    );

    // ── Mount effect: resize listener + frame preloading ─────────────────────
    useEffect(() => {
      setupCanvas();

      const onResize = () => {
        setupCanvas();
        schedulePaint(currentFrameRef.current);
      };
      window.addEventListener("resize", onResize);

      // ── Preload all frames ────────────────────────────────────────────────
      let loaded = 0;
      const images: HTMLImageElement[] = new Array(totalFrames);

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = getUrl(i);
        images[i] = img;

        const onSettled = () => {
          loaded++;
          const pct = (loaded / totalFrames) * 100;
          onProgress(pct);

          // Paint first frame as soon as it's ready
          if (i === 0 && img.complete) {
            imagesRef.current = images;
            schedulePaint(0);
          }
        };

        img.onload = onSettled;
        img.onerror = onSettled;
      }

      imagesRef.current = images;

      return () => {
        window.removeEventListener("resize", onResize);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalFrames]);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          display: "block",
          willChange: "contents",
        }}
      />
    );
  }
);

CanvasSequence.displayName = "CanvasSequence";
export default CanvasSequence;
