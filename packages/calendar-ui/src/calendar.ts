import calendar from "@sanguogege/calendar";
import { WEEKDAY_CN, WEEKDAY_EN } from "./constants/weekday";
import type { CalendarDay, CalendarInstance, CalendarOptions } from "./types";
import { sameDay } from "./utils/date";
import { node } from "./utils/dom";
import { lunarOf } from "./utils/lunar";

/**
 * 在容器里创建一个日历
 *
 * 只依赖 DOM，不依赖任何框架；重复调用 createCalendar 会各自独立。
 */
export function createCalendar(
  container: HTMLElement,
  options: CalendarOptions = {},
): CalendarInstance {
  const weekStartsOn = options.weekStartsOn ?? 1;
  const today = new Date();
  const initial = options.initialDate ?? today;

  const state = {
    year: initial.getFullYear(),
    month: initial.getMonth() + 1,
    selected: new Date(initial.getFullYear(), initial.getMonth(), initial.getDate()),
  };

  const root = node("div", "cui");
  const header = node("div", "cui__header");
  const prev = node("button", "cui__nav", "‹");
  const next = node("button", "cui__nav", "›");
  const title = node("div", "cui__title");
  const weekdays = node("div", "cui__weekdays");
  const grid = node("div", "cui__grid");

  prev.type = "button";
  next.type = "button";
  prev.setAttribute("aria-label", "上个月");
  next.setAttribute("aria-label", "下个月");
  header.append(prev, title, next);
  root.append(header, weekdays, grid);
  container.appendChild(root);

  // 星期表头按起始日轮转
  for (let i = 0; i < 7; i++) {
    const weekday = (weekStartsOn + i) % 7;
    const cell = node("div", "cui__weekday", WEEKDAY_CN[weekday]);
    cell.title = WEEKDAY_EN[weekday] as string;
    weekdays.appendChild(cell);
  }

  /** 生成 6 行 × 7 列的格子数据 */
  const buildDays = function (): CalendarDay[] {
    const firstWeekday = calendar.utils.solarFirstWeek(state.year, state.month);
    const offset = (firstWeekday - weekStartsOn + 7) % 7;
    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(state.year, state.month - 1, i - offset + 1);
      const day: CalendarDay = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        date,
        inCurrentMonth: date.getMonth() + 1 === state.month && date.getFullYear() === state.year,
        isToday: sameDay(date, today),
        isSelected: state.selected !== null && sameDay(date, state.selected),
        lunar: null,
      };
      if (day.inCurrentMonth) {
        day.lunar = lunarOf(date);
      }
      days.push(day);
    }
    return days;
  };

  /** 格子副标题的取值顺序：节气 > 农历节日 > 公历节日 > 农历日 */
  const subtitleOf = function (day: CalendarDay): string {
    const lunar = day.lunar;
    if (!lunar) return "";
    if (lunar.Term) return lunar.Term;
    if (lunar.Nljr.length > 0) return lunar.Nljr[0] as string;
    if (lunar.Gljr.length > 0) return lunar.Gljr[0] as string;
    if (lunar.lDay === 1) return lunar.LMonthCn;
    return lunar.LDayCn;
  };

  const render = function () {
    title.textContent = `${state.year} 年 ${state.month} 月`;
    grid.replaceChildren();

    for (const day of buildDays()) {
      const cell = node("button", "cui__day");
      cell.type = "button";
      cell.dataset.date = `${day.year}-${day.month}-${day.day}`;
      cell.classList.toggle("is-outside", !day.inCurrentMonth);
      cell.classList.toggle("is-today", day.isToday);
      cell.classList.toggle("is-selected", day.isSelected);
      if (!day.inCurrentMonth) cell.tabIndex = -1;
      if (day.lunar?.Xiu) cell.classList.add("is-rest");

      const num = node("span", "cui__day-num", String(day.day));
      const sub = node("span", "cui__day-sub", subtitleOf(day));
      cell.append(num, sub);
      cell.setAttribute(
        "aria-label",
        `${day.year}-${day.month}-${day.day} ${subtitleOf(day)}`.trim(),
      );
      if (day.isSelected) cell.setAttribute("aria-pressed", "true");

      grid.appendChild(cell);
    }
  };

  const emitSelect = function () {
    if (!options.onSelect) return;
    const day = buildDays().find(
      (item) =>
        item.year === state.selected?.getFullYear() &&
        item.month === (state.selected?.getMonth() ?? 0) + 1 &&
        item.day === state.selected?.getDate(),
    );
    if (day) options.onSelect(day);
  };

  const goTo = function (year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    state.year = date.getFullYear();
    state.month = date.getMonth() + 1;
    render();
    options.onMonthChange?.(state.year, state.month);
  };

  const onPrev = () => goTo(state.year, state.month - 1);
  const onNext = () => goTo(state.year, state.month + 1);

  const onClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(".cui__day");
    if (!target || !target.dataset.date) return;
    const [year, month, day] = target.dataset.date.split("-").map(Number) as [
      number,
      number,
      number,
    ];
    state.selected = new Date(year, month - 1, day);
    if (!target.classList.contains("is-outside")) {
      state.year = year;
      state.month = month;
    }
    render();
    emitSelect();
  };

  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);
  grid.addEventListener("click", onClick);
  render();

  return {
    el: root,
    setMonth: goTo,
    getMonth: () => ({ year: state.year, month: state.month }),
    select: (date: Date) => {
      state.selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      state.year = date.getFullYear();
      state.month = date.getMonth() + 1;
      render();
      emitSelect();
    },
    getSelected: () => (state.selected ? new Date(state.selected) : null),
    destroy: () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      grid.removeEventListener("click", onClick);
      root.remove();
    },
  };
}
