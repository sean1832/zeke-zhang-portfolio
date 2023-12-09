import PropType from "prop-types";
import { TextWithLine, TextWithLineStack } from "../ui";
import { renderLineBreakText } from "../utility/reactHelper";

const ProjectDescription = ({ project }) => {
  const windowWidth = window.innerWidth;
  const lineWidth = windowWidth / 2;
  const tableWidth = windowWidth / 2;

  // deconstruct object
  const { fullName, id, name, location, year, type, group, awards, publications, description } =
    project;

  const bindText = (text) => {
    if (Array.isArray(text) && text.length > 1) {
      return text.join(", ");
    }
    return text;
  };

  return (
    <div className="">
      <h0>{renderLineBreakText(fullName)}</h0>
      <div className="flex py-20 justify-between text-[12px] gap-7">
        <div className="flex flex-col gap-2">
          <TextWithLine text1="PROJECT" text2={id} lineLength={lineWidth} tableWidth={tableWidth} />
          <TextWithLine text1="NAME" text2={name} lineLength={lineWidth} tableWidth={tableWidth} />
          <TextWithLine
            text1="LOCATION"
            text2={location}
            lineLength={lineWidth}
            tableWidth={tableWidth}
          />
          <TextWithLine text1="YEAR" text2={year} lineLength={lineWidth} tableWidth={tableWidth} />
          <TextWithLine text1="TYPE" text2={type} lineLength={lineWidth} tableWidth={tableWidth} />
          <TextWithLine
            text1="GROUP-WITH"
            text2={bindText(group)}
            lineLength={lineWidth}
            tableWidth={tableWidth}
          />
          <TextWithLine
            text1="AWARDS"
            text2={awards}
            lineLength={lineWidth}
            tableWidth={tableWidth}
          />
          <TextWithLine
            text1="PUBLICATIONS"
            text2={publications}
            lineLength={lineWidth}
            tableWidth={tableWidth}
          />
        </div>
        <div>
          <TextWithLineStack
            text1="ABOUT"
            text2={description}
            lineLength={lineWidth - 200}
            tableWidth={tableWidth - 200}
          />
        </div>
      </div>
    </div>
  );
};

ProjectDescription.propTypes = {
  project: PropType.object.isRequired,
};

export default ProjectDescription;
