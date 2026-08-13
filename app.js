document.addEventListener('DOMContentLoaded', () => {
  const metaTitleInput = document.getElementById('metaTitle');
  const metaDescriptionInput = document.getElementById('metaDescription');
  const metaUrlInput = document.getElementById('metaUrl');
  const siteNameInput = document.getElementById('siteName');
  const imageUrlInput = document.getElementById('imageUrl');
  const twitterCardSelect = document.getElementById('twitterCard');
  const twitterHandleInput = document.getElementById('twitterHandle');
  const schemaTypeSelect = document.getElementById('schemaType');

  // Previews
  const prevImgFb = document.getElementById('prevImgFb');
  const prevDomainFb = document.getElementById('prevDomainFb');
  const prevTitleFb = document.getElementById('prevTitleFb');
  const prevDescFb = document.getElementById('prevDescFb');

  const prevUrlGoogle = document.getElementById('prevUrlGoogle');
  const prevTitleGoogle = document.getElementById('prevTitleGoogle');
  const prevDescGoogle = document.getElementById('prevDescGoogle');

  const metaOutput = document.getElementById('metaOutput');
  const btnCopyMeta = document.getElementById('btnCopyMeta');

  function updateMeta() {
    const title = metaTitleInput.value.trim();
    const desc = metaDescriptionInput.value.trim();
    const url = metaUrlInput.value.trim();
    const siteName = siteNameInput.value.trim();
    const img = imageUrlInput.value.trim();
    const twCard = twitterCardSelect.value;
    const twHandle = twitterHandleInput.value.trim();
    const schemaType = schemaTypeSelect.value;

    // Extract Domain
    let domain = 'YOURDOMAIN.COM';
    try {
      if (url) {
        const u = new URL(url.startsWith('http') ? url : `https://${url}`);
        domain = u.hostname.toUpperCase();
      }
    } catch (e) {}

    // Update FB Preview
    prevImgFb.src = img || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop';
    prevDomainFb.textContent = domain;
    prevTitleFb.textContent = title || 'Page Title Preview';
    prevDescFb.textContent = desc || 'Meta description text preview...';

    // Update Google Preview
    prevUrlGoogle.textContent = url ? `${url} › page` : 'https://example.com';
    prevTitleGoogle.textContent = title || 'Page Title Preview';
    prevDescGoogle.textContent = desc || 'Meta description text preview...';

    // Build Code Block
    const code = `<!-- Primary Meta Tags -->
<title>${escapeHtml(title)}</title>
<meta name="title" content="${escapeHtml(title)}">
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${escapeHtml(url)}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(url)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:image" content="${escapeHtml(img)}">
<meta property="og:site_name" content="${escapeHtml(siteName)}">

<!-- Twitter Cards -->
<meta property="twitter:card" content="${escapeHtml(twCard)}">
<meta property="twitter:url" content="${escapeHtml(url)}">
<meta property="twitter:title" content="${escapeHtml(title)}">
<meta property="twitter:description" content="${escapeHtml(desc)}">
<meta property="twitter:image" content="${escapeHtml(img)}">
${twHandle ? `<meta property="twitter:site" content="${escapeHtml(twHandle)}">` : ''}

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "${escapeHtml(schemaType)}",
  "name": "${escapeHtml(title)}",
  "url": "${escapeHtml(url)}",
  "description": "${escapeHtml(desc)}",
  "image": "${escapeHtml(img)}"
}
<\/script>`;

    metaOutput.value = code;
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  btnCopyMeta.addEventListener('click', () => {
    navigator.clipboard.writeText(metaOutput.value).then(() => {
      btnCopyMeta.textContent = '✓ Copied!';
      setTimeout(() => btnCopyMeta.textContent = '📋 Copy Code', 2000);
    });
  });

  const inputs = [
    metaTitleInput, metaDescriptionInput, metaUrlInput, siteNameInput,
    imageUrlInput, twitterCardSelect, twitterHandleInput, schemaTypeSelect
  ];

  inputs.forEach(input => {
    input.addEventListener('input', updateMeta);
    input.addEventListener('change', updateMeta);
  });

  updateMeta();
});

// Global Toast Notification Helper
window.showToast = function(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:rgba(16,185,129,0.95);color:#000;padding:12px 20px;border-radius:10px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,0.5);z-index:9999;transition:all 0.3s ease;transform:translateY(100px);opacity:0;backdrop-filter:blur(10px);';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3000);
};
