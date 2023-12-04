import PropType from "prop-types";

const getSVGDimensions = (x1, y1, x2, y2, strokeWidth) => {
  // Calculate line orientation and length
  const isHorizontal = y1 === y2;
  const isVertical = x1 === x2;

  let width, height;
  if (isHorizontal) {
    width = "100%";
    height = `${strokeWidth}px`;
  } else if (isVertical) {
    width = `${strokeWidth}px`;
    height = "100%";
  } else {
    // For diagonal lines
    const deltaX = Math.abs(x2 - x1);
    const deltaY = Math.abs(y2 - y1);
    width = `${deltaX + strokeWidth}px`;
    height = `${deltaY + strokeWidth}px`;
  }
  return { width, height };
};

const SvgLine = ({ x1, y1, x2, y2, stroke, strokeWidth }) => {
  const { width, height } = getSVGDimensions(x1, y1, x2, y2, strokeWidth);
  return (
    <svg width={width} height={height}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};

SvgLine.propTypes = {
  x1: PropType.number.isRequired,
  y1: PropType.number.isRequired,
  x2: PropType.number.isRequired,
  y2: PropType.number.isRequired,
  stroke: PropType.string.isRequired,
  strokeWidth: PropType.number.isRequired,
};

export default SvgLine;
