import Link from "next/link";
import Logo from "@/components/Logo";
import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  XSocialIcon,
  YouTubeIcon,
} from "@/components/Icons";
import Strings from "@/utils/Strings";

const SOCIALS = [
  { label: "X", Icon: XSocialIcon, className: "size-[26px]" },
  { label: "Instagram", Icon: InstagramIcon, className: "size-[26px]" },
  { label: "LinkedIn", Icon: LinkedInIcon, className: "size-[26px]" },
  { label: "Facebook", Icon: FacebookIcon, className: "size-[26px]" },
  { label: "YouTube", Icon: YouTubeIcon, className: "h-[22px] w-[32px]" },
];

export default function Footer() {
  const { footer } = Strings;

  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1440px] px-[20px] pt-[64px] lg:pt-[100px] lg:pr-[74px] lg:pl-[62px]">
        <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 lg:grid-cols-[509px_236px_350px_1fr] lg:gap-0">
          <div>
            <Logo className="h-[62px] w-auto" />
            <p className="mt-[22px] text-[18px] leading-[26px] font-light tracking-[-0.02em] text-body">
              {footer.tagline[0]}
              <br />
              {footer.tagline[1]}
            </p>
          </div>

          <div className="lg:pt-[5px]">
            <h3 className="text-[18px] leading-[24px] font-medium text-heading">
              {footer.quickLinksTitle}
            </h3>
            <ul className="mt-[26px]">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[18px] leading-[34px] font-light text-footer-link transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-[5px]">
            <h3 className="text-[18px] leading-[24px] font-medium text-heading">
              {footer.servicesTitle}
            </h3>
            <ul className="mt-[26px]">
              {footer.services.map((service) => (
                <li
                  key={service}
                  className="text-[18px] leading-[34px] font-light text-footer-link"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-[5px]">
            <h3 className="text-[18px] leading-[24px] font-medium text-heading">
              {footer.contactTitle}
            </h3>
            <a
              href={`mailto:${footer.email}`}
              className="mt-[26px] flex items-center gap-[9px] text-[18px] leading-[34px] font-light text-footer-link hover:text-primary"
            >
              <MailIcon className="size-[15px]" />
              {footer.email}
            </a>
            <a
              href={`tel:${footer.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-[9px] text-[14px] leading-[34px] font-light text-footer-link hover:text-primary"
            >
              <PhoneIcon className="size-[15px]" />
              {footer.phone}
            </a>
            <ul className="mt-[18px] flex items-center gap-[18px]">
              {SOCIALS.map(({ label, Icon, className }) => (
                <li key={label}>
                  <a href="#" aria-label={label} className="block">
                    <Icon className={className} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[56px] flex flex-col-reverse items-start justify-between gap-[24px] sm:flex-row sm:items-end lg:mt-[74px]">
          <p className="text-[16px] text-copyright sm:pb-[25px]">{footer.copyright}</p>
          <div>
            <label
              htmlFor="language"
              className="block pl-[2px] text-[16px] leading-[20px] text-heading sm:-translate-y-[2px]"
            >
              {footer.languageLabel}
            </label>
            <div className="relative mt-[10px]">
              <select
                id="language"
                className="h-[43px] w-[146px] appearance-none rounded-none border border-select-border bg-white pr-[40px] pl-[16px] text-[18px] font-light text-[#8A8A8A] outline-none"
              >
                {footer.languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-[13px] w-[14px] -translate-y-1/2 text-heading" />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none relative mt-[40px] h-[130px] overflow-hidden select-none lg:mt-[87px] lg:h-[261px]"
      >
        <span className="absolute top-0 left-[-60px] bg-[linear-gradient(180deg,#FFDDE1_18%,#FFF7F8_88%)] bg-clip-text font-heading text-[170px] leading-none font-medium tracking-[-0.035em] whitespace-nowrap text-transparent lg:left-[-120px] lg:text-[340px]">
          {footer.watermark}
        </span>
      </div>
    </footer>
  );
}
