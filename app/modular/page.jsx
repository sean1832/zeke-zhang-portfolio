import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";
import Footer from "@/components/section/footer";

const projectName = "Modular: Natural - Build";

const data = projectData.find(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);

export const metadata = {
  title: projectName,
  description: data.description,
};

const ModularPage = () => {
  return (
    <div className="px-10">
      <NavBar />
      <ProjectInfo data={data} />
      <Footer />
    </div>
  );
};

export default ModularPage;
