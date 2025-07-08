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

  // Initial UI state
  updateShareUI();
}); 