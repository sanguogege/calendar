import {
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
} from "../utils/LunarFunction";

import {
	toAstro,
	getTerm,
	getAnimal,
	solarDays,
	solarFirstWeek,
	toChinaNum,
} from "../utils/SolarFunction";

import { RestDay } from "../utils/SetRest";
import { FestivalDay } from "../utils/SetFestival";

const solar2lunar = function (y: number, m: number, d: number): object {
	//未传参获得当天
	let objDate: Date;
	if (!y) {
		objDate = new Date();
	} else {
		objDate = new Date(y, m - 1, d);
	}
	let i: number,
		leap: number = 0,
		temp: number = 0;
	//修正ymd参数
	(y = objDate.getFullYear()),
		(m = objDate.getMonth() + 1),
		(d = objDate.getDate());
	let offset: number =
		(Date.UTC(
			objDate.getFullYear(),
			objDate.getMonth(),
			objDate.getDate()
		) -
			Date.UTC(1900, 0, 31)) /
		86400000;
	for (i = 1900; i < 2101 && offset > 0; i++) {
		temp = lYearDays(i);
		offset -= temp;
	}
	if (offset < 0) {
		offset += temp;
		i--;
	}

	//是否今天
	let isTodayObj: Date = new Date(),
		isToday: boolean = false;
	if (
		isTodayObj.getFullYear() == y &&
		isTodayObj.getMonth() + 1 == m &&
		isTodayObj.getDate() == d
	) {
		isToday = true;
	}
	//星期几
	var nWeek: number = objDate.getDay(),
		cWeek: string = toChinaNum(nWeek);
	//数字表示周几顺应天朝周一开始的惯例
	if (nWeek == 0) {
		nWeek = 7;
	}
	//农历年
	let year: number = i;
	leap = leapMonth(i); //闰哪个月
	let isLeap = false;

	//效验闰月
	for (i = 1; i < 13 && offset > 0; i++) {
		//闰月
		if (leap > 0 && i == leap + 1 && isLeap == false) {
			--i;
			isLeap = true;
			temp = leapDays(year); //计算农历闰月天数
		} else {
			temp = lMonthDays(year, i); //计算农历普通月天数
		}
		//解除闰月
		if (isLeap == true && i == leap + 1) {
			isLeap = false;
		}
		offset -= temp;
	}
	// 闰月导致数组下标重叠取反
	if (offset == 0 && leap > 0 && i == leap + 1) {
		if (isLeap) {
			isLeap = false;
		} else {
			isLeap = true;
			--i;
		}
	}
	if (offset < 0) {
		offset += temp;
		--i;
	}
	//农历月
	let month: number = i;
	//农历日
	let day: number = offset + 1;
	//天干地支处理
	let sm: number = m - 1;
	let gzY: string = toGanZhiYear(year);

	// 当月的两个节气
	let firstNode: number = getTerm(y, m * 2 - 1); //返回当月「节」为几日开始
	let secondNode: number = getTerm(y, m * 2); //返回当月「节」为几日开始

	// 依据12节气修正干支月
	let gzM: string = toGanZhi((y - 1900) * 12 + m + 11);
	if (d >= firstNode) {
		gzM = toGanZhi((y - 1900) * 12 + m + 12);
	}

	//传入的日期的节气与否,有则值，没有则为null
	let Term: any = null;
	if (firstNode == d) {
		Term = getSolarTerm(m * 2 - 2);
	}
	if (secondNode == d) {
		Term = getSolarTerm(m * 2 - 1);
	}
	//日柱 当月一日与 1900/1/1 相差天数
	let dayCyclical: number =
		Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	let gzD: string = toGanZhi(dayCyclical + d - 1);

	// 二十四小时对应的天干地支
	let gzH = toHourGanZhi(dayCyclical + d - 1);

	//该日期所属的星座
	let astro: string = toAstro(m, d);
	// 设置公里节日
	const GAll = FestivalDay(m, d, calendar.setFestival);
	const NAll = FestivalDay(month, day, calendar.setFestival, false);
	let Gljr = GAll.FDays;
	let Nljr = NAll.FDays;
	calendar.Festival = {
		sFtv: GAll.Festival,
		lFtv: NAll.Festival,
	};
	let XiuBox = RestDay(y, m, d, calendar.setRest);
	calendar.Rest = XiuBox.newRest;
	// 用于设置上个月
	return {
		Xiu: XiuBox.Xiu,
		Ban: XiuBox.Ban,
		Gljr: Gljr,
		Nljr: Nljr,
		lYear: year,
		lMonth: month,
		lDay: day,
		Animal: getAnimal(year),
		LMonthCn: (isLeap ? "\u95f0" : "") + toChinaMonth(month),
		LDayCn: toChinaDay(day),
		cYear: y,
		cMonth: m,
		cDay: d,
		gzYear: gzY,
		gzMonth: gzM,
		gzDay: gzD,
		gzHour: gzH,
		isToday: isToday,
		isLeap: isLeap,
		nWeek: nWeek,
		ncWeek: "\u661f\u671f" + cWeek,
		Term: Term,
		astro: astro,
	};
};

const lunar2solar = function (
	y: number,
	m: number,
	d: number,
	isLeapMonth: boolean
): any {
	//参数区间1900.1.31~2100.12.1
	isLeapMonth = !!isLeapMonth;
	let leapM: any = leapMonth(y);
	if (isLeapMonth && leapM != m) {
		return -1;
	} //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
	if ((y == 2100 && m == 12 && d > 1) || (y == 1900 && m == 1 && d < 31)) {
		return -1;
	} //超出了最大极限值
	let day: number = lMonthDays(y, m);
	let _day: number = day;
	//bugFix 2016-9-25
	//if month is leap, _day use leapDays method
	if (isLeapMonth) {
		_day = leapDays(y);
	}
	if (y < 1900 || y > 2100 || d > _day) {
		return -1;
	} //参数合法性效验

	//计算农历的时间差
	let offset: number = 0;
	for (let i = 1900; i < y; i++) {
		offset += lYearDays(i);
	}
	let leap: number = 0,
		isAdd: boolean = false;
	for (let i = 1; i < m; i++) {
		leap = leapMonth(y);
		if (!isAdd) {
			//处理闰月
			if (leap <= i && leap > 0) {
				offset += leapDays(y);
				isAdd = true;
			}
		}
		offset += lMonthDays(y, i);
	}
	//转换闰月农历 需补充该年闰月的前一个月的时差
	if (isLeapMonth) {
		offset += day;
	}
	//1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
	let stmap: number = Date.UTC(1900, 1, 30, 0, 0, 0);
	let calObj: Date = new Date((offset + d - 31) * 86400000 + stmap);
	let cY: number = calObj.getUTCFullYear();
	let cM: number = calObj.getUTCMonth() + 1;
	let cD: number = calObj.getUTCDate();

	return solar2lunar(cY, cM, cD);
};

const calendar = {
	setRest: {},
	Rest: {},
	setFestival: {},
	Festival: {},
	lYearDays,
	leapMonth,
	leapDays,
	lMonthDays,
	toChinaMonth,
	toChinaDay,
	solarDays,
	solarFirstWeek,
	toAstro,
	getAnimal,
	solar2lunar,
	lunar2solar,
};

export default calendar;
