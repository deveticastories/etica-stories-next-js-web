import Strings from "@/utils/Strings";
import { WhatsAppIcon } from "@/components/Icons";

// Floating WhatsApp chat button, fixed to the bottom-right corner on every page.
export default function WhatsAppButton() {
  const { number, message, label } = Strings.whatsapp;
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed right-[16px] bottom-[16px] z-50 flex size-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-110 lg:right-[28px] lg:bottom-[28px] lg:size-[60px]"
    >
      <WhatsAppIcon className="size-[30px] lg:size-[32px]" />
    </a>
  );
}
