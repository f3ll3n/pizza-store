import ContentLoader from "react-content-loader";
import styles from "./FullPizza.module.scss";

const FullPizzaSkeleton: React.FC = () => (
  <ContentLoader
    className={styles.root}
    speed={2}
    width={1300}
    height={654}
    viewBox="0 0 1300 654"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="300" cy="300" r="240" />
    <rect x="700" y="100" rx="0" ry="0" width="600" height="33" />
    <rect x="700" y="140" rx="0" ry="0" width="600" height="33" />
    <rect x="700" y="180" rx="0" ry="0" width="600" height="80" />
    <rect x="700" y="290" rx="0" ry="0" width="200" height="40" />
    <rect x="1100" y="290" rx="0" ry="0" width="200" height="60" />
  </ContentLoader>
);

export default FullPizzaSkeleton;
