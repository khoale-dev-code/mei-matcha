"use client";

import { cn } from "@/lib/utils";

type MenuToggleIconProps = {
  open: boolean;
  className?: string;
  duration?: number;
};

export function MenuToggleIcon({
  open,
  className,
  duration = 300,
}: MenuToggleIconProps) {
  return (
    <span
      className={cn(
        "relative block",
        className,
      )}
      aria-hidden="true"
    >
      <span
        className="absolute left-1/2 top-1/2 block h-px w-[72%] -translate-x-1/2 bg-current"
        style={{
          transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
          transform: open
            ? "translate(-50%, -50%) rotate(45deg)"
            : "translate(-50%, -5px)",
        }}
      />

      <span
        className="absolute left-1/2 top-1/2 block h-px w-[72%] -translate-x-1/2 bg-current"
        style={{
          transition: `opacity ${duration}ms ease`,
          opacity: open ? 0 : 1,
          transform:
            "translate(-50%, -50%)",
        }}
      />

      <span
        className="absolute left-1/2 top-1/2 block h-px w-[72%] -translate-x-1/2 bg-current"
        style={{
          transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
          transform: open
            ? "translate(-50%, -50%) rotate(-45deg)"
            : "translate(-50%, 5px)",
        }}
      />
    </span>
  );
}
