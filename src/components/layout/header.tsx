"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Orbit } from "lucide-react";
import { site } from "@/config/site";
import { PerceptionToggle } from "@/components/perception/toggle";
const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/devlog/", label: "Devlog" },
  { href: "/resources/", label: "Resources" },
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label={`${site.studio} home`}>
          <Orbit size={31} strokeWidth={1.3} />
          <span>
            PSYCHEDELIC CAMEL<small>STUDIOS</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                path.replace(/\/$/, "") === link.href.replace(/\/$/, "")
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <PerceptionToggle />
        <button
          className="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={path === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
