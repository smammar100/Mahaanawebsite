import type { BenefitsCardItem } from "@/components/sections/BenefitsSection";

export const retirementBenefitsCards: BenefitsCardItem[] = [
  {
    label: "SAVE TAX, SAVE MORE",
    headline: "Unlock tax savings for your future",
    body: "According to VPS Rules 2005, Mahaana Retirement offers up to a 20% tax credit on your contributions, reducing your monthly tax liability. This unique benefit allows you to save more while building a solid financial foundation for retirement.",
    items: [
      "Up to 20% tax credit on contributions",
      "Reduce your monthly tax liability",
      "Build a solid financial foundation for retirement",
    ],
    hasRiskButtons: false,
    image: "/images/invest/A.webp",
  },
  {
    label: "RETIREMENT, SIMPLIFIED",
    headline: "Stay focused with Mahaana Retirement",
    body: "With Mahaana Retirement, your long-term goals get dedicated attention. Our focused approach ensures a clear, simplified financial strategy that grows your wealth steadily toward the retirement you deserve.",
    items: [
      "Dedicated attention to long-term goals",
      "Clear, simplified financial strategy",
      "Steady growth toward the retirement you deserve",
    ],
    hasRiskButtons: false,
    image: "/images/invest/B.webp",
  },
  {
    label: "PLACEHOLDER",
    headline: "Your retirement account in partnership with IGI Life Insurance",
    body: "Mahaana Wealth partners with IGI Life Insurance to bring you a comprehensive retirement solution that combines expert investment management with trusted insurance protection.",
    items: ["Benefit one", "Benefit two", "Benefit three"],
    hasRiskButtons: false,
    image: "/images/invest/C.webp",
  },
  {
    label: "PLACEHOLDER",
    headline: "Expert built, curated portfolios",
    body: "We've curated diversified portfolios with different risk/return profiles ranging from conservative to growth to fit your risk appetite & goals.",
    items: ["Benefit one", "Benefit two", "Benefit three"],
    hasRiskButtons: false,
    showPortfolioChart: true,
  },
];
