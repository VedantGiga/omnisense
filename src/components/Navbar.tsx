"use client";

import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.pillNav}>
      <div className={styles.brand}>OmniSense</div>
      <button className={styles.preOrderBtn}>Pre-order</button>
      <div className={styles.navIcons}>
        <button className={styles.iconBtn} aria-label="Menu">
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
  );
}
