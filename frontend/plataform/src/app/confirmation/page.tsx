"use client";
import Lottie from "lottie-react";

import { Card } from "@/components/ui/card";

import t from "@/i18n.json";

import congratulations from "@/../public/animation/congratulations.json";

export default function Confirmation() {
  return (
    <main className="px-6">
      <Card className="px-3 py-3 mt-8 bg-primary flex flex-col gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <p className="text-foreground text-lg text-center font-bold">
          {t["pt-BR"].confirmation.Congratulations}
        </p>
        <Lottie animationData={congratulations} size={256} />
        <p className="text-foreground text-center font-bold">
          {t["pt-BR"].confirmation["Your account has been activated."]}
        </p>
      </Card>
    </main>
  );
}
