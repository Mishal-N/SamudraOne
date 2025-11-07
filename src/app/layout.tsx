import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { Toaster } from '@/components/ui/toaster';
import { RoleProvider } from '@/contexts/role-context';

export const metadata: Metadata = {
  title: 'SamudraOne Platform',
  description: 'Harnessing AI to Unify Oceans, Biodiversity, and Sustainability.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <RoleProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </RoleProvider>
      </body>
    </html>
  );
}
