/* ============================================================
   KellyFit Padrao 2026 — Landing Page Interactions
   ============================================================ */
(function () {
  'use strict';

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    Theme.init();
    Particles.init('particles-canvas');
    initNavbar();
    initScrollReveal();
    initAuthModal();
    initCTAButtons();
    checkAlreadyLoggedIn();
    initWaterCirclesAnimation();
  });

  // ---- Navbar scroll effect ----
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobile-nav');
    var mobileClose = document.getElementById('mobile-nav-close');

    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        var open = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }
    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav on link click
    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          closeMobileNav();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    function closeMobileNav() {
      if (mobileNav) mobileNav.classList.remove('open');
      if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
      document.body.style.overflow = '';
    }
  }

  // ---- Scroll Reveal ----
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // ---- Auth Modal ----
  function initAuthModal() {
    var overlay = document.getElementById('auth-overlay');
    var closeBtn = document.getElementById('auth-modal-close');
    var tabRegister = document.getElementById('tab-register');
    var tabLogin = document.getElementById('tab-login');
    var formRegister = document.getElementById('form-register');
    var formLogin = document.getElementById('form-login');
    var switchToRegister = document.getElementById('switch-to-register');

    if (!overlay) return;

    function openModal(tab) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      switchTab(tab || 'register');
      setTimeout(function () {
        var firstInput = overlay.querySelector('input:not([type=hidden])');
        if (firstInput) firstInput.focus();
      }, 100);
    }

    function closeModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      clearErrors();
    }

    function switchTab(tab) {
      if (tab === 'register') {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
        tabRegister.setAttribute('aria-selected', 'true');
        tabLogin.setAttribute('aria-selected', 'false');
      } else {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
        tabLogin.setAttribute('aria-selected', 'true');
        tabRegister.setAttribute('aria-selected', 'false');
      }
      clearErrors();
    }

    function clearErrors() {
      var regErr = document.getElementById('register-error');
      var loginErr = document.getElementById('login-error');
      if (regErr) { regErr.style.display = 'none'; regErr.textContent = ''; }
      if (loginErr) { loginErr.style.display = 'none'; loginErr.textContent = ''; }
    }

    function showError(id, msg) {
      var el = document.getElementById(id);
      if (el) { el.style.display = 'flex'; el.textContent = msg; }
    }

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    // Tab switching
    if (tabRegister) tabRegister.addEventListener('click', function () { switchTab('register'); });
    if (tabLogin) tabLogin.addEventListener('click', function () { switchTab('login'); });
    if (switchToRegister) switchToRegister.addEventListener('click', function () { switchTab('register'); });

    // Register submit
    if (formRegister) {
      formRegister.addEventListener('submit', async function (e) {
        e.preventDefault();
        var name = document.getElementById('reg-name').value.trim();
        var email = document.getElementById('reg-email').value.trim();
        var password = document.getElementById('reg-password').value;
        var btn = formRegister.querySelector('button[type=submit]');
        btn.disabled = true;
        btn.textContent = 'Criando conta...';

        var result = await Auth.register(name, email, password);
        if (result.ok) {
          closeModal();
          Toast.success('Conta criada! Bem-vindo ao KellyFit, ' + name + '!');
          setTimeout(function () {
            window.location.href = 'quiz.html';
          }, 1200);
        } else {
          showError('register-error', result.msg);
          btn.disabled = false;
          btn.innerHTML = 'Criar Conta e Comecar Trial <span aria-hidden="true">&#8594;</span>';
        }
      });
    }

    // Login submit
    if (formLogin) {
      formLogin.addEventListener('submit', async function (e) {
        e.preventDefault();
        var email = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-password').value;
        var btn = formLogin.querySelector('button[type=submit]');
        btn.disabled = true;
        btn.textContent = 'Entrando...';

        var result = await Auth.login(email, password);
        if (result.ok) {
          closeModal();
          Toast.success('Bem-vindo de volta, ' + result.user.name + '!');
          var trialValid = await Auth.isTrialValid();
          setTimeout(function () {
            if (result.user.quizDone) {
              window.location.href = 'app.html';
            } else {
              window.location.href = 'quiz.html';
            }
          }, 800);
        } else {
          showError('login-error', result.msg);
          btn.disabled = false;
          btn.innerHTML = 'Entrar <span aria-hidden="true">&#8594;</span>';
        }
      });
    }

    // Expose open function globally
    window._openAuthModal = openModal;
  }

  // ---- CTA Buttons ----
  function initCTAButtons() {
    var registerIds = ['btn-register', 'hero-btn-register', 'pricing-btn-register', 'cta-btn-register', 'mobile-btn-register', 'footer-register-link'];
    var loginIds = ['btn-login', 'hero-btn-login', 'footer-login-link'];

    registerIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          if (window._openAuthModal) window._openAuthModal('register');
        });
      }
    });

    loginIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          if (window._openAuthModal) window._openAuthModal('login');
        });
      }
    });
  }

  // ---- Check already logged in ----
  async function checkAlreadyLoggedIn() {
    var loggedIn = await Auth.isLoggedIn();
    if (!loggedIn) return;
    var user = await Auth.getCurrentUser();
    if (!user) return;

    // Update nav buttons to show user name
    var btnRegister = document.getElementById('btn-register');
    var btnLogin = document.getElementById('btn-login');
    if (btnRegister) {
      btnRegister.textContent = 'Abrir App';
      btnRegister.onclick = function () { window.location.href = 'app.html'; };
    }
    if (btnLogin) {
      btnLogin.textContent = 'Sair';
      btnLogin.onclick = function () {
        Auth.logout();
        Toast.info('Ate logo!');
        setTimeout(function () { window.location.reload(); }, 800);
      };
    }
  }

  // ---- Water circles animation (hero preview) ----
  function initWaterCirclesAnimation() {
    var circles = document.querySelectorAll('.water-circle');
    if (!circles.length) return;
    var filled = 5;
    var max = circles.length;

    function updateCircles() {
      circles.forEach(function (c, i) {
        if (i < filled) {
          c.classList.add('filled');
        } else {
          c.classList.remove('filled');
        }
      });
    }
    updateCircles();

    setInterval(function () {
      filled = filled < max ? filled + 1 : 0;
      updateCircles();
    }, 2000);
  }

}());
