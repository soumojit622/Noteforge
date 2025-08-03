import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noteforge — Your Smart Note-Taking Companion",
  description:
    "Noteforge is a sleek and powerful note-taking app designed for productivity, creativity, and collaboration. Capture your thoughts, ideas, and tasks effortlessly.",
  authors: [{ name: "Soumojit Banerjee", url: "https://github.com/soumojit622" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <NuqsAdapter>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
