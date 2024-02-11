import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export const About = () => {
  return (
    <div className="bg-secondary-light h-screen relative" id="about">
      <Link href="#body" className="absolute top-16 right-2">
        <ChevronUp className="animate-pulse text-foreground" size={24} />
      </Link>

      <Link href="#body" className="absolute bottom-3 right-2">
        <ChevronDown className="animate-pulse text-foreground" size={24} />
      </Link>
    </div>
  );
};
