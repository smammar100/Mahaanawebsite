"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const NextStudio = dynamic(
  () =>
    Promise.all([
      import("next-sanity/studio"),
      import("../../../../sanity.config"),
    ]).then(([studioMod, configMod]) => {
      const config = configMod.default;
      return function StudioPage() {
        return (
          <div className="fixed inset-0 z-[9999] w-full h-full bg-surface-bg">
            <studioMod.NextStudio config={config} />
          </div>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen w-full items-center justify-center bg-surface-bg">
        Loading Sanity Studio…
      </div>
    ),
  }
);

export function StudioRouteClient({
  projectId,
}: {
  projectId: string;
}) {
  if (!projectId || projectId.trim() === "") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-surface-bg px-4">
        <div className="max-w-md rounded-xl border border-warning-200 bg-warning-100 p-6 text-center dark:border-warning-400 dark:bg-warning-400/20">
          <h1 className="text-system-warning">
            Sanity Studio is not configured
          </h1>
          <p className="mt-3 font-body text-regular text-text-secondary">
            Set <code className="rounded bg-warning-150 px-1.5 py-0.5 font-mono text-small">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code className="rounded bg-warning-150 px-1.5 py-0.5 font-mono text-small">NEXT_PUBLIC_SANITY_DATASET</code> in{" "}
            <code className="rounded bg-warning-150 px-1.5 py-0.5 font-mono text-small">.env.local</code> and restart the dev server.
          </p>
          <p className="mt-4 font-body text-small text-text-secondary">
            Copy from <code className="rounded bg-warning-150 px-1.5 py-0.5 font-mono text-tiny">.env.example</code> and add your project ID from{" "}
            <a
              href="https://sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-system-brand underline underline-offset-2 hover:no-underline"
            >
              sanity.io/manage
            </a>
            . Then add your site URL (e.g. http://localhost:3000) to CORS origins in the project API settings.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-system-warning px-5 py-2.5 font-body text-regular font-semibold text-gray-100 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-warning"
          >
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  return <NextStudio />;
}
