import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export const About = () => {
  return (
    <div
      className="bg-secondary-light h-screen relative flex flex-col justify-center gap-3 px-4"
      id="about"
    >
      <Link href="#body" className="absolute top-16 right-2">
        <ChevronUp className="animate-pulse text-foreground" size={24} />
      </Link>

      <div className="flex flex-col items-center">
        <Image
          className="w-32"
          alt="me with coat"
          src="/me-with-coat (1).png"
        />
        <Card className="bg-primary p-3 w-full shadow flex flex-col gap-2">
          <p className="text-foreground text-center font-semibold">
            Harysson Soares
          </p>
          <p className="text-foreground text-center font-semibold">
            Desenvolvedor fullstack web
          </p>
          <p className="text-foreground text-center font-semibold">
            Especialista em
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              alt="Javascript logo"
              src="/skill-icons_javascript.png"
              className="w-16 m-auto"
            />
            <Image
              alt="Javascript logo"
              src="/skill-icons_typescript.png"
              className="w-16 m-auto"
            />
            <Image
              alt="Javascript logo"
              src="/skill-icons_react-dark.png"
              className="w-16 m-auto"
            />
            <Image
              alt="Javascript logo"
              src="/skill-icons_nextjs-dark.png"
              className="w-16 m-auto"
            />
            <Image
              alt="Javascript logo"
              src="/skill-icons_nodejs-dark.png"
              className="w-16 m-auto"
            />
            <Image
              alt="Javascript logo"
              src="/skill-icons_nestjs-dark.png"
              className="w-16 m-auto"
            />
          </div>
        </Card>
      </div>

      <Link href="#body" className="absolute bottom-3 right-2">
        <ChevronDown className="animate-pulse text-foreground" size={24} />
      </Link>
    </div>
  );
};
