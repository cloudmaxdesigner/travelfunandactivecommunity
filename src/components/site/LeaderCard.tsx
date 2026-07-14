import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Leader } from "@/data/leaders";

interface LeaderCardProps {
  leader: Leader;
  position?: "left" | "right";
}

export function LeaderCard({ leader, position = "left" }: LeaderCardProps) {
  const isRight = position === "right";

  return (
    <article className="group relative">
      {/* Role tag */}
      <div
        className={cn(
          "mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sunset",
          isRight && "sm:justify-end",
        )}
      >
        <span className="h-px w-8 bg-sunset/60" />
        <span className="max-w-[240px] leading-tight">{leader.role}</span>
      </div>

      <div
        className={cn(
          "relative grid gap-6 sm:grid-cols-5 sm:items-end",
          isRight && "sm:[&>*:first-child]:order-2",
        )}
      >
        {/* Portrait */}
        <div className="relative sm:col-span-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream shadow-lg shadow-navy/10 transition-transform duration-500 group-hover:-translate-y-1">
            <img
              src={leader.imageUrl}
              alt={`${leader.firstName} ${leader.lastName}`}
              loading="lazy"
              width={800}
              height={1000}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                leader.imageClassName,
              )}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 75% 85%, rgba(0,0,0,0.4), transparent 40%)",
              }}
            />
          </div>
        </div>

        {/* Info block — overlaps the image on desktop */}
        <div
          className={cn(
            "relative sm:col-span-3 sm:-ml-10 sm:pb-6",
            isRight && "sm:-ml-0 sm:-mr-10 sm:text-right",
          )}
        >
          <div className="rounded-2xl bg-background/95 p-6 shadow-sm ring-1 ring-border/50 backdrop-blur-sm sm:p-7">
            <h3 className="font-display text-3xl font-semibold leading-[1.05] text-navy sm:text-4xl">
              <span className="block">{leader.firstName}</span>
              <span className="block text-sunset">{leader.lastName}</span>
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-navy/70 sm:text-base">
              {leader.shortBio}
            </p>

            <div
              className={cn(
                "mt-6 flex items-center gap-3",
                isRight && "sm:justify-end",
              )}
            >
              <Link
                to="/leaders/$slug"
                params={{ slug: leader.slug }}
                className="group/btn inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-sunset"
                aria-label={`Read full bio for ${leader.firstName} ${leader.lastName}`}
              >
                Read full bio
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
