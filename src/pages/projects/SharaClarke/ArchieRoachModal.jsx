import { formatText } from "../../../components/utility/helper";
import SharaClarkeData from "../../../data/projects/SharaClarkeData.json";

const ArchieRoachModal = () => {
  const archieRoach = SharaClarkeData.modal.archieRoach;
  return (
    <div className="w-[1200px] flex flex-col gap-6">
      <h1>{formatText(archieRoach.name, "ALL_CAPS")}</h1>
      <p>{archieRoach.paragraphs.intro}</p>
      {/* body */}
      <div className="flex gap-5 items-center justify-center">
        <div className="flex-none daisy-skeleton w-[500px] h-[500px]" />
        <p className="p-20">{archieRoach.paragraphs.groundFloor}</p>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <p className="p-20">{archieRoach.paragraphs.firstSecondFloor}</p>
        <div className="flex-none daisy-skeleton w-[500px] h-[500px]" />
      </div>

      <div className="daisy-skeleton w-full h-[500px]" />
      <p>{archieRoach.paragraphs.interior}</p>
      <div className="daisy-skeleton w-full h-[500px]" />
      <p>{archieRoach.paragraphs.spaceArrangement}</p>
    </div>
  );
};

export default ArchieRoachModal;
