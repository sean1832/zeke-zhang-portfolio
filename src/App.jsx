import styles from "./style";
import {
  CLA,
  Footer,
  Hero,
  Navbar,
  ProjectSection,
  ScrollDrawLine,
  RotateCross,
} from "./components";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className="bg-primary relative">
      <ScrollDrawLine />
      {/* <AnimatedCircle /> */}
      <RotateCross />
      <div className={`${styles.flexStart} z-10`}>
        {/* overlay components */}
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
    </div>

    <div className="bg-primary py-[1500px]"></div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <CLA />
        <ProjectSection />
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
