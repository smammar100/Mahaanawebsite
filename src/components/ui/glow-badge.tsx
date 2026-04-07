"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const shellClassName =
  "bg-white no-underline group relative rounded-full p-px text-xs font-semibold leading-6 text-text-primary shadow-lg shadow-black/15 ring-1 ring-black/10 inline-block";

function GlowBadgeInner({
  text,
  leadingIcon,
}: {
  text: string;
  leadingIcon?: ReactNode;
}) {
  return (
    <>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(147,51,234,0.2)_0%,rgba(147,51,234,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative z-10 flex items-center gap-2 rounded-full bg-white px-4 py-0.5 ring-1 ring-black/5">
        {leadingIcon ? (
          <span className="inline-flex shrink-0 text-text-primary [&_svg]:size-4">
            {leadingIcon}
          </span>
        ) : null}
        <span className="text-text-primary">{text}</span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary-200/0 via-primary-200/80 to-primary-200/0 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
    </>
  );
}

/**
 * Pill badge with optional leading icon. Use for marketing highlights.
 * For shadcn-style outline badges elsewhere, use {@link Badge} from `@/components/ui/badge`.
 */
export function GlowBadge({
  text,
  href,
  className,
  leadingIcon,
}: {
  text: string;
  href?: string;
  className?: string;
  leadingIcon?: ReactNode;
}) {
  const cnShell = cn(shellClassName, !href && "cursor-default", className);

  if (!href) {
    return (
      <span className={cnShell}>
        <GlowBadgeInner text={text} leadingIcon={leadingIcon} />
      </span>
    );
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cnShell}>
        <GlowBadgeInner text={text} leadingIcon={leadingIcon} />
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cnShell}
    >
      <GlowBadgeInner text={text} leadingIcon={leadingIcon} />
    </a>
  );
}
