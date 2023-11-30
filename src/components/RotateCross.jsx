import React from "react";
import { motion } from "framer-motion";
import { Cross } from "../assets/icons";
import styles from "../style";

const RotateCross = () => {
  return (
    <motion.div
      className="absolute ss:top-[130px] top-[3px] z-9"
      animate={{ rotate: 90 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={Cross}
        className={`${styles.lineItemsPaddingX} xl:scale-[1.5] sm:scale-[1.0] scale-[0.8]`}
      />
    </motion.div>
  );
};

export default RotateCross;
