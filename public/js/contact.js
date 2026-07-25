(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const messageEl = document.getElementById('form-message');

  if (!form || !messageEl) return;

  function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = 'message visible ' + type;
  }

  function hideMessage() {
    messageEl.textContent = '';
    messageEl.className = 'message';
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    hideMessage();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage(data.message || '留言提交成功！', 'success');
        form.reset();
      } else {
        const errorText =
          data.message ||
          (data.errors && data.errors.length > 0
            ? data.errors.join('；')
            : '提交失败，请稍后重试');
        showMessage(errorText, 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('网络错误，请检查网络连接后重试。', 'error');
    }
  });
})();
