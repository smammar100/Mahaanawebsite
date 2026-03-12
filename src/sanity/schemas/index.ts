import { fundDocumentType } from "./fundDocument";
import { investorEducationArticleType } from "./investorEducationArticle";
import { investorEducationNewsType } from "./investorEducationNews";
import { investorEducationVideoPodcastType } from "./investorEducationVideoPodcast";

export const schemaTypes: import("sanity").SchemaTypeDefinition[] = [
  fundDocumentType,
  investorEducationArticleType,
  investorEducationNewsType,
  investorEducationVideoPodcastType,
];
