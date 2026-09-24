import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function AboutMie() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f3eddc] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="pointer-events-none absolute -right-24 top-24 size-[430px] rounded-full bg-[#bfd073]/16 blur-3xl" />
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.6rem]">
            <Image
              src="/images/mie-hero.jpg"
              alt="Một ly matcha tại MIE MATCHA"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142112]/35 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-[1.4rem] border border-white/20 bg-[#f9f5ea]/14 p-4 text-[#fffaf0] backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em]">Whisked by hand</p>
                <p className="mt-1 font-serif text-2xl">Chasen · 茶筅</p>
              </div>
              <span className="text-3xl">🍵</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="section-kicker">About Mie Matcha</p>
            <h2 className="section-title max-w-4xl">
              Một góc nhỏ để <em>uống chậm</em>, cảm trà rõ hơn.
            </h2>
          </Reveal>

          <Reveal className="mt-8 grid gap-8 text-[#4b5946] sm:grid-cols-2" delay={0.08}>
            <p className="text-base leading-8 sm:text-lg">
              MIE MATCHA bắt đầu từ một tình yêu rất đơn giản: thích matcha, thích những buổi ngồi chậm lại một chút và thích chia sẻ những điều mình yêu với mọi người.
            </p>
            <p className="text-sm leading-7 sm:text-base">
              Ở MIE, bạn sẽ gặp những dòng matcha chính gốc từ các nhà trà lớn của Nhật Bản như Marukyu Koyamaen, Shogyokuen và nhiều lựa chọn khác được tuyển kỹ. Từ chén matcha nguyên bản đến những món biến tấu, tinh thần trà Nhật vẫn là điểm xuất phát.
            </p>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.12}>
            {['Uji selected', 'Hand whisked', 'Modern ritual', 'Slow experience'].map((item) => (
              <span key={item} className="rounded-full border border-[#263820]/15 bg-[#f8f3e7]/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#34452e]">
                {item}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
