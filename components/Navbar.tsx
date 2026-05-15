"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import config from "@/config.json";

const links = [
  { label: "Hjem",      href: "#hjem" },
  { label: "Tjenester", href: "#tjenester" },
  { label: "Om Oss",    href: "#om-oss" },
  { label: "Galleri",   href: "#galleri" },
  { label: "Kontakt",   href: "#kontakt" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { accentColor, primaryColor, textColor, mode } = config.theme;

  const isLight = mode === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled ? `${primaryColor}f5` : "transparent";
  const navBorder = scrolled ? `${accentColor}33` : "transparent";
  const linkColor = textColor;

  return (
    <header
      style={{
        backgroundColor: navBg,
        borderBottomColor: navBorder,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled && isLight ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#hjem">
          <span
            className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-widest uppercase transition-colors duration-500"
            style={{ color: textColor }}
          >
            {config.business.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase transition-colors duration-300 hover:opacity-100"
              style={{ color: `${linkColor}99` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${linkColor}99`)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="ml-4 px-5 py-2 text-sm tracking-widest uppercase font-[family-name:var(--font-inter)] transition-all duration-300"
            style={{ border: `1px solid ${accentColor}`, color: accentColor }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = accentColor;
              (e.currentTarget as HTMLElement).style.color = isLight ? "#ffffff" : primaryColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = accentColor;
            }}
          >
            Bestill Time
          </a>
        </nav>

        <button
          className="md:hidden transition-colors"
          style={{ color: textColor }}
          onClick={() => setOpen(!open)}
          aria-label="Meny"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: `${primaryColor}f8`,
            borderColor: `${accentColor}22`,
          }}
        >
          <nav className="flex flex-col px-6 py-6 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase py-2 border-b transition-colors duration-300"
                style={{ color: `${textColor}70`, borderColor: `${textColor}10` }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 text-sm tracking-widest uppercase text-center font-[family-name:var(--font-inter)]"
              style={{ border: `1px solid ${accentColor}`, color: accentColor }}
            >
              Bestill Time
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
