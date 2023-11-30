// @/store/modules/status.js
import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
    id: "settings",
    state: () => ({
        backgroundBlur: 0, // 背景模糊 
    }),
    actions: {
        setCoverLoading(loading) {
            this.coverLoading = loading;
        },
    },
});