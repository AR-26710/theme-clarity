/**
 * 初始化下拉菜单
 * 使用事件委托处理下拉菜单点击，只需全局绑定一次
 */
export const initDropdownMenus = () => {
  // 点击事件处理
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const toggleBtn = target.closest(".dropdown-toggle");

    if (toggleBtn) {
      const parent = toggleBtn.closest(".has-submenu");
      if (parent) {
        e.preventDefault();
        e.stopPropagation();
        parent.classList.toggle("expanded");
      }
    }
  });

  // 鼠标悬浮自动展开
  document.addEventListener(
    "mouseenter",
    (e) => {
      const target = e.target as HTMLElement;
      const hasSubmenu = target.closest(".has-submenu");

      if (hasSubmenu) {
        hasSubmenu.classList.add("expanded");
      }
    },
    true,
  );

  // 鼠标离开自动收起
  document.addEventListener(
    "mouseleave",
    (e) => {
      const target = e.target as HTMLElement;
      const hasSubmenu = target.closest(".has-submenu");

      if (hasSubmenu) {
        hasSubmenu.classList.remove("expanded");
      }
    },
    true,
  );
};
