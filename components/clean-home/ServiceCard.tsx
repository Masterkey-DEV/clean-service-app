import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types";

export const ServiceCard = ({ name, price, image }: Service) => {
  const formatPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="group relative overflow-hidden h-64 md:h-80 border-none shadow-lg transition-transform duration-300 hover:scale-[1.02]">
      <CardContent className="p-0 h-full w-full">
        {/* Imagen de fondo */}
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay Gradiente para legibilidad */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        {/* Contenido de texto posicionado sobre la imagen */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
          <h4 className="font-bold text-lg md:text-xl leading-tight mb-1">
            {name}
          </h4>
          <p className="text-white/80 text-sm md:text-base font-semibold">
            Desde {formatPrice}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
