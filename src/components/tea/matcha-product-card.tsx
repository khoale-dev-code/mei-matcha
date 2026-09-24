import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { MatchaProduct, TeaHouse } from "@/data/matcha-catalog";
import styles from "./tea-library.module.css";

type MatchaProductCardProps = {
  house: TeaHouse;
  product: MatchaProduct;
};

export function MatchaProductCard({ house, product }: MatchaProductCardProps) {
  const single = house.products.length === 1;
  const imageSizes = single
    ? "(min-width: 1024px) 420px, (min-width: 768px) calc(47.5vw - 68px), (min-width: 494px) 420px, calc(100vw - 74px)"
    : house.products.length === 2
      ? "(min-width: 1384px) 648px, (min-width: 640px) calc(50vw - 44px), calc(100vw - 40px)"
      : "(min-width: 1384px) 424px, (min-width: 1200px) calc(33.33vw - 38px), (min-width: 640px) calc(50vw - 44px), calc(100vw - 40px)";

  return (
    <article className={styles.product}>
      <Link
        href={`/tea-houses/${house.slug}/${product.slug}`}
        className={styles.card}
        aria-label={`Xem hương vị ${product.name} của ${house.name}`}
      >
        <div
          className={styles.productPhoto}
          data-packshot={house.slug === "marukyu-koyamaen"}
        >
          <Image
            src={product.image}
            alt={`${product.name} của nhà trà ${house.name}`}
            fill
            sizes={imageSizes}
          />
        </div>
        <div className={styles.productCopy}>
          <div className={styles.productTitle}>
            <h3>{product.name}</h3>
            {product.japaneseName ? (
              <span lang="ja" className={styles.japanese}>
                {product.japaneseName}
              </span>
            ) : null}
          </div>
          <p className={styles.summary}>{product.summaryVi}</p>
          <ul className={styles.notes} aria-label="Nốt hương">
            {product.notes.slice(0, 3).map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <span className={styles.readProfile}>
            Xem hương vị
            <ChevronRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
