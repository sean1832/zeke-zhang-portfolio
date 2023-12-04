import { ProjectDescription } from "../../components";

import { projects } from "../../constants";
import { OnCountry } from "../../assets/hero";
import styles from "../../style";

const SharaClark = () => {
  const sharaClark = projects.sharaClark;
  return (
    <div className={`text-white ${styles.paddingX}`}>
      <ProjectDescription project={sharaClark} />
    </div>
  );
};

export default SharaClark;
