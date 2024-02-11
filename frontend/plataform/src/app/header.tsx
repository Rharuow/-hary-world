import { Image } from "@/components/ui/image";

import { AlignJustify } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-primary-dark px-6 py-3 rounded-b-lg shadow flex items-center sticky top-0 z-10">
      <Image alt="logo" src="/logo.png" className="h-8 w-auto" />
      <div className="flex flex-col grow">
        <p className="text-center text-foreground font-semibold">Hary World</p>
        <p className="text-center text-foreground font-semibold text-xs">
          Desenvolvimento web
        </p>
      </div>
      <AlignJustify size={28} />
    </div>
  );
};
