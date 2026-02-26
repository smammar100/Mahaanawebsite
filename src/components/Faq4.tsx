import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const faqs = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic. Having a well-structured FAQ section is important because it allows users to quickly find information they need without the hassle of contacting customer support.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions.",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience. Secondly, it reduces the number of support tickets or inquiries, freeing up time for your support team to focus on more unique or complicated issues.",
  },
  {
    question: "How should I organize my FAQ for optimal usability?",
    answer:
      'An organized FAQ is critical for user-friendliness. Start by grouping similar questions into categories, such as "Billing," "Account Setup," or "Technical Support." This way, users can quickly find the section that addresses their specific concerns.',
  },
  {
    question: "How often should I update my FAQ, and why is it necessary?",
    answer:
      "Regular updates to your FAQ are essential to keeping the information accurate and relevant. As your product or service evolves, so will the types of questions your users ask.",
  },
  {
    question: "Is it possible to customize my FAQ section to match my brand?",
    answer:
      "Yes, your FAQ section can and should be customized to align with your brand's identity. This includes matching the visual design, such as fonts, colors, and layout, to the rest of your site or app. You can also enhance the section with additional media like images, videos, or links to other relevant resources.",
  },
  {
    question: "How can I make sure users know about my FAQ section?",
    answer:
      "Promoting your FAQ section is key to ensuring that users take advantage of it. You can do this by adding links to the FAQ on your website's navigation bar, footer, or help pages.",
  },
];

interface Faq4Props {
  className?: string;
}

function Faq4({ className }: Faq4Props) {
  return (
    <section
      aria-labelledby="faq-heading"
      className={cn("w-full py-8 md:py-12 lg:py-16", className)}
    >
      <div className="page-container flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-4">
          <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
            <span className="body-xs font-medium text-brand-700">FAQ</span>
          </div>
          <h3
            id="faq-heading"
            className="max-w-[50ch] font-heading font-semibold text-foreground"
          >
            Common Questions & Answers
          </h3>
          <p className="body-md max-w-[65ch] font-body text-muted-foreground">
            Find out all the essential details about our platform and how it can
            serve your needs.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="body-md font-body hover:text-foreground/80 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="body-md font-body text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Separator className="my-0" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="body-lg font-semibold text-foreground">
              Still have questions?
            </p>
            <p className="body-md max-w-[65ch] font-body text-muted-foreground">
              We&apos;re here to provide clarity and assist with any queries you
              may have.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] w-fit items-center gap-2 body-md font-medium text-foreground transition-colors hover:text-foreground/80 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Contact Support
            <ChevronRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { Faq4 };
