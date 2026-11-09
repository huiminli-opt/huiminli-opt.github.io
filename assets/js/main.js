/* Mobile navigation. */
(() => {
  'use strict';
  const toggle = document.getElementById('menu-toggle');
  const close = document.getElementById('menu-close');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  if (!toggle || !close || !menu || !overlay) return;
  let expanded = false;
  function setMenu(open, restoreFocus = true) {
    expanded = open;
    menu.classList.toggle('mobile-menu--open', open);
    overlay.classList.toggle('mobile-menu-overlay--visible', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) close.focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(true));
  close.addEventListener('click', () => setMenu(false));
  overlay.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false, false)));
  document.addEventListener('keydown', event => {
    if (!expanded) return;
    if (event.key === 'Escape') setMenu(false);
    if (event.key === 'Tab') {
      const items = Array.from(menu.querySelectorAll('button, a[href]'));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
    if (event.matches && expanded) setMenu(false, false);
  });
})();
