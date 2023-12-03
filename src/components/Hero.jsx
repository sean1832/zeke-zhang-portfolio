import { Circle } from "../assets/icons";
import { layout } from "../style";
import { TextDecode, TextDecodeCycle } from "./SubComponents";
import { motion } from "framer-motion";
import { CursorContext } from "./SubComponents/CreateContext";
import { useContext } from "react";

const smallText = "xl:text-[40px] sm:text-[25px] ss:text-[18px] text-[16px] text-white";

const Hero = () => {
  const { updateCursorVariant } = useContext(CursorContext);
  return (
    <div className={`flex justify-start items-center xl:py-[15%] lg:py-[25%] py-[35%] ${layout.lineItems}`}>
      <div className="flex flex-col items-start">
        <div className="flex gap-4 justify-start items-center">
          <motion.img
            src={Circle}
            className="select-none"
            initial={{ scale: 0 }}
            animate={{ scale: 0.7 }}
            transition={{
              duration: 1,
              delay: 1.2,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
            }}
          />
          <motion.h1
            className="xl:text-[256px] lg:text-[128px] ss:text-[92px] text-[38px] text-white leading-tight"
            onMouseEnter={() => updateCursorVariant("hover-lg")}
            onMouseLeave={() => updateCursorVariant("default")}
          >
            <div className="flex">
              <TextDecode
                text="ZEKE ZHANG_"
                blockChar={{
                  enabled: true,
                  random: false,
                  char: "█",
                }}
                hideAfter={false}
                interval={80}
              />
            </div>
          </motion.h1>
        </div>

        <div className="flex flex-col px-[60px]">
          <motion.p className={`${smallText} font-bold`}>
            <TextDecodeCycle texts={["ARCHITECTURE_", "CODING_", "ANIMATION_"]} interval={30} cycleInterval={1500} />
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
