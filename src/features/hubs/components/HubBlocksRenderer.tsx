import Link from "next/link";
import { ExternalLink } from "lucide-react";

export type HubBlockViewModel = {
  id: number;
  type: "TEXT" | "RESOURCE" | "FAQ";
  title: string | null;
  content: string;
  linkUrl: string | null;
};

export function HubBlocksRenderer({ blocks }: { blocks: HubBlockViewModel[] }) {
  if (blocks.length === 0) {
    return (
      <div className="rounded-[16px] border border-whisper bg-app-bg px-5 py-6 text-[14px] text-muted-foreground transition-colors duration-300">
        This hub has not published resources yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block) => {
        if (block.type === "RESOURCE") {
          return (
            <article
              key={block.id}
              className="rounded-[16px] border border-whisper bg-card-bg px-5 py-4 transition-colors duration-300"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Resource</p>
              <h3 className="mt-2 text-[17px] font-bold text-foreground">{block.title ?? "Useful Link"}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{block.content}</p>
              {block.linkUrl ? (
                <Link
                  href={block.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Open resource
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </article>
          );
        }

        if (block.type === "FAQ") {
          return (
            <article
              key={block.id}
              className="rounded-[16px] border border-whisper bg-card-bg px-5 py-4 transition-colors duration-300"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">FAQ</p>
              <h3 className="mt-2 text-[17px] font-bold text-foreground">{block.title ?? "Question"}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{block.content}</p>
            </article>
          );
        }

        return (
          <article
            key={block.id}
            className="rounded-[16px] border border-whisper bg-card-bg px-5 py-4 transition-colors duration-300"
          >
            {block.title ? <h3 className="text-[18px] font-bold text-foreground">{block.title}</h3> : null}
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground whitespace-pre-wrap">{block.content}</p>
          </article>
        );
      })}
    </div>
  );
}