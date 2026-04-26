"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Capabilities.module.css";

const features = [
  {
    num: "SYS.01",
    title: "HAPTIC\nENGINE",
    body: "Multi-axis nested micro-gear tuning system for ultra-fine, frictionless calibration of sensory feedback.",
    image: "/capability_mechanics.png"
  },
  {
    num: "SYS.02",
    title: "BIOMETRIC\nSYNC",
    body: "Vascular scanner array that syncs the device’s latency with the user’s resting heart rate and neural oscillations.",
    image: "/capability_sensors.png"
  },
  {
    num: "SYS.03",
    title: "THERMAL\nMANAGEMENT",
    body: "Micro-cooling fan system integrated with copper heat pipes to maintain a constant surface temperature against the skin.",
    image: "/capability_thermal.png"
  },
];

// Magnetic Card Component for the 3D Hover physics
function MagneticCard({ children, className }: { children: React.ReactNode, className: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !innerRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    // Calculate rotation (-10 to 10 degrees)
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;

    gsap.to(innerRef.current, {
      rotateY: x,
      rotateX: y,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power3.out",
      duration: 0.8
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className={styles.magneticInner}>
        {children}
      </div>
    </div>
  );
}

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(`.${styles.bentoCard}`);
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="design">
      <div className={styles.intro}>
        <div className={styles.eyebrow}>RAW METRICS // SUB-SYSTEMS</div>
        <h2 className={styles.title}>ENGINEERED<br />WITHOUT<br />COMPROMISE.</h2>
      </div>

      <div ref={gridRef} className={styles.bentoGrid}>

        {/* Card 1: Tall, left side */}
        <MagneticCard className={`${styles.bentoCard} ${styles.card1}`}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{features[0].num}</span>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={features[0].image} alt="Mechanics" fill className={styles.image} />
            </div>
            <div className={styles.cardFooter}>
              <h3 className={styles.cardTitle}>{features[0].title}</h3>
              <p className={styles.cardBody}>{features[0].body}</p>
            </div>
          </div>
        </MagneticCard>

        {/* Typographic Brutalist Block (No image) */}
        <MagneticCard className={`${styles.bentoCard} ${styles.cardTypo}`}>
          <div className={styles.typoContent}>
            <span className={styles.typoSmall}>LATENCY</span>
            <span className={styles.typoLarge}>ZERO</span>
            <div className={styles.gridLines}></div>
          </div>
        </MagneticCard>

        {/* Card 2: Wide, overlapping middle */}
        <MagneticCard className={`${styles.bentoCard} ${styles.card2}`}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{features[1].num}</span>
            </div>
            <div className={styles.imageWrapperWide}>
              <Image src={features[1].image} alt="Sensors" fill className={styles.image} />
            </div>
            <div className={styles.cardFooterRow}>
              <h3 className={styles.cardTitle}>{features[1].title}</h3>
              <p className={styles.cardBody}>{features[1].body}</p>
            </div>
          </div>
        </MagneticCard>

        {/* Card 3: Offset bottom right */}
        <MagneticCard className={`${styles.bentoCard} ${styles.card3}`}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{features[2].num}</span>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={features[2].image} alt="Thermal" fill className={styles.image} />
            </div>
            <div className={styles.cardFooter}>
              <h3 className={styles.cardTitle}>{features[2].title}</h3>
              <p className={styles.cardBody}>{features[2].body}</p>
            </div>
          </div>
        </MagneticCard>

      </div>
    </section>
  );
}
