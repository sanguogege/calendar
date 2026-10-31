import calendar from "@sanguogege/calendar";
import type { LunarResult } from "@sanguogege/calendar";

/** 取某一天的农历信息，超出 @sanguogege/calendar 支持范围（1900-01-31 ~ 2100-12-31）时返回 null */
export const lunarOf = function (date: Date): LunarResult | null {
  try {
    return calendar.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  } catch {
    return null;
  }
};
