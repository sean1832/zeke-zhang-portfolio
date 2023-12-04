import styles from "./style";
import { useState, useCallback } from "react";
import { Hero, Navbar, ProjectSection } from "./components";
import { Cursor } from "./components/SubComponents";
import { CursorContext } from "./util/CursorContext";

const App = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const updateCursorVariant = useCallback((variant) => {
    setCursorVariant(variant);
  }, []);

  return (
    <CursorContext.Provider value={{ updateCursorVariant }} className="!scroll-smooth">
      <div className="bg-primary w-full overflow-hidden">
        <Cursor cursorVariant={cursorVariant} />
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <div className="bg-primary relative"></div>
        <div className={`${styles.flexStart} z-10`}>
          {/* overlay components */}
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div>
          <ProjectSection />
        </div>
      </div>
    </CursorContext.Provider>
  );
};

export default App;
