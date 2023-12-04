import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Arrow45 } from "../../assets/icons";
import PropTypes from "prop-types";

function centerArrow(circleSize, arrowSize) {
  let offsetX = (circleSize - arrowSize) / 2;
  let offsetY = (circleSize - arrowSize) / 2;
  return { offsetX, offsetY };
}

const Cursor = ({ cursorVariant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const size = {
    default: {
      circle: 24,
      arrow: 0,
    },
    hover: {
      circle: 24,
    },
    hoverLarge: {
      circle: 250,
    },
    hoverLink: {
      circle: 64,
      arrow: 32,
      offset: 40,
    },
  };

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const transition = {
    type: "tween",
    ease: "backOut",
    duration: 0.3,
  };

  const cursorVariants = {
    default: {
      height: size.default.circle,
      width: size.default.circle,
      x: mousePosition.x - size.default.circle / 2,
      y: mousePosition.y - size.default.circle / 2,
      "background-color": "rgba(0, 0, 0, 0)", // transparent
      border: "2px solid white",
      transition: transition,
    },
    hover: {
      height: size.hover.circle,
      width: size.hover.circle,
      x: mousePosition.x - size.hover.circle / 2,
      y: mousePosition.y - size.hover.circle / 2,
      transition: transition,
    },
    "hover-lg": {
      height: size.hoverLarge.circle,
      width: size.hoverLarge.circle,
      x: mousePosition.x - size.hoverLarge.circle / 2,
      y: mousePosition.y - size.hoverLarge.circle / 2,
      mixBlendMode: "difference",
      transition: transition,
    },
    "hover-link": {
      height: size.hoverLink.circle,
      width: size.hoverLink.circle,
      x: mousePosition.x - size.hoverLink.circle / 2 + size.hoverLink.offset,
      y: mousePosition.y - size.hoverLink.circle / 2 + size.hoverLink.offset,
      transition: transition,
    },
  };

  const arrowVariants = {
    default: {
      opacity: 0,
      height: size.default.arrow,
      width: size.default.arrow,
      x: mousePosition.x - size.default.arrow / 2,
      y: mousePosition.y - size.default.arrow / 2,
      transition: transition,
    },
    hover: {
      opacity: 0,
    },
    "hover-lg": {
      opacity: 0,
    },
    "hover-link": {
      opacity: 1,
      height: size.hoverLink.arrow,
      width: size.hoverLink.arrow,
      x: mousePosition.x - centerArrow(size.hoverLink.circle, size.hoverLink.arrow).offsetX + size.hoverLink.offset,
      y: mousePosition.y - centerArrow(size.hoverLink.circle, size.hoverLink.arrow).offsetY + size.hoverLink.offset,
      transition: transition,
    },
  };

  return (
    <div className="relative">
      <motion.img
        src={Arrow45}
        className="fixed z-[51] pointer-events-none"
        variants={arrowVariants}
        animate={cursorVariant}
      />
      <motion.div className="cursor z-50" variants={cursorVariants} animate={cursorVariant} />
    </div>
  );
};

Cursor.propTypes = {
  cursorVariant: PropTypes.string,
};

export default Cursor;
