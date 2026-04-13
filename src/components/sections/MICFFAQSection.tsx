"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronDown } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

const MICF_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What are the risks of investing in Mahaana Save+ (MICF)?",
    answer:
      "Cash deposited into Mahaana Save+ is invested into Mahaana Islamic Cash Fund (MICF). MICF invests this cash into short term Shariah compliant securities including corporate sukuks, government sukuks and bank placements. These investment avenues are considered low risk and stable compared to other assets. However MICF may get negative returns.\n\nMahaana is a member of Mutual Funds Association of Pakistan (MUFAP) and regulated by the Securities & Exchange Commission of Pakistan (SECP) as a non-bank financial company (NBFC). All of your funds are stored with the Central Depository Company (CDC). Mahaana does not have direct access to your funds and all transactions on your account are validated by CDC. Additionally, funds can only be withdrawn into a bank account that's in your name.",
  },
  {
    question: "Is Mahaana Save+ (MICF) Shariah compliant?",
    answer:
      "Yes, please view the documents under Financial Literature > Shariah Compliance.",
  },
  {
    question: "Are there any taxes when I invest in Mahaana Save+ (MICF)?",
    answer:
      "For tax filers: 15% tax on capital gains (CGT) on withdrawals and 25% on dividend gains (dividend deposited directly into bank account).\n\nFor non-filers: 15% tax on capital gains (CGT) on withdrawals and 50% on dividend gains (dividend deposited directly into bank account).",
  },
  {
    question: "How do I receive my returns?",
    answer:
      "Returns are automatically added to your account on a daily basis. You can view your profits by logging into the Mahaana webapp.",
  },
  {
    question: "How long does it take to deposit or withdraw cash?",
    answer:
      "Deposits and withdrawals are usually processed within 1-2 business days.",
  },
];

export function MICFFAQSection({
  items,
}: {
  /** FAQ items from Sanity; falls back to hardcoded list when empty or undefined. */
  items?: { question: string; answer: string }[];
}) {
  const list = items?.length ? items : MICF_FAQ_ITEMS;
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="section-y"
      aria-labelledby="micf-faq-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:px-16 sm:gap-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Left column: Need Help? */}
          <div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1">
            <div className="flex flex-col items-start gap-2">
              <p className="text-label text-system-brand">{cleanCopy("FAQs")}</p>
              <H3
                id="micf-faq-heading"
                className="text-text-primary w-full max-w-3xl"
              >
                Need Help?
                <br />
                We&apos;re here to assist.
              </H3>
            </div>
            <TextRegular className="mt-4 text-text-tertiary">
              Still have questions?{" "}
              <Link
                href="/contact"
                className="font-body text-regular font-normal text-text-tertiary underline underline-offset-2 hover:text-text-primary"
              >
                Contact our support team.
              </Link>
            </TextRegular>
            <Button
              href="/help-center"
              size="md"
              color="secondary"
              className="w-fit"
            >
              View all FAQs
            </Button>
          </div>

          {/* Right column: FAQ accordion */}
          <div className="min-w-0 flex-1 lg:max-w-[480px]">
            <div className="divide-y divide-surface-stroke">
              {list.map((item, index) => (
                <details
                  key={index}
                  className="group py-4 first:pt-0 last:pb-0"
                >
                  <summary className="flex cursor-pointer list-none flex-row items-center justify-between gap-3 font-body text-regular font-semibold leading-[150%] text-text-primary hover:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand rounded [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 flex-1">{item.question}</span>
                    <ChevronDown
                      className="size-5 shrink-0 text-text-tertiary transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <div className="mt-3 pl-0">
                    <TextRegular className="whitespace-pre-line text-text-tertiary">
                      {cleanCopy(item.answer)}
                    </TextRegular>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
