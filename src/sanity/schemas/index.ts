import { faqType } from "./faq";
import { fundDocumentType } from "./fundDocument";
import { investorEducationArticleType } from "./investorEducationArticle";
import { investorEducationNewsType } from "./investorEducationNews";
import { investorEducationVideoPodcastType } from "./investorEducationVideoPodcast";

export const schemaTypes: import("sanity").SchemaTypeDefinition[] = [
  faqType,
  fundDocumentType,
  investorEducationArticleType,
  investorEducationNewsType,
  investorEducationVideoPodcastType,
];
