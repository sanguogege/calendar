/**
 * 农历1900-2100的润大小信息表
 * @Array Of Property
 * @return Hex
 */
declare const LunarInfo: number[];
/**
 * 公历每个月份的天数普通表
 * @Array Of Property
 * @return Number
 */
declare const SolarMonth: number[];
/**
 * 天干地支之天干速查表
 * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
 * @return Cn string
 */
declare const Gan: string[];
/**
 * 天干地支之地支速查表
 * @Array Of Property
 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
 * @return Cn string
 */
declare const Zhi: string[];
/**
 * 每日的时辰对照表
 * @Array Of Property
 * @return Cn string
 */
declare const GanZhiHour: string[];
/**
 * 天干地支之地支速查表<=>生肖
 * @Array Of Property
 * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
 * @return Cn string
 */
declare const Animals: string[];
/**
 * 24节气速查表
 * @Array Of Property
 * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
 * @return Cn string
 */
declare const SolarTerm: string[];
/**
 * 1900-2100各年的24节气日期速查表
 * @Array Of Property
 * @return 0x string For splice
 */
declare const TermInfo: string[];
/**
 * 数字转中文速查表
 * @Array Of Property
 * @trans ['日','一','二','三','四','五','六','七','八','九','十']
 * @return Cn string
 */
declare const nStr1: string[];
/**
 * 日期转农历称呼速查表
 * @Array Of Property
 * @trans ['初','十','廿','卅']
 * @return Cn string
 */
declare const nStr2: string[];
/**
 * 月份转农历称呼速查表
 * @Array Of Property
 * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
 * @return Cn string
 */
declare const nStr3: string[];
export { LunarInfo, SolarMonth, Gan, Zhi, GanZhiHour, Animals, SolarTerm, TermInfo, nStr1, nStr2, nStr3, };
