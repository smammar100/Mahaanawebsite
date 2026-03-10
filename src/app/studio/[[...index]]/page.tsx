"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  () =>
    Promise.all([
      import("next-sanity/studio"),
      import("../../../../sanity.config"),
    ]).then(([studioMod, configMod]) => {
      const config = configMod.default;
      return function StudioPage() {
        return (
          <div className="fixed inset-0 z-[9999] w-full h-full bg-white">
            <studioMod.NextStudio config={config} />
          </div>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        Loading Sanity Studio…
      </div>
    ),
  }
);

export default function StudioRoute() {
  return <NextStudio />;
}
