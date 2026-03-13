import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SlideIn — premium scroll-reveal wrapper
 *
 * Usage:
 *   <SlideIn>                     → single element, slides from left
 *   <SlideIn delay={0.2}>         → custom delay
 *   <SlideIn direction="right">   → slide from right instead
 *
 * Stagger usage (wrap multiple children):
 *   <SlideIn stagger>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </SlideIn>
 *
 * Props:
 *   direction  — "left" | "right" | "up" | "down"  (default: "left")
 *   delay      — seconds before animation starts     (default: 0)
 *   duration   — animation duration in seconds        (default: 0.7)
 *   distance   — how far off-screen in px            (default: 80)
 *   blur       — starting blur in px                 (default: 10)
 *   stagger    — boolean, staggers direct children    (default: false)
 *   staggerGap — seconds between each child           (default: 0.12)
 *   once       — only animate once                    (default: true)
 *   className  — passed through to wrapper
 */

// Premium cubic-bezier: fast start, soft overshoot landing
const premiumEase = [0.16, 1, 0.3, 1];

const getOffset = (direction, distance) => {
  switch (direction) {
    case 'right': return { x: distance, y: 0 };
    case 'up':    return { x: 0, y: distance };
    case 'down':  return { x: 0, y: -distance };
    default:      return { x: -distance, y: 0 };
  }
};

// Single element variant
function SlideInSingle({ children, direction = 'left', delay = 0, duration = 0.7, distance = 80, blur = 10, once = true, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px 0px' });
  const offset = getOffset(direction, distance);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        filter: `blur(${blur}px)`,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration,
        delay,
        ease: premiumEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container + children
function SlideInStagger({ children, direction = 'left', delay = 0, duration = 0.7, distance = 80, blur = 10, staggerGap = 0.12, once = true, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px 0px' });
  const offset = getOffset(direction, distance);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerGap,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: `blur(${blur}px)`,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: premiumEase,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

// Unified export
export default function SlideIn({ stagger = false, ...props }) {
  return stagger
    ? <SlideInStagger {...props} />
    : <SlideInSingle {...props} />;
}
