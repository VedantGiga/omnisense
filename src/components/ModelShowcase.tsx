"use client";

import Image from "next/image";
import styles from "./ModelShowcase.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ModelShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax effect on image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { 
            yPercent: -15,
            scale: 1.15
          },
          {
            yPercent: 15,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
      }

      // Gentle text reveals
      const reveals = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (reveals) {
        gsap.fromTo(reveals,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.98 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.imageContainer}>
        <div ref={imageRef} className={styles.parallaxWrapper}>
          <Image
            src="/omnisense-model-shoot.png"
            alt="Omnisense Model Shoot"
            fill
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <div data-reveal className={styles.eyebrow}>01 / HUMAN INTEGRATION</div>
          <h2 data-reveal className={styles.title}>BEYOND <br />PERCEPTION.</h2>
          <p data-reveal className={styles.description}>
            The Omni-Sense Prime-X is engineered with a compact, architectural
            footprint designed to feel like a seamless extension of the human anatomy.
          </p>
        </div>

        <div className={styles.rightContent}>
          <div data-reveal className={styles.statItem}>
            <span className={styles.label}>CHASSIS</span>
            <span className={styles.value}>AEROSPACE TITANIUM</span>
          </div>
          <div data-reveal className={styles.statItem}>
            <span className={styles.label}>WEIGHT</span>
            <span className={styles.value}>84 GRAMS</span>
          </div>
          <div data-reveal className={styles.statItem}>
            <span className={styles.label}>LATENCY</span>
            <span className={styles.value}>ZERO DELAY</span>
          </div>
          <div data-reveal className={styles.statItem}>
            <span className={styles.label}>HAPTICS</span>
            <span className={styles.value}>10K POINTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
