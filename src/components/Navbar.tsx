"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import Strings from "@/utils/Strings";

type NavbarProps = {
  activeHref?: string;
};

export default function Navbar({ activeHref = "/" }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-[16px] left-1/2 z-50 w-[calc(100%-32px)] max-w-[1110px] -translate-x-1/2 lg:top-[37px]">
      <nav className="flex h-[64px] items-center rounded-full bg-white pr-[12px] pl-[24px] shadow-[0_6px_30px_rgba(0,0,0,0.08)] lg:h-[73px] lg:pr-[18px] lg:pl-[38px]">
        <Link href="/" aria-label={Strings.appName} className="shrink-0">
          <Logo className="h-[32px] w-auto lg:h-[36px]" />
        </Link>

        <ul className="ml-[195px] hidden items-center gap-[33px] lg:flex">
          {Strings.nav.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-[17px] tracking-[-0.01em] transition-colors hover:text-primary ${
                  link.href === activeHref ? "text-primary" : "text-nav-inactive"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden lg:block">
          <Button label={Strings.nav.cta} />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto flex size-[44px] items-center justify-center rounded-full bg-primary text-white lg:hidden"
        >
          {open ? <CloseIcon className="size-[22px]" /> : <MenuIcon className="size-[22px]" />}
        </button>
      </nav>

      {open && (
        <div className="mt-[8px] rounded-[20px] bg-white p-[20px] shadow-[0_6px_30px_rgba(0,0,0,0.08)] lg:hidden">
          <ul className="flex flex-col gap-[14px]">
            {Strings.nav.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-[18px] ${
                    link.href === activeHref ? "text-primary" : "text-nav-inactive"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button label={Strings.nav.cta} className="mt-[18px]" />
        </div>
      )}
    </header>
  );
}
