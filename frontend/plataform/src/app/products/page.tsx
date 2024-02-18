"use client";
import Lottie from "lottie-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Image } from "@/components/ui/image";

import building from "@/../public/animation/building.json";

import t from "@/i18n.json";
import { useCookies } from "next-client-cookies";
import { Button } from "@/components/ui/button";

export default function Products() {
  const cookies = useCookies();

  const session = cookies.get("session");

  return (
    <main className="flex flex-col px-4 py-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="caf" className="bg-primary mb-3">
          <AccordionTrigger className="px-3">
            <Image
              alt="caf's logo"
              src="/products/caf-logo.png"
              className="w-24 h-full"
            />
            <p>{t["pt-BR"].products.CAF.title}</p>
          </AccordionTrigger>
          <AccordionContent className="px-3 flex flex-col gap-6">
            <p className="font-semibold text-foreground text-justify">
              {t["pt-BR"].products.CAF.description}
            </p>
            {session && (
              <Button variant="secondary" className="font-semibold">
                {t["pt-BR"].general["See example"]}
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="building" className="bg-primary">
          <AccordionTrigger className="px-3" withIcon={false}>
            <Lottie animationData={building} className="h-[150px]" />
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <p className="text-foreground font-semibold text-center">
              {t["pt-BR"].products.building.description}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
