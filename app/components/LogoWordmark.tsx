import Image from "next/image";
import { site } from "../site";

type LogoWordmarkProps = {
  className?: string;
};

/** Single baked logo image — see public/logo-original.png and scripts/optimize-logo-tagline.mjs */
export function LogoWordmark({ className = "" }: LogoWordmarkProps) {
  const { src, alt, width, height } = site.logo;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`h-14 w-auto max-w-[min(320px,68vw)] shrink-0 object-contain object-center sm:h-16 ${className}`}
      priority
    />
  );
}
