type SectionLabelProps = {
  text: string;
  className?: string;
};

// Small red uppercase eyebrow above each About section heading.
export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <p className={`text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-primary lg:text-[18px] ${className}`}>
      {text}
    </p>
  );
}
