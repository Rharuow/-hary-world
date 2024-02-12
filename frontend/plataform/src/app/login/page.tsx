"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import t from "@/i18n.json";

const logingFormSchema = z.object({
  email: z
    .string()
    .email({ message: t["pt-BR"].login.error["It's not a email format."] })
    .min(1, { message: t["pt-BR"].login.error["This field is required."] }),
  password: z
    .string()
    .min(1, { message: t["pt-BR"].login.error["This field is required."] }),
});

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(logingFormSchema),
  });

  const onSubmit = (data: ILoginForm) => {
    console.log("data = ", data);
  };

  return (
    <main className="px-6">
      <Card className="px-3 py-5 mt-8 bg-primary flex flex-col gap-6">
        <p className="text-foreground text-lg text-center font-bold">
          {t["pt-BR"].login.Login}
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{t["pt-BR"].login.Email}</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder={t["pt-BR"].login["Type your email"]}
            />
            {errors.email && errors.email.message && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{t["pt-BR"].login.Password}</Label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder={t["pt-BR"].login["Type your password"]}
            />
            {errors.password && errors.password.message && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button>{t["pt-BR"].login.Enter}</Button>
        </form>
      </Card>
    </main>
  );
}
