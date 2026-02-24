import LandingPageNavbar from "../components/LandingPageNavbar";
import LandingPageHero from "../components/LandingPageHero";
import LandingPageMap from "../components/LandingPageMap";
import LandingPageFooter from "../components/LandingPageFooter";

const LandingPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col justify-between min-h-screen gap-10">
      <LandingPageNavbar />
      <LandingPageHero />
      <LandingPageMap />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;
