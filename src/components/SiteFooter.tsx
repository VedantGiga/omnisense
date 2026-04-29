"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import styles from "./SiteFooter.module.css";
import ParticleText from "./ParticleText";

export default function SiteFooter() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress as the footer enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the footer hits the bottom of the viewport
    // Stop tracking when the bottom of the footer hits the bottom of the viewport
    offset: ["start end", "end end"],
  });

  return (
    <footer ref={containerRef} className={styles.footer} id="buy">
      <div className={styles.middleSection}>
        <div className={styles.taglineWrapper}>
          <h2 className={styles.tagline}>
            The physical world, completely synthesized.
          </h2>
        </div>

        <div className={styles.horizontalLinks}>
          <a href="#" className={styles.navLink}>About Us</a>
          <a href="#" className={styles.navLink}>Contact</a>
          <a href="#" className={styles.navLink}>Privacy Policy</a>
          <a href="#" className={styles.navLink}>Terms of Service</a>
        </div>

        <div className={styles.giantWordmarkWrap}>
          <ParticleText text="OMNISENSE" progress={scrollYProgress} />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>© 2026 Omnisense. All rights reserved.</span>

        <div className={styles.socials}>
          {["Instagram", "Twitter", "LinkedIn"].map((s) => (
            <a key={s} href="#" className={styles.socialLink}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
