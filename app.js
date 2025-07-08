// JavaScript for Tech for Girls Registration will go here 

// Placeholder: Add event listeners and logic for form, WhatsApp sharing, and validation here
// Example:
// document.getElementById('registrationForm').addEventListener('submit', function(e) { ... }); 

document.addEventListener('DOMContentLoaded', function () {
  const shareBtn = document.getElementById('whatsappShare');
  const shareCountSpan = document.getElementById('shareCount');
  const shareProgress = document.getElementById('shareProgress');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  const form = document.getElementById('registrationForm');
  const screenshotInput = document.getElementById('screenshot');

  let shareCount = 0;
  const maxShares = 5;

  function updateShareUI() {
    shareCountSpan.textContent = `Click count: ${shareCount}/${maxShares}`;
    shareProgress.value = shareCount;
    if (shareCount >= maxShares) {
      shareBtn.disabled = true;
      shareBtn.textContent = 'Sharing complete';
      formMessage.textContent = 'Sharing complete. Please continue.';
      submitBtn.disabled = false;
    } else {
      formMessage.textContent = '';
      submitBtn.disabled = true;
    }
  }

  shareBtn.addEventListener('click', function () {
    if (shareCount < maxShares) {
      const message = encodeURIComponent('Hey Buddy, Join Tech For Girls Community');
      const url = `https://wa.me/?text=${message}`;
      window.open(url, '_blank');
      shareCount++;
      updateShareUI();
    }
  });

  // Enforce single submission
  if (localStorage.getItem('submitted') === 'true') {
    form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
    formMessage.textContent = '🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!';
    return;
  }

  let screenshotFile = null;
  screenshotInput.addEventListener('change', function (e) {
    screenshotFile = e.target.files[0] || null;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!screenshotFile) {
      formMessage.textContent = 'Please upload a screenshot.';
      return;
    }
    // Collect form data
    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('phone', form.phone.value);
    formData.append('email', form.email.value);
    formData.append('college', form.college.value);
    formData.append('department', form.department.value);
    formData.append('screenshot', screenshotFile);

    // TODO: Replace with your Google Apps Script endpoint URL
    const endpoint = 'https://script.google.com/macros/s/AKfycbz8ufZaH0AbEpbaVC1_kIhJEzXY0LPCd5tvC0hJ5xmi0bvba3V0l4QONNVZyy2v2pM-6Q/exec';

    fetch(endpoint, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
          formMessage.textContent = '🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!';
          localStorage.setItem('submitted', 'true');
        } else {
          formMessage.textContent = data.message || 'Submission failed. Please try again.';
        }
      })
      .catch(() => {
        formMessage.textContent = 'Submission failed. Please try again.';
      });
  });

  // Initial UI state
  updateShareUI();
}); 