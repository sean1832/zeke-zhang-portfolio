import { ProjectDescription } from "../../components";
import { useContext } from "react";
import { CursorContext } from "../../util/CursorContext";
import ReactPlayer from "react-player/youtube";
import { projects } from "../../constants";
import styles from "../../style";
import { SharaClarke_SitePlan } from "../../assets/projects/SharaClarke/svg";
import { NorthPoint, ScrollToTop } from "../../components/SubComponents";

const SharaClarke = () => {
  const { updateCursorVariant } = useContext(CursorContext);
  // Define callback functions for mouse enter and leave
  const handleMouseEnter = () => updateCursorVariant("disabled");
  const handleMouseLeave = () => updateCursorVariant("default");
  const sharaClark = projects.sharaClarke;
  return (
    <div className={`text-white ${styles.paddingX}`}>
      <ScrollToTop />
      <ProjectDescription project={sharaClark} />
      <div className="flex flex-col gap-10">
        <div
          className={`sm:h-[1100px] h-[320px] w-full object-cover object-right sm:object-center`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer url="https://youtu.be/q15wEzLeKXw" width="100%" height="100%" controls={true} />
        </div>
        <div className=" relative flex w-full">
          <NorthPoint rotation={40} />
          <img src={SharaClarke_SitePlan} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default SharaClarke;
