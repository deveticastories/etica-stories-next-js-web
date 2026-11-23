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
      <nav className="flex h-[64px] items-center rounded-full border border-white/40 bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[18px] backdrop-saturate-150 pr-[12px] pl-[24px] lg:h-[73px] lg:pr-[18px] lg:pl-[38px]">
        <Link href="/" aria-label={Strings.appName} className="shrink-0">
          <Logo className="h-[32px] w-auto lg:h-[36px]" />
        </Link>

        <ul className="ml-[clamp(40px,14vw,195px)] hidden items-center gap-[33px] lg:flex">
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
        <div className="mt-[8px] rounded-[20px] border border-white/40 bg-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[18px] backdrop-saturate-150 p-[20px] lg:hidden">
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
