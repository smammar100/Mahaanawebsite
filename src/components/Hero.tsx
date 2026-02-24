import Link from "next/link";

const GOOGLE_PLAY_URL = "#";
const APP_STORE_URL = "#";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full h-[85vh] flex items-center lg:items-start overflow-hidden bg-zinc-900"
    >
      {/* Background image — shift down on lg/xl so subject isn't cropped at top */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[url('/images/hero.png')] lg:[background-position:center_42%] xl:[background-position:center_40%] 2xl:[background-position:center_38%]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 flex flex-col justify-center items-start bg-gradient-to-r from-black/70 via-black/40 to-transparent"
        aria-hidden
      />

      {/* Content — same container as rest of page for alignment; extra top padding to clear navbar (larger at lg/xl) */}
      <div className="relative z-10 h-full flex flex-col justify-start items-start page-container pt-40 pb-6 sm:pt-24 sm:pb-8 md:pt-28 md:pb-10 lg:pt-28 lg:pb-12 xl:pt-32 xl:pb-16 2xl:pt-36 2xl:pb-16">
        <div className="max-w-xl w-full text-left">
          <h1
            id="hero-heading"
            className="mb-4 text-white"
          >
            Changing the way Pakistani&apos;s invest
          </h1>
          <p className="body-lg mb-8 max-w-md font-normal text-white/80">
            For ambitious dreamers who believe in saving smarter, spending wisely, and rising together
          </p>

          {/* App store buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={GOOGLE_PLAY_URL}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/google-play-badge.png"
                alt="Get it on Google Play"
                className="h-10 sm:h-12 w-auto"
                width={135}
                height={40}
              />
            </Link>
            <Link
              href={APP_STORE_URL}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/app-store-badge.png"
                alt="Download on the App Store"
                className="h-10 sm:h-12 w-auto"
                width={135}
                height={40}
              />
            </Link>
          </div>

          {/* Regulatory disclaimer — Figma: Licensed by SECP [logo] Custodians [logo] */}
          <div className="mt-8 flex flex-wrap items-center gap-3" role="group" aria-label="Licensed by SECP Custodians">
            <span className="body-sm text-white/90">Licensed by SECP</span>
            <img
              src="/images/secp-logo.png"
              alt="SECP"
              className="h-8 w-8 object-contain"
              width={32}
              height={32}
            />
            <span className="body-sm text-white/90">Custodians</span>
            <img
              src="/images/cdc-logo.png"
              alt="Central Depository Company"
              className="h-8 w-auto max-w-[4rem] object-contain"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
