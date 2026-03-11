import { StudioRouteClient } from "./StudioRouteClient";

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

  return <StudioRouteClient projectId={projectId} />;
}
