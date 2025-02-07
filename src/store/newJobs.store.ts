import { AddJobFormData } from "@/_components/add-job";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StoreState = {
  isNewJobAdded: boolean;
  newJob: AddJobFormData;
  updateNewJob: (newJob: AddJobFormData) => void;
  updateNewJobAdded: (state: boolean) => void;
};

export const useNewJobStore = create<StoreState>()(
  devtools((set) => ({
    newJob: { title: "", category: "" },
    isNewJobAdded: false,
    updateNewJobAdded: (state) => set({ isNewJobAdded: state }),
    updateNewJob: (newJob) => set({ newJob: newJob }),
  }))
);
