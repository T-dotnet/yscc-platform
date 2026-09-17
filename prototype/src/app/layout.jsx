import "../styles.css";
import localFont from "next/font/local";
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
});
export const metadata = {
  title: "YSCC — Care, connected",
  description:
    "An interactive YSCC care and assessment workspace using sample data.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
