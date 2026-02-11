import Pjax from "pjax";

let pjaxInstance: Pjax | null = null;

/**
 * 初始化PJAX功能
 * 仅在主题配置中启用PJAX功能时才会初始化PJAX实例
 * @returns {Pjax | null} PJAX实例或null（如果未启用）
 */
export const initPjax = () => {
  if (!window.themeConfig?.custom?.enable_pjax) {
    return null;
  }

  pjaxInstance = new Pjax({
    elements: "a:not([data-no-pjax]):not([target='_blank']):not([href^='#']):not([href^='javascript:'])",
    selectors: ["title", "#main-content", "#z-aside"],
    switches: {
      "#main-content": Pjax.switches.outerHTML,
      "#z-aside": Pjax.switches.outerHTML,
    },
    switchesOptions: {
      "#main-content": {
        classNames: ["pjax-content"],
      },
    },
    cacheBust: false,
    scrollRestoration: true,
    timeout: 5000,
  });

  return pjaxInstance;
};

/**
 * 获取当前的PJAX实例
 * @returns {Pjax | null} 当前的PJAX实例或null
 */
export const getPjaxInstance = () => pjaxInstance;

/**
 * 禁用PJAX功能
 */
export const disablePjax = () => {
  if (pjaxInstance) {
    pjaxInstance.disable();
    pjaxInstance = null;
  }
};

/**
 * 启用PJAX功能
 */
export const enablePjax = () => {
  if (!pjaxInstance && window.themeConfig?.custom?.enable_pjax) {
    initPjax();
  }
};
