import type { CalendarDay, GridHandle, GridOptions } from "../types";
import { node } from "../utils/dom";
import { createDayCell } from "./day";

/** 日期网格：负责渲染格子与点击事件委托 */
export const createGrid = function (options: GridOptions): GridHandle {
  const el = node("div", "cui__grid");
  let days: CalendarDay[] = [];

  const onClick = (event: MouseEvent) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>(".cui__day");
    if (!cell || !cell.dataset.date) return;

    const [year, month, day] = cell.dataset.date.split("-").map(Number) as [number, number, number];
    const picked = days.find(
      (item) => item.year === year && item.month === month && item.day === day,
    );
    if (picked) options.onSelect(picked);
  };

  el.addEventListener("click", onClick);

  return {
    el,
    render: (next: CalendarDay[]) => {
      days = next;
      el.replaceChildren(...next.map(createDayCell));
    },
    destroy: () => el.removeEventListener("click", onClick),
  };
};
