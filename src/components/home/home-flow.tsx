import Image from "next/image";
import Link from "next/link";
import { ritualSteps, teaHouseImages } from "@/data/home-content";
import styles from "./home-responsive.module.css";

export function HomeRitual() {
  return (
    <section className={styles.ritual} aria-labelledby="home-ritual-title">
      <div className={styles.container}>
        <div className={styles.ritualIntro}>
          <h2 id="home-ritual-title">Một chén trà, một nhịp chậm.</h2>
          <p>Từ lúc chọn trà đến ngụm cuối cùng, MIE dành sự chăm chút cho những điều nhỏ.</p>
        </div>
        <ol className={styles.steps}>{ritualSteps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
        <div className={styles.actions}><Link className={styles.button} href="/visit">Ghé MIE thưởng trà</Link><Link className={styles.secondary} href="/about">Câu chuyện của MIE</Link></div>
      </div>
    </section>
  );
}

export function HomeFlow() {
  return (
    <div className={styles.flowScenes}>
      <section className={styles.section} aria-labelledby="home-houses-title">
        <div className={styles.container}>
          <h2 id="home-houses-title">Những nhà trà MIE tuyển chọn.</h2>
          <p className={styles.copy}>Mỗi nhà trà mang một hương vị riêng. Tìm hiểu từ những dòng thanh nhẹ đến vị umami đậm và sâu.</p>
          <p className={styles.swipeHint}>Vuốt ngang để xem các nhà trà.</p>
          <div className={styles.rail} tabIndex={0} role="region" aria-label="Các nhà trà Nhật Bản" data-lenis-prevent>
            {teaHouseImages.map(item => <Link key={item.src} href={item.href}><figure><div className={styles.railPhoto}><Image src={item.src} alt={item.alt} fill sizes="(min-width: 435px) 330px, 76vw" /></div><figcaption>{item.label}</figcaption></figure></Link>)}
          </div>
          <div className={styles.actions}><Link className={styles.button} href="/tea-houses">Khám phá các nhà trà</Link></div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.hojicha}`} aria-labelledby="home-hojicha-title">
        <div className={`${styles.container} ${styles.hojichaInner}`}>
          <div className={styles.hojichaPhoto}><Image src="/images/hojicha.jpg" alt="Hojicha rang Nhật Bản tại MIE" fill sizes="(min-width: 1304px) 602px, (min-width: 640px) calc(50vw - 50px), calc(100vw - 40px)" /></div>
          <div><h2 id="home-hojicha-title">Hương rang ấm của Hojicha.</h2><p className={styles.copy}>Thoảng hương gỗ và caramel, vị trà dịu, ít đắng chát. Một lựa chọn khác khi bạn muốn đổi vị.</p><div className={styles.actions}><Link className={styles.button} href="/tea-houses#hojicha">Tìm hiểu Hojicha</Link><Link className={styles.secondary} href="/visit">Ghé MIE</Link></div></div>
        </div>
      </section>
    </div>
  );
}
