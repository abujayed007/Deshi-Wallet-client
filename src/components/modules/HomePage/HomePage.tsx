import { FAQ } from "../FAQ/FAQ";
import { Features } from "../Features/Features";
import Banner from "./Banner";
import Testimonials from "./Testmonial";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Features />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default HomePage;
