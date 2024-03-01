"use client";
import React, { useEffect, useRef, useState } from "react";

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
import { cpfMask } from "@/utils/mask/cpf";
import { cpfIsValid } from "@/utils/validation/cpf";
import { phoneMask } from "@/utils/mask/phone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(4, { message: "Pelo menos 4 caracteres" }),
  cpf: z.string().length(14, { message: "CPF inválido" }),
  phone: z.string().length(15, { message: "Telefone inválido" }),
  type: z.enum(["driver", "pedestrian"]),
});

type IFormEditVisitant = Pick<
  IVisitant,
  "name" | "type" | "cpf" | "cnh" | "email" | "phone"
>;

export const AlertEdit = ({
  visitant,
  handleEdit,
  handleCloseModal,
}: {
  visitant: IVisitant;
  handleEdit: (visitant: IVisitant) => void;
  handleCloseModal: () => void;
}) => {
  const methods = useForm<IFormEditVisitant>({
    defaultValues: {
      name: visitant.name,
      type: visitant.type,
      email: visitant.email,
      phone: visitant.phone,
      cnh: visitant.cnh,
      cpf: visitant.cpf,
    },
    resolver: zodResolver(schema),
  });

  const [cpfIsInvalid, setCpfIsInvalid] = useState(false);

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

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = methods;

  const typeVisitantWatch = useWatch({ control, name: "type" });

  const onSubmit = (data: IFormEditVisitant) => {
    handleEdit({
      available: visitant.available,
      code: visitant.code,
      cpf: data.cpf,
      name: data.name,
      phone: data.phone,
      cnh: data.cnh,
      type: data.type,
      email: data.email,
    });
  };

  return (
    <DialogContent
      className="sm:max-w-[425px] bg-secondary rounded-lg"
      withoutIcon
    >
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input
              label="Nome"
              {...register("name")}
              autoFocus={false}
              className={cn({
                "border border-red-700": errors && errors.name,
              })}
            />
            {errors && errors.name && (
              <span className="text-xs text-red-400 font-bold">
                {errors.name.message}
              </span>
            )}
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
                  <SelectContent className="flex">
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
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <Input
                label="Telefone"
                inputMode="numeric"
                maxLength={11}
                {...register("phone", {
                  onChange: (event) => {
                    setValue("phone", phoneMask(event.target.value));
                  },
                })}
                className={cn({
                  "border border-red-700": errors && errors.phone,
                })}
              />
              {errors && errors.phone && (
                <span className="text-xs text-red-400 font-bold">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <Input
              label="CPF"
              inputMode="numeric"
              {...register("cpf", {
                onChange: (event) => {
                  setValue("cpf", cpfMask(event.target.value));
                },
                onBlur: (event) => {
                  setCpfIsInvalid(!cpfIsValid(event.target.value));
                },
              })}
              className={cn({
                "border border-red-700": (errors && errors.cpf) || cpfIsInvalid,
              })}
            />
          </div>
          <Input
            label="Email"
            type="email"
            {...register("email")}
            className={cn({
              "border border-red-700": errors && errors.email,
            })}
          />
          {errors && errors.email && (
            <span className="text-xs text-red-400 font-bold">
              {errors.email.message}
            </span>
          )}
          {typeVisitantWatch === "driver" && (
            <Input
              label="CNH"
              inputMode="numeric"
              {...register("cnh")}
              className={cn({
                "animate-pulse": visitant.type === "driver",
              })}
            />
          )}
          <DialogFooter className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button
                variant={"outline"}
                className="font-bold focus:bg-primary-dark hover:bg-primary-dark"
                type="button"
                onClick={() => handleCloseModal()}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="text-white font-bold focus:bg-primary-dark focus:text-white hover:bg-primary-dark hover:text-white"
              type="submit"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
};
