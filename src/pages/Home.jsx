import { Hero, Gallery } from "../components/layout";
import styles from "../style";

const Home = () => {
  return (
    <div>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
      <Gallery />
    </div>
  );
};

export default Home;
