import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans'; // Correct import for variable font
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'MyAI Pal',
  description: 'Your personal AI chat assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply font variables correctly */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
