"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, CalendarDays, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getCalApi } from "@calcom/embed-react"; // Importamos para usar la función directamente
import { CAL_LINK } from "@/const/const";

export function BottomNav() {
  const pathname = usePathname();

  // Función para abrir el calendario manualmente
  const handleBooking = async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: CAL_LINK,
      config: { layout: "month_view", theme: "light" },
    });
  };

  const NAV_ITEMS = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: LayoutGrid, label: "Catálogo", href: "/more" },
    { icon: CalendarDays, label: "Reservas", href: "/reservas", isCal: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg pb-safe">
      <div className="mx-auto flex max-w-md items-center justify-around py-2 relative">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          const itemClasses = cn(
            "relative flex flex-col items-center gap-1 px-4 py-1 text-[10px] font-medium transition-colors outline-none w-full h-full",
            isActive ? "text-primary" : "text-muted-foreground",
          );

          // --- CASO 1: BOTÓN DE CAL.COM (RESERVAS) ---
          if (item.isCal) {
            return (
              <button
                key={item.label}
                onClick={handleBooking} // Ejecutamos la función al hacer clic en cualquier parte del botón
                className={itemClasses}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="pointer-events-none" // Hacemos que el icono no intercepte el clic
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>
                <span className="pointer-events-none">{item.label}</span>
              </button>
            );
          }

          // --- CASO 2: LINKS NORMALES ---
          return (
            <Link key={item.label} href={item.href} className={itemClasses}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon
                  className={cn("h-5 w-5", isActive && "stroke-[2.5px]")}
                />
              </motion.div>
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 h-1 w-6 rounded-t-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
