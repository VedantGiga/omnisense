"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasSequence, {
  type CanvasSequenceHandle,
} from "./CanvasSequence";
import Loader from "./Loader";
import styles from "./AssemblyHero.module.css";

const TOTAL_FRAMES = 136;

export default function AssemblyHero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<CanvasSequenceHandle>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
    if (pct >= 100) setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        canvasRef.current?.drawFrame(frameIndex);
      },
    });

    return () => {
      st.kill();
    };
  }, [isLoaded]);

  return (
    <>
      <Loader progress={loadProgress} isComplete={isLoaded} />
      <section ref={containerRef} className={styles.hero} data-lenis-prevent>
        <CanvasSequence
          ref={canvasRef}
          totalFrames={TOTAL_FRAMES}
          onProgress={handleProgress}
        />
      </section>
    </>
  );
}
