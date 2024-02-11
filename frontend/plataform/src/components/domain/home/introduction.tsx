"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export const Introduction = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // adjust the threshold as per your requirement
  });
  return (
    <div
      className="bg-gradient-to-b from-10% from-primary to-100% to-secondary flex flex-col justify-around px-4 min-h-[calc(100vh-64px)] relative"
      id="introduction"
      ref={ref}
    >
      <p
        className={cn("text-foreground font-semibold duration-[100ms]", {
          "animate-coming-from-the-left": inView,
        })}
      >
        E se um desenvolvedor fullstack resolvesse criar sua própria empresa?
      </p>
      <p
        className={cn(
          "text-right text-foreground font-semibold duration-[500ms]",
          {
            "animate-coming-from-the-rigth": inView,
          }
        )}
      >
        E se essa empresa fosse um conjunto de pequenas ferramentas que podem
        servir de produto pra você?
      </p>
      <p
        className={cn("text-foreground font-semibold  duration-[900ms]", {
          "animate-coming-from-the-left": inView,
        })}
      >
        E se cada produto desse demonstrasse as suas capacidades técnicas?
      </p>
      <p
        className={cn(
          "text-right text-foreground font-semibold duration-[1400ms]",
          {
            "animate-coming-from-the-rigth": inView,
          }
        )}
      >
        E se eu te contar que esse portfólio tem esse objetivo?
      </p>
      <p
        className={cn("text-foreground font-semibold duration-[1800ms]", {
          "animate-coming-from-the-left": inView,
        })}
      >
        E se a gente sair do campo das ideias e colocar na prática?
      </p>

      <Link href="#about">
        <ChevronDown
          className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-pulse text-foreground"
          data-te-smooth-scroll-init
          size={28}
        />
      </Link>
    </div>
  );
};
