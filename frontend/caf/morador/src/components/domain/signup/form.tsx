"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    phone: z.string().length(13, { message: "Telefone inválido" }),
    square: z.string().min(1, { message: "Quadra inválida" }),
    house: z.string().min(1, { message: "Casa inválida" }),
    password: z.string().length(6, { message: "Pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .length(6, { message: "Pelo menos 6 caracteres" }),
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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ISignUpForm) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <form
      className="flex flex-col gap-4 z-10"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          {...register("cpf")}
          className={cn({
            "border border-red-700": errors && errors.email,
          })}
        />
        {errors && errors.cpf && (
          <span className="text-xs text-red-400 font-bold">
            {errors.cpf.message}
          </span>
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
          {...register("phone")}
          className={cn({
            "border border-red-700": errors && errors.email,
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
              "border border-red-700": errors && errors.email,
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
              "border border-red-700": errors && errors.email,
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
          type="password"
          {...register("password")}
          className={cn({
            "border border-red-700": errors && errors.email,
          })}
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
          type="password"
          {...register("confirmPassword")}
          className={cn({
            "border border-red-700": errors && errors.email,
          })}
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
  );
};
