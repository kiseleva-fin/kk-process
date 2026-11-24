(function () {
  document.documentElement.classList.add('js');
  // Текущий год в подвале
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Тень у шапки при прокрутке
  var header = document.querySelector('.header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Бургер-меню
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.hidden = !open;
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) {
      if (m.matches) setMenu(false);
    });
  }

  // Плавающая кнопка на мобильных: после первого экрана, но не над блоком контактов
  var cta = document.querySelector('.sticky-cta');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  if (cta && hero && contact && 'IntersectionObserver' in window) {
    var heroVisible = true, contactVisible = false;
    var update = function () { cta.classList.toggle('show', !heroVisible && !contactVisible); };
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (en) { contactVisible = en[0].isIntersecting; update(); }).observe(contact);
  }

  // Плавное появление карточек
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 0.08 + 's';
    io.observe(el);
  });
})();
