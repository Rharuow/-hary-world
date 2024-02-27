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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <DialogContent className="sm:max-w-[425px] bg-primary">
      <DialogHeader>
        <DialogTitle className="text-primary-foreground">
          Editando {visitant.name}
        </DialogTitle>
        <DialogDescription className="text-primary-foreground">
          Edite os dados de {visitant.name} e clique em{" "}
          <span className="text-primary font-bold">Salvar</span>.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <Input label="Nome" {...register("name")} />
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="available" className="text-white font-bold text-sm">
              Ativo
            </label>
            <Switch
              id="available"
              checked={Boolean(visitant.available)}
              {...register("available")}
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant={"secondary"} onClick={() => handleEdit(visitant)}>
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
