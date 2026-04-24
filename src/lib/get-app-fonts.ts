import localFont from "next/font/local";

export const getAppSans = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-get-app-sans",
  weight: "100 900",
});
