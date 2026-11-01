import calendar from "@sanguogege/calendar";
import type { LunarResult } from "@sanguogege/calendar";
import type { BuildDaysOptions, CalendarDay } from "../types";
import { sameDay } from "./date";

/** 取某一天的农历信息，超出 @sanguogege/calendar 支持范围（1900-01-31 ~ 2100-12-31）时返回 null */
export const lunarOf = function (date: Date): LunarResult | null {
  try {
    return calendar.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  } catch {
    return null;
  }
};

/** 某个年月 1 号是星期几（0 为周日） */
export const firstWeekdayOf = function (year: number, month: number): number {
  return calendar.utils.solarFirstWeek(year, month);
};

/** 格子副标题的取值顺序：节气 > 农历节日 > 公历节日 > 农历日 */
export const subtitleOf = function (day: CalendarDay): string {
  const lunar = day.lunar;
  if (!lunar) return "";
  if (lunar.Term) return lunar.Term;
  if (lunar.Nljr.length > 0) return lunar.Nljr[0] as string;
  if (lunar.Gljr.length > 0) return lunar.Gljr[0] as string;
  if (lunar.lDay === 1) return lunar.LMonthCn;
  return lunar.LDayCn;
};

/** 生成 6 行 × 7 列共 42 个格子的数据 */
export const buildDays = function (options: BuildDaysOptions): CalendarDay[] {
  const offset = (firstWeekdayOf(options.year, options.month) - options.weekStartsOn + 7) % 7;
  const days: CalendarDay[] = [];

  for (let i = 0; i < 42; i++) {
    const date = new Date(options.year, options.month - 1, i - offset + 1);
    const inCurrentMonth =
      date.getMonth() + 1 === options.month && date.getFullYear() === options.year;
    days.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      date,
      inCurrentMonth,
      isToday: sameDay(date, options.today),
      isSelected: options.selected !== null && sameDay(date, options.selected),
      lunar: inCurrentMonth ? lunarOf(date) : null,
    });
  }
  return days;
};
