import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

/** Build Sanity image URL for next/image or src. Source is the image object from GROQ (e.g. mainImage, author.image). */
export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0]) {
  return builder.image(source);
}
