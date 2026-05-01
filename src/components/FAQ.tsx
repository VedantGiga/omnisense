"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";

const FAQ_DATA = [
  {
    question: "What is the expected battery life of OmniSense Prime-X?",
    answer: "The solid-state cell array provides up to 120 hours of continuous active tracking, or 30 days on standby. It charges from 0 to 100% in 18 minutes via the included inductive pad."
  },
  {
    question: "How does OmniSense translate environmental data into haptics?",
    answer: "Using the 150mm bio-polymer neural thread and a multi-axis haptic engine, the device converts raw electromagnetic and pressure metrics into 10,000 distinct tactile micro-vibrations."
  },
  {
    question: "Does my pre-order deposit go towards my purchase?",
    answer: "Yes. Your deposit is fully applied to the final purchase price of your OmniSense unit and secures your place in the priority manufacturing queue for the initial production run."
  },
  {
    question: "Can I get the Prime-X without the custom fit for cheaper?",
    answer: "No. The precise alignment of the optical hub and neural thread requires a bespoke housing milled specifically for your anatomy. We do not offer non-custom variants."
  },
  {
    question: "Can OmniSense be worn on either arm?",
    answer: "During the initial biometric scanning process, you will specify your preferred placement. The internal sensor array is then calibrated specifically for the localized vascular structure of that arm."
  },
  {
    question: "How do I reach you if I have other questions?",
    answer: "Our specialized concierge team is available 24/7. You can reach out directly via the support portal or email us at support@omnisense.com."
  }
];

function AccordionItem({ item, index, isOpen, onClick }: { item: { question: string; answer: string }, index: number, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={styles.item}>
      <button className={`${styles.trigger} ${isOpen ? styles.isOpen : ""}`} onClick={onClick} aria-expanded={isOpen}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.question}>{item.question}</span>
        <div className={styles.iconWrap}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="12" y1="4" x2="12" y2="20" className={styles.verticalLine} />
          </svg>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={styles.answerWrap}
          >
            <div className={styles.answerInner}>
              <p className={styles.answerText}>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        {FAQ_DATA.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            index={idx}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}
