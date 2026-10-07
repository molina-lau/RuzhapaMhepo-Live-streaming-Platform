import { create } from 'zustand';
import { Radio } from "@/types/types";
import { immer } from 'zustand/middleware/immer'
export const useRadioState = create<Radio>()(immer((set) => ({
    path: '',
    _id: '',
    likes: 0,
    picture: '',
    radioFM: '',
    comments: 0,
    radioTitle: '',
    description: '',
    updateLikes: (likes: number) => set({ likes })
})))