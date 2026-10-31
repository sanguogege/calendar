# @sanguogege/calendar

## 1.4.1

### Patch Changes

- 1

## 1.4.0

### Minor Changes

- c427834: 本次更新将插件升级为 **“数据驱动”** 模式，通过 JSON 配置与逻辑分离，使其完美适配所有 Web 开发环境（Vue, React, 原生 JS 等）。

  ### 🛠 核心改动
  1.  **逻辑与数据解耦**：

      - 源码不再硬编码变动的节假日，改由 `globalConfig` 统一管理。
      - 通过 `setHolidays()` 接口动态注入远程或本地 JSON 数据。

  2.  **无损合并算法**：

      - **节日合并**：使用 `checkData` 逻辑，将外部数据与本地基础数据进行去重合并，不再是简单的覆盖。
      - **调休合并**：支持按年（Year-based）批量注入 `xiu`（休）和 `ban`（班）名单。

  3.  **TS 类型定义**：
      - 完整定义了 `LunarResult` 接口，提供精确的 IDE 智能提示。
      - 移除了不必要的中间状态返回，确保 API 只输出当前日期相关的数据。

## 1.3.10

### Patch Changes

- fix: del useless function

- this will the last version in sometime later.

- a good project to test

## 1.3.9

### Patch Changes

- bun run --workspaces build

## 1.3.8

### Patch Changes

- 0080de2: just change version

## 1.3.7

### Patch Changes

- 8241540: add one

## 1.3.6

### Patch Changes

- add a func

## 1.3.5

### Patch Changes

- fix: function better

## 1.3.4

### Patch Changes

- change some type and clean

## 1.3.3

### Patch Changes

- fix:function work done

## 1.3.2

### Patch Changes

- add dist

## 1.3.1

### Patch Changes

- 0460657: 1.3.1

## 1.3.0

### Minor Changes

- fix: code error

### Patch Changes

- c246d62: add

## 1.2.7

### Patch Changes

- fix: function

## 1.2.6

### Patch Changes

- fix:substr to slice

## 1.2.5

### Patch Changes

- change version

## 1.2.4

### Patch Changes

- add

## 1.2.3

### Patch Changes

- cdd043a: change something
