import { Animals, nStr1, SolarMonth, TermInfo } from "../data/Calendar";

/**
 * 返回公历(!)y年m月的天数
 * @param solar Year
 * @return Number (-1、28、29、30、31)
 * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30//月份参数从1至12，参数错误返回-1
 */
const solarDays = function (y: number, m: number): number {
	if (m > 12 || m < 1) {
		console.error("月份参数为1至12");
		return -1;
	}
	let ms: number = m - 1;
	if (ms == 1) {
		//2月份的闰平规律测算后确认返回28或29
		return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
	} else {
		return SolarMonth[ms];
	}
};

/**
 * 返回公历(!)y年m月的第一天是星期几
 * @param solar Year
 * @return Number (-1、28、29、30、31)
 * @eg:var solarFirstWeek = calendar.solarFirstWeek(1987,1) ;//星期四
 */
const solarFirstWeek = function (y: number, m: number): number {
	if (m > 12 || m < 1) {
		console.error("月份参数为1至12");
		return -1;
	}
	let ms = m - 1;
	let solarDate = new Date(y, ms, 1, 0, 0, 0, 0);
	return solarDate.getDay();
};

/**
 * 公历月、日判断所属星座
 * @param  m [公历月]
 * @param  d [公历日]
 * @return Cn string
 */
const toAstro = function (m: number, d: number): string {
	let s: string =
		"\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
	let arr: number[] = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
	return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "\u5ea7"; //座
};

/**
 * 传入公历(!)y年获得该年第n个节气的公历日期
 * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @return day Number
 * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
 */
const getTerm = function (y: number, n: number): number {
	if (y < 1900 || y > 2100) {
		return -1;
	}
	if (n < 1 || n > 24) {
		return -1;
	}
	let _table: string = TermInfo[y - 1900];
	let _info: Array<string> = [
		parseInt("0x" + _table.substr(0, 5)).toString(),
		parseInt("0x" + _table.substr(5, 5)).toString(),
		parseInt("0x" + _table.substr(10, 5)).toString(),
		parseInt("0x" + _table.substr(15, 5)).toString(),
		parseInt("0x" + _table.substr(20, 5)).toString(),
		parseInt("0x" + _table.substr(25, 5)).toString(),
	];
	var _calday: Array<string> = [
		_info[0].substr(0, 1),
		_info[0].substr(1, 2),
		_info[0].substr(3, 1),
		_info[0].substr(4, 2),

		_info[1].substr(0, 1),
		_info[1].substr(1, 2),
		_info[1].substr(3, 1),
		_info[1].substr(4, 2),

		_info[2].substr(0, 1),
		_info[2].substr(1, 2),
		_info[2].substr(3, 1),
		_info[2].substr(4, 2),

		_info[3].substr(0, 1),
		_info[3].substr(1, 2),
		_info[3].substr(3, 1),
		_info[3].substr(4, 2),

		_info[4].substr(0, 1),
		_info[4].substr(1, 2),
		_info[4].substr(3, 1),
		_info[4].substr(4, 2),

		_info[5].substr(0, 1),
		_info[5].substr(1, 2),
		_info[5].substr(3, 1),
		_info[5].substr(4, 2),
	];
	return parseInt(_calday[n - 1]);
};

/**
 * 年份转生肖[!仅能大致转换]  精确划分生肖分界线是“立春”
 * @param y year
 * @return Cn string
 * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
 */
const getAnimal = function (y: number): string {
	return Animals[(y - 4) % 12];
};

/**
 * 数字转中文
 * @param number
 * @return Cn string
 * @eg:var sr = calendar.getAnimal(1987) ;//animal='兔'
 */

const toChinaNum = (num: number) => {
	return nStr1[num];
};

export { solarDays, toChinaNum, solarFirstWeek, toAstro, getTerm, getAnimal };
