import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types";
import { ArrowRight } from "lucide-react";

export const ServiceCard = ({ name, price, image }: Service) => {
  const formatPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="group relative overflow-hidden h-64 md:h-72 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer">
      <CardContent className="p-0 h-full w-full relative">
        {/* Imagen de fondo */}
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-125"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay Gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

        {/* Contenido de texto posicionado sobre la imagen */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
          {/* Top accent */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/80 text-primary-foreground text-xs font-semibold">
              Popular
            </div>
          </div>

          {/* Bottom content */}
          <div>
            <h4 className="font-bold text-lg md:text-xl leading-tight mb-2">
              {name}
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-white/90 text-sm md:text-base font-semibold">
                {formatPrice}
              </p>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
