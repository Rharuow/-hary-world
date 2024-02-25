import React from "react";
import {
  Car,
  CheckCircle2,
  Footprints,
  MoreVertical,
  XCircle,
} from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-primary text-center">
                          Nome
                        </TableHead>
                        <TableHead className="text-primary text-center">
                          Status
                        </TableHead>
                        <TableHead className="text-primary text-center">
                          Tipo
                        </TableHead>
                        <TableHead className="text-primary text-center">
                          Código
                        </TableHead>
                        <TableHead className="text-primary text-center">
                          Ação
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visitants.map((visitant, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium truncate">
                            {visitant.name}
                          </TableCell>
                          <TableCell className="flex justify-center">
                            {visitant.available ? (
                              <CheckCircle2 className="rounded-full flex justify-center bg-green-500" />
                            ) : (
                              <XCircle className="rounded-full flex justify-center bg-destructive" />
                            )}
                          </TableCell>
                          <TableCell>
                            {visitant.type === "pedestrian" ? (
                              <Footprints />
                            ) : (
                              <Car />
                            )}
                          </TableCell>
                          <TableCell>{visitant.code}</TableCell>
                          <TableCell className="text-center">
                            <MoreVertical />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
