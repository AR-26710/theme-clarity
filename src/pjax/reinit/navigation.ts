/**
 * 初始化导航栏活动项
 * 根据当前页面路径设置对应的导航项为活动状态
 */
export const initActiveNavItem = () => {
  if (document.documentElement.dataset.navActive === "false") return;
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll(".sidebar-nav-item, .dropdown-item");

  navItems.forEach((item) => {
    item.classList.remove("active");
    const parentSubmenu = item.closest(".has-submenu");
    if (parentSubmenu) {
      parentSubmenu.classList.remove("expanded");
    }

    const link = item as HTMLAnchorElement;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const isActive =
      currentPath === href || (href !== "/" && currentPath.startsWith(href)) || (href === "/" && currentPath === "/");

    if (isActive) {
      link.classList.add("active");
      const parentSubmenu = link.closest(".has-submenu");
      if (parentSubmenu) {
        parentSubmenu.classList.add("expanded");
      }
    }
  });
};

/**
 * 初始化下拉菜单
 * 下拉菜单事件监听器已在 main.ts 中全局绑定一次
 * 此函数在 PJAX 切换后不需要重新绑定事件
 * 因为事件委托在 document 上，对新元素同样有效
 */
export const initDropdownMenus = () => {};
