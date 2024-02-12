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

export default function Products() {
  return (
    <div className="flex flex-col px-4 py-6">
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
          <AccordionContent className="px-3">
            <p className="font-semibold text-foreground text-justify">
              {t["pt-BR"].products.CAF.description}
            </p>
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
    </div>
  );
}
