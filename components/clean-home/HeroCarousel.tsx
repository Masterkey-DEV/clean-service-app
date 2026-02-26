"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 1. Definimos los datos del slide para que sea dinámico como el segundo ejemplo
// He inventado textos basados en tu imagen de limpieza original.
const slides = [
  {
    id: 0,
    image: "/images/hero-cleaning.jpg", // Tu imagen original
    title: (
      <>
        Transformamos tu
        <br />
        espacio,
        <br />
        renovamos tu paz
      </>
    ),
    subtitle: "Expertos en cada detalle",
  },
  {
    id: 1,
    image: "/images/hero-cleaning-2.jpg", // Asegúrate de tener esta imagen o cambiar la ruta
    title: (
      <>
        Limpieza profunda
        <br />
        para un hogar
        <br />
        más saludable
      </>
    ),
    subtitle: "Tecnología de desinfección avanzada",
  },
  {
    id: 2,
    image: "/images/hero-cleaning-3.jpg", // Asegúrate de tener esta imagen o cambiar la ruta
    title: (
      <>
        Tu oficina impecable,
        <br />
        tu equipo
        <br />
        más productivo
      </>
    ),
    subtitle: "Soluciones corporativas a medida",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 2. Lógica del Timer (Autoplay) del segundo componente
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 segundos por slide
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Función para cambiar manualmente y reiniciar el timer
  const handleManualChange = (index: number) => {
    setCurrentSlide(index);
    startTimer();
  };

  return (
    // Mantenemos el wrapper original para no romper estilos
    <div className="px-4 pt-4">
      <div className="relative rounded-2xl overflow-hidden h-44 bg-gray-900 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Imagen con Zoom Suave (Efecto del componente 2) */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
              className="relative h-full w-full"
            >
              <Image
                src={slides[currentSlide].image}
                alt="Servicio de limpieza"
                fill
                className="object-cover"
                priority
              />
              {/* Gradiente original mantenido */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            </motion.div>

            {/* Contenido de Texto con Animación de entrada */}
            <div className="absolute bottom-4 left-4 text-white z-10">
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg font-bold leading-tight text-balance"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xs text-white/80 mt-1"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación (Dots) - Estilo visual original, lógica nueva */}
      <div className="flex justify-center gap-1.5 mt-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleManualChange(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-4 bg-primary" // Asume que tienes configurado 'bg-primary' en Tailwind
                : "w-1.5 bg-muted-foreground/30 hover:bg-primary/50"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
