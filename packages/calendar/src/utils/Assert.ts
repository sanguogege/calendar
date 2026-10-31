/**
 * 统一的参数错误工厂与类型守卫
 */

/** 四位 "MMDD"，月份 01-12、日期 01-31 */
export const MMDD_RE = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

/** 抛出带位置信息的 TypeError，用于配置格式错误 */
export const failType = function (path: string, message: string): never {
  throw new TypeError(`[calendar] ${path} ${message}`);
};

/** 抛出带位置信息的 RangeError，用于数值越界 */
export const failRange = function (path: string, message: string): never {
  throw new RangeError(`[calendar] ${path} ${message}`);
};

/** 是否为普通对象（非 null、非数组） */
export const isPlainObject = function (value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/** 把任意值格式化成便于排查的短字符串 */
export const describe = function (value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  ) {
    return String(value);
  }
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>);
    return `Object(keys: ${keys.slice(0, 5).join(", ")}${keys.length > 5 ? ", …" : ""})`;
  }
  return typeof value;
};

/** 校验一个整数并返回它 */
export const assertInteger = function (
  path: string,
  value: unknown,
  min: number,
  max: number,
): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return failRange(path, `必须是整数，收到 ${describe(value)}`);
  }
  if (value < min || value > max) {
    return failRange(path, `必须在 ${min}-${max} 之间，收到 ${value}`);
  }
  return value;
};
