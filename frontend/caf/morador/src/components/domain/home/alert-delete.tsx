"use client";
import React from "react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IVisitant } from "@/app/home/page";

export const AlertDelete = ({
  visitant,
  handleDelete,
}: {
  visitant: IVisitant;
  handleDelete: (visitant: IVisitant) => void;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você vai a deletar{" "}
          <span className="font-bold text-primary">{visitant?.name}</span>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          className="bg-destructive text-white"
          onClick={() => handleDelete(visitant)}
        >
          Deletar
        </AlertDialogAction>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
