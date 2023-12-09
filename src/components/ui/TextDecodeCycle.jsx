import { useState, useEffect } from "react";
import TextDecode from "./TextDecode";
import PropTypes from "prop-types";

const TextDecodeCycle = ({ texts, interval = 150, cycleInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textCompleted, setTextCompleted] = useState(false);

  const handleTextCompleted = () => {
    if (!textCompleted) {
      setTextCompleted(true);
    }
  };

  useEffect(() => {
    if (textCompleted) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTextCompleted(false); // reset textCompleted
      }, cycleInterval);

      return () => clearTimeout(timer); // Corrected to clearTimeout
    }
  }, [textCompleted, texts.length, cycleInterval]);

  return <TextDecode text={texts[currentIndex]} interval={interval} onCompleted={handleTextCompleted} />;
};

TextDecodeCycle.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  cycleInterval: PropTypes.number,
};

export default TextDecodeCycle;
