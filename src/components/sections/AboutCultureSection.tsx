"use client";

import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import ShinyText from "@/components/ui/ShinyText";
import { H2 } from "@/components/ui/Typography";

const CULTURE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8", alt: "Mahaana culture" },
  { src: "https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
  { src: "https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
  { src: "https://plus.unsplash.com/premium_photo-1758367454070-731d3cc11774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
  { src: "https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
  { src: "https://images.unsplash.com/photo-1741715661559-6149723ea89a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
  { src: "https://images.unsplash.com/photo-1725878746053-407492aa4034?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
  { src: "https://images.unsplash.com/photo-1752588975168-d2d7965a6d64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D", alt: "Mahaana culture" },
];

export function AboutCultureSection() {
  return (
    <div
      className="w-full overflow-hidden bg-surface-bg h-[900px]"
      aria-labelledby="about-culture-heading"
    >
      <div className="relative min-h-[500px] w-full h-[700px]">
        <InfiniteGallery
          images={CULTURE_IMAGES}
          speed={1.2}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-[70vh] w-full sm:h-[80vh] lg:h-screen"
        />

        {/* Overlay: heading only — pointer-events-none so wheel/scroll drives gallery */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
          <H2
            id="about-culture-heading"
            className="max-w-xl font-serif italic text-3xl sm:text-4xl lg:text-5xl text-center"
          >
            <ShinyText
              text="Inside"
              speed={2}
              delay={0}
              color="#9333ea"
              shineColor="#e9d5ff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
            <br />
            <ShinyText
              text="Mahaanaverse"
              speed={2}
              delay={0}
              color="#9333ea"
              shineColor="#e9d5ff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
            />
          </H2>
        </div>
      </div>
    </div>
  );
}
