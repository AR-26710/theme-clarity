import "./styles/tailwind.css";
import "./styles/style.scss";
import "@chinese-fonts/kksjt/dist/kuaikanshijieti20231213/result.css";

import { Fancybox } from "@fancyapps/ui";
import Alpine from "alpinejs";
// @ts-ignore
import collapse from "@alpinejs/collapse";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

import { mountPhotoGallery } from "./preact";
import { initFancybox } from "./utils/fancybox";
import { initLinkSubmit } from "./links-submit";
(window as any).Fancybox = Fancybox;
(window as any).mountPhotoGallery = mountPhotoGallery;

// 海报生成函数
(window as any).generateQRCode = async (container: HTMLElement, url: string) => {
  try {
    const dataUrl = await QRCode.toDataURL(url, { width: 160, margin: 1 });
    const img = document.createElement("img");
    img.src = dataUrl;
    img.alt = "QR Code";
    container.innerHTML = "";
    container.appendChild(img);
  } catch (err) {
    console.error("二维码生成失败:", err);
  }
};

(window as any).generatePoster = async (element: HTMLElement, title: string) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#fff",
  });
  const link = document.createElement("a");
  link.download = `${title || "海报"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};

/* Alpine.js 主题切换组件 */
Alpine.data("themeToggle", () => ({
  theme: localStorage.getItem("theme") || "system",

  init() {
    this.applyTheme(false);
    // 监听系统主题变化
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (this.theme === "system") {
        this.applyTheme(true);
      }
    });
  },

  // 通过事件获取点击位置
  setTheme(newTheme: string, event?: MouseEvent) {
    this.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    this.applyTheme(true, event);
  },

  applyTheme(animate = true, event?: MouseEvent) {
    const html = document.documentElement;
    const isDark =
      this.theme === "dark" || (this.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // 设置点击位置，用于圆形展开动画
    if (event) {
      html.style.setProperty("--x", event.clientX + "px");
      html.style.setProperty("--y", event.clientY + "px");
    }

    const updateDOM = () => {
      if (isDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    };

    // 使用 View Transitions API
    if (animate && document.startViewTransition) {
      document.startViewTransition(updateDOM);
    } else {
      updateDOM();
    }
  },
}));

/* Alpine.js 用户登录组件 */
Alpine.data("userAuth", () => ({
  currentUser: null as { name: string; avatar?: string; isAdmin: boolean } | null,
  showMenu: false,
  ready: false,

  init() {
    this.checkLoginStatus();
  },

  async checkLoginStatus() {
    try {
      const res = await fetch("/apis/api.console.halo.run/v1alpha1/users/-");
      if (res.ok) {
        const data = await res.json();
        const userName = data.user?.metadata?.name;
        if (userName && userName !== "anonymousUser") {
          // 检查用户角色，判断是否为管理员
          const roles = data.user?.metadata?.annotations?.["rbac.authorization.halo.run/role-names"] || "";
          const isAdmin = roles.includes("super-role") || roles.includes("admin") || userName === "admin";
          
          this.currentUser = {
            name: data.user?.spec?.displayName || userName,
            avatar: data.user?.spec?.avatar,
            isAdmin
          };
        } else {
          this.currentUser = null;
        }
      } else {
        this.currentUser = null;
      }
    } catch {
      this.currentUser = null;
    } finally {
      this.ready = true;
    }
  },

  toggleMenu() {
    this.showMenu = !this.showMenu;
  },

  handleClick() {
    if (this.currentUser?.isAdmin) {
      this.toggleMenu();
    } else {
      window.location.href = "/uc";
    }
  }
}));

/* Alpine.js 侧边栏控制组件 */
Alpine.data("sidebarControl", () => ({
  isOpen: false,

  toggle() {
    this.isOpen = !this.isOpen;
    const sidebar = document.getElementById("z-sidebar");
    const bgmask = document.getElementById("z-sidebar-bgmask");

    if (this.isOpen) {
      sidebar?.classList.add("show");
      bgmask?.classList.remove("hidden");
    } else {
      sidebar?.classList.remove("show");
      bgmask?.classList.add("hidden");
    }
  },

  close() {
    this.isOpen = false;
    document.getElementById("z-sidebar")?.classList.remove("show");
    document.getElementById("z-sidebar-bgmask")?.classList.add("hidden");
  },
}));

/* Alpine.js 分页组件 (DaisyUI) */
Alpine.data("pagination", (page: number, total: number) => ({
  page: Number(page) || 1,
  total: Number(total) || 1,
  pageArr: [] as (number | string)[],

  init() {
    this.generatePageArr();
  },

  generatePageArr() {
    const delta = 2;
    const range: (number | string)[] = [];
    for (let i = 1; i <= this.total; i++) {
      if (i === 1 || i === this.total || (i >= this.page - delta && i <= this.page + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    this.pageArr = range;
  },

  getPageUrl(p: number | string): string {
    if (p === "...") return "javascript:void(0)";

    const path = window.location.pathname;
    const search = window.location.search;
    const params = new URLSearchParams(search);

    // 搜索页使用 query 参数
    if (params.has("keyword")) {
      params.set("page", String(p));
      return `${path}?${params.toString()}`;
    }

    // 标准 /page/N 路径
    let baseUrl = path.replace(/\/page\/\d+$/, "");
    if (baseUrl.length > 1 && baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }

    if (p === 1) {
      return baseUrl || "/";
    }
    // 避免 baseUrl 是 / 时生成 //page/N
    return baseUrl === "/" ? `/page/${p}` : `${baseUrl}/page/${p}`;
  },
}));

// 注册 Alpine.js 插件
Alpine.plugin(collapse);

// Alpine Store: 文章解锁状态
Alpine.store('postUnlocked', false);

/* Alpine.js 私密文章密码验证组件 */
Alpine.data("postPassword", () => ({
  inputPassword: "",
  error: "",
  attempts: 0,
  locked: false,
  lockTime: 0,
  unlocked: false,
  postName: "",
  storedHash: "",

  init() {
    const el = this.$el as HTMLElement;
    this.postName = el.dataset.post || "";
    this.storedHash = el.dataset.hash || "";
    
    // 检查 sessionStorage 是否已解锁
    const unlocked = sessionStorage.getItem(`post-unlocked-${this.postName}`);
    if (unlocked === "true") {
      this.unlocked = true;
      Alpine.store('postUnlocked', true);
    }

    // 检查锁定状态
    const lockData = localStorage.getItem(`post-lock-${this.postName}`);
    if (lockData) {
      const { until, attempts } = JSON.parse(lockData);
      this.attempts = attempts || 0;
      if (until > Date.now()) {
        this.locked = true;
        this.lockTime = Math.ceil((until - Date.now()) / 1000);
        this.startLockTimer();
      }
    }
  },

  async verify() {
    if (this.locked || !this.inputPassword) return;
    
    this.error = "";
    
    // SHA-256 哈希比对
    const hash = await this.sha256(this.inputPassword);
    if (hash === this.storedHash) {
      // 验证成功
      this.unlocked = true;
      Alpine.store('postUnlocked', true);
      sessionStorage.setItem(`post-unlocked-${this.postName}`, "true");
      localStorage.removeItem(`post-lock-${this.postName}`);
    } else {
      // 验证失败
      this.attempts++;
      this.error = "密码错误";
      this.inputPassword = "";
      
      if (this.attempts >= 5) {
        // 锁定 5 分钟
        const until = Date.now() + 5 * 60 * 1000;
        localStorage.setItem(`post-lock-${this.postName}`, JSON.stringify({ until, attempts: this.attempts }));
        this.locked = true;
        this.lockTime = 300;
        this.error = "尝试次数过多，已锁定 5 分钟";
        this.startLockTimer();
      } else {
        localStorage.setItem(`post-lock-${this.postName}`, JSON.stringify({ until: 0, attempts: this.attempts }));
      }
    }
  },

  startLockTimer() {
    const timer = setInterval(() => {
      this.lockTime--;
      if (this.lockTime <= 0) {
        this.locked = false;
        this.attempts = 0;
        localStorage.removeItem(`post-lock-${this.postName}`);
        clearInterval(timer);
      }
    }, 1000);
  },

  async sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
}));

window.Alpine = Alpine;

Alpine.start();

// 搜索快捷键 Ctrl+K / Cmd+K
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    // @ts-ignore - SearchWidget 由 Halo 搜索插件提供
    if (typeof SearchWidget !== "undefined") {
      // @ts-ignore
      SearchWidget.open();
    }
  }
});

// 页面初始加载
document.addEventListener("DOMContentLoaded", () => {
  initDropdownMenus();
  initFancybox();
  initBackToTop();
  initLinkSubmit();
});

// 初始化下拉菜单交互
function initDropdownMenus() {
  // 使用事件委托处理点击事件
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const trigger = target.closest(".has-dropdown");
    
    if (trigger) {
      const parent = trigger.closest(".has-submenu");
      if (parent) {
        // 阻止可能的默认链接行为（如果有的话）
        e.preventDefault();
        parent.classList.toggle("expanded");
      }
    }
  });
}

// 返回顶部按钮：滚动 300px 后显示；点击回顶；长按返回上一页
function initBackToTop() {
  const btn = document.getElementById("back-to-top") as HTMLButtonElement | null;
  if (!btn) return;

  // 避免重复绑定：标记已初始化
  if ((btn as any)._inited) {
    // 仅更新可见性
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    btn.style.display = y > 300 ? "" : "none";
    return;
  }
  (btn as any)._inited = true;

  const updateVisibility = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    btn.style.display = y > 300 ? "" : "none";
  };

  // 初始与滚动时更新
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });

  // 长按返回上一页，点击回到顶部
  let pressTimer: number | null = null;
  let longPressed = false;
  const pressDuration = 600; // ms

  const onPointerDown = () => {
    longPressed = false;
    pressTimer = window.setTimeout(() => {
      longPressed = true;
      if (history.length > 1) {
        history.back();
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, pressDuration);
  };

  const clearTimer = () => {
    if (pressTimer !== null) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  const onPointerUp = () => {
    // 若未达到长按阈值，则作为点击处理
    if (!longPressed) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    clearTimer();
  };
  btn.addEventListener("pointerdown", onPointerDown);
  btn.addEventListener("pointerup", onPointerUp);
  btn.addEventListener("pointerleave", clearTimer);
}
