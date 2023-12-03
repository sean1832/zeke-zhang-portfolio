import { motion } from "framer-motion";
import { Cross } from "../assets/icons";
import { layout } from "../style";

const RotateCross = () => {
  return (
    <motion.div
      className="absolute ss:top-[130px] top-[3px] z-9"
      animate={{ rotate: 180 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <img
        src={Cross}
        className={`${layout.lineItems} xl:scale-[1.5] sm:scale-[1.0] scale-[0.8]`}
      />
    </motion.div>
  );
};

export default RotateCross;
