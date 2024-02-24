import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { FormSignup } from "@/components/domain/signup/form";

export default function SignUp() {
  return (
    <main className="min-h-svh bg-primary relative flex flex-col items-center justify-center gap-8 p-8">
      <Image alt="CAF's logo" src="/house.png" className="w-52" />

      <FormSignup />

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
