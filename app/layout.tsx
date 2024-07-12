import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
    : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL('https://admin.terrahacks.ca'),
  title: "TerraHacks Admin - Dashboard",
  description: "Manage all TerraHacks admin things in one place easily! From applications to judging, handle it all from the admin dashboard.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="bg-background text-foreground ">
                <main className="min-h-screen flex flex-col items-center">
                    {children}
                </main>
                <Toaster />
            </body>
        </html>
    );
}
