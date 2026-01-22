// Netlify Function - 千问OCR代理
exports.handler = async function(event, context) {
  // 只允许POST请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { image, text } = JSON.parse(event.body);
    
    // 调用千问API
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.QWEN_API_KEY}`,
```

5. 提交更改
6. 等待自动重新部署

---

### 第五步：测试

1. 访问你的网站：`https://你的站点名.netlify.app`
2. 上传图片
3. 选中图片
4. 点击 **"提取文字"**
5. 成功！🎉

---

## 🔍 常见问题

### Q1: 部署失败怎么办？
**A:** 查看Netlify的 **"Deploy log"**：
- 点击失败的部署
- 查看错误信息
- 通常是文件结构问题

### Q2: OCR还是失败？
**A:** 按F12打开控制台，查看错误：
- **404**: API地址配置错误
- **401**: API密钥无效
- **CORS**: 前端地址配置错误

### Q3: 如何更新代码？
**A:** 
1. 在GitHub上编辑文件
2. 提交更改
3. Netlify自动重新部署

### Q4: 费用多少？
**A:** 
- Netlify：免费（100GB带宽/月，125k函数调用/月）
- 千问API：按量付费（几分钱一次）

---

## 📝 完整文件结构

部署后的仓库应该是这样的：
```
cosmetic-compliance-ai/
├── index.html              # 前端页面
├── netlify.toml            # Netlify配置
├── README.md               # 说明文档
└── netlify/
    └── functions/
        └── qwen-ocr.js     # 代理函数
        'X-DashScope-SSE': 'disable'
      },
      body: JSON.stringify({
        model: 'qwen-vl-plus',
        input: {
          messages: [
            {
              role: 'user',
              content: [
                { image: image },
                { text: text || '请识别图片中的所有文字内容，直接输出识别到的文字，不要添加任何解释。' }
              ]
            }
          ]
        },
        parameters: {
          result_format: 'message'
        }
      })
    });

    const data = await response.json();

    // 返回结果
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
