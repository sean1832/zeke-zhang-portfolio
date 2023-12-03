import { OnCountry, Modular } from "../assets/hero";
import { motion } from "framer-motion";
import { layout } from "../style";
import { Circle } from "../assets/icons";

const ProjectSection = () => {
  const animationRevealVariant = {
    hidden: {
      opacity: 0.05,
      y: 100,
    },
    visible: {
      opacity: 0.6,
      y: 0,
      transition: {
        delay: 0.01,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div>
      <div className=" flex flex-col overflow-hidden p-4 gap-10">
        <motion.img
          className={layout.container.image.section}
          src={OnCountry}
          alt="On Country: Australian Aboriginal Music Centres"
          variants={animationRevealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
        />
        <motion.img
          className={layout.container.image.section}
          src={Modular}
          alt="Modular House"
          variants={animationRevealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
        />
      </div>
    </div>
  );
};

export default ProjectSection;
