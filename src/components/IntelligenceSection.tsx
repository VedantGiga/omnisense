"use client";

import Image from "next/image";
import styles from "./IntelligenceSection.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const INTELLIGENCE_CARDS = [
  {
    eyebrow: "SENSORY ENGINE",
    title: "Neural-Haptic Synthesis",
    desc: "Bridges the gap between digital and physical. Translates environmental metadata—like atmospheric pressure and spatial density—into localized, high-fidelity physical sensations on your skin.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    eyebrow: "ZERO-LATENCY",
    title: "Real-Time Biometric Sync",
    desc: "Utilizing an underlying complex vascular scanner array, the device continuously monitors your resting heart rate and neural oscillations to ensure flawless synchronization.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  },
  {
    eyebrow: "ENVIRONMENTAL SCAN",
    title: "Holographic Data Mapping",
    desc: "Read invisible environmental metrics. The device processes electromagnetic frequencies and thermal shifts, reconstructing them as subtle, tactile feedback without the need for a screen.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    eyebrow: "QUANTUM COOLING",
    title: "Adaptive Thermal Management",
    desc: "High-intensity quantum processing generates heat. The OmniSense utilizes a micro-cooling fan system and copper heat pipes to maintain a constant, comfortable surface temperature.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    )
  },
  {
    eyebrow: "PRECISION ENGINEERING",
    title: "Frictionless Articulation",
    desc: "Housed within the chassis is a multi-axis nested micro-gear tuning system. This allows for ultra-fine calibration of sensory feedback, functioning silently and smoothly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  }
];

export default function IntelligenceSection() {
  const targetRef = useRef<HTMLElement>(null);
  
  // Intersection Observer for reliable reveal animations (avoids GSAP position bugs)
  const isInView = useInView(targetRef, { once: true, amount: 0.1 });

  // Scroll tracking for CSS sticky horizontal scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start tracking when top of section hits top of viewport
    // End tracking when bottom of section hits bottom of viewport
    offset: ["start start", "end end"],
  });

  // Transform scroll progress (0-1) into X translation for the cards
  // We want to move left by roughly (total width - viewport width)
  // We use percentages to keep it responsive without measuring. Increased from -65% to -80% to fit 5 cards.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className={styles.section}>
      {/* Sticky container stays fixed while the tall section scrolls */}
      <div className={styles.stickyContainer}>
        
        {/* Background Layer */}
        <motion.div 
          className={styles.background}
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <Image
            src="/omnisense_intelligence_bg_png_1777170023828.png"
            alt="Core Capabilities"
            fill
            className={styles.bgImage}
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Content Container */}
        <div className={styles.container}>
          <div className={styles.header}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Core <br />Capabilities
            </motion.h2>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            >
              Bridging the gap between the digital and the physical. <br />Experience high-fidelity sensory feedback.
            </motion.p>
          </div>

          {/* Cards Wrapper — mapped to scrollYProgress */}
          <motion.div 
            className={styles.cardsWrapper}
            style={{ x }}
          >
            {INTELLIGENCE_CARDS.map((card, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardEyebrow}>{card.eyebrow}</div>
                  <div className={styles.cardIcon}>{card.icon}</div>
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
