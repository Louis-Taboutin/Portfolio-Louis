(function() {
      var LANG_KEY = 'louis-site-lang';
      function getLang() {
        var saved = null; try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
        if (saved === 'fr' || saved === 'en') return saved;
        var nav = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
        return nav.indexOf('fr') === 0 ? 'fr' : 'en';
      }
      function setLang(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
          var key = el.getAttribute('data-i18n');
          if (window.I18N && window.I18N[key] && window.I18N[key][lang] !== undefined) {
            el.textContent = window.I18N[key][lang];
          }
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
          var key = el.getAttribute('data-i18n-html');
          if (window.I18N_HTML && window.I18N_HTML[key] && window.I18N_HTML[key][lang] !== undefined) {
            el.innerHTML = window.I18N_HTML[key][lang];
          }
        });
        document.querySelectorAll('.lang-toggle-label').forEach(function(el) {
          el.textContent = lang === 'fr' ? 'EN' : 'FR';
        });
        if (window.PAGE_TITLE_I18N && window.PAGE_TITLE_I18N[lang]) {
          document.title = window.PAGE_TITLE_I18N[lang];
        }
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      }
      window.toggleSiteLang = function() {
        var current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
        setLang(current === 'fr' ? 'en' : 'fr');
      };
      document.addEventListener('DOMContentLoaded', function() {
        setLang(getLang());
      });
    })();

(function() {
      var THEME_KEY = 'louis-site-theme';
      function getTheme() {
        var saved = null; try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelectorAll('.theme-toggle-icon').forEach(function(el) {
          el.textContent = theme === 'light' ? '\u{1F319}' : '\u2600\uFE0F';
        });
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
      }
      window.toggleSiteTheme = function() {
        var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        setTheme(current === 'light' ? 'dark' : 'light');
      };
      document.addEventListener('DOMContentLoaded', function() {
        setTheme(getTheme());
      });
    })();

window.openQuickSummary = function() {
      document.getElementById('quicksum-overlay').classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    window.closeQuickSummary = function() {
      document.getElementById('quicksum-overlay').classList.remove('is-open');
      document.body.style.overflow = '';
    };
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') window.closeQuickSummary();
    });
    document.addEventListener('click', function(e) {
      if (e.target && e.target.id === 'quicksum-overlay') window.closeQuickSummary();
    });

window.openContactForm = function() {
      document.getElementById('contact-overlay').classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    window.closeContactForm = function() {
      document.getElementById('contact-overlay').classList.remove('is-open');
      document.body.style.overflow = '';
    };
    window.submitContactForm = function(e) {
      e.preventDefault();
      var name = document.getElementById('contact-name').value;
      var email = document.getElementById('contact-email').value;
      var message = document.getElementById('contact-message').value;
      var subject = encodeURIComponent('Contact depuis le portfolio - ' + name);
      var body = encodeURIComponent(message + '\n\n---\n' + name + ' (' + email + ')');
      window.location.href = 'mailto:louis.taboutin@dauphine.eu?subject=' + subject + '&body=' + body;
      return false;
    };
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { window.closeContactForm(); }
    });
    document.addEventListener('click', function(e) {
      if (e.target && e.target.id === 'contact-overlay') window.closeContactForm();
    });

(function() {
      // ============ CONSOLE MESSAGE ============
      console.log('%cTu regardes le code, on devrait discuter ;) -> louis.taboutin@dauphine.eu', 'color:#64ffda; font-family:monospace; font-size:14px; padding:6px 0;');
      console.log('%cAstuce : tape ` (backtick) sur le site pour ouvrir un petit terminal cache.', 'color:#a1a1aa; font-family:monospace; font-size:12px;');

      // ============ TERMINAL EASTER EGG ============
      var termOverlay = document.getElementById('terminal-overlay');
      var termBody = document.getElementById('terminal-body');
      var termInput = document.getElementById('terminal-input');

      function termPrint(html) {
        var line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
      }

      var COMMANDS = {
        help: 'Commandes : <span class="terminal-prompt-color">whoami</span>, <span class="terminal-prompt-color">skills</span>, <span class="terminal-prompt-color">experience</span>, <span class="terminal-prompt-color">education</span>, <span class="terminal-prompt-color">contact</span>, <span class="terminal-prompt-color">clear</span>, <span class="terminal-prompt-color">exit</span>',
        whoami: "Louis TABOUTIN - Etudiant MSc Finance @ Universite Paris Dauphine - PSL. Co-fondateur de DAU'IA. President d'EPICOOP PSL.",
        skills: "Python, Excel/VBA, Bloomberg, SQL, modelisation financiere, valorisation par multiples, backtesting quantitatif (Fama-French, Piotroski).",
        experience: "Origination M&amp;A (Matrila), Gestion de patrimoine (AAG Finance), RH &amp; communication (RE/MAX), Assistant des ventes (Lyhin Engineering, Malaisie).",
        education: "MSc Finance (Universite Paris Dauphine - PSL, 2025-2028), Y Combinator Startup School, Licences Management et Mathematiques &amp; Informatique.",
        contact: 'louis.taboutin@dauphine.eu - <a href="https://fr.linkedin.com/in/louis-taboutin" target="_blank" style="color:#64ffda;">LinkedIn</a>',
      };

      function runCommand(raw) {
        var cmd = raw.trim().toLowerCase();
        termPrint('<span class="terminal-prompt-color">&gt;</span> ' + raw);
        if (cmd === '') return;
        if (cmd === 'clear') { termBody.innerHTML = ''; return; }
        if (cmd === 'exit') { closeTerminal(); return; }
        if (COMMANDS[cmd]) { termPrint(COMMANDS[cmd]); return; }
        termPrint('Commande inconnue : ' + cmd + '. Tape <span class="terminal-prompt-color">help</span>.');
      }

      window.openTerminal = function() {
        termOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        setTimeout(function() { termInput.focus(); }, 50);
      };
      function closeTerminal() {
        termOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      window.closeTerminal = closeTerminal;

      if (termInput) {
        termInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            runCommand(termInput.value);
            termInput.value = '';
          }
        });
      }
      if (termOverlay) {
        termOverlay.addEventListener('click', function(e) {
          if (e.target === termOverlay) closeTerminal();
        });
      }

      // ============ KEYBOARD SHORTCUTS (g + lettre) ============
      var gPressed = false;
      var gTimeout = null;
      var ROUTES = {
        h: 'index.html#top',
        e: 'index.html#experiences',
        o: 'index.html#formation',
        f: 'finance.html',
        a: 'ia.html',
        s: 'solidarite.html',
        p: 'photo.html',
      };

      document.addEventListener('keydown', function(e) {
        var tag = (e.target.tagName || '').toLowerCase();
        var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

        if (e.key === 'Escape') {
          closeTerminal();
          if (window.closeQuickSummary) window.closeQuickSummary();
          if (window.closeContactForm) window.closeContactForm();
          return;
        }

        if (typing) return;

        if (e.key === '`') {
          e.preventDefault();
          window.openTerminal();
          return;
        }

        if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey) {
          gPressed = true;
          clearTimeout(gTimeout);
          gTimeout = setTimeout(function() { gPressed = false; }, 1200);
          return;
        }

        if (gPressed && ROUTES[e.key.toLowerCase()]) {
          gPressed = false;
          window.location.href = ROUTES[e.key.toLowerCase()];
        }
      });
    })();