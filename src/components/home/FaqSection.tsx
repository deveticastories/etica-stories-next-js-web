"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import Strings from "@/utils/Strings";

export default function FaqSection() {
  const { faq } = Strings;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-[20px] pt-[140px] pb-[100px] lg:pt-[257px] lg:pb-[121px]">
      <div className="text-center lg:translate-x-[-5px]">
        <h2 className="font-heading text-[36px] leading-[40px] font-medium tracking-[-0.02em] text-heading lg:text-[52px] lg:leading-[55px]">
          {faq.title}
        </h2>
        <p className="mx-auto mt-[24px] max-w-[610px] text-[17px] leading-[26px] font-light tracking-[-0.02em] text-body lg:mt-[39px] lg:text-[18px]">
          {faq.subtitle}
        </p>
      </div>

      <ul className="mx-auto mt-[48px] flex max-w-[674px] flex-col gap-[9px] lg:mt-[56px] lg:translate-x-[10px]">
        {faq.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <li
              key={item.question}
              className={`rounded-[12px] border transition-colors ${
                isOpen ? "border-border bg-faq-open" : "border-faq-closed bg-faq-closed"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`flex w-full justify-between gap-[24px] pr-[18px] pl-[30px] text-left ${
                  isOpen ? "items-start pt-[21px]" : "min-h-[99px] lg:min-h-[100px] items-center"
                }`}
              >
                <span
                  className={`max-w-[555px] text-[17px] leading-[26px] tracking-[-0.03em] lg:text-[18px] ${
                    isOpen
                      ? "pt-[5px] font-normal text-heading"
                      : "py-[20px] font-light text-faq-question"
                  }`}
                >
                  {i + 1}. {item.question}
                </span>
                <span
                  className={`flex size-[32px] shrink-0 items-center justify-center rounded-full bg-white text-heading ${
                    isOpen ? "" : "self-start mt-[21px]"
                  }`}
                >
                  <ChevronDownIcon
                    className={`w-[11px] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
              {isOpen && (
                <p className="px-[30px] pt-[21px] pb-[19px] text-[17px] leading-[26px] font-normal tracking-[-0.03em] text-maroon lg:text-[18px]">
                  {item.answer}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
