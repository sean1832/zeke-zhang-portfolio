import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

// helper functions
function getInitialAnimationLength(defaultLength, viewportHeight) {
  let Factor = 1;
  if (viewportHeight < 1300) {
    Factor = 0.65;
  }
  if (viewportHeight < 1100) {
    Factor = 0.32;
  }
  if (viewportHeight < 750) {
    Factor = 0.16;
  }
  return defaultLength * Factor;
}

function getScrollScaleFactor(defaultScale, viewportHeight) {
  let Scale = defaultScale; // Default Scale of scroll sensitivity
  if (viewportHeight < 1000) {
    Scale = 0.5;
  }
  return Scale;
}

// main component
const ScrollDrawLine = () => {
  const controls = useAnimation();
  const viewportHeight = window.innerHeight;

  // parameters
  const lineLength = 3500;
  const initialAnimationLength = getInitialAnimationLength(500, viewportHeight);
  const scrollScaleFactor = getScrollScaleFactor(0.6, viewportHeight);

  const initialFraction = initialAnimationLength / viewportHeight;

  // Initialize the animation
  useEffect(() => {
    controls.start({
      pathLength: initialFraction,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    });
  }, [controls, initialFraction]);

  // Use useScroll hook
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const scrolled = value * scrollScaleFactor;
      controls.start({ pathLength: initialFraction + scrolled });
    });

    return () => unsubscribe();
  }, [scrollYProgress, controls, initialFraction, scrollScaleFactor]);

  const svgWidth = 50; // Width of the viewBox
  const lineXPosition = svgWidth / 2; // Center the line
  return (
    <div className="absolute ss:top-[150px] top-[25px] z-10 xl:px-[226px] sm:px-[46px] px-[26px]">
      <svg
        className="block"
        width="full"
        height={`${lineLength}px`} // Adjust the height to match the line length
        viewBox={`0 0 ${svgWidth} ${lineLength}`} // Adjust viewBox width
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={`M ${lineXPosition} 0 L ${lineXPosition} ${lineLength}`}
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={controls}
        />
      </svg>
    </div>
  );
};

export default ScrollDrawLine;
