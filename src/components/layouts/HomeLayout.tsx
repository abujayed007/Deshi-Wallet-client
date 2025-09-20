import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex-col">
      <Navbar />
      <div className="grow-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
