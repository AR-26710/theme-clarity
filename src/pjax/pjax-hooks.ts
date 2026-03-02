/**
 * PJAX Hooks 模块
 *
 * - hooks/index.ts     - 主入口，导出 registerPjaxHooks
 * - hooks/events.ts    - PJAX 事件处理器 (send, complete, success, error)
 * - hooks/meta.ts      - Meta 标签和 JSON-LD 更新
 * - hooks/scripts.ts   - 脚本执行
 * - hooks/navigation.ts - 导航状态更新
 * - hooks/utils.ts     - 工具函数
 *
 */

export {
  registerPjaxHooks,
  updateMetaTags,
  updateActiveNavItem,
  executeNewScripts,
  getRequestFromPjaxEvent,
  getMetaKey,
  isPathMatch,
} from "./hooks";
