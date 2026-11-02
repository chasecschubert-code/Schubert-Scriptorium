/* Footer-only enhancements for Constant Contact's asynchronously injected form. */
(function () {
  var description = 'Receive our bi-monthly newsletters exploring biblical manuscripts';
  function update() {
    document.querySelectorAll('.footer-subscribe').forEach(function (footer) {
      var widget = footer.querySelector('.ctct-inline-form');
      if (!widget) return;
      var email = widget.querySelector('input[type="email"], input[name="email"]');
      if (email) {
        if (email.placeholder !== 'YOUR EMAIL ADDRESS') email.placeholder = 'YOUR EMAIL ADDRESS';
        if (email.getAttribute('aria-label') !== 'Your email address') email.setAttribute('aria-label', 'Your email address');
      }
      /* Remove only the vendor-rendered repeated description, not our heading. */
      Array.from(widget.querySelectorAll('p, div, span, small')).forEach(function (node) {
        var t = (node.textContent || '').trim().replace(/\\s+/g, ' ');
        if (!t.startsWith(description)) return;
        if (node.querySelector('input, button, form')) return;
        if (Array.from(node.children).some(function (child) { return (child.textContent || '').trim().startsWith(description); })) return;
        if (!node.classList.contains('ss-duplicate-description')) node.classList.add('ss-duplicate-description');
      });
      var form = widget.querySelector('form');
      if (!form) return;
      var submit = form.querySelector('button[type="submit"], input[type="submit"], button.ctct-form-button, .ctct-form-button');
      if (!submit) return;
      /* Keep the email field and submit button together in a single compact row. */
      if (email && !form.querySelector('.ss-signup-row')) {
        var field = email.closest('.ctct-form-field') || email.parentElement;
        var submitWrapper = submit.closest('.ctct-form-button') || submit;
        if (field && submitWrapper && field !== submitWrapper && form.contains(field) && form.contains(submitWrapper)) {
          var row = document.createElement('div');
          row.className = 'ss-signup-row';
          field.parentNode.insertBefore(row, field);
          row.appendChild(field);
          row.appendChild(submitWrapper);
        }
      }
      /* Move the complete legal notice to the end of the actual form, after submit. */
      var candidates = Array.from(form.querySelectorAll('p, div, small, span'));
      var notice = candidates.find(function (node) {
        var t = node.textContent || '';
        return t.includes('By submitting this form') && t.includes('SafeUnsubscribe') &&
          !node.querySelector('button, input, form') &&
          !Array.from(node.children).some(function (child) {
            return (child.textContent || '').includes('By submitting this form') && (child.textContent || '').includes('SafeUnsubscribe');
          });
      });
      if (notice) {
        if (!notice.classList.contains('ss-legal-notice')) notice.classList.add('ss-legal-notice');
        if (form.lastElementChild !== notice) form.appendChild(notice);
      }
    });
  }
  function start() {
    var footer = document.querySelector('.footer-subscribe');
    if (!footer) return;
    update();
    new MutationObserver(update).observe(footer, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
