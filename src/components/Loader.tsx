"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import styles from "./Loader.module.css";

interface LoaderProps {
  progress: number;
  isComplete: boolean;
}

export default function Loader({ progress, isComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  // ── Progress Update ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (percentRef.current) {
      // Direct DOM update for high-frequency percentage updates
      percentRef.current.textContent = `${Math.round(progress)}`;
    }
  }, [progress]);

  // ── Intro & Outro Sequencing ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial reveal of the grid and letters
      tl.fromTo(
        `.${styles.letter}`,
        { opacity: 0, y: 10, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      // 2. Pulse the status line
      tl.to(`.${styles.statusLine}`, {
        opacity: 1,
        duration: 0.8,
      }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  // ── Exit Animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
        }
      });

      // Brief pause at 100%
      tl.to({}, { duration: 0.3 });

      // Letters flicker then disappear
      tl.to(`.${styles.letter}`, {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        duration: 0.6,
        stagger: { amount: 0.2, from: "center" },
        ease: "power4.in",
      });

      // Status text slides down
      tl.to(`.${styles.status}`, {
        opacity: 0,
        y: 20,
        duration: 0.4,
      }, "-=0.4");

      // THE BIG REVEAL: Vertical split exit
      tl.to(leftPanelRef.current, {
        xPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      }, "+=0.1");

      tl.to(rightPanelRef.current, {
        xPercent: 100,
        duration: 1.2,
        ease: "expo.inOut",
      }, "<");

      // Container fade
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
      }, "-=0.6");
    });

    return () => ctx.revert();
  }, [isComplete]);

  const word = "OMNISENSE";

  return (
    <div ref={containerRef} className={styles.loader}>
      {/* Cinematic split panels for the transition */}
      <div ref={leftPanelRef} className={styles.panelLeft} />
      <div ref={rightPanelRef} className={styles.panelRight} />

      {/* Grid Overlay for technical feel */}
      <div className={styles.gridOverlay} />

      <div className={styles.content}>
        <div ref={wordmarkRef} className={styles.wordmark}>
          {word.split("").map((char, i) => (
            <span key={i} className={styles.letter}>
              {char}
            </span>
          ))}
        </div>

        <div className={styles.status}>
          <div className={styles.statusLine} />
          <div className={styles.statusText}>
            <span>SYSTEM CALIBRATION</span>
            <span className={styles.progressValue}>
              <span ref={percentRef}>0</span>%
            </span>
          </div>
        </div>

        <div className={styles.details}>
          <span>PHYSICAL SYNTHESIS PROTOCOL ACTIVE</span>
          <span>ESTABLISHING NEURAL LINK...</span>
        </div>
      </div>

      <div className={styles.scanline} />
    </div>
  );
}
