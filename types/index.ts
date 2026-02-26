import { LucideIcon } from "lucide-react";

export interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string; // Añadido href para navegación real futura
  active?: boolean;
}
