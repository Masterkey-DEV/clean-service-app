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
  ArrowRight,
} from "lucide-react";
import { Badge } from "../components/clean-home/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSlider } from "../components/clean-home/HeroSlider";
import { ServiceCard } from "@/components/clean-home/ServiceCard";
import { CalendarCard } from "@/components/CalendarCard";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_LINK } from "@/const/const";
import Link from "next/link";

export default function CleanHomePremium() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-24 md:pb-10">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna Izquierda */}
            <div className="lg:col-span-8 space-y-8">
              {/* Hero Slider */}
              <HeroSlider />

              {/* CTA Buttons - Mobile */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                <Button
                  data-cal-link={CAL_LINK}
                  className="h-14 text-base rounded-xl gap-2 shadow-md font-semibold transition-all hover:shadow-lg active:scale-95"
                >
                  <Sparkles className="h-5 w-5" /> Solicitar
                </Button>

                <Button
                  variant="outline"
                  className="h-14 text-base rounded-xl gap-2 shadow-md font-semibold"
                  asChild
                >
                  <Link href="/more">
                    <LayoutGrid className="h-5 w-5" />
                    Servicios
                  </Link>
                </Button>
              </div>

              {/* Servicios Populares */}
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Servicios Populares
                  </h2>
                  <p className="text-base text-muted-foreground">
                    Descubre nuestros servicios más solicitados
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {SERVICES.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Button
                    variant="ghost"
                    className="gap-2 text-primary hover:bg-accent/10"
                    asChild
                  >
                    <Link href="/more">
                      Ver todos los servicios <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </section>
            </div>

            {/* Sidebar Desktop */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              {/* Premium Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white/20 text-white border-0">PREMIUM</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">CleanHome Plus</h3>
                  <p className="text-sm text-white/80 mb-6">
                    Disfruta de beneficios exclusivos
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      20% descuento en todos los servicios
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      Prioridad en reservas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      Soporte 24/7 dedicado
                    </li>
                  </ul>
                  <Button
                    variant="secondary"
                    className="w-full font-bold shadow-md"
                  >
                    Activar Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Calendar Card */}
              <CalendarCard calLink={CAL_LINK} />
            </aside>
          </div>
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border z-40">
        <div className="flex items-center justify-around py-3 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                item.active 
                  ? "text-primary bg-accent/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
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
