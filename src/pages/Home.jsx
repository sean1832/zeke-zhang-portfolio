import { Hero, ProjectSection } from "../components";
import styles from "../style";

const Home = () => {
  return (
    <div>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
      <ProjectSection />
    </div>
  );
};

export default Home;
