"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CalendarCardProps {
  calLink: string;
}

export function CalendarCard({ calLink }: CalendarCardProps) {
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
    <Card className="border-0 shadow-lg bg-gradient-to-br from-accent to-accent/50 overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-bold text-lg flex items-center gap-2 text-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              Agenda tu Servicio
            </h4>
            <p className="text-sm text-muted-foreground">
              Elige la fecha y hora que mejor te convenga
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur rounded-lg p-4 text-center border border-border">
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              Disponibilidad en tiempo real
            </p>

            <Button
              data-cal-link={calLink}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md font-semibold transition-all active:scale-95"
            >
              Programar Cita
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            ✓ Confirmación inmediata vía email
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
