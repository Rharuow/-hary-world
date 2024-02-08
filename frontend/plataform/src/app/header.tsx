import { Image } from "@/components/ui/image";

import { AlignJustify } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-primary px-6 py-3 rounded-b-lg shadow-sm flex items-center">
      <Image alt="logo" src="/logo.png" className="h-8 w-auto" />
      <div className="flex flex-col grow">
        <p className="text-center text-foreground font-semibold">Hary World</p>
        <p className="text-center text-foreground font-semibold text-xs">
          Desenvolvimento web
        </p>
      </div>
      <AlignJustify size={24} />
    </div>
  );
};
