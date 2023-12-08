import axios from "axios";

// 获取一言的请求
export const getOneSentence = async () => {
    return await axios.get('https://v1.hitokoto.cn').then(({data})=>data.hitokoto)
        .catch(console.error)
};

/**
 * 获取天气
 * https://api.oioweb.cn/doc/weather/GetWeather
 */
export const getWeather = () => {
    return axios.get('https://api.oioweb.cn/api/weather/GetWeather').catch(console.error);
};



function jsonp(url, params = {}) {
    return new Promise((resolve, reject) => {
      const callbackName = `jsonpCallback_${Date.now()}`;
      const script = document.createElement('script');
      const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
  
      script.src = `${url}?${queryString}&cb=window.${callbackName}`;
      script.async = true;
  
      window[callbackName] = (data) => {
        delete window[callbackName];
        document.body.removeChild(script);
        resolve(data);
      };
  
      script.onerror = (error) => {
        delete window[callbackName];
        document.body.removeChild(script);
        reject(error);
      };
  
      document.body.appendChild(script);
    });
  }

/**
 * 获取搜索建议 用的百度api
 * @param {string} keyWord 搜索关键词
 * @returns 
 */
export const getSearchSuggestions = async (keyword) => {
    //组装查询地址
    let url = `http://suggestion.baidu.com/su`
    let result = await jsonp(url,{
        wd:keyword
    }).then(res => res.s)
    return result

};
