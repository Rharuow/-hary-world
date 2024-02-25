import React from "react";

import { Header } from "@/components/domain/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Empty } from "@/components/empty";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  let visitants = [
    {
      name: "Visitante 1",
      type: "pedestrian",
      code: "123456",
      available: true,
    },
    {
      name: "Visitante 2",
      type: "driver",
      code: "123456",
      available: true,
    },
    {
      name: "Visitante 3",
      type: "driver",
      code: "123456",
      available: false,
    },
    {
      name: "Visitante 4",
      type: "pedestrian",
      code: "123456",
      available: false,
    },
  ];

  return (
    <main className="min-h-svh relative bg-primary from-secondary to-primary flex flex-col gap-8">
      <Header />

      <div className="flex flex-col px-3 z-10">
        <Card className="p-3 bg-secondary">
          {/* <Skeleton className="h-10" /> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="visitants">
              <AccordionTrigger>Visitantes</AccordionTrigger>
              <AccordionContent>
                {visitants.length > 0 ? (
                  <></>
                ) : (
                  <Empty text="Nenhum visitante cadastrado!" />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute bottom-0 left-0 w-52"
      />
    </main>
  );
}
