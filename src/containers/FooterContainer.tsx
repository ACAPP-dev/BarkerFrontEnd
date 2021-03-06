import React, { ReactNode } from "react";

const FooterContainer: React.FC<ReactNode> = () => {
  return (
    <div className="bg-purple-400 items-center">
      {[<span key="item1">&#169;</span>, <span key="item2">The Barkers</span>]}
    </div>
  );
};

export default FooterContainer;
