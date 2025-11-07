'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useRole } from '@/contexts/role-context';
import {
  LayoutDashboard,
  Fish,
  Microscope,
  Dna,
  Database,
  BookMarked,
  type LucideIcon,
} from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: string[];
};

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/fish-stock', label: 'Fish Stock', icon: Fish, roles: ['Fisherman', 'Researcher'] },
  { href: '/biodiversity', label: 'Biodiversity', icon: Microscope, roles: ['Researcher'] },
  { href: '/edna', label: 'eDNA Analysis', icon: Dna, roles: ['Researcher'] },
  { href: '/data-management', label: 'Data Management', icon: Database, roles: ['Policymaker'] },
  { href: '/taxonomy', label: 'Taxonomy', icon: BookMarked, roles: ['Researcher', 'Policymaker'] },
];

export function MainNav() {
  const pathname = usePathname();
  const { role } = useRole();

  const filteredNavItems = navItems.filter(item => !item.roles || item.roles.includes(role));

  return (
    <SidebarMenu>
      {filteredNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label, side: 'right' }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
