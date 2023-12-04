import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DecodeTextEffect = ({
  text,
  blockChar = {
    enabled: false,
    random: false,
    char: "█",
  },
  hideAfter = false,
  interval = 150,
  delay = 0,
  onCompleted,
  initChar = "#&░*0░",
}) => {
  const [displayedText, setDisplayedText] = useState(initChar);
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+░░░░░";

  useEffect(() => {
    let currentText = Array(text.length).fill(" ");
    let revealed = Array(text.length).fill(false);

    const revealText = () => {
      let updatedText = currentText.map((char, index) => {
        if (revealed[index]) {
          return text[index];
        } else if (revealed[index - 1] && blockChar.enabled) {
          // if previous char is revealed, reveal current char as block
          if (blockChar.random) {
            return randomChars[Math.floor(Math.random() * randomChars.length)];
          } else {
            return blockChar.char;
          }
        } else if (hideAfter) {
          return "";
        } else {
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        }
      });

      setDisplayedText(updatedText.join(""));

      let revealIndex = revealed.findIndex((val) => val === false);
      if (revealIndex !== -1) {
        revealed[revealIndex] = true;
        setTimeout(revealText, interval);
      } else {
        // if onCompleted is passed in and is a function, call it
        // (javascript short-circuit evaluation)
        onCompleted && onCompleted();
      }
    };
    // delay revealText by delay
    setTimeout(revealText, delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, hideAfter, interval]);

  return <div>{displayedText}</div>;
};

DecodeTextEffect.propTypes = {
  text: PropTypes.string.isRequired,
  blockChar: PropTypes.shape({
    enabled: PropTypes.bool,
    random: PropTypes.bool,
    char: PropTypes.string,
  }),
  hideAfter: PropTypes.bool,
  interval: PropTypes.number,
  delay: PropTypes.number,
  onCompleted: PropTypes.func,
  initChar: PropTypes.string,
};

export default DecodeTextEffect;
