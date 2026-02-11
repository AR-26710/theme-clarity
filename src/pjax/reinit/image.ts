/**
 * 初始化图片加载状态
 * 为所有图片添加加载完成后的样式类
 */
export const initImageLoaded = () => {
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.addEventListener("error", () => img.classList.add("loaded"));
    }
  });
};

/**
 * 初始化图片说明文字
 * 为文章中的图片自动添加alt属性作为说明文字
 */
export const initImageCaption = () => {
  if (!window.themeConfig?.custom?.img_alt) return;
  const article = document.querySelector(".article");
  if (!article) return;
  const images = article.querySelectorAll("img");
  if (!images.length) return;
  images.forEach((img) => {
    const alt = img.alt?.trim();
    if (!alt) return;
    if (img.closest(".c-pic, [data-type='gallery']")) return;
    const figure = img.closest("figure");
    if (figure?.querySelector("figcaption")) return;
    const caption = document.createElement("figcaption");
    caption.textContent = alt;
    if (figure) {
      figure.classList.add("img-caption");
      figure.appendChild(caption);
    } else {
      const wrapper = document.createElement("figure");
      wrapper.className = "img-caption";
      img.parentNode?.insertBefore(wrapper, img);
      wrapper.append(img, caption);
    }
  });
};
