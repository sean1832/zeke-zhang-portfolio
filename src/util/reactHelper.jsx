import React from "react";
const renderLineBreakText = (text, delimiter = "\n") => {
  return text.split(delimiter).map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
};

export { renderLineBreakText };
