"use client";
import React, { useState } from "react";
import {
  Car,
  CheckCircle2,
  Footprints,
  Pen,
  ShieldBan,
  Trash2,
  XCircle,
} from "lucide-react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDelete } from "./alert-delete";
import { IVisitant } from "@/app/home/page";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Empty } from "@/components/empty";
import { AlertEdit } from "./alert-edit";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const visitantsData: Array<IVisitant> = [
  {
    name: "Visitante 1",
    phone: "(00) 00000-0000",
    type: "pedestrian",
    code: "123456",
    available: true,
    cpf: "972.838.690-77",
  },
  {
    name: "Visitante 2",
    phone: "(00) 00000-0000",
    email: "visitant@visitant.com",
    type: "driver",
    code: "123456",
    available: true,
    cpf: "977.320.570-31",
  },
  {
    name: "Visitante 3",
    phone: "(00) 00000-0000",
    type: "driver",
    code: "123456",
    available: false,
    cpf: "293.324.370-92",
  },
  {
    name: "Visitante 4",
    phone: "(00) 00000-0000",
    type: "pedestrian",
    code: "123456",
    available: false,
    cpf: "325.761.990-11",
  },
];

export const VisitantsList = () => {
  const [visitants, setVisitants] = useState(visitantsData);
  const [editVisitantOpen, setEditVisitantOpen] = useState(false);

  const handleDelete = (visitant: IVisitant) => {
    setVisitants((prev) => prev.filter((vis) => vis.name !== visitant.name));
  };

  const handleEdit = (visitant: IVisitant) => {
    setVisitants((prev) =>
      prev.map((vis) => {
        if (vis.name !== visitant.name) return vis;
        return visitant;
      })
    );
    setEditVisitantOpen(false);
  };

  return (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitants.map((visitant, index) => (
                    <TableRow key={index}>
                      <Popover>
                        <TableCell className="font-medium truncate">
                          <PopoverTrigger>{visitant.name}</PopoverTrigger>
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <PopoverTrigger>
                            {visitant.available ? (
                              <CheckCircle2 className="rounded-full flex justify-center bg-green-500" />
                            ) : (
                              <XCircle className="rounded-full flex justify-center bg-destructive" />
                            )}
                          </PopoverTrigger>
                        </TableCell>
                        <TableCell>
                          <PopoverTrigger>
                            {visitant.type === "pedestrian" ? (
                              <Footprints />
                            ) : (
                              <Car />
                            )}
                          </PopoverTrigger>
                        </TableCell>
                        <TableCell>
                          <PopoverTrigger>{visitant.code}</PopoverTrigger>
                        </TableCell>

                        <PopoverContent className="w-auto flex flex-col gap-3">
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <div className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white">
                                <Trash2 size={18} />
                              </div>
                            </AlertDialogTrigger>
                            <AlertDelete
                              visitant={visitant}
                              handleDelete={() => handleDelete(visitant)}
                            />
                          </AlertDialog>

                          <Dialog open={editVisitantOpen}>
                            <DialogTrigger asChild>
                              <div
                                className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white"
                                onClick={() => setEditVisitantOpen(true)}
                              >
                                <Pen size={18} />
                              </div>
                            </DialogTrigger>
                            <AlertEdit
                              visitant={visitant}
                              handleEdit={handleEdit}
                              handleCloseModal={() =>
                                setEditVisitantOpen(false)
                              }
                            />
                          </Dialog>
                          <div className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white">
                            <ShieldBan size={18} />
                          </div>
                        </PopoverContent>
                      </Popover>
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
  );
};
