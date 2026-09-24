import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";

import styles from "./visit-experience.module.css";

const GOOGLE_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.5657466175526!2d106.12541697479976!3d11.293298288888622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b6af184cf07b3%3A0xf3596ef247eca314!2zMjUgTmd1eeG7hW4gVHJpIFBoxrDGoW5nLCBLaHUgcGjhu5EgNCwgTG9uZyBIb2EsIFTDonkgTmluaCA4NDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1790258351292!5m2!1svi!2s";

const GOOGLE_MAP_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=25%20Nguyen%20Tri%20Phuong%2C%20Long%20Hoa%2C%20Tay%20Ninh%2C%20Vietnam";

const journey = [
  {
    number: "01",
    label: "Taste",
    title: "Nói gu bạn thích",
    text: "Floral, creamy, nutty hay umami — bắt đầu từ cảm giác, không cần thuộc tên trà.",
  },
  {
    number: "02",
    label: "Choose",
    title: "Chọn một profile vừa đủ",
    text: "MIE gợi ý từ dễ cảm đến sâu hơn để bạn hiểu vị mà không bị quá tải thông tin.",
  },
  {
    number: "03",
    label: "Whisk",
    title: "Đánh bằng chasen",
    text: "Matcha được đánh thủ công để bột mịn, texture cân bằng và hương trà mở rõ.",
  },
  {
    number: "04",
    label: "Slow",
    title: "Uống chậm một chút",
    text: "Cảm opening, middle và finish theo từng ngụm — để chén trà có thời gian kể câu chuyện của nó.",
  },
] as const;

export function VisitExperience() {
  return (
    <section className={styles.page} aria-labelledby="visit-heading">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <Leaf size={15} strokeWidth={1.7} aria-hidden="true" />
            VISIT MIE MATCHA · TÂY NINH
          </p>
          <h1 id="visit-heading" className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>Ghé MIE.</span>
            <em className={styles.heroTitleAccent}>Chọn vị mình thích.</em>
          </h1>

          <p className={styles.heroPrelude}>
            FLORAL · CREAMY · UMAMI · NUTTY
          </p>

          <p className={styles.heroLead}>
            Bạn không cần thuộc tên nhà trà. Chỉ cần nói cảm giác bạn thích —
            tụi mình sẽ cùng tìm một chén matcha dễ uống, vừa gu và đủ để nhớ.
          </p>

          <div className={styles.heroActions}>
            <a
              href={GOOGLE_MAP_DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className={styles.primaryButton}
            >
              <Navigation size={17} strokeWidth={1.8} aria-hidden="true" />
              Chỉ đường đến MIE
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <a href="tel:0966204426" className={styles.secondaryButton}>
              <Phone size={17} strokeWidth={1.8} aria-hidden="true" />
              0966 204 426
            </a>
          </div>

          <div className={styles.heroMeta} aria-label="Điểm nổi bật tại MIE">
            <span>Uji selected</span>
            <span>Hand whisked</span>
            <span>Profile guidance</span>
          </div>
        </div>

        <div className={styles.heroMedia} aria-label="Không gian và matcha tại MIE">
          <figure className={styles.heroMainPhoto}>
            <Image
              src="/images/visit/mie-hero-drink.jpg"
              alt="Ly matcha tại MIE trong ánh nắng bên cửa sổ"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 58vw"
            />
            <figcaption>
              <span>01</span>
              <strong>A quiet green moment.</strong>
            </figcaption>
          </figure>

          <figure className={styles.heroShelfPhoto}>
            <Image
              src="/images/visit/mie-tea-shelf.jpg"
              alt="Các dòng matcha Nhật được tuyển chọn tại MIE"
              fill
              sizes="(max-width: 620px) 42vw, 22vw"
            />
            <figcaption>Selected from Japan</figcaption>
          </figure>

          <figure className={styles.heroPourPhoto}>
            <Image
              src="/images/visit/mie-pour.jpg"
              alt="Matcha được pha và rót thủ công tại MIE"
              fill
              sizes="(max-width: 620px) 44vw, 20vw"
            />
            <figcaption>Whisked to order</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.journeySection} aria-labelledby="journey-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionKicker}>A SIMPLE WAY TO BEGIN</p>
          <h2 id="journey-heading">
            Chọn trà không cần bắt đầu bằng
            <em>tên nhà trà.</em>
          </h2>
          <p>
            Tụi mình bắt đầu từ cảm giác bạn muốn tìm, sau đó mới đi sâu vào
            origin, nhà trà và tasting notes.
          </p>
        </div>

        <div className={styles.journeyLayout}>
          <div className={styles.journeyList}>
            {journey.map((item) => (
              <article key={item.number} className={styles.journeyRow}>
                <div className={styles.journeyIndex}>
                  <span>{item.number}</span>
                  <small>{item.label}</small>
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <Sparkles
                  className={styles.journeyIcon}
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>

          <div className={styles.ritualMedia}>
            <figure className={styles.ritualMain}>
              <Image
                src="/images/visit/mie-whisk.jpg"
                alt="Chasen và dụng cụ pha matcha tại MIE"
                fill
                sizes="(max-width: 860px) 100vw, 42vw"
              />
              <figcaption>
                <span>THE RITUAL</span>
                <strong>Chasen trước, vội vàng sau.</strong>
              </figcaption>
            </figure>

            <figure className={styles.ritualDetail}>
              <Image
                src="/images/visit/mie-selection.jpg"
                alt="Các gói và hộp matcha tuyển chọn tại MIE"
                fill
                sizes="(max-width: 620px) 44vw, 18vw"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className={styles.visitSection} aria-labelledby="find-mie-heading">
        <div className={styles.visitIntro}>
          <div className={styles.visitIntroPrimary}>
            <p className={styles.darkKicker}>
              <span className={styles.darkKickerDot} aria-hidden="true" />
              VISIT MIE · LONG HOA
            </p>

            <h2 id="find-mie-heading" className={styles.visitIntroTitle}>
              <span>Ghé MIE.</span>
              <em>Chọn chén theo cảm giác.</em>
            </h2>
          </div>

          <div className={styles.visitIntroAside}>
            <p className={styles.visitLead}>
              Bạn không cần thuộc tên nhà trà hay biết hết tasting notes.
              Chỉ cần nói gu vị bạn thích — floral, creamy, nutty hay umami —
              tụi mình sẽ gợi ý một profile dễ cảm để bắt đầu.
            </p>

            <div className={styles.visitIntroFacts} aria-label="Cách bắt đầu tại MIE">
              <div>
                <span>01</span>
                <strong>Nói gu vị</strong>
              </div>
              <div>
                <span>02</span>
                <strong>Chọn profile</strong>
              </div>
              <div>
                <span>03</span>
                <strong>Whisk & sip</strong>
              </div>
            </div>
          </div>
        </div>
<div className={styles.visitBody}>
          <aside className={styles.visitInfoPanel} aria-label="Thông tin ghé MIE">
            <div className={styles.visitPanelTop}>
              <span>PLAN YOUR VISIT</span>
              <span>01 / 03</span>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <MapPin size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <span>Địa chỉ</span>
                  <strong>
                    25 Nguyễn Tri Phương,
                    <br />
                    phường Long Hoa, Tây Ninh
                  </strong>
                </div>
              </div>

              <a href="tel:0966204426" className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <Phone size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <span>Hotline</span>
                  <strong>0966 204 426</strong>
                </div>
              </a>
            </div>

            <p className={styles.visitNote}>
              Nếu đang phân vân giữa nhiều profile, cứ ghé và nói gu vị bạn
              thích. Tụi mình sẽ cùng bạn bắt đầu từ một chén dễ hiểu trước.
            </p>

            <div className={styles.visitActions}>
              <a
                href={GOOGLE_MAP_DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className={styles.matchaButton}
              >
                <Navigation size={17} strokeWidth={1.8} aria-hidden="true" />
                Mở Google Maps
              </a>

              <Link href="/tea-houses" className={styles.ghostButton}>
                Xem tea profiles
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </aside>

          <div className={styles.mapFrame}>
            <iframe
              src={GOOGLE_MAP_EMBED}
              title="Bản đồ MIE MATCHA tại 25 Nguyễn Tri Phương, Tây Ninh"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className={styles.mapBadge}>
              <span />
              25 NGUYỄN TRI PHƯƠNG
            </div>
          </div>

          <figure className={styles.counterPhoto}>
            <Image
              src="/images/visit/mie-counter.jpg"
              alt="Quầy matcha tại MIE với nhiều dòng trà Nhật tuyển chọn"
              fill
              sizes="(max-width: 860px) 100vw, 25vw"
            />
            <figcaption>
              <span>AT MIE · TÂY NINH</span>
              <strong>Một góc trà, rất MIE.</strong>
            </figcaption>
          </figure>
        </div>
      </section>


            <section className={styles.finalSection} aria-label="Bắt đầu trải nghiệm MIE">
        <div className={styles.finalCopyPanel}>
          <p className={styles.finalEyebrow}>LET YOUR TASTE LEAD</p>

          <h2 className={styles.finalTitle}>
            <span>Bắt đầu từ</span>
            <em>một vị bạn thích.</em>
          </h2>

          <p className={styles.finalLead}>
            Không cần hiểu hết về matcha để chọn đúng ngay từ đầu.
            Chỉ cần nói bạn thích floral, creamy, nutty hay umami —
            MIE sẽ cùng bạn tìm một chén dễ cảm và vừa gu.
          </p>

          <div className={styles.finalTasteTags} aria-label="Gợi ý nhóm hương vị">
            <span>Floral</span>
            <span>Creamy</span>
            <span>Umami</span>
            <span>Nutty</span>
          </div>

          <div className={styles.finalActions}>
            <Link href="/tea-houses" className={styles.matchaButton}>
              Xem tea profiles
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            <a
              href={GOOGLE_MAP_DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className={styles.finalGhostButton}
            >
              Ghé MIE
              <Navigation size={17} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className={styles.finalVisual}>
          <Image
            src="/images/visit/mie-ritual-table.jpg"
            alt="Chén matcha và không khí thưởng trà tại MIE"
            fill
            sizes="(max-width: 760px) 100vw, 56vw"
          />

          <figcaption className={styles.finalVisualCaption}>
            <span>MIE MATCHA · TÂY NINH</span>
            <strong>Chậm một chút.<br />Vị sẽ rõ hơn.</strong>
          </figcaption>
        </figure>
      </section>
    </section>
  );
}
