/* Shared site behaviour: surfaces load and submit failures instead of failing silently. */
(function () {
  'use strict';

  var COUNTER_TIMEOUT_MS = 8000;

  function warn(message, detail) {
    if (window.console && typeof console.warn === 'function') {
      console.warn('[site] ' + message, detail === undefined ? '' : detail);
    }
  }

  function markImageBroken(img) {
    if (img.getAttribute('data-load-failed') === 'true') return;
    img.setAttribute('data-load-failed', 'true');

    var label = img.getAttribute('alt') || 'Image';
    var placeholder = document.createElement('span');
    placeholder.className = 'media-error';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', label + ' (unavailable)');
    placeholder.textContent = label + ' — image unavailable';

    var link = img.parentNode;
    if (link && link.tagName === 'A') {
      link.parentNode.replaceChild(placeholder, link);
    } else if (img.parentNode) {
      img.parentNode.replaceChild(placeholder, img);
    }

    warn('image failed to load: ' + (img.currentSrc || img.src));
  }

  function isBusuanziScript(src) {
    return typeof src === 'string' && src.indexOf('busuanzi') !== -1;
  }

  function counterUnavailable(reason) {
    var counter = document.querySelector('.visitor-counter');
    if (!counter || counter.getAttribute('data-state') === 'failed') return;
    counter.setAttribute('data-state', 'failed');
    counter.textContent = 'Visitor counter unavailable';
    warn('visitor counter unavailable: ' + reason);
  }

  function counterHasValues() {
    var uv = document.getElementById('busuanzi_value_site_uv');
    var pv = document.getElementById('busuanzi_value_site_pv');
    function filled(node) {
      return !!node && /\d/.test(node.textContent || '');
    }
    return filled(uv) || filled(pv);
  }

  function watchVisitorCounter() {
    var counter = document.querySelector('.visitor-counter');
    if (!counter) return;
    window.setTimeout(function () {
      if (!counterHasValues()) {
        counterUnavailable('no value received within ' + COUNTER_TIMEOUT_MS + 'ms');
      }
    }, COUNTER_TIMEOUT_MS);
  }

  /* Resource load errors do not bubble, so listen in the capture phase. */
  window.addEventListener('error', function (event) {
    var target = event.target;
    if (!target || target === window) return;
    if (target.tagName === 'IMG') {
      markImageBroken(target);
    } else if (target.tagName === 'SCRIPT') {
      var src = target.getAttribute('src') || '';
      if (isBusuanziScript(src)) {
        counterUnavailable('script failed to load');
      } else {
        warn('script failed to load: ' + src);
      }
    } else if (target.tagName === 'LINK') {
      warn('stylesheet failed to load: ' + (target.getAttribute('href') || ''));
    }
  }, true);

  function checkAlreadyLoadedImages() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      if (img.complete && img.naturalWidth === 0) markImageBroken(img);
    }
  }

  function wireContactForm() {
    var form = document.querySelector('form[data-mailto]');
    if (!form) return;

    var address = form.getAttribute('data-mailto');
    var status = form.querySelector('.form-status');

    function setStatus(message, isError) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status' + (isError ? ' form-status-error' : '');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = (form.elements.name && form.elements.name.value || '').trim();
      var email = (form.elements.email && form.elements.email.value || '').trim();
      var message = (form.elements.message && form.elements.message.value || '').trim();

      if (!name || !email || !message) {
        setStatus('Please fill in your name, email, and message.', true);
        return;
      }

      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      var url =
        'mailto:' + address +
        '?subject=' + encodeURIComponent('Website message from ' + name) +
        '&body=' + encodeURIComponent(body);

      if (url.length > 2000) {
        setStatus(
          'Your message is too long to send through a mail client. Please email ' +
            address + ' directly.',
          true
        );
        return;
      }

      try {
        window.location.href = url;
      } catch (err) {
        setStatus('Could not open your mail client. Please email ' + address + ' directly.', true);
        warn('mailto navigation failed', err);
        return;
      }

      setStatus(
        'Your mail client should now be open. If nothing happened, email ' + address + ' directly.',
        false
      );
    });
  }

  function init() {
    checkAlreadyLoadedImages();
    watchVisitorCounter();
    wireContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
