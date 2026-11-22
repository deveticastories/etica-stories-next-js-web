import Image from "next/image";
import Images from "@/utils/Images";
import Strings from "@/utils/Strings";

const CLIENTS = [
  { name: "FAB", src: Images.clients.fab, width: 83, height: 29 },
  { name: "Saaz International", src: Images.clients.saaz, width: 83, height: 32 },
  { name: "Emphz", src: Images.clients.emphz, width: 125, height: 35 },
  { name: "Swaah Juniors", src: Images.clients.swaahJuniors, width: 106, height: 41 },
  { name: "Introlines Merchant Exports", src: Images.clients.introlines, width: 163, height: 52 },
];

export default function ClientLogos({ className = "" }: { className?: string }) {
  const { mission } = Strings;
  return (
    <div className={`relative ${className}`}>
      <p className="text-center text-[18px] leading-[24px] font-light tracking-[-0.01em] text-heading">
        {mission.trustedBy}
      </p>
      {/* Marquee: the track holds two identical halves and slides -50%, so the loop is seamless.
          Each half repeats the logo set so it always spans wider than the viewport. */}
      <div className="marquee mx-auto mt-[24px] max-w-[1147px] overflow-hidden lg:mt-[32px]">
        <ul className="marquee-track flex w-max items-center">
          {[0, 1].map((half) =>
            [...CLIENTS, ...CLIENTS].map((client, i) => (
              <li
                key={`${half}-${i}`}
                aria-hidden={half === 1 || i >= CLIENTS.length || undefined}
                className="shrink-0 px-[24px] lg:px-[48px]"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="max-w-none"
                  style={{ width: client.width, height: client.height }}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
