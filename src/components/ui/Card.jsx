import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { layout } from "../../style";
import { useContext, useState, useEffect } from "react";
import { CursorContext } from "../utility";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";

const Card = ({
  src,
  className = layout.container.image.section,
  link,
  duration = 0.6,
  delay = 0.01,
  offset = 100,
  once = false,
  title,
  subtitle,
  subtitle2,
  blurhash,
}) => {
  const [hover, setHover] = useState(false);
  const animationControl = useAnimation();
  const { updateCursorVariant } = useContext(CursorContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const animationRevealVariant = {
    hidden: {
      opacity: 0.05,
      y: offset,
    },
    visible: {
      opacity: hover ? 0.5 : 0.7,
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
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

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
    <Link to={link}>
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
        onClick={() => {
          setHover(false);
          updateCursorVariant("default");
        }}
      >
        {blurhash && (
          <div style={{ display: isLoaded ? "none" : "inline" }}>
            <Blurhash
              hash={blurhash}
              width={window.innerWidth}
              height={window.innerHeight}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        )}
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
          loading="lazy"
          style={{ display: !isLoaded ? "none" : "inline" }}
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
    </Link>
  );
};

Card.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
  alt: PropTypes.string,
  offset: PropTypes.number,
  once: PropTypes.bool,
  title: PropTypes.arrayOf(PropTypes.object),
  subtitle: PropTypes.string,
  subtitle2: PropTypes.string,
  blurhash: PropTypes.string,
};

export default Card;
