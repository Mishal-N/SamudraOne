import React from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarRail,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { Header } from '@/components/header';
import { Logo } from '@/components/logo';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon" className="transition-all duration-300">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Can add footer items here if needed */}
          </SidebarFooter>
        </Sidebar>
        <SidebarRail />
        <SidebarInset className="bg-background min-h-screen transition-all duration-300">
          <Header />
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
