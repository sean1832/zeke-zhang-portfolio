import { Circle } from "../assets/icons";
import styles from "../style";
import { TextDecode, TextDecodeCycle } from "./SubComponents";
import { motion } from "framer-motion";

const smallText =
  "xl:text-[35px] sm:text-[25px] ss:text-[18px] text-[16px] text-white";

const Hero = () => {
  return (
    <div
      className={`flex justify-start items-center xl:py-[15%] lg:py-[25%] py-[35%] ${styles.lineItemsPaddingX}`}
    >
      <div className="flex flex-col items-start">
        <div className="flex gap-4 justify-start items-center">
          <motion.img
            src={Circle}
            className="lg:scale-50 scale-[0.3]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              delay: 1,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
            }}
          />
          <h1 className="xl:text-[256px] lg:text-[128px] ss:text-[92px] text-[38px] text-white">
            <TextDecode
              text="ZEKE ZHANG_"
              enableBlockChar={true}
              interval={80}
            />
          </h1>
        </div>

        <div className="flex flex-col px-[60px]">
          <p className={`${smallText} font-bold `}>
            <TextDecodeCycle
              texts={[
                "ARCHITECTURAL DESIGNER_",
                "COMPUTATIONAL DESIGNER_",
                "OPENSOURCED DEVELOPER_",
                "ANIMATOR_",
              ]}
              interval={30}
              cycleInterval={1500}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
