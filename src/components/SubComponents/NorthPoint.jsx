import PropType from "prop-types";
import { North } from "../../assets/icons";

const NorthPoint = ({ rotation = 0, size = 100 }) => {
  return (
    <img
      src={North}
      alt="north"
      className="items-center justify-center absolute bottom-0 right-0"
      style={{ transform: `rotate(${rotation}deg)`, width: `${size}px`, height: "auto" }}
    />
  );
};

NorthPoint.propTypes = {
  size: PropType.number,
  rotation: PropType.number,
};

export default NorthPoint;
