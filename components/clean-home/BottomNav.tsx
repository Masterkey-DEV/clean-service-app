import { LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

export const BottomNav = ({ items }: { items: NavItem[] }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
    <div className="flex items-center justify-around py-2">
      {items.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 ${
            item.active ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  </nav>
);
