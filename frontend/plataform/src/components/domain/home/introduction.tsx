"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export const Introduction = () => {
  const router = useRouter();

  return (
    <div
      className="bg-primary-light flex flex-col justify-around px-4 min-h-[calc(100vh-64px)] relative"
      id="introduction"
    >
      <p className="text-foreground font-semibold animate-showing duration-[100ms]">
        E se um desenvolvedor fullstack resolvesse criar sua própria empresa?
      </p>
      <p className="text-right text-foreground font-semibold animate-showing duration-[500ms]">
        E se essa empresa fosse um conjunto de pequenas ferramentas que podem
        servir de produto pra você?
      </p>
      <p className="text-foreground font-semibold animate-showing duration-[900ms]">
        E se cada produto desse demonstrasse as suas capacidades técnicas?
      </p>
      <p className="text-right text-foreground font-semibold animate-showing duration-[1400ms]">
        E se eu te contar que esse portfólio tem esse objetivo?
      </p>
      <p className="text-foreground font-semibold animate-showing duration-[1800ms]">
        E se a gente sair do campo das ideias e colocar na prática?
      </p>

      <ChevronDown
        className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-pulse"
        data-te-smooth-scroll-init
        onClick={() => router.push("/#about")}
        size={24}
      />
    </div>
  );
};
