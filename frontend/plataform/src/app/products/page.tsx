import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";

import t from "@/i18n.json";

export default function Products() {
  return (
    <div className="flex flex-col px-4 py-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="caf" className="bg-primary">
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
      </Accordion>
    </div>
  );
}
