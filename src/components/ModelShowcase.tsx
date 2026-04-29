"use client";

import Image from "next/image";
import styles from "./ModelShowcase.module.css";
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const STATS = [
  { label: "CHASSIS", value: "AEROSPACE TITANIUM" },
  { label: "WEIGHT",  value: "84 GRAMS" },
  { label: "LATENCY", value: "ZERO DELAY" },
  { label: "HAPTICS", value: "10K POINTS" },
];

const wordVariant = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: i * 0.13 },
  }),
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const lineVariant = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const slideVariant = {
  hidden: { opacity: 0, x: 22 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 },
  }),
};

export default function ModelShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);

  // ── Parallax via Framer Motion (works with Lenis, no position math needed) ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring for buttery parallax feel
  const rawY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y    = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  // ── Intersection observer for text reveals ──────────────────────────────────
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* ── Parallax image ───────────────────────────────────────────────────── */}
      <div className={styles.imageContainer}>
        <motion.div ref={imageRef} className={styles.parallaxWrapper} style={{ y }}>
          <Image
            src="/omnisense-model-shoot.png"
            alt="Omnisense Model Shoot"
            fill
            className={styles.image}
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className={styles.overlay} />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className={styles.content}>
        <div className={styles.leftContent}>

          {/* Eyebrow */}
          <div className={styles.eyebrowWrap}>
            <motion.div
              className={styles.eyebrowLineEl}
              style={{ transformOrigin: "left center" }}
              variants={lineVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
            <motion.span
              className={styles.eyebrow}
              variants={fadeUpVariant}
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              01 / HUMAN INTEGRATION
            </motion.span>
          </div>

          {/* Title: clip-mask word reveal */}
          <h2 className={styles.title}>
            {["BEYOND", "PERCEPTION."].map((word, i) => (
              <span key={word} className={styles.wordClip}>
                <motion.span
                  className={styles.word}
                  variants={wordVariant}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Description */}
          <motion.p
            className={styles.description}
            variants={fadeUpVariant}
            custom={6}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            The Omni-Sense Prime-X is engineered with a compact, architectural
            footprint designed to feel like a seamless extension of the human anatomy.
          </motion.p>
        </div>

        {/* Stats */}
        <div className={styles.rightContent}>
          {STATS.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className={styles.statItem}
              variants={slideVariant}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
