import React from "react";
import ImageNext from "next/image";

const Image = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    alt: string;
    title?: string;
    src: string;
  }
>(({ className, src, alt, title, ...props }, ref) => {
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
});

Image.displayName = "Image";

export { Image };
