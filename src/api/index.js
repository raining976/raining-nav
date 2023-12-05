import axios from "axios";
// 获取一言的请求
export const getOneSentence = async () => {
    return axios.get('https://v1.hitokoto.cn')
        .catch(console.error)
};

/**
 * 获取天气
 * https://api.oioweb.cn/doc/weather/GetWeather
 */
export const getWeather = () => {
    return axios.get('https://api.oioweb.cn/api/weather/GetWeather').catch(console.error);
};


/**
 * 获取搜索建议 用的百度api
 * @param {string} keyWord 搜索关键词
 * @returns 
 */
export const getSearchSuggestions = async (keyWord) => {
    try {
        const encodedKeyword = encodeURIComponent(keyWord);
        const response = await fetchJsonp(
            `https://suggestion.baidu.com/su?wd=${encodedKeyword}&cb=json`,
            {
                // 回调参数
                jsonpCallback: "cb",
            }
        );
        const data = await response.json();
        return data.s;
    } catch (error) {
        console.error("处理搜索建议发生错误：", error);
        return null;
    }
};
