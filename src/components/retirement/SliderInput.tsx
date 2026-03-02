"use client";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  display?: string;
  hint?: string;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
}: SliderInputProps) {
  const displayValue = display ?? String(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <span className="font-mono text-sm text-text-secondary">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg border border-surface-stroke bg-surface-bg accent-system-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-0"
      />
      {hint && (
        <p className="text-tiny text-text-tertiary">{hint}</p>
      )}
    </div>
  );
}
