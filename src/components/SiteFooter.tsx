"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SiteFooter.module.css";

const navColumns = [
  {
    title: "Explore",
    links: ["Product", "Technology", "Experience"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
];

export default function SiteFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Quick stagger intro for top row if needed, though scroll mapping is usually enough
  }, []);

  return (
    <footer ref={containerRef} className={styles.footer} id="buy">
      <div className={styles.topRow}>
        <div className={styles.brandInfo}>
          <span className={styles.label}>Omnisense Inc.</span>
          <h3 className={styles.tagline}>
            Engineered Precision.<br />
            <em>Tactile Perfection.</em>
          </h3>
        </div>

        <div className={styles.navRow}>
          {navColumns.map((col, idx) => (
            <div key={idx} className={styles.navCol}>
              <span className={styles.navTitle}>{col.title}</span>
              {col.links.map((link) => (
                <a key={link} href="#" className={styles.navLink}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.giantWordmarkWrap}>
        <motion.div 
          ref={wordmarkRef}
          className={styles.giantWordmark}
          style={{ scale, y }}
        >
          Omnisense
        </motion.div>
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
