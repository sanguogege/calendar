import type { CalendarDay } from "../types";
import { subtitleOf } from "../utils/calendar";
import { node } from "../utils/dom";

/** 单个日期格：公历日 + 农历/节气/节日副标题 */
export const createDayCell = function (day: CalendarDay): HTMLButtonElement {
  const cell = node("button", "cui__day");
  cell.type = "button";
  cell.dataset.date = `${day.year}-${day.month}-${day.day}`;
  cell.classList.toggle("is-outside", !day.inCurrentMonth);
  cell.classList.toggle("is-today", day.isToday);
  cell.classList.toggle("is-selected", day.isSelected);
  if (!day.inCurrentMonth) cell.tabIndex = -1;
  if (day.lunar?.Xiu) cell.classList.add("is-rest");

  const subtitle = subtitleOf(day);
  cell.append(
    node("span", "cui__day-num", String(day.day)),
    node("span", "cui__day-sub", subtitle),
  );
  cell.setAttribute("aria-label", `${day.year}-${day.month}-${day.day} ${subtitle}`.trim());
  if (day.isSelected) cell.setAttribute("aria-pressed", "true");

  return cell;
};
