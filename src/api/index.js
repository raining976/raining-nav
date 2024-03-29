import axios from "axios";

// 获取一言的请求
export const getOneSentence = async () => {
  const url = "https://v1.hitokoto.cn/?encode=js&select=%23hitokoto"
  const script = document.createElement("script");
  script.src = url;
  script.defer = true
  script.async = false
  document.body.appendChild(script)
  return script
};


/**
 * 获取天气信息
 * @author raining976
 * 高德 free good
 * https://lbs.amap.com/api/webservice/guide/api/weatherinfo
 */
export const getWeather = async () => {
  const gaodeKey = '5af2bbd8702291fc7df7015d94e8c19e' // 高德地图的web服务api
  const ip = await axios.get('https://api.ipify.org/').then(res=>res.data)
  const regionData = await axios.get(`https://restapi.amap.com/v3/ip?key=${gaodeKey}&ip=${ip}`).then(res=>res.data)
  const cityCode = regionData.adcode
  const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?key=${gaodeKey}&city=${cityCode}`
  return await axios.get(weatherUrl).then(res => {
    // console.log('res',res.data.lives)
    if(res.data.lives)
      res = res.data.lives[0]
    else res = null
    return res
  }).catch(error => console.error(error))
}

function jsonp(url,params = {}) {
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
  let url = `https://suggestion.baidu.com/su`
  let result = await jsonp(url, {
    wd: keyword
  }).then(res => res.s)
  return result

};
