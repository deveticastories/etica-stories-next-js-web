import Colors from "@/utils/Colors";

type LogoProps = {
  className?: string;
};

const STORIES_LETTERS = [
  { char: "S", x: 6.5 },
  { char: "T", x: 30 },
  { char: "O", x: 55 },
  { char: "R", x: 81.5 },
  { char: "I", x: 101.5 },
  { char: "E", x: 120.5 },
  { char: "S", x: 147 },
];

// Etica Stories wordmark, traced from the Figma design.
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 152 62"
      className={className}
      role="img"
      aria-label="Etica Stories"
    >
      <g
        fill="none"
        stroke={Colors.primary}
        strokeWidth={5.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* E */}
        <path d="M4.7 7.7H22.3M4.7 21H22.3M4.7 34.5H22.3" />
        {/* T */}
        <path d="M54.3 7.7H44.5V34.5" />
        {/* I */}
        <path d="M67.5 8.5V34.5" />
        {/* C */}
        <path d="M100.5 7.7A14 14 0 1 0 107.5 29.8" />
        {/* A */}
        <path d="M122.5 27.5L134.5 8.5L147.5 34.5" />
      </g>
      <g fill={Colors.primary}>
        <circle cx={35.5} cy={7.7} r={2.8} />
        <circle cx={123} cy={34.8} r={2.8} />
      </g>
      <g
        fill={Colors.heading}
        fontFamily="var(--font-dm-sans), sans-serif"
        fontSize={18.5}
        textAnchor="middle"
      >
        {STORIES_LETTERS.map(({ char, x }, i) => (
          <text key={i} x={x} y={59.5}>
            {char}
          </text>
        ))}
      </g>
    </svg>
  );
}
