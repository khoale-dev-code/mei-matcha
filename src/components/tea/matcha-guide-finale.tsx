import Link from "next/link";
import { tasteGuide } from "@/data/tea-houses";
import styles from "./tea-library.module.css";

export function MatchaGuideFinale() {
  return (
    <section className={`${styles.container} ${styles.guide}`} aria-labelledby="taste-guide-title">
      <div className={styles.guideHeading}>
        <h2 id="taste-guide-title">Hiểu những từ mô tả vị trà.</h2>
        <p className={styles.guideIntro}>Không cần biết hết về matcha để chọn một chén trà. Bốn từ này giúp bạn đọc mô tả và nói với MIE điều mình thích.</p>
      </div>
      <dl className={styles.guideTerms}>
        {tasteGuide.map(item => <div key={item.term} className={styles.guideTerm}><dt lang="en">{item.term}</dt><dd>{item.description}</dd></div>)}
      </dl>
      <div className={styles.invitation}>
        <div><h3>Cần MIE gợi ý một ly trà?</h3><p>Kể MIE nghe bạn thích vị thanh nhẹ, béo bùi hay đậm trà. Chúng mình sẽ cùng bạn chọn.</p></div>
        <div className={styles.invitationActions}>
          <Link className={styles.primary} href="/visit">Tìm đường đến MIE</Link>
          <a className={styles.secondary} href="tel:0966204426">Gọi 0966 204 426</a>
        </div>
      </div>
    </section>
  );
}
