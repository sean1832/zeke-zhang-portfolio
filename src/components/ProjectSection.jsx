import { OnCountry, Modular, Kaira, AISuperblock } from "../assets/hero";
import { Card } from "./SubComponents";
import { renderLineBreakText } from "../util/reactHelper";

const ProjectSection = () => {
  return (
    <div>
      <div className=" flex flex-col overflow-hidden p-4 gap-10">
        <Card
          src={OnCountry}
          link={"/project/sharaclark"}
          once={true}
          title={renderLineBreakText("SHARA CLARKE ABORIGINAL\n CULTURAL & EDUCATIONAL CENTRE")}
          subtitle="DESIGN STUDIO"
          subtitle2="2021"
        />
        <Card
          src={Modular}
          once={true}
          title={renderLineBreakText("MODULAR:\nNATURAL - BUILD")}
          subtitle={"ARCHITECTURE COMPETITION"}
          subtitle2={"2021"}
        />
        <Card
          src={Kaira}
          once={true}
          title={renderLineBreakText("KAIRA LOORO:\nCHILDREN'S HOUSE")}
          subtitle={"ARCHITECTURE COMPETITION"}
          subtitle2={"2021"}
        />
        <Card
          src={AISuperblock}
          once={true}
          title={renderLineBreakText("JAKARTA RISING:\nAI SUPERBLOCK")}
          subtitle={"DESIGN STUDIO"}
          subtitle2={"2022"}
        />
      </div>
    </div>
  );
};

export default ProjectSection;
