"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  let frame: number | null = null;
  const onScroll = () => {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(() => {
      frame = null;
      onChange();
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    if (frame !== null) window.cancelAnimationFrame(frame);
  };
}

const getServerSnapshot = () => false;

export function useScroll(threshold = 12) {
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
