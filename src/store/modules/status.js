// @/store/modules/status.js
import { defineStore } from "pinia";

export const useStatusStore = defineStore({
    id: "status",
    state: () => ({
        coverLoading: true,
        siteStatus:'normal', // 站点状态 normal focus set
        searchInputValue:"", // 搜索文本框的内容
    }),
    actions: {
        setCoverLoading(loading) {
            this.coverLoading = loading;
        },
    },
});