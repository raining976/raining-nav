// @/store/modules/status.js
import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
    id: "settings",
    state: () => ({
        backgroundBlur: 0, // 背景模糊 
        isShowSeconds: false, // 是否显示秒
        isShowLunar: false, // 是否显示农历
        is12Time: true, // 是否是12小时制
        searchEngine: 'bing', // 搜索引擎
        urlJumpType: "href", // 跳转方式 href 业内跳转 open 打开新页面
        customYiYan:[], // 自定义 一言
        refreshYiYanTime: 30, // 刷新一言时间 0 为不刷新
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
        },
        customYiYanPush(item){
            this.customYiYan.push(item)
        },
        customYiYanDel(index){
            this.customYiYan.splice(index,1)
        },
        customYiYanEdit(index,item){
            this.customYiYan[index] = item
        },
        setRefreshYiYanTime(time){
            if(time >= 0)
                this.refreshYiYanTime = time
        }
    },
    // 数据持久化
    persist: {
        key: "settings",
        storage: localStorage,
    },
});