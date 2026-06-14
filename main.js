

    document.addEventListener('DOMContentLoaded', () => {

      /* ── Scroll Reveal ── */
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); } });
      }, { threshold: 0.07 });
      document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

      /* ── FAQ Accordion ── */
      document.querySelectorAll('.faq-item__btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const body   = btn.nextElementSibling;
          const icon   = btn.querySelector('.material-symbols-outlined');
          const isOpen = btn.getAttribute('aria-expanded') === 'true';
          document.querySelectorAll('.faq-item__btn').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
            b.nextElementSibling.style.maxHeight = null;
            b.querySelector('.material-symbols-outlined').style.transform = '';
          });
          if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
          }
        });
      });

      /* ── Category pill active state ── */
      document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
        });
      });

      /* ── Hero search — filters tool cards live ── */
      const searchInput = document.getElementById('hero-search');
      const searchBtn   = document.querySelector('.hero__search-btn');

      function runSearch() {
        const q = searchInput.value.trim().toLowerCase();
        document.querySelectorAll('.tool-card').forEach(card => {
          if (!q) { card.style.display = ''; return; }
          const text = (card.querySelector('.tool-card__title')?.textContent || '') +
                       (card.querySelector('.tool-card__desc')?.textContent  || '');
          card.style.display = text.toLowerCase().includes(q) ? '' : 'none';
        });
      }

      searchInput.addEventListener('input', runSearch);
      searchBtn.addEventListener('click', runSearch);
      searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });

      /* ── Stat counter animation ── */
      const statEl = document.getElementById('stat-tools');
      if (statEl) {
        const statObs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            let n = 0;
            const timer = setInterval(() => {
              n = Math.min(n + 3, 100);
              statEl.textContent = n + '+';
              if (n >= 100) clearInterval(timer);
            }, 25);
            statObs.disconnect();
          }
        }, { threshold: 0.5 });
        statObs.observe(statEl.closest('.stats-strip'));
      }

    });
  
