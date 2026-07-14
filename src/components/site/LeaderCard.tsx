import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Leader } from "@/data/leaders";

interface LeaderCardProps {
  leader: Leader;
}

export function LeaderCard({ leader }: LeaderCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-background ring-1 ring-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
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
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sunset">
          {leader.role}
        </p>
        <h3 className="font-display text-2xl font-semibold leading-tight text-navy">
          {leader.firstName} {leader.lastName}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-navy/70">
          {leader.shortBio}
        </p>

        <div className="mt-6 flex-1" />

        <Link
          to="/leaders/$slug"
          params={{ slug: leader.slug }}
          className="group/btn inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-sunset"
          aria-label={`Read full bio for ${leader.firstName} ${leader.lastName}`}
        >
          Read full bio
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
