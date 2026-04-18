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
} from "./utils/LunarFunction";

import {
	toAstro,
	getTerm,
	getAnimal,
	solarDays,
	solarFirstWeek,
	toChinaNum,
} from "./utils/SolarFunction";

import { RestDay } from "./utils/SetRest";
import { FestivalDay } from "./utils/SetFestival";


const UTC_1900_0_31 = Date.UTC(1900, 0, 31);
const UTC_1900_1_30 = Date.UTC(1900, 1, 30, 0, 0, 0);

export interface LunarResult {
	Xiu: boolean;       // 当天是否休息
	Ban: boolean;       // 当天是否调休加班
	Gljr: string[];     // 公历节日
	Nljr: string[];     // 农历节日
	lYear: number;      // 农历年
	lMonth: number;     // 农历月
	lDay: number;       // 农历日
	Animal: string;     // 生肖
	LMonthCn: string;   // 农历月中文名
	LDayCn: string;     // 农历日中文名
	cYear: number;      // 公历年
	cMonth: number;     // 公历月
	cDay: number;       // 公历日
	gzYear: string;     // 干支年
	gzMonth: string;    // 干支月
	gzDay: string;      // 干支日
	gzHour: string[];   // 当天各时段干支
	isToday: boolean;   // 是否今天
	isLeap: boolean;    // 是否闰月
	nWeek: number;      // 星期(数字)
	ncWeek: string;     // 星期(中文)
	Term: string | null;// 节气
	astro: string;      // 星座
}


let globalConfig = {
	setFestival: {
		sFtv: {} as Record<string, string[]>,
		lFtv: {} as Record<string, string[]>
	},
	setRest: {} as any
};


const solarToLunar = function (y?: number, m?: number, d?: number): LunarResult {
	const objDate = (!y || !m || !d) ? new Date() : new Date(y, m - 1, d);
	const currentY = objDate.getFullYear();
	const currentM = objDate.getMonth() + 1;
	const currentD = objDate.getDate();

	let i: number, leap: number = 0, temp: number = 0;
	let offset = (Date.UTC(currentY, currentM - 1, currentD) - UTC_1900_0_31) / 86400000;

	for (i = 1900; i < 2101 && offset > 0; i++) {
		temp = lYearDays(i);
		offset -= temp;
	}
	if (offset < 0) { offset += temp; i--; }

	const year = i;
	leap = leapMonth(i);
	let isLeap = false;

	for (i = 1; i < 13 && offset > 0; i++) {
		if (leap > 0 && i === leap + 1 && !isLeap) {
			--i; isLeap = true; temp = leapDays(year);
		} else {
			temp = lMonthDays(year, i);
		}
		if (isLeap && i === leap + 1) isLeap = false;
		offset -= temp;
	}

	if (offset === 0 && leap > 0 && i === leap + 1) {
		isLeap = !isLeap;
		if (isLeap) --i;
	}
	if (offset < 0) { offset += temp; --i; }

	const month = i;
	const day = offset + 1;
	const sm = currentM - 1;

	// 获取节日和调休状态 (使用内部配置计算，但不向外透传配置全文)
	const GAll = FestivalDay(currentM, currentD, globalConfig.setFestival, true);
	const NAll = FestivalDay(month, day, globalConfig.setFestival, false);
	const XiuBox = RestDay(currentY, currentM, currentD, globalConfig.setRest);

	const dayCyclical = Date.UTC(currentY, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	const firstNode = getTerm(currentY, currentM * 2 - 1);
	const secondNode = getTerm(currentY, currentM * 2);

	let Term: string | null = null;
	if (firstNode === currentD) Term = getSolarTerm(currentM * 2 - 2);
	if (secondNode === currentD) Term = getSolarTerm(currentM * 2 - 1);

	return {
		Xiu: XiuBox.Xiu,
		Ban: XiuBox.Ban,
		Gljr: GAll.FDays || [],
		Nljr: NAll.FDays || [],
		lYear: year,
		lMonth: month,
		lDay: day,
		Animal: getAnimal(year),
		LMonthCn: (isLeap ? "闰" : "") + toChinaMonth(month),
		LDayCn: toChinaDay(day),
		cYear: currentY,
		cMonth: currentM,
		cDay: currentD,
		gzYear: toGanZhiYear(year),
		gzMonth: toGanZhi((currentY - 1900) * 12 + currentM + (currentD >= firstNode ? 12 : 11)),
		gzDay: toGanZhi(dayCyclical + currentD - 1),
		gzHour: toHourGanZhi(dayCyclical + currentD - 1),
		isToday: new Date().toDateString() === objDate.toDateString(),
		isLeap,
		nWeek: objDate.getDay() === 0 ? 7 : objDate.getDay(),
		ncWeek: "星期" + toChinaNum(objDate.getDay()),
		Term,
		astro: toAstro(currentM, currentD)
	};
};

/**
 * 农历转公历
 */
const lunarToSolar = function (y: number, m: number, d: number, isLeapMonth?: boolean): LunarResult | -1 {
	const _isLeapMonth = !!isLeapMonth;
	const leapM = leapMonth(y);
	if (_isLeapMonth && leapM !== m) return -1;

	const day = lMonthDays(y, m);
	let _day = _isLeapMonth ? leapDays(y) : day;
	if (y < 1900 || y > 2100 || d > _day) return -1;

	let offset = 0;
	for (let i = 1900; i < y; i++) offset += lYearDays(i);

	let isAdd = false;
	for (let i = 1; i < m; i++) {
		const leap = leapMonth(y);
		if (!isAdd && leap <= i && leap > 0) {
			offset += leapDays(y);
			isAdd = true;
		}
		offset += lMonthDays(y, i);
	}
	if (_isLeapMonth) offset += day;

	const calObj = new Date((offset + d - 31) * 86400000 + UTC_1900_1_30);
	return solarToLunar(calObj.getUTCFullYear(), calObj.getUTCMonth() + 1, calObj.getUTCDate());
};

const calendar = {
	setHolidays(data: { setFestival?: any, setRest?: any }) {
		if (data.setFestival) globalConfig.setFestival = data.setFestival;
		if (data.setRest) globalConfig.setRest = data.setRest;
	},
	solarToLunar,
	lunarToSolar,
	utils: {
		lYearDays, leapMonth, leapDays, lMonthDays,
		toChinaMonth, toChinaDay, solarDays, solarFirstWeek,
		toAstro, getAnimal
	}
};

export default calendar;