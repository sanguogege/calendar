import {
	LunarInfo,
	Gan,
	Zhi,
	GanZhiHour,
	SolarTerm,
	nStr3,
	nStr2,
	nStr1,
} from "../data/Calendar";

/**
 * 返回农历y年一整年的总天数
 * @param lunar Year
 * @return Number
 * @eg:var count = calendar.lYearDays(1987) ;//count=387
 */
const lYearDays = function (y: number): number {
	let i,
		sum: number = 348;
	for (i = 0x8000; i > 0x8; i >>= 1) {
		sum += LunarInfo[y - 1900] & i ? 1 : 0;
	}
	return sum + leapDays(y);
};

/**
 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
 * @param lunar Year
 * @return Number (0-12)
 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
 */
const leapMonth = function (y: number) {
	//闰字编码 \u95f0
	return LunarInfo[y - 1900] & 0xf;
};

/**
 * 返回农历y年闰月的天数 若该年没有闰月则返回0
 * @param lunar Year
 * @return Number (0、29、30)
 * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
 */
const leapDays = function (y: number): number {
	if (leapMonth(y)) {
		return LunarInfo[y - 1900] & 0x10000 ? 30 : 29;
	}
	return 0;
};

/**
 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
 * @param lunar Year
 * @return Number (-1、29、30)
 * @eg:var MonthDay = calendar.lMonthDays(1987,9) ;//MonthDay=29
 */
const lMonthDays = function (y: number, m: number): number {
	if (m > 12 || m < 1) {
		return -1;
	} //月份参数从1至12，参数错误返回-1
	return LunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
};

/**
 * 农历年份转换为干支纪年
 * @param  lYear 农历年的年份数
 * @return Cn string
 */
const toGanZhiYear = function (lYear: number): string {
	let ganKey: number = (lYear - 3) % 10;
	let zhiKey: number = (lYear - 3) % 12;
	if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
	if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
	return Gan[ganKey - 1] + Zhi[zhiKey - 1];
};

/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn string
 */
const toGanZhi = function (offset: number): string {
	return Gan[offset % 10] + Zhi[offset % 12];
};

/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn string
 */
const toHourGanZhi = function (offset: number) {
	var gzDtr = GanZhiHour[offset % 10];
	return gzDtr.split("-");
};

/**
 * 传入农历数字月份返回汉语通俗表示法
 * @param lunar month
 * @return Cn string
 * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
 */
const toChinaMonth = function (m: number): any {
	// 月  \u6708
	if (m > 12 || m < 1) {
		return -1;
	} //若参数错误 返回-1
	let s: string = nStr3[m - 1];
	s += "\u6708"; //加上月字
	return s;
};
/**
 * 传入农历日期数字返回汉字表示法
 * @param lunar day
 * @return Cn string
 * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
 */
const toChinaDay = function (d: number): string {
	//日  \u65e5
	var s: string;
	switch (d) {
		case 10:
			s = "\u521d\u5341";
			break;
		case 20:
			s = "\u4e8c\u5341";
			break;
			break;
		case 30:
			s = "\u4e09\u5341";
			break;
			break;
		default:
			s = nStr2[Math.floor(d / 10)];
			s += nStr1[d % 10];
	}
	return s;
};

/**
 * 获取24节气的方法
 * @param number
 * @return Cn string
 * @eg:
 */
const getSolarTerm = (n: number) => {
	return SolarTerm[n];
};

export {
	lYearDays,
	leapMonth,
	leapDays,
	lMonthDays,
	toGanZhiYear,
	toGanZhi,
	toHourGanZhi,
	toChinaMonth,
	toChinaDay,
	getSolarTerm,
};
