"use client";

import Image from "next/image";
import styles from "./ImageShowcase.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    desc: "An underlying complex vascular scanner array that syncs the device’s latency with the user’s resting heart rate and neural oscillations.",
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

function Slide({ img, idx }: { img: typeof SHOWCASE_IMAGES[0], idx: number }) {
  const slideRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Premium Content Reveal
      const reveals = slideRef.current?.querySelectorAll("[data-reveal]");
      if (reveals) {
        gsap.fromTo(reveals,
          {
            opacity: 0,
            y: 80,
            filter: "blur(20px)",
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: slideRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // 2. High-Fidelity Parallax (Slow and weighted)
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          {
            yPercent: -7.5,
            scale: 1.05,
          },
          {
            yPercent: 7.5,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: slideRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }
    }, slideRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={slideRef} className={styles.slide}>
      <div className={styles.imageContainer}>
        <div ref={imageRef} className={styles.parallaxWrapper}>
          <Image
            src={img.src}
            alt={img.headline}
            fill
            className={styles.image}
            priority={idx === 0}
            sizes="100vw"
          />
        </div>
      </div>

      <div className={styles.contentTop}>
        <span data-reveal className={styles.eyebrow}>{img.eyebrow}</span>
        <h2 data-reveal className={styles.headline}>{img.headline}</h2>
      </div>

      <div className={styles.contentBottom}>
        <p data-reveal className={styles.desc}>{img.desc}</p>
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
