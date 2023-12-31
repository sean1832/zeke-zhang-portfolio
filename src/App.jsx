import styles from "./style";
import { useState, useCallback } from "react";
import { Home, SharaClarke } from "./pages";
import { Navbar } from "./components/layout";
import { Cursor } from "./components/feature";
import { CursorContext } from "./components/utility";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const updateCursorVariant = useCallback((variant) => {
    setCursorVariant(variant);
  }, []);

  return (
    <CursorContext.Provider value={{ updateCursorVariant }} className="!scroll-smooth">
      <Cursor cursorVariant={cursorVariant} />
      <div className="bg-primary w-full overflow-hidden">
        {/* <Router> */}
        <Router>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/project/SharaClarke" element={<SharaClarke />} />
          </Routes>
        </Router>

        {/* </Router> */}
      </div>
    </CursorContext.Provider>
  );
};

export default App;
