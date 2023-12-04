import { layout } from "../style";
import { TextDecode, TextDecodeCycle } from "./SubComponents";
import { motion } from "framer-motion";
import { CursorContext } from "../util";
import { useContext } from "react";

const smallText = "xl:text-[25px] sm:text-[25px] ss:text-[18px] text-[16px] text-white";

const Hero = () => {
  const { updateCursorVariant } = useContext(CursorContext);
  return (
    <div
      className={`flex flex-col justify-between items-center xl:py-[8%] lg:py-[25%] py-[35%] ${layout.lineItems} text-center gap-10`}
    >
      <div>
        <motion.h1
          className="xl:text-[400px] lg:text-[128px] ss:text-[92px] text-[38px] text-white leading-[400px]"
          onMouseEnter={() => updateCursorVariant("hover-lg")}
          onMouseLeave={() => updateCursorVariant("default")}
        >
          <TextDecode
            text="ZEKE"
            blockChar={{
              enabled: true,
              random: false,
              char: "█",
            }}
            hideAfter={false}
            interval={80}
            delay={0}
            initChar="░#^sG"
          />
          <TextDecode
            text="ZHANG"
            blockChar={{
              enabled: true,
              random: false,
              char: "█",
            }}
            hideAfter={false}
            interval={80}
            delay={500}
          />
        </motion.h1>
      </div>

      <div className="flex flex-col px-[10px]">
        <motion.p className={`${smallText} font-bold`}>
          <TextDecodeCycle texts={["ARCHITECTURE_", "CODING_", "ANIMATION_"]} interval={30} cycleInterval={1500} />
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
