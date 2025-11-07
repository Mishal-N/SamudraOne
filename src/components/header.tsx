'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const getTitle = () => {
    if (pathname === '/') return 'Dashboard';
    const segment = pathname.split('/').pop() || '';
    return capitalize(segment.replace(/-/g, ' '));
  };
  const title = getTitle();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
