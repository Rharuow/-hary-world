"use client";
import React, { useState } from "react";
import {
  Car,
  Footprints,
  Pen,
  ShieldBan,
  ShieldCheck,
  ShieldQuestion,
  ShieldX,
  Trash2,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AlertBlock } from "./alert-block";
import { IVisitant, visitantsData } from "@/mock/visitants";

export const VisitantsList = () => {
  const [visitants, setVisitants] = useState(visitantsData);
  const [editVisitantOpen, setEditVisitantOpen] = useState(false);
  const [blockVisitantOpen, setBlockVisitantOpen] = useState(false);

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

  const handleBlock = (visitant: IVisitant) => {
    setVisitants((prev) =>
      prev.map((vis) => {
        if (vis.name !== visitant.name) return vis;
        return visitant;
      })
    );
    setBlockVisitantOpen(false);
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
                          {visitant.available.status === "allowed" ? (
                            <ShieldCheck className="rounded-full flex justify-center text-green-900" />
                          ) : visitant.available.status === "blocked" ? (
                            <HoverCard>
                              <HoverCardTrigger>
                                <ShieldX className="rounded-full flex justify-center text-destructive" />
                              </HoverCardTrigger>
                              <HoverCardContent>
                                {visitant.available.justifications?.[0]}
                              </HoverCardContent>
                            </HoverCard>
                          ) : (
                            <HoverCard>
                              <HoverCardTrigger>
                                <ShieldQuestion className="rounded-full flex justify-center text-yellow-900" />
                              </HoverCardTrigger>
                              <HoverCardContent>
                                {visitant.available.justifications?.[0]}
                              </HoverCardContent>
                            </HoverCard>
                          )}
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
                          <Dialog open={blockVisitantOpen}>
                            <DialogTrigger asChild>
                              <div
                                className="flex items-center gap-2 bg-primary p-2 rounded-lg text-white"
                                onClick={() => {
                                  setBlockVisitantOpen(true);
                                }}
                              >
                                {visitant.available.status === "allowed" ? (
                                  <ShieldBan size={18} />
                                ) : (
                                  <ShieldCheck size={18} />
                                )}
                              </div>
                            </DialogTrigger>
                            <AlertBlock
                              handleBlock={handleBlock}
                              handleCloseModal={() =>
                                setBlockVisitantOpen(false)
                              }
                              visitant={visitant}
                            />
                          </Dialog>
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
