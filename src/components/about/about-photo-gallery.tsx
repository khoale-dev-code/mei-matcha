"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId, useRef } from "react";

import type { AboutGalleryImage } from "@/data/about-gallery";
import { useAboutGallery } from "./use-about-gallery";
import styles from "./about-photo-gallery.module.css";

export function AboutPhotoGallery({
  images,
}: {
  images: readonly AboutGalleryImage[];
}) {
  const { rootRef, index, playing, select } = useAboutGallery(images.length);
  const viewportId = useId();
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const current = images[index];

  if (!current) return null;

  return (
    <div
      ref={rootRef}
      className={styles.gallery}
      role="group"
      aria-roledescription="carousel"
      aria-label="Những góc trà tại MIE"
      data-about-gallery
      data-image-index={index}
      data-playing={playing}
    >
      <div
        id={viewportId}
        className={styles.viewport}
        tabIndex={images.length > 1 ? 0 : undefined}
        aria-label="Ảnh tự chuyển. Vuốt ngang hoặc dùng phím mũi tên để xem ảnh."
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            return;
          }

          event.preventDefault();

          select(
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? images.length - 1
                : index + (event.key === "ArrowRight" ? 1 : -1),
          );
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0 || images.length < 2) {
            return;
          }

          gesture.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };

          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;

          if (!start || start.id !== event.pointerId) return;

          const deltaX = event.clientX - start.x;
          const deltaY = event.clientY - start.y;

          if (
            Math.abs(deltaX) >= 40 &&
            Math.abs(deltaX) > Math.abs(deltaY) * 1.3
          ) {
            select(index + (deltaX < 0 ? 1 : -1));
          }
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onLostPointerCapture={() => {
          gesture.current = null;
        }}
      >
        {images.map((photo, photoIndex) => (
          <div
            key={photo.src}
            className={styles.slide}
            data-active={photoIndex === index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${photoIndex + 1} / ${images.length}: ${photo.title}`}
            aria-hidden={photoIndex !== index}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 899px) calc(100vw - 72px), (max-width: 1439px) 40vw, 550px"
              className={styles.image}
              style={{ objectPosition: photo.position }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <div className={styles.controls}>
          <span className={styles.count} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
            <span> / {String(images.length).padStart(2, "0")}</span>
          </span>

          <span className={styles.progressTrack} aria-hidden="true">
            <span
              key={`gallery-progress-${index}`}
              className={styles.progressFill}
              data-playing={playing}
            />
          </span>

          <div className={styles.arrows}>
            <button
              type="button"
              aria-label="Ảnh trước"
              aria-controls={viewportId}
              onClick={() => select(index - 1)}
            >
              <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              aria-controls={viewportId}
              onClick={() => select(index + 1)}
            >
              <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div
        className={styles.caption}
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        <p className={styles.title}>{current.title}</p>
        <p className={styles.description}>{current.caption}</p>
      </div>
    </div>
  );
}
