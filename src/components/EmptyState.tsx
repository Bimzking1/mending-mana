import type { ReactNode } from "react";

interface EmptyStateProps {
  emoji: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ emoji, title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-card border border-dashed border-line bg-sunken/60 px-6 py-10 text-center">
      <span className="text-3xl" aria-hidden>
        {emoji}
      </span>
      <h3 className="mt-3 text-title font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[34ch] text-body text-ink-muted">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
