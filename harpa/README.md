# HARPA AI Premium Bypass

## 两种方案

| 方案           | 持久性  | 说明          |
| -------------- | ------- | ------------- |
| **Surge MITM** | ✓✓ 持久 | 拦截 API 响应 |
| **本地注入**   | ❌ 临时  | 控制台注入    |

---

## Surge MITM

拦截 `/auth/account` API 响应，修改为 Premium 状态。

### 安装

1. 下载 `surge/harpa.sgmodule`
2. Surge → 模块 → 安装新模块
3. 启用模块和 MITM

### 原理

```javascript
// 修改前
{ "products": { "x": { "status": false } }, "stats": { "pm": 50 } }

// 修改后
{
  "products": { "x": { "status": true }, "s": { "status": true } },
  "stats": { "pm": 0 }
}
```

---

## 本地注入

通过 Service Worker 控制台注入脚本，绕过 Power Messages 限制。

### 使用方法

1. `chrome://extensions` → HARPA AI → 点击 "Service Worker"
2. 复制 `local/bypass.js` 内容到控制台执行
3. 刷新 HARPA 侧边栏

### 原理

| #   | 方法                  | 作用                                       |
| --- | --------------------- | ------------------------------------------ |
| 1   | 注入 Premium 状态     | 修改 `products` 和 `stats.pm = 0`          |
| 2   | Hook Plan 检查        | `hasXPlan`, `hasSPlan`, `hasPro` 返回 true |
| 3   | 禁用服务器同步        | 阻止 `_synchValue` 覆盖本地值              |
| 4   | Hook `onPowerMessage` | 核心检查直接返回 true                      |
| 5   | 禁用 Feature          | `billing.pm` 功能禁用                      |
