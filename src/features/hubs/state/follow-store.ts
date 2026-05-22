import { create } from "zustand";

type FollowSeed = {
  clubId: number;
  isFollowed: boolean;
};

type HubFollowState = {
  followByClubId: Record<number, boolean>;
  hapticByClubId: Record<number, boolean>;
  seedFromServer: (entries: FollowSeed[]) => void;
  markFollowedOptimistic: (clubId: number) => void;
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

  markFollowedOptimistic: (clubId) => {
    set((state) => ({
      followByClubId: {
        ...state.followByClubId,
        [clubId]: true,
      },
      hapticByClubId: {
        ...state.hapticByClubId,
        [clubId]: true,
      },
    }));
  },

  rollbackFollow: (clubId) => {
    set((state) => ({
      followByClubId: {
        ...state.followByClubId,
        [clubId]: false,
      },
      hapticByClubId: {
        ...state.hapticByClubId,
        [clubId]: false,
      },
    }));
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