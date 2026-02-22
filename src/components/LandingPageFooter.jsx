import { Divider, Button, Link } from "@heroui/react";

const LandingPageFooter = () => {
  return (
    <footer id="contact">
      <Divider />
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center gap-8 md:gap-20 mt-5">
        <div className="flex flex-col items-start gap-4 max-w-xs">
          <div className="flex flex-col gap-1.5">
            <a href="/">
              <h2 className="text-2xl font-extrabold text-gray-600 tracking-tight cursor-pointer">
                Parking <span className="text-blue-400">AI</span>
              </h2>
            </a>
            <p className="text-lg text-gray-600 tracking-tight">
              Razvijamo sustav koji pomoću kamera prepoznaje slobodna parkirna
              mjesta i prikazuje ih vozačima u realnom vremenu.
            </p>
          </div>
          <a
            href="mailto:info@slobodan-parking.com"
            className="inline-flex items-center gap-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            info@slobodan-parking.com
          </a>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-extrabold text-gray-600 tracking-tight">
            Linkovi
          </h3>
          <a href="#projekt">Projekt</a>
          <a href="#gradovi">Gradovi</a>
          <Button
            as={Link}
            href="/login"
            color="primary"
            radius="sm"
            variant="flat"
            className="max-w-37.5"
          >
            Prijava za korisnike
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
