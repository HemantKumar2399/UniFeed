import {
  resolveDiscussionDisplayName,
  sortDiscussionThreads as sortDiscussionThreadsShared,
} from "../../../lib/discussion.js";

export const sortDiscussionThreads = sortDiscussionThreadsShared;

export function formatDiscussionAuthorName(name: string | null, email: string | null): string {
  return resolveDiscussionDisplayName(name, email);
}
