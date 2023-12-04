import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { layout } from "../../style";
import { useContext, useState, useEffect } from "react";
import { CursorContext } from "../../util";

const Card = ({
  src,
  className = layout.container.image.section,
  duration = 0.6,
  delay = 0.01,
  offset = 100,
  once = false,
  title,
  subtitle,
  subtitle2,
}) => {
  const [hover, setHover] = useState(false);
  const animationControl = useAnimation();
  const { updateCursorVariant } = useContext(CursorContext);

  const animationRevealVariant = {
    hidden: {
      opacity: 0.05,
      y: offset,
    },
    visible: {
      opacity: hover ? 0.4 : 0.6,
      y: 0,
      transition: {
        delay: delay,
        duration: duration,
        ease: "easeInOut",
      },
    },
  };
  const textRevealVariant = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (hover) {
      // in hover state
      animationControl.start({
        scale: 1.05,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    } else {
      // out hover state
      animationControl.start({
        scale: 1,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    }
  }, [hover, animationControl]);

  return (
    <div
      className={`relative overflow-hidden rounded-[50px]`}
      onMouseEnter={() => {
        setHover(true);
        updateCursorVariant("hover-link");
      }}
      onMouseLeave={() => {
        setHover(false);
        updateCursorVariant("default");
      }}
    >
      <motion.img
        className={`${className}`}
        src={src}
        alt={title}
        variants={animationRevealVariant}
        initial="hidden"
        whileInView="visible"
        animate={animationControl}
        whileHover="hover"
        viewport={{
          once: once,
        }}
      />
      {hover && (
        <div>
          <motion.div
            className="absolute top-0 w-full h-full flex items-start justify-start p-10"
            variants={textRevealVariant}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col">
              <h1 className="text-white text-[32px] leading-tight">{title}</h1>
              <div className="flex justify-between">
                <p className="text-white text-[16px] opacity-50">{subtitle}</p>
                <p className="text-white text-[16px] opacity-100 font-bold">{subtitle2}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
  alt: PropTypes.string,
  offset: PropTypes.number,
  once: PropTypes.bool,
  title: PropTypes.arrayOf(PropTypes.object),
  subtitle: PropTypes.string,
  subtitle2: PropTypes.string,
};

export default Card;
