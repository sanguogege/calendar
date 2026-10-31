---
"@sanguogege/calendar": major
---

2.0.0：修掉一批会静默返回错误结果的问题，并统一了配置与节假日的语义。

### 破坏性变更

- 非法入参一律抛异常：越界日期、不存在的日期（如 2 月 30 日）、只传部分参数、闰月不匹配，都改抛 `RangeError`；不再静默回退成“今天”、不再自动进位、`lunarToSolar` 不再返回 `-1`。
- `gzYear` 改为以立春为界，与 `gzMonth` 口径一致；同一时刻不会再出现“乙巳年 + 庚寅月”这种不存在的组合。需要按正月初一换年的用新增的 `gzYearLunar`。
- `Xiu` 现在表示“是否休息”，包含周末并扣除调休补班日；新增 `isWeekend`、`isWorkday`、`dayOfWeek` 字段。
- `setRest` 由“整年覆盖”改为“按年、按列表合并”。
- 新增 `resetHolidays()`、`getHolidays()`；`setHolidays(config, { replace: true })` 可丢弃内置数据。

### 修复

- 除夕改为按“腊月最后一天”计算，腊月为小月的年份（2022、2025、2026、2027 等）不再漏掉除夕。
- 母亲节 / 父亲节 / 感恩节改为按规则计算，不再写死成某一年的日期。
- 节日数据修正：世界微笑日移到 5 月 8 日，寒衣节移到农历十月初一。
- 修复星座名错字（摩羯座、天秤座）与星座边界日期（4/20、10/23）。
- `setHolidays` 不再原地改写内置 JSON：自定义节日无法撤销、重复调用不断叠加的问题解决。
- 配置校验失败会立刻抛 `TypeError` 并带出字段路径。
- 农历表越界（如 `lYearDays(1899)`）抛 `RangeError`，不再返回 348 之类的假数据。
- `utils` 补齐 `toChinaNum`、`getTerm`、`getSolarTerm`、`toGanZhi`、`toGanZhiYear`、`toHourGanZhi`、`nthWeekdayOfMonth`。
- 内部换算改用 UTC 毫秒数，跨时区结果一致。
- 打包保持 1.x 的产物形态：`index.mjs` / `index.cjs` / `index.umd.js` / `index.iife.js` 与 `.d.mts` / `.d.cts`，全局变量名仍是 `calendar`。
- 补充 vitest 用例：73,384 天公历/农历往返、干支年月一致性、闰月、边界、配置合并与校验。
