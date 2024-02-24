"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface ILoginForm {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório" })
    .email("Este é um email inválido."),
  password: z
    .string({ required_error: "A senha é obrigatório" })
    .min(6, { message: "Pelo menos 6 caracteres" }),
});

export const FormLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(schema),
  });
  const [passworType, setPassworType] = useState<"password" | "text">(
    "password"
  );

  const onSubmit = (data: ILoginForm) => {
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
          label="Email"
          {...register("email")}
          type="email"
          className={cn({
            "border border-red-700": errors && errors.email,
          })}
        />
        {errors && errors.email && (
          <span className="text-xs text-red-700 font-bold">
            {errors.email.message}
          </span>
        )}
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
          <span className="text-xs text-red-700 font-bold">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        variant="secondary"
        className="text-secondary-foreground font-bold focus:bg-secondary-dark focus:text-white hover:bg-secondary-dark hover:text-white"
      >
        Entrar
      </Button>
    </form>
  );
};
