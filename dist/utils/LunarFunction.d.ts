/**
 * 返回农历y年一整年的总天数
 * @param lunar Year
 * @return Number
 * @eg:var count = calendar.lYearDays(1987) ;//count=387
 */
declare const lYearDays: (y: number) => number;
/**
 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
 * @param lunar Year
 * @return Number (0-12)
 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
 */
declare const leapMonth: (y: number) => number;
/**
 * 返回农历y年闰月的天数 若该年没有闰月则返回0
 * @param lunar Year
 * @return Number (0、29、30)
 * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
 */
declare const leapDays: (y: number) => number;
/**
 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
 * @param lunar Year
 * @return Number (-1、29、30)
 * @eg:var MonthDay = calendar.lMonthDays(1987,9) ;//MonthDay=29
 */
declare const lMonthDays: (y: number, m: number) => number;
/**
 * 农历年份转换为干支纪年
 * @param  lYear 农历年的年份数
 * @return Cn string
 */
declare const toGanZhiYear: (lYear: number) => string;
/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn { string }
 */
declare const toGanZhi: (offset: number) => string;
/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn string
 */
declare const toHourGanZhi: (offset: number) => string[];
/**
 * 传入农历数字月份返回汉语通俗表示法
 * @param lunar month
 * @return Cn string
 * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
 */
declare const toChinaMonth: (m: number) => any;
/**
 * 传入农历日期数字返回汉字表示法
 * @param lunar day
 * @return Cn string
 * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
 */
declare const toChinaDay: (d: number) => string;
/**
 * 获取24节气的方法
 * @param number
 * @return Cn string
 * @eg:
 */
declare const getSolarTerm: (n: number) => string;
export { lYearDays, leapMonth, leapDays, lMonthDays, toGanZhiYear, toGanZhi, toHourGanZhi, toChinaMonth, toChinaDay, getSolarTerm, };
