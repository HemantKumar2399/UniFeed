import { create } from "zustand";

type FollowSeed = {
  clubId: number;
  isFollowed: boolean;
};

type HubFollowState = {
  followByClubId: Record<number, boolean>;
  hapticByClubId: Record<number, boolean>;
  seedFromServer: (entries: FollowSeed[]) => void;
  toggleFollowOptimistic: (clubId: number) => void;
  rollbackFollow: (clubId: number) => void;
  clearHaptic: (clubId: number) => void;
};

export const useHubFollowStore = create<HubFollowState>((set) => ({
  followByClubId: {},
  hapticByClubId: {},

  seedFromServer: (entries) => {
    set((state) => {
      const nextFollowByClubId = { ...state.followByClubId };

      for (const entry of entries) {
        nextFollowByClubId[entry.clubId] ??= entry.isFollowed;
      }

      return { followByClubId: nextFollowByClubId };
    });
  },

  toggleFollowOptimistic: (clubId) => {
    set((state) => {
      const current = state.followByClubId[clubId] ?? false;
      return {
        followByClubId: {
          ...state.followByClubId,
          [clubId]: !current,
        },
        hapticByClubId: {
          ...state.hapticByClubId,
          [clubId]: true,
        },
      };
    });
  },

  rollbackFollow: (clubId) => {
    set((state) => {
      const current = state.followByClubId[clubId] ?? false;
      return {
        followByClubId: {
          ...state.followByClubId,
          [clubId]: !current,
        },
        hapticByClubId: {
          ...state.hapticByClubId,
          [clubId]: false,
        },
      };
    });
  },

  clearHaptic: (clubId) => {
    set((state) => ({
      hapticByClubId: {
        ...state.hapticByClubId,
        [clubId]: false,
      },
    }));
  },
}));