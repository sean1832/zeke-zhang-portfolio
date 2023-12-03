import { OnCountry, Modular } from "../assets/hero";
import { motion } from "framer-motion";
import { layout } from "../style";
import { SelectionCard } from "./SubComponents";

const ProjectSection = () => {
  return (
    <div>
      <div className=" flex flex-col overflow-hidden p-4 gap-10">
        <SelectionCard src={OnCountry} alt="On Country: Australian Aboriginal Music Centres" once={true} />
        <SelectionCard src={Modular} alt="Modular House" once={true} />
      </div>
    </div>
  );
};

export default ProjectSection;
