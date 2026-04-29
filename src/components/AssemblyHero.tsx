"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Loader";
import styles from "./AssemblyHero.module.css";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 136;

const getFrameUrl = (i: number) =>
  `/ezgif-74c7f3fc83153b71-jpg/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

export default function AssemblyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const handleRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastReportedRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // ── Draw frame directly (scrub-driven, context cached in ref) ────────────────
  const drawFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const canvas = ctx.canvas;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih || !cw || !ch) return;

    // object-fit: cover in physical pixels
    const scale = Math.max(cw / iw, ch / ih);
    ctx.drawImage(img, (cw - iw * scale) / 2, (ch - ih * scale) / 2, iw * scale, ih * scale);
  }, []);

  // ── Resize canvas — also (re)creates the cached context ──────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    // Cache context with alpha:false (skips compositing = faster fill)
    ctxRef.current = canvas.getContext("2d", { alpha: false }) ?? null;
    if (ctxRef.current) {
      ctxRef.current.imageSmoothingEnabled = true;
      ctxRef.current.imageSmoothingQuality = "high";
    }
    drawFrame(frameIndexRef.current);
  }, [drawFrame]);

  // ── Preload all frames ─────────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(i);
      images[i] = img;

      const onSettled = () => {
        loaded++;
        const pct = (loaded / TOTAL_FRAMES) * 100;

        if (pct >= 100) {
          setLoadProgress(100);
          setIsLoaded(true);
        } else if (pct - lastReportedRef.current >= 5) {
          lastReportedRef.current = pct;
          setLoadProgress(pct);
        }

        // Draw first frame as soon as it loads
        if (i === 0) {
          imagesRef.current = images;
          requestAnimationFrame(resizeCanvas);
        }
      };

      img.onload = onSettled;
      img.onerror = onSettled;
    }

    imagesRef.current = images;
  }, [resizeCanvas]);

  // ── GSAP animations — all triggered after frames are ready ───────────────────
  useEffect(() => {
    if (!isLoaded) return;

    requestAnimationFrame(() => {
      resizeCanvas();
      drawFrame(0);
    });

    const onResize = () => requestAnimationFrame(resizeCanvas);
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      // 1. Top corners flatten as panel rises to top
      gsap.to(sectionRef.current, {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      // 2. Handle pill fades out
      if (handleRef.current) {
        gsap.to(handleRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
            end: "top top",
            scrub: true,
          },
        });
      }

      // 3. Scale-up reveal as it rises (panel feels weighty, not flat)
      gsap.fromTo(
        sectionRef.current,
        { scale: 0.92 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 10%",
            scrub: true,
          },
        }
      );

      // 4. Pin + frame sequence
      // Frames finish at ~71% of scroll; last 29% is a subtle hold/breathe phase
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${TOTAL_FRAMES * 20 + 1500}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.3,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const frameProgress = Math.min(self.progress * 1.4, 1);
              const idx = Math.round(frameProgress * (TOTAL_FRAMES - 1));
              frameIndexRef.current = idx;
              drawFrame(idx);

              // Update progress bar imperatively (no re-render)
              if (progressFillRef.current) {
                progressFillRef.current.style.height = `${(idx / (TOTAL_FRAMES - 1)) * 100}%`;
              }

              // Fade scroll hint after first 30 frames
              if (scrollHintRef.current) {
                scrollHintRef.current.style.opacity = idx > 30 ? "0" : "1";
              }

              // Subtle canvas breathe in hold phase — direct style, NOT gsap.set()
              // gsap.set() inside onUpdate creates nested ticks → lag
              if (canvasRef.current) {
                const s = self.progress > 0.71
                  ? 1 + ((self.progress - 0.71) / 0.29) * 0.04
                  : 1;
                canvasRef.current.style.transform = `scale(${s})`;
              }
            },
          },
        }
      );
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [isLoaded, drawFrame, resizeCanvas]);

  return (
    <>
      <Loader progress={loadProgress} isComplete={isLoaded} />

      <section
        ref={sectionRef}
        className={styles.hero}
      >
        {/* Decorative handle pill — fades as section rises */}
        <div ref={handleRef} className={styles.handle}>
          <div className={styles.handlePill} />
        </div>

        {/* Full-bleed frame canvas */}
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Cinematic vignette layers */}
        <div className={styles.vignette} />
        <div className={styles.vignetteBottom} />

        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.topBarLabel}>Assembly</span>
          <span className={styles.topBarLabel}>OmniSense</span>
        </div>

        {/* Bottom-left editorial text */}
        <div className={styles.content}>
          <div className={styles.textWrap}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowText}>Phase</span>
              <div className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>01</span>
            </div>
            <h2 className={styles.headline}>Assembly</h2>
            <p className={styles.subtext}>
              Every component precision-machined to tolerances of ±0.001mm.<br />
              Engineered to become part of you.
            </p>
          </div>
        </div>

        {/* Right-side vertical progress bar */}
        <div className={styles.progress}>
          <div className={styles.progressTrack}>
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
        </div>

        {/* Scroll hint — fades after first 30 frames */}
        <div ref={scrollHintRef} className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </section>
    </>
  );
}
