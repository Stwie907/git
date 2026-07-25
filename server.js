const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ensure data file exists
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}

ensureDataFile();

// Basic HTML escape to reduce XSS risk
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return escapeHtml(input.trim());
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/contact - receive contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('姓名不能为空');
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('邮箱不能为空');
  } else if (!isValidEmail(email.trim())) {
    errors.push('邮箱格式不正确');
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('留言内容不能为空');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: '提交失败，请检查表单内容',
      errors
    });
  }

  const submission = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    message: sanitizeInput(message),
    submittedAt: new Date().toISOString()
  };

  try {
    let messages = [];
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    if (fileContent.trim().length > 0) {
      messages = JSON.parse(fileContent);
      if (!Array.isArray(messages)) {
        messages = [];
      }
    }

    messages.push(submission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf8');

    return res.status(200).json({
      success: true,
      message: '留言提交成功，我们会尽快与您联系！',
      data: submission
    });
  } catch (err) {
    console.error('Failed to save message:', err);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误，请稍后重试'
    });
  }
});

// Health check endpoint for verification
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// SPA fallback: serve index.html for non-API, non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Barista website server is running at http://localhost:${PORT}`);
});

module.exports = app;
