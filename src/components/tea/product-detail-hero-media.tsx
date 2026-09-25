"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ProductDetailHeroMediaProps = {
  src: string;
  alt: string;
};

export function ProductDetailHeroMedia({
  src,
  alt,
}: ProductDetailHeroMediaProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  function commit(rx: number, ry: number, lx: number, ly: number) {
    const stage = stageRef.current;
    if (!stage) return;

    stage.style.setProperty("--rx", `${rx}deg`);
    stage.style.setProperty("--ry", `${ry}deg`);
    stage.style.setProperty("--lx", `${lx}%`);
    stage.style.setProperty("--ly", `${ly}%`);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      commit((0.5 - py) * 5, (px - 0.5) * 7, px * 100, py * 100);
    });
  }

  function onPointerLeave() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      commit(0, 0, 50, 38);
    });
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="group relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-[#17351b]/10 bg-[#ebe9e3] sm:min-h-[39rem] lg:min-h-[43rem] [--lx:50%] [--ly:38%] [--rx:0deg] [--ry:0deg] [perspective:1200px]"
    >
      <div className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform motion-reduce:transform-none [transform:rotateX(var(--rx))_rotateY(var(--ry))_scale(1.018)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden [background:radial-gradient(circle_at_var(--lx)_var(--ly),rgba(255,255,255,0.34),rgba(255,255,255,0.08)_24%,transparent_52%)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[16%] bottom-4 h-8 rounded-full bg-[#17351b]/14 blur-2xl transition-transform duration-300 group-hover:scale-x-90"
      />

      <div className="absolute left-5 top-5 rounded-full border border-[#17351b]/10 bg-[#fffaf0]/88 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#17351b]/68 backdrop-blur-md">
        Product study
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/30 bg-[#17351b]/72 px-4 py-3 text-[#fffaf0] backdrop-blur-md">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#d3f08b]">
            Interactive view
          </p>
          <p className="mt-1 text-xs text-white/74">
            Di chuột nhẹ để quan sát sản phẩm.
          </p>
        </div>

      </div>
    </div>
  );
}
