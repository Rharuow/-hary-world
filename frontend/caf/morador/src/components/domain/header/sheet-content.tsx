"use client";
import { LogOut } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Image } from "@/components/ui/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const MenuContent = () => {
  const router = useRouter();

  const session = getCookie("session");
  const user = session && JSON.parse(String(session));

  return (
    <SheetContent className="bg-secondary flex flex-wrap">
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {user?.image && (
            <Image
              alt="avatar"
              src={user?.image}
              className="w-14 rounded-full self-center"
            />
          )}
          <p
            className={cn("text-center font-bold text-white", {
              "text-sm": user?.image,
            })}
          >
            {user?.email}
          </p>
        </div>
        <p className="text-white">Editar perfil</p>
        <p className="text-white">Minhas entregas</p>
        <Separator />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="visitant">
            <AccordionTrigger className="text-white">
              Visitante
            </AccordionTrigger>
            <AccordionContent className="text-white ps-4 flex flex-col gap-2">
              <Link href={"#"}>Adicionar</Link>
              <Link href={"#"}>Listar</Link>
              <Link href={"#"}>Histórico</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="booking">
            <AccordionTrigger className="text-white">Reservas</AccordionTrigger>
            <AccordionContent className="text-white ps-4 flex flex-col gap-2">
              <Link href={"#"}>Adicionar</Link>
              <Link href={"#"}>Listar</Link>
              <Link href={"#"}>Histórico</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="resident">
            <AccordionTrigger className="text-white">Morador</AccordionTrigger>
            <AccordionContent className="text-white ps-4 flex flex-col gap-2">
              <Link href={"#"}>Adicionar</Link>
              <Link href={"#"}>Listar</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <SheetClose asChild className="w-full self-end">
        <Button
          variant={"link"}
          className="justify-start gap-3 w-auto text-red-700"
          onClick={() => {
            deleteCookie("session");
            router.replace("/");
          }}
        >
          <LogOut size={16} />
          <p>Sair da conta</p>
        </Button>
      </SheetClose>
    </SheetContent>
  );
};
