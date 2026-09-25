import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Leaf, MapPin, Phone } from "lucide-react";

import type { AboutMieContent } from "@/data/about-mie";
import { aboutChapters, ritualSteps } from "@/data/about-story";
import { aboutGallery } from "@/data/about-gallery";
import { AboutPhotoGallery } from "./about-photo-gallery";
import { AboutScrollExperience } from "./about-scroll-experience";
import styles from "./about-mie-experience.module.css";

// Static story content stays on the server; the scroll wrapper and gallery own interaction.
export function AboutMieExperience({ content }: { content: AboutMieContent }) {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`MIE MATCHA ${content.visit.address}`)}`;
  const phone = content.visit.phone.replace(/(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");

  return (
    <AboutScrollExperience>
      <div className={styles.stage} data-story-stage>
        <div className={styles.panels}>
          <section id="mie-story" className={`${styles.panel} ${styles.introPanel}`} data-story-panel aria-labelledby="mie-story-title">
            <div className={styles.copy} data-story-reveal>
              <p className={styles.eyebrow}><span>01 / Câu chuyện MIE</span><span className={styles.smallRule} /></p>
              <h1 id="mie-story-title" className={styles.title}><span className={styles.titleLine}>Chậm một nhịp.</span><span className={`${styles.titleLine} ${styles.keepLine}`}>Cảm trà rõ hơn.</span></h1>
              <p className={styles.body}>{content.intro[0]}</p>
              <div className={styles.tags} aria-label="Tinh thần MIE">
                <span>Trà Nhật tuyển chọn</span><span>Đánh trà thủ công</span>
              </div>
              <p className={styles.scrollCue}><ArrowDown size={15} aria-hidden="true" /> Cuộn để khám phá câu chuyện</p>
            </div>

            <figure className={styles.heroFigure} data-story-reveal>
              <div className={styles.photo}>
                <Image src={content.heroImage.src} alt={content.heroImage.alt} fill preload sizes="(max-width: 899px) calc(100vw - 96px), (max-width: 1439px) 44vw, 590px" className={styles.image} />
                <div className={styles.photoShade} />
                <span className={styles.photoStamp} aria-hidden="true">MIE<Leaf size={22} strokeWidth={1.25} />MATCHA</span>
                <div className={styles.photoCaption}><span>A LITTLE PAUSE, A LITTLE TEA</span><strong>Một khoảng nghỉ,<br />một ly trà.</strong></div>
              </div>
              <figcaption className={styles.imageNote}><span>Japanese tea, closer to you.</span><span>TÂY NINH · VIỆT NAM</span></figcaption>
            </figure>
          </section>

          <section id="mie-selection" className={`${styles.panel} ${styles.selectionPanel}`} data-story-panel aria-labelledby="mie-selection-title">
            <div className={styles.copy} data-story-reveal>
              <p className={styles.eyebrow}><span>02 / Những nhà trà</span><span className={styles.smallRule} /></p>
              <h2
                id="mie-selection-title"
                lang="vi"
                className="max-w-[11.2ch] font-serif text-[clamp(2.95rem,6.2vw,5.35rem)] font-normal leading-[0.94] tracking-[-0.028em] text-[#17351b]"
              >
                <span className="block">Chọn trà từ</span>
                <span className="block">gu bạn thích.</span>
              </h2>
              <p className={styles.body}>{content.intro[1]}</p>
              <p className={styles.secondaryCopy}>Hương hoa, umami hay béo mượt — mỗi dòng trà mang một cá tính để bạn từ từ khám phá.</p>
              <Link href="/tea-houses" className={styles.primaryLink}>Khám phá các nhà trà <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>

            <div className={styles.selectionVisual} data-story-reveal>
              <div className={styles.selectionTop}><span>TUYỂN CHỌN BỞI MIE</span><Leaf size={21} strokeWidth={1.3} aria-hidden="true" /></div>
              <AboutPhotoGallery images={aboutGallery} />
            </div>
          </section>

          <section id="mie-ritual" className={`${styles.panel} ${styles.ritualPanel}`} data-story-panel aria-labelledby="mie-ritual-title">
            <div className={styles.copy} data-story-reveal>
              <p className={styles.eyebrow}><span>03 / Nghi thức nhỏ</span><span className={styles.smallRule} /></p>
              <h2
                id="mie-ritual-title"
                lang="vi"
                className={`${styles.title} ${styles.balancedTitle}`}
              >
                <span className={`${styles.titleLine} ${styles.keepLine}`}>Đánh bằng tay.</span>
                <span className={`${styles.titleLine} ${styles.keepLine}`}>Chạm từng ly.</span>
              </h2>
              <p className={styles.body}>{content.intro[2]}</p>
              <ol className={styles.ritualSteps}>{ritualSteps.map(step => (
                <li key={step.number}><span className={styles.stepNumber}>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
              ))}</ol>
            </div>

            <figure className={styles.ritualVisual} data-story-reveal>
              <div className={styles.ritualMedia}>
                <Image
                  src="/images/about/mie-ritual-matcha.png"
                  alt="Ly matcha, chasen và bột trà trong ánh sáng tự nhiên"
                  fill
                  sizes="(max-width: 899px) calc(100vw - 40px), (max-width: 1439px) 46vw, 620px"
                  className={styles.ritualImage}
                />
                <div className={styles.ritualShade} />

                <div className={styles.ritualBadge}>
                  <Leaf size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span>WHISKED BY HAND · CHASEN</span>
                </div>

                <figcaption className={styles.ritualOverlay}>
                  <span className={styles.ritualKicker}>03 / MIE RITUAL</span>
                  <p className={styles.ritualQuote}>
                Tỉ mỉ từng nhịp.<br />
                <span>Trọn vị trong ly.</span>
              </p>
                  <p className={styles.ritualCaption}>
                    Tinh thần trà Nhật, trong nhịp sống hôm nay.
                  </p>
                </figcaption>
              </div>
            </figure>
          </section>

          <section id="mie-visit" className={`${styles.panel} ${styles.visitPanel}`} data-story-panel aria-labelledby="mie-visit-title">
            <div className={styles.copy} data-story-reveal>
              <p className={styles.eyebrow}><span>04 / Hẹn ở MIE</span><span className={styles.smallRule} /></p>
              <h2
                id="mie-visit-title"
                lang="vi"
                className={`${styles.title} ${styles.balancedTitle}`}
              >
                <span className={styles.titleLine}>Ghé MIE.</span>
                <span className={`${styles.titleLine} ${styles.keepLine}`}>Chọn vị hợp gu.</span>
              </h2>
              <p className={styles.body}>{content.intro[3]}</p>
              <p className={styles.visitNote}>Lần đầu ghé MIE? Chỉ cần nói gu bạn thích — floral, umami, creamy hay đậm trà — tụi mình sẽ gợi ý một ly dễ bắt đầu.</p>
              <Link href="/tea-houses" className={styles.textLink}>Tìm hương vị của bạn <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>

            <aside className={styles.invitation} data-story-reveal aria-label="Địa chỉ và liên hệ MIE MATCHA">
              <div className={styles.invitationTop}><span className={styles.invitationBrand}>MIE MATCHA</span><Leaf size={25} strokeWidth={1.1} aria-hidden="true" /></div>
              <p className={styles.invitationTitle} lang="vi">
                <span>Chậm một nhịp.</span>
                <br />
                <span>Gần nhau hơn.</span>
              </p>
              <div className={styles.contactRow}><MapPin size={18} aria-hidden="true" /><div><span>GHÉ CHÚNG MÌNH TẠI</span><address>{content.visit.address}</address></div></div>
              <a href={`tel:${content.visit.phone}`} className={styles.contactRow}><Phone size={18} aria-hidden="true" /><div><span>GỌI MIE</span><strong>{phone}</strong></div></a>
              <a href={directions} target="_blank" rel="noopener noreferrer" className={styles.directions}>Chỉ đường đến MIE <ArrowUpRight size={18} aria-hidden="true" /><span className={styles.srOnly}> (mở tab mới)</span></a>
            </aside>
          </section>
        </div>

        <div className={styles.toolbar}>
          <span className={styles.toolbarLabel}>THE MIE STORY</span>
          <nav className={styles.chapters} aria-label="Các phần câu chuyện MIE">
            {aboutChapters.map(chapter => (
              <a key={chapter.id} href={`#${chapter.id}`} data-chapter-link className={styles.chapterLink}><span>{chapter.number}</span>{chapter.label}</a>
            ))}
          </nav>
          <span className={styles.counter} aria-hidden="true"><span data-story-count>01</span><span> / 04</span></span>
          <span className={styles.progressTrack} aria-hidden="true"><span data-story-progress /></span>
        </div>
      </div>
    </AboutScrollExperience>
  );
}
