"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { cpfMask } from "@/utils/mask/cpf";
import { phoneMask } from "@/utils/mask/phone";
import { cpfIsValid } from "@/utils/validation/cpf";
import { zodResolver } from "@hookform/resolvers/zod";

interface ISignUpForm {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  square: string;
  house: string;
  password: string;
  confirmPassword: string;
}

const schema = z
  .object({
    name: z.string().min(4, { message: "Pelo menos 4 caracteres" }),
    cpf: z.string().length(14, { message: "CPF inválido" }),
    email: z.string().email("Email inválido"),
    phone: z.string().length(15, { message: "Telefone inválido" }),
    square: z.string().min(1, { message: "Quadra inválida" }),
    house: z.string().min(1, { message: "Casa inválida" }),
    password: z.string().min(6, { message: "Pelo menos 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Pelo menos 6 caracteres" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Senha não conferem",
      path: ["confirmPassword"],
    }
  );

export const FormSignup = () => {
  const methods = useForm<ISignUpForm>({
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = methods;

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [cpfIsInvalid, setCpfIsInvalid] = useState(false);
  const [passworType, setPassworType] = useState<"password" | "text">(
    "password"
  );
  const [confirmPassworType, setConfirmPassworType] = useState<
    "password" | "text"
  >("password");

  const onSubmit = (data: ISignUpForm) => {
    console.log(data);
    setOpenDialog(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 z-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AlertDialog open={openDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Seu cadastro foi enviado com sucesso!
              </AlertDialogTitle>
              <AlertDialogDescription>
                A administração irá liberar seu acesso ao aplicativo em breve.
                Fique atento ao contato da administração.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setOpenDialog(false);
                  router.replace("/");
                }}
              >
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex flex-col gap-1">
          <Input
            label="Nome completo"
            {...register("name")}
            className={cn({
              "border border-red-700": errors && errors.email,
            })}
          />
          {errors && errors.name && (
            <span className="text-xs text-red-400 font-bold">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="CPF"
            inputMode="numeric"
            {...register("cpf", {
              onChange: (event) => setValue("cpf", cpfMask(event.target.value)),
              onBlur: (event) =>
                setCpfIsInvalid(!cpfIsValid(event.target.value)),
            })}
            className={cn({
              "border border-red-700": (errors && errors.cpf) || cpfIsInvalid,
            })}
          />
          {errors && errors.cpf ? (
            <span className="text-xs text-red-400 font-bold">
              {errors.cpf.message}
            </span>
          ) : (
            cpfIsInvalid && (
              <span className="text-xs text-red-400 font-bold">
                Números inválidos
              </span>
            )
          )}
        </div>
        <div className="flex flex-col gap-1">
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
        </div>
        <div className="flex flex-col gap-1">
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
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Input
              label="Bloco"
              {...register("square")}
              className={cn({
                "border border-red-700": errors && errors.square,
              })}
            />
            {errors && errors.square && (
              <span className="text-xs text-red-400 font-bold">
                {errors.square.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              label="Casa"
              {...register("house")}
              className={cn({
                "border border-red-700": errors && errors.house,
              })}
            />
            {errors && errors.house && (
              <span className="text-xs text-red-400 font-bold">
                {errors.house.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Senha"
            type={passworType}
            {...register("password")}
            className={cn({
              "border border-red-700": errors && errors.password,
            })}
            Icon={() => (passworType === "password" ? <Eye /> : <EyeOff />)}
            iconAction={() => {
              setPassworType((prev) =>
                prev === "password" ? "text" : "password"
              );
            }}
          />
          {errors && errors.password && (
            <span className="text-xs text-red-400 font-bold">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Confirme a senha"
            type={confirmPassworType}
            {...register("confirmPassword")}
            className={cn({
              "border border-red-700": errors && errors.confirmPassword,
            })}
            Icon={() =>
              confirmPassworType === "password" ? <Eye /> : <EyeOff />
            }
            iconAction={() => {
              setConfirmPassworType((prev) =>
                prev === "password" ? "text" : "password"
              );
            }}
          />
          {errors && errors.confirmPassword && (
            <span className="text-xs text-red-400 font-bold">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          variant={"secondary"}
          className="text-secondary-foreground font-bold focus:bg-secondary-dark focus:text-white hover:bg-secondary-dark hover:text-white"
        >
          Enviar Cadastro
        </Button>
      </form>
    </FormProvider>
  );
};
