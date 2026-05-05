/**
 * 执行指定容器中的脚本
 *
 * 遍历指定容器中的所有script标签，重新创建并执行这些脚本，
 * 确保动态加载的内容中的JavaScript能够正确运行。
 */
const executeScriptsInContainer = (containerSelector: string) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const scripts = container.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    if (oldScript.innerHTML) {
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    }
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
};

/**
 * 执行新加载的脚本
 *
 * 遍历主内容区域和侧边栏中的所有script标签，重新创建并执行这些脚本，
 * 确保动态加载的内容中的JavaScript能够正确运行。
 */
export const executeNewScripts = () => {
  executeScriptsInContainer("#main-content");
  executeScriptsInContainer("#z-aside");
};
