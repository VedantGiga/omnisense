"use client";

import Image from "next/image";
import styles from "./IntelligenceSection.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const INTELLIGENCE_CARDS = [
  {
    eyebrow: "NEURAL COMMAND",
    title: "Synergy",
    desc: "A natural language A.I. interface that interprets thought-patterns into system commands. Synergy learns your workflow and anticipates your next move before you even make it.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    eyebrow: "REAL-TIME TRANSLATION",
    title: "Babl",
    desc: "Using advanced neural-beamforming, Babl isolates specific voices in a crowd and provides zero-latency translation directly into your sensory stream.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <text x="7" y="14" fontSize="8" fontFamily="sans-serif" fill="currentColor">あa</text>
      </svg>
    )
  },
  {
    eyebrow: "SUPERHUMAN HEARING",
    title: "Owl",
    desc: "Owl isolates environmental noise using 16 external microphones, allowing you to focus on subtle sounds in high-density acoustic environments.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    eyebrow: "ASK ANYTHING",
    title: "Sherlock",
    desc: "Sherlock scans your environment for visual and data-based anomalies, providing real-time answers to complex spatial queries without a phone.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
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
  // We use percentages to keep it responsive without measuring
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

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
            alt="Natural Intelligence"
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
              Two taps to <br />intelligence
            </motion.h2>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            >
              The OmniSense Prime-X lets you talk to apps the way <br />you talk to people.
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
