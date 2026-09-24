"use client";

import { useEffect, useRef } from "react";

// Fixed body also prevents background scrolling on mobile Safari.
function lockPageScroll() {
  const body = document.body;
  const root = document.documentElement;
  const x = window.scrollX;
  const y = window.scrollY;
  const scrollbar = Math.max(0, window.innerWidth - root.clientWidth);
  const padding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
  const properties = ["position", "top", "left", "width", "overflow", "padding-right"];
  const saved = properties.map((property) => ({
    property,
    value: body.style.getPropertyValue(property),
    priority: body.style.getPropertyPriority(property),
  }));
  const rootOverflow = root.style.getPropertyValue("overflow");
  const rootPriority = root.style.getPropertyPriority("overflow");

  root.style.setProperty("overflow", "hidden");
  body.style.setProperty("position", "fixed");
  body.style.setProperty("top", `-${y}px`);
  body.style.setProperty("left", `-${x}px`);
  body.style.setProperty("width", "100%");
  body.style.setProperty("overflow", "hidden");
  if (scrollbar) body.style.setProperty("padding-right", `${padding + scrollbar}px`);

  return () => {
    saved.forEach(({ property, value, priority }) => {
      if (value) body.style.setProperty(property, value, priority);
      else body.style.removeProperty(property);
    });
    if (rootOverflow) root.style.setProperty("overflow", rootOverflow, rootPriority);
    else root.style.removeProperty("overflow");
    window.scrollTo({ left: x, top: y, behavior: "instant" });
  };
}

export function useMobileDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const unlock = () => {
      unlockRef.current?.();
      unlockRef.current = null;
    };
    const onNativeClose = () => {
      if (!dialog.open) unlock();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches && dialog.open) {
        dialog.close();
        unlock();
      }
    };
    // Native close covers Escape; showModal handles focus and background inertness.
    dialog.addEventListener("close", onNativeClose);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.removeEventListener("close", onNativeClose);
      if (dialog.open) dialog.close();
      unlock();
    };
  }, []);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open || window.matchMedia("(min-width: 64rem)").matches) return;
    dialog.showModal();
    unlockRef.current = lockPageScroll();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    // Restore before a Link starts navigation and applies its scroll position.
    unlockRef.current?.();
    unlockRef.current = null;
  };

  return { dialogRef, openDialog, closeDialog };
}
