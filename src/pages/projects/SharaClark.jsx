import { useContext } from "react";
import ReactPlayer from "react-player/youtube";

import { ProjectDescription } from "../../components/layout";
import { CursorContext } from "../../components/utility";
import { ScrollToTop } from "../../components/feature";
import { projects } from "../../constants";
import styles from "../../style";
import { SharaClarke_SitePlan } from "../../assets/projects/SharaClarke/svg";
import { NorthPoint, ImageMap, DotMarker } from "../../components/ui";

const spots = [
  {
    x: 95,
    y: 47,
    radius: 3,
    component: (
      <button className="flex flex-col items-center gap-5">
        <DotMarker size={20} />
        <h1>ARCHIE ROACH MUSIC HALL</h1>
      </button>
    ),
    onClick: () => console.log("clicked 1"),
    onMouseEnter: () => console.log("entered 1"),
    onMouseLeave: () => console.log("left 1"),
  },
  {
    x: 80,
    y: 47,
    radius: 2,
    component: (
      <button className="flex flex-col items-center gap-5">
        <h1>MULTIPURPOSE STUDIOS</h1>
        <DotMarker size={20} />
      </button>
    ),
  },
  {
    x: 86,
    y: 58,
    radius: 2,
    component: (
      <button className="flex flex-col items-center gap-5">
        <DotMarker size={20} />
        <h1>TEACHING ROOM</h1>
      </button>
    ),
  },
  {
    x: 84.5,
    y: 75.5,
    radius: 2,
    component: (
      <button className="flex flex-col items-center gap-5">
        <DotMarker size={20} />
        <h1>RESTAURANT</h1>
      </button>
    ),
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
          className="sm:h-[1100px] h-[320px] w-full object-cover object-right sm:object-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            url="https://youtu.be/q15wEzLeKXw"
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
        <div className=" relative flex w-full">
          <NorthPoint rotation={40} />
          <ImageMap src={SharaClarke_SitePlan} alt="site plan" hotspots={spots} />
        </div>
      </div>
    </div>
  );
};

export default SharaClarke;
