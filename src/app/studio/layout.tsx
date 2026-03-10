import Script from "next/script";

const SANITY_BRIDGE_SCRIPT = "https://core.sanity-cdn.com/bridge.js";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src={SANITY_BRIDGE_SCRIPT}
        strategy="afterInteractive"
        async
        type="module"
      />
      <div className="min-h-screen w-full m-0 p-0 overflow-auto">
        {children}
      </div>
    </>
  );
}
