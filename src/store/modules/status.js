// @/store/modules/status.js
import { defineStore } from "pinia";

export const useStatusStore = defineStore({
    id: "status",
    state: () => ({
        coverLoading: true,
    }),
    actions: {
        setCoverLoading(loading) {
            this.coverLoading = loading;
        },
    },
});