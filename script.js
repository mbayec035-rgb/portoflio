/* ==========================================================================
   PORTFOLIO CHEIKH MBAYE — SCRIPT.JS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------------------------------------------------------------------
     1. PRÉLOADEUR
  --------------------------------------------------------------------- */
  const preloader = document.getElementById("preloader");
  const preloaderLine = document.getElementById("preloaderLine");
  const preloaderBarFill = document.getElementById("preloaderBarFill");

  const bootSteps = [
    "INITIALIZING SYSTEM...",
    "LOADING MODULES...",
    "CONNECTING...",
    "ACCESS GRANTED",
  ];
  let bootIndex = 0;

  function runPreloader() {
    preloaderBarFill.style.width = "100%";
    const interval = setInterval(
      () => {
        bootIndex++;
        if (bootIndex < bootSteps.length) {
          preloaderLine.textContent = bootSteps[bootIndex];
        } else {
          clearInterval(interval);
          setTimeout(() => {
            preloader.classList.add("hidden");
            startTypingHero();
          }, 300);
        }
      },
      reduceMotion ? 50 : 550,
    );
  }
  runPreloader();

  /* ---------------------------------------------------------------------
     2. CURSEUR PERSONNALISÉ
  --------------------------------------------------------------------- */
  const cursor = document.getElementById("cyberCursor");
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0;
    let mouseY = 0;
    let hasMoved = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        requestAnimationFrame(renderCursor);
      }
    });

    function renderCursor() {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }

    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("active"));
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("active"),
      );
    });
  }

  /* ---------------------------------------------------------------------
     3. NAVBAR — scroll state + menu burger mobile
  --------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  const burgerBtn = document.getElementById("burgerBtn");
  const navLinks = document.getElementById("navLinks");
  burgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burgerBtn.classList.toggle("open", isOpen);
    burgerBtn.setAttribute("aria-expanded", isOpen);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burgerBtn.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", false);
    });
  });

  /* Surbrillance du lien actif selon la section visible */
  const sections = document.querySelectorAll("section[id]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`,
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" },
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------------------------------------------------------------------
     4. EFFET TYPING — Hero
  --------------------------------------------------------------------- */
  const typingSystem = document.getElementById("typingSystem");
  const typingTitle = document.getElementById("typingTitle");
  const systemText = "> SYSTEM ONLINE...";
  const titleText = "DIGITAL FUTURE.";

  function typeText(el, text, speed, callback) {
    if (reduceMotion) {
      el.textContent = text;
      if (callback) callback();
      return;
    }
    let i = 0;
    el.textContent = "";
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (callback) {
        callback();
      }
    })();
  }

  function startTypingHero() {
    typeText(typingSystem, systemText, 45, () => {
      typeText(typingTitle, titleText, 65);
    });
  }
  if (preloader.classList.contains("hidden")) startTypingHero();

  /* ---------------------------------------------------------------------
     5. PARTICULES VERTES (canvas)
  --------------------------------------------------------------------- */
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function initParticles() {
    const count = window.innerWidth < 720 ? 30 : 60;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  if (!reduceMotion) animateParticles();

  /* ---------------------------------------------------------------------
     6. CHIFFRES / TEXTES FLOTTANTS EN ARRIÈRE-PLAN
  --------------------------------------------------------------------- */
  const floatContainer = document.getElementById("floatingCodes");
  const codeSnippets = [
    "01",
    "010101",
    "ACCESS_GRANTED",
    "SYSTEM_ONLINE",
    "ENCRYPTED",
    "SECURE_CONNECTION",
    "PORT_443",
    "SSH",
    "HTTP",
    "HTTPS",
    "01001010",
  ];

  function spawnFloatingCode() {
    const span = document.createElement("span");
    span.textContent =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 8 + Math.random() * 10 + "s";
    floatContainer.appendChild(span);
    setTimeout(() => span.remove(), 20000);
  }
  if (!reduceMotion) setInterval(spawnFloatingCode, 900);

  /* ---------------------------------------------------------------------
     7. ANIMATION AU SCROLL — IntersectionObserver
  --------------------------------------------------------------------- */
  document
    .querySelectorAll(
      ".section-title, .about-text, .stat-card, .cyber-card, .stack-badge, .timeline-item, .project-card, .contact-form, .contact-side",
    )
    .forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     8. COMPTEURS ANIMÉS — statistiques
  --------------------------------------------------------------------- */
  const statNums = document.querySelectorAll(".stat-num[data-target]");
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || "";
          if (reduceMotion) {
            el.textContent = target + suffix;
          } else {
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const tick = () => {
              current += step;
              if (current >= target) {
                el.textContent = target + suffix;
              } else {
                el.textContent = current + suffix;
                requestAnimationFrame(tick);
              }
            };
            tick();
          }
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );
  statNums.forEach((el) => statObserver.observe(el));

  /* ---------------------------------------------------------------------
     9. ANIMATION DE SCAN — badges tech stack
  --------------------------------------------------------------------- */
  const stackBadges = document.querySelectorAll(".stack-badge");
  const stackObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("scanned"), i * 80);
          stackObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  stackBadges.forEach((el) => stackObserver.observe(el));

  /* ---------------------------------------------------------------------
     10. EFFET GLITCH LÉGER — titre de section au survol
  --------------------------------------------------------------------- */
  if (!reduceMotion) {
    document.querySelectorAll(".section-title").forEach((title) => {
      title.classList.add("glitch");
      title.dataset.text = title.textContent;
      title.addEventListener("mouseenter", () => {
        title.classList.add("glitching");
        setTimeout(() => title.classList.remove("glitching"), 350);
      });
    });
  }

  /* ---------------------------------------------------------------------
     11. FORMULAIRE DE CONTACT — validation JS
  --------------------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const terminalBody = document.getElementById("terminalBody");
  const formSuccess = document.getElementById("formSuccess");

  function setError(fieldId, message) {
    const group = document.getElementById(fieldId).closest(".form-group");
    const errEl = document.getElementById(
      "err" + fieldId.charAt(0).toUpperCase() + fieldId.slice(1),
    );
    if (message) {
      group.classList.add("invalid");
      errEl.textContent = message;
    } else {
      group.classList.remove("invalid");
      errEl.textContent = "";
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2) {
      setError("name", "Veuillez entrer votre nom.");
      valid = false;
    } else setError("name", "");

    if (!isValidEmail(email)) {
      setError("email", "Adresse email invalide.");
      valid = false;
    } else setError("email", "");

    if (subject.length < 2) {
      setError("subject", "Veuillez entrer un sujet.");
      valid = false;
    } else setError("subject", "");

    if (message.length < 10) {
      setError("message", "Message trop court (10 caractères minimum).");
      valid = false;
    } else setError("message", "");

    if (!valid) {
      const line = document.createElement("p");
      line.textContent = "> ERROR: invalid input detected";
      line.style.color = "#ff5c5c";
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return;
    }

    const sendingLine = document.createElement("p");
    sendingLine.textContent = "> sending message...";
    terminalBody.appendChild(sendingLine);

    setTimeout(() => {
      const doneLine = document.createElement("p");
      doneLine.innerHTML =
        '&gt; message sent <span class="neon-text">successfully</span>';
      terminalBody.appendChild(doneLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      formSuccess.textContent = `Merci ${name}, votre message a bien été transmis.`;
      form.reset();
    }, 700);
  });

  /* ---------------------------------------------------------------------
     12. ANNÉE DYNAMIQUE (optionnel — cohérent avec le footer)
  --------------------------------------------------------------------- */
  // Le footer affiche "©️ 2026" en dur selon le brief ; laissé statique volontairement.

  /* ---------------------------------------------------------------------
     13. MODE SOMBRE / CLAIR — bascule + persistance
  --------------------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Activer le mode clair" : "Activer le mode sombre",
    );
    themeToggle.title = isDark ? "Mode clair" : "Mode sombre";
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  applyTheme(document.documentElement.getAttribute("data-theme") || "light");

  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });

  /* ---------------------------------------------------------------------
     14. BANDEAU CHIFFRES DÉFILANTS
  --------------------------------------------------------------------- */
  const digitsTrack = document.getElementById("digitsTrack");
  if (digitsTrack) {
    const SLOTS = 36;
    const items = [];

    function randomDigit() {
      const r = Math.random();
      if (r < 0.34) {
        const len = 6 + Math.floor(Math.random() * 3);
        return Array.from({ length: len }, () =>
          Math.random() > 0.5 ? "1" : "0",
        ).join("");
      } else if (r < 0.67) {
        return String(Math.floor(Math.random() * 9000) + 1000);
      }
      return (
        "0x" +
        Math.floor(Math.random() * 255)
          .toString(16)
          .toUpperCase()
          .padStart(2, "0")
      );
    }

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < SLOTS; j++) {
        const span = document.createElement("span");
        span.className = "digit-item";
        span.dataset.slot = j;
        items.push(span);
      }
    }
    digitsTrack.append(...items);

    function refreshDigits() {
      const values = Array.from({ length: SLOTS }, randomDigit);
      items.forEach((el) => {
        el.textContent = values[el.dataset.slot];
      });
    }
    refreshDigits();
    if (!reduceMotion) setInterval(refreshDigits, 800);
  }
});
