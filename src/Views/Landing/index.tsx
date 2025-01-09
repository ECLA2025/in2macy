import { AboutUs } from "./AboutUs";
import { FAQs } from "./FAQs";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import Navbar from "./Navbar";

export function Landing() {
  return (
    <>
      <div>
        <Navbar />
        <div className="space-y-28">
          <HeroSection />
          <AboutUs />
          <FAQs />
          <Footer />
        </div>
      </div>
    </>
  );
}
