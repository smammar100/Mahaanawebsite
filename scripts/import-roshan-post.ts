/**
 * One-off script to import the Roshan Digital Account blog post into Sanity
 * as an investorEducationArticle with bodyHtml (Portable Text).
 *
 * Prerequisites:
 * - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_WRITE_TOKEN (or SANITY_API_WRITE_TOKEN) with write access.
 *
 * Run from project root:
 *   npm run import:post
 *   or: npx tsx scripts/import-roshan-post.ts
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

function key(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

type BlockChild = { _type: "span"; _key: string; text: string; marks?: string[] };
type PortableBlock = {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  markDefs: unknown[];
  children: BlockChild[];
};

function span(text: string, marks?: string[]): BlockChild {
  return { _type: "span", _key: key(), text, ...(marks?.length ? { marks } : {}) };
}

function block(
  style: string,
  children: BlockChild[],
  opts?: { listItem?: string; level?: number }
): PortableBlock {
  const b: PortableBlock = {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children,
  };
  if (opts?.listItem) b.listItem = opts.listItem;
  if (opts?.level != null) b.level = opts.level;
  return b;
}

function buildBodyHtml(): PortableBlock[] {
  return [
    block("normal", [
      span(
        "Since its launch in late 2020, the Roshan Digital Account (RDA) has rewritten the rules of diaspora investment. With over $12 billion in cumulative inflows and more than 905,000 accounts opened across leading partner banks, it has become one of Pakistan's most successful financial initiatives. But behind the headline numbers lies a more nuanced story — one of incredible opportunity tempered by real-world friction."
      ),
    ]),
    block("h2", [span("RDA by the Numbers: Unprecedented Success")]),
    block("normal", [
      span(
        "What makes the RDA unique is its status as a fully digital banking solution curated by the State Bank of Pakistan. Unlike traditional foreign currency accounts, it grants direct access to high-yield Naya Pakistan Certificates (NPCs) and operates under a simplified tax regime."
      ),
    ]),
    block("normal", [
      span("A critical feature for investors is the "),
      span("full repatriability of funds", ["strong"]),
      span(
        ". Investors can move their principal and profit back to their country of residence without requiring any prior central bank approval — a major hurdle in the past."
      ),
    ]),
    block("h2", [span("Top Investment Trends in RDA")]),
    block("h3", [span("Naya Pakistan Certificates (NPCs)")]),
    block("normal", [
      span(
        "NPCs remain the crown jewel of the RDA ecosystem. Backed by the Government of Pakistan, they offer some of the most competitive returns globally:"
      ),
    ]),
    block("normal", [span("PKR Certificates: "), span("Up to 13.5% annual return.", ["strong"])], {
      listItem: "bullet",
      level: 1,
    }),
    block("normal", [
      span("USD & GBP Certificates: "),
      span("Approximately 7.5% annual return.", ["strong"]),
    ], { listItem: "bullet", level: 1 }),
    block("h3", [span("The Islamic Finance Surge")]),
    block("normal", [
      span(
        "A fascinating trend in early 2026 is the dominance of Shariah-compliant products. Islamic NPCs have attracted nearly double the volume of Conventional NPCs: "
      ),
      span("$1.063 billion", ["strong"]),
      span(" compared to "),
      span("$518 million", ["strong"]),
      span(
        ". This reflects a deep-seated demand for ethical, interest-free investment avenues among the diaspora."
      ),
    ]),
    block("h3", [span("Broadening Horizons: Equities & Real Estate")]),
    block("normal", [
      span("While NPCs lead, other sectors are maturing:"),
    ]),
    block("normal", [
      span("Roshan Equity: "),
      span(
        "$114 million invested in the Pakistan Stock Exchange (PSX).",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Emerging Platforms: "),
      span(
        "FinTechs like Mahaana Wealth are simplifying access to mutual funds, providing a modern alternative to traditional firms like AKD Securities or Arif Habib.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Roshan Apna Ghar: "),
      span(
        "A dedicated scheme making it easier for overseas Pakistanis to finance and purchase property in their homeland digitally.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("h2", [span("The Reality Check: Navigating RDA Challenges")]),
    block("normal", [
      span(
        "Despite the staggering numbers, the user experience is not without friction. Investors must look past the marketing to understand the operational hurdles."
      ),
    ]),
    block("h3", [span('The "Zero Fee" Myth')]),
    block("normal", [
      span("While the accounts are marketed as low-cost, hidden charges can eat into your returns. Intermediary banks often deduct between "),
      span("$20 and $60", ["strong"]),
      span(
        " per transfer. Locally, banks like HBL may apply \"Telex fees\" (approx. PKR 2,500) on inward remittances, which can surprise smaller investors."
      ),
    ]),
    block("h3", [span("Bureaucratic & Technical Hurdles")]),
    block("normal", [
      span(
        "The digital promise sometimes hits a wall of old-school bureaucracy. Common frustrations include:"
      ),
    ]),
    block("normal", [
      span("Account Friction: "),
      span(
        "Reports of digital signature failures and slow verification at institutions like Meezan Bank or UBL.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Repatriation Delays: "),
      span(
        "While guaranteed by law, untrained staff at some branches have been known to mistakenly apply withholding tax on the principal investment rather than just the profit.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Customer Support: "),
      span(
        "Complex issues often require expensive international calls, as email support can be generic and slow.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("h3", [span("Key System Limitations")]),
    block("normal", [
      span("No Local Deposits: "),
      span(
        "The RDA strictly accepts foreign remittances. You cannot deposit local income (like rent from a local property) into this account.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Stock Market Complexity: "),
      span(
        "Investing in the PSX still involves a separate, manual-heavy KYC process with the CDC and brokerage firms.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("h2", [span("Conclusion & Recommendations")]),
    block("normal", [
      span(
        "The Roshan Digital Account is a powerful initiative that has successfully bridged the gap between the diaspora and the Pakistani economy. However, the $12 billion success story requires a strategic approach from the individual investor."
      ),
    ]),
    block("h3", [span("Pro-Tips for Investors")]),
    block("normal", [
      span("Bank Selection is Key: "),
      span(
        "Operational efficiency varies wildly. Consult recent user reviews on forums specifically for the bank you choose.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Expect Hidden Costs: "),
      span(
        "Factor in intermediary bank fees when calculating your net yield.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Leverage Modern Facilitators: "),
      span(
        "Consider using modern platforms like Mahaana Wealth for a smoother equity investment experience.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
    block("normal", [
      span("Due Diligence: "),
      span(
        "Approach the RDA with a realistic mindset — the financial rewards are high, but patience for local bureaucracy is essential.",
        ["strong"]
      ),
    ], { listItem: "bullet", level: 1 }),
  ];
}

async function main() {
  const bodyHtml = buildBodyHtml();

  const doc = {
    _id: "roshan-digital-account-12-billion-opportunity",
    _type: "investorEducationArticle",
    title:
      "Roshan Digital Account: The $12 Billion Opportunity and What Every Overseas Pakistani Must Know",
    slug: {
      _type: "slug",
      current: "roshan-digital-account-12-billion-opportunity",
    },
    publishedAt: "2026-03-12T00:00:00.000Z",
    author: "Roshan Perspectives",
    readingTime: "6 minutes",
    excerpt:
      "Since its launch in 2020, the Roshan Digital Account has attracted over $12 billion and 905,000+ accounts. This guide breaks down the opportunity, the investment trends, and the real challenges every overseas Pakistani investor must know.",
    bodyHtml,
  };

  const result = await client.createOrReplace(doc);
  console.log("Created/updated document:", result._id);
  console.log(
    "View at: /investor-education/roshan-digital-account-12-billion-opportunity"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
