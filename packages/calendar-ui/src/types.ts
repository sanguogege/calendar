import type { LunarResult } from "@sanguogege/calendar";

/** 日历中的一格 */
export interface CalendarDay {
  /** 公历年 */
  year: number;
  /** 公历月，1-12 */
  month: number;
  /** 公历日 */
  day: number;
  /** 该格对应的日期对象（本地时区） */
  date: Date;
  /** 是否属于当前展示的月份（false 表示上一月/下一月的补位格） */
  inCurrentMonth: boolean;
  /** 是否今天 */
  isToday: boolean;
  /** 是否当前选中 */
  isSelected: boolean;
  /** @sanguogege/calendar 的换算结果，补位格为 null */
  lunar: LunarResult | null;
}

/** 创建日历时的配置 */
export interface CalendarOptions {
  /** 初始日期，默认今天 */
  initialDate?: Date;
  /** 一周从哪天开始：0 为周日，1 为周一，默认 1 */
  weekStartsOn?: 0 | 1;
  /** 选中某一天时触发 */
  onSelect?: (day: CalendarDay) => void;
  /** 切换月份时触发 */
  onMonthChange?: (year: number, month: number) => void;
}

/** 返回的实例 */
export interface CalendarInstance {
  /** 日历根元素，方便外部定位或再挂样式 */
  readonly el: HTMLElement;
  /** 跳到某年某月 */
  setMonth(year: number, month: number): void;
  /** 当前展示的年月 */
  getMonth(): { year: number; month: number };
  /** 选中某个日期 */
  select(date: Date): void;
  /** 当前选中的日期 */
  getSelected(): Date | null;
  /** 移除 DOM 与事件监听 */
  destroy(): void;
}
