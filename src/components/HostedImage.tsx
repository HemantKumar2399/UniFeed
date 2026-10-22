import Image, { type ImageProps } from "next/image";

/** User-supplied hosts load in the browser without widening the server optimizer allowlist. */
export function HostedImage(props: ImageProps) {
  const external =
    typeof props.src === "string" && /^https?:\/\//i.test(props.src);
  return (
    <Image
      {...props}
      alt={props.alt}
      unoptimized={external || props.unoptimized}
    />
  );
}
