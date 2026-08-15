import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - Designation & Department Management",
  description: "Manage your organization's designations and departments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="hidden sm:block focus-visible:absolute top-4 left-4 z-50 px-3 py-2 border border-black bg-white text-black text-sm font-mono font-bold transition-none -translate-y-4 focus-visible:translate-y-0 focus-visible:ring-4 focus-visible:ring-red-500 focus-visible:outline-none"
        >
          Skip to main content
        </a>

        <main id="main-content" className="flex-grow">{children}</main>
      </body>
    </html>
  );
}