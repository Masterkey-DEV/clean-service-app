"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, LayoutGrid, CalendarDays, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = ["All", "Residential", "Office", "Commercial"];

const services = [
  {
    id: 1,
    title: "Home Cleaning",
    price: 40,
    description: "Complete sanitization for your living space and kitchen.",
    image: "/images/home-cleaning.jpg",
    category: "Residential",
  },
  {
    id: 2,
    title: "Office Maintenance",
    price: 85,
    description: "Professional workspace hygiene and daily upkeep.",
    image: "/images/office-maintenance.jpg",
    category: "Office",
  },
  {
    id: 3,
    title: "Deep Cleaning",
    price: 120,
    description: "Intensive top-to-bottom scrub for a fresh start.",
    image: "/images/deep-cleaning.jpg",
    category: "Residential",
  },
  {
    id: 4,
    title: "Post-Construction",
    price: 150,
    description: "Specialized debris removal and detailed dusting.",
    image: "/images/post-construction.jpg",
    category: "Commercial",
  },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      {/* Main Content */}
      <main className="flex-1 px-4 pb-24 pt-6">
        {/* Page Title */}
        <h1 className="mb-5 text-2xl font-bold text-foreground text-balance">
          {"Cat\u00e1logo de Servicios"}
        </h1>

        {/* Category Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Service Cards */}
        <div className="flex flex-col gap-4">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="flex flex-row items-stretch overflow-hidden border-0 bg-card shadow-sm"
            >
              {/* Text Content */}
              <div className="flex flex-1 flex-col justify-center gap-2 p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">
                  {"STARTING AT $" + service.price}
                </span>
                <h2 className="text-lg font-bold text-foreground">
                  {service.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <Button className="mt-1 w-fit rounded-full px-6 text-sm font-semibold">
                  Book Now
                </Button>
              </div>

              {/* Image */}
              <div className="relative w-36 shrink-0 sm:w-44">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 144px, 176px"
                />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
