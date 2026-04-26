"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";

interface LoaderProps {
  progress: number;
  isComplete: boolean;
}

export default function Loader({ progress, isComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  // Animate progress bar width
  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      scaleX: progress / 100,
      duration: 0.35,
      ease: "power2.out",
    });
    if (percentRef.current) {
      percentRef.current.textContent = `${Math.round(progress)}`;
    }
  }, [progress]);

  // Fade out when complete
  useEffect(() => {
    if (!isComplete || !containerRef.current) return;
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
      delay: 0.25,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });
  }, [isComplete]);

  return (
    <div ref={containerRef} className={styles.loader} role="status" aria-label="Loading">
      <div className={styles.content}>
        <div className={styles.wordmark}>OMNISENSE</div>

        <div className={styles.progressWrap}>
          <div className={styles.track}>
            <div ref={barRef} className={styles.bar} />
          </div>
          <span className={styles.counter}>
            <span ref={percentRef}>0</span>%
          </span>
        </div>

        <p className={styles.hint}>Initialising render sequence</p>
      </div>
    </div>
  );
}
