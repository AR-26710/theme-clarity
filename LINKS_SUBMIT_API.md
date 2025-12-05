# LinksSubmit Global API 使用文档

`linkssubmit.js` 提供了一个全局对象 `window.LinksSubmit`，允许主题开发者在任何地方便捷地调用友链提交插件的相关接口。

## 1. 提交友链

提交友链申请。

### 接口定义

```javascript
LinksSubmit.submit(data, verifyCode, verifyCodeType)
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `data` | Object | 是 | 包含友链信息的对象 |
| `verifyCode` | String | 是 | 验证码 |
| `verifyCodeType` | String | 否 | 验证码类型，可选值：`email`（邮箱验证码）、`captcha`（图形验证码），默认为 `email` |

**`data` 对象结构：**

| 属性名 | 类型 | 必填 | 说明                                                                         |
| :--- | :--- | :--- |:---------------------------------------------------------------------------|
| `displayName` | String | 是 | 网站名称                                                                       |
| `url` | String | 是 | 网站地址                                                                       |
| `logo` | String | 否 | 网站图标 URL                                                                   |
| `email` | String | 是 | 联系邮箱                                                                       |
| `description` | String | 否 | 网站描述                                                                       |
| `linkPageUrl` | String | 否 | 友链页面地址                                                                     |
| `groupName` | String | 否 | 分组 ID (注意：虽然字段名叫 groupName，实际传的是 groupId)                                  |
| `rssUrl` | String | 否 | RSS 地址                                                                     |
| `submitType` | String | 否 | 提交类型，可选值：`CREATE`（新增，默认）、`UPDATE`（修改）。调用 `submit` 方法时自动设置为 `CREATE`，无需手动传递 |

### 示例代码

**使用邮箱验证码（默认）：**

```javascript
const formData = {
    displayName: "我的博客",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    email: "test@example.com",
    description: "这是一个示例博客",
    groupName: "group-id-123" // 可选
};
const verifyCode = "123456"; // 用户输入的邮箱验证码

// 方式1：不传 verifyCodeType，默认使用邮箱验证码
LinksSubmit.submit(formData, verifyCode)
    .then(response => {
        if (response.code === 200) {
            console.log("提交成功", response.msg);
        }
    })
    .catch(error => {
        console.error("请求出错", error.msg || "网络错误");
    });

// 方式2：显式指定使用邮箱验证码
LinksSubmit.submit(formData, verifyCode, 'email')
    .then(response => {
        if (response.code === 200) {
            console.log("提交成功", response.msg);
        }
    })
    .catch(error => {
        console.error("请求出错", error.msg || "网络错误");
    });
```

**使用图形验证码：**

```javascript
const formData = {
    displayName: "我的博客",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    email: "test@example.com",
    description: "这是一个示例博客"
};
const captchaCode = "ABCD"; // 用户输入的图形验证码

LinksSubmit.submit(formData, captchaCode, 'captcha')
    .then(response => {
        if (response.code === 200) {
            console.log("提交成功", response.msg);
        }
    })
    .catch(error => {
        console.error("请求出错", error.msg || "网络错误");
    });
```

---

## 2. 修改友链

修改已存在的友链信息。需要提供原网站地址 `oldUrl` 和验证邮箱。

### 接口定义

```javascript
LinksSubmit.update(data, verifyCode, verifyCodeType)
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `data` | Object | 是 | 包含友链信息的对象 |
| `verifyCode` | String | 是 | 验证码 |
| `verifyCodeType` | String | 否 | 验证码类型，可选值：`email`（邮箱验证码）、`captcha`（图形验证码），默认为 `email` |

**`data` 对象结构：**

| 属性名 | 类型 | 必填 | 说明                                      |
| :--- | :--- | :--- |:----------------------------------------|
| `oldUrl` | String | **是** | 原网站地址 (用于定位要修改的链接)                      |
| `url` | String | 是 | 新网站地址                                   |
| `displayName` | String | 是 | 网站名称                                    |
| `email` | String | **是** | 联系邮箱 (必须与原链接绑定的邮箱一致)                    |
| `logo` | String | 否 | 网站图标 URL                                |
| `description` | String | 否 | 网站描述                                    |
| `linkPageUrl` | String | 否 | 友链页面地址                                  |
| `groupName` | String | 否 | 分组 ID                                   |
| `rssUrl` | String | 否 | RSS 地址                                  |
| `submitType` | String | 否 | 提交类型，调用 `update` 方法时自动设置为 `UPDATE`，无需手动传递 |

### 示例代码

**使用邮箱验证码（默认）：**

```javascript
const updateData = {
    oldUrl: "https://old-example.com",     // 原网站地址
    url: "https://new-example.com",        // 新网站地址
    displayName: "新的博客名称",
    email: "original@example.com",         // 必须与原链接邮箱一致
    logo: "https://new-example.com/logo.png",
    description: "更新后的描述"
};
const verifyCode = "123456";

// 默认使用邮箱验证码
LinksSubmit.update(updateData, verifyCode)
    .then(response => {
        if (response.code === 200) {
            console.log("修改成功", response.msg);
        }
    })
    .catch(error => {
        console.error("修改失败", error.msg);
    });
```

**使用图形验证码：**

```javascript
const updateData = {
    oldUrl: "https://old-example.com",
    url: "https://new-example.com",
    displayName: "新的博客名称",
    email: "original@example.com",
    logo: "https://new-example.com/logo.png",
    description: "更新后的描述"
};
const captchaCode = "ABCD";

LinksSubmit.update(updateData, captchaCode, 'captcha')
    .then(response => {
        if (response.code === 200) {
            console.log("修改成功", response.msg);
        }
    })
    .catch(error => {
        console.error("修改失败", error.msg);
    });
```

> **注意**：修改操作需要验证邮箱与原链接绑定的邮箱一致，否则会返回错误。

---

## 3. 获取友链分组

获取后台配置的友链分组列表。

### 接口定义

```javascript
LinksSubmit.getLinkGroups()
```

### 示例代码

```javascript
LinksSubmit.getLinkGroups()
    .then(groups => {
        // groups 是一个数组
        groups.forEach(group => {
            console.log(`分组名: ${group.groupName}, ID: ${group.groupId}`);
        });
    })
    .catch(error => {
        console.error("获取分组失败", error);
    });
```

---

## 4. 发送验证码

向指定邮箱发送验证码。

### 接口定义

```javascript
LinksSubmit.sendVerifyCode(email)
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `email` | String | 是 | 接收验证码的邮箱地址 |

### 示例代码

```javascript
const email = "test@example.com";

LinksSubmit.sendVerifyCode(email)
    .then(response => {
        if (response.code === 200) {
            console.log("验证码发送成功");
            // 开始倒计时等UI操作
        }
    })
    .catch(error => {
        console.error("发送失败", error.msg);
    });
```

---

## 5. 获取网站详情 (自动填写)

根据输入的 URL 自动抓取网站标题、描述、Logo 等信息。

### 接口定义

```javascript
LinksSubmit.getLinkDetail(url)
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `url` | String | 是 | 目标网站 URL |

### 示例代码

```javascript
const url = "https://example.com";

LinksSubmit.getLinkDetail(url)
    .then(response => {
        if (response.code === 200) {
            const info = response.data;
            console.log("标题:", info.title);
            console.log("描述:", info.description);
            console.log("Logo:", info.image || info.icon);
            
            // 自动填充表单
        }
    })
    .catch(error => {
        console.error("获取详情失败", error.msg);
    });
```

---

## 6. 获取验证码图片 URL

获取图形验证码的 URL 地址。通常用于刷新验证码图片。

### 接口定义

```javascript
LinksSubmit.getCaptchaUrl()
```

### 返回值

*   `String`: 带有随机参数的验证码图片 URL。

### 示例代码

```javascript
const imgElement = document.getElementById('captcha-img');
imgElement.src = LinksSubmit.getCaptchaUrl();
```

---

## 7. 刷新验证码图片 (便捷方法)

自动刷新指定图片元素的验证码。

### 接口定义

```javascript
LinksSubmit.refreshCaptcha(element)
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `element` | String \| HTMLElement | 是 | 图片元素的 ID 或 DOM 对象 |

### 示例代码

**方式 1：直接在 HTML 中使用 (推荐)**

```html
<!-- 初始加载使用静态路径，点击时调用 refreshCaptcha -->
<img 
  src="/apis/linkssubmit.muyin.site/v1alpha1/captcha" 
  onclick="LinksSubmit.refreshCaptcha(this)" 
  title="点击刷新验证码"
  style="cursor: pointer;"
>
```

**方式 2：传入元素 ID**

```javascript
// 假设图片元素 id="my-captcha"
LinksSubmit.refreshCaptcha('my-captcha');
```

**注意：** HTML 的 `src` 属性不支持直接写 JS 代码（如 `src="LinksSubmit.getCaptchaUrl()"` 是无效的），请使用上述方式。

---

## 验证码类型说明

插件支持两种验证码类型：

### 邮箱验证码 (email)

- 需要先调用 `sendVerifyCode()` 发送验证码到用户邮箱
- 用户输入收到的 6 位数字验证码
- 适合需要验证邮箱真实性的场景

### 图形验证码 (captcha)

- 通过 `getCaptchaUrl()` 或 `refreshCaptcha()` 显示图形验证码
- 用户输入图片中显示的字符
- 适合快速验证、防止机器人提交的场景

根据实际需求选择合适的验证码类型。

---

## 错误处理说明

所有返回 Promise 的接口（除了 `getCaptchaUrl`）在发生错误时都会 reject。
错误对象通常包含 `msg` 属性，表示错误信息。

```javascript
.catch(error => {
    if (error.status === 429) {
        console.warn("操作太频繁，请稍后再试");
    }
    alert(error.msg || "网络错误");
})
```
