import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/utils/constants";

const sizes = {
  sm: { width: 120, height: 120, className: "h-11 w-auto rounded-lg" },
  lg: {
    width: 260,
    height: 260,
    className: "h-36 w-auto rounded-2xl sm:h-40",
  },
} as const;

interface LogoProps {
  size?: keyof typeof sizes;
  /** Only set on a single above-the-fold logo per page */
  preload?: boolean;
  href?: string;
}

export function Logo({
  size = "sm",
  preload = false,
  href = "/",
}: LogoProps) {
  const { width, height, className } = sizes[size];

  return (
    <Link
      href={href}
      className="inline-flex cursor-pointer items-center"
      aria-label={APP_NAME}
    >
      <Image
        src="/assets/logo.png"
        alt={APP_NAME}
        width={width}
        height={height}
        className={className}
        preload={preload}
      />
    </Link>
  );
}
