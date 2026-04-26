"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MetricsSection.module.css";

const metrics = [
  { value: "0.2ms", label: "RESPONSE LATENCY", desc: "Near-instant neurological feedback loop." },
  { value: "40K+", label: "HAPTIC POINTS", desc: "Unprecedented environmental awareness." },
  { value: "99.9%", label: "SYNC RATE", desc: "Bilateral neural link efficiency." }
];

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(`.${styles.metricItem}`);
      
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {metrics.map((metric, idx) => (
          <div key={idx} className={styles.metricItem}>
            <div className={styles.value}>{metric.value}</div>
            <div className={styles.label}>{metric.label}</div>
            <div className={styles.desc}>{metric.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}