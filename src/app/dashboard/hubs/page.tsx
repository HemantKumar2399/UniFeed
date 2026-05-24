"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { HubBlocksRenderer, type HubBlockViewModel } from "@/features/hubs/components/HubBlocksRenderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ImageUploader } from "@/components/ui/ImageUploader";

type EditableBlockType = "TEXT" | "RESOURCE" | "FAQ";

type EditableBlock = {
  tempId: string;
  type: EditableBlockType;
  title: string;
  content: string;
  linkUrl: string;
};

function createEditableBlock(type: EditableBlockType): EditableBlock {
  const idSeed = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    tempId: `${type.toLowerCase()}-${idSeed}`,
    type,
    title: "",
    content: "",
    linkUrl: "",
  };
}

export default function DashboardHubsPage() {
  const utils = api.useUtils();

  const { data: editableHubs, isLoading: isLoadingHubs } = api.hub.getEditableHubs.useQuery();
  const [activeHubId, setActiveHubId] = useState<number | null>(null);
  const [newEditorUserId, setNewEditorUserId] = useState("");
  const [draftBlocks, setDraftBlocks] = useState<EditableBlock[]>([]);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    if (!activeHubId && editableHubs?.length) {
      setActiveHubId(editableHubs[0]!.id);
    }
  }, [editableHubs, activeHubId]);

  const {
    data: activeHub,
    isLoading: isLoadingHubContent,
    isFetching: isRefreshingHubContent,
  } = api.hub.getHubContent.useQuery(
    { clubId: activeHubId ?? 0 },
    {
      enabled: activeHubId !== null,
    },
  );

  useEffect(() => {
    if (!activeHub) {
      return;
    }

    setDraftBlocks(
      activeHub.blocks.map((block) => ({
        tempId: `existing-${block.id}`,
        type: block.type,
        title: block.title ?? "",
        content: block.content,
        linkUrl: block.linkUrl ?? "",
      })),
    );
    setLogoUrl(activeHub.logoUrl);
  }, [activeHub]);

  const activeHubMembershipRole = useMemo(() => {
    return editableHubs?.find((hub) => hub.id === activeHubId)?.role ?? null;
  }, [activeHubId, editableHubs]);

  const saveBlocks = api.hub.saveBlocks.useMutation({
    onSuccess: async (_result, variables) => {
      toast.success("Hub content saved");
      await utils.hub.getHubContent.invalidate({ clubId: variables.clubId });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save hub content");
    },
  });

  const updateLogo = api.club.updateLogo.useMutation({
    onSuccess: async () => {
      toast.success("Club logo updated successfully");
      if (activeHubId) {
        await utils.hub.getHubContent.invalidate({ clubId: activeHubId });
        await utils.hub.getDirectory.invalidate();
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update club logo");
    },
  });

  const {
    data: editorManagement,
    isLoading: isLoadingEditorManagement,
  } = api.club.getEditorManagement.useQuery(
    { clubId: activeHubId ?? 0 },
    {
      enabled: activeHubId !== null && activeHubMembershipRole === "OWNER",
    },
  );

  const assignEditor = api.club.assignEditor.useMutation({
    onSuccess: async () => {
      toast.success("Editor assigned");
      setNewEditorUserId("");
      if (activeHubId) {
        await utils.club.getEditorManagement.invalidate({ clubId: activeHubId });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign editor");
    },
  });

  const removeEditor = api.club.removeEditor.useMutation({
    onSuccess: async () => {
      toast.success("Editor removed");
      if (activeHubId) {
        await utils.club.getEditorManagement.invalidate({ clubId: activeHubId });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove editor");
    },
  });

  const previewBlocks = useMemo<HubBlockViewModel[]>(
    () =>
      draftBlocks.map((block, index) => ({
        id: index + 1,
        type: block.type,
        title: block.title.trim() || null,
        content: block.content.trim() || "Empty block",
        linkUrl: block.type === "RESOURCE" ? block.linkUrl.trim() || null : null,
      })),
    [draftBlocks],
  );

  const handleSave = () => {
    if (!activeHubId) {
      return;
    }

    const hasEmptyContent = draftBlocks.some((block) => block.content.trim().length === 0);
    if (hasEmptyContent) {
      toast.error("Each block needs content before saving");
      return;
    }

    for (const block of draftBlocks) {
      if (block.type === "RESOURCE") {
        const link = block.linkUrl.trim();
        if (!link) {
          toast.error("Resource blocks must have a link URL");
          return;
        }
        try {
          new URL(link);
        } catch {
          toast.error(`Invalid URL for block: "${block.title || block.content.substring(0, 15)}..."`);
          return;
        }
      }
    }

    saveBlocks.mutate({
      clubId: activeHubId,
      blocks: draftBlocks.map((block, index) => ({
        type: block.type,
        title: block.title.trim() || null,
        content: block.content,
        linkUrl: block.type === "RESOURCE" ? block.linkUrl.trim() || null : null,
        position: index,
      })),
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-24 md:pb-12">
      <header className="rounded-[18px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Campus Hub Editor</p>
        <h1 className="mt-2 text-[32px] font-bold tracking-[-0.02em] text-black/95">Static Resources & FAQ Blocks</h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#615d59]">
          Edit Notion-style persistent hub content with whisper borders and warm neutral styling.
        </p>
      </header>

      <section className="rounded-[18px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <label htmlFor="hub-select" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">
              Active Hub
            </label>
            <select
              id="hub-select"
              value={activeHubId ?? ""}
              onChange={(event) => setActiveHubId(Number(event.target.value))}
              disabled={!editableHubs?.length || isLoadingHubs}
              className="h-10 min-w-[240px] rounded-[10px] border border-[rgba(0,0,0,0.1)] bg-white px-3 text-[14px] font-medium text-black/90 outline-none focus:ring-2 focus:ring-[#097fe8]"
            >
              {editableHubs?.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({(hub.role ?? "EDITOR").toLowerCase()})
                </option>
              ))}
            </select>
          </div>

          {activeHubId ? (
            <Link
              href={`/hubs/${activeHubId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0075de] hover:text-[#005cab]"
            >
              Open public hub
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
        <section className="rounded-[18px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-4">
          {!isLoadingHubs && !editableHubs?.length ? (
            <div className="mb-4 rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-4 text-[14px] text-[#615d59]">
              No editable hubs found for this organizer. Ask an owner to add you as a hub editor.
            </div>
          ) : null}

          {activeHubId ? (
            <section className="mb-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white p-4">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">Club Identity</p>
                <h3 className="text-[16px] font-bold text-black/95">Club Logo</h3>
              </div>
              <ImageUploader
                value={logoUrl}
                onChange={(url) => setLogoUrl(url)}
                label="Club Logo"
              />
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    if (!activeHubId || !logoUrl) return;
                    updateLogo.mutate({ clubId: activeHubId, logoUrl });
                  }}
                  disabled={updateLogo.isPending || logoUrl === activeHub?.logoUrl}
                >
                  {updateLogo.isPending ? "Saving..." : "Save Logo"}
                </Button>
              </div>
            </section>
          ) : null}

          <div className="mb-4 flex flex-wrap gap-2">
            {(["TEXT", "RESOURCE", "FAQ"] as const).map((type) => (
              <Button
                key={type}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDraftBlocks((prev) => [...prev, createEditableBlock(type)])}
                className="border-[rgba(0,0,0,0.1)] bg-white text-[#4f4a45]"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add {type.toLowerCase()} block
              </Button>
            ))}
          </div>

          {isLoadingHubContent ? (
            <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-5 text-[14px] text-[#615d59]">
              Loading hub content...
            </div>
          ) : null}

          {!isLoadingHubContent ? (
            <div className="flex flex-col gap-3">
              {draftBlocks.map((block, index) => (
                <article key={block.tempId} className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[rgba(0,0,0,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">
                      {block.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDraftBlocks((prev) => prev.filter((_, itemIndex) => itemIndex !== index))}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#7f3f3f] hover:text-[#6b2d2d]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>

                  <input
                    type="text"
                    value={block.title}
                    onChange={(event) =>
                      setDraftBlocks((prev) =>
                        prev.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      )
                    }
                    placeholder={block.type === "FAQ" ? "Question" : "Title (optional)"}
                    className="mb-2 w-full border-none bg-transparent p-0 text-[17px] font-semibold text-black/90 placeholder:text-[#a39e98] outline-none"
                  />

                  <textarea
                    value={block.content}
                    onChange={(event) =>
                      setDraftBlocks((prev) =>
                        prev.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, content: event.target.value } : item,
                        ),
                      )
                    }
                    rows={block.type === "TEXT" ? 5 : 4}
                    placeholder={block.type === "FAQ" ? "Answer" : "Write your content..."}
                    className="w-full resize-y rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-[#f6f5f4] px-3 py-2 text-[14px] leading-relaxed text-[#443f3a] placeholder:text-[#a39e98] outline-none focus:ring-2 focus:ring-[#097fe8]"
                  />

                  {block.type === "RESOURCE" ? (
                    <input
                      type="url"
                      value={block.linkUrl}
                      onChange={(event) =>
                        setDraftBlocks((prev) =>
                          prev.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, linkUrl: event.target.value } : item,
                          ),
                        )
                      }
                      placeholder="https://..."
                      className="mt-2 w-full rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-[#f6f5f4] px-3 py-2 text-[14px] text-[#443f3a] placeholder:text-[#a39e98] outline-none focus:ring-2 focus:ring-[#097fe8]"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              onClick={handleSave}
              disabled={!activeHubId || saveBlocks.isPending || isLoadingHubContent || isLoadingHubs}
              className={cn("min-w-[160px]", isRefreshingHubContent && "opacity-90")}
            >
              <Save className="mr-2 h-4 w-4" />
              {saveBlocks.isPending ? "Saving..." : "Save Hub Content"}
            </Button>
          </div>
        </section>

        {activeHubMembershipRole === "OWNER" ? (
          <section className="rounded-[18px] border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-4">
            <div className="mb-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Editor Management</p>
              <h2 className="mt-2 text-[20px] font-bold tracking-[-0.02em] text-black/95">Manage Club Editors</h2>
              <p className="mt-1 text-[14px] leading-relaxed text-[#615d59]">
                Owners can add or remove editors for the active community. Owner assignments stay in the admin panel.
              </p>
            </div>

            {isLoadingEditorManagement ? (
              <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-4 text-[14px] text-[#615d59]">
                Loading editor management details...
              </div>
            ) : editorManagement ? (
              <div className="space-y-4">
                <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">Owners</p>
                  <div className="mt-3 space-y-2">
                    {editorManagement.owners.map((owner) => (
                      <div key={owner.id} className="flex items-center justify-between rounded-[12px] border border-[rgba(0,0,0,0.08)] px-3 py-2">
                        <div>
                          <p className="text-[14px] font-semibold text-black/90">{owner.name ?? owner.email ?? "Unnamed owner"}</p>
                          <p className="text-[12px] text-[#8a847d]">{owner.email ?? "No email"}</p>
                        </div>
                        <span className="rounded-full border border-[rgba(0,0,0,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">
                          Owner
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">Editors</p>
                    <span className="text-[12px] text-[#8a847d]">{editorManagement.editors.length} assigned</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {editorManagement.editors.length === 0 ? (
                      <p className="text-[14px] text-[#615d59]">No editors are assigned yet.</p>
                    ) : (
                      editorManagement.editors.map((editor) => (
                        <div key={editor.id} className="flex items-center justify-between rounded-[12px] border border-[rgba(0,0,0,0.08)] px-3 py-2">
                          <div>
                            <p className="text-[14px] font-semibold text-black/90">{editor.name ?? editor.email ?? "Unnamed editor"}</p>
                            <p className="text-[12px] text-[#8a847d]">{editor.email ?? "No email"}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!activeHubId) {
                                return;
                              }
                              removeEditor.mutate({ clubId: activeHubId, userId: editor.id });
                            }}
                            disabled={removeEditor.isPending}
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] bg-white px-4 py-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">Add Editor</p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <select
                      value={newEditorUserId}
                      onChange={(event) => setNewEditorUserId(event.target.value)}
                      className="h-10 flex-1 rounded-[10px] border border-[rgba(0,0,0,0.1)] bg-white px-3 text-[14px] font-medium text-black/90 outline-none focus:ring-2 focus:ring-[#097fe8]"
                    >
                      <option value="">Select an organizer or admin</option>
                      {editorManagement.eligibleUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name ?? user.email ?? "Unnamed user"} ({user.role})
                        </option>
                      ))}
                    </select>
                    <Button
                      type="button"
                      onClick={() => {
                        if (!activeHubId || !newEditorUserId) {
                          return;
                        }
                        assignEditor.mutate({ clubId: activeHubId, userId: newEditorUserId });
                      }}
                      disabled={!newEditorUserId || assignEditor.isPending}
                    >
                      Assign Editor
                    </Button>
                  </div>
                  {editorManagement.eligibleUsers.length === 0 ? (
                    <p className="mt-3 text-[13px] text-[#615d59]">
                      Everyone eligible is already assigned to this club. Use the admin panel to promote more organizers if needed.
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
        </div>

        <section className="rounded-[18px] border border-[rgba(0,0,0,0.1)] bg-white p-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Public Hub Preview</p>
          <HubBlocksRenderer blocks={previewBlocks} />
        </section>
      </div>
    </div>
  );
}
