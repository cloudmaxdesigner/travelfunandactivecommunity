import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

export function GlassCircle({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`fc-glass grid h-11 w-[58px] place-items-center rounded-[22px] text-[var(--fc-text)] ${className}`}
      {...props}
    />
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
        active ? "bg-[var(--fc-text)] text-[var(--fc-bg)]" : "fc-glass text-[var(--fc-muted)]"
      }`}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`rounded-[24px] bg-[var(--fc-card)] ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Staggered entry, timed like the MotionSites "Coffee Rewards" sequence. */
export function rise(delay: number): CSSProperties {
  return { animationDelay: `${delay}s` };
}

export function Swatch({
  color,
  size = 40,
  photo,
}: {
  color: string;
  size?: number;
  photo?: string;
}) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/10"
      style={{
        width: size,
        height: size,
        background: photo
          ? undefined
          : `linear-gradient(145deg, ${color} 0%, ${color} 55%, color-mix(in oklab, ${color}, white 18%) 100%)`,
      }}
    >
      {photo && <img src={photo} alt="" className="h-full w-full object-cover" />}
    </span>
  );
}

export function ScreenHeader({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between px-5 pb-4 pt-14">
      <div className="fc-a-rise">
        <h1 className="text-[28px] font-medium leading-none tracking-tight">{title}</h1>
        {sub && <p className="mt-2 text-[14px] text-[var(--fc-muted)]">{sub}</p>}
      </div>
      {right && (
        <div className="fc-a-drop" style={rise(0.2)}>
          {right}
        </div>
      )}
    </div>
  );
}

/** Client-only date label so SSR and hydration never disagree. */
export function useTodayLabel() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    setLabel(
      new Date()
        .toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })
        .toUpperCase(),
    );
  }, []);
  return label;
}
