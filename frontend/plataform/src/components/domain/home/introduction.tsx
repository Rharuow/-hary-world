import React from "react";

export const Introduction = () => {
  return (
    <div className="grow bg-primary-light flex flex-col justify-around px-4">
      <p className="text-foreground font-semibold animate-showing duration-100">
        E se um desenvolvedor fullstack resolvesse criar sua própria empresa?
      </p>
      <p className="text-right text-foreground font-semibold animate-showing duration-500">
        E se essa empresa fosse um conjunto de pequenas ferramentas que podem
        servir de produto pra você?
      </p>
      <p className="text-foreground font-semibold animate-showing duration-900">
        E se cada produto desse demonstrasse as suas capacidades técnicas?
      </p>
      <p className="text-right text-foreground font-semibold animate-showing duration-1300">
        E se eu te contar que esse portfólio tem esse objetivo?
      </p>
      <p className="text-foreground font-semibold animate-showing duration-1700">
        E se a gente sair do campo das ideias e colocar na prática?
      </p>
    </div>
  );
};
