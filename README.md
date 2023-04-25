<p align="center"> <b>万年历生成器</b> </p>

### web构建工具使用:
`npm i @sanguogege/calendar`

```
import calendar from "yz-calendar";

const today  =  calendar.solar2lunar(2021, 3, 21)

```


### 传统页面直接复制/dist/index.js

```
<script src="./dist/index.js"></script>
<script>
    const today  =  calendar.solar2lunar(2021, 3, 21)
</script>

 ```

### calendar 所有的方法。

##### 这两个是最主要的方法，常用的，还有一个自定义休息与调休日

- solar2lunar(y: number, m: number, d: number)
    - 未传参获得当天，传入阳历年月日获得详细的公历、农历object信息
- lunar2sola(y: number, m: number, d: number, isLeapMonth: boolean)
    - 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息


- Rest 查看当前的休息日与调休日，若没有添加则是插件自带。

- setRest= { } 
    - 设置休息日与调休日
    - 格式为: ` {
        2023:{
            xiu:['0101'],
            ban:['0202,0203'] 
        } 
    }`

- Festival 查看当前的节日信息，若没有添加则是插件自带。

- setFestival= { } 
    - 设置农历、公历节日信息，sFtv为公历，lFtv为农历
    - 格式为: `  {
            sFtv: {
                "0123": ["节日名称"]
            },
            lFtv: {
                "0109": ["节日名称"]
            }
        }`


- lYearDays (y: number) 
    - 返回农历y年一整年的总天数
- leapMonth (y: number)
    - 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
- leapDays (y: number)
    - 返回农历y年闰月的天数 若该年没有闰月则返回0
- lMonthDays(y: number, m: number)
    - 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
- toChinaMonth (m: number)
    - 传入农历数字月份返回汉语通俗表示法
- toChinaDay(d: number)
    - 传入农历日期数字返回汉字表示法
- solarDays (y: number, m: number)
    - 返回公历(!)y年m月的天数
- solarFirstWeek (y: number, m: number)
    - 返回公历(!)y年m月的第一天是星期几
- toAstro(m: number, d: number)
    - 公历月、日判断所属星座
- getAnimal(y: number)
    - 年份转生肖[!仅能大致转换]  精确划分生肖分界线是“立春”
