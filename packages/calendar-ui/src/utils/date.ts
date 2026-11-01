import type { YearMonth } from "../types";

/** 同一天（只比年月日，忽略时分秒） */
export const sameDay = function (a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/** 把年月规范成合法值，月份越界时自动进位/退位 */
export const normalizeMonth = function (year: number, month: number): YearMonth {
  const date = new Date(year, month - 1, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
};
