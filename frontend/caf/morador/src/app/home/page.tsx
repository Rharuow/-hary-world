import { Header } from "@/components/domain/header";
import { Image } from "@/components/ui/image";
import { VisitantsList } from "@/components/domain/home/visitants-list";

export interface IVisitant {
  name: string;
  type: string;
  code: string;
  available: boolean;
}

export default function Home() {
  return (
    <main className="min-h-svh relative bg-primary from-secondary to-primary flex flex-col gap-8">
      <Header />

      <div className="flex flex-col px-3 z-10">
        <VisitantsList />
      </div>

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute bottom-0 left-0 w-52"
      />
    </main>
  );
}
