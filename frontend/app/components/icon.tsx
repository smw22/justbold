import React from "react";

type IconProps = {
  /** Icon name matching a file in `app/assets/icons` (filename without extension) */
  name: string;
  /** size in px or any CSS length (eg `24`, `'1.5em'`) */
  size?: number | string;
  className?: string;
  "aria-label"?: string;
};

// Eagerly import all icon modules from the icons folder (Vite feature)
const modules = import.meta.glob("../assets/icons/*.tsx", {
  eager: true,
}) as Record<string, any>;

const iconsMap: Record<string, React.ComponentType<any>> = {};
for (const path in modules) {
  const mod = modules[path];
  const comp = mod.default ?? mod;
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  const name = filename.replace(/\.tsx?$/, "");
  iconsMap[name] = comp;
}

export const ICON_NAMES = Object.keys(iconsMap);

export default function Icon({
  name,
  size = 16,
  className,
  "aria-label": ariaLabel,
  ...rest
}: IconProps & React.SVGProps<SVGSVGElement>) {
  const Cmp = iconsMap[name];
  if (!Cmp) {
    // helpful fallback for development
    // eslint-disable-next-line no-console
    console.warn(
      `Icon \"${name}\" not found. Available: ${ICON_NAMES.join(", ")}`
    );
    return null;
  }

  const sizeValue = typeof size === "number" ? `${size}px` : size;

  return (
    <Cmp
      className={className}
      width={sizeValue}
      height={sizeValue}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}

export { iconsMap };
