import { FLAVOR_LABELS, type FlavorProfile } from "@/data/matcha-catalog";

type FlavorMeterProps = {
  profile: FlavorProfile;
  compact?: boolean;
};

export function FlavorMeter({
  profile,
  compact = false,
}: FlavorMeterProps) {
  return (
    <div className={compact ? "space-y-2.5" : "space-y-5"}>
      {FLAVOR_LABELS.map((item) => {
        const value = profile[item.key];

        return (
          <div key={item.key}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <div>
                <p
                  className={
                    compact
                      ? "text-[10px] font-medium uppercase tracking-[0.16em]"
                      : "text-sm font-medium"
                  }
                >
                  {item.label}
                </p>

                {!compact ? (
                  <p className="mt-1 max-w-[42ch] text-xs leading-5 text-[#1c3a13]/56">
                    {item.helper}
                  </p>
                ) : null}
              </div>

              <span className="font-mono text-[10px] tracking-[0.12em] text-[#1c3a13]/50">
                {value}/5
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={[
                    "h-1.5 rounded-full",
                    index < value
                      ? "bg-[#1c3a13]"
                      : "bg-[#1c3a13]/12",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
