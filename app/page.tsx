"use client";

import {
  Sparkles,
  LayoutGrid,
  ChevronRight,
  Home,
  Calendar,
  Headphones,
  User,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "../components/clean-home/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSlider } from "../components/clean-home/HeroSlider";
import { ServiceCard } from "@/components/clean-home/ServiceCard";
import { CalendarCard } from "@/components/CalendarCard";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react"; // Importamos la API de Cal
import { CAL_LINK } from "@/const/const";
import Link from "next/link";

// --- Componente Principal ---
export default function CleanHomePremium() {
  // Inicializamos el widget de Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } }, // Personaliza con tu color
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-24 md:pb-10">
        <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna Izquierda */}
            <div className="lg:col-span-8 space-y-8">
              {/* REEMPLAZO: Aquí está el nuevo Hero Slider dinámico */}
              <HeroSlider />

              {/* Botones de acción rápida (Mobile) */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                <Button
                  data-cal-link={CAL_LINK}
                  className="h-14 text-base rounded-2xl gap-2 shadow-sm active:scale-95 transition-transform"
                >
                  <Sparkles className="h-5 w-5" /> Solicitar
                </Button>

                <Button
                  variant="outline"
                  className="h-14 text-base rounded-2xl gap-2 bg-background shadow-sm active:scale-95 transition-transform"
                  asChild
                >
                  <Link href="/more">
                    <LayoutGrid className="h-5 w-5 text-muted-foreground" />
                    Servicios
                  </Link>
                </Button>
              </div>

              {/* Grid de Servicios Populares */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl text-foreground">
                      Servicios Populares
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Lo más solicitado esta semana
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 gap-1"
                    asChild
                  >
                    <Link href="/more">
                      Ver todos <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {SERVICES.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>
              </section>
            </div>

            {/* Columna Derecha (Sidebar Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              <Card className="bg-primary text-primary-foreground border-none shadow-xl relative overflow-hidden">
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white">PRO</Badge>
                  </div>
                  <h4 className="font-bold text-2xl mb-2">CleanHome Plus</h4>
                  <ul className="space-y-2 mb-6 text-sm text-primary-foreground/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> 20% descuento semanal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Prioridad de reserva
                    </li>
                  </ul>
                  <Button
                    variant="secondary"
                    className="w-full font-bold shadow-sm"
                  >
                    Ver Planes
                  </Button>
                </CardContent>
              </Card>
              {/* CARD DE CALENDARIO ACTUALIZADA */}
              <CalendarCard calLink={CAL_LINK} />
            </aside>
          </div>
        </div>
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-40 pb-safe">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 p-2 ${item.active ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

const SERVICES = [
  {
    id: 1,
    name: "Limpieza Residencial",
    price: 30.0,
    image: "/images/residencial.jpg",
  },
  {
    id: 2,
    name: "Limpieza Profunda",
    price: 55.0,
    image: "/images/profunda.jpg",
  },
  {
    id: 3,
    name: "Desinfección Profesional",
    price: 45.0,
    image: "/images/desinfeccion.jpg",
  },
  {
    id: 4,
    name: "Limpieza de Oficinas",
    price: 40.0,
    image: "/images/oficina-servicio.jpg",
  },
  {
    id: 5,
    name: "Limpieza de Ventanas",
    price: 35.0,
    image: "/images/ventanas.jpg",
  },
  {
    id: 6,
    name: "Limpieza Post-Obra",
    price: 90.0,
    image: "/images/postobra.jpg",
  },
];

const NAV_ITEMS = [
  { icon: Home, label: "Inicio", active: true },
  { icon: Calendar, label: "Mis Citas" },
  { icon: Headphones, label: "Soporte" },
  { icon: User, label: "Perfil" },
];
