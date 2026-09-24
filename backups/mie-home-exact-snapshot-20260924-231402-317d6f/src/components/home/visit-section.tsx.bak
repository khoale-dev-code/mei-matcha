import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";

export function VisitMieSection() {
  return (
    <section className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,#12361a_0%,#0e4417_52%,#12361a_100%)] px-6 py-7 text-[#fffaf0] shadow-[0_28px_70px_rgba(16,48,22,0.16)] sm:px-8 sm:py-9 lg:px-12 lg:py-12">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#d7ef8b]/10 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#d7ef8b]/5 blur-3xl" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          {/* Left */}
          <div className="max-w-[760px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7ef8b]">
              Visit MIE Matcha
            </p>

            <h2 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.94] tracking-[-0.03em] text-[#fffaf0]">
              Một góc nhỏ ở Tây Ninh dành cho những người yêu matcha.
            </h2>

            <p className="mt-5 max-w-[58ch] text-sm leading-7 text-[#fffaf0]/76 sm:text-[0.98rem]">
              Ghé MIE để tìm profile hợp gu, hiểu rõ floral, creamy, umami
              và bắt đầu hành trình uống matcha theo cách dễ cảm nhận hơn.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur-sm">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#d7ef8b]/12 text-[#d7ef8b]">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#fffaf0]/55">
                    Địa chỉ
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#fffaf0]/88 sm:text-[0.96rem]">
                    25 Nguyễn Tri Phương, phường Long Hoa, Tây Ninh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur-sm">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#d7ef8b]/12 text-[#d7ef8b]">
                  <Phone className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#fffaf0]/55">
                    Hotline
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#fffaf0]/88 sm:text-[0.96rem]">
                    0966 204 426
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:pl-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7ef8b]">
                Start here
              </p>

              <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.5vw,2.4rem)] leading-tight tracking-[-0.03em] text-[#fffaf0]">
                Chọn đúng profile,
                <span className="block text-[#d7ef8b]">dễ uống ngay từ lần đầu.</span>
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#fffaf0]/70">
                Nếu bạn chưa biết nên bắt đầu từ đâu, hãy xem tea profiles
                hoặc ghé cửa hàng để tụi mình tư vấn gu matcha phù hợp nhất.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/tea-houses"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d7ef8b] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#17351b] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(215,239,139,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0]"
                >
                  Khám phá tea profiles
                  <ArrowRight className="ml-2 size-4" />
                </Link>

                <Link
                  href="/visit"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#fffaf0] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf0]"
                >
                  Ghé MIE Matcha
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { VisitMieSection as VisitSection };
