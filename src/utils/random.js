
/**
 * 返回一个随机整数
 * @param {*} max 
 * @param {*} min 
 * @returns 
 */
export const getRandomNumber = (max,min = 0) =>{
    return Math.floor( Math.random() * (max - min +1) + min)
}