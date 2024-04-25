import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "./main-header-background";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import { paths } from "@/lib/paths";
import NavLink from "./nav-link";

export default function MainHeader() {
  const { navigation } = paths;

  const navLinks = Object.values(navigation).map((link) => (
    <li key={link.label}>
      <NavLink path={link.path}>{link.label}</NavLink>
    </li>
  ));

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={paths.home.path}>
          <Image src={logoImg} alt="A plate with food on it" priority />
          Next level food
        </Link>

        <nav className={classes.nav}>
          <ul>{navLinks}</ul>
        </nav>
      </header>
    </>
  );
}
