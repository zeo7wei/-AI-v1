# 千问OCR代理 - Netlify部署说明

## 📦 部署步骤

### 1. 创建GitHub仓库
1. 登录 GitHub
2. 创建新仓库（如：qwen-ocr-proxy）
3. 上传这个文件夹的所有文件

### 2. 部署到Netlify
1. 访问 https://app.netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 选择 "GitHub"
4. 选择刚创建的仓库
5. 点击 "Deploy site"

### 3. 获取API地址
部署完成后，Netlify会给你一个地址，如：
```
https://your-site-name.netlify.app
```

你的API端点就是：
```
https://your-site-name.netlify.app/.netlify/functions/qwen-ocr
```

### 4. 修改前端代码
在你的HTML文件中，找到OCR函数，将：
```javascript
const response = await fetch(QWEN_API_URL, {
```

改为：
```javascript
const response = await fetch('https://your-site-name.netlify.app/.netlify/functions/qwen-ocr', {
```

并修改请求体：
```javascript
body: JSON.stringify({
  image: img.data,
  text: '请识别图片中的所有文字内容，直接输出识别到的文字，不要添加任何解释。'
})
```

## 🔐 安全说明

⚠️ **重要**：当前API密钥直接写在代码中，建议改为环境变量：

1. 在Netlify项目设置中：
   - 进入 "Site settings" → "Environment variables"
   - 添加变量：`QWEN_API_KEY` = `sk-d89e8cfb1eea4dfd90ddc3f5a8899910`

2. 修改函数代码：
```javascript
'Authorization': `Bearer ${process.env.QWEN_API_KEY}`
```

## 📝 测试

部署完成后，可以用以下命令测试：

```bash
curl -X POST https://your-site-name.netlify.app/.netlify/functions/qwen-ocr \
  -H "Content-Type: application/json" \
  -d '{"image":"data:image/jpeg;base64,...","text":"识别文字"}'
```

## 💰 费用

- Netlify Functions 免费额度：125,000 次请求/月
- 千问API：按量付费

基本够用！
