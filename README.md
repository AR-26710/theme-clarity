<div align="center">

# Clarity

一款注重阅读体验的三栏博客主题，用清晰的设计让阅读回归本真。

[![Halo](https://img.shields.io/badge/Halo-2.21+-blue?style=flat-square)](https://halo.run)
[![License](https://img.shields.io/badge/License-GPL--3.0-green?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=flat-square)](./theme.yaml)

</div>

---

## ✨ 特性

- 🎨 **精心设计的三栏布局** - 左侧导航 + 主内容区 + 右侧边栏，信息层次清晰
- 🌓 **深色模式** - 支持浅色/深色/跟随系统三种模式，带圆形展开过渡动画
- 📱 **响应式设计** - 完美适配桌面端、平板和移动设备
- 🧩 **可配置小组件** - 博客统计、技术信息、天气预报、微语等，支持拖拽排序
- ✍️ **丰富的内容组件** - 提示框、选项卡、折叠面板、时间线、聊天对话等
- 🔍 **搜索快捷键** - 支持 `Ctrl+K` / `⌘K` 快速唤起搜索
- 📤 **文章分享** - 一键复制分享文本或生成精美海报
- 🎭 **文章目录** - 自动生成 TOC，带滚动高亮效果

## 📸 预览

> 截图待补充

## 🚀 安装

### 方式一：应用市场安装（推荐）

在 Halo 后台的「主题」页面，点击「安装主题」，选择「应用市场」，搜索 `Clarity` 并安装。

### 方式二：手动安装

1. 前往 [Releases](https://github.com/halo-dev/theme-clarity/releases) 下载最新版本的 `theme-clarity.zip`
2. 在 Halo 后台的「主题」页面，点击「安装主题」，选择「本地上传」
3. 上传下载的 zip 文件完成安装

## ⚙️ 配置说明

### 侧边栏头部

| 配置项 | 说明 |
|--------|------|
| Logo | 站点 Logo 图片 |
| 显示标题 | 是否显示站点标题和副标题 |
| 副标题 | 一句话介绍 |
| Emoji 尾巴 | 首页标题旁漂浮的 Emoji，用逗号分隔 |
| 主导航菜单 | 选择后台创建的菜单 |

### 样式设置

| 配置项 | 说明 |
|--------|------|
| 主配色 | 用于按钮、链接、高亮等主要元素 |
| 辅配色 | 用于次要高亮、悬停状态等 |
| Logo 字体样式 | 自定义 Logo 字体的 `@font-face` CSS |

### 右侧边栏小组件

支持以下小组件，可自由拖拽排序：

- **博客统计** - 运营时长、上次更新、文章数目
- **技术信息** - 构建平台、图片存储、许可协议等
- **天气预报** - 集成心知天气 API，自动定位
- **微语** - 展示最新的瞬间动态
- **社区群组** - QQ 群等社交卡片
- **云计算支持** - 赞助商展示
- **自定义** - 支持任意 HTML 内容

### 文章设置

| 配置项 | 说明 |
|--------|------|
| 精选文章 | 选择在首页轮播展示的文章 |
| 每页文章数 | 文章列表分页数量 |
| 显示摘要框 | 文章页顶部的摘要卡片 |
| 摘要打字机效果 | 启用后摘要会逐字显示 |
| 过时文章提示 | 文章发布超过指定天数后显示提醒 |

### 友链页面

| 配置项 | 说明 |
|--------|------|
| 我的博客信息 | 用于友链页面展示的自身信息 |
| 启用自主提交 | 访客可自助提交友链申请（需安装 LinksSubmit 插件） |
| 验证方式 | 邮箱验证码 / 图形验证码 / 无需验证 |

### 插件适配

主题已适配以下 Halo 插件：

- [plugin-search-widget](https://github.com/halo-sigs/plugin-search-widget) - 站内搜索
- [plugin-moments](https://github.com/halo-sigs/plugin-moments) - 瞬间/微语
- [plugin-photos](https://github.com/halo-sigs/plugin-photos) - 图库/相册
- [plugin-links](https://github.com/halo-sigs/plugin-links) - 友情链接

## 📝 内容组件

在文章中使用以下自定义标签来丰富内容展示：

### 提示框

```html
<c-alert type="info" title="提示">这是一条提示信息</c-alert>
<c-alert type="warning">警告内容</c-alert>
<c-alert type="success">成功信息</c-alert>
<c-alert type="error">错误信息</c-alert>
```

### 选项卡

```html
<c-tab tabs="选项1,选项2,选项3">
  <c-tab-panel>第一个选项卡内容</c-tab-panel>
  <c-tab-panel>第二个选项卡内容</c-tab-panel>
  <c-tab-panel>第三个选项卡内容</c-tab-panel>
</c-tab>
```

### 折叠面板

```html
<c-folding title="点击展开">
  折叠的内容...
</c-folding>
```

### 时间线

```html
<c-timeline>
  <c-timeline-item time="2024-01-01">第一个事件</c-timeline-item>
  <c-timeline-item time="2024-06-01">第二个事件</c-timeline-item>
</c-timeline>
```

### 聊天对话

```html
<c-chat>
  <c-chat-item name="小明">你好！</c-chat-item>
  <c-chat-item name="我" self>你好，有什么事吗？</c-chat-item>
</c-chat>
```

### 更多组件

- `<c-copy code="..." prompt="$">` - 复制代码块
- `<c-tip tip="提示文字">文本</c-tip>` - 悬浮提示
- `<c-blur>模糊内容</c-blur>` - 模糊遮罩，悬停显示
- `<c-quote icon="💡">引用内容</c-quote>` - 引用块
- `<c-key ctrl shift>K</c-key>` - 键盘按键
- `<c-progress value="75" label="进度">` - 进度条
- `<c-note color="yellow" rotate="-2">便签内容</c-note>` - 便签卡片

## 🛠️ 开发

### 环境要求

- Node.js 18+
- pnpm 10+
- Java 17+ (用于 Gradle 打包)

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 在 Halo 后台启用「开发模式」设置
# 主题将自动连接 localhost:5173 获取资源
```

### 构建打包

```bash
# 完整构建（生成主题 zip 包）
pnpm build

# 仅构建前端资源
pnpm build-only
```

### 项目结构

```text
theme-clarity/
├── src/                      # 前端源码
│   ├── main.ts               # 主入口
│   ├── preact/               # Preact 组件
│   ├── styles/               # 样式文件
│   │   ├── tailwind.css      # TailwindCSS 入口
│   │   ├── style.scss        # SCSS 主入口
│   │   └── scss/             # 组件样式模块
│   └── types/                # TypeScript 类型
├── templates/                # Thymeleaf 模板
│   ├── modules/              # 可复用模板片段
│   └── assets/               # 静态资源
├── theme.yaml                # 主题元信息
├── settings.yaml             # 主题设置定义
└── vite.config.ts            # Vite 配置
```

### 技术栈

| 层面 | 技术 |
|------|------|
| 模板引擎 | Thymeleaf |
| 前端框架 | Alpine.js + Preact |
| 样式系统 | TailwindCSS 4 + SCSS + DaisyUI |
| 图标系统 | Iconify (@iconify/tailwind4) |
| 构建工具 | Vite 7 + TypeScript |
| 代码规范 | ESLint + Prettier + Husky |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 [GPL-3.0](./LICENSE) 许可证开源。

## 💖 致谢

- [Halo](https://halo.run) - 强大的开源建站工具
- [纸鹿](https://github.com/zhilu-nern) - 设计灵感来源 (blog-v3)
- 所有贡献者和使用者

---

<div align="center">

**如果这个主题对你有帮助，欢迎 Star ⭐**

Made with ❤️ by [Handsome](https://www.xhhao.com)

</div>
