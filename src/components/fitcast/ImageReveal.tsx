import { useEffect, useRef, useState } from "react";
import { IMAGES } from "@/lib/fitcast/data";

// Cursor spotlight that reveals a second image — MotionSites "Synth Mode" reveal
// (ease 0.1, radius clamp(160, 16vw, 420), parallax grid ease 0.06).
export function ImageReveal() {
  const wrap = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const pattern = useRef<SVGPatternElement>(null);
  const [cell, setCell] = useState(48);

  useEffect(() => {
    const el = wrap.current;
    const layer = reveal.current;
    if (!el || !layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Mask is drawn at quarter resolution; the gradient is soft so the upscale is invisible.
    const SCALE = 0.25;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mouse = { x: -1, y: -1 };
    const smooth = { x: -1, y: -1 };
    const offset = { x: 0, y: 0 };
    let raf = 0;
    let drawn = false;

    const resize = () => {
      const r = el.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * SCALE));
      canvas.height = Math.max(1, Math.round(r.height * SCALE));
      setCell(Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028))));
    };
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (smooth.x < 0) Object.assign(smooth, mouse);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (mouse.x < 0) return;
      const dx = (mouse.x - smooth.x) * 0.1;
      const dy = (mouse.y - smooth.y) * 0.1;
      smooth.x += dx;
      smooth.y += dy;

      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      offset.x += ((smooth.x / w - 0.5) * 16 - offset.x) * 0.06;
      offset.y += ((smooth.y / h - 0.5) * 16 - offset.y) * 0.06;
      pattern.current?.setAttribute("x", offset.x.toFixed(2));
      pattern.current?.setAttribute("y", offset.y.toFixed(2));

      if (drawn && Math.abs(dx) + Math.abs(dy) < 0.15) return;
      drawn = true;
      const radius = Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16))) * SCALE;
      const cx = smooth.x * SCALE;
      const cy = smooth.y * SCALE;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.4, "rgba(255,255,255,1)");
      g.addColorStop(0.6, "rgba(255,255,255,0.75)");
      g.addColorStop(0.75, "rgba(255,255,255,0.4)");
      g.addColorStop(0.88, "rgba(255,255,255,0.12)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const url = `url(${canvas.toDataURL()})`;
      layer.style.maskImage = url;
      layer.style.webkitMaskImage = url;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const cover = "absolute inset-0 bg-cover bg-center bg-no-repeat";
  return (
    <div
      ref={wrap}
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
      aria-hidden
    >
      <div className={cover} style={{ backgroundImage: `url(${IMAGES.base})` }} />
      <div
        ref={reveal}
        className={cover}
        style={{
          backgroundImage: `url(${IMAGES.reveal})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskImage: "linear-gradient(transparent, transparent)",
          WebkitMaskImage: "linear-gradient(transparent, transparent)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.1 }}>
        <defs>
          <pattern
            ref={pattern}
            id="fc-grid"
            width={cell}
            height={cell}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cell} 0 L 0 0 0 ${cell}`}
              fill="none"
              stroke="#64748b"
              strokeWidth={0.6}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fc-grid)" />
      </svg>
    </div>
  );
}
