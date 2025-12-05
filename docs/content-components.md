# Clarity 主题内容组件使用指南

本文档介绍 Clarity 主题提供的所有内容组件及其使用方法。这些组件可在 Halo 文章编辑器中通过 HTML 标签的方式使用。

---

## 目录

- [Alert 提示框](#alert-提示框)
- [Tab 标签页](#tab-标签页)
- [Copy 复制命令](#copy-复制命令)
- [Folding 折叠](#folding-折叠)
- [Tip 提示文本](#tip-提示文本)
- [Blur 模糊遮罩](#blur-模糊遮罩)
- [Timeline 时间线](#timeline-时间线)
- [Quote 引用](#quote-引用)
- [Chat 聊天](#chat-聊天)
- [Key 按键](#key-按键)
- [Badge 徽章](#badge-徽章)
- [LinkBanner 链接横幅](#linkbanner-链接横幅)
- [LinkCard 链接卡片](#linkcard-链接卡片)
- [VideoEmbed 视频嵌入](#videoembed-视频嵌入)
- [CardList 卡片列表](#cardlist-卡片列表)
- [Pic 图片](#pic-图片)
- [Poetry 诗歌](#poetry-诗歌)
- [Progress 进度条](#progress-进度条)
- [EmojiClock 表情时钟](#emojiclock-表情时钟)
- [Split 分栏布局](#split-分栏布局)
- [Stepper 步骤](#stepper-步骤)
- [Callout 标注卡片](#callout-标注卡片)
- [Note 便签](#note-便签)

---

## Alert 提示框

用于展示重要提示信息，支持多种类型和样式。

### 基本用法

```html
<c-alert type="tip">
  <p>这是一个提示信息</p>
</c-alert>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `tip` \| `info` \| `question` \| `warning` \| `error` | `tip` | 提示类型 |
| `title` | `string` | 根据类型自动 | 自定义标题 |
| `card` | `boolean` | `false` | 使用卡片风格 |

### 完整示例

```html
<!-- 各种类型 -->
<c-alert type="tip" title="小提示">
  <p>这是一个友好的提示信息。</p>
</c-alert>

<c-alert type="info">
  <p>这是一条信息说明。</p>
</c-alert>

<c-alert type="question" title="常见问题">
  <p>如何使用这个功能？</p>
</c-alert>

<c-alert type="warning">
  <p>请注意这个操作可能带来风险。</p>
</c-alert>

<c-alert type="error" card>
  <p>操作失败，请重试。</p>
</c-alert>
```

---

## Tab 标签页

用于组织多个内容面板，用户可以切换查看。

### 基本用法

```html
<c-tab tabs="标签1,标签2,标签3">
  <c-tab-panel>第一个标签页的内容</c-tab-panel>
  <c-tab-panel>第二个标签页的内容</c-tab-panel>
  <c-tab-panel>第三个标签页的内容</c-tab-panel>
</c-tab>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tabs` | `string` | - | 标签名称，用逗号分隔 |
| `center` | `boolean` | `false` | 内容居中显示 |
| `active` | `number` | `1` | 默认激活的标签页（从1开始） |

### 完整示例

```html
<c-tab tabs="HTML,CSS,JavaScript" center active="2">
  <c-tab-panel>
    <pre><code>&lt;div class="hello"&gt;Hello&lt;/div&gt;</code></pre>
  </c-tab-panel>
  <c-tab-panel>
    <pre><code>.hello { color: blue; }</code></pre>
  </c-tab-panel>
  <c-tab-panel>
    <pre><code>console.log('Hello World');</code></pre>
  </c-tab-panel>
</c-tab>
```

---

## Copy 复制命令

用于展示可复制的命令行或代码片段。

### 基本用法

```html
<c-copy code="npm install theme-clarity"></c-copy>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | `string` | - | 要复制的代码 |
| `prompt` | `string` \| `boolean` | `$` | 命令提示符，设为空隐藏 |

### 完整示例

```html
<!-- 默认 $ 提示符 -->
<c-copy code="pnpm install"></c-copy>

<!-- 自定义提示符 -->
<c-copy code="git clone https://github.com/example/repo.git" prompt=">"></c-copy>

<!-- 无提示符 -->
<c-copy code="https://example.com/api/v1" prompt=""></c-copy>
```

---

## Folding 折叠

用于隐藏次要内容，点击展开查看。

### 基本用法

```html
<c-folding title="点击展开查看详情">
  <p>这里是折叠的详细内容...</p>
</c-folding>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 折叠标题 |
| `open` | `boolean` | `false` | 是否默认展开 |

### 完整示例

```html
<c-folding title="📚 查看更多参考资料" open>
  <ul>
    <li><a href="#">参考链接1</a></li>
    <li><a href="#">参考链接2</a></li>
    <li><a href="#">参考链接3</a></li>
  </ul>
</c-folding>
```

---

## Tip 提示文本

为文字添加悬浮提示。

### 基本用法

```html
这是一段包含<c-tip tip="这是提示内容">专业术语</c-tip>的文字。
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tip` | `string` | - | 提示内容 |

---

## Blur 模糊遮罩

用于隐藏敏感信息，鼠标悬浮时显示。

### 基本用法

```html
密码是 <c-blur>123456</c-blur>
```

---

## Timeline 时间线

用于展示时间顺序的事件。

### 基本用法

```html
<c-timeline>
  <c-timeline-item time="2024-01-01">新年第一天</c-timeline-item>
  <c-timeline-item time="2024-02-14">情人节</c-timeline-item>
  <c-timeline-item time="2024-05-01">劳动节</c-timeline-item>
</c-timeline>
```

### 完整示例

```html
<c-timeline>
  <c-timeline-item time="2024年1月">
    <strong>项目启动</strong>
    <p>完成需求分析和技术选型</p>
  </c-timeline-item>
  <c-timeline-item time="2024年3月">
    <strong>开发阶段</strong>
    <p>完成核心功能开发</p>
  </c-timeline-item>
  <c-timeline-item time="2024年6月">
    <strong>正式上线</strong>
    <p>产品正式发布</p>
  </c-timeline-item>
</c-timeline>
```

---

## Quote 引用

用于展示名言或重要引用。

### 基本用法

```html
<c-quote>
  <p>生活不止眼前的苟且，还有诗和远方。</p>
</c-quote>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `icon` | `string` | - | 自定义图标（emoji） |

### 完整示例

```html
<c-quote icon="💡">
  <p>好的设计是显而易见的，伟大的设计是透明的。</p>
</c-quote>
```

---

## Chat 聊天

用于展示对话内容。

### 基本用法

```html
<c-chat>
  <c-chat-item name="小明">你好！</c-chat-item>
  <c-chat-item name="小红" self>你好呀！</c-chat-item>
</c-chat>
```

### 属性

`c-chat-item` 子元素属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | - | 说话人名称 |
| `self` | `boolean` | `false` | 是否是自己（右对齐） |

### 完整示例

```html
<c-chat>
  <c-chat-item name="用户">请问如何安装这个主题？</c-chat-item>
  <c-chat-item name="客服" self>您好！您可以在 Halo 后台 → 主题 → 安装 中上传主题包。</c-chat-item>
  <c-chat-item name="用户">好的，谢谢！</c-chat-item>
  <c-chat-item name="客服" self>不客气，还有其他问题随时问我 😊</c-chat-item>
</c-chat>
```

---

## Key 按键

用于展示键盘按键。

### 基本用法

```html
按下 <c-key code="K" cmd></c-key> 打开搜索
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | `string` | - | 按键代码 |
| `text` | `string` | - | 自定义显示文本 |
| `cmd` | `boolean` | `false` | Command/Ctrl 键 |
| `ctrl` | `boolean` | `false` | Ctrl 键 |
| `shift` | `boolean` | `false` | Shift 键 |
| `alt` | `boolean` | `false` | Alt/Option 键 |

### 完整示例

```html
<p>常用快捷键：</p>
<ul>
  <li>复制：<c-key code="C" cmd></c-key></li>
  <li>粘贴：<c-key code="V" cmd></c-key></li>
  <li>保存：<c-key code="S" cmd></c-key></li>
  <li>撤销：<c-key code="Z" cmd></c-key></li>
  <li>全选：<c-key code="A" cmd></c-key></li>
</ul>
```

---

## Badge 徽章

用于展示标签或状态。

### 基本用法

```html
<c-badge>默认徽章</c-badge>
<c-badge img="https://example.com/icon.png">带图标</c-badge>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `img` | `string` | - | 图标图片 URL |
| `link` | `string` | - | 点击跳转链接 |
| `round` | `boolean` | `false` | 圆角样式 |

### 完整示例

```html
<p>
  技术栈：
  <c-badge img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vue/vue-original.svg" link="https://vuejs.org" round>Vue 3</c-badge>
  <c-badge img="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" link="https://typescriptlang.org">TypeScript</c-badge>
  <c-badge>TailwindCSS</c-badge>
</p>
```

---

## LinkBanner 链接横幅

用于展示带封面的链接卡片。

### 基本用法

```html
<c-link-banner 
  title="Halo 官网" 
  description="强大易用的开源建站工具"
  link="https://halo.run"
  banner="https://halo.run/og-image.png">
</c-link-banner>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 链接标题 |
| `description` | `string` | - | 链接描述 |
| `link` | `string` | - | 链接地址 |
| `banner` | `string` | - | 封面图片 |

---

## LinkCard 链接卡片

简洁的链接卡片样式。

### 基本用法

```html
<c-link-card 
  title="GitHub" 
  description="全球最大的代码托管平台"
  link="https://github.com"
  icon="https://github.githubassets.com/favicons/favicon.svg">
</c-link-card>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 链接标题 |
| `description` | `string` | 自动获取域名 | 链接描述 |
| `link` | `string` | - | 链接地址 |
| `icon` | `string` | - | 图标图片 |

---

## VideoEmbed 视频嵌入

支持 Bilibili、YouTube 和原生视频。

### 基本用法

```html
<!-- Bilibili -->
<c-video type="bilibili" id="BV1xx411c7mD"></c-video>

<!-- YouTube -->
<c-video type="youtube" id="dQw4w9WgXcQ"></c-video>

<!-- 原生视频 -->
<c-video type="raw" id="https://example.com/video.mp4"></c-video>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `raw` \| `bilibili` \| `youtube` | `raw` | 视频类型 |
| `id` | `string` | - | 视频 ID 或 URL |
| `autoplay` | `boolean` | `false` | 自动播放 |
| `ratio` | `string` | `16 / 9` | 宽高比 |
| `width` | `string` | - | 最大宽度 |
| `height` | `string` | `80vh` | 最大高度 |

---

## CardList 卡片列表

将列表转换为卡片网格布局。

### 基本用法

```html
<c-card-list>
  <ul>
    <li><strong>特性一</strong><br>这是特性一的描述</li>
    <li><strong>特性二</strong><br>这是特性二的描述</li>
    <li><strong>特性三</strong><br>这是特性三的描述</li>
    <li><strong>特性四</strong><br>这是特性四的描述</li>
  </ul>
</c-card-list>
```

---

## Pic 图片

带标题的图片展示。

### 基本用法

```html
<c-pic src="https://example.com/image.jpg" caption="图片说明"></c-pic>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | - | 图片地址 |
| `caption` | `string` | - | 图片说明 |
| `width` | `string` | - | 图片宽度 |
| `height` | `string` | - | 图片高度 |

---

## Poetry 诗歌

用于展示诗歌或歌词。

### 基本用法

```html
<c-poetry title="静夜思" author="李白">
  <p>床前明月光，</p>
  <p>疑是地上霜。</p>
  <p>举头望明月，</p>
  <p>低头思故乡。</p>
</c-poetry>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 诗歌标题 |
| `author` | `string` | - | 作者 |
| `footer` | `string` | - | 底部文字 |

---

## Progress 进度条

用于展示进度或技能熟练度。

### 基本用法

```html
<c-progress value="75" label="完成度"></c-progress>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | - | 当前值 |
| `max` | `number` | `100` | 最大值 |
| `color` | `string` | 主题色 | 进度条颜色 |
| `label` | `string` | - | 标签文字 |
| `show-percent` | `boolean` | `true` | 是否显示百分比 |

### 完整示例

```html
<h4>技能熟练度</h4>
<c-progress value="90" label="HTML/CSS" color="#e34c26"></c-progress>
<c-progress value="85" label="JavaScript" color="#f7df1e"></c-progress>
<c-progress value="80" label="Vue.js" color="#42b883"></c-progress>
<c-progress value="70" label="TypeScript" color="#3178c6"></c-progress>
<c-progress value="60" label="Node.js" color="#68a063"></c-progress>
```

---

## EmojiClock 表情时钟

显示当前时间对应的时钟表情。

### 基本用法

```html
现在是 <c-emoji-clock></c-emoji-clock> 点
```

---

## Split 分栏布局

用于创建多栏布局。

### 基本用法

```html
<c-split cols="2" gap="2rem">
  <div>左侧内容</div>
  <div>右侧内容</div>
</c-split>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `cols` | `number` \| `string` | `2` | 列数或最小宽度（如 `200px`） |
| `gap` | `string` | `1rem` | 列间距 |

### 完整示例

```html
<c-split cols="3" gap="1.5rem">
  <div>
    <h4>🚀 快速</h4>
    <p>基于现代技术栈，性能优异</p>
  </div>
  <div>
    <h4>🎨 美观</h4>
    <p>精心设计的 UI，赏心悦目</p>
  </div>
  <div>
    <h4>🔧 灵活</h4>
    <p>高度可配置，满足各种需求</p>
  </div>
</c-split>
```

---

## Stepper 步骤

用于展示步骤流程。

### 基本用法

```html
<c-stepper>
  <c-step title="第一步">下载主题包</c-step>
  <c-step title="第二步">上传到 Halo 后台</c-step>
  <c-step title="第三步">启用主题</c-step>
</c-stepper>
```

### 属性

`c-step` 子元素属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 步骤标题 |

### 完整示例

```html
<c-stepper>
  <c-step title="安装 Node.js">
    <p>访问 <a href="https://nodejs.org">nodejs.org</a> 下载并安装 LTS 版本。</p>
  </c-step>
  <c-step title="克隆项目">
    <c-copy code="git clone https://github.com/example/project.git"></c-copy>
  </c-step>
  <c-step title="安装依赖">
    <c-copy code="pnpm install"></c-copy>
  </c-step>
  <c-step title="启动开发服务器">
    <c-copy code="pnpm dev"></c-copy>
  </c-step>
</c-stepper>
```

---

## Callout 标注卡片

用于突出显示重要内容。

### 基本用法

```html
<c-callout emoji="💡">
  <p>这是一个重要提示</p>
</c-callout>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `emoji` | `string` | `💡` | 图标 emoji |
| `color` | `string` | 主题色 | 边框颜色 |

### 完整示例

```html
<c-callout emoji="⚠️" color="#f59e0b">
  <p><strong>注意</strong></p>
  <p>此操作不可撤销，请谨慎操作。</p>
</c-callout>

<c-callout emoji="✅" color="#10b981">
  <p><strong>成功</strong></p>
  <p>您的配置已保存。</p>
</c-callout>
```

---

## Note 便签

模拟真实便签效果。

### 基本用法

```html
<c-note>
  <p>这是一张便签</p>
</c-note>
```

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `yellow` \| `green` \| `blue` \| `pink` \| `purple` | `yellow` | 便签颜色 |
| `rotate` | `boolean` | `false` | 反向倾斜 |

### 完整示例

```html
<c-split cols="3">
  <c-note color="yellow">
    <p>📝 待办事项</p>
    <p>完成文档编写</p>
  </c-note>
  <c-note color="green" rotate>
    <p>✅ 已完成</p>
    <p>组件开发</p>
  </c-note>
  <c-note color="blue">
    <p>💡 想法</p>
    <p>添加更多动画效果</p>
  </c-note>
</c-split>
```

---

## 完整综合示例

以下是一个包含多种组件的完整示例：

```html
<c-alert type="info" title="📖 阅读指南">
  <p>本文将介绍如何使用 Clarity 主题的内容组件。</p>
</c-alert>

<h2>技能展示</h2>

<c-progress value="90" label="前端开发" color="#42b883"></c-progress>
<c-progress value="75" label="后端开发" color="#68a063"></c-progress>
<c-progress value="60" label="UI 设计" color="#ff6b6b"></c-progress>

<h2>项目时间线</h2>

<c-timeline>
  <c-timeline-item time="2024年Q1">项目启动，完成技术选型</c-timeline-item>
  <c-timeline-item time="2024年Q2">核心功能开发</c-timeline-item>
  <c-timeline-item time="2024年Q3">测试与优化</c-timeline-item>
  <c-timeline-item time="2024年Q4">正式上线</c-timeline-item>
</c-timeline>

<h2>快速开始</h2>

<c-stepper>
  <c-step title="安装主题">
    <p>下载主题包并上传到 Halo 后台。</p>
  </c-step>
  <c-step title="配置主题">
    <p>在主题设置中配置 Logo、颜色等选项。</p>
  </c-step>
  <c-step title="开始创作">
    <p>使用这些组件丰富你的文章内容！</p>
  </c-step>
</c-stepper>

<h2>常见问题</h2>

<c-tab tabs="安装问题,使用问题,其他问题">
  <c-tab-panel>
    <c-folding title="主题安装失败怎么办？">
      <p>请检查主题包是否完整，以及 Halo 版本是否兼容。</p>
    </c-folding>
  </c-tab-panel>
  <c-tab-panel>
    <c-folding title="组件不显示怎么办？">
      <p>请确保 HTML 标签格式正确，并刷新页面缓存。</p>
    </c-folding>
  </c-tab-panel>
  <c-tab-panel>
    <c-folding title="如何获取帮助？">
      <p>可以在 GitHub Issues 中提问。</p>
    </c-folding>
  </c-tab-panel>
</c-tab>

<c-callout emoji="🎉">
  <p>恭喜你完成了所有组件的学习！现在开始使用它们来美化你的文章吧。</p>
</c-callout>
```

---

## 注意事项

1. 所有组件标签必须正确闭合
2. 属性值如果包含空格，需要用引号包裹
3. 嵌套使用时注意标签的正确匹配
4. 部分组件支持 Markdown 内容，部分只支持 HTML
5. 建议在预览模式下检查组件效果

---

*Clarity Theme v1.0.0 - 内容组件文档*
