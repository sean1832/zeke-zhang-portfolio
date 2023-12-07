import { ProjectDescription } from "../../components";
import { useContext } from "react";
import { CursorContext } from "../../util/CursorContext";
import ReactPlayer from "react-player/youtube";
import { projects } from "../../constants";
import styles from "../../style";

const SharaClarke = () => {
  const { updateCursorVariant } = useContext(CursorContext);
  // Define callback functions for mouse enter and leave
  const handleMouseEnter = () => updateCursorVariant("disabled");
  const handleMouseLeave = () => updateCursorVariant("default");
  const sharaClark = projects.sharaClarke;
  return (
    <div className={`text-white ${styles.paddingX}`}>
      <ProjectDescription project={sharaClark} />
      <div
        className={`sm:h-[1100px] h-[320px] w-full object-cover object-right sm:object-center`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ReactPlayer url="https://youtu.be/q15wEzLeKXw" width="100%" height="100%" controls={true} />
      </div>
    </div>
  );
};

export default SharaClarke;
