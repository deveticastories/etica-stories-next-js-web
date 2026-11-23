import Link from "next/link";
import Logo from "@/components/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  YouTubeIcon,
} from "@/components/Icons";
import Fonts from "@/utils/Fonts";
import Strings from "@/utils/Strings";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/etica_stories", Icon: InstagramIcon, className: "size-[26px]" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/etica-stories-pvt-ltd/", Icon: LinkedInIcon, className: "size-[26px]" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61576372617460", Icon: FacebookIcon, className: "size-[26px]" },
  { label: "YouTube", href: "https://www.youtube.com/@ETICASTORIES", Icon: YouTubeIcon, className: "h-[22px] w-[32px]" },
];

export default function Footer() {
  const { footer } = Strings;

  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1440px] px-[20px] pt-[64px] lg:pt-[100px] lg:px-[48px] xl:pr-[74px] xl:pl-[62px]">
        <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr] lg:gap-[32px] xl:grid-cols-[509px_236px_350px_1fr] xl:gap-0">
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
              className="mt-[26px] flex items-center gap-[9px] text-[18px] leading-[34px] font-light text-footer-link [overflow-wrap:anywhere] hover:text-primary"
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
              {SOCIALS.map(({ label, href, Icon, className }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Etica Stories on ${label}`}
                    className="block transition-colors hover:text-primary"
                  >
                    <Icon className={className} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-[56px] text-[16px] text-copyright lg:mt-[74px]">{footer.copyright}</p>
      </div>

      {/* Oversized "ETICA STORIES" that bleeds off the page: the viewBox is a fixed window onto the
          word (from halfway through the E to just past the R's stem, and down to ~80% of the cap
          height), so the same slice shows edge to edge at every screen width. Its numbers are in
          the text's own units (146px Barlow SemiBold, -6.7 tracking); re-measure them if those change. */}
      <div aria-hidden className="pointer-events-none mt-[40px] select-none lg:mt-[87px]">
        <svg viewBox="57.7 2 580.5 85" className="block h-auto w-full">
          <defs>
            <linearGradient id="footer-watermark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6D4D9" />
              <stop offset="100%" stopColor="#FFFAFB" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="105"
            fill="url(#footer-watermark-fill)"
            fontFamily={Fonts.wordmark}
            fontWeight={600}
            fontSize="146"
            letterSpacing="-6.7"
          >
            {footer.watermark}
          </text>
        </svg>
      </div>
    </footer>
  );
}
