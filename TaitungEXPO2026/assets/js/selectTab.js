(function () {
  const MOBILE_BP = 768;

  const group   = document.querySelector('.js-tabGroup');
  const trigger = group.querySelector('.js-tabSelect');
  const label   = group.querySelector('.js-selectedOption');
  const options = group.querySelectorAll('.js-tabOption-item');
  const panels  = group.querySelectorAll('.js-tabList-item');

  let isOpen = false;

  function isMobile() { return window.innerWidth <= MOBILE_BP; }

  function openDropdown() {
    isOpen = true;
    group.classList.add('is-opened');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    isOpen = false;
    group.classList.remove('is-opened');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function selectTab(tabId, optionEl) {
    // Update dropdown label (used on mobile)
    label.textContent = optionEl.textContent.trim();

    // Update active option highlight
    options.forEach(o => o.classList.remove('is-active'));
    optionEl.classList.add('is-active');

    // Update active panel
    panels.forEach(p => p.classList.remove('is-active'));
    const target = group.querySelector(`[data-tab-content="${tabId}"]`);
    if (target) target.classList.add('is-active');

    // Only close dropdown on mobile
    if (isMobile()) closeDropdown();
  }

  // Dropdown trigger — only functional on mobile (CSS hides it on desktop)
  trigger.addEventListener('click', () => {
    if (!isMobile()) return;
    isOpen ? closeDropdown() : openDropdown();
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      selectTab(opt.dataset.tabId, opt);
    });
  });

  // Close dropdown when clicking outside (mobile only)
  document.addEventListener('click', e => {
    if (isMobile() && isOpen && !group.contains(e.target)) closeDropdown();
  });

  // Escape key closes dropdown
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeDropdown();
  });

  // If resizing from mobile → desktop, make sure dropdown state is cleared
  window.addEventListener('resize', () => {
    if (!isMobile() && isOpen) closeDropdown();
  });
})();