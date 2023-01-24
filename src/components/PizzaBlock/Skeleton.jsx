import React from "react";
import ContentLoader from "react-content-loader";
//#ecebeb

const Skeleton = () => (
  <div className="pizza-block_wrapper">
    <ContentLoader
      className="pizza-block"
      speed={0.4}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#d9d9d9"
      foregroundColor="#c4c4c4"
    >
      <circle cx="138" cy="128" r="126" />
      <rect x="0" y="275" rx="10" ry="10" width="280" height="27" />
      <rect x="-1" y="311" rx="10" ry="10" width="280" height="76" />
      <rect x="0" y="420" rx="10" ry="10" width="90" height="27" />
      <rect x="127" y="420" rx="23" ry="23" width="150" height="45" />
    </ContentLoader>
  </div>
); 

export default Skeleton;
