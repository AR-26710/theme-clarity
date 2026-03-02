/**
 * 初始化Mermaid图表库
 * 检测页面中的Mermaid图表元素并进行渲染初始化
 * 根据当前主题模式设置相应的图表主题
 */
export const initMermaid = () => {
  const mermaid = (window as any).mermaid;
  if (!mermaid) return;
  const mermaidElements = document.querySelectorAll("text-diagram[data-type=mermaid]");
  if (!mermaidElements.length) return;
  const isDark = document.documentElement.classList.contains("dark");
  try {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
    });
    mermaid.run({
      querySelector: "text-diagram[data-type=mermaid]",
    });
  } catch (e) {
    console.error("Mermaid initialization failed:", e);
  }
};
