import HomeScreen from "@/app/Home/HomeScreen";

import projectsData from "@data/projects.json";
import careerData from "@data/career.json";
import skillsData from "@data/skills.json";
import { ThemeContextProvider } from "../providers/ThemeContext";

export default function Page() {
  const data = {
    projects: projectsData,
    career: careerData,
    skills: skillsData,
  };

  return <ThemeContextProvider>
            <HomeScreen data={data} />;
          </ThemeContextProvider>
}
