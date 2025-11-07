import { Anchor } from 'lucide-react';

export function Logo() {
  return (
    <div
      data-sidebar="logo"
      className="flex items-center gap-2.5 p-2"
    >
      <Anchor className="size-6 text-sidebar-primary" />
      <h2
        data-sidebar="logo-text"
        className="text-lg font-bold text-sidebar-foreground group-data-[state=collapsed]:hidden"
      >
        SamudraOne
      </h2>
    </div>
  );
}
