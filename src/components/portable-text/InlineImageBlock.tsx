import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";

interface InlineImageValue {
  image?: {
    asset?: { _ref?: string };
    [key: string]: unknown;
  };
  alt?: string;
  caption?: string;
  display?: "inline" | "wide" | "full";
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const imageBuilder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

function displayClass(display: InlineImageValue["display"]) {
  if (display === "wide") return "max-w-4xl mx-auto";
  if (display === "full") return "w-full";
  return "max-w-[42rem] mx-auto";
}

export function InlineImageBlock({ value }: { value: InlineImageValue }) {
  if (!value.image?.asset?._ref || !imageBuilder) return null;

  const imageUrl = imageBuilder.image(value.image).width(1600).auto("format").url();
  const alt = value.alt || "Article image";

  return (
    <figure className={`my-10 ${displayClass(value.display)}`}>
      <div
        className={`relative w-full overflow-hidden border border-surface-stroke ${
          value.display === "full" ? "rounded-none" : "rounded-2xl"
        }`}
      >
        <Image
          src={imageUrl}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
        />
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-center text-body-sm text-text-tertiary">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
