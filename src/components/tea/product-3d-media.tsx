"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Product3DMediaProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function Product3DMedia({
  src,
  alt,
  priority = false,
}: Product3DMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const nextTransformRef = useRef({ rx: 0, ry: 0, lightX: 50, lightY: 38 });

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const flushTransform = () => {
    frameRef.current = null;

    const root = rootRef.current;
    if (!root) return;

    const { rx, ry, lightX, lightY } = nextTransformRef.current;

    root.style.setProperty("--mie-rx", `${rx}deg`);
    root.style.setProperty("--mie-ry", `${ry}deg`);
    root.style.setProperty("--mie-light-x", `${lightX}%`);
    root.style.setProperty("--mie-light-y", `${lightY}%`);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    nextTransformRef.current = {
      rx: (0.5 - py) * 8,
      ry: (px - 0.5) * 11,
      lightX: px * 100,
      lightY: py * 100,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flushTransform);
    }
  };

  const handlePointerLeave = () => {
    nextTransformRef.current = {
      rx: 0,
      ry: 0,
      lightX: 50,
      lightY: 38,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flushTransform);
    }
  };

  return (
    <div
      ref={rootRef}
      className="mie-product-3d-root relative aspect-[4/3] overflow-hidden bg-[#eeeee9]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="mie-product-3d-stage absolute inset-0">
        <div className="mie-product-3d-turn absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="mie-product-3d-image object-cover"
          />

          <div
            className="mie-product-3d-light pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="mie-product-3d-shadow pointer-events-none absolute bottom-3 left-1/2 h-6 w-[58%] -translate-x-1/2 rounded-full bg-black/20 blur-xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
        aria-hidden="true"
      />
    </div>
  );
}
