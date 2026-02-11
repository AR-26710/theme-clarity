import { showToast } from "../../utils/toast";
import { getRequestFromPjaxEvent } from "./utils";
import { executeNewScripts } from "./scripts";
import { updateMetaTags } from "./meta";
import { updateActiveNavItem } from "./navigation";

// 重试配置
const MAX_RETRIES = 3;
const RETRY_COUNT_KEY = "pjax_retry_count";
const PJAX_DISABLED_KEY = "pjax_disabled";

/**
 * 处理 PJAX 发送事件
 * 显示加载状态，关闭侧边栏和侧边面板
 */
export const handlePjaxSend = () => {
  document.body.classList.add("pjax-loading");
  window.dispatchEvent(new CustomEvent("pjax:start"));

  // 关闭侧边栏
  const sidebar = document.getElementById("z-sidebar");
  const sidebarBgmask = document.getElementById("z-sidebar-bgmask");
  const toggleSidebar = document.getElementById("toggle-sidebar");

  if (sidebar) {
    sidebar.classList.remove("show");
  }
  if (sidebarBgmask) {
    sidebarBgmask.classList.add("hidden");
  }
  if (toggleSidebar) {
    toggleSidebar.classList.remove("active");
  }

  // 关闭侧边面板
  const aside = document.getElementById("z-aside");
  const asideBgmask = document.getElementById("z-aside-bgmask");
  const toggleAside = document.getElementById("toggle-aside");

  if (aside) {
    aside.classList.remove("show");
  }
  if (asideBgmask) {
    asideBgmask.classList.add("hidden");
  }
  if (toggleAside) {
    toggleAside.classList.remove("active");
  }
};

/**
 * 处理 PJAX 完成事件
 * 移除加载状态并滚动到顶部
 */
export const handlePjaxComplete = () => {
  document.body.classList.remove("pjax-loading");
  window.scrollTo(0, 0);
  window.dispatchEvent(new CustomEvent("pjax:complete"));
};

/**
 * 创建 PJAX 成功事件处理器
 * @param reinitializeComponents - 重新初始化组件的回调函数
 * @param syncThemeConfig - 同步主题配置的回调函数
 * @returns 事件处理器函数
 */
export const createPjaxSuccessHandler = (reinitializeComponents: () => void, syncThemeConfig: () => void) => {
  return (event: Event) => {
    window.dispatchEvent(new CustomEvent("pjax:success"));
    syncThemeConfig();
    executeNewScripts();
    reinitializeComponents();
    updateActiveNavItem();
    const request = getRequestFromPjaxEvent(event);
    updateMetaTags(request);
  };
};

/**
 * 处理 PJAX 错误事件
 * 实现重试机制和自动禁用 PJAX 功能
 */
export const handlePjaxError = (err: Event) => {
  console.error("PJAX error:", err);
  document.body.classList.remove("pjax-loading");
  window.dispatchEvent(new CustomEvent("pjax:error", { detail: err }));

  // 如果 PJAX 已被禁用，不再重试，避免刷新风暴
  if (localStorage.getItem(PJAX_DISABLED_KEY) === "true") {
    showToast("页面加载失败，请检查网络连接后手动刷新。", "danger");
    return;
  }

  const retryCount = parseInt(sessionStorage.getItem(RETRY_COUNT_KEY) || "0");

  if (retryCount < MAX_RETRIES) {
    sessionStorage.setItem(RETRY_COUNT_KEY, String(retryCount + 1));
    window.location.reload();
  } else {
    sessionStorage.removeItem(RETRY_COUNT_KEY);
    window.themeConfig = window.themeConfig || {};
    window.themeConfig.custom = window.themeConfig.custom || {};
    window.themeConfig.custom.enable_pjax = false;
    localStorage.setItem(PJAX_DISABLED_KEY, "true");
    showToast("页面加载失败，已自动禁用 PJAX 功能，请刷新页面重试。", "danger");
  }
};
