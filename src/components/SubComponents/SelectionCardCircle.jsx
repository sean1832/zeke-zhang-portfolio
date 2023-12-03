import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { layout } from "../../style";

const SelectionCardCircle = ({ src, duration = 0.6, delay = 0.01, alt, offset = 100, once = false }) => {
  const animationRevealVariant = {
    hidden: {
      opacity: 0.05,
      y: offset,
    },
    visible: {
      opacity: 0.6,
      y: 0,
      transition: {
        delay: delay,
        duration: duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div>
      <motion.img
        className={layout.container.image.section}
        src={src}
        alt={alt}
        variants={animationRevealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: once,
        }}
      />
    </div>
  );
};

SelectionCardCircle.propTypes = {
  src: PropTypes.string.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  alt: PropTypes.string,
  offset: PropTypes.number,
  once: PropTypes.bool,
};

export default SelectionCardCircle;
