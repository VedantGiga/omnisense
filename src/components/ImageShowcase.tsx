"use client";

import Image from "next/image";
import styles from "./ImageShowcase.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SHOWCASE_IMAGES = [
  {
    src: "/omnisense-1stimage.png",
    eyebrow: "NEURAL-HAPTIC SYNTHESIS",
    headline: "Translating environmental metadata",
    desc: "Translates environmental metadata into 10,000 distinct points of physical sensation, allowing for the \"feeling\" of digital textures and atmospheric densities.",
  },
  {
    src: "/omnisense-2ndimage.png",
    eyebrow: "AETHER DATA MAPPING",
    headline: "Tactile reconstruction of the invisible",
    desc: "Real-time visualization and tactile reconstruction of invisible environmental metrics like electromagnetic frequency and localized spatial pressure.",
  },
  {
    src: "/omnisense-3rd-image.png",
    eyebrow: "BIOMETRIC SYNCHRONIZATION",
    headline: "Syncs with neural oscillations",
    desc: "An underlying complex vascular scanner array that syncs the device's latency with the user's resting heart rate and neural oscillations.",
  },
  {
    src: "/4thimage.png",
    eyebrow: "HOLOGRAPHIC DATA TERMINATION",
    headline: "Direct high-fidelity sensory stream",
    desc: "A fanned data-strand interface that allows for a direct, high-fidelity sensory stream without the need for traditional screen-based interfaces.",
  },
  {
    src: "/5thimage.png",
    eyebrow: "ADAPTIVE ARTICULATION",
    headline: "Mimicking natural anatomy",
    desc: "The chassis features precision-milled panel lines that allow for subtle mechanical movement, mimicking the natural articulation of the human wrist and forearm.",
  },
];

function Slide({ img, idx }: { img: typeof SHOWCASE_IMAGES[0]; idx: number }) {
  const slideRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <div ref={slideRef} className={styles.slide}>
      <motion.div style={{ opacity }} className={styles.imageContainer}>
        <motion.div style={{ y }} className={styles.parallaxWrapper}>
          <Image
            src={img.src}
            alt={img.headline}
            fill
            className={styles.image}
            priority={idx === 0}
            sizes="100vw"
          />
        </motion.div>
        <div className={styles.textOverlay} />
        <div className={styles.cornerTL} />
        <div className={styles.cornerBR} />
      </motion.div>

      <div className={styles.contentTop}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          className={styles.eyebrow}
        >
          {img.eyebrow}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          className={styles.headline}
        >
          {img.headline}
        </motion.h2>
      </div>

      <div className={styles.contentBottom}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          className={styles.desc}
        >
          {img.desc}
        </motion.p>
      </div>

      <div className={styles.slideIndex}>
        <span className={styles.indexNum}>{String(idx + 1).padStart(2, "0")}</span>
        <div className={styles.indexLine} />
      </div>
    </div>
  );
}

export default function ImageShowcase() {
  return (
    <section className={styles.showcaseSection} id="renders">
      {SHOWCASE_IMAGES.map((img, idx) => (
        <Slide key={idx} img={img} idx={idx} />
      ))}
    </section>
  );
}
