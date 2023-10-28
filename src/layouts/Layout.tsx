import { type ReactNode } from "react";
import NavBar from "~/components/navBar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const a = 0;
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
