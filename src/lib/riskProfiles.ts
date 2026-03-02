import { ASSET_RETURNS } from "./fireConfig";

export type AssetAllocation = {
  moneymarket: number;
  debt: number;
  equity: number;
};

export type RiskProfile = {
  id: string;
  label: string;
  allocSummary: string;
  alloc: AssetAllocation;
};

export const RISK_PROFILES: RiskProfile[] = [
  {
    id: "conservative",
    label: "Conservative",
    allocSummary: "Money Market 100%",
    alloc: { moneymarket: 1.0, debt: 0.0, equity: 0.0 },
  },
  {
    id: "low",
    label: "Low Risk",
    allocSummary: "Money Market 70%, Debt 30%",
    alloc: { moneymarket: 0.7, debt: 0.3, equity: 0.0 },
  },
  {
    id: "balanced",
    label: "Balanced",
    allocSummary: "Money Market 40%, Debt 30%, Equity 30%",
    alloc: { moneymarket: 0.4, debt: 0.3, equity: 0.3 },
  },
  {
    id: "medium",
    label: "Medium Risk",
    allocSummary: "Money Market 20%, Debt 30%, Equity 50%",
    alloc: { moneymarket: 0.2, debt: 0.3, equity: 0.5 },
  },
  {
    id: "aggressive",
    label: "Aggressive",
    allocSummary: "Debt 10%, Equity 90%",
    alloc: { moneymarket: 0.0, debt: 0.1, equity: 0.9 },
  },
];

export function blendedReturn(alloc: AssetAllocation): number {
  return (
    alloc.moneymarket * ASSET_RETURNS.moneymarket +
    alloc.debt * ASSET_RETURNS.debt +
    alloc.equity * ASSET_RETURNS.equity
  );
}
