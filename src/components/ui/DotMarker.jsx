import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

const DotMarker = ({ size = 1 }) => {
  const halfSize = size / 2;
  const [scale, setScale] = useState(0.6);

  const handleMouseEnter = () => setScale(1);
  const handleMouseLeave = () => setScale(0.6);

  return (
    <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
      {/* inter circle */}
      <motion.div
        className="absolute bg-blue-100 rounded-full z-10"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `calc(50% - ${halfSize}px)`,
          left: `calc(50% - ${halfSize}px)`,
        }}
        initial={{ scale: 0.6 }}
        animate={{ scale: scale }}
        transition={{
          type: "spring",
          duration: 2,
          stiffness: 260,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* outer circle */}
      <motion.div
        className="absolute bg-blue-600 rounded-full z-0"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `calc(50% - ${halfSize}px)`,
          left: `calc(50% - ${halfSize}px)`,
        }}
        initial={{ scale: 0.4, opacity: 0.9 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{
          damping: 10,
          duration: 2,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

DotMarker.propTypes = {
  size: PropTypes.number.isRequired,
};

export default DotMarker;
