"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

const OVERVIEW_TEXT = "The Omni-Sense Prime-X is engineered with a compact, architectural footprint designed to feel like a seamless extension of the human anatomy.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pageOneRef = useRef<HTMLDivElement>(null);
  const pageTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial intro
      const tl = gsap.timeline();
      tl.from(`.${styles.title}`, { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3 })
        .from(`.${styles.subtitle}`, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.8");

      // Page one fade out on scroll
      if (pageOneRef.current) {
        gsap.to(pageOneRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "50% top",
            scrub: 0.5,
          }
        });
      }

      // Page two - set initial state then reveal
      if (pageTwoRef.current) {
        gsap.set(pageTwoRef.current, { opacity: 0, y: 100 });
        
        gsap.to(pageTwoRef.current, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: pageTwoRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 0.5,
          }
        });
      }

      // Word-by-word text reveal
      if (textRef.current) {
        const words = textRef.current.querySelectorAll("span");
        gsap.set(words, { opacity: 0.15 });
        
        gsap.to(words, {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: pageTwoRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 0.5,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero-section" ref={sectionRef} className={styles.hero}>
      <div className={styles.circlesBg} aria-hidden="true">
        <svg
          className={styles.ringsSvg}
          viewBox="0 0 1200 1600"
          preserveAspectRatio="xMidYMid slice"
        >
          <g transform="translate(600, 800)">
            <g>
              <circle r="80" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" fill="none" />
              <circle r="250" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" fill="none" />
              <circle r="520" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" fill="none" />
              <circle r="760" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" fill="none" />
            </g>
            <g className={styles.rotateSlow}>
              <circle r="160" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" fill="none" strokeDasharray="5 15" />
              <circle r="380" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2" fill="none" strokeDasharray="4 12" />
            </g>
            <g className={styles.rotateFast}>
              <circle r="310" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="4" fill="none" strokeDasharray="60 1500" strokeDashoffset="-400" />
              <circle r="520" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="3" fill="none" strokeDasharray="120 4000" strokeDashoffset="-800" />
            </g>
          </g>
        </svg>
      </div>

      <div ref={pageOneRef} className={styles.pageOne}>
        <div className={styles.eyebrow}>01 // SYSTEM OVERVIEW</div>
        <h1 className={styles.title}>OmniSense One</h1>
        <p className={styles.subtitle}>
          The world&apos;s first bio-integrated agentic computer.
        </p>
      </div>

      <div ref={pageTwoRef} className={styles.pageTwo}>
        <div className={styles.overviewMain}>
          <p ref={textRef} className={styles.bigText}>
            {OVERVIEW_TEXT.split(" ").map((word, i) => (
              <span key={i}>{word} </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
