"use client";
import { AlignJustify, Boxes, Home } from "lucide-react";

import { Image } from "@/components/ui/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import t from "@/i18n.json";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="bg-primary-dark px-6 py-3 rounded-b-lg shadow flex items-center sticky top-0 z-10">
      <Image alt="logo" src="/logo.png" className="h-8 w-auto" />
      <div className="flex flex-col grow">
        <p className="text-center text-foreground font-semibold">Hary World</p>
        <p className="text-center text-foreground font-semibold text-xs">
          {t["pt-BR"].header["Web Development"]}
        </p>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify size={28} />
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-3 py-8">
            <SheetClose asChild>
              <Link
                href="/"
                className={cn("flex gap-2 p-2 rounded-lg", {
                  "bg-primary": pathname === "/",
                })}
              >
                <Home className="text-foreground" />
                <p className="text-foreground">{t["pt-BR"].header.menu.Home}</p>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/products"
                className={cn("flex gap-2 p-2 rounded-lg", {
                  "bg-primary": pathname === "/products",
                })}
              >
                <Boxes className="text-foreground" />
                <p className="text-foreground">
                  {t["pt-BR"].header.menu.Products}
                </p>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
