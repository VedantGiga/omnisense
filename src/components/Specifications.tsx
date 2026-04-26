"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Specifications.module.css";

const specs = [
  { key: "WIDTH", value: "42mm" },
  { key: "LENGTH", value: "68mm (tapered ergonomic arc)" },
  { key: "DEPTH", value: "12.5mm at the thickest point of the optical hub" },
  { key: "WEIGHT", value: "84 grams (Grade 5 aerospace titanium)" },
  { key: "THREAD", value: "150mm integrated bio-polymer filaments" },
  { key: "MATERIALS", value: "Brushed titanium-grey housing, anodized aluminum frame" },
  { key: "PROCESSOR", value: "Annular Master PCB, quantum-logic, 12.8 TOPS" },
  { key: "BATTERY", value: "Solid-state cell array, 120-hour active lifecycle" },
  { key: "THERMAL", value: "Micro-cooling fan system, copper heat pipes" },
];

const boxItems = [
  "Omni-Sense Prime-X Core Unit",
  "150mm Bio-Polymer Neural Thread",
  "Solid-State Inductive Charging Pad",
  "Titanium Calibration Tool",
  "Encrypted Setup Protocol Drive",
];

export default function Specifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (reveals) {
        gsap.fromTo(reveals,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="specs">
      <div className={styles.introRow} data-reveal>
        <h2 className={styles.introTitle}>An architectural footprint for human anatomy.</h2>
        <p className={styles.introDesc}>
          The Omni-Sense Prime-X combines a 12.8 TOPS quantum-logic processor, a sapphire-coated aspheric lens stack, and a multi-axis haptic engine into a brushed titanium housing.
        </p>
      </div>

      <div className={styles.gridRow}>
        <div className={`${styles.gridCol} ${styles.gridColLeft}`} data-reveal>
          <div className={styles.label}>TECHNICAL FEATURES</div>
          <div className={styles.specTable}>
            {specs.map((s, i) => (
              <div key={i} className={styles.specRow}>
                <span className={styles.specKey}>{s.key}</span>
                <span className={styles.specValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.gridCol} data-reveal>
          <div className={styles.imageWrap}>
            <Image
              src="/omnisense-dimensions2.png"
              alt="OmniSense Dimensions"
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>

      <div className={styles.gridRow}>
        <div className={`${styles.gridCol} ${styles.gridColLeft}`} data-reveal>
          <div className={styles.imageWrap}>
            <Image
              src="/omnisense-box.png"
              alt="OmniSense Charging Case"
              fill
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.gridCol} data-reveal>
          <div className={styles.label}>WHAT&apos;S IN THE BOX</div>
          <div className={styles.boxList}>
            {boxItems.map((item, i) => (
              <div key={i} className={styles.boxItem}>
                <span className={styles.boxIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.boxName}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
