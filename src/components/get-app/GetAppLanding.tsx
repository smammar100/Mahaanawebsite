"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { H1 } from "@/components/ui/Typography";
import { getAppSans } from "@/lib/get-app-fonts";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const DynamicSilkBackground = dynamic(
  () => import("@/components/ui/SilkBackground").then((m) => m.SilkBackground),
  { ssr: false },
);

type GetAppLandingProps = {
  storeRedirectQrUrl: string;
};

function qrServerImageUrl(dataUrl: string, sizePx: number) {
  const params = new URLSearchParams({
    size: `${sizePx}x${sizePx}`,
    data: dataUrl,
  });
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}

export function GetAppLanding({ storeRedirectQrUrl }: GetAppLandingProps) {
  const router = useRouter();
  const qrSrc = qrServerImageUrl(storeRedirectQrUrl, 180);

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className={cx(
        "flex min-h-dvh flex-col md:flex-row",
        getAppSans.className,
      )}
    >
      {/* Left — visual */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex min-h-[42vh] flex-1 items-center justify-center overflow-hidden px-6 py-10 md:min-h-dvh md:w-1/2 md:flex-none md:py-0"
      >
        <div
          className="absolute inset-0 z-0 bg-[#8952fd]"
          aria-hidden
        />
        <DynamicSilkBackground
          color="#8952fd"
          speed={5}
          scale={1}
          noiseIntensity={1.5}
        />
        <div className="relative z-10 mx-auto w-full max-w-[280px]">
          {/* Phone frame */}
          <div
            className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-gray-900 bg-gray-900 shadow-2xl"
            style={{ aspectRatio: "9 / 19" }}
          >
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-gray-900" aria-hidden />
            <Image
              src="/images/invest/IMG_0252.png"
              alt="Mahaana app dashboard with portfolio balance and performance chart"
              fill
              className="object-cover object-center"
              sizes="280px"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Right — content */}
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 flex-col justify-center px-6 py-12 md:w-1/2 md:flex-none md:px-12 lg:px-16"
      >
        <p className="mb-2">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex cursor-pointer items-center gap-1.5 bg-transparent p-0 text-left text-sm font-medium text-slate-500 underline-offset-4 hover:text-system-brand hover:underline"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            {cleanCopy("Go back")}
          </button>
        </p>

        <H1 id="get-app-heading" weight="semibold" className="max-w-lg text-text-primary">
          Get the Mahaana app
        </H1>

        <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
          {cleanCopy(
            "Invest on the go, track your portfolio, and open your account from your phone — wherever you are.",
          )}
        </p>

        <div className="mt-8 max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
            {cleanCopy("Scan to download")}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- external QR API; referrerPolicy required */}
          <img
            src={qrSrc}
            alt="QR code linking to the Mahaana app download page"
            width={180}
            height={180}
            className="mx-auto h-auto max-w-full"
            referrerPolicy="no-referrer"
          />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-5">
            <AppStoreButton />
            <GooglePlayButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
