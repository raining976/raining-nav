/**
 * 函数防抖
 * @param {function} fn 要防抖的函数
 * @param {number} [delay] 延迟时间 默认为1000ms 
 * @returns {function} 返回一个防抖函数
 */
export const debounce = (fn,delay=1000)=>{
    let timer;
    return function(...args){
        clearTimeout(timer)

        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}