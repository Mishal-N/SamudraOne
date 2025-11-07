'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ship, FlaskConical, Briefcase, Check } from 'lucide-react';
import { useRole, type UserRole } from '@/contexts/role-context';

const roleIcons = {
  Fisherman: Ship,
  Researcher: FlaskConical,
  Policymaker: Briefcase,
};

export function UserNav() {
  const { role, setRole } = useRole();
  const Icon = roleIcons[role];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${role}.png`} alt={role} />
            <AvatarFallback>
              <Icon className="size-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Current Role</p>
            <p className="text-xs leading-none text-muted-foreground">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
          {(Object.keys(roleIcons) as UserRole[]).map((r) => (
            <DropdownMenuItem key={r} onClick={() => setRole(r)}>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                   {React.createElement(roleIcons[r], { className: 'h-4 w-4' })}
                  <span>{r}</span>
                </div>
                {role === r && <Check className="h-4 w-4" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
