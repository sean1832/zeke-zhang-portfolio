import styles from "./style";
import { useState, useCallback } from "react";
import { Footer, Hero, Navbar, ProjectSection, ScrollDrawLine, RotateCross, Cursor } from "./components";
import { CursorContext } from "./components/SubComponents/CreateContext";

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

        <div className="bg-primary relative">
          <div className=" select-none pointer-events-none">
            <ScrollDrawLine />
            <RotateCross />
          </div>
        </div>
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
