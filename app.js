// JavaScript for Tech for Girls Registration will go here 

// Placeholder: Add event listeners and logic for form, WhatsApp sharing, and validation here
// Example:
// document.getElementById('registrationForm').addEventListener('submit', function(e) { ... }); 

document.addEventListener('DOMContentLoaded', function () {
  const shareBtn = document.getElementById('whatsappShare');
  const shareAnimatedCount = document.getElementById('shareAnimatedCount');
  const shareProgressBar = document.getElementById('shareProgressBar');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  const form = document.getElementById('registrationForm');
  const screenshotInput = document.getElementById('screenshot');
  const thankYouModal = document.getElementById('thankYouModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  let shareCount = 0;
  let animatedShareCount = 0;
  const maxShares = 5;

  function animateShareCounter(target) {
    const start = animatedShareCount;
    const end = target;
    const duration = 400;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      animatedShareCount = Math.round(start + (end - start) * progress);
      shareAnimatedCount.textContent = `Click count: ${animatedShareCount}/${maxShares}`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animatedShareCount = end;
      }
    }
    requestAnimationFrame(animate);
  }

  function updateShareUI() {
    animateShareCounter(shareCount);
    const percent = (shareCount / maxShares) * 100;
    shareProgressBar.style.width = percent + '%';
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

  // Modal logic
  function showThankYouModal() {
    thankYouModal.classList.add('active');
  }
  function hideThankYouModal() {
    thankYouModal.classList.remove('active');
  }
  closeModalBtn.addEventListener('click', hideThankYouModal);
  thankYouModal.addEventListener('click', function(e) {
    if (e.target === thankYouModal) hideThankYouModal();
  });

  // Enforce single submission
  if (localStorage.getItem('submitted') === 'true') {
    form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
    formMessage.textContent = '🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!';
    return;
  }

  let screenshotFile = null;
  const screenshotPreview = document.createElement('div');
  screenshotPreview.id = 'screenshotPreview';
  screenshotInput.parentNode.appendChild(screenshotPreview);

  screenshotInput.addEventListener('change', function (e) {
    screenshotFile = e.target.files[0] || null;
    screenshotPreview.innerHTML = '';
    if (screenshotFile) {
      if (screenshotFile.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '120px';
        img.alt = 'Screenshot Preview';
        img.src = URL.createObjectURL(screenshotFile);
        screenshotPreview.appendChild(img);
      } else {
        screenshotPreview.textContent = `Selected file: ${screenshotFile.name}`;
      }
    }
  });

  // Live validation
  const validators = {
    name: v => v.trim().length > 0,
    phone: v => /^\d{10,15}$/.test(v),
    email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
    college: v => v.trim().length > 0,
    department: v => v.trim().length > 0,
    screenshot: () => !!screenshotFile
  };
  const errorMessages = {
    name: 'Name is required.',
    phone: 'Phone must be 10-15 digits.',
    email: 'Enter a valid email address.',
    college: 'College is required.',
    department: 'Department is required.',
    screenshot: 'Screenshot is required.'
  };
  function validateField(field) {
    const value = field.type === 'file' ? '' : field.value;
    const valid = validators[field.name](value);
    let errorElem = field.parentNode.querySelector('.error-message');
    if (!errorElem) {
      errorElem = document.createElement('div');
      errorElem.className = 'error-message';
      field.parentNode.appendChild(errorElem);
    }
    if (!valid) {
      errorElem.textContent = errorMessages[field.name];
      field.classList.add('invalid');
    } else {
      errorElem.textContent = '';
      field.classList.remove('invalid');
    }
    return valid;
  }
  const fields = ['name', 'phone', 'email', 'college', 'department'];
  fields.forEach(name => {
    const field = form[name];
    field.addEventListener('input', () => {
      validateField(field);
      checkFormValidity();
    });
  });
  screenshotInput.addEventListener('change', () => {
    validateField(screenshotInput);
    checkFormValidity();
  });
  function checkFormValidity() {
    const allValid = fields.every(name => validateField(form[name])) && validators.screenshot();
    if (allValid && shareCount >= maxShares) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

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

    // Use endpoint from config.js
    const endpoint = window.APP_CONFIG && window.APP_CONFIG.APPS_SCRIPT_URL;
    if (!endpoint) {
      formMessage.textContent = 'Configuration error: Apps Script endpoint not set.';
      return;
    }
    fetch(endpoint, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
          formMessage.textContent = '';
          localStorage.setItem('submitted', 'true');
          showThankYouModal();
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