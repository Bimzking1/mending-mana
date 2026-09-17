import { ArrowLeft } from "lucide-react";
import { CHANGELOG } from "@/data/changelog";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";

interface ChangelogScreenProps {
  onBack: () => void;
}

export function ChangelogScreen({ onBack }: ChangelogScreenProps) {
  return (
    <section className="space-y-8 pt-10">
      <header className="space-y-4">
        <Button variant="ghost" size="md" onClick={onBack} className="-ml-2 px-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Tentang
        </Button>

        <div className="space-y-2">
          <h1 className="font-display text-hero font-bold text-ink">Changelog</h1>
          <p className="max-w-[60ch] text-body text-ink-muted">
            Semua perubahan di Mending mana?, urut dari yang paling baru.
          </p>
        </div>
      </header>

      <ol className="relative space-y-10">
        {CHANGELOG.map((entry, index) => (
          <li key={entry.version} className="relative pl-6">
            {index < CHANGELOG.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[5px] top-4 h-full w-px border-l border-dashed border-line"
              />
            )}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[7px] h-2.5 w-2.5 rounded-full bg-primary"
            />
            <div className="space-y-3 rounded-card border border-line bg-surface p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-title font-bold text-ink">
                  v{entry.version}
                </h2>
                <span className="text-meta text-ink-faint">— {formatDate(entry.date)}</span>
              </div>
              <h3 className="text-lead font-semibold text-ink">{entry.title}</h3>
              <p className="text-body text-ink-muted">{entry.description}</p>
              <ul className="space-y-1.5 pl-1">
                {entry.changes.map((change) => (
                  <li key={change} className="flex gap-2 text-meta text-ink-muted">
                    <span aria-hidden="true" className="mt-[0.1em] text-primary">
                      •
                    </span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}