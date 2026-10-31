import festivalJson from "./data/festival.json";
import restJson from "./data/rest.json";
import { describe, failType, isPlainObject } from "./utils/Assert";
import { freezeFestivalMap, mergeFestivalMap, normalizeFestivalMap } from "./utils/SetFestival";
import { buildRestIndex, freezeRestMap, mergeRestMap, normalizeRestMap } from "./utils/SetRest";
import type { FestivalMap, HolidayConfig, HolidaySnapshot, SetHolidayOptions } from "./types";
import type { RestIndex, RestMap } from "./utils/SetRest";

/** 真正用于查询的、已经合并并预建索引的配置 */
export interface ResolvedConfig {
  sFtv: FestivalMap;
  lFtv: FestivalMap;
  rest: RestMap;
  restIndex: RestIndex;
}

const createResolved = function (
  sFtv: FestivalMap,
  lFtv: FestivalMap,
  rest: RestMap,
): ResolvedConfig {
  const frozenRest = freezeRestMap(rest);
  return {
    sFtv: freezeFestivalMap(sFtv),
    lFtv: freezeFestivalMap(lFtv),
    rest: frozenRest,
    restIndex: buildRestIndex(frozenRest),
  };
};

/**
 * 内置数据在模块加载时就校验一遍，数据写错会立刻抛错而不是在运行时返回脏值
 */
const FESTIVAL_DATA = festivalJson as unknown as Record<string, unknown>;

const BASE = createResolved(
  normalizeFestivalMap(FESTIVAL_DATA.sFtv, "data/festival.json.sFtv"),
  normalizeFestivalMap(FESTIVAL_DATA.lFtv, "data/festival.json.lFtv"),
  normalizeRestMap(restJson, "data/rest.json"),
);

const EMPTY = createResolved({}, {}, {});

let current: ResolvedConfig = BASE;

/** 取当前生效的配置（内部使用，调用方不应直接改它） */
const getResolvedConfig = function (): ResolvedConfig {
  return current;
};

const FESTIVAL_FIELDS = ["sFtv", "lFtv"];
const HOLIDAY_FIELDS = ["setFestival", "setRest"];

/**
 * 注入自定义节日与调休数据。
 *
 * 默认是与内置数据“合并去重”，不会修改内置数据，也不会修改你传入的对象；
 * 重复调用会继续叠加，想回到初始状态用 resetHolidays()。
 *
 * @param config 要注入的数据
 * @param options replace 为 true 时丢弃内置数据，只使用传入的数据
 * @throws TypeError 配置格式不合法（含具体字段路径）
 */
const setHolidays = function (config: HolidayConfig = {}, options: SetHolidayOptions = {}): void {
  if (!isPlainObject(config)) {
    failType("setHolidays", `参数必须是对象，收到 ${describe(config)}`);
  }
  Object.keys(config).forEach(function (key) {
    if (HOLIDAY_FIELDS.indexOf(key) === -1) {
      failType(`setHolidays.${key}`, `不认识的字段，只支持 ${HOLIDAY_FIELDS.join(" 与 ")}`);
    }
  });
  if (!isPlainObject(options)) {
    failType("setHolidays(options)", `第二个参数必须是对象，收到 ${describe(options)}`);
  }
  if (options.replace !== undefined && typeof options.replace !== "boolean") {
    failType("setHolidays(options).replace", `必须是布尔值，收到 ${describe(options.replace)}`);
  }
  const replace = options.replace === true;
  const base = replace ? EMPTY : current;

  const festivalConfig = config.setFestival;
  let sFtv = base.sFtv;
  let lFtv = base.lFtv;
  if (festivalConfig !== undefined) {
    if (!isPlainObject(festivalConfig)) {
      failType("setHolidays.setFestival", `必须是对象，收到 ${describe(festivalConfig)}`);
    }
    Object.keys(festivalConfig).forEach(function (key) {
      if (FESTIVAL_FIELDS.indexOf(key) === -1) {
        failType(
          `setHolidays.setFestival.${key}`,
          `不认识的字段，只支持 ${FESTIVAL_FIELDS.join(" 与 ")}`,
        );
      }
    });
    if (festivalConfig.sFtv !== undefined) {
      sFtv = mergeFestivalMap(
        base.sFtv,
        normalizeFestivalMap(festivalConfig.sFtv, "setHolidays.setFestival.sFtv"),
      );
    }
    if (festivalConfig.lFtv !== undefined) {
      lFtv = mergeFestivalMap(
        base.lFtv,
        normalizeFestivalMap(festivalConfig.lFtv, "setHolidays.setFestival.lFtv"),
      );
    }
  }

  const restConfig = config.setRest;
  const rest =
    restConfig === undefined
      ? base.rest
      : mergeRestMap(base.rest, normalizeRestMap(restConfig, "setHolidays.setRest"));

  current = createResolved(sFtv, lFtv, rest);
};

/** 恢复到内置数据 */
const resetHolidays = function (): void {
  current = BASE;
};

/**
 * 取当前生效的节假日配置的深拷贝，可再次传给 setHolidays()
 */
const getHolidays = function (): HolidaySnapshot {
  const cloneMap = function (map: FestivalMap): FestivalMap {
    const result: FestivalMap = {};
    Object.keys(map).forEach(function (key) {
      result[key] = map[key].slice();
    });
    return result;
  };
  const result: HolidaySnapshot = {
    setFestival: {
      sFtv: cloneMap(current.sFtv),
      lFtv: cloneMap(current.lFtv),
    },
    setRest: {},
  };
  Object.keys(current.rest).forEach(function (year) {
    result.setRest[year] = {
      xiu: current.rest[year].xiu.slice(),
      ban: current.rest[year].ban.slice(),
    };
  });
  return result;
};

export { setHolidays, resetHolidays, getHolidays, getResolvedConfig };
