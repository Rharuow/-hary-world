import { Header } from "@/components/domain/header";
import { Image } from "@/components/ui/image";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-svh relative bg-primary from-secondary to-primary flex flex-col gap-8">
      <Header />

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute bottom-0 left-0 w-52"
      />
    </main>
  );
}
