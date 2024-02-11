"use client";

import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // adjust the threshold as per your requirement
  });

  return (
    <div
      className="bg-gradient-to-b from-secondary to-primary h-screen relative flex flex-col justify-center gap-3 px-4"
      id="about"
      ref={ref}
    >
      <Link href="#body" className="absolute top-16 right-2">
        <ChevronUp className="animate-pulse text-foreground" size={28} />
      </Link>

      <div className="flex flex-col items-center">
        <Image
          className={cn("w-32", {
            "animate-coming-from-the-bottom": inView,
          })}
          alt="me with coat"
          src="/me-with-coat.png"
        />
        <Card
          className={cn("bg-primary p-3 w-full shadow flex flex-col gap-1", {
            "animate-coming-from-the-bottom": inView,
          })}
        >
          <p className="text-foreground text-center font-semibold">
            Harysson Soares
          </p>
          <p className="text-foreground text-center font-semibold">
            Desenvolvedor fullstack web
          </p>
          <p className="text-foreground text-center font-semibold">
            Especialista em
          </p>
          <div className="grid grid-cols-2 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="HTML logo"
                    src="/skill-icons_html.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>HTML</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="CSS logo"
                    src="/skill-icons_css.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>CSS</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="Tailwind Dark logo"
                    src="/skill-icons_tailwindcss-dark.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tailwind</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="Bootstrap Dark logo"
                    src="/skill-icons_bootstrap.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bootstrap</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="Javascript logo"
                    src="/skill-icons_javascript.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Javascript</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="Typescript logo"
                    src="/skill-icons_typescript.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Typescript</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="React Dark logo"
                    src="/skill-icons_react-dark.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>ReactJs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="Nextjs Dark logo"
                    src="/skill-icons_nextjs-dark.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>NextJs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="Nodejs Dark logo"
                    src="/skill-icons_nodejs-dark.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>NodeJs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="NestJs Dark logo"
                    src="/skill-icons_nestjs-dark.png"
                    className="w-16 m-auto"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>NestJs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </div>

      <Link href="#body" className="absolute bottom-3 right-2">
        <ChevronDown className="animate-pulse text-foreground" size={28} />
      </Link>
    </div>
  );
};
