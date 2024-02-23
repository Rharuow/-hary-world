import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export const FormLogin = () => {
  return (
    <form className="flex flex-col gap-4 z-10">
      <Input label="Email" name="email" type="email" />
      <Input label="Senha" type="password" name="password" />
      <Button
        variant="secondary"
        className="text-secondary-foreground font-bold"
        type="button"
      >
        Entrar
      </Button>
    </form>
  );
};
