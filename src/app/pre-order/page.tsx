"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useAnimationFrame, useMotionValue, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./PreOrder.module.css";

const CAROUSEL_IMAGES = [
  "/pre-orderimage1.png",
  "/pre-orderimage2.png",
  "/pre-orderimage3.png",
  "/pre-orderimage4.png",
  "/pre-orderimage5.png",
  "/pre-orderimage6.png"
];

// Duplicate the array to create a seamless infinite loop (we need 2 sets to wrap at 50%)
const LOOPED_IMAGES = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

const MAIN_PRODUCT = {
  id: "prime-x",
  name: "OmniSense Prime-X",
  price: 1295,
  deposit: 99,
  image: "/pre-orderimage1.png",
  config: "Wi-Fi (32GB) / Titanium / Custom fitting"
};

const OTHER_PRODUCTS = [
  { id: "wand", name: "HAPTIC WAND", image: "/images/haptic_wand.png" },
  { id: "caps", name: "SENSOR CAPS", image: "/images/sensor_caps.png" },
];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function PreOrderPage() {
  const [quantity, setQuantity] = useState(1);
  const [isOtherProductsOpen, setIsOtherProductsOpen] = useState(false);

  // Unified Physics System for Ambient, Scroll, and Drag
  const baseX = useMotionValue(-25); // Start at Set 2 so there's a buffer set to the left
  const velocity = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, {
    damping: 40, // Lower damping for longer carry/momentum
    stiffness: 250 // Softer spring for a smoother curve
  });

  const isDragging = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default vertical scrolling to lock the page while spinning
      e.preventDefault();
      
      // Combine X and Y deltas so trackpad horizontal swipes AND mouse vertical scrolls both work perfectly in either direction.
      const delta = e.deltaX + e.deltaY;
      
      // Multiply delta to drastically increase intensity
      velocity.set(delta * 4);
      
      clearTimeout(timeoutId);
      // Wait slightly longer before killing momentum
      timeoutId = setTimeout(() => velocity.set(0), 150);
    };

    // Passive: false is required to call preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeoutId);
    };
  }, [velocity]);

  // We have 4 sets of images (LOOPED_IMAGES = CAROUSEL_IMAGES * 4)
  // We wrap between -75% and -25% (a 50% span = exactly 2 sets).
  // This guarantees we always have at least 1 full set (25%) of buffer on BOTH left and right sides!
  // The `+ 25vw` centers the 50vw-wide images perfectly in the middle of the screen.
  // On mobile, images are 100vw, so no offset is needed to center. 
  // On desktop (50vw), we use 25vw to center the 50vw-wide image.
  const x = useTransform(baseX, (v) => {
    const offset = typeof window !== "undefined" && window.innerWidth < 768 ? 0 : 25;
    return `calc(${wrap(-75, -25, v)}% + ${offset}vw)`;
  });

  useAnimationFrame((t, delta) => {
    if (isDragging.current) return; // Pause ambient/scroll movement while user is physically dragging

    const timeScale = delta / 16.66; // Normalize to 60fps
    let moveBy = -0.015 * timeScale; // Slow, gentle default ambient speed for the massive track

    // Add wheel/momentum velocity
    // smoothVelocity is positive when scrolling down. We want to move left (negative x)
    moveBy -= (smoothVelocity.get() / 2500) * timeScale;
    
    baseX.set(baseX.get() + moveBy);
  });

  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (e: Event, info: PanInfo) => {
    // 1 viewport width is a different % of the track depending on image width
    // Mobile: 100vw images -> 1 viewport = 1/24th (4.166%)
    // Desktop: 50vw images -> 1 viewport = 1/12th (8.333%)
    const multiplier = window.innerWidth < 768 ? (100 / 24) : (100 / 12);
    const movePercent = (info.delta.x / window.innerWidth) * multiplier;
    baseX.set(baseX.get() + movePercent);
  };

  const handlePanEnd = (e: Event, info: PanInfo) => {
    isDragging.current = false;
    // Inject drag velocity into the spring for momentum!
    // info.velocity.x is px/sec. Dragging left (negative) should move left.
    // Our loop uses `moveBy -= smoothVelocity`, so we need smoothVelocity to be positive to move left.
    velocity.set(-info.velocity.x / 4);
    
    // Auto-reset the velocity spring so momentum decays
    setTimeout(() => velocity.set(0), 50);
  };

  return (
    <>
      {/* Invisible scrollable height to trigger scroll events */}
      <div style={{ height: "400vh", width: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }} />
      
      <main className={styles.main}>
        {/* Infinite Background Image Carousel */}
        <div className={styles.carouselContainer}>
          <motion.div 
            className={styles.carouselTrack} 
            style={{ x }}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            {LOOPED_IMAGES.map((src, idx) => (
              <div key={idx} className={styles.imageWrap}>
                <Image
                  src={src}
                  alt={`Pre-order angle ${idx}`}
                  fill
                  className={styles.productImage}
                  priority={idx < 4}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Simplified Custom Navbar for Pre-order */}
        <nav className={styles.topNav}>
          <Link href="/" className={styles.navBrand}>OmniSense</Link>
          <div className={styles.navIcons}>
            <button className={styles.iconBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <div className={styles.navDivider} />
            <button className={styles.iconBtn} style={{ position: "relative" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className={styles.cartBadge}>1</span>
            </button>
          </div>
        </nav>

        {/* Bottom Controls */}
        <div className={styles.bottomControls}>
          
          {/* Other Products Stack */}
          <div 
            className={styles.otherProducts} 
            onMouseEnter={() => setIsOtherProductsOpen(true)}
            onMouseLeave={() => setIsOtherProductsOpen(false)}
          >
            <div className={styles.productsStack}>
              <AnimatePresence>
                {isOtherProductsOpen && OTHER_PRODUCTS.map((prod, idx) => (
                  <motion.button 
                    key={prod.id}
                    className={styles.smallThumb}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <Image src={prod.image} alt={prod.name} fill className={styles.thumbImgStack} />
                  </motion.button>
                ))}
              </AnimatePresence>
              
              <div className={styles.mainThumbRow}>
                <button className={`${styles.smallThumb} ${styles.mainThumbActive}`}>
                  <Image src={MAIN_PRODUCT.image} alt="Main" fill className={styles.thumbImgStack} />
                </button>
                {isOtherProductsOpen ? (
                  <span className={styles.otherText}>VAD PRO</span>
                ) : (
                  <span className={styles.otherText}>OTHER PRODUCTS</span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.centerPill}>
            <div className={styles.navDivider} />
            <button className={styles.iconBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <line x1="12" y1="2" x2="12" y2="22" />
              </svg>
            </button>
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#fff', marginLeft: '4px' }}>SCROLL TO SPIN</span>
          </div>

          {/* Glassmorphism Purchase Panel */}
          <div className={styles.purchasePanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitleBox}>
                <h1 className={styles.productName}>{MAIN_PRODUCT.name}</h1>
                <span className={styles.depositText}>Deposit ${MAIN_PRODUCT.deposit}.00</span>
              </div>
              
              <div className={styles.controlsRight}>
                <div className={styles.variantThumb}>
                  <Image src={MAIN_PRODUCT.image} alt="Variant" fill className={styles.thumbImg} />
                </div>
                <div className={styles.quantityControl}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className={styles.configSection}>
              <span className={styles.configLabel}>YOUR CONFIGURATION</span>
              <div className={styles.configValueWrap}>
                <span className={styles.configValue}>{MAIN_PRODUCT.config}</span>
                <button className={styles.expandBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.panelFooter}>
              <span className={styles.footerNote}>
                Pay when ships: ${(MAIN_PRODUCT.price * quantity) - (MAIN_PRODUCT.deposit * quantity)} · Pay today to reserve: ${MAIN_PRODUCT.deposit * quantity}
              </span>
              <button className={styles.reserveBtn}>
                Reserve · ${MAIN_PRODUCT.deposit * quantity}.00
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
