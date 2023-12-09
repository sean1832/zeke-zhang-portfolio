import React from "react";
import SvgLine from "./SvgLine";
import PropType from "prop-types";

const TextWithLineStack = ({ text1, text2, lineLength, tableWidth = 400 }) => {
  const renderText2 = () => {
    if (Array.isArray(text2)) {
      return text2.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index < text2.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return text2;
  };

  return (
    <div className="flex flex-col" style={{ width: `${tableWidth}px` }}>
      <h1>{text1}</h1>
      <SvgLine x1={0} y1={0} x2={lineLength} y2={0} stroke="white" strokeWidth={2} />
      <p className="mt-4">{renderText2()}</p>
    </div>
  );
};

TextWithLineStack.propTypes = {
  text1: PropType.string.isRequired,
  text2: PropType.oneOfType([PropType.string, PropType.arrayOf(PropType.object), PropType.arrayOf(PropType.string)]),
  lineLength: PropType.number.isRequired,
  tableWidth: PropType.number,
};

export default TextWithLineStack;
