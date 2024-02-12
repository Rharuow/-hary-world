"use client";

import { useInView } from "react-intersection-observer";

import t from "@/i18n.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const History = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // adjust the threshold as per your requirement
  });
  return (
    <div
      ref={ref}
      id="history"
      className="bg-gradient-to-b from-primary to-secondary h-screen relative justify-center flex flex-col gap-3 px-8"
    >
      <Accordion
        type="single"
        collapsible
        className={cn("w-full mt-4", {
          invisible: !inView,
          visible: inView,
        })}
      >
        <AccordionItem
          value="teacher"
          className={cn("hidden", {
            "block animate-coming-from-the-left": inView,
          })}
        >
          <AccordionTrigger>
            {t["pt-BR"].home.history["The teacher"]}
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold text-foreground text-justify">
              {
                t["pt-BR"].home.history[
                  "I began my professional career as an educator, where from the beginning I sought to integrate technology as an ally in the teaching process. Using web tools and applications has always been a constant strategy, aiming to improve my teaching and awaken students' interest in the relevance of the content I shared."
                ]
              }
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="change"
          className={cn("hidden delay-150", {
            "block animate-coming-from-the-left": inView,
          })}
        >
          <AccordionTrigger>
            {t["pt-BR"].home.history["The change"]}
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold text-foreground text-justify">
              {
                t["pt-BR"].home.history[
                  "In 2018, during a master's project, I fell in love with programming while developing an MVP using Ruby on Rails for an educational platform. This milestone led me to abandon my master's degree and dedicate myself entirely to studying and practicing development. I started with PHP, then specialized in WordPress, leaving my career as a teacher to focus on development."
                ]
              }
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="start"
          className={cn("hidden delay-300", {
            "block animate-coming-from-the-left": inView,
          })}
        >
          <AccordionTrigger>
            {t["pt-BR"].home.history["The start"]}
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold text-foreground text-justify">
              {
                t["pt-BR"].home.history[
                  "In 2019, I enrolled at the Federal Institute of Education, Science, and Technology of Rio Grande do Norte (IFRN) to pursue a degree in Technology in Analysis and Systems Development (TADS). In the first semester, I joined the Technology and Innovation Center (NAVI), where I participated in the creation of a portal for registering data from research conducted in the laboratory. This portal was developed using Laravel as an API and PostgreSQL as the database management system (DBMS), while a React application was utilized to consume this data and generate graphs for the analysis of research data. I was involved in this project from March to September 2019. Following this significant experience, I encountered an opportunity that proved to be the most enriching one yet."
                ]
              }
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="tootz"
          className={cn("hidden delay-500", {
            "block animate-coming-from-the-left": inView,
          })}
        >
          <AccordionTrigger>
            {t["pt-BR"].home.history["The Tootz"]}
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold text-foreground text-justify">
              {
                t["pt-BR"].home.history[
                  "From September 2019 to December 2022, I worked at Tootz Digital Solutions, where I was able to assemble my stack. Despite being a software factory, the products were always focused on being developed with ReactJs/NextJs and Ruby on Rails."
                ]
              }
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="freelancer"
          className={cn("hidden delay-700", {
            "block animate-coming-from-the-left": inView,
          })}
        >
          <AccordionTrigger>
            {t["pt-BR"].home.history["The Freelancer"]}
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold text-foreground text-justify">
              {
                t["pt-BR"].home.history[
                  "At the same time, I also ventured into the world of freelancers and always sought projects with ReactJs and NodeJs. Therefore, during this time, I gained a lot of experience with ReactJs and NodeJs. I worked extensively with a technology called AdonisJs and NestJs, which gave me a lot of expertise to work with various backend architectures (MVC, microservices, RESTful API, and gRPC) and frontend (microapps, SPA, and Webapps)"
                ]
              }
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="grt8"
          className={cn("hidden delay-1000", {
            "block animate-coming-from-the-left": inView,
          })}
        >
          <AccordionTrigger>
            {t["pt-BR"].home.history["The GRT8"]}
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold text-foreground text-justify">
              {
                t["pt-BR"].home.history[
                  "Upon leaving Tootz, I had the opportunity to work at a larger company for 8 months, GRT8 Innovations and Business. My time there was short due to the in-person work style. I had already become accustomed to remote work and didn't know it."
                ]
              }
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
