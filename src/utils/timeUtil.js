import { solarToLunar } from "vue-solar-lunar";

export const getCurTime = (hour12 = false) => {
    const date = new Date();
    const formatTime = (value) => ( value < 10 ? "0" + value : value ) // 小于10加上0
    const format12Hour = (hour) =>(  hour % 12 == 0 ? 12 : hour % 12) 
    const getAmPm = (value) => (value > 12 ? 'PM' : 'AM')
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = formatTime(date.getHours())
    const minute = formatTime(date.getMinutes())
    const second = formatTime(date.getSeconds())
   
    let amPm = ''
    if(hour12){
        hour = format12Hour(hour)
        amPm = getAmPm(date.getHours())
    }
    return {
        year,
        month,
        day,
        hour,
        minute,
        second,
        amPm,
        lunar: solarToLunar(year, month, day),
    }
}


/**
 * 获取当前时间问候语
 * @returns 
 */
export const getGreeting = () => {
    const hour = new Date().getHours();
    let helloText = null
    if (hour < 6) helloText = '凌晨好'
    else if (hour < 8) helloText = '早上好'
    else if(hour < 11) helloText = '上午好'
    else if (hour < 14) helloText = '中午好'
    else if (hour < 17) helloText = '下午好'
    else if (hour < 19) helloText = '傍晚好'
    else if (hour < 22) helloText = '晚上好'
    else helloText = '夜深了'
    return helloText
}