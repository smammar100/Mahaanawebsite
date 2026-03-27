import Link from "next/link";

interface CallToActionAction {
  _key?: string;
  label: string;
  url: string;
  style?: "primary" | "secondary" | "link";
}

interface CallToActionValue {
  heading: string;
  body?: string;
  actions?: CallToActionAction[];
  variant?: "default" | "prominent";
}

function actionClass(style: CallToActionAction["style"]) {
  if (style === "secondary") {
    return "border border-surface-stroke bg-surface-bg text-text-primary hover:border-system-brand hover:text-system-brand";
  }
  if (style === "link") {
    return "bg-transparent text-system-brand underline underline-offset-2 hover:opacity-80 px-1";
  }
  return "bg-system-brand text-gray-100 hover:opacity-90";
}

export function CallToActionBlock({ value }: { value: CallToActionValue }) {
  const actions = value.actions || [];
  const prominent = value.variant === "prominent";

  return (
    <section
      className={`my-12 rounded-2xl border p-6 sm:p-8 ${
        prominent
          ? "border-transparent bg-gradient-to-r from-gray-900 to-primary-300 text-gray-100"
          : "border-surface-stroke bg-surface-card text-text-primary"
      }`}
    >
      <h2 className="text-2xl font-semibold">{value.heading}</h2>
      {value.body ? (
        <p
          className={`mt-3 text-body-md ${
            prominent ? "text-gray-200" : "text-text-tertiary"
          }`}
        >
          {value.body}
        </p>
      ) : null}

      {actions.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Link
              key={action._key || `${action.label}-${index}`}
              href={action.url}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-body-sm font-semibold transition-colors ${actionClass(
                action.style
              )}`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
