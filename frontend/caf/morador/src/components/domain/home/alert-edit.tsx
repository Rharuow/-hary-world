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
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Footprints } from "lucide-react";
import { SelectGroup } from "@radix-ui/react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export const AlertEdit = ({
  visitant,
  handleEdit,
}: {
  visitant: IVisitant;
  handleEdit: (visitant: IVisitant) => void;
}) => {
  const methods = useForm<
    Pick<IVisitant, "available" | "name" | "type" | "cpf">
  >({
    defaultValues: {
      available: visitant.available,
      name: visitant.name,
      type: visitant.type,
      cpf: visitant.cpf,
    },
  });

  const { register, control, setValue } = methods;

  const availableWatch = useWatch({ control, name: "available" });

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
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4">
          <Input label="Nome" {...register("name")} />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-center items-center gap-3">
              <label
                htmlFor="available"
                className="text-white font-bold text-sm"
              >
                Ativo
              </label>
              <Switch
                id="available"
                checked={availableWatch}
                onClick={() => setValue("available", !availableWatch)}
                {...register("available")}
              />
            </div>

            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="flex gap-1">
                      <SelectItem
                        value="pedestrian"
                        className="flex justify-center"
                      >
                        <span className="flex justify-center items-center gap-2">
                          <Footprints size={16} /> Pedestre
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="driver"
                        className="flex justify-center"
                      >
                        <span className="flex justify-center items-center gap-2">
                          <Car size={16} /> Habilitado
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </form>
      </FormProvider>
      <DialogFooter>
        <Button
          className="text-primary-foreground font-bold focus:bg-primary-dark focus:text-white hover:bg-primary-dark hover:text-white"
          onClick={() => handleEdit(visitant)}
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
