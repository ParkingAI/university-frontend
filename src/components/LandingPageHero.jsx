import React from "react";
import { Button } from "@heroui/react";
import LandingPageHeroIlustration from "../images/HeroFeaturesIlustration.svg";

const LandingPageHero = () => {
  return (
    <section
      id="projekt"
      className="w-full flex flex-col md:flex-row items-center justify-between px-3 md:gap-12"
    >
      <div className="w-full flex flex-col gap-4 md:items-start md:w-1/2">
        <h2 className="text-4xl font-extrabold text-gray-600 tracking-tight">
          Pametno parkiranje u stvarnom vremenu
        </h2>
        <p className="text-xl text-gray-600 tracking-tight">
          Razvijamo sustav koji pomoću kamera prepoznaje slobodna parkirna
          mjesta i prikazuje ih vozačima u realnom vremenu.
        </p>
        <Button color="primary" radius="sm" fullWidth className="font-bold">
          Pronađite slobodan parking
        </Button>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
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
