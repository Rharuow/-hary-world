"use client";
import React from "react";

import { IVisitant } from "@/app/home/page";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

export const AlertEdit = ({
  visitant,
  handleEdit,
}: {
  visitant: IVisitant;
  handleEdit: (visitant: IVisitant) => void;
}) => {
  const { register } = useForm<
    Pick<IVisitant, "available" | "name" | "type" | "cpf">
  >({
    defaultValues: {
      available: visitant.available,
      name: visitant.name,
      type: visitant.type,
      cpf: visitant.cpf,
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px] bg-secondary">
      <DialogHeader>
        <DialogTitle className="text-secondary-foreground">
          Editando {visitant.name}
        </DialogTitle>
        <DialogDescription className="text-secondary-foreground">
          Edite os dados de {visitant.name} e clique em{" "}
          <span className="text-secondary font-bold">Salvar</span>.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <Input label="Nome" {...register("name")} />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="available" className="text-white font-bold text-sm">
              Ativo
            </label>
            <Switch
              id="available"
              checked={Boolean(visitant.available)}
              {...register("available")}
            />
          </div>
        </div>
        <Input label="Bloqueado" />
        <Input label="Tipo" />
      </div>
      <DialogFooter>
        <Button onClick={() => handleEdit(visitant)}>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  );
};
