export function SiteFooter() {
  return (
    <footer className="border-t border-[#23321e]/10 bg-[#f3eddc] px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 text-sm text-[#33402f] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-3xl tracking-[-0.04em] text-[#172314]">MIE MATCHA</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#5c6857]">
            Một góc nhỏ ở Tây Ninh dành cho những người yêu matcha.
          </p>
        </div>
        <div className="text-sm leading-6 sm:text-right">
          <p>25 Nguyễn Tri Phương, phường Long Hoa, Tây Ninh</p>
          <a className="inline-flex min-h-11 items-center rounded-md text-base underline decoration-[#819657]/50 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#526f3e]" href="tel:0966204426">0966 204 426</a>
          <p className="mt-1 text-[#7a8375]">© 2026 MIE MATCHA</p>
        </div>
      </div>
    </footer>
  );
}
