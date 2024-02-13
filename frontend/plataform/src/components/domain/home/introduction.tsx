"use client";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

import t from "@/i18n.json";

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
        className={cn("text-foreground font-semibold", {
          "animate-coming-from-the-left": inView,
        })}
      >
        {
          t["pt-BR"].home.introduction[
            "What if a fullstack developer decided to create his own company?"
          ]
        }
      </p>
      <p
        className={cn("text-right text-foreground font-semibold", {
          "animate-coming-from-the-rigth": inView,
        })}
      >
        {
          t["pt-BR"].home.introduction[
            "What if this company was a set of small tools that can serve as a product for you?"
          ]
        }
      </p>
      <p
        className={cn("text-foreground font-semibold", {
          "animate-coming-from-the-left": inView,
        })}
      >
        {
          t["pt-BR"].home.introduction[
            "What if each product demonstrated its technical capabilities?"
          ]
        }
      </p>
      <p
        className={cn("text-right text-foreground font-semibold", {
          "animate-coming-from-the-rigth": inView,
        })}
      >
        {
          t["pt-BR"].home.introduction[
            "What if I told you that this portfolio has this objective?"
          ]
        }
      </p>
      <p
        className={cn("text-foreground font-semibold", {
          "animate-coming-from-the-left": inView,
        })}
      >
        {
          t["pt-BR"].home.introduction[
            "What if we leave the field of ideas and put it into practice?"
          ]
        }
      </p>
    </div>
  );
};
