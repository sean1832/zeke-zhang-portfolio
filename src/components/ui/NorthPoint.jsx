import PropType from "prop-types";
import { North } from "../../assets/icons";

const NorthPoint = ({ rotation = 0, size = 100 }) => {
  return (
    <img
      src={North}
      alt="north"
      className="items-center justify-center absolute top-0 left-0"
      style={{ transform: `rotate(${rotation}deg)`, width: `${size}px`, height: "auto" }}
    />
  );
};

NorthPoint.propTypes = {
  size: PropType.number,
  rotation: PropType.number,
};

export default NorthPoint;
