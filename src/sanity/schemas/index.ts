import { faqType } from "./faq";
import { fundDocumentType } from "./fundDocument";
import { investorEducationArticleType } from "./investorEducationArticle";
import { investorEducationNewsType } from "./investorEducationNews";
import { investorEducationVideoPodcastType } from "./investorEducationVideoPodcast";
import { legalDocumentType } from "./legalDocument";
import { accordion } from "./objects/accordion";
import { blockContent } from "./objects/blockContent";
import { callToAction } from "./objects/callToAction";
import { dataGrid } from "./objects/dataGrid";
import { iconFeatureCard } from "./objects/iconFeatureCard";
import { inlineImage } from "./objects/inlineImage";
import { section } from "./objects/section";
import { videoEmbed } from "./objects/videoEmbed";

export const schemaTypes: import("sanity").SchemaTypeDefinition[] = [
  accordion,
  blockContent,
  callToAction,
  dataGrid,
  iconFeatureCard,
  faqType,
  fundDocumentType,
  inlineImage,
  investorEducationArticleType,
  investorEducationNewsType,
  investorEducationVideoPodcastType,
  legalDocumentType,
  section,
  videoEmbed,
];
