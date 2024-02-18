"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import t from "@/i18n.json";
import { useToast } from "@/components/ui/use-toast";
import { plataformApi } from "@/service/plataform";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useFindRoleByName } from "@/hooks/role/useFindRoleByName";

const signupgFormSchema = z.object({
  email: z
    .string()
    .email({ message: t["pt-BR"].signup.error["It's not a email format."] })
    .min(1, { message: t["pt-BR"].signup.error["This field is required."] }),
  password: z
    .string()
    .min(1, { message: t["pt-BR"].signup.error["This field is required."] }),
  name: z
    .string()
    .min(1, { message: t["pt-BR"].signup.error["This field is required."] }),
});

interface ISignUpForm {
  email: string;
  name: string;
  password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(signupgFormSchema),
  });

  const { data: role } = useFindRoleByName("CLIENT");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async (data: ISignUpForm) => {
    setLoading(true);
    try {
      await plataformApi.post("users/clients/signup", {
        ...data,
        roleId: role?.data.id,
      });
      toast({
        title: t["pt-BR"].signup["Verify your email"],
        description:
          t["pt-BR"].signup["We sent a email to your confirm your account"],
        action: (
          <ToastAction
            altText="ok"
            onClick={() => {
              router.replace("/");
            }}
          >
            Ok
          </ToastAction>
        ),
      });
      router.replace("/");
    } catch (error) {
      toast({
        title: t["pt-BR"].signup.error["Opss..."],
        description:
          t["pt-BR"].signup.error["Something is wrong, try again later."],
        variant: "destructive",
      });
    }
  };

  return (
    <main className="px-6">
      <Card className="px-3 py-5 mt-8 bg-primary flex flex-col gap-6">
        {loading ? (
          <Skeleton className="w-28 self-center h-4" />
        ) : (
          <p className="text-foreground text-lg text-center font-bold">
            {t["pt-BR"].signup["Sign up"]}
          </p>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            {loading ? (
              <Skeleton className="h-3" />
            ) : (
              <Label htmlFor="email">{t["pt-BR"].signup.Email}</Label>
            )}
            {loading ? (
              <Skeleton className="h-10" />
            ) : (
              <Input
                id="email"
                {...register("email")}
                placeholder={t["pt-BR"].signup["Type your email"]}
              />
            )}
            {errors.email && errors.email.message && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {loading ? (
              <Skeleton className="h-3" />
            ) : (
              <Label htmlFor="name">{t["pt-BR"].signup.Name}</Label>
            )}
            {loading ? (
              <Skeleton className="h-10" />
            ) : (
              <Input
                id="name"
                {...register("name")}
                placeholder={t["pt-BR"].signup["Type your name"]}
              />
            )}
            {errors.name && errors.name.message && (
              <span className="text-red-400 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {loading ? (
              <Skeleton className="h-3" />
            ) : (
              <Label htmlFor="password">{t["pt-BR"].signup.Password}</Label>
            )}
            {loading ? (
              <Skeleton className="h-10" />
            ) : (
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder={t["pt-BR"].signup["Type your password"]}
              />
            )}
            {errors.password && errors.password.message && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button variant="secondary" disabled={loading}>
            {t["pt-BR"].signup.Create}
          </Button>
        </form>
      </Card>
    </main>
  );
}
