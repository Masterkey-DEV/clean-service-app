"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// --- Sub-componente del Carrusel ---
export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 8000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    startTimer();
  };

  return (
    <div className="w-full space-y-4">
      <section className="relative rounded-2xl overflow-hidden h-56 md:h-80 shadow-xl bg-foreground/10 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative h-full w-full"
          >
            {/* Imagen con Efecto Zoom */}
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[current].image}
                alt="Servicio de limpieza"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
            </motion.div>

            {/* Contenido Animado */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-3"
              >
                <Badge className="w-fit bg-primary/90 text-primary-foreground border-none">
                  {SLIDES[current].badge}
                </Badge>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  {SLIDES[current].title}
                </h2>
                <p className="text-sm md:text-base text-white/85 max-w-xl hidden sm:block">
                  {SLIDES[current].description}
                </p>
                <div className="pt-2">
                  <Button 
                    size="lg" 
                    className="gap-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {SLIDES[current].cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Indicadores mejorados */}
      <div className="flex justify-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-border hover:bg-primary/40"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Datos del Carrusel ---
const SLIDES = [
  {
    id: 1,
    badge: "Servicio Premium",
    title: "Tu hogar limpio, tu paz asegurada",
    description:
      "Servicio de limpieza residencial profesional con los mejores estándares de calidad.",
    image: "/images/hero-cleaning.jpg",
    cta: "Reservar Ahora",
  },
  {
    id: 2,
    badge: "Desinfección",
    title: "Limpieza profunda con tecnología avanzada",
    description: "Eliminamos el 99.9% de bacterias y virus con productos certificados.",
    image: "/images/profunda.jpg",
    cta: "Solicitar Servicio",
  },
  {
    id: 3,
    badge: "Corporativo",
    title: "Oficinas impecables, equipo productivo",
    description:
      "Soluciones corporativas profesionales diseñadas para tu empresa.",
    image: "/images/oficina-servicio.jpg",
    cta: "Cotizar Ahora",
  },
];
