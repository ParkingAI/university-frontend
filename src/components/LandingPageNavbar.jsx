import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";

const LandingPageNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState(
    window.location.hash || "#projekt",
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const checkIfIsActive = (hash) => {
    if (!hash) return;
    return hash === activeHash;
  };

  return (
    <Navbar
      classNames={{
        wrapper: "px-0",
        menu: "px-4",
      }}
      maxWidth="full"
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <a href="/">
          <h1 className="text-5xl font-extrabold text-gray-600 tracking-tight cursor-pointer">
            Parking <span className="text-blue-400">AI</span>
          </h1>
        </a>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={checkIfIsActive("#projekt")}>
          <Link
            href="#projekt"
            color={checkIfIsActive("#projekt") ? "primary" : "foreground"}
          >
            Projekt
          </Link>
        </NavbarItem>
        <NavbarItem isActive={checkIfIsActive("#gradovi")}>
          <Link
            href="#gradovi"
            color={checkIfIsActive("#gradovi") ? "primary" : "foreground"}
          >
            Gradovi
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-0">
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="primary" href="/login" variant="flat">
            Prijava
          </Button>
        </NavbarItem>
        <NavbarMenuToggle className="sm:hidden cursor-pointer" />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem isActive={checkIfIsActive("#projekt")}>
          <Link
            href="#projekt"
            color={checkIfIsActive("#projekt") ? "primary" : "foreground"}
          >
            Projekt
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={checkIfIsActive("#gradovi")}>
          <Link
            href="#gradovi"
            color={checkIfIsActive("#gradovi") ? "primary" : "foreground"}
          >
            Gradovi
          </Link>
        </NavbarMenuItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Prijava
          </Button>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default LandingPageNavbar;
