import { ProjectDescription } from "../../components";
import { useContext } from "react";
import { CursorContext } from "../../util/CursorContext";
import ReactPlayer from "react-player/youtube";
import { projects } from "../../constants";
import styles from "../../style";
import { SharaClarke_SitePlan } from "../../assets/projects/SharaClarke/svg";
import { NorthPoint, ScrollToTop, ImageMap } from "../../components/SubComponents";

const spots = [
  {
    x: 95,
    y: 47,
    radius: 3,
    component: <button>ARCHIE ROACH MUSIC HALL</button>,
    onClick: () => console.log("clicked 1"),
    onMouseEnter: () => console.log("entered 1"),
    onMouseLeave: () => console.log("left 1"),
  },
  {
    x: 80,
    y: 47,
    radius: 2,
    component: <button>MULTIPURPOSE STUDIOS</button>,
  },
  {
    x: 84.5,
    y: 77,
    radius: 2,
    component: <button>RESTAURANT</button>,
  },
];

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
          {/* <img src={SharaClarke_SitePlan} alt="site plan" /> */}
          <ImageMap src={SharaClarke_SitePlan} alt="site plan" hotspots={spots} />
        </div>
      </div>
    </div>
  );
};

export default SharaClarke;
