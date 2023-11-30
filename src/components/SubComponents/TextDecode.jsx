import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DecodeTextEffect = ({
  text,
  enableBlockChar = false,
  interval = 150,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+░░░░░";

  useEffect(() => {
    let currentText = Array(text.length).fill(" ");
    let revealed = Array(text.length).fill(false);

    const revealText = () => {
      let updatedText = currentText.map((char, index) => {
        if (revealed[index]) {
          return text[index];
        } else if (revealed[index - 1] && enableBlockChar) {
          // if previous char is revealed, reveal current char as block
          return "█";
        } else {
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        }
      });

      setDisplayedText(updatedText.join(""));

      let revealIndex = revealed.findIndex((val) => val === false);
      if (revealIndex !== -1) {
        revealed[revealIndex] = true;
        setTimeout(revealText, interval);
      }
    };

    revealText();
  }, [text, enableBlockChar, interval]);

  return <div>{displayedText}</div>;
};

DecodeTextEffect.propTypes = {
  text: PropTypes.string.isRequired,
  enableBlockChar: PropTypes.bool,
  interval: PropTypes.number,
};

export default DecodeTextEffect;
