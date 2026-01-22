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
        'Authorization': 'Bearer sk-d89e8cfb1eea4dfd90ddc3f5a8899910',
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
