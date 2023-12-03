import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { layout } from "../../style";
import { useContext } from "react";
import { CursorContext } from "../../util";

const SelectionCard = ({
  src,
  className = layout.container.image.section,
  duration = 0.6,
  delay = 0.01,
  alt,
  offset = 100,
  once = false,
}) => {
  const { updateCursorVariant } = useContext(CursorContext);
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
        className={className}
        src={src}
        alt={alt}
        variants={animationRevealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: once,
        }}
        onMouseEnter={() => {
          updateCursorVariant("hover-link");
        }}
        onMouseLeave={() => {
          updateCursorVariant("default");
        }}
      />
    </div>
  );
};

SelectionCard.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
  alt: PropTypes.string,
  offset: PropTypes.number,
  once: PropTypes.bool,
};

export default SelectionCard;
