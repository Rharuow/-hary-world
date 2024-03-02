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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  justification: z
    .string()
    .min(5, { message: "Pelo menos 5 caracteres" })
    .max(180, { message: "Máximo de 180 caracteres" }),
});

interface IForm {
  justification: string;
}

export const AlertBlock = ({
  visitant,
  handleBlock,
}: {
  visitant: IVisitant;
  handleBlock: (visitant: IVisitant) => void;
}) => {
  const methods = useForm<IForm>({ resolver: zodResolver(schema) });

  const onSubmit = (data: IForm) => {
    handleBlock({ ...visitant });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Bloquear
          <span className="font-bold text-primary">{visitant?.name}</span>?
        </AlertDialogTitle>
        <AlertDialogDescription>
          <form></form>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          className="bg-destructive text-white"
          onClick={() => handleBlock(visitant)}
        >
          Deletar
        </AlertDialogAction>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
