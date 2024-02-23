import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-secondary to-primary flex flex-col items-center justify-center gap-8">
      <Image alt="CAF's logo" src="/products/caf-logo.png" className="w-52" />

      <form className="flex flex-col gap-4 z-10">
        <Input label="Email" name="email" type="email" />
        <Input label="Senha" type="password" name="password" />
        <Input
          label="Confirme a senha"
          type="password"
          name="password-confirmation"
        />
        <Button
          variant="secondary"
          className="text-secondary-foreground font-bold"
        >
          Cadastrar
        </Button>
      </form>

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute bottom-0 left-0 w-52"
      />
    </main>
  );
}
