/* Shared behaviour for every page: config wiring, EN/FR switch, hero build, inquiry form.
   English lives in the HTML. Each page sets window.I18N_FR = { key: "texte" } before this file.
   Elements with data-i18n get their text swapped; add data-html to swap HTML instead. */
(function () {
  const C = window.CONFIG || {};
  const COMMON_FR = {
    skip: "Aller au contenu", brand_sub: "Conception et développement web",
    nav_services: "Services", nav_work: "Réalisations", nav_process: "Méthode", nav_pricing: "Tarifs", nav_trust: "Confiance", nav_book: "Réserver un appel",
    ft_line: "Sites et applications web pour coachs, consultants et entreprises de services. Établis dans les Villes jumelles, au service de clients partout.",
    ft_studio: "Studio", ft_contact: "Contact", ft_privacy: "Politique de confidentialité", ft_legal: "Studio indépendant de conception et de développement web."
  };
  const FR = Object.assign({}, COMMON_FR, window.I18N_FR || {});
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* Config */
  $$("[data-brand]").forEach(el => (el.textContent = C.brand));
  $$("[data-email]").forEach(el => { el.textContent = C.email; if (el.tagName === "A") el.href = "mailto:" + C.email; });
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  const ext = (a, url) => { a.href = url; a.target = "_blank"; a.rel = "noopener"; };
  const contactHref = document.getElementById("contact") ? "#contact" : "index.html#contact";
  $$("[data-book]").forEach(a => (C.bookingUrl ? ext(a, C.bookingUrl) : (a.href = contactHref)));
  $$("[data-pay]").forEach(a => {
    const link = C.stripe && C.stripe[a.dataset.pay];
    if (link) ext(a, link); else if (C.bookingUrl) ext(a, C.bookingUrl); else a.href = contactHref;
  });

  /* Language */
  const EN = {};
  $$("[data-i18n]").forEach(el => (EN[el.dataset.i18n] = el.hasAttribute("data-html") ? el.innerHTML : el.textContent));
  let lang = "en";
  const t = k => (lang === "fr" && FR[k]) || EN[k] || k;
  window.t = t;
  function setLang(l) {
    lang = l === "fr" ? "fr" : "en";
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => {
      const v = (lang === "fr" && FR[el.dataset.i18n]) || EN[el.dataset.i18n];
      if (v == null) return;
      if (el.hasAttribute("data-html")) el.innerHTML = v; else el.textContent = v;
    });
    $$("[data-lang-block]").forEach(d => (d.hidden = d.dataset.langBlock !== lang));
    $$(".lang-switch button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    if (FR.__title && EN.__title) document.title = lang === "fr" ? FR.__title : EN.__title;
    try { localStorage.setItem("site-lang", lang); } catch (e) {}
  }
  EN.__title = document.title;
  Object.assign(EN, window.I18N_EN || {});
  $$(".lang-switch button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  let saved = (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
  try { saved = localStorage.getItem("site-lang") || saved; } catch (e) {}
  setLang(saved);

  /* Hero: wireframe resolves into the finished design once, then visitors can flip it */
  const mock = document.getElementById("hero-mock");
  if (mock) {
    const btns = $$(".view-toggle button");
    const show = view => {
      mock.classList.toggle("wire", view === "wire");
      btns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
    };
    btns.forEach(b => b.addEventListener("click", () => show(b.dataset.view)));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) show("design"); else setTimeout(() => show("design"), 1100);
  }

  /* Inquiry form: posts to formEndpoint when set, otherwise opens a pre-filled email */
  const form = document.getElementById("inquiry");
  if (form) {
    const status = form.querySelector(".form-status");
    const say = (key, cls) => { status.dataset.i18n = key; status.textContent = t(key); status.className = "form-status " + (cls || ""); };
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const d = new FormData(form);
      if (d.get("company_site")) return; // spam trap
      const label = n => { const s = form.elements[n]; return s && s.selectedOptions ? s.selectedOptions[0].textContent : d.get(n); };
      if (C.formEndpoint) {
        say("form_sending");
        try {
          const r = await fetch(C.formEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error(r.status);
          form.reset(); say("form_sent", "ok");
        } catch (err) { say("form_error", "err"); }
        return;
      }
      const body = [
        "Name: " + d.get("name"), "Email: " + d.get("email"),
        "Business / current site: " + (d.get("business") || "-"),
        "Looking for: " + label("need"), "Timeline: " + label("timeline"), "", d.get("message")
      ].join("\n");
      window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Website inquiry from " + d.get("name")) + "&body=" + encodeURIComponent(body);
      say("form_mailto", "ok");
    });
  }
})();
