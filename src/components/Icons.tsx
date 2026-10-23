import Colors from "@/utils/Colors";

type IconProps = {
  className?: string;
};

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path
        d="M2 10L10 2M10 2H3.5M10 2V8.5"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 46 25" fill="none" className={className} aria-hidden>
      <path
        d="M1.5 23.5L15 10L24 18L44 2M44 2H33M44 2V12"
        stroke={Colors.primary}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodeSearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <g
        stroke={Colors.primary}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={21} cy={21} r={18.5} />
        <path d="M34.5 34.5L45.5 45.5" />
        <path d="M16.5 15L11 21L16.5 27M25.5 15L31 21L25.5 27" />
      </g>
    </svg>
  );
}

export function DeployIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 44 42" fill="none" className={className} aria-hidden>
      <g
        stroke={Colors.primary}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x={1.5} y={1.5} width={41} height={29} rx={5} />
        <path d="M11 9L17 16L11 23M21 9L27 16L21 23" />
        <path d="M10 39.5H34" />
      </g>
    </svg>
  );
}

export function OptimizeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 38 38" fill="none" className={className} aria-hidden>
      <g
        stroke={Colors.primary}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 3.5H8A5 5 0 0 0 3 8.5V13M25 3.5H30A5 5 0 0 1 35 8.5V13M3 21V29.5A5 5 0 0 0 8 34.5H30A5 5 0 0 0 35 29.5V21" />
        <path d="M19 1.5V8M3 17H8M30 17H35" />
        <path d="M10 17H28M10 25H28M19 12V31" />
      </g>
    </svg>
  );
}

export function CrossCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx={10} cy={10} r={10} fill={Colors.cross} />
      <path
        d="M6.6 6.6L13.4 13.4M13.4 6.6L6.6 13.4"
        stroke={Colors.darkCard}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx={10} cy={10} r={10} fill={Colors.check} />
      <path
        d="M5.8 10.2L8.6 13L14.2 7.4"
        stroke={Colors.white}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 8" fill="none" className={className} aria-hidden>
      <path
        d="M1.5 1.5L6 6L10.5 1.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.59a1 1 0 0 1-.25 1.01l-2.2 2.19z"
      />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function XSocialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden>
      <rect width={26} height={26} fill="#000000" />
      <path
        fill="#FFFFFF"
        d="M15.2 11.5 20.6 5.3h-1.3l-4.7 5.4-3.7-5.4H6.6l5.7 8.2-5.7 6.6h1.3l5-5.7 4 5.7h4.3l-6-8.6zm-1.8 2-.6-.8-4.6-6.5h2l3.7 5.3.6.8 4.8 6.9h-2l-3.9-5.7z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden>
      <defs>
        <linearGradient id="ig-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FED576" />
          <stop offset="0.26" stopColor="#F47133" />
          <stop offset="0.61" stopColor="#BC3081" />
          <stop offset="1" stopColor="#4C63D2" />
        </linearGradient>
      </defs>
      <rect width={26} height={26} rx={6} fill="url(#ig-gradient)" />
      <rect
        x={6}
        y={6}
        width={14}
        height={14}
        rx={4}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <circle cx={13} cy={13} r={3.3} fill="none" stroke="#FFFFFF" strokeWidth={1.8} />
      <circle cx={17.2} cy={8.8} r={1} fill="#FFFFFF" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden>
      <rect width={26} height={26} rx={5} fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M7.2 10.4h2.7V19H7.2v-8.6zm1.4-4.3a1.6 1.6 0 1 1 0 3.1 1.6 1.6 0 0 1 0-3.1zm3 4.3h2.6v1.2c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2V19h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-2.7v-8.6z"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden>
      <rect width={26} height={26} rx={5} fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M17.6 26V16.4h3.2l.5-3.8h-3.7v-2.4c0-1.1.3-1.8 1.9-1.8h2V5c-.3 0-1.5-.2-2.9-.2-2.9 0-4.9 1.8-4.9 5v2.8h-3.2v3.8h3.2V26h3.9z"
      />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 22" className={className} aria-hidden>
      <rect width={32} height={22} rx={6} fill="#FF0000" />
      <path fill="#FFFFFF" d="M13 6.5v9l7.8-4.5L13 6.5z" />
    </svg>
  );
}

// About page — service card icons
const serviceStroke = {
  stroke: Colors.primary,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function BrandingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x={2.5} y={4.5} width={19} height={15} rx={1} {...serviceStroke} />
      <rect x={10} y={11} width={9} height={6} fill={Colors.primary} />
    </svg>
  );
}

export function GrowthChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M3 3V21H21" {...serviceStroke} />
      <path d="M7 16L11 11L14 14L20 7M20 7H16.5M20 7V10.5" {...serviceStroke} />
    </svg>
  );
}

export function SocialClickIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M20.5 11A8.5 8.5 0 1 0 11 20.4" {...serviceStroke} />
      <path d="M15.5 9.5A5 5 0 1 0 9.8 15.9" {...serviceStroke} />
      <path d="M11 11L21 14.5L16.8 16.8L14.5 21L11 11Z" {...serviceStroke} />
    </svg>
  );
}

export function SeoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx={10} cy={10} r={6.5} {...serviceStroke} />
      <path d="M15 15L21 21" {...serviceStroke} />
      <path d="M6.5 12L9 9.5L11 11.5L14 8M14 8H11.5M14 8V10.5" {...serviceStroke} />
      <path d="M17 3.5L20.5 7" {...serviceStroke} />
    </svg>
  );
}

export function CubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2.5L20.5 7.25V16.75L12 21.5L3.5 16.75V7.25L12 2.5Z" {...serviceStroke} />
      <path d="M3.5 7.25L12 12L20.5 7.25M12 12V21.5" {...serviceStroke} />
    </svg>
  );
}

// About page — mission collage badges
export function WebSolutionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x={1.5} y={3} width={21} height={17} rx={2} stroke={Colors.badgeWeb} strokeWidth={1.8} />
      <path d="M1.5 8H22.5" stroke={Colors.badgeWeb} strokeWidth={1.8} />
      <circle cx={5} cy={5.5} r={0.9} fill={Colors.badgeWeb} />
      <circle cx={8} cy={5.5} r={0.9} fill={Colors.badgeWeb} />
      <path d="M5 12H11M5 15.5H9" stroke={Colors.badgeWeb} strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={17} cy={15} r={3} fill={Colors.badgeWeb} />
    </svg>
  );
}

export function DigitalStrategyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21.5A9.5 9.5 0 1 0 2.5 12H7.5A4.5 4.5 0 1 1 12 16.5V21.5Z"
        fill={Colors.badgeStrategy}
      />
      <rect x={7.5} y={16.5} width={4.5} height={4.5} fill={Colors.badgeStrategy} />
      <rect x={3.5} y={16.5} width={3} height={3} fill={Colors.badgeStrategy} />
    </svg>
  );
}

export function GrowthMarketingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M3 12L9 6L13 10L21 2.5M21 2.5H16.5M21 2.5V7" {...serviceStroke} strokeWidth={2} />
      <path d="M4 21V17M9 21V13M14 21V15M19 21V10" {...serviceStroke} strokeWidth={2} />
    </svg>
  );
}

// Services page — approach card icons (drawn in currentColor)
const approachStroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function TeamIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx={6} cy={6} r={2} {...approachStroke} />
      <circle cx={12} cy={5} r={2} {...approachStroke} />
      <circle cx={18} cy={6} r={2} {...approachStroke} />
      <path d="M3 11.5A3 3 0 0 1 6 10H8M21 11.5A3 3 0 0 0 18 10H16" {...approachStroke} />
      <path d="M8 10.5A4 4 0 0 1 16 10.5V18A4 4 0 0 1 8 18V10.5Z" {...approachStroke} />
      <path d="M3 12V17A3 3 0 0 0 7 19.8M21 12V17A3 3 0 0 1 17 19.8" {...approachStroke} />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M20.5 12A8.5 8.5 0 1 1 12 3.5" {...approachStroke} />
      <path d="M16.5 12A4.5 4.5 0 1 1 12 7.5" {...approachStroke} />
      <path d="M12 12L19 5M16.5 4.5V7.5H19.5M19 5L21 3" {...approachStroke} />
    </svg>
  );
}

export function LocationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 21C12 21 18.5 14.8 18.5 9.5A6.5 6.5 0 0 0 5.5 9.5C5.5 14.8 12 21 12 21Z" {...approachStroke} />
      <circle cx={12} cy={8.5} r={2.2} {...approachStroke} />
      <path d="M8.5 15H15.5" {...approachStroke} />
    </svg>
  );
}

export function GrowthBoxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x={3.5} y={3.5} width={17} height={17} rx={2} {...approachStroke} />
      <path d="M7 15.5L10.5 11.5L13 14L17 9M17 9H14.5M17 9V11.5" {...approachStroke} />
    </svg>
  );
}
