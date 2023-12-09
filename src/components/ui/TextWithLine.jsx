import SvgLine from "./SvgLine";
import PropType from "prop-types";

const TextWithLine = ({ text1, text2, lineLength, tableWidth = 400 }) => {
  const renderSecondColumn = (item) => {
    // Check for null, undefined, or empty string in item or item.name
    if (!item || (typeof item === "object" && !item.name)) {
      return "-";
    }
    if (typeof item === "object" && item !== null && item.url) {
      return (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.name}
        </a>
      );
    } else if (typeof item === "object" && item !== null) {
      return item.name;
    }
    return item;
  };
  const renderRows = () => {
    if (Array.isArray(text2)) {
      return text2.map((item, index) => {
        return (
          <div key={index} className="grid grid-cols-3">
            <p>{index === 0 ? text1 : ""}</p> {/* only render text1 for first row */}
            <p className="col-span-2">{renderSecondColumn(item)}</p>
          </div>
        );
      });
    }
    return (
      <div className="grid grid-cols-3">
        <p>{text1}</p>
        <p className="col-span-2">{renderSecondColumn(text2)}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col" style={{ width: `${tableWidth}px` }}>
      {renderRows()}
      <SvgLine x1={0} y1={0} x2={lineLength} y2={0} stroke="white" strokeWidth={2} />
    </div>
  );
};

TextWithLine.propTypes = {
  text1: PropType.string.isRequired,
  text2: PropType.oneOfType([PropType.string, PropType.arrayOf(PropType.object), PropType.arrayOf(PropType.string)]),
  lineLength: PropType.number.isRequired,
  tableWidth: PropType.number,
};

export default TextWithLine;
