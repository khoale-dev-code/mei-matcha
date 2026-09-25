import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { ProductDetailHeroMedia } from "@/components/tea/product-detail-hero-media";
import { ProductDetailSectionNav } from "@/components/tea/product-detail-section-nav";
import { ProductFlavorProfile } from "@/components/tea/product-flavor-profile";
import { ScrollReveal } from "@/components/tea/scroll-reveal";
import {
  FLAVOR_LABELS,
  getMatchaProduct,
  teaHouses,
} from "@/data/matcha-catalog";

import styles from "./product-detail.module.css";

type ProductPageProps = {
  params: Promise<{
    house: string;
    product: string;
  }>;
};

const FAQ = [
  {
    question: "Thang 1–5 có phải điểm chất lượng không?",
    answer:
      "Không. Đây là thang định tính để hình dung body, umami, đắng/chát, floral và creaminess. Nó không phải xếp hạng tốt–xấu.",
  },
  {
    question: "Vì sao matcha cùng một nhà trà vẫn có vị khác nhau?",
    answer:
      "Mỗi dòng được định hướng profile riêng. Có dòng nhẹ và floral, có dòng dày umami, có dòng thiên về béo bùi hoặc hậu vị sâu.",
  },
  {
    question: "Tasting notes có giống nhau với mọi người không?",
    answer:
      "Không hoàn toàn. Tasting notes là ngôn ngữ định hướng cảm giác; khẩu vị, nhiệt độ, tỷ lệ nước và cách đánh đều có thể làm trải nghiệm thay đổi.",
  },
] as const;

export function generateStaticParams() {
  return teaHouses.flatMap((house) =>
    house.products.map((product) => ({
      house: house.slug,
      product: product.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { house, product } = await params;
  const found = getMatchaProduct(house, product);

  if (!found) return {};

  return {
    title: `${found.product.name} · ${found.house.name} | MIE MATCHA`,
    description: found.product.summaryVi,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { house: houseSlug, product: productSlug } = await params;
  const found = getMatchaProduct(houseSlug, productSlug);

  if (!found) {
    notFound();
  }

  const { house, product } = found;
  const siblings = house.products.filter(
    (item) => item.slug !== product.slug,
  );

  return (
    <div className={styles.page}>
      <SiteHeader />

      <ScrollReveal className="overflow-x-clip bg-[#f6f1e6] text-[#17351b]">
        <main>
          <section
            id="overview"
            className="scroll-mt-32 mx-auto max-w-[1320px] px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36"
          >
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#17351b]/48"
            >
              <Link href="/tea-houses" className="hover:text-[#17351b]">
                Matcha library
              </Link>
              <span aria-hidden="true">/</span>
              <a
                href={`/tea-houses#${house.slug}`}
                className="hover:text-[#17351b]"
              >
                {house.name}
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-[#17351b]">{product.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
              <div data-reveal>
                <ProductDetailHeroMedia
                  src={product.image}
                  alt={`${product.name} — ${house.name}`}
                />
              </div>

              <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#71854b]">
                  {house.region}
                </p>

                <p className="mt-4 text-base leading-7 text-[#17351b]/58">
                  {house.name}
                  {house.japaneseName ? ` · ${house.japaneseName}` : ""}
                </p>

                <h1 className="mt-4 font-serif text-[clamp(4rem,7vw,7rem)] leading-[0.86] tracking-[-0.04em]">
                  {product.name}
                </h1>

                {product.japaneseName ? (
                  <p className="mt-4 text-2xl text-[#17351b]/52">
                    {product.japaneseName}
                  </p>
                ) : null}

                <p className="mt-8 max-w-xl text-[1.08rem] leading-9 text-[#17351b]/82">
                  {product.summaryVi}
                </p>

                <p className="mt-4 max-w-xl text-[0.95rem] italic leading-7 text-[#17351b]/56">
                  {product.summaryEn}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-[#17351b]/12 bg-white/58 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#17351b]/72"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1.4rem] border border-[#17351b]/10 bg-[#17351b]/10">
                  <div className="bg-[#fffaf0]/72 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#17351b]/46">
                      House
                    </p>
                    <p className="mt-2 font-serif text-xl">{house.name}</p>
                  </div>

                  <div className="bg-[#fffaf0]/72 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#17351b]/46">
                      Region
                    </p>
                    <p className="mt-2 font-serif text-xl">{house.region}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#profile"
                    style={{
                      backgroundColor: "#17351b",
                      color: "#fffaf0",
                    }}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full !bg-[#17351b] px-6 text-[11px] font-extrabold uppercase tracking-[0.16em] !text-[#fffaf0] shadow-[0_10px_24px_rgba(23,53,27,0.15)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:!bg-[#214a25] hover:shadow-[0_14px_30px_rgba(23,53,27,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71854b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e6]"
                  >
                    <span className="!text-[#fffaf0]">Read profile</span>
                    
                  </a>

                  <Link
                    href="/visit"
                    style={{
                      backgroundColor: "#fffaf0",
                      color: "#17351b",
                    }}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#17351b]/14 !bg-[#fffaf0] px-6 text-[11px] font-extrabold uppercase tracking-[0.16em] !text-[#17351b] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[#71854b]/40 hover:!bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71854b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e6]"
                  >
                    <span className="!text-[#17351b]">Try at MIE</span>
                    
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <ProductDetailSectionNav />

          <section
            id="journey"
            className="scroll-mt-36 bg-[#17351b] text-[#fffaf0]"
          >
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
              <div
                data-reveal
                className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d3f08b]">
                    Taste journey
                  </p>

                                    <h2
                    lang="vi"
                    className="mt-5 font-sans text-[clamp(2.9rem,12vw,6.2rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-[#fffaf0]"
                  >
                    <span className="block whitespace-nowrap">Chọn trà từ</span>
                    <span className="block whitespace-nowrap">vị bạn thích.</span>
                  </h2>
                </div>

                                <p
                  lang="vi"
                  className="max-w-2xl text-[1rem] leading-8 text-[#fffaf0]/72 lg:justify-self-end"
                >
                  Bạn không cần nhớ hết tasting notes. Hãy bắt đầu từ cảm giác
                  mình thích — nhẹ, đậm, floral hay creamy — rồi để từng lớp vị
                  dẫn bạn đến chén trà hợp gu hơn.
                </p>
              </div>

              <div
                data-stagger
                className="mt-10 grid gap-4 md:grid-cols-3"
              >
                {[
                  ["01", "Opening", product.journey.opening],
                  ["02", "Middle", product.journey.middle],
                  ["03", "Finish", product.journey.finish],
                ].map(([number, title, copy]) => (
                  <article
                    key={number}
                    className="group relative min-h-[15rem] overflow-hidden rounded-[1.7rem] border border-white/14 bg-white/[0.055] p-6 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-[#d3f08b]/28 hover:bg-white/[0.08] sm:p-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-2 font-serif text-[5rem] leading-none text-white/[0.045] transition-colors duration-300 group-hover:text-[#d3f08b]/10"
                    >
                      {number}
                    </span>

                    <div className="relative flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-full border border-[#d3f08b]/28 bg-[#d3f08b]/10 text-[12px] font-extrabold tracking-[0.14em] text-[#d3f08b]">
                        {number}
                      </span>

                      <span className="size-2 rounded-full bg-[#d3f08b]/80" />
                    </div>

                    <h3 className="relative mt-7 font-serif text-[2.1rem] leading-none text-[#fffaf0]">
                      {title}
                    </h3>

                    <p className="relative mt-4 max-w-[34ch] text-base leading-7 text-white/74">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="profile"
            className="scroll-mt-36 bg-[#f6f1e6]"
          >
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
              <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
                <div data-reveal>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#71854b]">
                    Tasting profile
                  </p>

                                    <h2
                    lang="vi"
                    className="mt-4 font-sans text-[clamp(2.85rem,10.8vw,5.7rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#17351b]"
                  >
                    <span className="block">Hiểu gu qua</span>
                    <span className="block">năm trục.</span>
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-8 text-[#17351b]/68">
                    Thang 1–5 chỉ là bản đồ định tính từ tasting notes để bạn dễ
                    so sánh các dòng matcha. Đây không phải điểm số chất lượng.
                  </p>

                  <div className="mt-8 rounded-[1.4rem] border border-[#17351b]/10 bg-[#17351b] p-5 text-[#fffaf0]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d3f08b]">
                      Quick read
                    </p>
                    <p className="mt-3 font-serif text-2xl leading-tight">
                      {product.notes.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </div>

                <div data-reveal>
                  <ProductFlavorProfile profile={product.profile} />
                </div>
              </div>
            </div>
          </section>

          <section
            id="house"
            className="scroll-mt-36 border-y border-[#17351b]/10 bg-[#fffaf0]"
          >
            <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-12 lg:py-24">
              <div data-reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#71854b]">
                  Tea house
                </p>

                <h2 className="mt-4 max-w-[10ch] font-serif text-[clamp(3.2rem,5vw,5rem)] leading-[0.92] tracking-[-0.035em]">
                  {house.name}
                </h2>

                {house.japaneseName ? (
                  <p className="mt-3 text-base text-[#17351b]/52">
                    {house.japaneseName}
                  </p>
                ) : null}

                <p className="mt-6 max-w-xl text-base leading-8 text-[#17351b]/68">
                  {house.description}
                </p>

                <a
                  href={`/tea-houses#${house.slug}`}
                  className="mt-7 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-[#17351b]/14 px-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#17351b] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71854b] group hover:!bg-[#17351b] focus-visible:!bg-[#17351b] active:!bg-[#17351b]"
                >
                  <span className="text-[#17351b] transition-colors duration-200 group-hover:!text-[#fffaf0] group-focus-visible:!text-[#fffaf0] group-active:!text-[#fffaf0]">
                    Explore this tea house
                  </span>
                </a>
              </div>

              <div
                data-reveal
                className="relative min-h-[25rem] overflow-hidden rounded-[2rem] bg-[#ebe9e3] lg:min-h-[32rem]"
              >
                <Image
                  src={house.image}
                  alt={house.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <section
            id="compare"
            className="scroll-mt-36 bg-[#17351b] text-[#fffaf0]"
          >
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
              <div
                data-reveal
                className="grid gap-8 border-b border-white/12 pb-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d3f08b]">
                    Compare profiles
                  </p>

                                    <h2
                    lang="vi"
                    className="mt-4 font-sans text-[clamp(2.9rem,10.8vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#fffaf0]"
                  >
                    <span className="block">Cùng nhà trà.</span>
                    <span className="block">Khác gu vị.</span>
                  </h2>
                </div>

                <div className="max-w-xl lg:justify-self-end">
                  <p className="max-w-[36rem] text-[0.98rem] leading-8 text-white/72">
                    Đặt các profile cạnh nhau theo cùng năm trục vị để thấy rõ
                    dòng nào nhẹ, dày, floral hay creamy — không cần đọc quá nhiều
                    con số cùng lúc.
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="rounded-full border border-[#d3f08b]/24 bg-[#d3f08b]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d3f08b]">
                      {product.name} đang xem
                    </span>
                    <span className="text-xs text-white/44">
                      {house.products.length} profiles
                    </span>
                  </div>
                </div>
              </div>

              <div
                data-stagger
                className="mt-8 space-y-3"
              >
                {house.products.map((item) => {
                  const active = item.slug === product.slug;

                  return (
                    <Link
                      key={item.slug}
                      href={`/tea-houses/${house.slug}/${item.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "group block cursor-pointer overflow-hidden rounded-[1.45rem] border transition-[transform,background-color,border-color] duration-250 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3f08b]",
                        active
                          ? "border-[#d3f08b]/36 bg-[#d3f08b] text-[#17351b]"
                          : "border-white/12 bg-white/[0.045] text-[#fffaf0] hover:border-white/20 hover:bg-white/[0.07]",
                      ].join(" ")}
                    >
                      <div className="grid gap-5 p-5 lg:grid-cols-[1.15fr_4fr] lg:items-center lg:p-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={[
                                "font-serif text-[1.7rem] leading-none",
                                active
                                  ? "text-[#17351b]"
                                  : "text-[#fffaf0]",
                              ].join(" ")}
                            >
                              {item.name}
                            </span>

                            {active ? (
                              <span className="rounded-full border border-[#17351b]/15 bg-[#17351b] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#fffaf0]">
                                Viewing
                              </span>
                            ) : null}
                          </div>

                          {item.japaneseName ? (
                            <p
                              className={[
                                "mt-2 text-sm",
                                active
                                  ? "text-[#17351b]/58"
                                  : "text-white/44",
                              ].join(" ")}
                            >
                              {item.japaneseName}
                            </p>
                          ) : null}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                          {FLAVOR_LABELS.map((label) => {
                            const value = item.profile[label.key];

                            return (
                              <div
                                key={label.key}
                                className={[
                                  "rounded-[1rem] border p-3",
                                  active
                                    ? "border-[#17351b]/12 bg-[#17351b]/[0.06]"
                                    : "border-white/10 bg-black/[0.04]",
                                ].join(" ")}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span
                                    className={[
                                      "text-[9px] font-bold uppercase tracking-[0.14em]",
                                      active
                                        ? "text-[#17351b]/60"
                                        : "text-white/52",
                                    ].join(" ")}
                                  >
                                    {label.label}
                                  </span>

                                  <span
                                    className={[
                                      "text-[12px] font-extrabold tabular-nums",
                                      active
                                        ? "text-[#17351b]"
                                        : "text-[#d3f08b]",
                                    ].join(" ")}
                                  >
                                    {value}/5
                                  </span>
                                </div>

                                <div className="mt-3 grid grid-cols-5 gap-1">
                                  {Array.from({ length: 5 }).map(
                                    (_, index) => (
                                      <span
                                        key={index}
                                        className={[
                                          "h-2 rounded-full",
                                          index < value
                                            ? active
                                              ? "bg-[#17351b]"
                                              : "bg-[#d3f08b]"
                                            : active
                                              ? "bg-[#17351b]/12"
                                              : "bg-white/12",
                                        ].join(" ")}
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {siblings.length > 0 ? (
            <section className="bg-[#f6f1e6]">
              <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                <div
                  data-reveal
                  className="flex flex-wrap items-end justify-between gap-6"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#71854b]">
                      Keep exploring
                    </p>
                    <h2 className="mt-3 font-serif text-4xl tracking-[-0.025em] sm:text-5xl">
                      More from {house.name}
                    </h2>
                  </div>

                  <Link
                    href="/tea-houses"
                    className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#17351b]/58 underline underline-offset-4"
                  >
                    All matcha
                  </Link>
                </div>

                <div
                  data-stagger
                  className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                >
                  {siblings.slice(0, 3).map((item) => (
                    <Link
                      key={item.slug}
                      href={`/tea-houses/${house.slug}/${item.slug}`}
                      className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#17351b]/10 bg-[#fffaf0] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(23,53,27,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71854b]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe9e3]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      </div>

                      <div className="p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#71854b]">
                          {house.name}
                        </p>
                        <p className="mt-2 font-serif text-3xl tracking-[-0.025em]">
                          {item.name}
                        </p>
                        <p className="mt-3 line-clamp-2 text-base leading-7 text-[#17351b]/66">
                          {item.summaryVi}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="border-t border-[#17351b]/10 bg-[#fffaf0]">
            <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
              <div data-reveal className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#71854b]">
                  Questions
                </p>
                                <h2
                  lang="vi"
                  className="mt-3 font-sans text-[clamp(2.7rem,10.5vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#17351b]"
                >
                  <span className="block">Hiểu matcha.</span>
                  <span className="block">Chọn đúng gu.</span>
                </h2>
              </div>

              <div className="mt-8 grid gap-3">
                {FAQ.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-[1.2rem] border border-[#17351b]/10 bg-[#f6f1e6]/58 px-5 shadow-[0_8px_24px_rgba(23,53,27,0.035)] transition-[background-color,border-color] duration-200 open:border-[#71854b]/24 open:bg-[#f6f1e6] sm:px-6"
                  >
                    <summary
                      lang="vi"
                      className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-sans text-[1.04rem] font-semibold leading-7 tracking-[-0.012em] text-[#17351b] sm:text-[1.1rem]"
                    >
                      <span className="min-w-0">{item.question}</span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#17351b]/10 bg-[#fffaf0] text-[#71854b] transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p
                      lang="vi"
                      className="max-w-3xl pb-5 pr-10 text-[0.96rem] leading-7 text-[#17351b]/68 sm:text-base sm:leading-8"
                    >
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      </ScrollReveal>
    </div>
  );
}
