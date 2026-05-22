export type HubBlockInput = {
  type: "TEXT" | "RESOURCE" | "FAQ";
  title?: string | null;
  content: string;
  linkUrl?: string | null;
  position: number;
};

export type NormalizedHubBlock = {
  type: "TEXT" | "RESOURCE" | "FAQ";
  title: string | null;
  content: string;
  linkUrl: string | null;
  position: number;
};

function normalizeNullableText(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed;
}

export function normalizeHubBlocksForSave(blocks: HubBlockInput[]): NormalizedHubBlock[] {
  return blocks.map((block, index) => {
    const title = normalizeNullableText(block.title);
    const content = block.content.trim();
    const linkUrl = block.type === "RESOURCE" ? normalizeNullableText(block.linkUrl) : null;

    return {
      type: block.type,
      title,
      content,
      linkUrl,
      position: index,
    };
  });
}