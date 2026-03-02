/**
 * 执行新加载的脚本
 *
 * 遍历主内容区域中的所有script标签，重新创建并执行这些脚本，
 * 确保动态加载的内容中的JavaScript能够正确运行。
 */
export const executeNewScripts = () => {
  const scripts = document.querySelectorAll("#main-content script");
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
