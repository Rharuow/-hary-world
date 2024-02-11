import React from "react";
import ImageNext from "next/image";

export const Image = ({
  alt,
  src,
  title,
  className,
}: {
  className?: string;
  alt: string;
  title?: string;
  src: string;
}) => {
  return (
    <ImageNext
      width={0}
      height={0}
      priority
      sizes="100vw"
      alt={alt}
      src={src}
      title={title}
      {...(className && { className })}
    />
  );
};
