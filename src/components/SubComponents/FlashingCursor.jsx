import { motion } from "framer-motion";

const FlashingCursor = () => {
  return (
    <div className="flex relative">
      <motion.div
        className="absolute w-[80px] h-5 bg-white left-0" // Tailwind classes for cursor size and color
        animate={{ opacity: [1, 0] }} // Framer Motion animation: alternating opacity
        transition={{ repeat: Infinity, duration: 0.5 }} // Animation timing
      />
    </div>
  );
};

export default FlashingCursor;
