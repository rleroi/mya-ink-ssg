// TEMP: lettertype-vergelijker voor de preview. Niet zichtbaar op mya-ink.nl. Verwijderen vóór livegang.
// Kies via de knop rechtsonder of met ?font=<key>; de keuze blijft bewaard tijdens het klikken door de site.

export const fontPreviewScript = `(function () {
  if (location.hostname === 'mya-ink.nl' || location.hostname === 'www.mya-ink.nl') return;

  var FONTS = {
    'bodoni': ['Bodoni Moda (huidig)', null, null, 500],
    'libre-bodoni': ['Libre Bodoni', 'Libre Bodoni', 'Libre+Bodoni:ital,wght@0,400..700;1,400..700', 400],
    'playfair': ['Playfair Display', 'Playfair Display', 'Playfair+Display:ital,wght@0,400..900;1,400..900', 500],
    'dm-serif': ['DM Serif Display', 'DM Serif Display', 'DM+Serif+Display:ital@0;1', 400],
    'fraunces': ['Fraunces', 'Fraunces', 'Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700', 400],
    'newsreader': ['Newsreader', 'Newsreader', 'Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700', 400]
  };

  var key = new URLSearchParams(location.search).get('font');
  try {
    if (key) localStorage.setItem('font-preview', key);
    else key = localStorage.getItem('font-preview');
  } catch (e) {}
  if (!FONTS[key]) key = 'bodoni';

  var font = FONTS[key];
  if (font[2]) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + font[2] + '&display=swap';
    document.head.appendChild(link);
    document.documentElement.style.setProperty('--font-display', '"' + font[1] + '"');
  }
  document.documentElement.style.setProperty('--font-display-weight', font[3]);

  document.addEventListener('DOMContentLoaded', function () {
    var select = document.createElement('select');
    select.setAttribute('aria-label', 'Lettertype voor koppen');
    select.style.cssText = 'position:fixed;right:12px;bottom:104px;z-index:70;font:14px Manrope,sans-serif;padding:10px 12px;border-radius:999px;border:1px solid #161514;background:#fff;color:#161514;box-shadow:0 4px 16px rgba(0,0,0,.15)';
    Object.keys(FONTS).forEach(function (k) {
      var option = document.createElement('option');
      option.value = k;
      option.textContent = FONTS[k][0];
      option.selected = k === key;
      select.appendChild(option);
    });
    select.addEventListener('change', function () {
      try { localStorage.setItem('font-preview', select.value); } catch (e) {}
      location.reload();
    });
    document.body.appendChild(select);
  });
})();`;
