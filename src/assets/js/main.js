/**
 * Handyman Pro — Main JavaScript
 *
 * Handles: smooth scroll, sticky header, mobile menu,
 * form validation/submission (Netlify Forms), scroll animations.
 */
(function () {
  'use strict';

  var header     = document.getElementById('site-header');
  var nav        = document.getElementById('header-nav');
  var menuToggle = document.getElementById('mobile-menu-toggle');

  /* ----------------------------------------------------------
     Smooth scroll — offset for sticky header
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var offset = header ? header.offsetHeight + 8 : 80;
      var top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // Close mobile menu
      if (nav) nav.classList.remove('open');
      if (menuToggle) {
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ----------------------------------------------------------
     Sticky header — add shadow on scroll
     ---------------------------------------------------------- */
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Mobile menu toggle
     ---------------------------------------------------------- */
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ----------------------------------------------------------
     Form handling — submits to Netlify Forms via fetch,
     then shows the in-page success message.
     ---------------------------------------------------------- */
  function initForm(formId, successId) {
    var form    = document.getElementById(formId);
    var success = document.getElementById(successId);
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate required fields
      var fields  = form.querySelectorAll('[required]');
      var isValid = true;

      fields.forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle('invalid', empty);
        if (empty) isValid = false;
      });

      if (!isValid) {
        var firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Submit to Netlify Forms
      var data = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
        .then(function () {
          form.style.display = 'none';
          success.removeAttribute('hidden');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function () {
          // On error, fall back to native form submission
          form.submit();
        });
    });

    // Clear invalid state on input
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) field.classList.remove('invalid');
      });
    });
  }

  initForm('hero-quote-form',    'hero-form-success');
  initForm('contact-quote-form', 'contact-form-success');

  /* ----------------------------------------------------------
     Scroll animations — Intersection Observer
     ---------------------------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

}());
