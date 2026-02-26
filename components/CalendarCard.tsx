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
    <Card className="border-2 border-primary/10 shadow-sm">
      <CardContent className="p-5">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" /> Agenda tu Servicio
        </h4>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-3">
              Sincronizado con Google Calendar
            </p>

            <Button
              data-cal-link={calLink}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-all active:scale-95"
            >
              Programar Cita
            </Button>
          </div>

          <p className="text-[10px] text-center text-muted-foreground italic">
            Confirmación inmediata vía email
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
