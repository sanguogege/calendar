/**
 * 返回公历(!)y年m月的天数
 * @param solar Year
 * @return Number (-1、28、29、30、31)
 * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30//月份参数从1至12，参数错误返回-1
 */
declare const solarDays: (y: number, m: number) => number;
/**
 * 返回公历(!)y年m月的第一天是星期几
 * @param solar Year
 * @return Number (-1、28、29、30、31)
 * @eg:var solarFirstWeek = calendar.solarFirstWeek(1987,1) ;//星期四
 */
declare const solarFirstWeek: (y: number, m: number) => number;
/**
 * 公历月、日判断所属星座
 * @param  m [公历月]
 * @param  d [公历日]
 * @return Cn string
 */
declare const toAstro: (m: number, d: number) => string;
/**
 * 传入公历(!)y年获得该年第n个节气的公历日期
 * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @return day Number
 * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
 */
declare const getTerm: (y: number, n: number) => number;
/**
 * 年份转生肖[!仅能大致转换]  精确划分生肖分界线是“立春”
 * @param y year
 * @return Cn string
 * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
 */
declare const getAnimal: (y: number) => string;
/**
 * 数字转中文
 * @param number
 * @return Cn string
 * @eg:var sr = calendar.getAnimal(1987) ;//animal='兔'
 */
declare const toChinaNum: (num: number) => string;
export { solarDays, toChinaNum, solarFirstWeek, toAstro, getTerm, getAnimal };
