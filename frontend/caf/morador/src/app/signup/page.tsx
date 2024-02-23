import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  return (
    <main className="min-h-screen bg-primary relative flex flex-col items-center justify-center gap-8 p-8">
      <Image alt="CAF's logo" src="/house.png" className="w-52" />

      <form className="flex flex-col gap-4 z-10">
        <Input label="Nome completo" name="name" />
        <Input label="CPF" inputMode="numeric" name="cpf" />
        <Input label="Email" name="email" type="email" />
        <Input label="Telefone" name="phone" />
        <div className="grid grid-cols-2 gap-2">
          <Input label="Bloco" name="square" />
          <Input label="Casa" name="house" />
        </div>
        <Input label="Senha" type="password" name="password" />
        <Input
          label="Confirme a senha"
          type="password"
          name="password-confirmation"
        />
        <Button
          variant="secondary"
          className="text-secondary-foreground font-bold"
          type="button"
        >
          Enviar Cadastro
        </Button>
      </form>

      <Link href="/" className="text-white underline text-center z-10">
        Entrar
      </Link>

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute bottom-0 left-0 w-52"
      />
    </main>
  );
}
