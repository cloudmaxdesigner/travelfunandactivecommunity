import type { ReactNode } from "react";

// Line-art primitives from the MotionSites "Synth Mode" spec.

const CORNERS = {
  tl: "M0 11.5V0.5H11.5",
  tr: "M0.5 0.5H11.5V11.5",
  bl: "M0 0.5V11.5H11.5",
  br: "M0.5 11.5H11.5V0.5",
} as const;

export function Corner({ pos, className = "" }: { pos: keyof typeof CORNERS; className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      style={{ width: "var(--corner, 0.8rem)", height: "var(--corner, 0.8rem)" }}
      aria-hidden
    >
      <path d={CORNERS[pos]} />
    </svg>
  );
}

export function Framed({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Corner pos="tl" className="absolute left-0 top-0" />
      <Corner pos="tr" className="absolute right-0 top-0" />
      <Corner pos="bl" className="absolute bottom-0 left-0" />
      <Corner pos="br" className="absolute bottom-0 right-0" />
      {children}
    </div>
  );
}

export function Checker({ className = "" }: { className?: string }) {
  const squares = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const x = col * 7.6 + (row % 2 ? 2.25 : 0);
      if (x > 32) continue;
      squares.push(<rect key={`${row}-${col}`} x={x} y={row * 4.5} width={3.8} height={3.8} />);
    }
  }
  return (
    <svg
      viewBox="0 0 36 18"
      fill="currentColor"
      className={`inline-block translate-y-[2px] ${className}`}
      style={{ width: "var(--checker-w)", height: "var(--checker-h)" }}
      aria-hidden
    >
      {squares}
    </svg>
  );
}

export function Globe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
      style={{ width: "var(--globe)", height: "var(--globe)" }}
      aria-hidden
    >
      <circle cx="32" cy="32" r="28" />
      <line x1="4" y1="32" x2="60" y2="32" />
      <ellipse cx="32" cy="22" rx="24" ry="5" />
      <ellipse cx="32" cy="42" rx="24" ry="5" />
      <line x1="32" y1="4" x2="32" y2="60" />
      <ellipse cx="32" cy="32" rx="10" ry="28" />
      <ellipse cx="32" cy="32" rx="19" ry="28" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`fc-orbitron font-black tracking-[0.15em] ${className}`}>
      FITCAST
      <span className="-mt-0.5 ml-0.5 align-top text-[0.45em]">˚</span>
    </span>
  );
}
