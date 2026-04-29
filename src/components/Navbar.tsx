"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.pillNav}>
        <div className={styles.brand}>OmniSense</div>
        <button className={styles.preOrderBtn}>Pre-order</button>
        <div className={styles.navIcons}>
          <button className={styles.iconBtn} aria-label="Menu" onClick={() => setIsMenuOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
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
          <div className={styles.modalBackdrop}>
            <motion.div
              className={styles.modalMenu}
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div className={styles.brand}>OmniSense</div>
                <div className={styles.navIcons}>
                  <button className={styles.iconBtn} onClick={() => setIsMenuOpen(false)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </button>
                  <div className={styles.iconDivider} />
                  <button className={styles.iconBtn} style={{ position: 'relative' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span className={styles.cartBadge}>0</span>
                  </button>
                </div>
              </div>

              {/* Grid Content */}
              <div className={styles.menuGrid}>
                <div className={`${styles.card} ${styles.cardDark}`}>
                  <span className={styles.cardTitle}>OmniSense Core</span>
                  <img src="/images/omnisense_core.png" alt="OmniSense Core" className={styles.cardImg} />
                </div>
                <div className={`${styles.card} ${styles.cardCream}`}>
                  <span className={styles.cardTitle}>OmniSense Pro</span>
                  <img src="/images/omnisense_pro.png" alt="OmniSense Pro" className={styles.cardImg} />
                </div>
                
                <div className={`${styles.card} ${styles.cardWide} ${styles.cardGreen}`}>
                  <span className={styles.cardTitle}>Neural Link</span>
                  <img src="/images/neural_link.png" alt="Neural Link" className={`${styles.cardImg} ${styles.imgWide}`} />
                </div>

                <div className={`${styles.card} ${styles.cardSmall} ${styles.cardPurple}`}>
                  <span className={styles.cardTitle}>Haptic Wand</span>
                  <img src="/images/haptic_wand.png" alt="Haptic Wand" className={styles.cardImgSmall} />
                </div>
                <div className={`${styles.card} ${styles.cardSmall} ${styles.cardLightGray}`}>
                  <span className={styles.cardTitle}>Sensor Caps</span>
                  <img src="/images/sensor_caps.png" alt="Sensor Caps" className={styles.cardImgSmall} />
                </div>
                <div className={`${styles.card} ${styles.cardSmall} ${styles.cardLightGray}`}>
                  <span className={styles.cardTitle}>OmniApp</span>
                  <img src="/images/omnisense_app.png" alt="OmniSense App" className={styles.cardImgSmall} />
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
