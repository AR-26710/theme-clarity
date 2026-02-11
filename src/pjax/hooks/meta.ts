import { getMetaKey } from "./utils";

// Meta 标签选择器列表
const META_SELECTORS = [
  // 基础 SEO meta 标签
  'meta[name="description"]',
  'meta[name="keywords"]',
  'meta[name="author"]',
  'meta[name="generator"]',
  // Open Graph 标签
  'meta[property^="og:site_name"]',
  'meta[property^="og:locale"]',
  'meta[property^="og:type"]',
  'meta[property^="og:title"]',
  'meta[property^="og:description"]',
  'meta[property^="og:url"]',
  'meta[property^="og:image"]',
  'meta[property^="article:published_time"]',
  'meta[property^="article:modified_time"]',
  'meta[property^="article:author"]',
  'meta[property^="article:section"]',
  'meta[property^="article:tag"]',
  // Twitter Card 标签
  'meta[name^="twitter:card"]',
  'meta[name^="twitter:title"]',
  'meta[name^="twitter:description"]',
  'meta[name^="twitter:image"]',
  'meta[name^="twitter:creator"]',
  // 站点验证标签
  'meta[name="baidu-site-verification"]',
  'meta[name="google-site-verification"]',
  'meta[name="msvalidate.01"]',
  // Canonical link
  'link[rel="canonical"]',
];

/**
 * 更新页面的 meta 标签
 *
 * 在 PJAX 页面切换后，从当前文档中提取并更新以下 meta 标签：
 * - description, keywords, author, generator
 * - Open Graph 标签 (og:site_name, og:locale, og:type, og:title, og:description, og:url, og:image, article:*)
 * - Twitter Card 标签 (twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator)
 * - 站点验证标签 (baidu-site-verification, google-site-verification, msvalidate.01)
 * - canonical link
 * - JSON-LD 结构化数据脚本
 *
 * @param request - PJAX 请求的 XMLHttpRequest 对象
 */
export const updateMetaTags = (request?: XMLHttpRequest) => {
  if (!request || !request.responseText) return;

  const parser = new DOMParser();
  const newDoc = parser.parseFromString(request.responseText, "text/html");

  // 收集新页面中所有需要更新的 meta 键
  const newPageMetaKeys = new Set<string>();
  META_SELECTORS.forEach((selector) => {
    newDoc.querySelectorAll(selector).forEach((el) => {
      newPageMetaKeys.add(getMetaKey(el));
    });
  });

  // 删除当前页面中与新页面冲突的 meta 标签（包括初次加载的）
  // 保留：1. 带 data-pjax 标记的（会被下面的逻辑处理）
  //       2. 与新页面不冲突的（用户自定义静态 meta）
  META_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      // 如果当前元素有 data-pjax 标记，跳过（由后面的统一删除处理）
      if (el.hasAttribute("data-pjax")) return;

      // 如果当前元素与新页面的 meta 冲突，则删除
      const key = getMetaKey(el);
      if (newPageMetaKeys.has(key)) {
        el.remove();
      }
    });
  });

  // 删除之前由 PJAX 插入的 meta 标签
  document.querySelectorAll('[data-pjax="true"]').forEach((el) => el.remove());

  // 使用 Map 去重，确保每个标签只添加一次
  const seenTags = new Map<string, Element>();

  META_SELECTORS.forEach((selector) => {
    const newElements = newDoc.querySelectorAll(selector);

    newElements.forEach((el) => {
      // 生成唯一键用于去重
      const key = getMetaKey(el);

      // 如果已经存在相同的标签，跳过
      if (seenTags.has(key)) return;

      seenTags.set(key, el);

      // 添加新标签到 head，并标记为 PJAX 插入
      const clonedEl = el.cloneNode(true) as Element;
      clonedEl.setAttribute("data-pjax", "true");
      document.head.appendChild(clonedEl);
    });
  });

  updateJsonLdScripts(newDoc);
};

/**
 * 更新 JSON-LD 结构化数据脚本
 *
 * @param newDoc - 新页面的文档对象
 */
const updateJsonLdScripts = (newDoc: Document) => {
  // 删除当前页面中未标记 data-pjax 的 JSON-LD 脚本（初次加载的）
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
    if (!el.hasAttribute("data-pjax")) {
      el.remove();
    }
  });

  // 删除之前由 PJAX 插入的 JSON-LD 脚本
  document.querySelectorAll('script[type="application/ld+json"][data-pjax="true"]').forEach((el) => el.remove());

  const newScripts = newDoc.querySelectorAll('script[type="application/ld+json"]');

  // 添加新的 JSON-LD 脚本到 head，并标记为 PJAX 插入
  newScripts.forEach((el) => {
    const clonedEl = el.cloneNode(true) as HTMLScriptElement;
    clonedEl.setAttribute("data-pjax", "true");
    document.head.appendChild(clonedEl);
  });
};
