import { useContext } from "react";
import ReactPlayer from "react-player/youtube";

import { ProjectDescription } from "../../../components/layout";
import { CursorContext } from "../../../components/utility";
import { ScrollToTop } from "../../../components/feature";
import SharaClarkeData from "../../../data/projects/SharaClarkeData.json";
import styles from "../../../style";
import { SharaClarke_SitePlan } from "../../../assets/projects/SharaClarke/svg";
import { NorthPoint, ImageMap, DotMarker, Modal } from "../../../components/ui";
import { useModal } from "../../../hooks";
import ArchieRoachModal from "./ArchieRoachModal";

const SharaClarke = () => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const spots = [
    {
      x: 95,
      y: 47,
      radius: 3,
      component: (
        <div>
          <button className="flex flex-col items-center gap-1" onClick={openModal}>
            <DotMarker size={20} />
            <h2>ARCHIE ROACH MUSIC HALL</h2>
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} variant="top">
            <ArchieRoachModal />
          </Modal>
        </div>
      ),
    },
    {
      x: 78,
      y: 47,
      radius: 2,
      component: (
        <button className="flex flex-col items-center gap-1">
          <h2>MULTIPURPOSE STUDIOS</h2>
          <DotMarker size={20} />
        </button>
      ),
    },
    {
      x: 86,
      y: 59,
      radius: 2,
      component: (
        <button className="flex flex-col items-center gap-1">
          <DotMarker size={20} />
          <h2>TEACHING ROOM</h2>
        </button>
      ),
    },
    {
      x: 83.5,
      y: 75.5,
      radius: 2,
      component: (
        <button className="flex flex-col items-center gap-1">
          <DotMarker size={20} />
          <h2>RESTAURANT</h2>
        </button>
      ),
    },
  ];

  const { updateCursorVariant } = useContext(CursorContext);
  // Define callback functions for mouse enter and leave
  const handleMouseEnter = () => updateCursorVariant("disabled");
  const handleMouseLeave = () => updateCursorVariant("default");
  return (
    <div className={`text-white ${styles.paddingX}`}>
      <ScrollToTop />
      <ProjectDescription project={SharaClarkeData} />
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
