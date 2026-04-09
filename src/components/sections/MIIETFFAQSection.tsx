"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronDown } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

const MIIETF_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is an ETF (Exchange Traded Fund)?",
    answer:
      "An ETF is a basket of shares that has been put together in one stock. When you buy an ETF, you're essentially buying one stock (ETF) which invests in multiple shares. It is a great vehicle for investors to get access to a diversified portfolio.",
  },
  {
    question: "Are ETFs safer than individual stocks?",
    answer:
      "In a way, yes! Since ETFs invest in multiple sectors, at any given time some sectors can be doing well, while others might not be so your overall risk is low. However, if the market is not doing well, the ETF will be impacted as well.",
  },
  {
    question: "What is MIIETF?",
    answer:
      "MIIETF, Mahaana Islamic Index Exchange Traded Fund is an ETF listed on the Pakistan Stock Exchange. It is Pakistan's first broader index Islamic ETF that tracks the performance of top 30 Shariah compliant companies in Pakistan.",
  },
  {
    question: "Is MIIETF Shariah compliant?",
    answer: "Yes, MIIETF invests only in Shariah compliant assets.",
  },
  {
    question: "What are the benefits of investing in MIIETF?",
    answer:
      "Diversified portfolio: Exposure to a basket of stocks: Oil & Gas Exploration, Fertilizer, Cement, Power Generation and Distribution, Commercial Banks and other sectors.\n\nLong term growth potential: ETFs invest in companies across various sectors that are positioned for growth in the long term. Factors like technological advancements, increasing global demand, and economic development can drive these companies' value, potentially benefiting the ETF's overall performance.\n\nLower costs: ETFs tend to have lower expense ratios, resulting in reduced fees for investors over time.\n\nTransparency: ETFs provide real time pricing and transparency of holdings, allowing you to see what assets you own at any given time.\n\nTax Efficiency: ETFs tend to have lower turnover ratios compared to actively managed funds. This means fewer taxable events.",
  },
  {
    question: "How can I buy ETFs?",
    answer:
      "You will need to contact your PSX broker to buy an ETF.",
  },
  {
    question: "Do ETFs provide dividends?",
    answer:
      "ETFs pay dividends annually as and when deemed fit by the board of directors. These are paid out from the gains on investments from the underlying basket of shares.",
  },
];

export function MIIETFFAQSection({
  items,
}: {
  /** FAQ items from Sanity; falls back to hardcoded list when empty or undefined. */
  items?: { question: string; answer: string }[];
}) {
  const list = items?.length ? items : MIIETF_FAQ_ITEMS;
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="section-y"
      aria-labelledby="miietf-faq-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:px-16 sm:gap-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Left column: Need Help? */}
          <div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1">
            <div className="flex flex-col items-start gap-2">
              <p className="text-label text-system-brand">{cleanCopy("FAQs")}</p>
              <H3
                id="miietf-faq-heading"
                className="text-text-primary w-full max-w-3xl"
              >
                Need Help?
                <br />
                We&apos;re here to assist.
              </H3>
            </div>
            <TextRegular className="mt-4 text-text-tertiary">
              Still have questions? Feel free to contact our friendly{" "}
              <Link
                href="/contact"
                className="font-body text-regular font-normal text-text-tertiary underline underline-offset-2 hover:text-text-primary"
              >
                support team
              </Link>{" "}
              specialists.
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
