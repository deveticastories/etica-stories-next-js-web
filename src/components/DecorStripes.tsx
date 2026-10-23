import Colors from "@/utils/Colors";

type DecorStripesProps = {
  // Each stripe is a rounded bar from (x1, y1) to (x2, y2) inside the viewBox.
  lines: readonly (readonly [number, number, number, number])[];
  viewBox: string;
  className?: string;
};

// Soft pink diagonal bars drawn behind photo collages.
export default function DecorStripes({ lines, viewBox, className = "" }: DecorStripesProps) {
  return (
    <svg aria-hidden viewBox={viewBox} className={`pointer-events-none absolute ${className}`}>
      <g stroke={Colors.decorStripe} strokeWidth={48} strokeLinecap="round">
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}
