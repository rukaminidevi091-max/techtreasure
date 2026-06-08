// Simple static install helper with persistent banner dismissal
let deferredPrompt = null;
const BANNER_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes
const BANNER_DISMISS_KEY = 'pwa_banner_dismissed';
const INSTALLED_KEY = 'pwa_installed';

function isAppInstalled(){
  try{ return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true; }catch(e){return false}
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('[pwa] beforeinstallprompt captured');
  // show install buttons if present
  showInstallButtonsIfAvailable();
});

// If user installs via browser UI, detect and mark installed
window.addEventListener('appinstalled', (e) => {
  console.log('[pwa] appinstalled event');
  markInstalled();
});

function markInstalled(){
  try{ localStorage.setItem(INSTALLED_KEY, '1'); localStorage.setItem(BANNER_DISMISS_KEY, '1'); }catch(e){}
  hideInstallButtons();
  removeBanner();
}

function handleInstallClick(){
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      console.log('[pwa] userChoice', choice);
      if (choice && choice.outcome === 'accepted') markInstalled();
      deferredPrompt = null;
    });
  } else {
    // fallback: instruct user
    alert('To install this site: open your browser menu and choose "Add to Home screen" or "Install app".');
  }
}

function createInstallBanner(){
  // respect persistent dismissal or installed state
  try{ if (localStorage.getItem(BANNER_DISMISS_KEY) === '1' || localStorage.getItem(INSTALLED_KEY) === '1') return null; }catch(e){}
  if (isAppInstalled()) return null;
  if (document.getElementById('pwa-install-banner')) return null;

  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.right = '0';
  banner.style.zIndex = '9999';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.justifyContent = 'space-between';
  banner.style.padding = '10px 16px';
  banner.style.background = '#0f172a';
  banner.style.color = '#fff';

  const text = document.createElement('div');
  text.innerText = 'Download Our App';
  text.style.fontWeight = '600';

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '8px';

  const installBtn = document.createElement('button');
  installBtn.innerText = 'Get App';
  installBtn.style.padding = '8px 12px';
  installBtn.style.border = 'none';
  installBtn.style.borderRadius = '6px';
  installBtn.style.background = '#06b6d4';
  installBtn.style.color = '#04293a';
  installBtn.style.cursor = 'pointer';
  installBtn.addEventListener('click', handleInstallClick);

  const closeBtn = document.createElement('button');
  closeBtn.innerText = '✕';
  closeBtn.title = 'Close';
  closeBtn.style.padding = '6px 8px';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '6px';
  closeBtn.style.background = 'transparent';
  closeBtn.style.color = '#fff';
  closeBtn.style.cursor = 'pointer';
  closeBtn.addEventListener('click', () => {
    try{ localStorage.setItem(BANNER_DISMISS_KEY, '1'); }catch(e){}
    removeBanner();
  });

  actions.appendChild(installBtn);
  actions.appendChild(closeBtn);

  banner.appendChild(text);
  banner.appendChild(actions);
  return banner;
}

function showBanner(){
  try{ if (localStorage.getItem(BANNER_DISMISS_KEY) === '1' || localStorage.getItem(INSTALLED_KEY) === '1') return; }catch(e){}
  const banner = createInstallBanner();
  if (!banner) return;
  document.body.appendChild(banner);
  banner.style.transform = 'translateY(-100%)';
  banner.style.transition = 'transform 300ms ease';
  requestAnimationFrame(()=> banner.style.transform = 'translateY(0)');
  setTimeout(() => removeBanner(), 15000);
}

function removeBanner(){
  const b = document.getElementById('pwa-install-banner');
  if (!b) return;
  b.style.transform = 'translateY(-100%)';
  setTimeout(() => { if (b.parentNode) b.parentNode.removeChild(b); }, 320);
}

function hideInstallButtons(){
  const d = document.getElementById('pwa-install-btn'); if (d) d.style.display = 'none';
  const m = document.getElementById('pwa-install-btn-mobile'); if (m) m.style.display = 'none';
}

function showInstallButtonsIfAvailable(){
  if (isAppInstalled() || localStorage.getItem(INSTALLED_KEY) === '1') { hideInstallButtons(); return; }
  const d = document.getElementById('pwa-install-btn'); if (d) d.style.display = '';
  const m = document.getElementById('pwa-install-btn-mobile'); if (m) m.style.display = '';
}

function setupInstallButtons(){
  const btn = document.getElementById('pwa-install-btn');
  if (btn && !btn._pwaSetup){ btn.addEventListener('click', handleInstallClick); btn._pwaSetup = true; }
  const btn2 = document.getElementById('pwa-install-btn-mobile');
  if (btn2 && !btn2._pwaSetup){ btn2.addEventListener('click', handleInstallClick); btn2._pwaSetup = true; }
  showInstallButtonsIfAvailable();
}

document.addEventListener('DOMContentLoaded', () => {
  // setup buttons in case navbar is already present
  setupInstallButtons();
  // observe navbar injection so we can attach handlers when it's added later
  observeNavbarInsertion();
  // mark installed if already in standalone
  if (isAppInstalled()) markInstalled();
});

// Watch for navbar content inserted dynamically and attach handlers
function observeNavbarInsertion(){
  const container = document.getElementById('navbar-container');
  if (!container){
    // try again once DOM is ready (navbar.js will insert later)
    return;
  }
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations){
      if (m.type === 'childList' && m.addedNodes.length){
        setupInstallButtons();
      }
    }
  });
  obs.observe(container, { childList: true, subtree: true });
}

// Optional: register basic service worker if present (helps installability)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(reg => {
    console.log('[pwa] service-worker registered', reg.scope);
  }).catch(()=>{});
}
