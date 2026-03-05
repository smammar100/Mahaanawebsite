"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronDown } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H2, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const MIIRF_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is the Mahaana IGI Islamic Retirement Fund?",
    answer:
      "It's a Shari'ah-compliant pension plan from IGI Life and Mahaana Wealth. You save for retirement, get up to 20% tax savings, Takaful coverage (life insurance and emergency medical help with a PKR 1,000,000 balance), and expert investment management. Your money is secure with the Central Depository Company (CDC), and you can track it 24/7 via the Mahaana portal or app.",
  },
  {
    question: "How does tax saving work?",
    answer:
      "Simple: if you put 20% of your monthly income into the fund, your income tax bill drops by 20%. The tax credit equals your contribution (up to 20% of your annual income) times your effective tax rate (total tax ÷ income). For example:\n- Earn PKR 500,000 monthly (PKR 6,000,000 yearly), pay PKR 85,458 monthly tax (PKR 1,025,500 yearly, 17.09% rate per 2025–26 slabs).\n- Contribute PKR 100,000 monthly (20% of income, PKR 1,200,000 yearly). Tax credit = PKR 1,200,000 × 17.09% = PKR 205,080 yearly (PKR 17,090 monthly).\n- Your monthly tax drops from PKR 85,458 to PKR 68,368—a 20% reduction.",
  },
  {
    question: "Does this 20% tax cut work for everyone?",
    answer:
      "Yes, but only if you pay income tax in Pakistan.\n\nHow it works: Whatever percentage of your taxable income you contribute, your income tax goes down by the same percentage.\n\nExamples:\nLower income: If you earn PKR 100,000 monthly (PKR 1.2 million yearly): Your tax: PKR 6,000 per year. If you contribute 20% of income (PKR 240,000): You save PKR 1,200 in taxes (PKR 100 monthly).\n\nHigher income: If you earn PKR 1,000,000 monthly (PKR 12 million yearly): Your tax: PKR 3,025,500 per year. If you contribute 20% of income (PKR 2.4 million): You save PKR 604,100 in taxes (PKR 50,342 monthly).\n\nImportant: If you contribute less than 20% of your income, your tax savings are reduced. For example, contribute 10% of income = get 10% tax reduction instead of 20%.",
  },
  {
    question: "What if I contribute less than 20% of my income?",
    answer:
      "Your tax credit shrinks proportionally. For example, with PKR 500,000 monthly income (PKR 85,458 monthly tax):\n- Contribute PKR 50,000 monthly (10% of income, PKR 600,000 yearly).\n- Tax credit = PKR 600,000 × 17.09% = PKR 102,540 yearly (PKR 8,545 monthly).\n- Your tax drops by 10% (PKR 85,458 to PKR 76,913 monthly). The rule: your tax cut percentage matches the percentage of income you contribute, up to 20%.",
  },
  {
    question: "How do I claim the tax credit?",
    answer:
      "Download your account statement from the Mahaana portal, showing your VPS contributions for the year. Submit this to your HR/Accounts department to claim tax credits. The credit lowers your tax bill directly.",
  },
  {
    question: "What happens if I withdraw money before retirement?",
    answer:
      "Withdrawing before age 60 or 25 years from the start of your investment (whichever comes first) comes with a cost:\n- The Pension Fund Manager (via NCCPL) deducts a withholding tax equal to your average tax rate for the preceding three years, calculated from the last three tax return statements you attach in the Mahaana portal when requesting withdrawal.",
  },
  {
    question: "Can I contribute more than 20% of my income?",
    answer:
      "Yes, but the tax credit caps at 20% of your taxable income. Extra contributions still grow tax-free in the fund, boosting your retirement savings.",
  },
  {
    question: "What's the tax benefit at retirement?",
    answer:
      "At age 60, you can withdraw up to 50% of your fund balance tax-free (based on current rules). The rest can fund a monthly pension or stay invested, but these payments may be taxable.",
  },
  {
    question: "Is the fund Shari'ah compliant?",
    answer:
      "100%! It follows Islamic principles, avoiding interest (riba) and non-halal industries like alcohol or gambling.",
  },
  {
    question: "What if I switch jobs or stop working?",
    answer:
      "Your fund stays with you! You can keep contributing via the Mahaana portal. It's your money, safe with the CDC, and you control it.",
  },
  {
    question: "Who is this product ideal for?",
    answer:
      "The Mahaana IGI Islamic Retirement Fund is perfect for long-term investors in the salaried class who are tax filers in Pakistan. It's designed for those earning above PKR 600,000 annually who want to save up to 20% on their taxes while building a Shari'ah-compliant retirement nest egg. The tax credit is especially attractive for higher earners (e.g., PKR 500,000 monthly income saves PKR 17,090 monthly in taxes with a 20% contribution).",
  },
];

export function MIIRFFAQSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"
      aria-labelledby="miirf-faq-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:px-16 sm:gap-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Left column: Need Help? */}
          <div className="flex flex-col gap-4 lg:min-w-0 lg:flex-1">
            <H2
              id="miirf-faq-heading"
              className="font-heading text-[1.75rem] font-semibold leading-[1.2] tracking-heading text-text-primary sm:text-[2rem] lg:text-[2.25rem]"
            >
              Need Help?
              <br />
              We&apos;re here to assist.
            </H2>
            <TextRegular className="text-text-secondary">
              Still have questions? Feel free to contact our friendly{" "}
              <Link
                href="/contact"
                className="font-body text-regular font-normal text-text-secondary underline underline-offset-2 hover:text-text-primary"
              >
                support team
              </Link>{" "}
              specialists.
            </TextRegular>
            <Button
              href="#miirf-faq-heading"
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
              {MIIRF_FAQ_ITEMS.map((item, index) => (
                <details
                  key={index}
                  className="group py-4 first:pt-0 last:pb-0"
                >
                  <summary className="flex cursor-pointer list-none flex-row items-center justify-between gap-3 font-body text-regular font-semibold leading-[150%] text-text-primary hover:text-text-secondary transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 flex-1">{item.question}</span>
                    <ChevronDown
                      className="size-5 shrink-0 text-text-tertiary transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <div className="mt-3 pl-0">
                    <TextRegular className="whitespace-pre-line text-text-secondary">
                      {item.answer}
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
