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
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }

      // Gentle text reveals
      const reveals = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (reveals) {
        reveals.forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
              }
            }
          );
        });
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
