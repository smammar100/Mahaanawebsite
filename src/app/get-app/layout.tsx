import { getAppSans } from "@/lib/get-app-fonts";

export default function GetAppRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${getAppSans.variable} min-h-dvh bg-white`}>
      {children}
    </div>
  );
}
