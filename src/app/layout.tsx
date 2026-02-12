import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import CustomCursor from "@/components/custom-cursor";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Uptix Digital | Premium Web & App Development Agency",
  description: "Uptix Digital - A premium service-based digital agency specializing in custom web development, app development, API development, Python applications, and performance optimization.",
  keywords: "web development, app development, digital agency, API development, Python applications, performance optimization, Uptix Digital",
  authors: [{ name: "Uptix Digital" }],
  openGraph: {
    title: "Uptix Digital | Premium Web & App Development Agency",
    description: "Transform your digital presence with Uptix Digital. We build high-performance web applications, mobile apps, and custom software solutions.",
    url: "https://uptixdigital.com",
    siteName: "Uptix Digital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptix Digital | Premium Web & App Development Agency",
    description: "Transform your digital presence with Uptix Digital. We build high-performance web applications, mobile apps, and custom software solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <CustomCursor />
            <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {/* Background Effects */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-purple-500/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-[100px]" />
              </div>
              
              {/* Grid Pattern */}
              <div 
                className="fixed inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }}
              />
              
              <Navbar />
              <main className="relative z-10">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
