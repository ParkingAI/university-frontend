import { Button, Link } from "@heroui/react";
import LandingPageHeroIlustration from "../images/HeroFeaturesIlustration.svg";

const LandingPageHero = () => {
  return (
    <section
      id="projekt"
      className="w-full flex items-center justify-between px-3 lg:gap-12 bg-gray-50 rounded-md"
    >
      <div className="w-full flex flex-col gap-4 p-2 lg:p-0 lg:items-start lg:w-1/2">
        <h2 className="text-4xl font-extrabold text-gray-600 tracking-tight">
          Pametno parkiranje u stvarnom vremenu
        </h2>
        <p className="text-xl text-gray-600 tracking-tight">
          Razvijamo sustav koji pomoću kamera prepoznaje slobodna parkirna
          mjesta i prikazuje ih vozačima u realnom vremenu.
        </p>
        <Button
          as={Link}
          href="#gradovi"
          color="primary"
          radius="sm"
          className="font-bold w-full md:max-w-xs"
        >
          Pronađite slobodan parking
        </Button>
      </div>
      <div className="hidden w-full lg:w-1/2 lg:flex items-center justify-center">
        <img
          className="w-full object-contain"
          src={LandingPageHeroIlustration}
          alt="Features cards"
        />
      </div>
    </section>
  );
};

export default LandingPageHero;
