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
    <section className="relative rounded-3xl overflow-hidden h-56 md:h-100 shadow-lg bg-slate-900 group">
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
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8 }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].image}
              alt="Servicio de limpieza"
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />
          </motion.div>

          {/* Contenido Animado */}
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end md:justify-center text-white z-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl"
            >
              <Badge className="mb-3 bg-primary/90 text-primary-foreground border-none">
                {SLIDES[current].badge}
              </Badge>
              <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-2 md:mb-4">
                {SLIDES[current].title}
              </h2>
              <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6 max-w-md hidden sm:block">
                {SLIDES[current].description}
              </p>
              <Button className="rounded-full px-6 group/btn" size="lg">
                {SLIDES[current].cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores (Dots) */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// --- Datos del Carrusel ---
const SLIDES = [
  {
    id: 1,
    badge: "Nuevo Servicio",
    title: (
      <>
        Tu hogar impecable,
        <br className="hidden md:block" /> tu mente tranquila.
      </>
    ),
    description:
      "Descubre la experiencia CleanHome Premium. Experiencia certificada en cada detalle.",
    image: "/images/hogar.jpg",
    cta: "Reservar Ahora",
  },
  {
    id: 2,
    badge: "Promoción",
    title: (
      <>
        Desinfección Profunda
        <br className="hidden md:block" /> para tu bienestar.
      </>
    ),
    description: "Eliminamos el 99% de bacterias con productos eco-friendly.",
    image: "/images/desinfeccion.jpg",
    cta: "Saber más",
  },
  {
    id: 3,
    badge: "Empresas",
    title: (
      <>
        Oficinas que inspiran
        <br className="hidden md:block" /> productividad.
      </>
    ),
    description:
      "Planes corporativos diseñados para mantener tu ambiente laboral perfecto.",
    image: "/images/oficinas.jpg",
    cta: "Cotizar ahora",
  },
];
