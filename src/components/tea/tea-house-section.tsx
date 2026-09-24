import { MatchaProductCard } from "@/components/tea/matcha-product-card";
import type { TeaHouse } from "@/data/matcha-catalog";
import styles from "./tea-library.module.css";

export function TeaHouseSection({ house }: { house: TeaHouse }) {
  const single = house.products.length === 1;

  return (
    <section
      id={house.slug}
      className={styles.house}
      aria-labelledby={`${house.slug}-title`}
      data-single={single}
    >
      <div className={styles.houseHeading}>
        <div>
          <p className={styles.region}>{house.region}</p>
          <h2 id={`${house.slug}-title`}>{house.name}</h2>
          <p className={styles.houseMeta}>
            {house.japaneseName ? <span lang="ja">{house.japaneseName}</span> : null}
            <span>{house.products.length} dòng matcha</span>
          </p>
        </div>
        <p className={styles.houseIntro}>{house.description}</p>
      </div>
      <div
        className={styles.products}
        data-single={single}
        data-pair={house.products.length === 2}
      >
        {house.products.map(product => (
          <MatchaProductCard key={product.slug} house={house} product={product} />
        ))}
      </div>
    </section>
  );
}
