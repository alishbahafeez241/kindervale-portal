import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/context/auth-context";
import { SidebarProvider } from "@/context/sidebar-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kindervale Preschool - School Information System",
  description: "Kindervale Preschool school information system.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Kindervale Preschool - School Information System",
    description: "Student, teacher, parent, attendance, exams, and fee management.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kindervale Preschool - School Information System",
    description: "Kindervale Preschool school information system."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2e5a75"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AuthProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
