import Hero from "@/components/Hero";
import { Feature254 } from "@/components/feature254";
import { Feature270 } from "@/components/feature270";
import TrustedBy from "@/components/TrustedBy";
import { Hero233 } from "@/components/Hero233";
import { Feature128 } from "@/components/feature128";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <TrustedBy />
      <Hero233 />
      <Feature270 />
      <Feature128 />
      <Feature254 />
    </div>
  );
}
