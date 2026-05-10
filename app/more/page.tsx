"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Residencial", "Oficina", "Comercial"];

const services = [
  {
    id: 1,
    title: "Limpieza Residencial",
    price: 30,
    description: "Sanitización completa de tu hogar, salas y cocina.",
    image: "/images/residencial.jpg",
    category: "Residencial",
  },
  {
    id: 2,
    title: "Limpieza de Oficinas",
    price: 40,
    description: "Higiene profesional de espacios de trabajo.",
    image: "/images/oficina-servicio.jpg",
    category: "Oficina",
  },
  {
    id: 3,
    title: "Limpieza Profunda",
    price: 55,
    description: "Scrub intensivo de arriba a abajo para un resultado impecable.",
    image: "/images/profunda.jpg",
    category: "Residencial",
  },
  {
    id: 4,
    title: "Desinfección Profesional",
    price: 45,
    description: "Desinfección especializada con eliminación de bacterias.",
    image: "/images/desinfeccion.jpg",
    category: "Comercial",
  },
  {
    id: 5,
    title: "Limpieza Post-Obra",
    price: 90,
    description: "Remoción de escombros y limpieza detallada post-construcción.",
    image: "/images/postobra.jpg",
    category: "Comercial",
  },
  {
    id: 6,
    title: "Limpieza de Ventanas",
    price: 35,
    description: "Servicio especializado en ventanas y cristalería.",
    image: "/images/ventanas.jpg",
    category: "Residencial",
  },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "Todos" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 px-4 pb-24 pt-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-primary/10 text-primary border-0">
                Catálogo Completo
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Todos Nuestros Servicios
            </h1>
            <p className="text-lg text-muted-foreground">
              Descubre nuestro catálogo completo de servicios de limpieza profesional
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-lg border-border bg-card"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:bg-accent/10",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Service Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-0 bg-card shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-foreground/5">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0">
                        {service.category}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
                      <div className="space-y-2 mb-4">
                        <h3 className="text-lg font-bold text-foreground">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl font-bold text-primary">
                          ${service.price}
                        </span>
                        <Button 
                          size="sm" 
                          className="gap-2 rounded-lg"
                          data-cal-link="masterkey-dev/clean-service"
                        >
                          Reservar
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No se encontraron servicios que coincidan con tu búsqueda
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
