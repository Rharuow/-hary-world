import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-secondary to-primary flex flex-col items-center justify-center gap-8">
      <Image alt="CAF's logo" src="/products/caf-logo.png" className="w-52" />

      <form className="flex flex-col gap-4">
        <Input label="Email" name="email" type="email" />
        <Input label="Password" type="password" name="password" />
        <Button
          variant="secondary"
          className="text-secondary-foreground font-bold"
        >
          Entrar
        </Button>
      </form>

      <div className="flex flex-col">
        <Button variant="link" className="text-white underline">
          Esqueci minha senha
        </Button>

        <Button variant="link" className="text-white underline">
          Cadastre-se
        </Button>
      </div>

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute top-0 right-0 rotate-180 w-52"
      />
    </main>
  );
}
