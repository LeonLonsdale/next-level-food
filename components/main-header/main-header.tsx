import Link from "next/link";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import { paths } from "@/lib/paths";

export default function MainHeader() {
  const { navigation } = paths;

  const navLinks = Object.values(navigation).map((link) => (
    <li key={link.label}>
      <Link href={link.path}>{link.label}</Link>
    </li>
  ));

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
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
