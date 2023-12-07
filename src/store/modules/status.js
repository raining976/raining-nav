// @/store/modules/status.js
import { defineStore } from "pinia";

export const useStatusStore = defineStore({
    id: "status",
    state: () => ({
        coverLoading: true, // 封面是否加载中
        siteStatus:'normal', // 站点状态 normal focus set
        searchInputValue:"", // 搜索文本框的内容
        engineChangeStatus:false, // 是否正在切换引擎   ,
    }),
    actions: {
        setSiteStatus(status) {
            this.siteStatus = status;
        },
        getSiteStatus() {
            return this.siteStatus;
        },
        setCoverLoading(loading) {
            this.coverLoading = loading;
        },
        setEngineChangeStatus(status) {
            this.engineChangeStatus = status;
        },
        getEngineChangeStatus() {
            return this.engineChangeStatus;
        },
        getSearchInputValue() {
            return this.searchInputValue;
        },
        setSearchInputValue(value) {
            this.searchInputValue = value;
        },

    },
});