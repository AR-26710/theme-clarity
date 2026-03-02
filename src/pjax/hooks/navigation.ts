import { isPathMatch } from "./utils";

/**
 * 更新导航项的激活状态
 *
 * 根据当前页面路径更新侧边栏导航项的激活状态，
 * 同时保持之前展开的菜单状态。
 */
export const updateActiveNavItem = () => {
  if (document.documentElement.dataset.navActive === "false") return;

  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll(".sidebar-nav-item, .dropdown-item");

  // 保存当前展开的菜单状态（PJAX 切换前）
  const expandedMenus = new Set<string>();
  document.querySelectorAll(".has-submenu.expanded").forEach((menu) => {
    const firstLink = menu.querySelector(".sidebar-nav-item");
    if (firstLink) {
      const href = firstLink.getAttribute("href");
      if (href) expandedMenus.add(href);
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");

    const link = item as HTMLAnchorElement;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const isActive =
      currentPath === href ||
      (href !== "/" && isPathMatch(currentPath, href)) ||
      (href === "/" && (currentPath === "/" || currentPath.startsWith("/page/")));

    if (isActive) {
      link.classList.add("active");
      const parentSubmenu = link.closest(".has-submenu");
      if (parentSubmenu) {
        parentSubmenu.classList.add("expanded");
      }
    }
  });
};
