import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HojichaFeature } from "@/components/home/hojicha-feature";
import { MatchaGuideFinale } from "@/components/tea/matcha-guide-finale";
import { TeaHouseSection } from "@/components/tea/tea-house-section";
import { teaHouses } from "@/data/matcha-catalog";
import styles from "@/components/tea/tea-library.module.css";

export const metadata = {
  title: "Tea Houses · Matcha & Hojicha | MIE MATCHA",
  description: "Khám phá những nhà trà Nhật Bản tại MIE, so sánh hương vị matcha và tìm hiểu Hojicha Type A của Marukyu Koyamaen.",
};

export default function TeaHousesPage() {
  const productCount = teaHouses.reduce((total, house) => total + house.products.length, 0);
  return (
    <>
      <SiteHeader />
      <main className={styles.library}>
        <section className={`${styles.container} ${styles.hero}`} aria-labelledby="tea-library-title">
          <div className={styles.heroCopy}>
            <h1 id="tea-library-title">Chọn trà từ vị bạn thích.</h1>
            <p className={styles.intro}>Có chén trà thoảng hương hoa, có chén đậm umami, cũng có vị rang ấm của Hojicha. Khám phá những dòng trà MIE tuyển chọn và tìm một hương vị hợp với bạn.</p>
            <p className={styles.collectionCount}>{productCount} dòng matcha từ {teaHouses.length} nhà trà Nhật Bản, cùng Hojicha.</p>
            <div className={styles.heroLinks}>
              <a className={styles.primary} href="#tea-index">Khám phá các nhà trà</a>
              <a className={styles.secondary} href="#hojicha">Tìm hiểu Hojicha</a>
            </div>
          </div>
          <figure className={styles.heroFigure}>
            <div className={styles.heroPhoto}>
              <Image src="/images/products/marukyu/editorial-01.jpg" alt="Bộ sưu tập các dòng matcha Nhật Bản được MIE tuyển chọn" fill preload sizes="(min-width: 1384px) 604px, (min-width: 900px) calc(47.5vw - 54px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" />
            </div>
            <figcaption><span>Những dòng trà trong bộ sưu tập của MIE</span><span>Marukyu Koyamaen</span></figcaption>
          </figure>
        </section>
        <div id="tea-index" className={styles.indexWrap}>
          <div className={`${styles.container} ${styles.indexInner}`}>
            <span className={styles.indexLabel}>Chọn nhà trà</span>
            <nav className={styles.index} aria-label="Khám phá nhà trà và Hojicha">
              {teaHouses.map(house => <a key={house.slug} href={`#${house.slug}`}>{house.name}<span aria-label={`${house.products.length} dòng trà`}>{house.products.length}</span></a>)}
              <a href="#hojicha">Hojicha</a>
            </nav>
          </div>
        </div>
        <div className={styles.container}>
          {teaHouses.map(house => <TeaHouseSection key={house.slug} house={house} />)}
        </div>
        <HojichaFeature />
        <MatchaGuideFinale />
      </main>
      <SiteFooter />
    </>
  );
}
