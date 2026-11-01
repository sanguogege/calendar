/** 一周从哪天开始：0 为周日，1 为周一 */
export type WeekStartsOn = 0 | 1;

/** 规范后的年月 */
export interface YearMonth {
  year: number;
  month: number;
}

/** buildDays 的入参 */
export interface BuildDaysOptions {
  /** 公历年 */
  year: number;
  /** 公历月，1-12 */
  month: number;
  /** 一周从哪天开始 */
  weekStartsOn: WeekStartsOn;
  /** 今天 */
  today: Date;
  /** 当前选中的日期，未选中传 null */
  selected: Date | null;
}
