interface DataGridItem {
  _key?: string;
  label: string;
  value?: string;
  description?: string;
  icon?: string;
}

interface DataGridValue {
  heading?: string;
  subheading?: string;
  variant?: "metrics" | "cards" | "features" | "compact";
  items?: DataGridItem[];
}

function itemKey(item: DataGridItem, index: number) {
  return item._key || `${item.label}-${index}`;
}

export function DataGridBlock({ value }: { value: DataGridValue }) {
  const items = value.items || [];
  const variant = value.variant || "cards";

  return (
    <section className="my-10 rounded-2xl border border-surface-stroke bg-surface-card p-6 sm:p-8">
      {value.heading ? (
        <h2 className="text-2xl font-semibold text-text-primary">{value.heading}</h2>
      ) : null}
      {value.subheading ? (
        <p className="mt-2 text-body-sm text-text-tertiary">{value.subheading}</p>
      ) : null}

      {variant === "metrics" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={itemKey(item, index)}
              className="rounded-xl border border-surface-stroke bg-surface-bg p-4"
            >
              {item.value ? (
                <p className="text-3xl font-semibold text-text-primary">{item.value}</p>
              ) : null}
              <p className="mt-1 text-body-sm text-text-tertiary">{item.label}</p>
              {item.description ? (
                <p className="mt-2 text-body-sm text-text-tertiary">{item.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {variant === "cards" ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={itemKey(item, index)}
              className="rounded-xl border border-surface-stroke bg-surface-bg p-5"
            >
              <h3 className="text-lg font-semibold text-text-primary">{item.label}</h3>
              {item.value ? (
                <p className="mt-2 text-body-md font-medium text-text-secondary">
                  {item.value}
                </p>
              ) : null}
              {item.description ? (
                <p className="mt-2 text-body-sm text-text-tertiary">{item.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {variant === "features" ? (
        <div className="mt-6 space-y-3">
          {items.map((item, index) => (
            <article
              key={itemKey(item, index)}
              className="rounded-xl border border-surface-stroke bg-surface-bg p-4"
            >
              <div className="flex items-start gap-3">
                {item.icon ? (
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-lg">
                    {item.icon}
                  </span>
                ) : null}
                <div>
                  <h3 className="text-body-md font-semibold text-text-primary">
                    {item.label}
                  </h3>
                  {item.description ? (
                    <p className="mt-1 text-body-sm text-text-tertiary">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === "compact" ? (
        <div className="mt-6 overflow-hidden rounded-xl border border-surface-stroke">
          {items.map((item, index) => (
            <div
              key={itemKey(item, index)}
              className="grid grid-cols-1 gap-2 border-b border-surface-stroke bg-surface-bg px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_auto]"
            >
              <p className="text-body-sm text-text-primary">{item.label}</p>
              <p className="text-body-sm font-medium text-text-secondary">
                {item.value || item.description || "—"}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
