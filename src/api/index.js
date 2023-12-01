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
