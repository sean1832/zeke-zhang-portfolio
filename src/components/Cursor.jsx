import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Modular } from "../assets/hero";

const Cursor = ({ cursorVariant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const size = {
    default: 32,
    hover: 48,
    hoverLarge: 350,
    hoverMask: 500,
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

  const variants = {
    default: {
      height: size.default,
      width: size.default,
      x: mousePosition.x - size.default / 2, // 32px size of cursor
      y: mousePosition.y - size.default / 2, // 32px size of cursor
      transition: {
        ease: "easeOut",
      },
    },
    hover: {
      height: size.hover,
      width: size.hover,
      x: mousePosition.x - size.hover / 2, // 48px size of cursor
      y: mousePosition.y - size.hover / 2, // 48px size of cursor
      mixBlendMode: "difference",
      transition: {
        ease: "easeOut",
      },
    },
    "hover-lg": {
      height: size.hoverLarge,
      width: size.hoverLarge,
      x: mousePosition.x - size.hoverLarge / 2, // 48px size of cursor
      y: mousePosition.y - size.hoverLarge / 2, // 48px size of cursor
      mixBlendMode: "difference",
      transition: {
        ease: "easeOut",
      },
    },
    "hover-xl": {
      height: size.hoverMask,
      width: size.hoverMask,
      x: mousePosition.x - size.hoverMask / 2, // 48px size of cursor
      y: mousePosition.y - size.hoverMask / 2, // 48px size of cursor
      mixBlendMode: "difference",
      backgroundImage: `${Modular}`,
      transition: {
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="cursor z-50"
      variants={variants}
      animate={cursorVariant}
    />
  );
};

Cursor.propTypes = {
  cursorVariant: PropTypes.string,
};

export default Cursor;
