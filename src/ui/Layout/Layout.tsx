import { FC, PropsWithChildren } from "react";

import "./layout.css";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="layout__container">{children}</div>;
};

export default Layout;
