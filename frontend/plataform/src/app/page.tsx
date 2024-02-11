import { About } from "@/components/domain/home/about";
import { History } from "@/components/domain/home/history";
import { Introduction } from "@/components/domain/home/introduction";

export default function Home() {
  return (
    <main>
      <Introduction />
      <About />
      <History />
    </main>
  );
}
