"use client";
import React, { useEffect, useRef } from "react";

import { IVisitant } from "@/app/home/page";
import {
  DialogClose,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Footprints } from "lucide-react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export const AlertEdit = ({
  visitant,
  handleEdit,
}: {
  visitant: IVisitant;
  handleEdit: (visitant: IVisitant) => void;
}) => {
  const methods = useForm<
    Pick<IVisitant, "available" | "name" | "type" | "cpf" | "cnh">
  >({
    defaultValues: {
      available: visitant.available,
      name: visitant.name,
      type: visitant.type,
      cpf: visitant.cpf,
    },
  });

  useEffect(() => {
    // Listen for keyboard resize events
    window.addEventListener("resize", handleKeyboardResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleKeyboardResize);
    };
  }, []);

  const handleKeyboardResize = () => {
    if (
      document &&
      document.activeElement &&
      document.activeElement.tagName === "INPUT"
    ) {
      // Scroll to the active input element
      document.activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const { register, control } = methods;

  const typeVisitantWatch = useWatch({ control, name: "type" });

  return (
    <DialogContent className="sm:max-w-[425px] bg-secondary rounded-lg">
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
          <Input label="Nome" {...register("name")} autoFocus={false} />
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
                    <SelectItem value="driver" className="flex justify-center">
                      <span className="flex justify-center items-center gap-2">
                        <Car size={16} /> Habilitado
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Input label="CPF" {...register("cpf")} />
          <Input
            label="CNH"
            {...register("cnh")}
            className={cn({
              "animate-pulse": visitant.type === "driver",
            })}
          />
        </form>
      </FormProvider>
      <DialogFooter className="grid grid-cols-2 gap-3">
        <DialogClose asChild>
          <Button
            variant={"outline"}
            className="font-bold focus:bg-primary-dark hover:bg-primary-dark"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          className="text-white font-bold focus:bg-primary-dark focus:text-white hover:bg-primary-dark hover:text-white"
          onClick={() => handleEdit(visitant)}
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
