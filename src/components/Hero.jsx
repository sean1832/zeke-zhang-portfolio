import { Circle } from "../assets/icons";
import styles from "../style";
import { TextDecode } from "./SubComponents";

const smallText =
  "xl:text-[35px] sm:text-[25px] ss:text-[18px] text-[16px] text-white";

const Hero = () => {
  return (
    <div
      className={`flex justify-start items-center xl:py-[15%] lg:py-[25%] py-[35%] ${styles.lineItemsPaddingX}`}
    >
      <div className="flex flex-col items-start sm:gap-3 gap-2">
        <div className="flex gap-4 justify-start items-center">
          <img src={Circle} className="lg:scale-50 scale-[0.3]" />
          <h1 className="xl:text-[256px] lg:text-[128px] ss:text-[92px] text-[38px] text-white">
            <TextDecode
              text="ZEKE ZHANG"
              enableBlockChar={true}
              interval={80}
            />
          </h1>
        </div>

        <div className="flex flex-col lg:gap-3 gap-0">
          <div className="flex lg:gap-12 gap-4 justify-start items-center">
            <img src={Circle} className="lg:scale-50 scale-[0.3]" />
            <p className={`${smallText}`}>DESIGN</p>
          </div>

          <div className="flex lg:gap-12 gap-4 justify-start items-center">
            <img src={Circle} className="lg:scale-50 scale-[0.3]" />
            <p className={`${smallText}`}>CODE</p>
          </div>

          <div className="flex lg:gap-12 gap-4 justify-start items-center">
            <img src={Circle} className="lg:scale-50 scale-[0.3]" />
            <p className={`${smallText}`}>ANIMATE</p>
          </div>

          <div className="flex lg:gap-12 gap-4 justify-start items-center">
            <img src={Circle} className="lg:scale-50 scale-[0.3]" />
            <p className={`${smallText}`}>RESEARCH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
