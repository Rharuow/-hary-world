"use client";
import React from "react";
import Lottie from "lottie-react";

import emptyAnimantion from "@/../public/animation/empty.json";

export const Empty = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <Lottie animationData={emptyAnimantion} />
      <p className="text-center">{text ? text : "Nada encontrado aqui!"}</p>
    </div>
  );
};
