"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { IVisitant } from "@/app/home/page";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  justifications: z
    .array(z.string())
    .refine((justifications) => justifications.length > 0, {
      message: "Uma justificativa é obrigatória.",
    }),
});

interface IForm {
  justifications: Array<string>;
  customReason: string;
}

export const AlertBlock = ({
  visitant,
  handleBlock,
  handleCloseModal,
}: {
  visitant: IVisitant;
  handleCloseModal: () => void;
  handleBlock: (visitant: IVisitant) => void;
}) => {
  const methods = useForm<IForm>({ resolver: zodResolver(schema) });

  const onSubmit = (data: IForm) => {
    handleBlock({ ...visitant });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <DialogContent
      className="sm:max-w-[425px] bg-secondary rounded-lg"
      withoutIcon
    >
      <DialogHeader>
        <DialogTitle className="text-secondary-foreground mb-2">
          Acesso de {visitant.name}
        </DialogTitle>
        <DialogDescription className="text-secondary-foreground">
          {visitant.available.status === "allowed" ? (
            `Informe a justificativa do bloqueio de ${visitant.name}.`
          ) : visitant.available.justifications ? (
            <span className="flex flex-col gap-2">
              O {visitant.name} foi bloqueado por:
              {visitant.available.justifications.map((just, index) => (
                <li key={index} className="font-semibold">
                  {just}
                </li>
              ))}
            </span>
          ) : (
            `Não foi informado o motivo do bloqueio do ${visitant.name}.`
          )}
        </DialogDescription>
      </DialogHeader>
      {visitant.available.status === "allowed" ? (
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <Textarea {...register("customReason")} label="Justificativa" />
              {errors.justifications && (
                <span className="text-xs text-red-700 font-bold">
                  Pelo menos uma justificativa é obrigatória.
                </span>
              )}
            </div>
            <DialogFooter
              className={cn("grid grid-cols-1 gap-3", {
                "grid-cols-2": visitant.available.status === "allowed",
              })}
            >
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  className="font-bold focus:bg-primary-dark hover:bg-primary-dark w-full"
                  type="button"
                  onClick={() => handleCloseModal()}
                >
                  {visitant.available.status === "allowed" ? "Cancelar" : "OK"}
                </Button>
              </DialogClose>
              {visitant.available.status === "allowed" && (
                <Button
                  className="text-white font-bold focus:bg-primary-dark focus:text-white hover:bg-primary-dark hover:text-white"
                  type="submit"
                >
                  Salvar
                </Button>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      ) : (
        <DialogClose asChild>
          <Button
            variant={"outline"}
            className="font-bold focus:bg-primary-dark hover:bg-primary-dark w-full"
            type="button"
            onClick={() => handleCloseModal()}
          >
            Cancelar
          </Button>
        </DialogClose>
      )}
    </DialogContent>
  );
};
