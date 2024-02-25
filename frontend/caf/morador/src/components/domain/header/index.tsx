import React from "react";
import { cookies } from "next/headers";

import { Image } from "../../ui/image";
import { Sheet, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { AlignJustify } from "lucide-react";
import { MenuContent } from "./sheet-content";
import { redirect } from "next/navigation";

export const Header = () => {
  const session = cookies().get("session");

  if (!session) return redirect("/");

  const user = JSON.parse(String(session.value));

  return (
    <div className="p-4 flex justify-between bg-secondary rounded-b-2xl">
      <Image alt="logo" src="/products/caf-logo.png" className="w-14" />

      <div className="flex gap-1 items-center justify-center grow">
        <p className="text-foreground text-sm font-bold">{user.name}</p>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link">
            <AlignJustify />
          </Button>
        </SheetTrigger>
        <MenuContent />
      </Sheet>
    </div>
  );
};
