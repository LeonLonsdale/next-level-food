"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

interface NavLinkProps {
  children: React.ReactNode;
  path: string;
}

export default function NavLink({ children, path }: NavLinkProps) {
  const isActivePath = path === usePathname();
  return (
    <Link
      href={path}
      className={
        isActivePath ? `${classes.link} ${classes.active}` : classes.link
      }
    >
      {children}
    </Link>
  );
}
