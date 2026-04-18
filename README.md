
[![NPM Version](https://img.shields.io/npm/v/@sanguogege/calendar.svg?style=for-the-badge)](https://www.npmjs.com/package/@sanguogege/calendar)
[![](https://img.shields.io/npm/dm/@sanguogege/calendar.svg?style=for-the-badge)](https://www.npmjs.com/package/@sanguogege/calendar)



<p align="center"> <b>万年历生成器</b> </p>

### web构建工具使用:
`npm i @sanguogege/calendar`

```
import calendar from "@sanguogege/calendar";

const today  =  calendar.solar2lunar(2021, 3, 21)

```


# Calendar 插件使用说明书 (v1.4.0)

## 1. 插件初始化与数据注入

```typescript
import calendar from '@sanguogege/calendar';

// 准备你的节假日 JSON 数据（可从后端接口获取）
const holidayConfig = {
    setFestival: {
        sFtv: { 
            "0419": ["项目上线日", "程序员节"],
            "1024": ["1024 程序员日"]
        },
        lFtv: { 
            "0101": ["春节"],
            "0815": ["中秋节"]
        }
    },
    setRest: {
        "2026": {
            "xiu": ["0101", "0102", "0103"],
            "ban": ["0104"]
        }
    }
};

// 注入数据：插件会自动与本地内置数据合并并去重
calendar.setHolidays(holidayConfig);
```

## 2. 核心查询方法

```typescript
// --- 公历转农历 ---
// 参数：年, 月, 日 (不传参则默认当天)
const result = calendar.solarToLunar(2026, 4, 19);

/**
 * 返回值说明 (LunarResult 接口):
 * result.Xiu      - {boolean} 是否休息
 * result.Ban      - {boolean} 是否调休补班
 * result.Gljr     - {string[]} 公历节日数组 (如 ["元旦"])
 * result.Nljr     - {string[]} 农历节日数组 (如 ["春节"])
 * result.lYear    - {number}  农历年
 * result.lMonth   - {number}  农历月
 * result.lDay     - {number}  农历日
 * result.LMonthCn - {string}  农历月中文 (如 "三月")
 * result.LDayCn   - {string}  农历日中文 (如 "初三")
 * result.Animal   - {string}  生肖
 * result.gzYear   - {string}  干支年
 * result.gzMonth  - {string}  干支月
 * result.gzDay    - {string}  干支日
 * result.Term     - {string|null} 节气 (如 "谷雨")
 * result.astro    - {string}  星座
 * result.ncWeek   - {string}  星期中文 (如 "星期日")
 */

// --- 农历转公历 ---
// 参数：农历年, 农历月, 农历日, 是否闰月
const solar = calendar.lunarToSolar(2026, 3, 3, false);

```

## 3. 工具类方法

```typescript
// --- 生肖与星座 ---
// 获取生肖：输入公历年份
calendar.utils.getAnimal(2026); 
// => "马"

// 获取星座：输入公历月份、日期
calendar.utils.toAstro(4, 19); 
// => "白羊座"


// --- 农历年/月/日 属性查询 ---
// 查询农历某年的总天数
calendar.utils.lYearDays(2026); 
// => 354 (或 384/385 如果该年有闰月)

// 查询农历某月的天数（不含闰月）
// 参数：农历年, 农历月
calendar.utils.lMonthDays(2026, 3); 
// => 30 (大月30天，小月29天)

// 查询某年闰哪个月
calendar.utils.leapMonth(2026); 
// => 0 (如果不闰月返回 0，闰几月返回几)

// 查询某年闰月的天数
calendar.utils.leapDays(2026); 
// => 0 (如果不闰月返回 0，闰月则返回 29 或 30)


// --- 公历月度属性 ---
// 查询公历某月的天数
calendar.utils.solarDays(2026, 2); 
// => 28 (会自动计算闰年)

// 查询公历某月第一天是星期几
// 返回值：0 代表周日，1-6 代表周一至周六
calendar.utils.solarFirstWeek(2026, 4); 
// => 3 (表示 2026-04-01 是周三)


// --- 中文格式化工具 ---
// 数字月份转农历中文月份
calendar.utils.toChinaMonth(3); 
// => "三月" (如果是1月返回"正月"，11月"冬月"，12月"腊月")

// 数字日期转农历中文日期
calendar.utils.toChinaDay(3); 
// => "初三"

// 数字日期转农历中文日期（针对月份名称等通用转换）
calendar.utils.toChinaNum(3);
// => "三"

```

## 4. JSON 数据维护规范

```json

{
  "setFestival": {
    "sFtv": { "MMDD": ["节日名称"] }, // 公历节日
    "lFtv": { "MMDD": ["节日名称"] }  // 农历节日
  },
  "setRest": {
    "YYYY": {
      "xiu": ["MMDD", "MMDD"], // 该年份下的休息日期
      "ban": ["MMDD", "MMDD"]  // 该年份下的补班日期
    }
  }
}

```