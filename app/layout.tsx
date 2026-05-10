import type { Metadata } from "next";
import { Header } from "@/components/clean-home/Header";
import { BottomNav } from "@/components/Botton";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CleanHome - Servicio de Limpieza Profesional",
  description: "Servicios de limpieza residencial, profesional y corporativa. Limpieza profunda, desinfección y mantenimiento para tu hogar u oficina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
