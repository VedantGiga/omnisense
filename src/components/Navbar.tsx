"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.pillNav}>
        <div className={styles.brand}>OmniSense</div>
        <button className={styles.preOrderBtn}>Pre-order</button>
        <div className={styles.navIcons}>
          <button className={styles.iconBtn} aria-label="Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            )}
          </button>
          <div className={styles.iconDivider} />
          <button className={styles.iconBtn} aria-label="Cart" style={{ position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className={styles.cartBadge}>0</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <div className={styles.modalBackdrop} onClick={() => setIsMenuOpen(false)}>
            <motion.div
              className={styles.modalMenu}
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* Grid Content */}
              <div className={styles.menuGrid}>
                <div className={`${styles.card} ${styles.cardDark}`}>
                  <span className={styles.cardTitle}>OmniSense Core</span>
                  <Image src="/images/omnisense_core.png" alt="OmniSense Core" fill className={styles.cardImg} />
                </div>
                <div className={`${styles.card} ${styles.cardCream}`}>
                  <span className={styles.cardTitle}>OmniSense Pro</span>
                  <Image src="/images/omnisense_pro.png" alt="OmniSense Pro" fill className={styles.cardImg} />
                </div>
                
                <div className={`${styles.card} ${styles.cardWide} ${styles.cardGreen}`}>
                  <span className={styles.cardTitle}>Neural Link</span>
                  <Image src="/images/neural_link.png" alt="Neural Link" fill className={`${styles.cardImg} ${styles.imgWide}`} />
                </div>

                <div className={`${styles.card} ${styles.cardSmall} ${styles.cardPurple}`}>
                  <span className={styles.cardTitle}>Haptic Wand</span>
                  <Image src="/images/haptic_wand.png" alt="Haptic Wand" fill className={styles.cardImgSmall} />
                </div>
                <div className={`${styles.card} ${styles.cardSmall} ${styles.cardLightGray}`}>
                  <span className={styles.cardTitle}>Sensor Caps</span>
                  <Image src="/images/sensor_caps.png" alt="Sensor Caps" fill className={styles.cardImgSmall} />
                </div>
                <div className={`${styles.card} ${styles.cardSmall} ${styles.cardLightGray}`}>
                  <span className={styles.cardTitle}>OmniApp</span>
                  <Image src="/images/omnisense_app.png" alt="OmniSense App" fill className={styles.cardImgSmall} />
                </div>
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooter}>
                <span>©2026 OMNISENSE</span>
                <span>ALL RIGHTS RESERVED</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
