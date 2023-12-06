// @/store/modules/status.js
import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
    id: "settings",
    state: () => ({
        backgroundBlur: 0, // 背景模糊 
        isShowSeconds: false, // 是否显示秒
        isShowLunar: false, // 是否显示农历
        is12Time: true, // 是否是12小时制
        searchEngine: 'google', // 搜索引擎
        urlJumpType: "href", // 跳转方式 href 业内跳转 open 打开新页面
    }),
    actions: {
        setCoverLoading(loading) {
            this.coverLoading = loading;
        },
        setSearchEngine(searchEngine) {
            this.searchEngine = searchEngine;
        },
        setIs12Time(set) {
            this.is12Time = set;
        },
        getIs12Time() {
            return this.is12Time;
        }
    },
    // 数据持久化
    // persist: {
    //     key: 'settings',
    // },
});