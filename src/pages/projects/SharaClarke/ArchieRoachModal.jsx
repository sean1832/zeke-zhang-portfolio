import { formatText } from "../../../components/utility/helper";
import SharaClarkeData from "../../../data/projects/SharaClarkeData.json";

const ArchieRoachModal = () => {
  const archieRoach = SharaClarkeData.modal.archieRoach;
  return (
    <div className="w-[1200px] flex flex-col gap-6">
      <h1>{formatText(archieRoach.name, "ALL_CAPS")}</h1>
      <p>{archieRoach.paragraphs.intro}</p>
    </div>
  );
};

export default ArchieRoachModal;
