import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import { Feature128 } from "@/components/feature128";
import { Feature270 } from "@/components/feature270";
import SecurityPrioritySection from "@/components/SecurityPrioritySection";
import SecuritySection from "@/components/SecuritySection";
import { Feature132 } from "@/components/Feature132";
import { Testimonial11 } from "@/components/Testimonial11";
import { Blog21 } from "@/components/Blog21";
import { Faq4 } from "@/components/Faq4";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <TrustedBy />
      <Feature128 />
      <Feature270 />
      <SecuritySection />
      <Feature132 />
      <SecurityPrioritySection />
      <Testimonial11 />
      <Blog21 />
      <CTASection />
      <Faq4 />
    </div>
  );
}
