import Link from "next/link";

import { Image } from "@/components/ui/image";
import { FormLogin } from "@/components/domain/login/form";

export default function Login() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-secondary to-primary flex flex-col items-center justify-center gap-8">
      <Image alt="CAF's logo" src="/products/caf-logo.png" className="w-52" />

      <FormLogin />

      <div className="flex flex-col gap-3 z-10">
        <Link href="/" className="text-white underline text-center">
          Esqueci minha senha
        </Link>
        <Link href="/signup" className="text-white underline text-center">
          Cadastre-se
        </Link>
      </div>

      <Image
        alt="sprite decoration"
        src="/lines.png"
        className="absolute bottom-0 left-0 w-52"
      />
    </main>
  );
}
