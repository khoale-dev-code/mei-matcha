import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { hojicha } from "@/data/tea-houses";

export function HojichaFeature() {
  return (
    <section
      id="hojicha"
      aria-labelledby="hojicha-title"
      className="snap-start bg-[#6f4827] px-5 py-16 text-[#FFF7ED] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1224px] gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <div className="min-w-0 max-w-[38rem]">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E7C89F]">
                Tea Houses · Trà rang Nhật Bản
              </p>

              <span lang="ja" className="shrink-0 text-sm text-[#F3E3D2]">
                {hojicha.japanese}
              </span>
            </div>

            <h2 id="hojicha-title" className="mt-5 font-serif text-[clamp(3.5rem,7vw,6.6rem)] leading-none tracking-[-0.04em] text-[#FFF7ED]">
              {hojicha.title}
            </h2>
            <p className="mt-4 font-serif text-3xl italic leading-tight text-[#F1D2AA] sm:text-4xl">
              Một hương rang ấm, một vị trà êm.
            </p>
          </Reveal>

          <Reveal
            className="mt-7 space-y-4"
            delay={0.08}
          >
            <p className="text-base leading-8 text-[#FFF7ED]/90 sm:text-lg">
              {hojicha.description}
            </p>

            <p lang="en" className="text-sm leading-7 text-[#ECD6BF]">
              {hojicha.english}
            </p>
          </Reveal>

          <Reveal
            className="mt-8 rounded-[1.6rem] border border-[#FFF7ED]/20 bg-[#4b2e18]/50 p-5 sm:p-6"
            delay={0.12}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#E7C89F]">
              Hojicha tại MIE
            </p>

            <h3 className="mt-2 font-serif text-3xl text-[#FFF7ED]">
              {hojicha.featured.name}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#F8E8D6]/86">
              {hojicha.featured.vietnamese}
            </p>

            <p lang="en" className="mt-2 text-sm italic leading-6 text-[#E4C9AE]">
              {hojicha.featured.english}
            </p>
          </Reveal>
        </div>

        <Reveal className="min-w-0" delay={0.06}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#4b2e18] shadow-[0_30px_90px_rgba(34,16,7,0.22)] sm:rounded-[2.6rem] lg:aspect-[4/5]">
            <Image
              src="/images/hojicha.jpg"
              alt="Hojicha rang Nhật Bản"
              fill
              sizes="(min-width: 1320px) 609px, (min-width: 1024px) calc(52.5vw - 84px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(50,29,14,0.56)_100%)]" />

            <div lang="en" className="absolute bottom-5 left-5 right-5 w-fit max-w-[calc(100%-2.5rem)] rounded-full border border-[#FFF7ED]/22 bg-[#4b2e18]/70 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#F6DFC3] backdrop-blur-md sm:bottom-8 sm:left-8">
              Toast · Wood · Caramel
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
