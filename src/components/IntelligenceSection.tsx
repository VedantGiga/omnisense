"use client";

import Image from "next/image";
import styles from "./IntelligenceSection.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // --- CURTAIN REVEAL: plays once when section enters viewport ---
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- BG IMAGE: subtle zoom on reveal ---
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.06 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- HEADER: slide up once section is revealed ---
      gsap.fromTo(
        [`.${styles.title}`, `.${styles.subtitle}`],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
          },
        }
      );

      // Horizontal scroll
      if (cardsRef.current) {
        gsap.to(cardsRef.current, {
          x: () => -(cardsRef.current!.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${cardsRef.current!.scrollWidth - window.innerWidth}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    }, sectionRef);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
        <div ref={bgRef} className={styles.background}>
          <Image
            src="/omnisense_intelligence_bg_png_1777170023828.png"
            alt="Natural Intelligence"
            fill
            className={styles.bgImage}
            priority
            sizes="100vw"
          />
        </div>

        {/* Overlay at section level — above both background (z:1) and container (z:10) */}
        <div ref={overlayRef} className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Two taps to <br />intelligence</h2>
          <p className={styles.subtitle}>
            The OmniSense Prime-X lets you talk to apps the way <br />you talk to people.
          </p>
        </div>

        <div ref={cardsRef} className={styles.cardsWrapper}>
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
        </div>
      </div>
    </section>
  );
}
