"use client";
import Lottie from "lottie-react";
import { Card } from "@/components/ui/card";

import t from "@/i18n.json";

import { useSearchParams } from "next/navigation";
import { useConfirmationUser } from "@/hooks/confirmationUser/useQuery";

import congratulations from "@/../public/animation/congratulations.json";
import errorAnimation from "@/../public/animation/error.json";

export default function Confirmation() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { error } = useConfirmationUser(String(token));

  return (
    <main className="px-6">
      <Card className="px-3 py-3 mt-8 bg-primary flex flex-col gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <p className="text-foreground text-lg text-center font-bold">
          {error
            ? t["pt-BR"].confirmation.error["Opss..."]
            : t["pt-BR"].confirmation.Congratulations}
        </p>
        <Lottie animationData={error ? errorAnimation : congratulations} />
        <p className="text-foreground text-center font-semibold">
          {error
            ? t["pt-BR"].confirmation.error["Something is wrong"]
            : t["pt-BR"].confirmation["Your account has been activated."]}
        </p>
      </Card>
    </main>
  );
}
