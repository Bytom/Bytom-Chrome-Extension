module.exports = {
  manifest_version: 2,
  name: 'Bytom Wallet',
  description: 'Bytom Chrome Extension Wallet',
  version: '1.0.0',
  author: 'yanbo,xuhongxing',
  web_accessible_resources: ['js/inject.js', 'wasm/main.wasm'],
  browser_action: {
    default_popup: 'pages/popup.html',
    default_icon: 'icons/logo.png'
  },
  icons: {
    '16': 'icons/logo.png',
    '48': 'icons/logo.png',
    '128': 'icons/logo.png'
  },
  permissions: [
    '*://*/',
    'storage',
    'contextMenus',
    'clipboardWrite',
    'clipboardRead',
    'background'
  ],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  content_scripts: [
    {
      js: ['js/content.js'],
      run_at: 'document_end',
      matches: ['<all_urls>'],
      all_frames: false
    }
  ],
  background: {
    scripts: ['js/background.js']
  }
}
