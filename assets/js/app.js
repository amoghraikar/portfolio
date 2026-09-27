(() => {
  const mobileLayoutQuery = '(max-width: 700px), (hover: none) and (pointer: coarse) and (max-width: 1100px)';
  const seoBaseUrl = 'https://amoghraikar.github.io/portfolio/';
  const seoPages = {
    HOME: {
      title: 'Amogh R Raikar — Software Developer & Creative Technologist',
      description: 'Building purposeful software, intelligent systems, and innovative digital experiences.',
      path: '',
      image: 'assets/img/home-bg/home-bg.jpeg'
    },
    ABOUT: {
      title: 'About Amogh R Raikar — Software Developer & Creative Technologist',
      description: 'Amogh R Raikar is a software developer and creative technologist in Bengaluru, passionate about full-stack, AI, blockchain, and UI/UX design.',
      path: 'about.html',
      image: 'assets/img/analog/abstract-series-1/Abstract_Series_1_Tokonoma_3.jpg'
    },
    CONTACT: {
      title: 'Contact Amogh R Raikar — Software Developer & Creative Technologist',
      description: 'Connect with Amogh R Raikar for software engineering opportunities, AI projects, and innovative digital collaborations.',
      path: 'contact.html',
      image: 'assets/img/ai/cars/cars-3.jpeg'
    },
    ANALOG: {
      title: 'Analog Image Making, Photography & Set Design — Tokonoma',
      description: 'Explore Tokonoma Studio’s analog image making, photography, set design, illustration and handcrafted visual worlds for editorial and brands.',
      path: 'analog.html',
      image: 'assets/img/analog/abstract-series-1/Abstract_Series_1_Tokonoma_1.jpg'
    },
    AI: {
      title: 'AI Art, Creative Coding & Image Making — Tokonoma Studio',
      description: 'Explore AI art, creative coding, animation, illustration and experimental image making by Tokonoma Studio and artist Redouane Oumahi.',
      path: 'ai.html',
      image: 'assets/img/ai/cars/cars-3.jpeg'
    },
    AITO: {
      title: 'AITO — Art, Image Making & Visual Projects — Tokonoma Studio',
      description: 'Explore AITO projects by Tokonoma Studio, combining art, image making, set design, photography, illustration, branding and visual storytelling.',
      path: 'aito.html',
      image: 'assets/img/aito/harvey-nichols/HN01.jpeg'
    },
    SHOWS: {
      title: 'Exhibitions, Animation & Art Shows — Tokonoma Studio',
      description: 'Discover exhibitions, installations, animation and art shows by Tokonoma Studio, the image-making practice of artist Redouane Oumahi.',
      path: 'shows.html',
      image: 'assets/img/shows/funny-games/img-39.jpg'
    }
  };
  const seoFocus = {
    ANALOG: 'analog image making, photography, set design and illustration',
    AI: 'AI art, creative coding, animation and experimental image making',
    AITO: 'art, image making, set design, branding and visual storytelling',
    SHOWS: 'art, exhibitions, installations and animation'
  };
  const seoTitleCase = value => String(value || '').toLowerCase().replace(/(^|[\s&–—-])([a-z])/g, (_, lead, letter) => lead + letter.toUpperCase());
  const seoAbsoluteUrl = value => new URL(value || '', seoBaseUrl).href;
  const setSeoMeta = (selector, attribute, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
      if (!match) return;
      element.setAttribute(match[1], match[2]);
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
  };
  const publishSeo = ({ title, description, canonical, image, type = 'website', schema }) => {
    document.title = title;
    setSeoMeta('meta[name="description"]', 'content', description);
    setSeoMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setSeoMeta('meta[property="og:site_name"]', 'content', 'Amogh R Raikar');
    setSeoMeta('meta[property="og:locale"]', 'content', 'en_US');
    setSeoMeta('meta[property="og:type"]', 'content', type);
    setSeoMeta('meta[property="og:title"]', 'content', title);
    setSeoMeta('meta[property="og:description"]', 'content', description);
    setSeoMeta('meta[property="og:url"]', 'content', canonical);
    setSeoMeta('meta[property="og:image"]', 'content', image);
    setSeoMeta('meta[property="og:image:alt"]', 'content', title);
    setSeoMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setSeoMeta('meta[name="twitter:title"]', 'content', title);
    setSeoMeta('meta[name="twitter:description"]', 'content', description);
    setSeoMeta('meta[name="twitter:image"]', 'content', image);
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
    let structuredData = document.querySelector('#seoStructuredData');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'seoStructuredData';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  };
  const applyPageSeo = section => {
    const page = seoPages[section] || seoPages.HOME;
    const canonical = seoAbsoluteUrl(page.path);
    const image = seoAbsoluteUrl(page.image);
    publishSeo({
      ...page,
      canonical,
      image,
      schema: {
        '@context': 'https://schema.org',
        '@type': section === 'HOME' ? 'ProfessionalService' : 'WebPage',
        name: page.title,
        description: page.description,
        url: canonical,
        image,
        inLanguage: 'en',
        ...(section === 'HOME' ? {
          founder: { '@type': 'Person', name: 'Redouane Oumahi', jobTitle: 'Image Maker and Artist' },
          areaServed: 'Worldwide',
          sameAs: ['https://www.instagram.com/tokonoma.xyz/']
        } : { isPartOf: { '@type': 'WebSite', name: 'Amogh R Raikar', url: seoBaseUrl } })
      }
    });
  };
  const applyProjectSeo = project => {
    if (!project) return;
    const category = String(project.category || '').toUpperCase();
    const projectTitle = seoTitleCase(project.title);
    const focus = seoFocus[category] || 'art, image making and visual storytelling';
    const title = `${projectTitle} — ${category} Project | Tokonoma Studio`;
    const description = `${projectTitle} is a Tokonoma Studio project exploring ${focus}. View the complete image series and project credits.`;
    const canonical = `${seoAbsoluteUrl(`${category.toLowerCase()}.html`)}?project=${encodeURIComponent(project.slug)}`;
    const image = seoAbsoluteUrl(project.images?.[0] || seoPages[category]?.image || seoPages.HOME.image);
    const seoHeading = document.querySelector('.seo-heading');
    if (seoHeading) seoHeading.textContent = `${projectTitle} — Tokonoma Studio ${category} project`;
    publishSeo({
      title,
      description,
      canonical,
      image,
      type: 'article',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: projectTitle,
        description,
        url: canonical,
        image,
        genre: category,
        keywords: focus,
        creator: { '@type': 'Person', name: 'Redouane Oumahi' },
        publisher: { '@type': 'Organization', name: 'Amogh R Raikar', url: seoBaseUrl },
        inLanguage: 'en'
      }
    });
  };
  const trackThumbnailLoad = (container, image) => {
    container.classList.add('thumbnail-loading');
    const finish = () => container.classList.remove('thumbnail-loading');
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', finish, { once: true });
    if (image.complete) queueMicrotask(finish);
  };

  const createCursorPillFollower = element => {
    document.body.appendChild(element);
    let currentX = null;
    let currentY = null;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    const render = () => {
      currentX += (targetX - currentX) * .16;
      currentY += (targetY - currentY) * .16;
      element.style.setProperty('--cursor-count-x', `${currentX}px`);
      element.style.setProperty('--cursor-count-y', `${currentY}px`);
      if (Math.abs(targetX - currentX) > .1 || Math.abs(targetY - currentY) > .1) {
        frame = requestAnimationFrame(render);
      } else {
        currentX = targetX;
        currentY = targetY;
        element.style.setProperty('--cursor-count-x', `${currentX}px`);
        element.style.setProperty('--cursor-count-y', `${currentY}px`);
        frame = 0;
      }
    };
    return (x, y) => {
      targetX = x;
      targetY = y;
      if (currentX === null) {
        currentX = x;
        currentY = y;
      }
      if (!frame) frame = requestAnimationFrame(render);
    };
  };

  const createTiltGravityController = () => {
    const tiltSessionKey = 'tokonomaTiltEnabled';
    const state = {
      enabled: false,
      x: 0,
      y: 1,
      targetX: 0,
      targetY: 1
    };
    const clamp = value => Math.max(-1, Math.min(1, value));
    let motionActive = false;
    const rotateToScreen = (deviceX, deviceY) => {
      const angle = Number(screen.orientation?.angle ?? window.orientation ?? 0) * Math.PI / 180;
      state.targetX = clamp(deviceX * Math.cos(angle) + deviceY * Math.sin(angle));
      state.targetY = clamp(-deviceX * Math.sin(angle) + deviceY * Math.cos(angle));
    };
    const updateMotion = event => {
      const gravity = event.accelerationIncludingGravity;
      if (!gravity || !Number.isFinite(gravity.x) || !Number.isFinite(gravity.y)) return;
      motionActive = true;
      rotateToScreen(clamp(gravity.x / 7), clamp(-gravity.y / 7));
    };
    const updateOrientation = event => {
      if (motionActive) return;
      const deviceX = clamp((Number(event.gamma) || 0) / 45);
      const deviceY = clamp((Number(event.beta) || 0) / 45);
      rotateToScreen(deviceX, deviceY);
    };
    const attachSensors = () => {
      if (typeof DeviceMotionEvent !== 'undefined') {
        addEventListener('devicemotion', updateMotion, { passive: true });
      }
      if (typeof DeviceOrientationEvent !== 'undefined') {
        addEventListener('deviceorientation', updateOrientation, { passive: true });
      }
      if (typeof DeviceMotionEvent === 'undefined' && typeof DeviceOrientationEvent === 'undefined') {
        throw new Error('Motion sensors unavailable');
      }
      state.enabled = true;
    };
    try {
      if (sessionStorage.getItem(tiltSessionKey) === '1') {
        attachSensors();
        return () => {
          state.x += (state.targetX - state.x) * .12;
          state.y += (state.targetY - state.y) * .12;
          return state;
        };
      }
    } catch (_) {}
    const controlWrap = document.createElement('div');
    controlWrap.className = 'mobile-tilt-wrap';
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'mobile-tilt-enable';
    const label = document.createElement('span');
    label.textContent = 'ENABLE TILT';
    control.setAttribute('aria-label', 'ENABLE TILT');
    control.append(label);
    controlWrap.append(control);
    document.body.appendChild(controlWrap);
    const enable = async () => {
      control.disabled = true;
      try {
        const permissionRequests = [];
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
          permissionRequests.push(DeviceMotionEvent.requestPermission());
        } else if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          permissionRequests.push(DeviceOrientationEvent.requestPermission());
        }
        const permissions = await Promise.all(permissionRequests);
        if (permissions.some(permission => permission !== 'granted')) throw new Error('Motion permission denied');
        attachSensors();
        try { sessionStorage.setItem(tiltSessionKey, '1'); } catch (_) {}
        label.textContent = 'TILT ON';
        control.setAttribute('aria-label', 'TILT ON');
        control.classList.add('tilt-on');
        control.classList.add('enabled');
        setTimeout(() => controlWrap.classList.add('leaving'), 180);
        setTimeout(() => controlWrap.remove(), 500);
      } catch (_) {
        state.enabled = false;
        try { sessionStorage.removeItem(tiltSessionKey); } catch (_) {}
        label.textContent = 'MOTION ACCESS OFF';
        control.setAttribute('aria-label', 'MOTION ACCESS OFF');
        control.classList.add('denied');
        setTimeout(() => controlWrap.remove(), 1800);
      }
    };
    control.addEventListener('click', enable, { once: true });
    return () => {
      state.x += (state.targetX - state.x) * .12;
      state.y += (state.targetY - state.y) * .12;
      return state;
    };
  };

  const AWWWARDS_URL = 'https://www.awwwards.com/sites/tokonoma-studio';
  const AWWWARDS_SVG = `<svg width="53.08" height="171.358" viewBox="0 0 53.08 171.358" aria-hidden="true"><path fill="#fff" d="M0 0h53.08v171.358H0z"></path><g fill="#000"><path d="M20.048 153.585v-2.002l6.752-3.757h-6.752v-1.9h10.23v2.002l-6.752 3.757h6.752v1.9zM29.899 142.382a3.317 3.317 0 0 1-1.359 1.293c-.575.297-1.223.446-1.944.446-.721 0-1.369-.149-1.944-.446a3.317 3.317 0 0 1-1.359-1.293c-.331-.564-.497-1.232-.497-2.003 0-.769.166-1.437.497-2.002a3.332 3.332 0 0 1 1.359-1.294c.575-.297 1.224-.445 1.944-.445.722 0 1.369.148 1.944.445a3.326 3.326 0 0 1 1.359 1.294c.33.565.496 1.233.496 2.002.001.77-.166 1.438-.496 2.003m-1.703-3.348c-.435-.331-.967-.497-1.601-.497s-1.167.166-1.601.497c-.434.332-.65.78-.65 1.345s.217 1.014.65 1.346c.434.33.967.496 1.601.496s1.166-.166 1.601-.496c.434-.332.649-.78.649-1.346.001-.565-.215-1.013-.649-1.345M22.912 134.996v-1.812h1.185c-.43-.283-.752-.593-.973-.929-.219-.336-.329-.732-.329-1.19 0-.479.127-.902.38-1.272.254-.37.635-.633 1.141-.79-.478-.262-.851-.591-1.118-.985a2.221 2.221 0 0 1-.402-1.265c0-.682.2-1.218.599-1.607.4-.391.957-.585 1.668-.585h5.218v1.812H25.37c-.682 0-1.023.303-1.023.907 0 .467.264.85.789 1.146.527.299 1.286.446 2.28.446h2.865v1.813H25.37c-.682 0-1.023.303-1.023.906 0 .468.275.851.826 1.147.551.298 1.352.446 2.404.446h2.704v1.812h-7.369zM21.626 122.457c-.225.224-.502.336-.833.336s-.608-.112-.833-.336a1.128 1.128 0 0 1-.336-.833c0-.331.111-.609.336-.833.225-.225.502-.336.833-.336s.608.111.833.336c.225.224.337.502.337.833 0 .332-.112.608-.337.833m1.286-1.739h7.366v1.813h-7.366v-1.813zM22.912 118.668v-1.812h1.185a3.348 3.348 0 0 1-.951-1.009 2.434 2.434 0 0 1-.351-1.272c0-.681.19-1.229.57-1.644.38-.414.931-.621 1.651-.621h5.263v1.812h-4.722c-.418 0-.727.096-.92.285-.195.19-.293.447-.293.769 0 .302.116.58.351.833.233.254.577.458 1.03.613.453.156.992.234 1.615.234h2.938v1.812h-7.366zM29.833 109.129a3.33 3.33 0 0 1-1.432 1.169 4.535 4.535 0 0 1-1.805.373 4.537 4.537 0 0 1-1.807-.373c-.579-.248-1.057-.638-1.432-1.169s-.563-1.196-.563-1.995c0-.771.183-1.413.549-1.93a3.28 3.28 0 0 1 1.382-1.141 4.221 4.221 0 0 1 1.709-.364h.746v5.071c.447-.02.838-.183 1.168-.49.332-.307.498-.724.498-1.248 0-.41-.093-.754-.277-1.031-.186-.278-.473-.529-.863-.753l.542-1.462c.69.303 1.224.724 1.592 1.265.371.541.556 1.235.556 2.083 0 .799-.188 1.464-.563 1.995m-4.085-3.574c-.41.088-.746.261-1.009.52-.262.258-.395.61-.395 1.06 0 .428.137.784.409 1.067.272.282.604.458.994.525v-3.172zM29.833 100.878c-.375.531-.852.921-1.432 1.169a4.552 4.552 0 0 1-3.612 0c-.579-.248-1.057-.638-1.432-1.169s-.563-1.196-.563-1.995c0-.77.183-1.412.549-1.93a3.278 3.278 0 0 1 1.382-1.14 4.222 4.222 0 0 1 1.709-.365h.746v5.072a1.794 1.794 0 0 0 1.168-.49c.332-.307.498-.724.498-1.249 0-.41-.093-.753-.277-1.031-.186-.277-.473-.528-.863-.753l.542-1.462c.69.302 1.224.724 1.592 1.265.371.541.556 1.234.556 2.083 0 .799-.188 1.464-.563 1.995m-4.085-3.573c-.41.088-.746.261-1.009.519-.262.258-.395.611-.395 1.06 0 .429.137.784.409 1.067.272.282.604.458.994.526v-3.172zM35.481 16.926l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.781-14.969h3.713l2.673 10.276 2.524-10.276h3.445l2.524 10.276 2.674-10.276zM37.979 27.083c1.426 0 2.495 1.068 2.495 2.495 0 1.425-1.069 2.495-2.495 2.495-1.425 0-2.495-1.07-2.495-2.495-.001-1.427 1.07-2.495 2.495-2.495"></path></g></svg>`;

  // Awwwards badge as a physics body (same engine as the nav pills). Desktop home only.
  const createAwwwardsBody = viewportWidth => { return null; };

  const load = async () => {
    const response = await fetch(`assets/json/projects.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load projects.json (${response.status})`);
    const appData = await response.json();
    for (const category of Object.values(appData.projectCatalog || {})) {
      for (const project of category) {
        if (project.images) {
          project.images = project.images.map(img => img);
        }
      }
    }
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const run = file === 'index.html' || !/\.html$/.test(file)
      ? runHome
      : /^(about|contact)\.html$/.test(file)
        ? runStatic
        : runProject;
    if (run === runHome && (location.search || location.hash)) {
      const cleanHomeUrl = new URL('index.html', location.href);
      cleanHomeUrl.search = '';
      cleanHomeUrl.hash = '';
      history.replaceState({ page: 'home' }, '', cleanHomeUrl.pathname);
    }
    await run(appData);
  };

  const ASCII_BLOCKS = '█▓▒░▐▌▄▀■▪';

  // Project-list hover tracking: gently open the title horizontally.
  // cursor-hover is already managed by the existing preview/skew interaction,
  // so the previous row automatically eases back when another row is entered.
  const projectTrackingStyle = document.createElement('style');
  projectTrackingStyle.textContent = `
    .viewer-menu-entry-label {
      letter-spacing: 0;
      transition: letter-spacing 420ms cubic-bezier(.22, 1, .36, 1);
    }
    .viewer-menu-entry.cursor-hover .viewer-menu-entry-label {
      letter-spacing: 5px;
    }
    @media (prefers-reduced-motion: reduce) {
      .viewer-menu-entry-label {
        transition-duration: 0ms;
      }
    }
  `;
  document.head.appendChild(projectTrackingStyle);

  function wrapWordsInElement(el, scrambleChance = 0.22) {
    if (el.classList && el.classList.contains('viewer-static-pill')) return [];
    const words = [];
    let sentenceIndex = 0;
    let indexInSentence = 0;
    const walk = node => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === 3) {
          if (!child.textContent.trim()) return;
          const tokens = child.textContent.match(/\S+|\s+/g) || [];
          const frag = document.createDocumentFragment();
          tokens.forEach(token => {
            if (/^\s+$/.test(token)) {
              frag.appendChild(document.createTextNode(token));
              return;
            }
            const span = document.createElement('span');
            span.className = 'reveal-word';
            span.textContent = token;
            span.dataset.word = token;
            span.dataset.sentence = String(sentenceIndex);
            span.dataset.windex = String(indexInSentence);
            if (token.length > 2 && Math.random() < scrambleChance) span.dataset.scramble = '1';
            words.push(span);
            frag.appendChild(span);
            indexInSentence++;
            if (/[.!?…]["'”’)\]]?$/.test(token)) { sentenceIndex++; indexInSentence = 0; }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) {
          if (child.classList && child.classList.contains('viewer-static-pill')) return;
          walk(child);
        }
      });
    };
    walk(el);
    return words;
  }

  function scrambleWordReveal(span, finalText) {
    const length = finalText.length;
    span.classList.add('is-scrambling');
    const totalFrames = Math.max(6, Math.min(14, length + 4));
    const lockFrame = index => Math.floor((index / length) * totalFrames * 0.7) + Math.floor(totalFrames * 0.3);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      let out = '';
      for (let index = 0; index < length; index++) {
        out += frame >= lockFrame(index)
          ? finalText[index]
          : ASCII_BLOCKS[Math.floor(Math.random() * ASCII_BLOCKS.length)];
      }
      span.textContent = out;
      if (frame >= totalFrames) {
        clearInterval(timer);
        span.textContent = finalText;
        span.classList.remove('is-scrambling');
        span.classList.add('is-in');
      }
    }, 38);
  }

  function scheduleWordCascade(el) {
    el.querySelectorAll('.reveal-word').forEach(span => {
      const sentence = Number(span.dataset.sentence || 0);
      const windex = Number(span.dataset.windex || 0);
      const delay = Math.min(sentence * 130 + windex * 34, 950);
      setTimeout(() => {
        if (span.dataset.scramble === '1') scrambleWordReveal(span, span.dataset.word);
        else span.classList.add('is-in');
      }, delay);
    });
  }

  let staticRevealObserver = null;
  function revealStaticCopy(copyEl, contentScrollEl, pageScrollEl) {
    if (staticRevealObserver) staticRevealObserver.disconnect();
    const items = copyEl.querySelectorAll(
      ':scope > p, :scope > section > h2, :scope > section > h3, :scope > section > p, ' +
      ':scope > section > a.viewer-static-pill, :scope > section > .viewer-contact-divider, ' +
      '.viewer-static-reason, .viewer-contact-details > *'
    );
    if (!items.length) return;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = matchMedia(mobileLayoutQuery).matches;
    const scrambleChance = isMobile ? 0.50 : 0.22;
    items.forEach(el => {
      const words = wrapWordsInElement(el, scrambleChance);
      if (!words.length) el.classList.add('reveal-line');
      if (reduceMotion) {
        words.forEach(span => { span.textContent = span.dataset.word; span.classList.add('is-in'); });
        el.classList.add('is-revealed');
      }
    });
    if (reduceMotion) return;
    const root = isMobile ? pageScrollEl : contentScrollEl;
    // Mobile: trigger the sentence as soon as it enters the visible (above-the-fold) viewport.
    const rootMargin = isMobile ? '0px' : '0px 0px -8% 0px';
    const threshold = isMobile ? 0.01 : 0.12;
    staticRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        scheduleWordCascade(entry.target);
        observer.unobserve(entry.target);
      });
    }, { root, rootMargin, threshold });
    items.forEach(el => staticRevealObserver.observe(el));
  }

  async function runHome(appData) {

      const projectCatalog = appData.projectCatalog;
      const projectInfo = appData.projectInfo;
      const allProjects = Object.values(projectCatalog).flat();
      const projectBySlug = new Map(allProjects.map(item => [item.slug, item]));
      const shuffleCatalog = values => {
        const result = [...values];
        for (let index = result.length - 1; index > 0; index--) {
          const swap = Math.floor(Math.random() * (index + 1));
          [result[index], result[swap]] = [result[swap], result[index]];
        }
        return result;
      };
      const homeTrailItems = shuffleCatalog(allProjects.flatMap(item =>
        item.images.map((src, imageIndex) => ({ src, project: item, imageIndex }))
      ));
      let activeProject = projectBySlug.get('karatcore-erp') || allProjects[0];
      let images = activeProject.images;
      const pageFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const pageSection = ({
        'analog.html': 'ANALOG',
        'ai.html': 'AI',
        'aito.html': 'AITO',
        'shows.html': 'SHOWS',
        'about.html': 'ABOUT',
        'contact.html': 'CONTACT'
      })[pageFile] || 'HOME';

      const area = document.querySelector('#trailArea');

      // Awwwards ribbon hover: random centered YEP GIF at 2x reaction size.
      // Project trail images are suspended only while the pointer is over the ribbon.
      let awwwardsHoverActive = false;
      const awwwardsHoverGif = document.createElement('img');
      awwwardsHoverGif.className = 'awwwards-hover-gif';
      awwwardsHoverGif.alt = '';
      awwwardsHoverGif.draggable = false;
      Object.assign(awwwardsHoverGif.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '10000',
        maxWidth: 'min(640px, 90vw)',
        maxHeight: 'min(320px, 70vh)',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        visibility: 'hidden'
      });
      document.body.appendChild(awwwardsHoverGif);

      let previousAwwwardsGif = 0;
      const showAwwwardsHoverGif = () => {
        let index;
        do index = 1 + Math.floor(Math.random() * 4);
        while (index === previousAwwwardsGif);
        previousAwwwardsGif = index;
        awwwardsHoverGif.src = `assets/img/gif/yep-${index}.gif?restart=${Date.now()}`;
        awwwardsHoverGif.style.visibility = 'visible';
      };
      const hideAwwwardsHoverGif = () => {
        awwwardsHoverGif.style.visibility = 'hidden';
        awwwardsHoverGif.removeAttribute('src');
      };

      // Fallen-pill hover prompt.
      const stitchPrompt = document.createElement('div');
      stitchPrompt.className = 'stitch-me-back-prompt';
      stitchPrompt.style.fontFamily = '"EurostileMNExtendedBold", "Eurostile", sans-serif';
      stitchPrompt.style.color = 'var(--cursor-color)';
      stitchPrompt.setAttribute('aria-hidden', 'true');
      'STITCH ME BACK'.split('').forEach((character, index) => {
        const span = document.createElement('span');
        span.textContent = character === ' ' ? '\u00a0' : character;
        span.style.transitionDelay = `${index * 28}ms`;
        stitchPrompt.appendChild(span);
      });
      Object.assign(stitchPrompt.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '9999',
        display: 'flex',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        visibility: 'hidden',
      });
      document.body.appendChild(stitchPrompt);

      const stitchPromptSpans = [...stitchPrompt.children];
      stitchPromptSpans.forEach(span => Object.assign(span.style, {
        display: 'inline-block',
        opacity: '0',
        transform: 'translateY(12px)',
        transition: 'opacity .32s ease, transform .42s cubic-bezier(.22, 1, .36, 1)'
      }));

      let stitchPromptHideTimer = 0;
      const showStitchPrompt = () => {
        window.clearTimeout(stitchPromptHideTimer);
        stitchPromptHideTimer = 0;
        stitchPrompt.style.visibility = 'visible';
        requestAnimationFrame(() => {
          stitchPromptSpans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
        });
      };

      const hideStitchPrompt = () => {
        stitchPromptSpans.forEach((span, index) => {
          span.style.transitionDelay = `${(stitchPromptSpans.length - 1 - index) * 18}ms`;
          span.style.opacity = '0';
          span.style.transform = 'translateY(-8px)';
        });
        window.clearTimeout(stitchPromptHideTimer);
        stitchPromptHideTimer = window.setTimeout(() => {
          stitchPrompt.style.visibility = 'hidden';
          stitchPromptSpans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 28}ms`;
            span.style.transform = 'translateY(12px)';
          });
          stitchPromptHideTimer = 0;
        }, 500);
      };

      document.addEventListener('pointerover', event => {
        if (matchMedia(mobileLayoutQuery).matches) return;
        const ribbon = event.target.closest?.('.awwwards-badge');
        if (!ribbon || ribbon.contains(event.relatedTarget)) return;
        awwwardsHoverActive = true;
        cancelIdleImage();
        document.querySelectorAll('.trail-image').forEach(image => image.remove());
        latestTrailImage = null;
        showAwwwardsHoverGif();
      });

      document.addEventListener('pointerout', event => {
        if (matchMedia(mobileLayoutQuery).matches) return;
        const ribbon = event.target.closest?.('.awwwards-badge');
        if (!ribbon || ribbon.contains(event.relatedTarget)) return;
        awwwardsHoverActive = false;
        hideAwwwardsHoverGif();
        previousX = -999;
        previousY = -999;
      });

      const viewer = document.querySelector('#viewer');
      const viewerImage = document.querySelector('#viewerImage');
      const viewerVideo = document.querySelector('#viewerVideo');
      const viewerStaticPage = document.querySelector('#viewerStaticPage');
      const viewerStaticTitle = document.querySelector('#viewerStaticTitle');
      const viewerStaticImage = document.querySelector('#viewerStaticImage');
      const viewerStaticContent = document.querySelector('.viewer-static-content');
      const viewerStaticCopy = document.querySelector('#viewerStaticCopy');
      const viewerInfoPrompt = document.querySelector('#viewerInfoPrompt');
      const viewerInfoPromptLabel = document.querySelector('#viewerInfoPromptLabel');
      const viewerInfoBack = document.querySelector('#viewerInfoBack');
      const viewerNextImage = document.querySelector('#viewerNextImage');
      const viewerNextZone = document.querySelector('#viewerNextZone');
      const viewerClose = document.querySelector('#viewerClose');
      const viewerTabs = document.querySelector('#viewerTabs');
      const viewerBreadcrumbPath = document.querySelector('#viewerBreadcrumbPath');
      const viewerBreadcrumbImage = document.querySelector('#viewerBreadcrumbImage');
      const viewerMenu = document.querySelector('#viewerMenu');
      const viewerMenuHighlight = document.querySelector('#viewerMenuHighlight');
      const viewerMenuScrollCue = document.querySelector('#viewerMenuScrollCue');
      const viewerMenuList = document.querySelector('#viewerMenuList');
      const viewerMenuPreview = document.querySelector('#viewerMenuPreview');
      const viewerThumbnails = document.querySelector('#viewerThumbnails');
      const asciiMask = document.querySelector('#asciiMask');
      const matchReaction = document.querySelector('#matchReaction');
      const pointsDisplay = document.querySelector('#pointsDisplay');
      const pointsValue = document.querySelector('#pointsValue');
      const pointsBorder = document.querySelector('#pointsBorder');
      const pointsBorderRect = pointsBorder.querySelector('rect');
      const cursorAction = document.querySelector('#cursorAction');
      const cursorActionLabel = document.querySelector('#cursorActionLabel');
      const cursorActionCount = document.querySelector('#cursorActionCount');
      const updateCursorPillPosition = createCursorPillFollower(cursorActionCount);
      const cursorNavArrowGroup = document.querySelector('#cursorNavArrowGroup');
      const cursorNavArrow = document.querySelector('#cursorNavArrow');
      const menuHoverSound = new Audio('assets/sounds/onscroll.mp3');
      menuHoverSound.preload = 'auto';
      function warmUpMenuHoverSound() {
        menuHoverSound.load();
        menuHoverSound.muted = true;
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().then(() => {
          menuHoverSound.pause();
          menuHoverSound.currentTime = 0;
          menuHoverSound.muted = false;
        }).catch(() => { menuHoverSound.muted = false; });
      }
      window.addEventListener('pointermove', warmUpMenuHoverSound, { once: true });
      window.addEventListener('pointerdown', warmUpMenuHoverSound, { once: true });
      window.addEventListener('touchstart', warmUpMenuHoverSound, { once: true, passive: true });
      const pointGainSound = new Audio('assets/sounds/yep.mp3');
      const pointLossSound = new Audio('assets/sounds/nope.mp3');
      const closeTextSound = new Audio('assets/sounds/close.mp3');
      [pointGainSound, pointLossSound, closeTextSound].forEach(sound => {
        sound.preload = 'auto';
      });
      function playUiSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
      const maskContext = asciiMask.getContext('2d');
      const glyphs = 'αβγδεζθλμπσφψΩ∞∇∂∑∏∫≈≠≤≥⠀⠁⠂⠄⠈⠐⠠⡀⠃⠅⠉⠑⠡⡁⠆⠊ᚠᚢᚦᚪᚱᚷᚻᚾᛁᛃᛇᛏᛒᛖᛚᛟ■□▪▫▲△▶▼◆◇○●◐◑◒◓▓▒░▐▌▄▀█⌘⌥⌦⌫⎔⎛⎞⎡⎤⎧⎪⎯⎰⎲⎷⏎';
      let imageIndex = 0;
      let previousX = -999;
      let previousY = -999;
      let topLayer = 4;
      let latestTrailImage = null;
      let trailIdleTimer = 0;
      let lastTrailX = 0;
      let lastTrailY = 0;
      let viewerTransitioning = false;
      let viewerImageIndex = 0;
      let indexEntryInfoIndex = null;
      let indexEntryInfoConsumed = true;
      const viewerInfoIsEligible = () => viewerImageIndex === 0 ||
        (!indexEntryInfoConsumed && viewerImageIndex === indexEntryInfoIndex);
      const consumeIndexEntryInfo = nextIndex => {
        if (indexEntryInfoIndex !== null && viewerImageIndex === indexEntryInfoIndex && nextIndex !== viewerImageIndex) {
          indexEntryInfoConsumed = true;
        }
      };
      let activeViewerSection = Object.keys(projectCatalog)[0] || 'FULL-STACK';
      let nextImageTransitioning = false;
      let viewerInfoOpen = false;
      let viewerInfoFlipping = false;
      let viewerInfoHintTimer = 0;
      let viewerInfoHintHideTimer = 0;
      let viewerInfoTypeToken = 0;
      let viewerInfoFlipAxis = 'Y';
      let cursorCountTimer = 0;
      let pointerClientX = 0;
      let pointerClientY = 0;
      let hoveredMenuEntry = null;
      let menuScrollHoverFrame = 0;
      let menuCategoryTransitioning = false;
      let wasInsideViewerImage = false;
      let lastViewerImagePoint = null;
      let lastViewerOutsidePoint = null;
      let fluidPullFrame = 0;
      let fluidPullCanvas = null;
      let fluidPullTargetImage = null;
      let displayedArrowSide = null;
      let requestedArrowSide = null;
      let arrowSwapToken = 0;
      let asciiGrid = [];
      let nextAsciiGrid = [];
      let shiftDirections = [];
      let samplePixels = null;
      let maskWidth = 0;
      let maskHeight = 0;
      let asciiPattern = {
        seed: Math.random() * 10000,
        angle: 0,
        scale: .115,
        secondaryScale: .23,
        driftX: .003,
        driftY: .002,
        ripple: 0,
        phase: 0
      };
      let asciiCols = 0;
      let asciiRows = 0;
      let asciiFontSize = 16;
      const minimumDistance = 95;
      const transitionDuration = 900;
      let pillDragActive = false;
      let suppressPhotoClicks = false;
      let reactionState = '';
      let reactionHideTimer = 0;
      let reactionActive = false;
      let homeNavigationTransitioning = false;
      let triggerMobileGroundOpen = null;
      const reactionSequence = { nope: 0, yep: 0 };
      let points = 0;
      const viewerProjects = projectCatalog;

      (() => {
        function hslToRgb(h, s, l) {
          const chroma = (1 - Math.abs(2 * l - 1)) * s;
          const second = chroma * (1 - Math.abs((h / 60) % 2 - 1));
          const match = l - chroma / 2;
          let red = 0;
          let green = 0;
          let blue = 0;
          if (h < 60) [red, green] = [chroma, second];
          else if (h < 120) [red, green] = [second, chroma];
          else if (h < 180) [green, blue] = [chroma, second];
          else if (h < 240) [green, blue] = [second, chroma];
          else if (h < 300) [red, blue] = [second, chroma];
          else [red, blue] = [chroma, second];
          return [red, green, blue].map(channel => Math.round((channel + match) * 255));
        }

        function relativeLuminance(red, green, blue) {
          const linear = value => {
            value /= 255;
            return value <= .03928 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
          };
          return .2126 * linear(red) + .7152 * linear(green) + .0722 * linear(blue);
        }

        function randomAccessibleVibrantColor() {
          const hue = Math.random() * 360;
          const saturation = .85;
          let lightness = .55;
          let color = hslToRgb(hue, saturation, lightness);
          while ((relativeLuminance(...color) + .05) / .05 < 4.5 && lightness < .95) {
            lightness += .02;
            color = hslToRgb(hue, saturation, lightness);
          }
          return color;
        }

        const cycleDuration = 5000;
        const root = document.documentElement;
        let from = randomAccessibleVibrantColor();
        let to = randomAccessibleVibrantColor();
        let cycleStart = performance.now();

        function interpolateCursorColor(now) {
          const progress = Math.min(1, (now - cycleStart) / cycleDuration);
          const red = Math.round(from[0] + (to[0] - from[0]) * progress);
          const green = Math.round(from[1] + (to[1] - from[1]) * progress);
          const blue = Math.round(from[2] + (to[2] - from[2]) * progress);
          root.style.setProperty('--cursor-color', `rgb(${red}, ${green}, ${blue})`);
          if (progress >= 1) {
            from = to;
            to = randomAccessibleVibrantColor();
            cycleStart = now;
          }
          requestAnimationFrame(interpolateCursorColor);
        }
        requestAnimationFrame(interpolateCursorColor);
      })();

      function syncPointsBorder() {
        const width = pointsDisplay.offsetWidth;
        const height = pointsDisplay.offsetHeight;
        pointsBorder.setAttribute('viewBox', `0 0 ${width} ${height}`);
        pointsBorderRect.setAttribute('x', '.5');
        pointsBorderRect.setAttribute('y', '.5');
        pointsBorderRect.setAttribute('width', String(width - 1));
        pointsBorderRect.setAttribute('height', String(height - 1));
        pointsBorderRect.setAttribute('rx', String((height - 1) / 2));
      }
      syncPointsBorder();
      document.fonts?.ready.then(() => {
        if (!pointsDisplay.classList.contains('falling')) syncPointsBorder();
      });

      async function navigateFromHome(href, sourceElement) {
        if (!href || homeNavigationTransitioning) return;
        const isLabzDestination = (() => {
          try {
            const target = new URL(href, location.href);
            return target.origin === location.origin && /\/labz\/?(?:index\.html)?$/.test(target.pathname);
          } catch (_) {
            return false;
          }
        })();
        if (isLabzDestination) {
          homeNavigationTransitioning = true;
          cancelIdleImage();
          document.body.classList.add('labz-page-exit');
          const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
          const mobileSweep = matchMedia('(max-width: 1100px), (hover: none) and (pointer: coarse)').matches;
          window.setTimeout(() => { location.href = href; }, mobileSweep ? 1120 : (reducedMotion ? 260 : 1120));
          return;
        }
        if (/^https?:/i.test(href)) {
          window.open(href, '_blank', 'noopener');
          return;
        }
        if (pageSection !== 'HOME') {
          location.href = href;
          return;
        }
        homeNavigationTransitioning = true;
        cancelIdleImage();
        if (sourceElement?.classList?.contains('nav-pill')) {
          sourceElement.classList.add('pressed');
          await new Promise(resolve => setTimeout(resolve, 180));
        }
        if (document.documentElement.classList.contains('mobile-index') && triggerMobileGroundOpen) {
          await triggerMobileGroundOpen();
          location.href = href;
          return;
        }
        const elements = [
          ...document.querySelectorAll('.nav-pill, .tokonoma-logo, .trail-image, .awwwards-badge'),
          pointsDisplay
        ].filter(Boolean).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const fades = elements.map((element, index) => element.animate([
          { opacity: getComputedStyle(element).opacity || 1, translate: '0 0' },
          { opacity: 0, translate: '0 -18px' }
        ], {
          duration: 320,
          delay: Math.min(index * 28, 280),
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        }));
        await Promise.all(fades.map(animation => animation.finished.catch(() => {})));
        location.href = href;
      }

      function dropNavigationPills({ mobilePhysics = false } = {}) {
        const pills = [...document.querySelectorAll('.nav-pill')];
        const originalLayout = pills.map(pill => ({ pill, rect: pill.getBoundingClientRect() }));
        const viewportWidth = () => mobilePhysics
          ? Math.round(window.visualViewport?.width || document.documentElement.clientWidth || innerWidth)
          : innerWidth;
        const viewportHeight = () => mobilePhysics
          ? Math.round(window.visualViewport?.height || document.documentElement.clientHeight || innerHeight)
          : innerHeight;
        let physicsViewportWidth = viewportWidth();
        let physicsViewportHeight = viewportHeight();
        const mobileSpawnStart = performance.now() + 80;
        const logo = document.querySelector('.tokonoma-logo');
        const logoRect = logo.getBoundingClientRect();
        Object.assign(logo.style, {
          position: 'fixed',
          left: logoRect.left + 'px',
          top: logoRect.top + 'px'
        });
        const bodies = originalLayout.map(({ pill, rect }, index) => {
          const homeAnchor = pill.closest('.brand-nav')
            ? 'left'
            : pill.closest('.center-nav')
              ? 'center'
              : 'right';
          const slot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const slotFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const blackEdge = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const whiteDashes = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const radius = Math.max(0, (Math.min(rect.width, rect.height) - 1) / 2);
          slot.setAttribute('class', 'pill-slot');
          slot.setAttribute('aria-hidden', 'true');
          slot.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
          slotFill.setAttribute('class', 'slot-fill');
          slotFill.setAttribute('x', '.5');
          slotFill.setAttribute('y', '.5');
          slotFill.setAttribute('width', String(rect.width - 1));
          slotFill.setAttribute('height', String(rect.height - 1));
          slotFill.setAttribute('rx', String(radius));
          [blackEdge, whiteDashes].forEach(edge => {
            edge.setAttribute('x', '.5');
            edge.setAttribute('y', '.5');
            edge.setAttribute('width', String(rect.width - 1));
            edge.setAttribute('height', String(rect.height - 1));
            edge.setAttribute('rx', String(radius));
            edge.setAttribute('fill', 'none');
            edge.setAttribute('stroke-width', '1');
            edge.setAttribute('vector-effect', 'non-scaling-stroke');
          });
          blackEdge.setAttribute('stroke', '#000');
          whiteDashes.setAttribute('stroke', '#fff');
          whiteDashes.setAttribute('class', 'ants-white');
          slot.append(slotFill, blackEdge, whiteDashes);
          Object.assign(slot.style, {
            left: rect.left + 'px',
            top: rect.top + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px'
          });
          document.body.appendChild(slot);

          pill.classList.add('falling');
          Object.assign(pill.style, {
            left: '0px',
            top: '0px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            visibility: mobilePhysics ? 'hidden' : ''
          });
          document.body.appendChild(pill);

          return {
            element: pill,
            slot,
            width: rect.width,
            height: rect.height,
            x: mobilePhysics
              ? rect.width / 2 + 8 + Math.random() * Math.max(0, physicsViewportWidth - rect.width - 16)
              : rect.left + rect.width / 2,
            y: mobilePhysics
              ? -rect.height * (1.35 + Math.random() * .65)
              : rect.top + rect.height / 2,
            homeX: rect.left + rect.width / 2,
            homeY: rect.top + rect.height / 2,
            homeAnchor,
            homeHorizontalOffset: homeAnchor === 'left'
              ? rect.left + rect.width / 2
              : homeAnchor === 'center'
                ? rect.left + rect.width / 2 - physicsViewportWidth / 2
                : physicsViewportWidth - (rect.left + rect.width / 2),
            homeVerticalOffset: rect.top + rect.height / 2,
            vx: mobilePhysics ? -110 + Math.random() * 220 : ([-95, 62, 80, -55, 72, -88, 54, 90][index] || 0),
            vy: mobilePhysics ? Math.random() * 45 : 0,
            angle: 0,
            angularVelocity: mobilePhysics ? -8 + Math.random() * 16 : ([-7, 4, 5, -4, 6, -5, 4, -6][index] || 0),
            mass: Math.max(1, rect.width * rect.height),
            supported: false,
            dragging: false,
            dragMoved: false,
            snapped: false,
            snapping: false,
            active: !mobilePhysics,
            pendingFloorReentry: false,
            spawnAt: mobilePhysics ? mobileSpawnStart + index * 620 + Math.random() * 160 : 0
          };
        });

        // Only fallen nav pills trigger the centered STITCH ME BACK prompt.
        // The Awwwards ribbon is intentionally excluded.
        bodies.forEach(body => {
          if (!body.element.classList.contains('nav-pill')) return;
          body.element.addEventListener('pointerenter', () => {
            if (body.snapped || body.snapping || body.dragging) return;
            const extent = extents(body);
            const atBottom = body.y + extent.y >= physicsViewportHeight - 8;
            const restingOnAnotherPill = body.supported;
            if (atBottom || restingOnAnotherPill) showStitchPrompt();
          });
          body.element.addEventListener('pointerleave', hideStitchPrompt);
        });

        let pointsBody = null;
        if (!mobilePhysics) {
          syncPointsBorder();
          const pointsRect = pointsDisplay.getBoundingClientRect();
          pointsDisplay.classList.add('falling', 'static');
          Object.assign(pointsDisplay.style, {
            left: '0px',
            top: '0px',
            width: pointsRect.width + 'px',
            height: pointsRect.height + 'px'
          });
          document.body.appendChild(pointsDisplay);
          pointsBody = {
            element: pointsDisplay,
            slot: null,
            width: pointsRect.width,
            height: pointsRect.height,
            x: pointsRect.left + pointsRect.width / 2,
            y: pointsRect.top + pointsRect.height / 2,
            homeX: 0,
            homeY: 0,
            vx: -42,
            vy: 0,
            angle: 0,
            angularVelocity: -2,
            mass: Math.max(1, pointsRect.width * pointsRect.height),
            supported: false,
            dragging: false,
            dragMoved: false,
            snapped: true,
            snapping: false,
            active: true
          };
          bodies.push(pointsBody);
        }

        // Awwwards ribbon participates in physics on desktop AND mobile.
        // On mobile it is deliberately the first object to fall.
        const awwwardsBody = createAwwwardsBody(physicsViewportWidth);
        if (awwwardsBody) {
          if (mobilePhysics) {
            awwwardsBody.spawnAt = performance.now() + 20;
            awwwardsBody.y = -awwwardsBody.height;
            awwwardsBody.vy = 0;
          }
          bodies.push(awwwardsBody);
        }

        function reconcilePhysicsViewport() {
          const nextWidth = viewportWidth();
          const nextHeight = viewportHeight();
          if (nextWidth === physicsViewportWidth && nextHeight === physicsViewportHeight) return;

          bodies.forEach(body => {
            if (body === pointsBody) {
              body.x = nextWidth - 32 - body.width / 2;
              body.y = nextHeight - 32 - body.height / 2;
              body.vx = 0;
              body.vy = 0;
              body.angle = 0;
              body.angularVelocity = 0;
              return;
            }

            const oldExtent = extents(body);
            const wasOnGround = body.y + oldExtent.y >= physicsViewportHeight - 2;
            if (body.homeAnchor === 'left') {
              body.homeX = body.homeHorizontalOffset;
            } else if (body.homeAnchor === 'center') {
              body.homeX = nextWidth / 2 + body.homeHorizontalOffset;
            } else {
              body.homeX = nextWidth - body.homeHorizontalOffset;
            }
            body.homeY = body.homeVerticalOffset;

            if (body.slot) {
              body.slot.style.left = body.homeX - body.width / 2 + 'px';
              body.slot.style.top = body.homeY - body.height / 2 + 'px';
            }

            if (body.snapped && !body.snapping) {
              body.x = body.homeX;
              body.y = body.homeY;
              body.angle = 0;
            } else {
              body.x = body.x / physicsViewportWidth * nextWidth;
              body.y = wasOnGround
                ? nextHeight - extents(body).y
                : body.y / physicsViewportHeight * nextHeight;
              containBody(body);
            }
          });

          physicsViewportWidth = nextWidth;
          physicsViewportHeight = nextHeight;
        }

        window.addEventListener('resize', reconcilePhysicsViewport);
        window.visualViewport?.addEventListener('resize', reconcilePhysicsViewport);

        function resizePointsPill() {
          if (!pointsBody) return;
          const rightEdge = pointsBody.x + pointsBody.width / 2;
          pointsDisplay.style.width = 'auto';
          pointsDisplay.style.height = 'auto';
          const width = pointsDisplay.offsetWidth;
          const height = pointsDisplay.offsetHeight;
          pointsBody.width = width;
          pointsBody.height = height;
          pointsBody.x = rightEdge - width / 2;
          pointsBody.mass = Math.max(1, width * height);
          pointsDisplay.style.width = width + 'px';
          pointsDisplay.style.height = height + 'px';
          syncPointsBorder();
        }

        function overlapsSlot(body, target, tolerance = 0) {
          const currentShape = capsule(body);
          const homeShape = capsule({
            width: target.width,
            height: target.height,
            x: target.homeX,
            y: target.homeY,
            angle: 0
          });
          const closest = closestSegmentPoints(currentShape, homeShape);
          return Math.hypot(
            closest.secondX - closest.firstX,
            closest.secondY - closest.firstY
          ) <= currentShape.radius + homeShape.radius + tolerance;
        }

        function isOverOwnSlot(body) {
          return overlapsSlot(body, body, 45);
        }

        function clearWrongTargets(preserveReaction = false) {
          bodies.forEach(candidate => candidate.slot?.classList.remove('wrong-target'));
          if (!preserveReaction) hideReaction();
        }

        // Awwwards is a square/ribbon, not a pill: dropping it on any pill slot is an error.
        let ribbonErrorPrompt = null;
        let ribbonErrorHideTimer = 0;
        function showRibbonErrorPrompt() {
          window.clearTimeout(ribbonErrorHideTimer);
          if (!ribbonErrorPrompt) {
            ribbonErrorPrompt = document.createElement('div');
            ribbonErrorPrompt.className = 'stitch-me-back-prompt ribbon-pill-error';
            ribbonErrorPrompt.style.fontFamily = '"EurostileMNExtendedBold", "Eurostile", sans-serif';
            ribbonErrorPrompt.style.color = 'var(--cursor-color)';
            ribbonErrorPrompt.setAttribute('aria-hidden', 'true');
            '404: PILL NOT FOUND'.split('').forEach((character, index) => {
              const span = document.createElement('span');
              span.textContent = character === ' ' ? '\u00a0' : character;
              span.style.transitionDelay = `${index * 28}ms`;
              Object.assign(span.style, {
                display: 'inline-block',
                opacity: '0',
                transform: 'translateY(12px)',
                transition: 'opacity .32s ease, transform .42s cubic-bezier(.22, 1, .36, 1)'
              });
              ribbonErrorPrompt.appendChild(span);
            });
            Object.assign(ribbonErrorPrompt.style, {
              position: 'fixed',
              left: '50%',
              top: '50%',
              zIndex: '10001',
              display: 'flex',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              visibility: 'hidden'
            });
            document.body.appendChild(ribbonErrorPrompt);
          }
          // Place the 404 label 32px above the centered Awwwards GIF.
          const gifRect = awwwardsHoverGif.getBoundingClientRect();
          if (gifRect.height > 0) {
            ribbonErrorPrompt.style.top = `${gifRect.top - 32}px`;
            ribbonErrorPrompt.style.transform = 'translate(-50%, -100%)';
          } else {
            ribbonErrorPrompt.style.top = '50%';
            ribbonErrorPrompt.style.transform = 'translate(-50%, calc(-50% - 192px))';
          }
          ribbonErrorPrompt.style.visibility = 'visible';
          const spans = [...ribbonErrorPrompt.children];
          spans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 28}ms`;
            span.style.opacity = '0';
            span.style.transform = 'translateY(12px)';
          });
          requestAnimationFrame(() => requestAnimationFrame(() => {
            spans.forEach(span => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0)';
            });
          }));
          ribbonErrorHideTimer = window.setTimeout(() => {
            spans.forEach((span, index) => {
              span.style.transitionDelay = `${(spans.length - 1 - index) * 18}ms`;
              span.style.opacity = '0';
              span.style.transform = 'translateY(-8px)';
            });
            ribbonErrorHideTimer = window.setTimeout(() => {
              ribbonErrorPrompt.style.visibility = 'hidden';
            }, 500);
          }, 900);
        }

        function updateWrongTargets(body) {
          let hasWrongOverlap = false;
          bodies.forEach(candidate => {
            if (!candidate.slot) return;
            const wrongOverlap = candidate !== body && !candidate.snapped &&
              overlapsSlot(body, candidate);
            candidate.slot.classList.toggle('wrong-target', wrongOverlap);
            hasWrongOverlap ||= wrongOverlap;
          });
          if (hasWrongOverlap) showReaction('nope');
          else hideReaction();
        }

        function showReaction(state, force = false) {
          window.clearTimeout(reactionHideTimer);
          reactionHideTimer = 0;
          if (!force && reactionActive && reactionState === state) return;
          reactionActive = true;
          reactionState = state;
          const previousIndex = reactionSequence[state];
          do {
            reactionSequence[state] = 1 + Math.floor(Math.random() * 4);
          } while (reactionSequence[state] === previousIndex);
          matchReaction.src =
            `assets/img/gif/${state}-${reactionSequence[state]}.gif?restart=${Date.now()}`;
          matchReaction.classList.remove('exiting');
          matchReaction.classList.add('show');
        }

        function hideReaction(delay = 2000) {
          if (!reactionState || reactionHideTimer) return;
          reactionActive = false;
          reactionHideTimer = window.setTimeout(() => {
            matchReaction.classList.add('exiting');
            reactionHideTimer = window.setTimeout(() => {
              reactionHideTimer = 0;
              reactionState = '';
              matchReaction.classList.add('resetting');
              matchReaction.classList.remove('show', 'exiting');
              void matchReaction.offsetWidth;
              matchReaction.classList.remove('resetting');
            }, 450);
          }, delay);
        }

        function awardPoints(amount) {
          points += amount;
          playUiSound(amount > 0 ? pointGainSound : pointLossSound);
          pointsValue.textContent = points > 0 ? `POINTS +${points}` : `POINTS ${points}`;
          pointsDisplay.classList.toggle('positive', points > 0);
          pointsDisplay.classList.toggle('negative', points < 0);
          resizePointsPill();
        }

        function snapToHome(body) {
          clearWrongTargets();
          showReaction('yep');
          awardPoints(1);
          body.slot.classList.add('correct-target');
          body.snapping = true;
          body.vx = 0;
          body.vy = 0;
          body.angularVelocity = 0;
          body.element.classList.add('snapped');
          const startX = body.x;
          const startY = body.y;
          const startAngle = ((body.angle + 180) % 360 + 360) % 360 - 180;
          const started = performance.now();
          const duration = 440;

          function dock(now) {
            const progress = Math.min(1, (now - started) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            body.x = startX + (body.homeX - startX) * eased;
            body.y = startY + (body.homeY - startY) * eased;
            body.angle = startAngle * (1 - eased);
            if (progress < 1) {
              requestAnimationFrame(dock);
              return;
            }
            body.x = body.homeX;
            body.y = body.homeY;
            body.angle = 0;
            body.snapping = false;
            body.snapped = true;
            body.slot.style.visibility = 'hidden';
            body.slot.classList.remove('correct-target');
            hideReaction();
            window.setTimeout(() => {
              body.snapped = false;
              body.pendingFloorReentry = true;
              body.slot.style.visibility = 'visible';
              body.element.classList.remove('snapped');
            }, 4000);
          }
          requestAnimationFrame(dock);
        }

        function finishDrag(body, event) {
          if (!body.dragging || event.pointerId !== body.pointerId) return;
          event.preventDefault();
          event.stopPropagation();
          const isAwwwardsRibbon = body.element.classList.contains('awwwards-badge');
          const wrongRelease = (Boolean(body.slot) || isAwwwardsRibbon) &&
            event.type === 'pointerup' && body.dragMoved &&
            bodies.some(candidate => candidate.slot && candidate !== body && !candidate.snapped &&
              overlapsSlot(body, candidate, 45));
          clearWrongTargets(wrongRelease);
          const releaseDelay = performance.now() - body.lastPointerTime;
          if (releaseDelay > 80) {
            const retained = Math.max(0, 1 - (releaseDelay - 80) / 220);
            body.vx *= retained;
            body.vy *= retained;
          }
          body.dragging = false;
          body.element.classList.remove('dragging');
          if (wrongRelease) {
            showReaction('nope');
            if (isAwwwardsRibbon) showRibbonErrorPrompt();
            awardPoints(-1);
            hideReaction(900);
            body.angularVelocity += clamp(body.vx / Math.max(body.width, body.height) * 7, -60, 60);
            body.pendingFloorReentry = true;
          } else if (body.slot && body.dragMoved && isOverOwnSlot(body)) {
            snapToHome(body);
          } else {
            body.angularVelocity += clamp(body.vx / Math.max(body.width, body.height) * 7, -60, 60);
          }
          if (body.element.hasPointerCapture(event.pointerId)) {
            body.element.releasePointerCapture(event.pointerId);
          }
          if (event.type === 'pointermove') {
            const endInteraction = () => {
              document.removeEventListener('pointerup', endInteraction, true);
              document.removeEventListener('pointercancel', endInteraction, true);
              pillDragActive = false;
              window.setTimeout(() => { suppressPhotoClicks = false; }, 0);
            };
            document.addEventListener('pointerup', endInteraction, true);
            document.addEventListener('pointercancel', endInteraction, true);
          } else {
            pillDragActive = false;
            window.setTimeout(() => { suppressPhotoClicks = false; }, 0);
          }
        }

        bodies.forEach(body => {
          body.element.addEventListener('pointerdown', event => {
            if (mobilePhysics) return;
            if (event.button !== 0 || body.snapped || body.snapping) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = true;
            body.dragMoved = false;
            body.pointerId = event.pointerId;
            body.dragOffsetX = event.clientX - body.x;
            body.dragOffsetY = event.clientY - body.y;
            body.dragStartX = event.clientX;
            body.dragStartY = event.clientY;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = performance.now();
            body.vx = 0;
            body.vy = 0;
            body.angularVelocity = 0;
            pillDragActive = true;
            suppressPhotoClicks = true;
            body.element.classList.add('dragging');
            body.element.setPointerCapture(event.pointerId);
          });

          body.element.addEventListener('pointermove', event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            const now = performance.now();
            const elapsed = Math.max((now - body.lastPointerTime) / 1000, .008);
            const nextX = event.clientX - body.dragOffsetX;
            const nextY = event.clientY - body.dragOffsetY;
            const instantVX = (event.clientX - body.lastPointerX) / elapsed;
            const instantVY = (event.clientY - body.lastPointerY) / elapsed;
            body.vx = clamp(instantVX, -2400, 2400);
            body.vy = clamp(instantVY, -2400, 2400);
            body.x = nextX;
            body.y = nextY;
            body.dragMoved ||= Math.hypot(
              event.clientX - body.dragStartX,
              event.clientY - body.dragStartY
            ) > 5;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = now;
            if (body.slot || body.element.classList.contains('awwwards-badge')) {
              updateWrongTargets(body);
              if (body.slot && body.dragMoved && isOverOwnSlot(body)) finishDrag(body, event);
            }
          });

          body.element.addEventListener('pointerup', event => finishDrag(body, event));
          body.element.addEventListener('pointercancel', event => finishDrag(body, event));
          body.element.addEventListener('click', event => {
            if (body.externalLink) {
              event.preventDefault();
              event.stopPropagation();
              if (body.dragMoved) body.dragMoved = false;
              else window.open(body.element.href, '_blank', 'noopener');
              return;
            }
            if (!body.dragMoved) {
              const href = body.element.getAttribute?.('href');
              if (href) {
                event.preventDefault();
                navigateFromHome(href, body.element);
              }
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            body.dragMoved = false;
          });
        });

        function capsule(body) {
          const radians = body.angle * Math.PI / 180;
          const horizontal = body.width >= body.height;
          const localX = horizontal ? 1 : 0;
          const localY = horizontal ? 0 : 1;
          const axisX = localX * Math.cos(radians) - localY * Math.sin(radians);
          const axisY = localX * Math.sin(radians) + localY * Math.cos(radians);
          const radius = Math.min(body.width, body.height) / 2;
          const halfSegment = (Math.max(body.width, body.height) - radius * 2) / 2;
          return {
            axisX,
            axisY,
            radius,
            halfSegment,
            ax: body.x - axisX * halfSegment,
            ay: body.y - axisY * halfSegment,
            bx: body.x + axisX * halfSegment,
            by: body.y + axisY * halfSegment
          };
        }

        function extents(body) {
          const shape = capsule(body);
          return {
            x: Math.abs(shape.axisX) * shape.halfSegment + shape.radius,
            y: Math.abs(shape.axisY) * shape.halfSegment + shape.radius
          };
        }

        function clamp(value, minimum, maximum) {
          return Math.max(minimum, Math.min(maximum, value));
        }

        function closestSegmentPoints(first, second) {
          const d1x = first.bx - first.ax;
          const d1y = first.by - first.ay;
          const d2x = second.bx - second.ax;
          const d2y = second.by - second.ay;
          const rx = first.ax - second.ax;
          const ry = first.ay - second.ay;
          const a = d1x * d1x + d1y * d1y;
          const e = d2x * d2x + d2y * d2y;
          const f = d2x * rx + d2y * ry;
          let s = 0;
          let t = 0;

          if (a <= .0001 && e <= .0001) {
            return { firstX: first.ax, firstY: first.ay, secondX: second.ax, secondY: second.ay };
          }
          if (a <= .0001) {
            t = clamp(f / e, 0, 1);
          } else {
            const c = d1x * rx + d1y * ry;
            if (e <= .0001) {
              s = clamp(-c / a, 0, 1);
            } else {
              const b = d1x * d2x + d1y * d2y;
              const denominator = a * e - b * b;
              if (denominator !== 0) s = clamp((b * f - c * e) / denominator, 0, 1);
              t = (b * s + f) / e;
              if (t < 0) {
                t = 0;
                s = clamp(-c / a, 0, 1);
              } else if (t > 1) {
                t = 1;
                s = clamp((b - c) / a, 0, 1);
              }
            }
          }
          return {
            firstX: first.ax + d1x * s,
            firstY: first.ay + d1y * s,
            secondX: second.ax + d2x * t,
            secondY: second.ay + d2y * t
          };
        }

        function resolvePair(first, second) {
          if (!first.active || !second.active) return;
          const firstShape = capsule(first);
          const secondShape = capsule(second);
          const closest = closestSegmentPoints(firstShape, secondShape);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const overlap = firstShape.radius + secondShape.radius - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = second.x - first.x || 1;
            ny = second.y - first.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;

          const inverseFirst = first.dragging || first.snapped || first.snapping ? 0 : 1 / first.mass;
          const inverseSecond = second.dragging || second.snapped || second.snapping ? 0 : 1 / second.mass;
          const inverseTotal = inverseFirst + inverseSecond;
          if (inverseTotal === 0) return;
          first.x -= nx * overlap * inverseFirst / inverseTotal;
          first.y -= ny * overlap * inverseFirst / inverseTotal;
          second.x += nx * overlap * inverseSecond / inverseTotal;
          second.y += ny * overlap * inverseSecond / inverseTotal;

          const relative = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
          if (relative < 0) {
            const impulse = -(1 + .30) * relative / inverseTotal;
            first.vx -= nx * impulse * inverseFirst;
            first.vy -= ny * impulse * inverseFirst;
            second.vx += nx * impulse * inverseSecond;
            second.vy += ny * impulse * inverseSecond;
          }
          if (Math.abs(ny) > .55) {
            if (ny > 0) first.supported = true;
            else second.supported = true;
          }
          const spin = (second.vx - first.vx) * .008;
          if (!first.dragging && !first.snapped && !first.snapping) first.angularVelocity -= spin;
          if (!second.dragging && !second.snapped && !second.snapping) second.angularVelocity += spin;
        }

        function containBody(body, delta = 0) {
          if (!body.active) return;
          const extent = extents(body);
          if (body.x - extent.x < 8) {
            body.x = 8 + extent.x;
            body.vx = Math.abs(body.vx) * .68;
            body.angularVelocity *= -.7;
          } else if (body.x + extent.x > physicsViewportWidth - 8) {
            body.x = physicsViewportWidth - 8 - extent.x;
            body.vx = -Math.abs(body.vx) * .68;
            body.angularVelocity *= -.7;
          }
          const floor = physicsViewportHeight - (mobilePhysics ? 1 : 0);
          const ceiling = -physicsViewportHeight;
          if (body.y - extent.y < ceiling) {
            body.y = ceiling + extent.y;
            body.vy = Math.abs(body.vy) * .45;
            body.angularVelocity *= -.7;
          }
          if (body.pendingFloorReentry) {
            if (body.y - extent.y > physicsViewportHeight + extent.y * 2) {
              body.y = -extent.y * (1.2 + Math.random() * .5);
              body.vy = Math.random() * 45;
              body.pendingFloorReentry = false;
            }
            return;
          }
          if (body.y + extent.y > floor) {
            body.y = floor - extent.y;
            body.vy = Math.abs(body.vy) > 72 ? -Math.abs(body.vy) * .31 : 0;
            body.angularVelocity *= .72;
            body.supported = true;
          }
        }

        function tipUnsupportedStandingPill(body, delta) {
          if (!body.supported || body.snapped || body.snapping) return;
          const shape = capsule(body);
          let angle = Math.atan2(shape.axisY, shape.axisX);
          if (angle > Math.PI / 2) angle -= Math.PI;
          if (angle < -Math.PI / 2) angle += Math.PI;

          const lean = Math.abs(angle);
          if (lean > .055) {
            const fallDirection = -Math.sign(angle);

            // A pill balanced on its end should lose balance quickly.
            // Add both rotational fall and a small sideways foot-slip.
            body.angularVelocity += fallDirection * 620 * delta;
            body.vx += fallDirection * 235 * delta;
          }
        }

        let previousTime = performance.now();
        function simulate(now) {
          const delta = Math.min((now - previousTime) / 1000, .02);
          previousTime = now;

          bodies.forEach(body => {
            if (!body.active) {
              if (now < body.spawnAt) return;
              body.active = true;
              body.element.style.visibility = 'visible';
            }
            body.supported = false;
            if (body.dragging || body.snapped || body.snapping) {
              containBody(body);
              return;
            }
            body.vy += (mobilePhysics ? 1050 : 1850) * delta;
            body.x += body.vx * delta;
            body.y += body.vy * delta;
            body.angle += body.angularVelocity * delta;
            body.angularVelocity *= Math.pow(.982, delta * 60);
            body.angularVelocity = clamp(body.angularVelocity, -85, 85);
            if (Math.abs(body.angularVelocity) < .25) body.angularVelocity = 0;

            containBody(body, delta);
          });

          for (let iteration = 0; iteration < 10; iteration++) {
            for (let first = 0; first < bodies.length; first++) {
              for (let second = first + 1; second < bodies.length; second++) {
                resolvePair(bodies[first], bodies[second]);
              }
            }
            bodies.forEach(containBody);
          }

          bodies.forEach(body => tipUnsupportedStandingPill(body, delta));

          // Ground contact friction: pills keep a little momentum, then settle naturally.
          // This avoids both the old endless ice-slide and an over-stiff instant stop.
          bodies.forEach(body => {
            if (!body.active || body.dragging || body.snapped || body.snapping || !body.supported) return;
            const shape = capsule(body);
            let groundAngle = Math.atan2(shape.axisY, shape.axisX);
            if (groundAngle > Math.PI / 2) groundAngle -= Math.PI;
            if (groundAngle < -Math.PI / 2) groundAngle += Math.PI;
            const stillFalling = Math.abs(groundAngle) > .20;

            // While tipping, preserve enough motion for a visible slide/bounce.
            // Once lying down, increase damping so the pill actually comes to rest.
            const groundFriction = Math.pow(
              stillFalling ? (mobilePhysics ? .982 : .978) : (mobilePhysics ? .93 : .90),
              delta * 60
            );
            const spinFriction = Math.pow(stillFalling ? .986 : .91, delta * 60);

            body.vx *= groundFriction;
            body.angularVelocity *= spinFriction;

            if (!stillFalling && Math.abs(body.vx) < 7) body.vx = 0;
            if (!stillFalling && Math.abs(body.angularVelocity) < .8) body.angularVelocity = 0;
          });

          bodies.forEach(body => {
            if (!body.active) return;
            body.element.style.transform =
              `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}deg)`;
          });
          requestAnimationFrame(simulate);
        }
        requestAnimationFrame(simulate);
      }

      document.querySelectorAll('.nav-pill[href]').forEach(pill => {
        pill.addEventListener('click', event => {
          if (pill.classList.contains('falling') || pill.classList.contains('mobile-falling') || event.defaultPrevented) return;
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          const href = pill.getAttribute('href');
          navigateFromHome(href, pill);
        });
      });

      function dropMobileNavigationPills() {
        const fallThroughSessionKey = 'tokonoma-nav-fall-through-seen';
        let runFallThroughIntro = true;
        try {
          const referrer = document.referrer ? new URL(document.referrer) : null;
          const returningFromLabz = Boolean(
            referrer &&
            referrer.origin === location.origin &&
            /^\/labz\/(?:index\.html)?$/i.test(referrer.pathname)
          );
          if (returningFromLabz) sessionStorage.setItem(fallThroughSessionKey, '1');
          runFallThroughIntro = !returningFromLabz && sessionStorage.getItem(fallThroughSessionKey) !== '1';
          if (runFallThroughIntro) sessionStorage.setItem(fallThroughSessionKey, '1');
        } catch (_) {}
        let groundOpen = runFallThroughIntro;
        const sampleTiltGravity = createTiltGravityController();
        const navigationPills = [...document.querySelectorAll('.nav-pill')].sort(() => Math.random() - .5);
        const projectImages = [...document.querySelectorAll('.mobile-drop-image')].sort(() => Math.random() - .5);
        const pills = [];
        navigationPills.forEach((pill, index) => {
          pills.push(pill);
          if (projectImages[index]) pills.push(projectImages[index]);
        });
        // Mobile: the Awwwards ribbon is the FIRST falling object.
        // The Tokonoma logo stays fixed and never joins the mobile drop.
        let mobileAwwwards = document.getElementById('awwwards');
        if (!mobileAwwwards) {
          mobileAwwwards = document.createElement('a');
          mobileAwwwards.id = 'awwwards';
          mobileAwwwards.className = 'awwwards-badge';
          mobileAwwwards.href = AWWWARDS_URL;
          mobileAwwwards.target = '_blank';
          mobileAwwwards.rel = 'noopener';
          mobileAwwwards.draggable = false;
          mobileAwwwards.setAttribute('aria-label', 'Tokonoma Studio on Awwwards');
          mobileAwwwards.innerHTML = AWWWARDS_SVG;
          Object.assign(mobileAwwwards.style, {
            width: '53.08px',
            height: '171.358px',
            visibility: 'hidden'
          });
          document.body.appendChild(mobileAwwwards);
        }
        // pills.unshift(mobileAwwwards);
        const mobileWidth = () => Math.round(window.visualViewport?.width || document.documentElement.clientWidth || innerWidth);
        const mobileHeight = () => Math.round(window.visualViewport?.height || document.documentElement.clientHeight || innerHeight);
        const phase1Stagger = 140;
        const phase2Stagger = 520;
        const started = performance.now() + 80;
        const offscreenReaction = document.createElement('img');
        offscreenReaction.className = 'offscreen-reaction';
        offscreenReaction.alt = '';
        offscreenReaction.setAttribute('aria-hidden', 'true');
        document.body.appendChild(offscreenReaction);
        let offscreenReactionVisible = false;
        let offscreenReactionPending = false;
        let offscreenReactionRequest = 0;
        let offscreenRotationActive = false;
        let secondPassReady = false;
        let nextOffscreenReactionState = 'nope';
        let previousOffscreenReactionSource = '';
        const offscreenReactionSources = ['nope', 'yep'].flatMap(state =>
          Array.from({ length: 4 }, (_, index) => `assets/img/gif/${state}-${index + 1}.gif`)
        );
        offscreenReactionSources.forEach(source => {
          const preload = new Image();
          preload.src = source;
        });
        const showOffscreenReaction = () => {
          if (offscreenRotationActive) return;
          offscreenRotationActive = true;
          const state = nextOffscreenReactionState;
          nextOffscreenReactionState = state === 'nope' ? 'yep' : 'nope';
          let source = '';
          do {
            source = `assets/img/gif/${state}-${1 + Math.floor(Math.random() * 4)}.gif`;
          } while (source === previousOffscreenReactionSource);
          previousOffscreenReactionSource = source;
          const request = ++offscreenReactionRequest;
          offscreenReactionPending = false;
          offscreenReaction.removeAttribute('src');
          offscreenReaction.src = source;
          if (request !== offscreenReactionRequest || !offscreenRotationActive) return;
          offscreenReactionVisible = true;
          offscreenReaction.classList.add('show');
        };
        const hideOffscreenReaction = () => {
          if (!offscreenReactionVisible && !offscreenReactionPending) return;
          const request = ++offscreenReactionRequest;
          offscreenReactionPending = false;
          offscreenReactionVisible = false;
          offscreenReaction.classList.remove('show');
          window.setTimeout(() => {
            if (request !== offscreenReactionRequest || offscreenReactionVisible) return;
            offscreenReaction.removeAttribute('src');
          }, 380);
        };
        const bodies = pills.map((pill, index) => {
          const isProjectImage = pill.classList.contains('mobile-drop-image');
          const isAwwwardsRibbon = pill.classList.contains('awwwards-badge');
          const rect = pill.getBoundingClientRect();
          const width = Math.min(rect.width, mobileWidth() - 2);
          const height = isAwwwardsRibbon ? rect.height : (isProjectImage ? rect.height : Math.min(rect.height, 64));
          pill.classList.add('mobile-falling');
          Object.assign(pill.style, {
            position: 'fixed',
            zIndex: '30',
            left: '0px',
            top: '0px',
            width: width + 'px',
            height: height + 'px',
            visibility: 'hidden',
            touchAction: 'none'
          });
          const ants = pill.querySelector('.pill-ants');
          if (ants) {
            const radius = isProjectImage ? 0 : Math.min(width, height) / 2;
            ants.removeAttribute('preserveAspectRatio');
            ants.setAttribute('viewBox', `0 0 ${width} ${height}`);
            ants.querySelectorAll('rect').forEach(shape => {
              shape.setAttribute('x', .5);
              shape.setAttribute('y', .5);
              shape.setAttribute('width', Math.max(0, width - 1));
              shape.setAttribute('height', Math.max(0, height - 1));
              shape.setAttribute('rx', radius);
            });
          }
          document.body.appendChild(pill);
          return {
            element: pill,
            isProjectImage,
            isAwwwardsRibbon,
            width,
            height,
            x: width / 2 + Math.random() * Math.max(0, mobileWidth() - width),
            y: -height / 2 - 12 - Math.random() * 50,
            vx: -90 + Math.random() * 180,
            vy: 0,
            angle: -28 + Math.random() * 56,
            angularVelocity: -32 + Math.random() * 64,
            mass: Math.max(1, width * height),
            dragging: false,
            dragMoved: false,
            enteredViewport: false,
            waitingForFreshImage: false,
            active: false,
            releaseAt: started + index * (runFallThroughIntro ? phase1Stagger : phase2Stagger) + Math.random() * 60
          };
        });

        let previous = performance.now();
        function mobileCapsule(body) {
          const radians = body.angle * Math.PI / 180;
          const horizontal = body.width >= body.height;
          const axisX = horizontal ? Math.cos(radians) : -Math.sin(radians);
          const axisY = horizontal ? Math.sin(radians) : Math.cos(radians);
          const radius = Math.min(body.width, body.height) / 2;
          const halfSegment = (Math.max(body.width, body.height) - radius * 2) / 2;
          return {
            axisX,
            axisY,
            radius,
            halfSegment,
            ax: body.x - axisX * halfSegment,
            ay: body.y - axisY * halfSegment,
            bx: body.x + axisX * halfSegment,
            by: body.y + axisY * halfSegment
          };
        }

        function mobileExtents(body) {
          const shape = mobileCapsule(body);
          return {
            x: Math.abs(shape.axisX) * shape.halfSegment + shape.radius,
            y: Math.abs(shape.axisY) * shape.halfSegment + shape.radius
          };
        }

        function closestMobileSegmentPoints(first, second) {
          const d1x = first.bx - first.ax;
          const d1y = first.by - first.ay;
          const d2x = second.bx - second.ax;
          const d2y = second.by - second.ay;
          const rx = first.ax - second.ax;
          const ry = first.ay - second.ay;
          const a = d1x * d1x + d1y * d1y;
          const e = d2x * d2x + d2y * d2y;
          const f = d2x * rx + d2y * ry;
          const clampMobile = value => Math.max(0, Math.min(1, value));
          let s = 0;
          let t = 0;
          if (a <= .0001 && e <= .0001) {
            return { firstX: first.ax, firstY: first.ay, secondX: second.ax, secondY: second.ay };
          }
          if (a <= .0001) {
            t = clampMobile(f / e);
          } else {
            const c = d1x * rx + d1y * ry;
            if (e <= .0001) {
              s = clampMobile(-c / a);
            } else {
              const b = d1x * d2x + d1y * d2y;
              const denominator = a * e - b * b;
              if (denominator !== 0) s = clampMobile((b * f - c * e) / denominator);
              t = (b * s + f) / e;
              if (t < 0) {
                t = 0;
                s = clampMobile(-c / a);
              } else if (t > 1) {
                t = 1;
                s = clampMobile((b - c) / a);
              }
            }
          }
          return {
            firstX: first.ax + d1x * s,
            firstY: first.ay + d1y * s,
            secondX: second.ax + d2x * t,
            secondY: second.ay + d2y * t
          };
        }

        function resolveMobileCollision(first, second, applySpin = false) {
          if (!first.active || !second.active) return;
          const firstShape = mobileCapsule(first);
          const secondShape = mobileCapsule(second);
          const closest = closestMobileSegmentPoints(firstShape, secondShape);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const collisionSeparation = 3;
          const overlap = firstShape.radius + secondShape.radius + collisionSeparation - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = second.x - first.x || 1;
            ny = second.y - first.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;
          const inverseFirst = first.dragging ? 0 : 1 / first.mass;
          const inverseSecond = second.dragging ? 0 : 1 / second.mass;
          const inverseTotal = inverseFirst + inverseSecond;
          if (inverseTotal === 0) return;
          first.x -= nx * overlap * inverseFirst / inverseTotal;
          first.y -= ny * overlap * inverseFirst / inverseTotal;
          second.x += nx * overlap * inverseSecond / inverseTotal;
          second.y += ny * overlap * inverseSecond / inverseTotal;
          const relative = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
          if (relative < 0) {
            const impulse = -(1 + .30) * relative / inverseTotal;
            first.vx -= nx * impulse * inverseFirst;
            first.vy -= ny * impulse * inverseFirst;
            second.vx += nx * impulse * inverseSecond;
            second.vy += ny * impulse * inverseSecond;
          }
          if (applySpin) {
            const spin = (second.vx - first.vx) * .004;
            first.angularVelocity -= spin;
            second.angularVelocity += spin;
          }
        }

        function resolveMobileTiltCollider(body) {
          if (groundOpen || !body.active || body.dragging) return;
          const tiltButton = document.querySelector('.mobile-tilt-enable');
          if (!tiltButton?.isConnected) return;
          const rect = tiltButton.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const colliderRadius = rect.height / 2;
          const collider = {
            ax: rect.left + colliderRadius,
            ay: rect.top + colliderRadius,
            bx: rect.right - colliderRadius,
            by: rect.top + colliderRadius,
            radius: colliderRadius
          };
          const bodyShape = mobileCapsule(body);
          const closest = closestMobileSegmentPoints(bodyShape, collider);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const overlap = bodyShape.radius + collider.radius + 2 - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = rect.left + rect.width / 2 - body.x || 1;
            ny = rect.top + rect.height / 2 - body.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;
          body.x -= nx * overlap;
          body.y -= ny * overlap;
          const incoming = body.vx * nx + body.vy * ny;
          if (incoming > 0) {
            body.vx -= nx * incoming * 1.5;
            body.vy -= ny * incoming * 1.5;
            body.angularVelocity += Math.max(-28, Math.min(28, -nx * body.vy * .025));
          }
        }

        function containMobileBody(body) {
          const width = mobileWidth();
          const height = mobileHeight();
          const floor = mobileHeight() - 1;
          const extent = mobileExtents(body);
          if (body.y - extent.y >= 0) body.enteredViewport = true;
          const ceiling = -height * 3;
          if (!groundOpen && body.enteredViewport && body.y - extent.y < ceiling) {
            body.y = ceiling + extent.y;
            body.vy = Math.abs(body.vy) * .45;
            body.angularVelocity *= -.7;
          }
          if (body.x - extent.x < 0) {
            body.x = extent.x;
            body.vx = Math.abs(body.vx) * .55;
            body.angularVelocity *= -.7;
          } else if (body.x + extent.x > width) {
            body.x = width - extent.x;
            body.vx = -Math.abs(body.vx) * .55;
            body.angularVelocity *= -.7;
          }
          if (!groundOpen && body.y + extent.y > floor) {
            body.y = floor - extent.y;
            body.vy = Math.abs(body.vy) > 90 ? -Math.abs(body.vy) * .27 : 0;
            body.vx *= .992;
            body.angularVelocity *= .86;
          }
        }

        function simulateMobile(now) {
          const delta = Math.min((now - previous) / 1000, .02);
          previous = now;
          const sensedGravity = sampleTiltGravity();
          const tiltGravity = groundOpen
            ? { x: sensedGravity.enabled ? sensedGravity.x * .7 : 0, y: Math.max(.55, sensedGravity.y) }
            : sensedGravity;
          bodies.forEach(body => {
            if (!body.active) {
              if (now < body.releaseAt) return;
              body.active = true;
              body.element.style.visibility = 'visible';
            }
            if (body.dragging) {
              containMobileBody(body);
              return;
            }
            body.vx += tiltGravity.x * 1200 * delta;
            body.vy += tiltGravity.y * 1200 * delta;
            body.x += body.vx * delta;
            body.y += body.vy * delta;
            body.angle += body.angularVelocity * delta;
            body.angularVelocity *= Math.pow(.955, delta * 60);
            if (Math.abs(body.angularVelocity) < .35) body.angularVelocity = 0;
            containMobileBody(body);
          });
          const anyBodyInViewport = bodies.some(body => {
            if (!body.active) return false;
            const extent = mobileExtents(body);
            return body.y + extent.y >= 0;
          });
          if ((offscreenReactionVisible || offscreenReactionPending) && anyBodyInViewport) hideOffscreenReaction();
          for (let iteration = 0; iteration < 40; iteration++) {
            for (let first = 0; first < bodies.length; first++) {
              for (let second = first + 1; second < bodies.length; second++) {
                resolveMobileCollision(bodies[first], bodies[second], iteration === 0);
              }
            }
            bodies.forEach(body => {
              if (!body.active) return;
              resolveMobileTiltCollider(body);
              containMobileBody(body);
            });
          }
          const imageBodies = bodies.filter(body => body.isProjectImage);
          imageBodies.forEach(body => {
            if (!body.active || !body.enteredViewport) return;
            const extent = mobileExtents(body);
            if (body.y + extent.y < 0) {
              body.waitingForFreshImage = true;
            } else if (body.waitingForFreshImage) {
              refreshMobileDropImage(body.element, projectImages);
              body.waitingForFreshImage = false;
            }
          });
          if (!groundOpen && !secondPassReady && bodies.some(body =>
            body.active && body.enteredViewport
          )) secondPassReady = true;
          const allBodiesAboveViewport = bodies.length && bodies.every(body => {
            const extent = mobileExtents(body);
            return body.y + extent.y < 0;
          });
          if (!groundOpen && secondPassReady && allBodiesAboveViewport) showOffscreenReaction();
          if (offscreenRotationActive && !offscreenReactionVisible && !offscreenReactionPending && bodies.every(body => {
            if (!body.active) return false;
            const extent = mobileExtents(body);
            return body.y + extent.y >= 0;
          })) offscreenRotationActive = false;
          bodies.forEach(body => {
            if (!body.active) return;
            body.element.style.transform =
              `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}deg)`;
          });
          requestAnimationFrame(simulateMobile);
        }

        bodies.forEach(body => {
          body.element.addEventListener('pointerdown', event => {
            if (event.button !== 0 || !body.active) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = true;
            body.dragMoved = false;
            body.pointerId = event.pointerId;
            body.dragOffsetX = event.clientX - body.x;
            body.dragOffsetY = event.clientY - body.y;
            body.dragStartX = event.clientX;
            body.dragStartY = event.clientY;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = performance.now();
            body.vx = 0;
            body.vy = 0;
            body.angularVelocity = 0;
            body.element.setPointerCapture(event.pointerId);
          });
          body.element.addEventListener('pointermove', event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            const now = performance.now();
            const elapsed = Math.max((now - body.lastPointerTime) / 1000, .008);
            body.x = event.clientX - body.dragOffsetX;
            body.y = event.clientY - body.dragOffsetY;
            body.vx = Math.max(-1800, Math.min(1800, (event.clientX - body.lastPointerX) / elapsed));
            body.vy = Math.max(-1800, Math.min(1800, (event.clientY - body.lastPointerY) / elapsed));
            body.dragMoved ||= Math.hypot(event.clientX - body.dragStartX, event.clientY - body.dragStartY) > 6;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = now;
            containMobileBody(body);
          });
          const releaseMobilePill = event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = false;
            if (body.element.hasPointerCapture(event.pointerId)) body.element.releasePointerCapture(event.pointerId);
            if (!body.dragMoved && event.type === 'pointerup') {
              const href = body.isProjectImage
                ? body.element.dataset.href
                : body.element.getAttribute('href');
              navigateFromHome(href, body.element);
            } else if (body.dragMoved) {
              body.angularVelocity += Math.max(-55, Math.min(55, body.vx / Math.max(body.width, body.height) * 6));
            }
            body.dragMoved = false;
          };
          body.element.addEventListener('pointerup', releaseMobilePill);
          body.element.addEventListener('pointercancel', releaseMobilePill);
          body.element.addEventListener('click', event => event.preventDefault());
        });

        let stoppedPassStarted = !runFallThroughIntro;
        const startStoppedPass = (restartDelay = 420) => {
          if (stoppedPassStarted) return;
          stoppedPassStarted = true;
          groundOpen = false;
          secondPassReady = false;
          offscreenRotationActive = false;
          hideOffscreenReaction();
          refreshMobileDropImages(projectImages);
          const restart = performance.now() + restartDelay;
          bodies.forEach((body, index) => {
            body.element.style.visibility = 'hidden';
            body.active = false;
            body.dragging = false;
            body.x = body.width / 2 + Math.random() * Math.max(0, mobileWidth() - body.width);
            body.y = -body.height / 2 - 12 - Math.random() * 50;
            body.vx = -90 + Math.random() * 180;
            body.vy = 0;
            body.angle = -28 + Math.random() * 56;
            body.angularVelocity = -32 + Math.random() * 64;
            body.enteredViewport = false;
            body.waitingForFreshImage = false;
            body.releaseAt = restart + index * phase2Stagger + Math.random() * 130;
          });
        };

        if (runFallThroughIntro) {
          const fallClearMs = Math.sqrt(2 * (mobileHeight() + 200) / 1200) * 1000;
          const phase1TotalMs = (bodies.length - 1) * phase1Stagger + 80 + fallClearMs + 260;
          setTimeout(() => startStoppedPass(420), phase1TotalMs);
          addEventListener('pageshow', event => {
            if (event.persisted) startStoppedPass(80);
          });
        }

        requestAnimationFrame(simulateMobile);

        triggerMobileGroundOpen = () => new Promise(resolve => {
          groundOpen = true;
          bodies.forEach(body => {
            body.dragging = false;
            body.vy = Math.max(body.vy, 420) + Math.random() * 260;
            body.vx *= .4;
            body.angularVelocity += -40 + Math.random() * 80;
          });
          setTimeout(resolve, 700);
        });
      }

      function refreshMobileDropImages(frames) {
        const currentSources = new Set(frames.map(frame => frame.querySelector('img')?.getAttribute('src')).filter(Boolean));
        const uniqueSources = new Set();
        const candidates = shuffleCatalog(allProjects.flatMap(project =>
          project.images.map(src => ({ project, src }))
        )).filter(item => {
          if (currentSources.has(item.src) || uniqueSources.has(item.src)) return false;
          uniqueSources.add(item.src);
          return true;
        });
        frames.forEach((frame, index) => {
          const replacement = candidates[index];
          const image = frame.querySelector('img');
          if (!replacement || !image) return;
          frame.dataset.href = `${replacement.project.category.toLowerCase()}.html?project=${encodeURIComponent(replacement.project.slug)}`;
          image.src = replacement.src;
          image.alt = replacement.project.title;
        });
      }

      function refreshMobileDropImage(frame, allFrames) {
        const currentSources = new Set(allFrames.map(item => item.querySelector('img')?.getAttribute('src')).filter(Boolean));
        const replacement = shuffleCatalog(allProjects.flatMap(project =>
          project.images.map(src => ({ project, src }))
        )).find(item => !currentSources.has(item.src));
        const image = frame.querySelector('img');
        if (!replacement || !image) return;
        frame.dataset.href = `${replacement.project.category.toLowerCase()}.html?project=${encodeURIComponent(replacement.project.slug)}`;
        image.src = replacement.src;
        image.alt = replacement.project.title;
      }

      function spawnMobileDropImages(count) {
        const uniqueSources = new Set();
        const picked = shuffleCatalog(allProjects.flatMap(project =>
          project.images.map(src => ({ project, src }))
        )).filter(item => {
          if (uniqueSources.has(item.src)) return false;
          uniqueSources.add(item.src);
          return true;
        }).slice(0, count);
        const interfaceEl = document.querySelector('.interface');
        const imageReady = picked.map(({ project, src }) => new Promise(resolve => {
          const frame = document.createElement('span');
          frame.className = 'mobile-drop-image';
          frame.dataset.href = `${project.category.toLowerCase()}.html?project=${encodeURIComponent(project.slug)}`;
          const image = document.createElement('img');
          image.src = src;
          image.alt = project.title;
          image.draggable = false;
          const imageLoaded = () => resolve();
          image.addEventListener('load', imageLoaded, { once: true });
          image.addEventListener('error', resolve, { once: true });
          frame.appendChild(image);
          frame.insertAdjacentHTML('beforeend',
            '<svg class="pill-ants" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
            '<rect class="ants-black" x=".5" y=".5" width="99" height="99"></rect>' +
            '<rect class="ants-white" x=".5" y=".5" width="99" height="99"></rect>' +
            '</svg>');
          interfaceEl.appendChild(frame);
          if (image.complete && image.naturalWidth) imageLoaded();
        }));
        return Promise.all(imageReady);
      }

      if (document.documentElement.classList.contains('mobile-index')) {
        const startMobileNavigation = async () => {
          await spawnMobileDropImages(3);
          requestAnimationFrame(dropMobileNavigationPills);
        };
        if (document.fonts?.ready) document.fonts.ready.then(startMobileNavigation);
        else startMobileNavigation();
      } else if (!matchMedia(mobileLayoutQuery).matches) {
        window.setTimeout(dropNavigationPills, 4000);
      }

      images.forEach(src => { const image = new Image(); image.src = src; });

      function randomGlyph() {
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }

      function shuffle(items) {
        for (let index = items.length - 1; index > 0; index--) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
        }
        return items;
      }

      function configureMask() {
        const rect = viewerImage.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        maskWidth = rect.width;
        maskHeight = rect.height;
        asciiFontSize = Math.max(12, Math.min(16, Math.round(rect.width / 70)));
        asciiCols = Math.ceil(maskWidth / asciiFontSize);
        asciiRows = Math.ceil(maskHeight / asciiFontSize);

        asciiMask.style.left = rect.left + 'px';
        asciiMask.style.top = rect.top + 'px';
        asciiMask.style.width = rect.width + 'px';
        asciiMask.style.height = rect.height + 'px';
        asciiMask.width = Math.max(1, Math.round(rect.width * ratio));
        asciiMask.height = Math.max(1, Math.round(rect.height * ratio));
        maskContext.setTransform(ratio, 0, 0, ratio, 0, 0);
        maskContext.textAlign = 'center';
        maskContext.textBaseline = 'middle';
        maskContext.font = `${asciiFontSize}px EurostileMNExtendedBold, Arial, "Arial Unicode MS", sans-serif`;

        const total = asciiCols * asciiRows;
        asciiGrid = Array.from({ length: total }, () => Math.floor(Math.random() * glyphs.length));
        nextAsciiGrid = new Array(total);
        const shiftSeedA = Math.floor(Math.random() * 97);
        const shiftSeedB = Math.floor(Math.random() * 97);
        const shiftSeedC = Math.random() < .5 ? 1 : -1;
        shiftDirections = Array.from({ length: total }, (_, index) => {
          const x = index % asciiCols;
          const y = Math.floor(index / asciiCols);
          const regionX = Math.floor(x / 10);
          const regionY = Math.floor(y / 8);
          return 1 + Math.abs(((regionX * 3 + regionY * 5) * shiftSeedC + shiftSeedA * regionX + shiftSeedB * regionY) % 8);
        });

        const sampler = document.createElement('canvas');
        sampler.width = Math.max(1, Math.round(maskWidth));
        sampler.height = Math.max(1, Math.round(maskHeight));
        const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
        try {
          samplerContext.drawImage(viewerImage, 0, 0, sampler.width, sampler.height);
          samplePixels = samplerContext.getImageData(0, 0, sampler.width, sampler.height).data;
        } catch (error) {
          samplePixels = null;
        }
      }

      function randomizeAsciiPattern() {
        asciiPattern = {
          seed: Math.random() * 10000,
          angle: Math.random() * Math.PI * 2,
          scale: .075 + Math.random() * .105,
          secondaryScale: .18 + Math.random() * .18,
          driftX: (Math.random() * .008 - .004) || .002,
          driftY: (Math.random() * .008 - .004) || -.002,
          ripple: Math.random() * .13,
          phase: Math.random() * Math.PI * 2
        };
        shuffle(shiftDirections);
      }

      function hashNoise(x, y) {
        const value = Math.sin(x * 127.1 + y * 311.7 + 74.7 + asciiPattern.seed) * 43758.5453;
        return value - Math.floor(value);
      }

      function smoothNoise(x, y) {
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const tx = x - x0;
        const ty = y - y0;
        const sx = tx * tx * (3 - 2 * tx);
        const sy = ty * ty * (3 - 2 * ty);
        const a = hashNoise(x0, y0);
        const b = hashNoise(x0 + 1, y0);
        const c = hashNoise(x0, y0 + 1);
        const d = hashNoise(x0 + 1, y0 + 1);
        return (a + (b - a) * sx) + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sy;
      }

      function updateAsciiGrid(frameNumber) {
        for (let y = 0; y < asciiRows; y++) {
          for (let x = 0; x < asciiCols; x++) {
            const index = y * asciiCols + x;
            const direction = shiftDirections[index];
            let sourceX = x;
            let sourceY = y;
            if (direction === 1) sourceX--;
            if (direction === 2) sourceX++;
            if (direction === 3) sourceY++;
            if (direction === 4) sourceY--;
            if (direction === 5) { sourceX--; sourceY++; }
            if (direction === 6) { sourceX--; sourceY--; }
            if (direction === 7) { sourceX++; sourceY++; }
            if (direction === 8) { sourceX++; sourceY--; }
            sourceX = Math.max(0, Math.min(asciiCols - 1, sourceX));
            sourceY = Math.max(0, Math.min(asciiRows - 1, sourceY));
            nextAsciiGrid[index] = asciiGrid[sourceY * asciiCols + sourceX];
          }
        }
        [asciiGrid, nextAsciiGrid] = [nextAsciiGrid, asciiGrid];

        for (let count = 0; count < 40; count++) {
          const index = Math.floor(Math.random() * asciiGrid.length);
          asciiGrid[index] = Math.floor(Math.random() * glyphs.length);
        }
        for (let x = 0; x < asciiCols; x++) {
          asciiGrid[x] = Math.floor(Math.random() * glyphs.length);
          asciiGrid[(asciiRows - 1) * asciiCols + x] = Math.floor(Math.random() * glyphs.length);
        }
        if (frameNumber % 45 === 0) shuffle(shiftDirections);
      }

      function sampledColor(x, y) {
        if (!samplePixels) return '#fff';
        const sx = Math.max(0, Math.min(Math.round(maskWidth) - 1, Math.round(x)));
        const sy = Math.max(0, Math.min(Math.round(maskHeight) - 1, Math.round(y)));
        const index = (sy * Math.round(maskWidth) + sx) * 4;
        return `rgb(${samplePixels[index]},${samplePixels[index + 1]},${samplePixels[index + 2]})`;
      }

      function renderProcessingMask(progress, frameNumber) {
        maskContext.globalCompositeOperation = 'source-over';
        maskContext.clearRect(0, 0, maskWidth, maskHeight);
        maskContext.fillStyle = '#000';
        maskContext.fillRect(0, 0, maskWidth, maskHeight);
        if (frameNumber % 2 === 0) updateAsciiGrid(Math.floor(frameNumber / 2));

        for (let y = 0; y < asciiRows; y++) {
          for (let x = 0; x < asciiCols; x++) {
            const px = x * asciiFontSize;
            const py = y * asciiFontSize;
            const cosine = Math.cos(asciiPattern.angle);
            const sine = Math.sin(asciiPattern.angle);
            const rotatedX = x * cosine - y * sine;
            const rotatedY = x * sine + y * cosine;
            const primary = smoothNoise(
              rotatedX * asciiPattern.scale + frameNumber * asciiPattern.driftX,
              rotatedY * asciiPattern.scale + frameNumber * asciiPattern.driftY
            );
            const secondary = smoothNoise(
              rotatedX * asciiPattern.secondaryScale - frameNumber * asciiPattern.driftY * .65 + 31.7,
              rotatedY * asciiPattern.secondaryScale + frameNumber * asciiPattern.driftX * .65 - 18.9
            );
            const ripple = Math.sin(
              rotatedX * .19 + rotatedY * .11 + asciiPattern.phase + frameNumber * .012
            ) * asciiPattern.ripple;
            const organic = Math.max(0, Math.min(1, primary * .72 + secondary * .28 + ripple));
            const edgeSoftness = .18;
            const threshold = progress * (1 + edgeSoftness) - edgeSoftness / 2;

            if (organic < threshold) {
              maskContext.clearRect(px, py, asciiFontSize + 1, asciiFontSize + 1);
            } else {
              maskContext.fillStyle = sampledColor(px + asciiFontSize / 2, py + asciiFontSize / 2);
              maskContext.fillText(
                glyphs[asciiGrid[y * asciiCols + x]],
                px + asciiFontSize / 2,
                py + asciiFontSize / 2
              );
            }
          }
        }
      }

      function animateMask(direction, duration = transitionDuration, synchronizedStart = null) {
        return new Promise(resolve => {
          randomizeAsciiPattern();
          const started = synchronizedStart ?? performance.now();
          asciiMask.style.opacity = '1';
          let frameNumber = 0;

          function frame(now) {
            const rawProgress = Math.min(1, (now - started) / duration);
            const eased = rawProgress < .5
              ? 2 * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
            const maskProgress = direction === 'reveal' ? eased : 1 - eased;
            renderProcessingMask(maskProgress, frameNumber++);

            if (rawProgress < 1) requestAnimationFrame(frame);
            else {
              if (direction === 'reveal') {
                maskContext.clearRect(0, 0, maskWidth, maskHeight);
                asciiMask.style.opacity = '0';
              } else {
                renderProcessingMask(0, frameNumber);
              }
              resolve();
            }
          }
          requestAnimationFrame(frame);
        });
      }

      function updateViewerTabs(section) {
        activeViewerSection = section;
        viewerTabs.querySelectorAll('.viewer-tab').forEach(tab => {
          const active = tab.dataset.section === section;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', String(active));
        });
      }

      function setActiveProject(nextProject) {
        if (!nextProject) return false;
        activeProject = nextProject;
        images = activeProject.images;
        viewerImageIndex = 0;
        indexEntryInfoIndex = null;
        indexEntryInfoConsumed = true;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image 1 of ${images.length}`;
        viewerNextImage.alt = `${seoTitleCase(activeProject.title)}, next project image`;
        applyProjectSeo(activeProject);
        syncViewerInfoContent(activeProject);
        updateViewerTabs(activeProject.category);
        updateViewerBreadcrumb();
        return true;
      }

      function syncViewerInfoContent(currentProject) {
        if (!currentProject) return;
        const lines = projectInfo[currentProject.slug] || [
          `Project: ${currentProject.title}`,
          'Amogh R Raikar'
        ];
        const guides = document.createElement('div');
        guides.className = 'viewer-info-back-guides';
        guides.setAttribute('aria-hidden', 'true');
        guides.innerHTML = `
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line class="guide-dark" x1="99.5" y1=".5" x2=".5" y2="99.5"></line>
            <line class="guide-light" x1="99.5" y1=".5" x2=".5" y2="99.5"></line>
            <line class="guide-dark" x1=".5" y1=".5" x2="99.5" y2="99.5"></line>
            <line class="guide-light" x1=".5" y1=".5" x2="99.5" y2="99.5"></line>
          </svg>
          <i class="guide-corner top-left"></i>
          <i class="guide-corner top-right"></i>
          <i class="guide-corner bottom-left"></i>
          <i class="guide-corner bottom-right"></i>
        `;
        viewerInfoBack.replaceChildren(guides, ...lines.map(value => {
          const line = document.createElement('p');
          line.dataset.infoLine = value;
          return line;
        }));
      }

      syncViewerInfoContent(activeProject);

      function updateViewerBreadcrumb() {
        if (!activeProject) return;
        viewerBreadcrumbPath.innerHTML = `${activeProject.category}&nbsp;&nbsp;/&nbsp;&nbsp;${activeProject.title}&nbsp;&nbsp;/&nbsp;&nbsp;`;
        viewerBreadcrumbImage.textContent = activeProject.videoIndex === viewerImageIndex
          ? `VIDEO ${viewerImageIndex + 1}  •  ${images.length}`
          : `IMG ${viewerImageIndex + 1}  •  ${images.length}`;
      }

      function showMenuPreview(entry) {
        const source = entry?.dataset.preview;
        if (!source) return;
        const width = Math.min(560, innerWidth * .48);
        const height = Math.min(400, innerHeight * .44);
        viewerMenuPreview.src = source;
        viewerMenuPreview.style.left = `${32 + Math.random() * Math.max(0, innerWidth - width - 64)}px`;
        viewerMenuPreview.style.top = `${88 + Math.random() * Math.max(0, innerHeight - height - 144)}px`;
        viewerMenuPreview.classList.add('visible');
      }

      function setMenuEntryActive(entry) {
        const changed = entry !== hoveredMenuEntry;
        if (changed) {
          clearTimeout(cursorCountTimer);
          const previousLabel = hoveredMenuEntry?.querySelector('.viewer-menu-entry-label');
          if (previousLabel) previousLabel.style.transform = '';
          viewerMenuPreview.style.transform = '';
          hoveredMenuEntry?.classList.remove('cursor-hover');
          viewerMenuPreview.classList.remove('visible');
          cursorActionCount.classList.remove('visible');
          hoveredMenuEntry = entry;
        }
        if (!entry) {
          viewerMenuHighlight.classList.remove('visible');
          return;
        }
        const rect = entry.getBoundingClientRect();
        viewerMenuHighlight.style.top = `${rect.top}px`;
        viewerMenuHighlight.style.height = `${rect.height}px`;
        viewerMenuHighlight.classList.add('visible');
        updateMenuEntryWarp(entry, pointerClientX, pointerClientY);
        if (!changed) return;
        entry.classList.add('cursor-hover');
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().catch(() => {});
        showMenuPreview(entry);
        cursorActionCount.textContent = entry.dataset.mediaLabel;
        cursorCountTimer = window.setTimeout(() => cursorActionCount.classList.add('visible'), 160);
      }

      function updateMenuEntryWarp(entry, x, y) {
        const label = entry?.querySelector('.viewer-menu-entry-label');
        if (!label) return;
        const rect = entry.getBoundingClientRect();
        const px = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
        const py = Math.max(0, Math.min(1, (y - rect.top) / rect.height));
        const rotateY = (px - .5) * 26;
        const rotateX = (.5 - py) * 13;
        const translateX = (px - .5) * 8;
        const translateY = (py - .5) * 5;
        const depth = -42 - Math.abs(px - .5) * 14;
        const warp = `perspective(540px) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${depth.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        label.style.transform = warp;
        viewerMenuPreview.style.transform = warp;
      }

      function syncMenuHoverUnderCursor() {
        menuScrollHoverFrame = 0;
        if (!viewer.classList.contains('menu-open')) return;
        const entry = document.elementFromPoint(pointerClientX, pointerClientY)?.closest('.viewer-menu-entry');
        setMenuEntryActive(entry && viewerMenu.contains(entry) ? entry : null);
      }

      function syncMenuScrollCue() {
        const hasOverflow = viewerMenu.scrollHeight > viewerMenu.clientHeight + 2;
        viewerMenuScrollCue.classList.toggle('hidden', !hasOverflow || viewerMenu.scrollTop > 1 || menuCategoryTransitioning);
        const atBottom = hasOverflow
          && viewerMenu.scrollTop + viewerMenu.clientHeight >= viewerMenu.scrollHeight - 2;
        viewerMenu.classList.toggle('at-bottom', atBottom);
      }

      function setDisplayedArrowSide(side) {
        displayedArrowSide = side;
        cursorNavArrow.setAttribute('transform', side === 'left' ? 'rotate(180 40 40)' : '');
      }

      async function swapImageNavigationArrow(side) {
        if (!side) return;
        if (!displayedArrowSide) {
          requestedArrowSide = side;
          setDisplayedArrowSide(side);
          return;
        }
        if (side === requestedArrowSide) return;
        requestedArrowSide = side;
        const token = ++arrowSwapToken;
        cursorNavArrowGroup.getAnimations().forEach(animation => animation.cancel());

        if (side === displayedArrowSide) {
          cursorNavArrowGroup.style.transform = 'translateY(0)';
          cursorNavArrowGroup.style.opacity = '1';
          return;
        }

        const travel = displayedArrowSide === 'left' && side === 'right' ? 64 : -64;
        const outgoing = cursorNavArrowGroup.animate([
          { transform: 'translateY(0)', opacity: 1 },
          { transform: `translateY(${travel}px)`, opacity: 1 }
        ], {
          duration: 145,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        });
        await outgoing.finished.catch(() => {});
        if (token !== arrowSwapToken) return;
        outgoing.cancel();

        setDisplayedArrowSide(side);
        const incoming = cursorNavArrowGroup.animate([
          { transform: `translateY(${-travel}px)`, opacity: 1 },
          { transform: 'translateY(0)', opacity: 1 }
        ], {
          duration: 190,
          easing: 'cubic-bezier(0, .55, .45, 1)',
          fill: 'forwards'
        });
        await incoming.finished.catch(() => {});
        if (token !== arrowSwapToken) return;
        cursorNavArrowGroup.style.transform = 'translateY(0)';
        cursorNavArrowGroup.style.opacity = '1';
        incoming.cancel();
      }

      function clearImageNavigationCursor() {
        arrowSwapToken++;
        cursorNavArrowGroup.getAnimations().forEach(animation => animation.cancel());
        cursorNavArrowGroup.style.transform = '';
        cursorNavArrowGroup.style.opacity = '';
        displayedArrowSide = null;
        requestedArrowSide = null;
        document.body.classList.remove(
          'image-nav-left',
          'image-nav-right',
          'viewer-top-zone-hover',
          'viewer-close-hover'
        );
      }

      function clearViewerFluidPull() {
        if (fluidPullFrame) cancelAnimationFrame(fluidPullFrame);
        fluidPullFrame = 0;
        fluidPullCanvas?.remove();
        fluidPullCanvas = null;
        fluidPullTargetImage?.style.setProperty('opacity', '');
        fluidPullTargetImage = null;
        wasInsideViewerImage = false;
        lastViewerImagePoint = null;
        lastViewerOutsidePoint = null;
      }

      function positionViewerInfoElements() {
        const rect = viewerImage.getBoundingClientRect();
        viewerInfoPrompt.style.left = `${rect.left - 16}px`;
        viewerInfoPrompt.style.top = `${rect.top + rect.height / 2}px`;
        const promptRect = viewerInfoPrompt.getBoundingClientRect();
        const promptAnts = viewerInfoPrompt.querySelector('.viewer-info-prompt-ants');
        promptAnts.setAttribute('viewBox', `0 0 ${promptRect.width} ${promptRect.height}`);
        promptAnts.querySelectorAll('rect').forEach(outline => {
          outline.setAttribute('x', '.5');
          outline.setAttribute('y', '.5');
          outline.setAttribute('width', String(Math.max(1, promptRect.width - 1)));
          outline.setAttribute('height', String(Math.max(1, promptRect.height - 1)));
          const pillRadius = Math.max(1, (Math.min(promptRect.width, promptRect.height) - 1) / 2);
          outline.setAttribute('rx', String(pillRadius));
          outline.setAttribute('ry', String(pillRadius));
        });
        viewerInfoBack.style.left = `${rect.left}px`;
        viewerInfoBack.style.top = `${rect.top}px`;
        viewerInfoBack.style.width = `${rect.width}px`;
        viewerInfoBack.style.height = `${rect.height}px`;
        return rect;
      }

      function viewerInfoTransform(axis, degrees, twisted = false, twistDirection = 1) {
        const twist = twisted
          ? axis === 'Y'
            ? ` rotateX(${12 * twistDirection}deg) rotateZ(${5.5 * twistDirection}deg) skewY(${6.2 * twistDirection}deg) scale(.93, 1.07)`
            : ` rotateY(${12 * twistDirection}deg) rotateZ(${-5.2 * twistDirection}deg) skewX(${6.8 * twistDirection}deg) scale(1.07, .93)`
          : '';
        return `perspective(850px) rotate${axis}(${degrees}deg)${twist}`;
      }

      function viewerInfoFlipFrames(axis, from, to) {
        const direction = Math.sign(to - from) || 1;
        return [
          { transform: viewerInfoTransform(axis, from), offset: 0 },
          { transform: viewerInfoTransform(axis, from + (to - from) * .32, true, direction), offset: .32 },
          { transform: viewerInfoTransform(axis, from + (to - from) * .68, true, -direction), offset: .68 },
          { transform: viewerInfoTransform(axis, to), offset: 1 }
        ];
      }

      function clearViewerInfoHint() {
        clearTimeout(viewerInfoHintTimer);
        clearTimeout(viewerInfoHintHideTimer);
        viewerInfoHintTimer = 0;
        viewerInfoHintHideTimer = 0;
        viewer.classList.remove('info-hint');
      }

      function scheduleViewerInfoHint() {
        clearViewerInfoHint();
        if (!viewer.classList.contains('open') || viewer.classList.contains('menu-open') || viewerInfoOpen) return;
        if (!viewerInfoIsEligible()) return;
        viewerInfoPromptLabel.textContent = 'PRESS I FOR INFO';
        positionViewerInfoElements();
        viewer.classList.add('info-hint');
      }

      function revealViewerInfoPrompt(label, previousRect = null) {
        if (!viewerInfoIsEligible()) {
          clearViewerInfoHint();
          return;
        }
        viewerInfoPrompt.getAnimations().forEach(animation => animation.cancel());
        viewerInfoPromptLabel.textContent = label;
        positionViewerInfoElements();
        const targetRect = viewerInfoPrompt.getBoundingClientRect();
        viewer.classList.add('info-hint');
        if (!previousRect?.width || !previousRect?.height) return;
        const scaleX = previousRect.width / targetRect.width;
        const scaleY = previousRect.height / targetRect.height;
        viewerInfoPrompt.animate([
          { transform: `scale(${scaleX}, ${scaleY})`, opacity: .55 },
          { transform: 'scale(1, 1)', opacity: 1 }
        ], {
          duration: 440,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'none'
        });
      }

      function clearViewerInfoTyping() {
        viewerInfoTypeToken++;
        viewerInfoBack.querySelectorAll('[data-info-line]').forEach(line => line.replaceChildren());
      }

      function shiftViewerInfoCharacter(character) {
        if (!/[A-Za-z]/.test(character)) return character;
        const lower = character >= 'a' && character <= 'z';
        const alphabetStart = lower ? 97 : 65;
        const offset = character.charCodeAt(0) - alphabetStart;
        const direction = Math.random() < .5 ? -1 : 1;
        return String.fromCharCode(alphabetStart + (offset + direction + 26) % 26);
      }

      function randomViewerInfoCharacter(character) {
        if (!/[A-Za-z]/.test(character)) return character;
        const blocks = '█▓▒░■□▪▫▌▐▀▄';
        if (Math.random() < .58) return blocks[Math.floor(Math.random() * blocks.length)];
        const alphabet = character >= 'a' && character <= 'z'
          ? 'abcdefghijklmnopqrstuvwxyz'
          : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
      }

      function encryptViewerInfoText(value) {
        return [...value].map(shiftViewerInfoCharacter).join('');
      }

      function scrambleViewerInfoText(realValue, progress) {
        return [...realValue].map((character, index) => {
          if (!/[A-Za-z]/.test(character)) return character;
          const settlePoint = index / Math.max(1, realValue.length - 1);
          return progress >= settlePoint ? character : randomViewerInfoCharacter(character);
        }).join('');
      }

      function renderViewerInfoLine(line, value, cursor = null) {
        line.replaceChildren(document.createTextNode(value));
        if (cursor) line.appendChild(cursor);
      }

      function decorateViewerInfoLinks() {
        if (activeProject?.slug !== 'poster-series') return;
        const line = [...viewerInfoBack.querySelectorAll('[data-info-line]')].at(-1);
        if (!line) return;
        const value = line.dataset.infoLine || '';
        const linkText = 'get in touch';
        const linkStart = value.toLowerCase().lastIndexOf(linkText);
        if (linkStart < 0) return;
        const link = document.createElement('a');
        link.className = 'viewer-info-link';
        link.href = 'contact.html';
        link.textContent = value.slice(linkStart, linkStart + linkText.length);
        line.replaceChildren(
          document.createTextNode(value.slice(0, linkStart)),
          link,
          document.createTextNode(value.slice(linkStart + linkText.length))
        );
      }

      function decodeViewerInfoLines(lines, token) {
        return new Promise(resolve => {
          const started = performance.now();
          const settleDuration = 50;
          let frameNumber = 0;

          function frame(now) {
            if (token !== viewerInfoTypeToken) {
              resolve();
              return;
            }
            const elapsed = now - started;
            const progress = Math.min(1, elapsed / settleDuration);
            if (frameNumber % 2 === 0 || progress === 1) {
              lines.forEach(line => {
                const realValue = line.dataset.infoLine || '';
                renderViewerInfoLine(line, progress === 1
                  ? realValue
                  : scrambleViewerInfoText(realValue, progress));
              });
            }
            frameNumber++;
            if (progress === 1) resolve();
            else requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      }

      async function typeViewerInfoLines() {
        const token = ++viewerInfoTypeToken;
        const lines = [...viewerInfoBack.querySelectorAll('[data-info-line]')];
        const totalCharacters = lines.reduce((total, line) => total + (line.dataset.infoLine || '').length, 0);
        const characterDelay = Math.max(.167, Math.min(1.167, 150 / Math.max(1, totalCharacters)));
        lines.forEach(line => line.replaceChildren());
        const cursor = document.createElement('span');
        cursor.className = 'viewer-info-terminal-cursor';
        cursor.setAttribute('aria-hidden', 'true');

        for (const line of lines) {
          if (token !== viewerInfoTypeToken) return;
          const realValue = line.dataset.infoLine || '';
          const encryptedValue = encryptViewerInfoText(realValue);
          let typedValue = '';
          renderViewerInfoLine(line, typedValue, cursor);
          for (let characterIndex = 0; characterIndex < encryptedValue.length; characterIndex += 3) {
            if (token !== viewerInfoTypeToken) return;
            typedValue += encryptedValue.slice(characterIndex, characterIndex + 3);
            renderViewerInfoLine(line, typedValue, cursor);
            await new Promise(resolve => setTimeout(resolve, characterDelay));
          }
          await new Promise(resolve => setTimeout(resolve, 2.667));
        }
        if (token !== viewerInfoTypeToken) return;
        // Let the fully encrypted credits remain readable before decoding.
        await new Promise(resolve => setTimeout(resolve, 15));
        cursor.remove();
        await decodeViewerInfoLines(lines, token);
        if (token === viewerInfoTypeToken) decorateViewerInfoLinks();
      }

      async function openViewerInfoCard() {
        if (viewerInfoOpen || viewerInfoFlipping || viewerTransitioning || viewer.classList.contains('menu-open')) return;
        if (!viewerInfoIsEligible()) return;
        viewerInfoFlipping = true;
        const previousPromptRect = viewerInfoPrompt.getBoundingClientRect();
        clearViewerInfoHint();
        clearViewerFluidPull();
        clearImageNavigationCursor();
        const infoRect = positionViewerInfoElements();
        viewerInfoFlipAxis = infoRect.width >= infoRect.height ? 'X' : 'Y';
        viewerInfoBack.style.transform = viewerInfoTransform(viewerInfoFlipAxis, 180);
        viewerInfoBack.classList.add('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'false');
        clearViewerInfoTyping();
        document.body.classList.add('viewer-info-open');
        viewer.classList.add('info-card-open');
        window.setTimeout(() => {
          if (viewerInfoFlipping || viewerInfoOpen) typeViewerInfoLines();
        }, 90);
        const timing = {
          duration: 720,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        };
        const frontFlip = viewerImage.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 0, -180), timing);
        const backFlip = viewerInfoBack.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 180, 0), timing);
        await Promise.all([frontFlip.finished.catch(() => {}), backFlip.finished.catch(() => {})]);
        frontFlip.cancel();
        backFlip.cancel();
        viewerImage.style.transform = viewerInfoTransform(viewerInfoFlipAxis, -180);
        viewerImage.style.visibility = 'hidden';
        viewerInfoBack.style.transform = viewerInfoTransform(viewerInfoFlipAxis, 0);
        viewerInfoOpen = true;
        viewerInfoFlipping = false;
        revealViewerInfoPrompt('PRESS X TO CLOSE', previousPromptRect);
      }

      async function closeViewerInfoCard() {
        if (!viewerInfoOpen || viewerInfoFlipping) return;
        viewerInfoFlipping = true;
        const previousPromptRect = viewerInfoPrompt.getBoundingClientRect();
        clearViewerInfoHint();
        clearViewerInfoTyping();
        viewer.classList.remove('info-card-open');
        viewerImage.style.visibility = 'visible';
        const timing = {
          duration: 720,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        };
        const frontFlip = viewerImage.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, -180, 0), timing);
        const backFlip = viewerInfoBack.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 0, 180), timing);
        await Promise.all([frontFlip.finished.catch(() => {}), backFlip.finished.catch(() => {})]);
        frontFlip.cancel();
        backFlip.cancel();
        viewerImage.style.transform = '';
        viewerInfoBack.style.transform = '';
        viewerInfoBack.classList.remove('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('viewer-info-open');
        viewerInfoOpen = false;
        viewerInfoFlipping = false;
        revealViewerInfoPrompt('PRESS I FOR INFO', previousPromptRect);
        syncOverlayPointerState(pointerClientX, pointerClientY);
      }

      function resetViewerInfoCard() {
        clearViewerInfoHint();
        clearViewerInfoTyping();
        viewer.classList.remove('info-card-open');
        viewerInfoOpen = false;
        viewerInfoFlipping = false;
        viewerImage.style.transform = '';
        viewerImage.style.visibility = '';
        viewerInfoBack.style.transform = '';
        viewerInfoBack.classList.remove('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('viewer-info-open');
        viewerInfoPromptLabel.textContent = 'PRESS I FOR INFO';
      }

      function pullViewerImageEdge(rect, point, direction = 'outward', targetImage = viewerImage) {
        const distances = {
          left: Math.abs(point.x - rect.left),
          right: Math.abs(rect.right - point.x),
          top: Math.abs(point.y - rect.top),
          bottom: Math.abs(rect.bottom - point.y)
        };
        const edge = Object.keys(distances).reduce((closest, candidate) =>
          distances[candidate] < distances[closest] ? candidate : closest
        );
        if (distances[edge] > 24) return;
        clearViewerFluidPull();

        const padding = 340;
        const width = rect.width;
        const height = rect.height;
        const canvas = document.createElement('canvas');
        const ratio = Math.min(2, devicePixelRatio || 1);
        const canvasWidth = width + padding * 2;
        const canvasHeight = height + padding * 2;
        canvas.className = 'viewer-fluid-canvas';
        if (targetImage === viewerStaticImage) canvas.classList.add('viewer-static-fluid-canvas');
        canvas.width = Math.ceil(canvasWidth * ratio);
        canvas.height = Math.ceil(canvasHeight * ratio);
        canvas.style.left = `${rect.left - padding}px`;
        canvas.style.top = `${rect.top - padding}px`;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        viewer.appendChild(canvas);
        fluidPullCanvas = canvas;
        fluidPullTargetImage = targetImage;

        const context = canvas.getContext('2d');
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        const naturalWidth = targetImage.naturalWidth || width;
        const naturalHeight = targetImage.naturalHeight || height;
        const originX = padding;
        const originY = padding;
        const sampleWidth = Math.max(1, Math.round(width));
        const sampleHeight = Math.max(1, Math.round(height));
        let pullSamplePixels = null;
        try {
          const sampler = document.createElement('canvas');
          sampler.width = sampleWidth;
          sampler.height = sampleHeight;
          const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
          samplerContext.drawImage(targetImage, 0, 0, sampleWidth, sampleHeight);
          pullSamplePixels = samplerContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
        } catch (error) {
          pullSamplePixels = null;
        }
        function samplePullColor(px, py) {
          if (!pullSamplePixels) return [255, 255, 255];
          const sx = Math.max(0, Math.min(sampleWidth - 1, Math.round(px - originX)));
          const sy = Math.max(0, Math.min(sampleHeight - 1, Math.round(py - originY)));
          const sampleIndex = (sy * sampleWidth + sx) * 4;
          return [pullSamplePixels[sampleIndex], pullSamplePixels[sampleIndex + 1], pullSamplePixels[sampleIndex + 2]];
        }
        const localPointX = point.x - rect.left;
        const localPointY = point.y - rect.top;
        let fluidFocusX = localPointX;
        let fluidFocusY = localPointY;
        const band = Math.min(58, (edge === 'left' || edge === 'right' ? width : height) * .22);
        const radius = Math.min(145, (edge === 'left' || edge === 'right' ? height : width) * .34);
        const maxPull = 112;
        const cursorRadius = 40;
        const releaseDistance = 150;
        const strip = 4;
        let currentPull = 0;
        let released = false;
        let releaseStarted = 0;
        let releaseFrom = 0;
        let aberrationParticles = [];

        function isInwardVelocity(vx, vy) {
          if (edge === 'left') return vx > 0;
          if (edge === 'right') return vx < 0;
          if (edge === 'top') return vy > 0;
          return vy < 0;
        }

        function spawnAberrationParticle(px, py, axis, dirX, dirY) {
          const [colorR, colorG, colorB] = samplePullColor(px, py);
          const vx = dirX * (.7 + Math.random() * 3.4) + (axis === 'y' ? (Math.random() - .5) * 1.6 : 0);
          const vy = dirY * (.7 + Math.random() * 3.4) + (axis === 'x' ? (Math.random() - .5) * 1.6 : 0);
          aberrationParticles.push({
            x: px,
            y: py,
            axis,
            vx,
            vy,
            age: 0,
            life: 1,
            decay: .012 + Math.random() * .05,
            size: 1 + Math.random() * 2,
            inward: isInwardVelocity(vx, vy),
            colorR, colorG, colorB
          });
        }

        function getAberrationBurstRect() {
          const pillRect = cursorAction.getBoundingClientRect();
          const pillOpacity = parseFloat(getComputedStyle(cursorAction).opacity || '0');
          if (pillRect.width > 4 && pillRect.height > 4 && pillOpacity > .05) {
            return {
              left: pillRect.left - rect.left + padding,
              top: pillRect.top - rect.top + padding,
              right: pillRect.right - rect.left + padding,
              bottom: pillRect.bottom - rect.top + padding
            };
          }
          const cx = pointerClientX - rect.left + padding;
          const cy = pointerClientY - rect.top + padding;
          return { left: cx, top: cy, right: cx, bottom: cy };
        }

        function spawnAberrationBurst(count) {
          const burst = getAberrationBurstRect();
          const w = burst.right - burst.left;
          const h = burst.bottom - burst.top;
          for (let index = 0; index < count; index++) {
            let px;
            let py;
            if (w < 1 && h < 1) {
              px = burst.left;
              py = burst.top;
            } else {
              const side = Math.floor(Math.random() * 4);
              const t = Math.random();
              if (side === 0) { px = burst.left + w * t; py = burst.top; }
              else if (side === 1) { px = burst.right; py = burst.top + h * t; }
              else if (side === 2) { px = burst.left + w * t; py = burst.bottom; }
              else { px = burst.left; py = burst.top + h * t; }
            }
            const angle = Math.random() * Math.PI * 2;
            const speed = .5 + Math.random() * 2.6;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const [colorR, colorG, colorB] = samplePullColor(px, py);
            aberrationParticles.push({
              x: px,
              y: py,
              axis: Math.random() < .5 ? 'x' : 'y',
              vx,
              vy,
              age: 0,
              life: 1,
              decay: .012 + Math.random() * .05,
              size: 1 + Math.random() * 2,
              inward: isInwardVelocity(vx, vy),
              colorR, colorG, colorB
            });
          }
        }

        function drawAberrationParticles() {
          if (!aberrationParticles.length) return;
          context.globalCompositeOperation = 'source-over';
          for (let index = aberrationParticles.length - 1; index >= 0; index--) {
            const particle = aberrationParticles[index];
            particle.age++;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= .972;
            particle.vy *= .972;
            particle.life -= particle.decay;
            if (particle.life <= 0) {
              aberrationParticles.splice(index, 1);
              continue;
            }
            const alpha = Math.max(0, Math.min(1, particle.life));
            const half = particle.size / 2;
            context.fillStyle = particle.inward
              ? `rgba(0,0,0,${alpha * .9})`
              : `rgba(${particle.colorR},${particle.colorG},${particle.colorB},${alpha * .9})`;
            context.fillRect(particle.x - half, particle.y - half, particle.size, particle.size);
          }
          if (aberrationParticles.length > 900) aberrationParticles.length = 900;
        }

        function drawFrame(now) {
          if (fluidPullCanvas !== canvas) return;
          const targetFocusX = Math.max(0, Math.min(width, pointerClientX - rect.left));
          const targetFocusY = Math.max(0, Math.min(height, pointerClientY - rect.top));
          fluidFocusX += (targetFocusX - fluidFocusX) * .14;
          fluidFocusY += (targetFocusY - fluidFocusY) * .14;
          let outwardDistance = 0;
          if (direction === 'outward') {
            if (edge === 'left') outwardDistance = rect.left - (pointerClientX - cursorRadius);
            if (edge === 'right') outwardDistance = (pointerClientX + cursorRadius) - rect.right;
            if (edge === 'top') outwardDistance = rect.top - (pointerClientY - cursorRadius);
            if (edge === 'bottom') outwardDistance = (pointerClientY + cursorRadius) - rect.bottom;
          } else {
            if (edge === 'left') outwardDistance = (pointerClientX + cursorRadius) - rect.left;
            if (edge === 'right') outwardDistance = rect.right - (pointerClientX - cursorRadius);
            if (edge === 'top') outwardDistance = (pointerClientY + cursorRadius) - rect.top;
            if (edge === 'bottom') outwardDistance = rect.bottom - (pointerClientY - cursorRadius);
          }
          outwardDistance = Math.max(0, outwardDistance);

          const pointerInside =
            pointerClientX >= rect.left && pointerClientX <= rect.right
            && pointerClientY >= rect.top && pointerClientY <= rect.bottom;
          const pointerReversed = direction === 'outward' ? pointerInside : !pointerInside;
          if (!released && (outwardDistance >= releaseDistance || pointerReversed)) {
            released = true;
            releaseStarted = now;
            releaseFrom = currentPull;
          }

          if (released) {
            const releaseProgress = Math.min(1, (now - releaseStarted) / 620);
            const eased = 1 - Math.pow(1 - releaseProgress, 3);
            currentPull = releaseFrom * (1 - eased);
          } else {
            const targetPull = Math.min(maxPull, outwardDistance * .78);
            currentPull += (targetPull - currentPull) * .2;
          }
          const pull = direction === 'inward' ? -Math.min(currentPull, band * .82) : currentPull;
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.drawImage(targetImage, originX, originY, width, height);

          if (edge === 'left' || edge === 'right') {
            const sourceBand = naturalWidth * band / width;
            const sourceX = edge === 'left' ? 0 : naturalWidth - sourceBand;
            for (let y = 0; y < height; y += strip) {
              const center = y + strip / 2;
              const distance = (center - fluidFocusY) / radius;
              const weight = Math.exp(-distance * distance * 1.8);
              const ripple = .92 + .08 * Math.sin(y * .11 + now * .012);
              const amount = pull * weight * ripple;
              const destinationX = edge === 'left' ? originX - amount : originX + width - band;
              if (amount < 0) {
                if (edge === 'left') context.clearRect(originX, originY + y, -amount + 1, Math.min(strip + 1, height - y));
                else context.clearRect(originX + width + amount - 1, originY + y, -amount + 1, Math.min(strip + 1, height - y));
              }
              const sourceY = naturalHeight * y / height;
              const sourceHeight = naturalHeight * Math.min(strip + 1, height - y) / height;
              context.drawImage(
                targetImage,
                sourceX, sourceY, sourceBand, sourceHeight,
                destinationX - 1, originY + y, band + amount + 2, Math.min(strip + 1, height - y)
              );
              if (Math.abs(amount) > 1.5 && Math.random() < weight * .3) {
                spawnAberrationParticle(
                  destinationX + (edge === 'left' ? 0 : band + amount),
                  originY + center,
                  'x',
                  edge === 'left' ? -1 : 1,
                  0
                );
              }
            }
          } else {
            const sourceBand = naturalHeight * band / height;
            const sourceY = edge === 'top' ? 0 : naturalHeight - sourceBand;
            for (let x = 0; x < width; x += strip) {
              const center = x + strip / 2;
              const distance = (center - fluidFocusX) / radius;
              const weight = Math.exp(-distance * distance * 1.8);
              const ripple = .92 + .08 * Math.sin(x * .11 + now * .012);
              const amount = pull * weight * ripple;
              const destinationY = edge === 'top' ? originY - amount : originY + height - band;
              if (amount < 0) {
                if (edge === 'top') context.clearRect(originX + x, originY, Math.min(strip + 1, width - x), -amount + 1);
                else context.clearRect(originX + x, originY + height + amount - 1, Math.min(strip + 1, width - x), -amount + 1);
              }
              const sourceX = naturalWidth * x / width;
              const sourceWidth = naturalWidth * Math.min(strip + 1, width - x) / width;
              context.drawImage(
                targetImage,
                sourceX, sourceY, sourceWidth, sourceBand,
                originX + x, destinationY - 1, Math.min(strip + 1, width - x), band + amount + 2
              );
              if (Math.abs(amount) > 1.5 && Math.random() < weight * .3) {
                spawnAberrationParticle(
                  originX + center,
                  destinationY + (edge === 'top' ? 0 : band + amount),
                  'y',
                  0,
                  edge === 'top' ? -1 : 1
                );
              }
            }
          }

          if (Math.abs(currentPull) > 2) spawnAberrationBurst(2);
          drawAberrationParticles();

          if (!released || currentPull > .25) {
            fluidPullFrame = requestAnimationFrame(drawFrame);
          } else {
            clearViewerFluidPull();
          }
        }

        targetImage.style.opacity = '0';
        fluidPullFrame = requestAnimationFrame(drawFrame);
      }

      function syncViewerImageEdgeExit(detailOpen, insideImage, rect, x, y, targetImage = viewerImage) {
        if (!detailOpen) {
          wasInsideViewerImage = false;
          lastViewerImagePoint = null;
          lastViewerOutsidePoint = null;
          return;
        }
        if (insideImage) {
          if (!wasInsideViewerImage && lastViewerOutsidePoint) {
            pullViewerImageEdge(rect, { x, y }, 'inward', targetImage);
          }
          wasInsideViewerImage = true;
          lastViewerImagePoint = { x, y };
          lastViewerOutsidePoint = null;
          return;
        }
        if (wasInsideViewerImage && lastViewerImagePoint) {
          pullViewerImageEdge(rect, lastViewerImagePoint, 'outward', targetImage);
        }
        wasInsideViewerImage = false;
        lastViewerImagePoint = null;
        lastViewerOutsidePoint = { x, y };
      }

      function syncOverlayPointerState(x, y, target = document.elementFromPoint(x, y)) {
        const viewerOpen = viewer.classList.contains('open');
        const overThumbnail = Boolean(target?.closest?.('.viewer-thumbnail'));
        const overClose = Boolean(target?.closest?.('.viewer-close'));
        const overTab = Boolean(target?.closest?.('.viewer-tab, .viewer-logo'));
        const detailOpen = viewerOpen
          && !viewer.classList.contains('menu-open')
          && !viewer.classList.contains('video-open')
          && !viewer.classList.contains('static-page-open');
        if (viewerInfoOpen || viewerInfoFlipping) {
          const infoCardRect = viewerInfoBack.getBoundingClientRect();
          const aboveInfoCard = y < infoCardRect.top;
          clearImageNavigationCursor();
          document.body.classList.remove('thumbnail-hover', 'viewer-detail-menu-cursor');
          document.body.classList.toggle('viewer-top-zone-hover', aboveInfoCard);
          document.body.classList.toggle('viewer-tab-hover', overTab && !aboveInfoCard);
          document.body.classList.toggle('viewer-close-hover', overClose && !aboveInfoCard);
          return;
        }
        const staticPageOpen = viewerOpen && viewer.classList.contains('static-page-open');
        const imageRect = viewerImage.getBoundingClientRect();
        const insideImage = detailOpen && !overThumbnail && !overClose
          && x >= imageRect.left && x <= imageRect.right
          && y >= imageRect.top && y <= imageRect.bottom;
        const staticImageRect = viewerStaticImage.getBoundingClientRect();
        const insideStaticImage = staticPageOpen && !overClose && !overTab
          && viewerStaticImage.complete && viewerStaticImage.naturalWidth > 0
          && x >= staticImageRect.left && x <= staticImageRect.right
          && y >= staticImageRect.top && y <= staticImageRect.bottom;
        if (staticPageOpen) {
          syncViewerImageEdgeExit(true, insideStaticImage, staticImageRect, x, y, viewerStaticImage);
        } else {
          syncViewerImageEdgeExit(detailOpen, insideImage, imageRect, x, y, viewerImage);
        }
        const topZoneActive = detailOpen && !insideImage && !overThumbnail && !overClose
          && y <= imageRect.top;
        const imageLeftActive = insideImage && x < imageRect.left + imageRect.width / 2;
        if (insideImage) swapImageNavigationArrow(imageLeftActive ? 'left' : 'right');
        document.body.classList.toggle('image-nav-left', imageLeftActive);
        document.body.classList.toggle('image-nav-right', insideImage && !imageLeftActive);
        document.body.classList.remove('viewer-top-zone-hover');
        document.body.classList.toggle('viewer-close-hover', viewerOpen && overClose);
        document.body.classList.toggle(
          'viewer-detail-menu-cursor',
          detailOpen && !insideImage && !overThumbnail && !overClose && !overTab
        );
        document.body.classList.toggle(
          'thumbnail-hover',
          detailOpen && !insideImage && !topZoneActive && !overClose
            && (overThumbnail || x >= innerWidth - 152)
        );
      }

      function updateThumbnailSelection() {
        updateViewerBreadcrumb();
        viewerThumbnails.querySelectorAll('.viewer-thumbnail').forEach((thumbnail, index) => {
          const active = index === viewerImageIndex;
          thumbnail.classList.toggle('active', active);
          thumbnail.setAttribute('aria-current', active ? 'true' : 'false');
          if (active) thumbnail.scrollIntoView({ block: 'nearest' });
        });
      }

      async function selectViewerImage(index) {
        if (index === viewerImageIndex || viewerTransitioning || viewerInfoOpen || viewerInfoFlipping) return;
        consumeIndexEntryInfo(index);
        viewerTransitioning = true;
        viewer.classList.remove('video-open');
        viewerVideo.removeAttribute('src');
        clearViewerFluidPull();
        const previousRect = viewerImage.getBoundingClientRect();
        const source = images[index];
        const incoming = new Image();
        if (/^https?:/i.test(source)) incoming.crossOrigin = 'anonymous';
        incoming.src = source;
        const incomingReady = incoming.decode?.().catch(() => {})
          || new Promise(resolve => {
            incoming.onload = resolve;
            incoming.onerror = resolve;
          });
        configureMask();
        await animateMask('cover', 260);
        await incomingReady;
        viewerImageIndex = index;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image ${index + 1} of ${images.length}`;
        if (/^https?:/i.test(source)) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.src = source;
        await viewerImage.decode?.().catch(() => {});
        updateThumbnailSelection();

        viewerImage.style.scale = '1';
        viewerImage.style.width = `${previousRect.width}px`;
        viewerImage.style.height = `${previousRect.height}px`;
        const targetSize = getOverlayImageSize(viewerImage);
        viewerImage.style.width = `${targetSize.width}px`;
        viewerImage.style.height = `${targetSize.height}px`;
        const targetRect = viewerImage.getBoundingClientRect();
        configureMask();
        viewerImage.style.width = `${previousRect.width}px`;
        viewerImage.style.height = `${previousRect.height}px`;
        asciiMask.style.left = `${previousRect.left}px`;
        asciiMask.style.top = `${previousRect.top}px`;
        asciiMask.style.width = `${previousRect.width}px`;
        asciiMask.style.height = `${previousRect.height}px`;

        const resizeTiming = {
          duration: 780,
          easing: 'cubic-bezier(.4, 0, .2, 1)',
          fill: 'forwards'
        };
        const imageResize = viewerImage.animate([
          { width: `${previousRect.width}px`, height: `${previousRect.height}px` },
          { width: `${targetRect.width}px`, height: `${targetRect.height}px` }
        ], resizeTiming);
        const maskResize = asciiMask.animate([
          {
            left: `${previousRect.left}px`,
            top: `${previousRect.top}px`,
            width: `${previousRect.width}px`,
            height: `${previousRect.height}px`
          },
          {
            left: `${targetRect.left}px`,
            top: `${targetRect.top}px`,
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`
          }
        ], resizeTiming);
        const infoPillMove = viewerInfoPrompt.animate([
          {
            left: `${previousRect.left - 16}px`,
            top: `${previousRect.top + previousRect.height / 2}px`
          },
          {
            left: `${targetRect.left - 16}px`,
            top: `${targetRect.top + targetRect.height / 2}px`
          }
        ], resizeTiming);
        const synchronizedStart = document.timeline.currentTime ?? performance.now();
        imageResize.startTime = synchronizedStart;
        maskResize.startTime = synchronizedStart;
        infoPillMove.startTime = synchronizedStart;
        await Promise.all([
          animateMask('reveal', 780, synchronizedStart),
          imageResize.finished.catch(() => {}),
          maskResize.finished.catch(() => {}),
          infoPillMove.finished.catch(() => {})
        ]);

        // Preserve the exact final resize frame before cancelling the WAAPI
        // animations. Without this, cancel() exposes previousRect for one paint,
        // creating the visible shrink/grow jump after the ASCII reveal.
        if (typeof imageResize.commitStyles === 'function') imageResize.commitStyles();
        if (typeof maskResize.commitStyles === 'function') maskResize.commitStyles();
        if (typeof infoPillMove.commitStyles === 'function') infoPillMove.commitStyles();

        imageResize.cancel();
        maskResize.cancel();
        infoPillMove.cancel();

        // The committed width/height are already the final target geometry.
        // Remove them only after the browser has painted that identical final
        // frame, handing control back to the responsive CSS with no visual jump.
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        viewerImage.style.width = '';
        viewerImage.style.height = '';
        viewerImage.style.scale = '';
        configureMask();
        viewerTransitioning = false;
        if (activeProject.videoIndex === viewerImageIndex) {
          clearViewerInfoHint();
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(activeProject.video);
        } else {
          scheduleViewerInfoHint();
        }
        syncOverlayPointerState(pointerClientX, pointerClientY);
      }

      function renderViewerThumbnails() {
        viewerThumbnails.replaceChildren(...images.map((source, index) => {
          const button = document.createElement('button');
          const image = document.createElement('img');
          button.type = 'button';
          button.className = 'viewer-thumbnail';
          button.setAttribute('aria-label', `View image ${index + 1}`);
          image.src = source;
          image.alt = '';
          image.draggable = false;
          trackThumbnailLoad(button, image);
          button.appendChild(image);
          button.addEventListener('pointerenter', () => {
            menuHoverSound.currentTime = 0;
            menuHoverSound.play().catch(() => {});
          });
          button.addEventListener('click', event => {
            event.stopPropagation();
            selectViewerImage(index);
          });
          return button;
        }));
        updateThumbnailSelection();
        updateThumbnailRailLayout();
      }

      function updateThumbnailRailLayout() {
        viewerThumbnails.classList.remove('long-gallery');
        requestAnimationFrame(() => {
          const availableCenteredHeight = Math.max(0, innerHeight - 144);
          const isLongGallery = viewerThumbnails.scrollHeight > availableCenteredHeight + 1;
          viewerThumbnails.classList.toggle('long-gallery', isLongGallery);
        });
      }

      function renderViewerMenu(section) {
        const projects = viewerProjects[section] || [];
        viewerMenuList.classList.toggle('compact', projects.length <= 5);
        viewerMenuList.replaceChildren(...projects.map(item => {
          const entry = document.createElement('button');
          const mixedMedia = Boolean(item.video && Number.isInteger(item.videoIndex));
          const imageCount = mixedMedia ? item.images.length : (item.video ? 1 : item.images.length);
          entry.type = 'button';
          entry.className = 'viewer-menu-entry';
          entry.dataset.projectSlug = item.slug;
          entry.dataset.imageCount = String(imageCount);
          entry.dataset.mediaLabel = item.externalLink
            ? (item.linkLabel || 'OPEN LINK')
            : (mixedMedia
              ? `${imageCount} MEDIA`
              : (item.video ? '1 VIDEO' : `${imageCount} ${imageCount === 1 ? 'IMAGE' : 'IMAGES'}`));
          entry.dataset.preview = item.preview || (item.images.length
            ? item.images[Math.floor(Math.random() * item.images.length)]
            : '');
          entry.dataset.externalLink = item.externalLink || '';
          const label = document.createElement('span');
          label.className = 'viewer-menu-entry-label';
          label.textContent = item.menuTitle || item.title;
          if (item.externalLink) {
            entry.classList.add('viewer-menu-entry-external');
            const externalIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            externalIcon.setAttribute('class', 'viewer-menu-entry-external-icon');
            externalIcon.setAttribute('viewBox', '0 0 24 24');
            externalIcon.setAttribute('aria-hidden', 'true');
            const externalPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            externalPath.setAttribute('d', 'M14 3h7v7M21 3L10 14M19 14v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6');
            externalPath.setAttribute('fill', 'none');
            externalPath.setAttribute('stroke', 'currentColor');
            externalPath.setAttribute('stroke-width', '2');
            externalPath.setAttribute('stroke-linecap', 'round');
            externalPath.setAttribute('stroke-linejoin', 'round');
            externalIcon.appendChild(externalPath);
            label.appendChild(externalIcon);
          }
          entry.appendChild(label);
          entry.addEventListener('pointerenter', () => setMenuEntryActive(entry));
          entry.addEventListener('click', event => {
            event.stopPropagation();
            if (entry.dataset.externalLink) {
              window.open(entry.dataset.externalLink, '_blank', 'noopener');
              return;
            }
            openProjectFromMenu(entry);
          });
          return entry;
        }));
      }

      function createTransitionMenuList(titles) {
        const list = document.createElement('div');
        list.className = 'viewer-menu-list';
        list.classList.toggle('compact', titles.length <= 5);
        list.replaceChildren(...titles.map(item => {
          const entry = document.createElement('button');
          entry.type = 'button';
          entry.className = 'viewer-menu-entry';
          const label = document.createElement('span');
          label.className = 'viewer-menu-entry-label';
          label.textContent = item.menuTitle || item.title;
          splitTransitionLabelCharacters(label);
          entry.appendChild(label);
          return entry;
        }));
        return list;
      }

      function splitTransitionLabelCharacters(label) {
        const text = label.textContent || '';
        label.replaceChildren(...[...text].map(character => {
          const span = document.createElement('span');
          span.className = 'viewer-menu-transition-character';
          span.textContent = character === ' ' ? '\u00a0' : character;
          return span;
        }));
      }

      async function transitionViewerMenu(section) {
        if (menuCategoryTransitioning || section === activeViewerSection) return;
        menuCategoryTransitioning = true;
        syncMenuScrollCue();
        setMenuEntryActive(null);
        const layer = document.createElement('div');
        const outgoing = viewerMenuList.cloneNode(true);
        const incoming = createTransitionMenuList(viewerProjects[section]);
        layer.className = 'viewer-menu-transition-layer';
        outgoing.querySelectorAll('.cursor-hover').forEach(entry => entry.classList.remove('cursor-hover'));
        outgoing.querySelectorAll('.viewer-menu-entry-label').forEach(label => { label.style.transform = ''; });
        outgoing.querySelectorAll('.viewer-menu-entry-label').forEach(splitTransitionLabelCharacters);
        outgoing.style.translate = `0 ${-viewerMenu.scrollTop}px`;
        layer.append(outgoing, incoming);
        viewerMenu.appendChild(layer);
        viewerMenuList.style.visibility = 'hidden';
        updateViewerTabs(section);
        history.pushState({ page: section.toLowerCase() }, '', `${section.toLowerCase()}.html`);
        applyPageSeo(section);

        const timing = { duration: 430, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both' };
        const animations = [];
        outgoing.querySelectorAll('.viewer-menu-entry').forEach((entry, index) => {
          const rowDelay = index * 24;
          animations.push(entry.animate([
            { transform: 'translateX(0)', opacity: 1 },
            { transform: 'translateX(-110vw)', opacity: 0 }
          ], { ...timing, delay: rowDelay }));
          entry.querySelectorAll('.viewer-menu-transition-character').forEach((character, characterIndex) => {
            animations.push(character.animate([
              { transform: 'translateX(0)', opacity: 1 },
              { transform: 'translateX(-24px)', opacity: 0 }
            ], {
              duration: 330,
              delay: rowDelay + characterIndex * 7,
              easing: 'cubic-bezier(.55, 0, 1, .45)',
              fill: 'both'
            }));
          });
        });
        incoming.querySelectorAll('.viewer-menu-entry').forEach((entry, index) => {
          const rowDelay = 70 + index * 24;
          animations.push(entry.animate([
            { transform: 'translateX(110vw)', opacity: 0, offset: 0, easing: 'cubic-bezier(.22, 1, .36, 1)' },
            { transform: 'translateX(-120px)', opacity: 1, offset: .48, easing: 'cubic-bezier(.16, 1, .3, 1)' },
            { transform: 'translateX(0)', opacity: 1, offset: 1 }
          ], { ...timing, duration: 1200, delay: rowDelay }));
          entry.querySelectorAll('.viewer-menu-transition-character').forEach((character, characterIndex) => {
            animations.push(character.animate([
              { transform: 'translateX(38px)', opacity: 0 },
              { transform: 'translateX(0)', opacity: 1 }
            ], {
              duration: 520,
              delay: rowDelay + 120 + characterIndex * 9,
              easing: 'cubic-bezier(.16, 1, .3, 1)',
              fill: 'both'
            }));
          });
        });
        await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
        renderViewerMenu(section);
        viewerMenu.scrollTop = 0;
        viewerMenuList.style.visibility = '';
        layer.remove();
        menuCategoryTransitioning = false;
        syncMenuScrollCue();
        requestAnimationFrame(syncMenuHoverUnderCursor);
      }

      function openViewerMenu(section = activeViewerSection) {
        document.body.classList.remove('thumbnail-hover');
        clearViewerInfoHint();
        clearViewerFluidPull();
        clearImageNavigationCursor();
        updateViewerTabs(section);
        renderViewerMenu(section);
        viewerMenu.scrollTop = 0;
        syncMenuScrollCue();
        viewerMenuPreview.classList.remove('visible');
        hoveredMenuEntry = null;
        cursorActionCount.classList.remove('visible');
        viewer.classList.add('menu-open');
        document.body.classList.add('viewer-menu-open');
        cursorActionLabel.textContent = 'IMAGE';
      }

      async function openViewerMenuWithSweep(section = activeViewerSection) {
        if (menuCategoryTransitioning) return;
        menuCategoryTransitioning = true;
        updateViewerTabs(section);
        history.pushState({ page: section.toLowerCase() }, '', `${section.toLowerCase()}.html`);
        applyPageSeo(section);
        const breadcrumb = viewer.querySelector('.viewer-breadcrumb');
        breadcrumb.style.opacity = '0';
        viewer.classList.add('menu-open');

        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        viewer.appendChild(sweep);
        const sweepAnimation = sweep.animate([
          { transform: 'scaleY(0)' },
          { transform: 'scaleY(1)' }
        ], {
          duration: 460,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await sweepAnimation.finished.catch(() => {});

        openViewerMenu(section);
        breadcrumb.style.opacity = '';
        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        const reveals = entries.map((entry, index) => entry.animate([
          { opacity: 0, transform: 'translateY(-30px)' },
          { opacity: .28, transform: 'translateY(-18px)', offset: .38 },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 520,
          delay: 40 + index * 46,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both'
        }));
        sweep.remove();
        await Promise.all(reveals.map(animation => animation.finished.catch(() => {})));
        reveals.forEach(animation => animation.cancel());
        menuCategoryTransitioning = false;
        syncMenuScrollCue();
        requestAnimationFrame(syncMenuHoverUnderCursor);
      }

      async function openProjectFromMenu(entry) {
        if (menuCategoryTransitioning || !viewer.classList.contains('menu-open')) return;
        const selectedProject = projectBySlug.get(entry.dataset.projectSlug);
        if (!selectedProject) return;
        menuCategoryTransitioning = true;
        clearTimeout(cursorCountTimer);
        setMenuEntryActive(null);
        viewerMenuPreview.classList.remove('visible');
        cursorActionCount.classList.remove('visible');

        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        const exits = entries.map((item, index) => item.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: .3, transform: 'translateY(18px)', offset: .62 },
          { opacity: 0, transform: 'translateY(30px)' }
        ], {
          duration: 380,
          delay: index * 34,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'both'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));

        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        sweep.style.transform = 'scaleY(1)';
        sweep.style.transformOrigin = '50% 100%';
        viewer.appendChild(sweep);
        closeViewerMenu();
        setActiveProject(selectedProject);
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        try {
          const url = new URL(location.href);
          url.searchParams.set('project', selectedProject.slug);
          history.pushState({ project: selectedProject.slug }, '', url);
        } catch (_) {}
        if (selectedProject.video && !Number.isInteger(selectedProject.videoIndex)) {
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(selectedProject.video);
          viewerThumbnails.replaceChildren();
          updateViewerBreadcrumb();
        } else {
          viewerImageIndex = 0;
          viewerImage.src = images[0];
          await viewerImage.decode?.().catch(() => {});
          renderViewerThumbnails();
          positionViewerInfoElements();
        }
        const reveal = sweep.animate([
          { transform: 'scaleY(1)' },
          { transform: 'scaleY(0)' }
        ], {
          duration: 500,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await reveal.finished.catch(() => {});
        sweep.remove();
        exits.forEach(animation => animation.cancel());
        menuCategoryTransitioning = false;
        syncOverlayPointerState(pointerClientX, pointerClientY);
        if (!selectedProject.video || Number.isInteger(selectedProject.videoIndex)) scheduleViewerInfoHint();
      }

      function closeViewerMenu() {
        viewer.classList.remove('menu-open');
        document.body.classList.remove('viewer-menu-open');
        document.body.classList.remove('thumbnail-hover');
        document.body.classList.remove('viewer-tab-hover');
        document.body.classList.remove('viewer-detail-menu-cursor');
        clearImageNavigationCursor();
        viewerMenuPreview.classList.remove('visible');
        clearTimeout(cursorCountTimer);
        setMenuEntryActive(null);
        cursorActionLabel.textContent = 'MENU';
      }

      function resolveVideoEmbedUrl(source) {
        const url = new URL(source, location.href);
        const clientOrigin = location.protocol === 'http:' || location.protocol === 'https:'
          ? location.origin
          : 'https://www.tokonoma.xyz';
        url.searchParams.set('origin', clientOrigin);
        url.searchParams.set('enablejsapi', '1');
        return url.href;
      }

      function updateStaticContentFades() {
        const hasOverflow = viewerStaticContent.scrollHeight > viewerStaticContent.clientHeight + 2;
        const isScrolled = viewerStaticContent.scrollTop > 2;
        const isAtBottom = viewerStaticContent.scrollTop + viewerStaticContent.clientHeight
          >= viewerStaticContent.scrollHeight - 2;
        viewerStaticContent.classList.toggle('has-overflow', hasOverflow);
        viewerStaticContent.classList.toggle('is-scrolled', hasOverflow && isScrolled);
        viewerStaticContent.classList.toggle('is-at-bottom', hasOverflow && isAtBottom);
      }

      viewerStaticContent.addEventListener('scroll', updateStaticContentFades, { passive: true });
      addEventListener('resize', updateStaticContentFades, { passive: true });
      if ('ResizeObserver' in window) {
        new ResizeObserver(updateStaticContentFades).observe(viewerStaticCopy);
      }

      let staticSlideshowTimer = null;
      let staticImageMasker = null;
      let staticImageBusy = false;
      function createGridFlipMasker(image) {
        const canvas = document.createElement('canvas');
        canvas.className = 'static-image-mask';
        viewer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const cols = 6;
        const rows = 4;
        let boxWidth = 0;
        let boxHeight = 0;

        function configure() {
          const rect = image.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          boxWidth = rect.width;
          boxHeight = rect.height;
          canvas.style.left = rect.left + 'px';
          canvas.style.top = rect.top + 'px';
          canvas.style.width = rect.width + 'px';
          canvas.style.height = rect.height + 'px';
          canvas.width = Math.max(1, Math.round(rect.width * ratio));
          canvas.height = Math.max(1, Math.round(rect.height * ratio));
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function containRect(naturalW, naturalH) {
          if (!naturalW || !naturalH) return { x: 0, y: 0, width: boxWidth, height: boxHeight };
          const scale = Math.min(boxWidth / naturalW, boxHeight / naturalH);
          const width = naturalW * scale;
          const height = naturalH * scale;
          return { x: (boxWidth - width) / 2, y: 0, width, height };
        }

        function drawFitCell(sourceImg, fit, boxX, boxY, cellW, cellH) {
          if (!fit.width || !fit.height) return;
          const relX = (boxX - fit.x) / fit.width;
          const relY = (boxY - fit.y) / fit.height;
          const relW = cellW / fit.width;
          const relH = cellH / fit.height;
          if (relX + relW <= 0 || relX >= 1 || relY + relH <= 0 || relY >= 1) return;
          const naturalW = sourceImg.naturalWidth || boxWidth;
          const naturalH = sourceImg.naturalHeight || boxHeight;
          ctx.drawImage(
            sourceImg,
            relX * naturalW, relY * naturalH,
            relW * naturalW, relH * naturalH,
            boxX, boxY, cellW, cellH
          );
        }

        async function transitionTo(nextSrc, duration = matchMedia(mobileLayoutQuery).matches ? 620 : 850) {
          configure();
          const oldFit = containRect(image.naturalWidth, image.naturalHeight);
          const nextImage = new Image();
          await new Promise(resolve => {
            nextImage.onload = resolve;
            nextImage.onerror = resolve;
            nextImage.src = nextSrc;
          });
          configure();
          const newFit = containRect(nextImage.naturalWidth, nextImage.naturalHeight);
          const cellW = boxWidth / cols;
          const cellH = boxHeight / rows;
          const delays = [];
          let maxDelay = 0;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const wave = (col / Math.max(1, cols - 1)) * .6 + (row / Math.max(1, rows - 1)) * .25 + Math.random() * .15;
              delays.push(wave);
              if (wave > maxDelay) maxDelay = wave;
            }
          }
          const cellDuration = duration * .55;
          const spreadDuration = Math.max(1, duration - cellDuration);
          canvas.style.opacity = '1';
          await new Promise(resolve => {
            const started = performance.now();
            function frame(now) {
              const elapsed = now - started;
              ctx.clearRect(0, 0, boxWidth, boxHeight);
              let allDone = true;
              for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                  const index = row * cols + col;
                  const cellStart = (delays[index] / (maxDelay || 1)) * spreadDuration;
                  if (elapsed < cellStart) { allDone = false; continue; }
                  let t = (elapsed - cellStart) / cellDuration;
                  t = Math.max(0, Math.min(1, t));
                  if (t < 1) allDone = false;
                  const boxX = col * cellW;
                  const boxY = row * cellH;
                  const cx = boxX + cellW / 2;
                  const cy = boxY + cellH / 2;
                  let scaleX;
                  let skew;
                  let alpha;
                  let sourceImg;
                  let fit;
                  if (t < .5) {
                    const p = t / .5;
                    scaleX = 1 - p;
                    skew = p * .3;
                    alpha = 1 - p * .55;
                    sourceImg = image;
                    fit = oldFit;
                  } else {
                    const p = (t - .5) / .5;
                    scaleX = p;
                    skew = (1 - p) * -.3;
                    alpha = .45 + p * .55;
                    sourceImg = nextImage;
                    fit = newFit;
                  }
                  ctx.save();
                  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
                  ctx.translate(cx, cy);
                  ctx.transform(scaleX, 0, skew, 1, 0, 0);
                  ctx.translate(-cx, -cy);
                  drawFitCell(sourceImg, fit, boxX, boxY, cellW, cellH);
                  ctx.restore();
                }
              }
              if (!allDone) requestAnimationFrame(frame);
              else {
                ctx.clearRect(0, 0, boxWidth, boxHeight);
                canvas.style.opacity = '0';
                resolve();
              }
            }
            requestAnimationFrame(frame);
          });
          image.src = nextSrc;
        }

        function destroy() {
          canvas.remove();
        }

        return { configure, transitionTo, destroy };
      }


      function openStaticPage(section) {
        const content = {
          ABOUT: {
            title: 'ABOUT',
            imageAlt: 'Amogh R Raikar — Software Developer & Creative Technologist',
            imagePool: projectBySlug.get('karatcore-erp')?.images || [],
            copy: `
              <p>I\'m <strong style="color:var(--cursor-color)">Amogh R Raikar</strong>, a BCA student, software developer, and technology enthusiast passionate about building practical software solutions and exploring emerging technologies based in Bengaluru, India.</p>
              <p>My interests include full-stack development, artificial intelligence, cybersecurity, blockchain, and UI/UX design. I enjoy transforming ideas into functional applications, solving real-world problems through technology, and creating intuitive digital experiences.</p>
              <p>From developing ERP systems and AI-powered productivity applications to experimenting with blockchain and modern web technologies, I\'m continuously expanding my skills and building projects that reflect my creativity, technical curiosity, and problem-solving abilities. My goal is to become a versatile software engineer who combines strong engineering fundamentals with thoughtful design.</p>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>ENGINEERING FOCUS</h2>
                <div class="viewer-static-reason">
                  <h3>PRACTICAL IMPACT</h3>
                  <p>Engineering robust, scalable software that addresses real business and user needs directly.</p>
                </div>
                <div class="viewer-static-reason">
                  <h3>EMERGING TECHNOLOGIES</h3>
                  <p>Integrating artificial intelligence, computer vision, and cryptographic ledgers into intuitive user flows.</p>
                </div>
                <div class="viewer-static-reason">
                  <h3>DESIGN &amp; USER EXPERIENCE</h3>
                  <p>Bridging backend precision with clean, modern, and responsive interface systems.</p>
                </div>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>SKILLS &amp; TECHNOLOGIES</h2>
                <h3>LANGUAGES</h3>
                <p>Python &bull; Java &bull; C &bull; C++ &bull; JavaScript &bull; SQL</p>
                <h3>FRONTEND</h3>
                <p>HTML &bull; CSS &bull; JavaScript &bull; Flutter</p>
                <h3>BACKEND</h3>
                <p>Python &bull; FastAPI &bull; Node.js &bull; Express.js &bull; REST APIs</p>
                <h3>DATABASES</h3>
                <p>PostgreSQL &bull; MongoDB &bull; Redis</p>
                <h3>AI &amp; EMERGING TECH</h3>
                <p>Generative AI &bull; Computer Vision &bull; Blockchain</p>
                <h3>TOOLS</h3>
                <p>Git &bull; GitHub &bull; Docker &bull; VS Code &bull; Figma &bull; Antigravity</p>
                <h3>DESIGN</h3>
                <p>UI/UX Design &bull; Responsive Design &bull; Prototyping &bull; Design Systems</p>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>FEATURED PROJECTS</h2>
                <h3>KARATCORE ERP</h3>
                <p>Comprehensive ERP platform for jewellery businesses and gold pledge-loan operations built with Flutter, FastAPI, PostgreSQL, Redis, and Docker.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar/Karatcore-ERP" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB: KARATCORE-ERP</span></a>
                <h3>MENTRA — AI STUDY COACH</h3>
                <p>AI-powered academic companion featuring attention monitoring, study assistants, and gamified productivity dashboards.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">VIEW ON GITHUB</span></a>
                <h3>MINI BLOCKCHAIN</h3>
                <p>Python-based distributed ledger implementation demonstrating cryptographic hashing (SHA-256), block validation, and Proof-of-Work consensus.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar/blockchain-project-1" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB: BLOCKCHAIN-PROJECT-1</span></a>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>LOCATION &amp; CONTACT</h2>
                <p>Bengaluru, Karnataka, India &bull; Open for software engineering roles &amp; tech collaborations.</p>
                <a class="viewer-static-pill" href="contact.html"><span class="viewer-static-pill-label">CONTACT ME</span></a>
              </section>`
          },
          CONTACT: {
            title: 'CONTACT',
            imageAlt: 'Contact Amogh R Raikar',
            imagePool: projectBySlug.get('mentra-ai')?.images || [],
            copy: `
              <div class="viewer-contact-details">
                <h2>AMOGH R RAIKAR</h2>
                <p>Software Developer &amp; Creative Technologist<br>Bengaluru, Karnataka, India</p>
                <div class="viewer-contact-divider">–</div>
                <h3>LOCATION</h3>
                <p>Bengaluru, Karnataka, India</p>
                <div class="viewer-contact-divider">–</div>
                <h3>EMAIL</h3>
                <p><a class="viewer-static-pill" href="mailto:amoghrraikar@gmail.com"><span class="viewer-static-pill-label">AMOGHRAIKAR@GMAIL.COM</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>GITHUB</h3>
                <p><a class="viewer-static-pill" href="https://github.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB.COM/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>LINKEDIN</h3>
                <p><a class="viewer-static-pill" href="https://linkedin.com/in/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">LINKEDIN.COM/IN/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>X / TWITTER</h3>
                <p><a class="viewer-static-pill" href="https://x.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">X.COM/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>CONNECT</h3>
                <p>Always open to exciting opportunities, innovative software projects, and tech conversations.</p>
              </div>`
          }
        }[section];
        if (!content) return;
        viewer.classList.add('open', 'static-page-open');
        viewer.classList.remove('menu-open', 'video-open');
        document.body.classList.add('viewer-open');
        document.body.classList.remove('viewer-menu-open');
        viewerStaticTitle.textContent = content.title;
        viewerStaticCopy.innerHTML = content.copy;
        revealStaticCopy(viewerStaticCopy, viewerStaticContent, viewerStaticPage);
        viewerStaticContent.scrollTop = 0;
        requestAnimationFrame(updateStaticContentFades);
        viewerStaticImage.alt = content.imageAlt;
        if (staticSlideshowTimer) { clearInterval(staticSlideshowTimer); staticSlideshowTimer = null; }
        if (staticImageMasker) { staticImageMasker.destroy(); staticImageMasker = null; }
        staticImageBusy = false;
        viewerStaticImage.onerror = null;
        viewerStaticImage.onload = null;
        viewerStaticImage.classList.remove('unavailable');
        const imagePool = content.imagePool || [];
        let staticImageIndex = 0;
        if (imagePool.length) {
          viewerStaticImage.src = imagePool[staticImageIndex];
          staticImageMasker = createGridFlipMasker(viewerStaticImage);
          staticSlideshowTimer = setInterval(() => {
            if (staticImageBusy || !viewer.classList.contains('static-page-open')) return;
            staticImageBusy = true;
            staticImageIndex = (staticImageIndex + 1) % imagePool.length;
            staticImageMasker.transitionTo(imagePool[staticImageIndex]).finally(() => {
              staticImageBusy = false;
            });
          }, 5000);
        } else {
          viewerStaticImage.removeAttribute('src');
          viewerStaticImage.classList.add('unavailable');
        }
        updateViewerTabs(section);
      }

      async function openStaticPageWithSweep(section) {
        const uiElements = [
          viewer.querySelector('.viewer-logo'),
          viewerTabs,
          viewerClose
        ];
        uiElements.forEach(element => { element.style.opacity = '0'; });
        viewer.classList.add('open', 'static-page-open');
        document.body.classList.add('viewer-open');
        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        viewer.appendChild(sweep);
        const sweepAnimation = sweep.animate([
          { transform: 'scaleY(0)' },
          { transform: 'scaleY(1)' }
        ], {
          duration: 460,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await sweepAnimation.finished.catch(() => {});
        openStaticPage(section);
        const contentElements = [viewerStaticTitle, viewerStaticImage];
        const reveals = [...uiElements, ...contentElements].map((element, index) => element.animate([
          { opacity: 0, transform: 'translateY(-26px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 520,
          delay: 35 + index * 72,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both'
        }));
        sweep.remove();
        await Promise.all(reveals.map(animation => animation.finished.catch(() => {})));
        reveals.forEach(animation => animation.cancel());
        uiElements.forEach(element => { element.style.opacity = ''; });
      }

      async function closeStaticPageWithStagger(destination = 'index.html') {
        if (viewerTransitioning) return;
        viewerTransitioning = true;
        const elements = [
          ...viewerStaticCopy.querySelectorAll('section, p, h2, h3, .viewer-static-pill'),
          viewerStaticImage,
          viewerStaticTitle,
          viewer.querySelector('.viewer-logo'),
          viewerTabs,
          viewerClose
        ].filter(Boolean);
        const exits = elements.map((element, index) => element.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-22px)' }
        ], {
          duration: 360,
          delay: index * 24,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));
        location.href = destination;
      }

      function getOverlayImageSize(image) {
        const naturalWidth = image.naturalWidth || 1;
        const naturalHeight = image.naturalHeight || 1;
        const fit = Math.min(
          1,
          (innerWidth - 112) / naturalWidth,
          (innerHeight - 125) / naturalHeight
        ) * .875;
        return {
          width: naturalWidth * fit,
          height: naturalHeight * fit
        };
      }

      function positionNextPreview() {
        if (!viewer.classList.contains('open') || viewer.classList.contains('menu-open')) return;
        const currentRect = viewerImage.getBoundingClientRect();
        const size = getOverlayImageSize(viewerNextImage);
        const left = Math.max(
          currentRect.right + 32,
          innerWidth - Math.min(size.width * .24, 220)
        );
        viewerNextImage.style.width = `${size.width}px`;
        viewerNextImage.style.height = `${size.height}px`;
        viewerNextImage.style.left = `${left}px`;
        viewerNextImage.style.top = '93px';
        viewerNextZone.style.left = `${left}px`;
        viewerNextZone.style.top = '93px';
        viewerNextZone.style.width = `${size.width}px`;
        viewerNextZone.style.height = `${size.height}px`;
        viewerNextZone.style.translate = '0 0';
      }

      async function positionNextCue() {
        if (!viewer.classList.contains('open') || !images.length || activeProject?.video) return;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
      }

      async function showNextPreview() {
        if (viewerTransitioning || nextImageTransitioning || viewer.classList.contains('menu-open')) return;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
        viewerNextImage.classList.add('peek');
      }

      function hideNextPreview() {
        if (!nextImageTransitioning) viewerNextImage.classList.remove('peek');
      }

      async function advanceViewerImage() {
        if (viewerTransitioning || nextImageTransitioning || viewer.classList.contains('menu-open')) return;
        nextImageTransitioning = true;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
        viewerNextImage.classList.add('peek');
        const target = viewerImage.getBoundingClientRect();
        const preview = viewerNextImage.getBoundingClientRect();
        const nextLeft = (innerWidth - preview.width) / 2;
        const timing = { duration: 520, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' };
        const oldAnimation = viewerImage.animate([
          { transform: 'translateX(0)', opacity: 1 },
          { transform: `translateX(${-target.right - 48}px)`, opacity: 0 }
        ], timing);
        const newAnimation = viewerNextImage.animate([
          { left: `${preview.left}px`, top: `${preview.top}px`, opacity: .3 },
          { left: `${nextLeft}px`, top: '93px', opacity: 1 }
        ], timing);
        await Promise.all([oldAnimation.finished.catch(() => {}), newAnimation.finished.catch(() => {})]);
        consumeIndexEntryInfo(nextIndex);
        viewerImageIndex = nextIndex;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image ${nextIndex + 1} of ${images.length}`;
        if (/^https?:/i.test(images[viewerImageIndex])) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.src = images[viewerImageIndex];
        await viewerImage.decode?.().catch(() => {});
        oldAnimation.cancel();
        newAnimation.cancel();
        viewerNextImage.classList.remove('peek');
        nextImageTransitioning = false;
        await positionNextCue();
      }

      function openViewer(src, sourceIndex = images.findIndex(item => src.endsWith(item) || src === item)) {
        if (viewerTransitioning) return;
        cancelIdleImage();
        viewerTransitioning = true;
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        viewerImageIndex = sourceIndex >= 0 ? sourceIndex : 0;
        closeViewerMenu();
        updateViewerTabs(activeProject.category);
        updateViewerBreadcrumb();
        if (/^https?:/i.test(src)) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.onload = async () => {
          viewerImage.onload = null;
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          renderViewerThumbnails();
          viewer.focus({ preventScroll: true });
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await positionNextCue();
          if (document.fonts && document.fonts.load) {
            await document.fonts.load(`${asciiFontSize}px EurostileMNExtendedBold`).catch(() => {});
          }
          configureMask();
          await animateMask('reveal');
          viewerTransitioning = false;
          scheduleViewerInfoHint();
        };
        viewerImage.src = src;
      }

      async function closeViewer() {
        if (viewerTransitioning || menuCategoryTransitioning || !viewer.classList.contains('open')) return;
        viewerTransitioning = true;
        if (viewerInfoOpen) await closeViewerInfoCard();
        resetViewerInfoCard();
        clearViewerFluidPull();
        configureMask();
        await animateMask('cover');
        viewer.classList.remove('open');
        viewer.classList.remove('menu-open');
        viewer.classList.remove('video-open', 'static-page-open');
        document.body.classList.remove('viewer-open');
        document.body.classList.remove('viewer-menu-open');
        document.body.classList.remove('thumbnail-hover');
        document.body.classList.remove('viewer-tab-hover');
        clearImageNavigationCursor();
        asciiMask.style.opacity = '0';
        viewerImage.removeAttribute('src');
        viewerVideo.removeAttribute('src');
        viewerNextImage.removeAttribute('src');
        viewerNextImage.classList.remove('peek');
        viewerMenuPreview.classList.remove('visible');
        clearTimeout(cursorCountTimer);
        cursorActionCount.classList.remove('visible');
        cursorActionLabel.textContent = 'MENU';
        viewerTransitioning = false;
      }

      function cancelIdleImage() {
        window.clearTimeout(trailIdleTimer);
        trailIdleTimer = 0;
        document.body.classList.remove('trail-action');
        document.querySelectorAll('.trail-image.idle-focus').forEach(image => {
          image.classList.remove('idle-focus');
        });
      }

      function scheduleIdleImage(x, y) {
        if (awwwardsHoverActive) return;
        window.clearTimeout(trailIdleTimer);
        trailIdleTimer = window.setTimeout(() => {
          if (awwwardsHoverActive || viewer.classList.contains('open') || pillDragActive) return;
          if (!latestTrailImage?.isConnected) addTrailImage(x, y);
          latestTrailImage.style.zIndex = String(++topLayer);
          latestTrailImage.classList.add('idle-focus');
          document.body.classList.add('trail-action');
        }, 500);
      }

      function addTrailImage(x, y, failedAttempts = 0) {
        if (awwwardsHoverActive) return;
        const image = document.createElement('img');
        const trailItem = homeTrailItems[imageIndex++ % homeTrailItems.length];
        const assignedIndex = trailItem.imageIndex;
        image.className = 'trail-image';
        image.alt = '';
        image.style.left = x + 'px';
        image.style.top = y + 'px';
        image.style.visibility = 'hidden';
        image.style.zIndex = String(++topLayer);
        image.style.setProperty('--rotation', ((Math.random() * 10) - 5).toFixed(2) + 'deg');
        image.draggable = false;
        image.loading = 'eager';
        image.decoding = 'async';
        latestTrailImage = image;

        image.addEventListener('load', () => {
          image.style.visibility = 'visible';
          image.classList.add('is-loaded');
          menuHoverSound.currentTime = 0;
          menuHoverSound.play().catch(() => {});
        }, { once: true });
        image.addEventListener('error', () => {
          image.remove();
          if (latestTrailImage === image) latestTrailImage = null;
          console.warn('[Tokonoma trail] Skipped missing image:', trailItem.src);
          if (failedAttempts < homeTrailItems.length - 1) {
            addTrailImage(x, y, failedAttempts + 1);
          }
        }, { once: true });

        image.addEventListener('click', event => {
          event.stopPropagation();
          if (suppressPhotoClicks) {
            event.preventDefault();
            return;
          }
          setActiveProject(trailItem.project);
          indexEntryInfoIndex = assignedIndex > 0 ? assignedIndex : null;
          indexEntryInfoConsumed = indexEntryInfoIndex === null;
          openViewer(image.src, assignedIndex);
        });
        image.addEventListener('animationend', event => {
          if (event.animationName === 'trail-life') image.remove();
        });
        area.appendChild(image);
        image.src = trailItem.src;
      }

      area.addEventListener('pointermove', event => {
        if (awwwardsHoverActive || pillDragActive || viewer.classList.contains('open') || event.pointerType === 'touch') return;

        // Newsletter pulse protected zone: never spawn cursor-trail images in the
        // top-right 200 × 100 px desktop area.
        if (event.clientX >= window.innerWidth - 200 && event.clientY <= 100) {
          cancelIdleImage();
          document.body.classList.remove('trail-cursor');
          previousX = -999;
          previousY = -999;
          return;
        }

        document.body.classList.add('trail-cursor');
        cancelIdleImage();
        const rect = area.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        lastTrailX = x;
        lastTrailY = y;
        scheduleIdleImage(lastTrailX, lastTrailY);
        const distance = Math.hypot(x - previousX, y - previousY);
        if (distance < minimumDistance) return;
        previousX = x;
        previousY = y;
        addTrailImage(x, y);
      });

      area.addEventListener('pointerleave', () => {
        cancelIdleImage();
        document.body.classList.remove('trail-cursor');
        previousX = -999;
        previousY = -999;
      });

      area.addEventListener('click', event => {
        if (suppressPhotoClicks) {
          event.preventDefault();
          return;
        }
        if (event.pointerType !== 'mouse') {
          const rect = area.getBoundingClientRect();
          addTrailImage(event.clientX - rect.left, event.clientY - rect.top);
        }
      });

      viewer.addEventListener('click', event => {
        if (event.target.closest('.viewer-close, .viewer-logo, .viewer-tab, .viewer-next-zone, .viewer-thumbnails, .viewer-info-link')) return;
        if (viewer.classList.contains('static-page-open')) return;
        if (menuCategoryTransitioning) return;
        if (viewerInfoOpen) {
          closeViewerInfoCard();
          return;
        }
        if (viewerInfoFlipping) return;
        if (document.body.classList.contains('image-nav-left')) {
          selectViewerImage((viewerImageIndex - 1 + images.length) % images.length);
          return;
        }
        if (document.body.classList.contains('image-nav-right')) {
          selectViewerImage((viewerImageIndex + 1) % images.length);
          return;
        }
        if (viewer.classList.contains('menu-open')) {
          closeViewerMenu();
          scheduleViewerInfoHint();
        } else {
          openViewerMenuWithSweep(activeProject?.category || activeViewerSection);
        }
      });
      viewerStaticCopy.addEventListener('click', event => {
        const link = event.target.closest('.viewer-static-pill');
        if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.protocol === 'mailto:' || link.target === '_blank') return;
        event.preventDefault();
        event.stopPropagation();
        closeStaticPageWithStagger(link.href);
      });
      viewerClose.addEventListener('click', event => {
        event.stopPropagation();
        playUiSound(closeTextSound);
        if (viewer.classList.contains('static-page-open')) {
          closeStaticPageWithStagger('index.html');
          return;
        }
        if (pageSection !== 'HOME' && (viewer.classList.contains('menu-open') || viewer.classList.contains('static-page-open'))) {
          location.href = 'index.html';
          return;
        }
        if (projectCatalog[pageSection] && !viewer.classList.contains('menu-open')) {
          viewer.classList.remove('video-open', 'static-page-open');
          viewerVideo.removeAttribute('src');
          openViewerMenuWithSweep(pageSection);
          return;
        }
        closeViewer();
      });
      viewerTabs.addEventListener('click', async event => {
        const tab = event.target.closest('.viewer-tab');
        if (!tab) return;
        event.stopPropagation();
        const section = tab.dataset.section;
        if (section === 'LABZ') {
          navigateFromHome('labz/');
          return;
        }
        if (section === 'ABOUT' || section === 'CONTACT') {
          location.href = `${section.toLowerCase()}.html`;
          return;
        }
        if (viewerInfoFlipping) return;
        if (viewerInfoOpen) await closeViewerInfoCard();
        resetViewerInfoCard();
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        if (viewer.classList.contains('menu-open')) transitionViewerMenu(section);
        else openViewerMenuWithSweep(section);
      });
      viewerTabs.querySelectorAll('.viewer-tab').forEach(tab => {
        tab.addEventListener('pointerenter', () => document.body.classList.add('viewer-tab-hover'));
        tab.addEventListener('pointerleave', () => document.body.classList.remove('viewer-tab-hover'));
      });
      document.querySelector('.viewer-logo').addEventListener('pointerenter', () => document.body.classList.add('viewer-tab-hover'));
      document.querySelector('.viewer-logo').addEventListener('pointerleave', () => document.body.classList.remove('viewer-tab-hover'));
      viewerNextZone.addEventListener('pointerenter', showNextPreview);
      viewerNextZone.addEventListener('pointerleave', hideNextPreview);
      viewerNextZone.addEventListener('click', event => {
        event.stopPropagation();
        advanceViewerImage();
      });
      viewerMenu.addEventListener('scroll', () => {
        syncMenuScrollCue();
        if (!menuScrollHoverFrame) menuScrollHoverFrame = requestAnimationFrame(syncMenuHoverUnderCursor);
      }, { passive: true });
      viewerMenu.addEventListener('pointerleave', () => setMenuEntryActive(null));
      document.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        pointerClientX = event.clientX;
        pointerClientY = event.clientY;
        syncOverlayPointerState(event.clientX, event.clientY, event.target);
        if (viewer.classList.contains('menu-open') && !menuScrollHoverFrame) {
          menuScrollHoverFrame = requestAnimationFrame(syncMenuHoverUnderCursor);
        }
        cursorAction.style.left = event.clientX + 'px';
        cursorAction.style.top = event.clientY + 'px';
        updateCursorPillPosition(event.clientX, event.clientY);
      });
      window.addEventListener('popstate', event => {
        const state = event.state;
        if (!state) { location.reload(); return; }
        if (state.project) {
          const project = projectBySlug.get(state.project);
          if (!project) { location.reload(); return; }
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          viewer.classList.remove('menu-open', 'static-page-open', 'video-open');
          viewerVideo.removeAttribute('src');
          setActiveProject(project);
          applyProjectSeo(project);
          return;
        }
        if (state.page && state.page !== 'home' && projectCatalog[state.page.toUpperCase()]) {
          const section = state.page.toUpperCase();
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          viewer.classList.remove('static-page-open', 'video-open');
          viewerVideo.removeAttribute('src');
          openViewerMenu(section);
          applyPageSeo(section);
          return;
        }
        closeViewer();
      });
      document.addEventListener('keydown', event => {
        if (!viewer.classList.contains('open')) return;
        if (event.key === 'Escape') {
          if (viewer.classList.contains('static-page-open')) {
            closeStaticPageWithStagger('index.html');
            return;
          }
          closeViewer();
          return;
        }
        if (event.key.toLowerCase() === 'i' && !viewer.classList.contains('menu-open') && !viewerInfoOpen) {
          event.preventDefault();
          if (viewerInfoFlipping) return;
          openViewerInfoCard();
          return;
        }
        if (event.key.toLowerCase() === 'x' && viewerInfoOpen) {
          event.preventDefault();
          if (viewerInfoFlipping) return;
          closeViewerInfoCard();
          return;
        }
        if (viewerInfoOpen || viewerInfoFlipping) return;
        if (viewer.classList.contains('menu-open') || viewerTransitioning || nextImageTransitioning) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          selectViewerImage((viewerImageIndex - 1 + images.length) % images.length);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          selectViewerImage((viewerImageIndex + 1) % images.length);
        }
      });
      window.addEventListener('resize', () => {
        viewerNextImage.classList.remove('peek');
        updateThumbnailRailLayout();
        if (viewerInfoOpen || viewerInfoFlipping || viewer.classList.contains('info-hint')) {
          positionViewerInfoElements();
        }
        requestAnimationFrame(positionNextCue);
      });

      function bootPage() {
        applyPageSeo(pageSection);
        if (pageSection === 'ABOUT' || pageSection === 'CONTACT') {
          openStaticPageWithSweep(pageSection);
          return;
        }
        if (!projectCatalog[pageSection]) return;
        viewer.classList.add('open');
        document.body.classList.add('viewer-open');
        const requestedSlug = new URLSearchParams(location.search).get('project');
        const requestedProject = requestedSlug && projectBySlug.get(requestedSlug);
        if (!requestedProject || requestedProject.category !== pageSection) {
          openViewerMenuWithSweep(pageSection);
          return;
        }
        setActiveProject(requestedProject);
        if (requestedProject.video && !Number.isInteger(requestedProject.videoIndex)) {
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(requestedProject.video);
          updateViewerBreadcrumb();
          return;
        }
        viewer.classList.remove('open');
        document.body.classList.remove('viewer-open');
        openViewer(images[0], 0);
      }

      bootPage();
    
  }

  async function runProject(appData) {

      const projectCatalog = appData.projectCatalog;
      const projectInfo = appData.projectInfo;
      const allProjects = Object.values(projectCatalog).flat();
      const projectBySlug = new Map(allProjects.map(item => [item.slug, item]));
      const shuffleCatalog = values => {
        const result = [...values];
        for (let index = result.length - 1; index > 0; index--) {
          const swap = Math.floor(Math.random() * (index + 1));
          [result[index], result[swap]] = [result[swap], result[index]];
        }
        return result;
      };
      const homeTrailItems = shuffleCatalog(allProjects.flatMap(item =>
        item.images.map((src, imageIndex) => ({ src, project: item, imageIndex }))
      ));
      let activeProject = projectBySlug.get('karatcore-erp') || allProjects[0];
      let images = activeProject.images;
      const pageFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const pageSection = ({
        'analog.html': 'ANALOG',
        'ai.html': 'AI',
        'aito.html': 'AITO',
        'shows.html': 'SHOWS',
        'about.html': 'ABOUT',
        'contact.html': 'CONTACT'
      })[pageFile] || 'HOME';

      const area = document.querySelector('#trailArea');

      // Awwwards ribbon hover: random centered YEP GIF at 2x reaction size.
      // Project trail images are suspended only while the pointer is over the ribbon.
      let awwwardsHoverActive = false;
      const awwwardsHoverGif = document.createElement('img');
      awwwardsHoverGif.className = 'awwwards-hover-gif';
      awwwardsHoverGif.alt = '';
      awwwardsHoverGif.draggable = false;
      Object.assign(awwwardsHoverGif.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '10000',
        maxWidth: 'min(640px, 90vw)',
        maxHeight: 'min(320px, 70vh)',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        visibility: 'hidden'
      });
      document.body.appendChild(awwwardsHoverGif);

      let previousAwwwardsGif = 0;
      const showAwwwardsHoverGif = () => {
        let index;
        do index = 1 + Math.floor(Math.random() * 4);
        while (index === previousAwwwardsGif);
        previousAwwwardsGif = index;
        awwwardsHoverGif.src = `assets/img/gif/yep-${index}.gif?restart=${Date.now()}`;
        awwwardsHoverGif.style.visibility = 'visible';
      };
      const hideAwwwardsHoverGif = () => {
        awwwardsHoverGif.style.visibility = 'hidden';
        awwwardsHoverGif.removeAttribute('src');
      };

      // Fallen-pill hover prompt.
      const stitchPrompt = document.createElement('div');
      stitchPrompt.className = 'stitch-me-back-prompt';
      stitchPrompt.style.fontFamily = '"EurostileMNExtendedBold", "Eurostile", sans-serif';
      stitchPrompt.style.color = 'var(--cursor-color)';
      stitchPrompt.setAttribute('aria-hidden', 'true');
      'STITCH ME BACK'.split('').forEach((character, index) => {
        const span = document.createElement('span');
        span.textContent = character === ' ' ? '\u00a0' : character;
        span.style.transitionDelay = `${index * 28}ms`;
        stitchPrompt.appendChild(span);
      });
      Object.assign(stitchPrompt.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '9999',
        display: 'flex',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        visibility: 'hidden',
      });
      document.body.appendChild(stitchPrompt);

      const stitchPromptSpans = [...stitchPrompt.children];
      stitchPromptSpans.forEach(span => Object.assign(span.style, {
        display: 'inline-block',
        opacity: '0',
        transform: 'translateY(12px)',
        transition: 'opacity .32s ease, transform .42s cubic-bezier(.22, 1, .36, 1)'
      }));

      let stitchPromptHideTimer = 0;
      const showStitchPrompt = () => {
        window.clearTimeout(stitchPromptHideTimer);
        stitchPromptHideTimer = 0;
        stitchPrompt.style.visibility = 'visible';
        requestAnimationFrame(() => {
          stitchPromptSpans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
        });
      };

      const hideStitchPrompt = () => {
        stitchPromptSpans.forEach((span, index) => {
          span.style.transitionDelay = `${(stitchPromptSpans.length - 1 - index) * 18}ms`;
          span.style.opacity = '0';
          span.style.transform = 'translateY(-8px)';
        });
        window.clearTimeout(stitchPromptHideTimer);
        stitchPromptHideTimer = window.setTimeout(() => {
          stitchPrompt.style.visibility = 'hidden';
          stitchPromptSpans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 28}ms`;
            span.style.transform = 'translateY(12px)';
          });
          stitchPromptHideTimer = 0;
        }, 500);
      };

      document.addEventListener('pointerover', event => {
        if (matchMedia(mobileLayoutQuery).matches) return;
        const ribbon = event.target.closest?.('.awwwards-badge');
        if (!ribbon || ribbon.contains(event.relatedTarget)) return;
        awwwardsHoverActive = true;
        cancelIdleImage();
        document.querySelectorAll('.trail-image').forEach(image => image.remove());
        latestTrailImage = null;
        showAwwwardsHoverGif();
      });

      document.addEventListener('pointerout', event => {
        if (matchMedia(mobileLayoutQuery).matches) return;
        const ribbon = event.target.closest?.('.awwwards-badge');
        if (!ribbon || ribbon.contains(event.relatedTarget)) return;
        awwwardsHoverActive = false;
        hideAwwwardsHoverGif();
        previousX = -999;
        previousY = -999;
      });

      const viewer = document.querySelector('#viewer');
      const viewerImage = document.querySelector('#viewerImage');
      const viewerVideo = document.querySelector('#viewerVideo');
      const viewerStaticPage = document.querySelector('#viewerStaticPage');
      const viewerStaticTitle = document.querySelector('#viewerStaticTitle');
      const viewerStaticImage = document.querySelector('#viewerStaticImage');
      const viewerStaticContent = document.querySelector('.viewer-static-content');
      const viewerStaticCopy = document.querySelector('#viewerStaticCopy');
      const viewerInfoPrompt = document.querySelector('#viewerInfoPrompt');
      const viewerInfoPromptLabel = document.querySelector('#viewerInfoPromptLabel');
      const viewerInfoBack = document.querySelector('#viewerInfoBack');
      const viewerNextImage = document.querySelector('#viewerNextImage');
      const viewerNextZone = document.querySelector('#viewerNextZone');
      const viewerClose = document.querySelector('#viewerClose');
      const viewerTabs = document.querySelector('#viewerTabs');
      const viewerBreadcrumbPath = document.querySelector('#viewerBreadcrumbPath');
      const viewerBreadcrumbImage = document.querySelector('#viewerBreadcrumbImage');
      const viewerMenu = document.querySelector('#viewerMenu');
      const viewerMenuHighlight = document.querySelector('#viewerMenuHighlight');
      const viewerMenuScrollCue = document.querySelector('#viewerMenuScrollCue');
      const viewerMenuList = document.querySelector('#viewerMenuList');
      const viewerMenuPreview = document.querySelector('#viewerMenuPreview');
      const mobileWheelThumbRow = document.querySelector('#mobileWheelThumbRow');
      const mobileWheelCountPill = document.querySelector('#mobileWheelCountPill');
      document.body.appendChild(mobileWheelCountPill);
      const viewerThumbnails = document.querySelector('#viewerThumbnails');
      const asciiMask = document.querySelector('#asciiMask');
      const mobileSectionNav = document.querySelector('#mobileSectionNav');
      const mobileStaticClose = document.querySelector('#mobileStaticClose');
      const mobileStaticLogo = document.querySelector('.mobile-static-logo');
      const mobileStaticTopbar = document.querySelector('#mobileStaticTopbar');
      const mobileProjectDetail = document.querySelector('#mobileProjectDetail');
      const mobileProjectDetailTitle = document.querySelector('#mobileProjectDetailTitle');
      const mobileProjectDetailImages = document.querySelector('#mobileProjectDetailImages');
      const mobileProjectDetailBackTop = document.querySelector('#mobileProjectDetailBackTop');
      const mobileProjectDetailPrevious = document.querySelector('#mobileProjectDetailPrevious');
      const mobileProjectDetailNext = document.querySelector('#mobileProjectDetailNext');
      const matchReaction = document.querySelector('#matchReaction');
      const pointsDisplay = document.querySelector('#pointsDisplay');
      const pointsValue = document.querySelector('#pointsValue');
      const pointsBorder = document.querySelector('#pointsBorder');
      const pointsBorderRect = pointsBorder.querySelector('rect');
      const cursorAction = document.querySelector('#cursorAction');
      const cursorActionLabel = document.querySelector('#cursorActionLabel');
      const cursorActionCount = document.querySelector('#cursorActionCount');
      const updateCursorPillPosition = createCursorPillFollower(cursorActionCount);
      const cursorNavArrowGroup = document.querySelector('#cursorNavArrowGroup');
      const cursorNavArrow = document.querySelector('#cursorNavArrow');
      const menuHoverSound = new Audio('assets/sounds/onscroll.mp3');
      menuHoverSound.preload = 'auto';
      function warmUpMenuHoverSound() {
        menuHoverSound.load();
        menuHoverSound.muted = true;
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().then(() => {
          menuHoverSound.pause();
          menuHoverSound.currentTime = 0;
          menuHoverSound.muted = false;
        }).catch(() => { menuHoverSound.muted = false; });
      }
      window.addEventListener('pointermove', warmUpMenuHoverSound, { once: true });
      window.addEventListener('pointerdown', warmUpMenuHoverSound, { once: true });
      window.addEventListener('touchstart', warmUpMenuHoverSound, { once: true, passive: true });
      const closeTextSound = new Audio('assets/sounds/close.mp3');
      closeTextSound.preload = 'auto';
      function playUiSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
      let mobileWheelSoundUnlocked = false;
      function unlockMobileWheelSound() {
        if (mobileWheelSoundUnlocked) return;
        menuHoverSound.muted = true;
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().then(() => {
          menuHoverSound.pause();
          menuHoverSound.currentTime = 0;
          menuHoverSound.muted = false;
          mobileWheelSoundUnlocked = true;
        }).catch(() => { menuHoverSound.muted = false; });
      }
      const maskContext = asciiMask.getContext('2d');
      const glyphs = 'αβγδεζθλμπσφψΩ∞∇∂∑∏∫≈≠≤≥⠀⠁⠂⠄⠈⠐⠠⡀⠃⠅⠉⠑⠡⡁⠆⠊ᚠᚢᚦᚪᚱᚷᚻᚾᛁᛃᛇᛏᛒᛖᛚᛟ■□▪▫▲△▶▼◆◇○●◐◑◒◓▓▒░▐▌▄▀█⌘⌥⌦⌫⎔⎛⎞⎡⎤⎧⎪⎯⎰⎲⎷⏎';
      let imageIndex = 0;
      let previousX = -999;
      let previousY = -999;
      let topLayer = 4;
      let latestTrailImage = null;
      let trailIdleTimer = 0;
      let lastTrailX = 0;
      let lastTrailY = 0;
      let viewerTransitioning = false;
      let viewerImageIndex = 0;
      let activeViewerSection = Object.keys(projectCatalog)[0] || 'FULL-STACK';
      let nextImageTransitioning = false;
      let viewerInfoOpen = false;
      let viewerInfoFlipping = false;
      let viewerInfoHintTimer = 0;
      let viewerInfoHintHideTimer = 0;
      let viewerInfoTypeToken = 0;
      let viewerInfoFlipAxis = 'Y';
      let cursorCountTimer = 0;
      let pointerClientX = 0;
      let pointerClientY = 0;
      let hoveredMenuEntry = null;
      let menuScrollHoverFrame = 0;
      let menuCategoryTransitioning = false;
      let wasInsideViewerImage = false;
      let lastViewerImagePoint = null;
      let lastViewerOutsidePoint = null;
      let fluidPullFrame = 0;
      let fluidPullCanvas = null;
      let fluidPullTargetImage = null;
      let displayedArrowSide = null;
      let requestedArrowSide = null;
      let arrowSwapToken = 0;
      let asciiGrid = [];
      let nextAsciiGrid = [];
      let shiftDirections = [];
      let samplePixels = null;
      let maskWidth = 0;
      let maskHeight = 0;
      let asciiCols = 0;
      let asciiRows = 0;
      let asciiFontSize = 16;
      const minimumDistance = 95;
      const transitionDuration = 900;
      let pillDragActive = false;
      let suppressPhotoClicks = false;
      let reactionState = '';
      let reactionHideTimer = 0;
      let reactionActive = false;
      let homeNavigationTransitioning = false;
      const reactionSequence = { nope: 0, yep: 0 };
      let points = 0;
      const viewerProjects = projectCatalog;

      (() => {
        function hslToRgb(h, s, l) {
          const chroma = (1 - Math.abs(2 * l - 1)) * s;
          const second = chroma * (1 - Math.abs((h / 60) % 2 - 1));
          const match = l - chroma / 2;
          let red = 0;
          let green = 0;
          let blue = 0;
          if (h < 60) [red, green] = [chroma, second];
          else if (h < 120) [red, green] = [second, chroma];
          else if (h < 180) [green, blue] = [chroma, second];
          else if (h < 240) [green, blue] = [second, chroma];
          else if (h < 300) [red, blue] = [second, chroma];
          else [red, blue] = [chroma, second];
          return [red, green, blue].map(channel => Math.round((channel + match) * 255));
        }

        function relativeLuminance(red, green, blue) {
          const linear = value => {
            value /= 255;
            return value <= .03928 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
          };
          return .2126 * linear(red) + .7152 * linear(green) + .0722 * linear(blue);
        }

        function randomAccessibleVibrantColor() {
          const hue = Math.random() * 360;
          const saturation = .85;
          let lightness = .55;
          let color = hslToRgb(hue, saturation, lightness);
          while ((relativeLuminance(...color) + .05) / .05 < 4.5 && lightness < .95) {
            lightness += .02;
            color = hslToRgb(hue, saturation, lightness);
          }
          return color;
        }

        const cycleDuration = 5000;
        const root = document.documentElement;
        let from = randomAccessibleVibrantColor();
        let to = randomAccessibleVibrantColor();
        let cycleStart = performance.now();

        function interpolateCursorColor(now) {
          const progress = Math.min(1, (now - cycleStart) / cycleDuration);
          const red = Math.round(from[0] + (to[0] - from[0]) * progress);
          const green = Math.round(from[1] + (to[1] - from[1]) * progress);
          const blue = Math.round(from[2] + (to[2] - from[2]) * progress);
          root.style.setProperty('--cursor-color', `rgb(${red}, ${green}, ${blue})`);
          if (progress >= 1) {
            from = to;
            to = randomAccessibleVibrantColor();
            cycleStart = now;
          }
          requestAnimationFrame(interpolateCursorColor);
        }
        requestAnimationFrame(interpolateCursorColor);
      })();

      function syncPointsBorder() {
        const width = pointsDisplay.offsetWidth;
        const height = pointsDisplay.offsetHeight;
        pointsBorder.setAttribute('viewBox', `0 0 ${width} ${height}`);
        pointsBorderRect.setAttribute('x', '.5');
        pointsBorderRect.setAttribute('y', '.5');
        pointsBorderRect.setAttribute('width', String(width - 1));
        pointsBorderRect.setAttribute('height', String(height - 1));
        pointsBorderRect.setAttribute('rx', String((height - 1) / 2));
      }
      syncPointsBorder();
      document.fonts?.ready.then(() => {
        if (!pointsDisplay.classList.contains('falling')) syncPointsBorder();
      });

      async function navigateFromHome(href) {
        if (!href || homeNavigationTransitioning) return;
        const isLabzDestination = (() => {
          try {
            const target = new URL(href, location.href);
            return target.origin === location.origin && /\/labz\/?(?:index\.html)?$/.test(target.pathname);
          } catch (_) {
            return false;
          }
        })();
        if (isLabzDestination) {
          homeNavigationTransitioning = true;
          cancelIdleImage();
          document.body.classList.add('labz-page-exit');
          const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
          const mobileSweep = matchMedia('(max-width: 1100px), (hover: none) and (pointer: coarse)').matches;
          window.setTimeout(() => { location.href = href; }, mobileSweep ? 1120 : (reducedMotion ? 260 : 1120));
          return;
        }
        if (/^https?:/i.test(href)) {
          window.open(href, '_blank', 'noopener');
          return;
        }
        if (pageSection !== 'HOME') {
          location.href = href;
          return;
        }
        homeNavigationTransitioning = true;
        cancelIdleImage();
        const elements = [
          ...document.querySelectorAll('.nav-pill, .tokonoma-logo, .trail-image'),
          pointsDisplay
        ].filter(Boolean).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const fades = elements.map((element, index) => element.animate([
          { opacity: getComputedStyle(element).opacity || 1, translate: '0 0' },
          { opacity: 0, translate: '0 -18px' }
        ], {
          duration: 320,
          delay: Math.min(index * 28, 280),
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        }));
        await Promise.all(fades.map(animation => animation.finished.catch(() => {})));
        location.href = href;
      }

      window.addEventListener('pageshow', () => {
        homeNavigationTransitioning = false;
        document.body.classList.remove('labz-page-exit');
      });

      function dropNavigationPills({ mobilePhysics = false } = {}) {
        const pills = [...document.querySelectorAll('.nav-pill')];
        const originalLayout = pills.map(pill => ({ pill, rect: pill.getBoundingClientRect() }));
        const viewportWidth = () => mobilePhysics
          ? Math.round(window.visualViewport?.width || document.documentElement.clientWidth || innerWidth)
          : innerWidth;
        const viewportHeight = () => mobilePhysics
          ? Math.round(window.visualViewport?.height || document.documentElement.clientHeight || innerHeight)
          : innerHeight;
        let physicsViewportWidth = viewportWidth();
        let physicsViewportHeight = viewportHeight();
        const mobileSpawnStart = performance.now() + 80;
        const logo = document.querySelector('.tokonoma-logo');
        const logoRect = logo.getBoundingClientRect();
        Object.assign(logo.style, {
          position: 'fixed',
          left: logoRect.left + 'px',
          top: logoRect.top + 'px'
        });
        const bodies = originalLayout.map(({ pill, rect }, index) => {
          const homeAnchor = pill.closest('.brand-nav')
            ? 'left'
            : pill.closest('.center-nav')
              ? 'center'
              : 'right';
          const slot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const slotFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const blackEdge = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const whiteDashes = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const radius = Math.max(0, (Math.min(rect.width, rect.height) - 1) / 2);
          slot.setAttribute('class', 'pill-slot');
          slot.setAttribute('aria-hidden', 'true');
          slot.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
          slotFill.setAttribute('class', 'slot-fill');
          slotFill.setAttribute('x', '.5');
          slotFill.setAttribute('y', '.5');
          slotFill.setAttribute('width', String(rect.width - 1));
          slotFill.setAttribute('height', String(rect.height - 1));
          slotFill.setAttribute('rx', String(radius));
          [blackEdge, whiteDashes].forEach(edge => {
            edge.setAttribute('x', '.5');
            edge.setAttribute('y', '.5');
            edge.setAttribute('width', String(rect.width - 1));
            edge.setAttribute('height', String(rect.height - 1));
            edge.setAttribute('rx', String(radius));
            edge.setAttribute('fill', 'none');
            edge.setAttribute('stroke-width', '1');
            edge.setAttribute('vector-effect', 'non-scaling-stroke');
          });
          blackEdge.setAttribute('stroke', '#000');
          whiteDashes.setAttribute('stroke', '#fff');
          whiteDashes.setAttribute('class', 'ants-white');
          slot.append(slotFill, blackEdge, whiteDashes);
          Object.assign(slot.style, {
            left: rect.left + 'px',
            top: rect.top + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px'
          });
          document.body.appendChild(slot);

          pill.classList.add('falling');
          Object.assign(pill.style, {
            left: '0px',
            top: '0px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            visibility: mobilePhysics ? 'hidden' : ''
          });
          document.body.appendChild(pill);

          return {
            element: pill,
            slot,
            width: rect.width,
            height: rect.height,
            x: mobilePhysics
              ? rect.width / 2 + 8 + Math.random() * Math.max(0, physicsViewportWidth - rect.width - 16)
              : rect.left + rect.width / 2,
            y: mobilePhysics
              ? -rect.height * (1.35 + Math.random() * .65)
              : rect.top + rect.height / 2,
            homeX: rect.left + rect.width / 2,
            homeY: rect.top + rect.height / 2,
            homeAnchor,
            homeHorizontalOffset: homeAnchor === 'left'
              ? rect.left + rect.width / 2
              : homeAnchor === 'center'
                ? rect.left + rect.width / 2 - physicsViewportWidth / 2
                : physicsViewportWidth - (rect.left + rect.width / 2),
            homeVerticalOffset: rect.top + rect.height / 2,
            vx: mobilePhysics ? -110 + Math.random() * 220 : ([-95, 62, 80, -55, 72, -88, 54, 90][index] || 0),
            vy: mobilePhysics ? Math.random() * 45 : 0,
            angle: 0,
            angularVelocity: mobilePhysics ? -8 + Math.random() * 16 : ([-7, 4, 5, -4, 6, -5, 4, -6][index] || 0),
            mass: Math.max(1, rect.width * rect.height),
            supported: false,
            dragging: false,
            dragMoved: false,
            snapped: false,
            snapping: false,
            active: !mobilePhysics,
            pendingFloorReentry: false,
            spawnAt: mobilePhysics ? mobileSpawnStart + index * 620 + Math.random() * 160 : 0
          };
        });

        // Only fallen nav pills trigger the centered STITCH ME BACK prompt.
        // The Awwwards ribbon is intentionally excluded.
        bodies.forEach(body => {
          if (!body.element.classList.contains('nav-pill')) return;
          body.element.addEventListener('pointerenter', () => {
            if (body.snapped || body.snapping || body.dragging) return;
            const extent = extents(body);
            const atBottom = body.y + extent.y >= physicsViewportHeight - 8;
            const restingOnAnotherPill = body.supported;
            if (atBottom || restingOnAnotherPill) showStitchPrompt();
          });
          body.element.addEventListener('pointerleave', hideStitchPrompt);
        });

        let pointsBody = null;
        if (!mobilePhysics) {
          syncPointsBorder();
          const pointsRect = pointsDisplay.getBoundingClientRect();
          pointsDisplay.classList.add('falling', 'static');
          Object.assign(pointsDisplay.style, {
            left: '0px',
            top: '0px',
            width: pointsRect.width + 'px',
            height: pointsRect.height + 'px'
          });
          document.body.appendChild(pointsDisplay);
          pointsBody = {
            element: pointsDisplay,
            slot: null,
            width: pointsRect.width,
            height: pointsRect.height,
            x: pointsRect.left + pointsRect.width / 2,
            y: pointsRect.top + pointsRect.height / 2,
            homeX: 0,
            homeY: 0,
            vx: -42,
            vy: 0,
            angle: 0,
            angularVelocity: -2,
            mass: Math.max(1, pointsRect.width * pointsRect.height),
            supported: false,
            dragging: false,
            dragMoved: false,
            snapped: true,
            snapping: false,
            active: true
          };
          bodies.push(pointsBody);
        }

        // Awwwards ribbon participates in physics on desktop AND mobile.
        // On mobile it is deliberately the first object to fall.
        const awwwardsBody = createAwwwardsBody(physicsViewportWidth);
        if (awwwardsBody) {
          if (mobilePhysics) {
            awwwardsBody.spawnAt = performance.now() + 20;
            awwwardsBody.y = -awwwardsBody.height;
            awwwardsBody.vy = 0;
          }
          bodies.push(awwwardsBody);
        }

        function reconcilePhysicsViewport() {
          const nextWidth = viewportWidth();
          const nextHeight = viewportHeight();
          if (nextWidth === physicsViewportWidth && nextHeight === physicsViewportHeight) return;

          bodies.forEach(body => {
            if (body === pointsBody) {
              body.x = nextWidth - 32 - body.width / 2;
              body.y = nextHeight - 32 - body.height / 2;
              body.vx = 0;
              body.vy = 0;
              body.angle = 0;
              body.angularVelocity = 0;
              return;
            }

            const oldExtent = extents(body);
            const wasOnGround = body.y + oldExtent.y >= physicsViewportHeight - 2;
            if (body.homeAnchor === 'left') {
              body.homeX = body.homeHorizontalOffset;
            } else if (body.homeAnchor === 'center') {
              body.homeX = nextWidth / 2 + body.homeHorizontalOffset;
            } else {
              body.homeX = nextWidth - body.homeHorizontalOffset;
            }
            body.homeY = body.homeVerticalOffset;

            if (body.slot) {
              body.slot.style.left = body.homeX - body.width / 2 + 'px';
              body.slot.style.top = body.homeY - body.height / 2 + 'px';
            }

            if (body.snapped && !body.snapping) {
              body.x = body.homeX;
              body.y = body.homeY;
              body.angle = 0;
            } else {
              body.x = body.x / physicsViewportWidth * nextWidth;
              body.y = wasOnGround
                ? nextHeight - extents(body).y
                : body.y / physicsViewportHeight * nextHeight;
              containBody(body);
            }
          });

          physicsViewportWidth = nextWidth;
          physicsViewportHeight = nextHeight;
        }

        window.addEventListener('resize', reconcilePhysicsViewport);
        window.visualViewport?.addEventListener('resize', reconcilePhysicsViewport);

        function resizePointsPill() {
          if (!pointsBody) return;
          const rightEdge = pointsBody.x + pointsBody.width / 2;
          pointsDisplay.style.width = 'auto';
          pointsDisplay.style.height = 'auto';
          const width = pointsDisplay.offsetWidth;
          const height = pointsDisplay.offsetHeight;
          pointsBody.width = width;
          pointsBody.height = height;
          pointsBody.x = rightEdge - width / 2;
          pointsBody.mass = Math.max(1, width * height);
          pointsDisplay.style.width = width + 'px';
          pointsDisplay.style.height = height + 'px';
          syncPointsBorder();
        }

        function overlapsSlot(body, target, tolerance = 0) {
          const currentShape = capsule(body);
          const homeShape = capsule({
            width: target.width,
            height: target.height,
            x: target.homeX,
            y: target.homeY,
            angle: 0
          });
          const closest = closestSegmentPoints(currentShape, homeShape);
          return Math.hypot(
            closest.secondX - closest.firstX,
            closest.secondY - closest.firstY
          ) <= currentShape.radius + homeShape.radius + tolerance;
        }

        function isOverOwnSlot(body) {
          return overlapsSlot(body, body);
        }

        function clearWrongTargets(preserveReaction = false) {
          bodies.forEach(candidate => candidate.slot?.classList.remove('wrong-target'));
          if (!preserveReaction) hideReaction();
        }

        // Awwwards is a square/ribbon, not a pill: dropping it on any pill slot is an error.
        let ribbonErrorPrompt = null;
        let ribbonErrorHideTimer = 0;
        function showRibbonErrorPrompt() {
          window.clearTimeout(ribbonErrorHideTimer);
          if (!ribbonErrorPrompt) {
            ribbonErrorPrompt = document.createElement('div');
            ribbonErrorPrompt.className = 'stitch-me-back-prompt ribbon-pill-error';
            ribbonErrorPrompt.style.fontFamily = '"EurostileMNExtendedBold", "Eurostile", sans-serif';
            ribbonErrorPrompt.style.color = 'var(--cursor-color)';
            ribbonErrorPrompt.setAttribute('aria-hidden', 'true');
            '404: PILL NOT FOUND'.split('').forEach((character, index) => {
              const span = document.createElement('span');
              span.textContent = character === ' ' ? '\u00a0' : character;
              span.style.transitionDelay = `${index * 28}ms`;
              Object.assign(span.style, {
                display: 'inline-block',
                opacity: '0',
                transform: 'translateY(12px)',
                transition: 'opacity .32s ease, transform .42s cubic-bezier(.22, 1, .36, 1)'
              });
              ribbonErrorPrompt.appendChild(span);
            });
            Object.assign(ribbonErrorPrompt.style, {
              position: 'fixed',
              left: '50%',
              top: '50%',
              zIndex: '10001',
              display: 'flex',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              visibility: 'hidden'
            });
            document.body.appendChild(ribbonErrorPrompt);
          }
          // Place the 404 label 32px above the centered Awwwards GIF.
          const gifRect = awwwardsHoverGif.getBoundingClientRect();
          if (gifRect.height > 0) {
            ribbonErrorPrompt.style.top = `${gifRect.top - 32}px`;
            ribbonErrorPrompt.style.transform = 'translate(-50%, -100%)';
          } else {
            ribbonErrorPrompt.style.top = '50%';
            ribbonErrorPrompt.style.transform = 'translate(-50%, calc(-50% - 192px))';
          }
          ribbonErrorPrompt.style.visibility = 'visible';
          const spans = [...ribbonErrorPrompt.children];
          spans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 28}ms`;
            span.style.opacity = '0';
            span.style.transform = 'translateY(12px)';
          });
          requestAnimationFrame(() => requestAnimationFrame(() => {
            spans.forEach(span => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0)';
            });
          }));
          ribbonErrorHideTimer = window.setTimeout(() => {
            spans.forEach((span, index) => {
              span.style.transitionDelay = `${(spans.length - 1 - index) * 18}ms`;
              span.style.opacity = '0';
              span.style.transform = 'translateY(-8px)';
            });
            ribbonErrorHideTimer = window.setTimeout(() => {
              ribbonErrorPrompt.style.visibility = 'hidden';
            }, 500);
          }, 900);
        }

        function updateWrongTargets(body) {
          let hasWrongOverlap = false;
          bodies.forEach(candidate => {
            if (!candidate.slot) return;
            const wrongOverlap = candidate !== body && !candidate.snapped &&
              overlapsSlot(body, candidate);
            candidate.slot.classList.toggle('wrong-target', wrongOverlap);
            hasWrongOverlap ||= wrongOverlap;
          });
          if (hasWrongOverlap) showReaction('nope');
          else hideReaction();
        }

        function showReaction(state, force = false) {
          window.clearTimeout(reactionHideTimer);
          reactionHideTimer = 0;
          if (!force && reactionActive && reactionState === state) return;
          reactionActive = true;
          reactionState = state;
          const previousIndex = reactionSequence[state];
          do {
            reactionSequence[state] = 1 + Math.floor(Math.random() * 4);
          } while (reactionSequence[state] === previousIndex);
          matchReaction.src =
            `assets/img/gif/${state}-${reactionSequence[state]}.gif?restart=${Date.now()}`;
          matchReaction.classList.remove('exiting');
          matchReaction.classList.add('show');
        }

        function hideReaction(delay = 2000) {
          if (!reactionState || reactionHideTimer) return;
          reactionActive = false;
          reactionHideTimer = window.setTimeout(() => {
            matchReaction.classList.add('exiting');
            reactionHideTimer = window.setTimeout(() => {
              reactionHideTimer = 0;
              reactionState = '';
              matchReaction.classList.add('resetting');
              matchReaction.classList.remove('show', 'exiting');
              void matchReaction.offsetWidth;
              matchReaction.classList.remove('resetting');
            }, 450);
          }, delay);
        }

        function awardPoints(amount) {
          points += amount;
          pointsValue.textContent = points > 0 ? `POINTS +${points}` : `POINTS ${points}`;
          pointsDisplay.classList.toggle('positive', points > 0);
          pointsDisplay.classList.toggle('negative', points < 0);
          resizePointsPill();
        }

        function snapToHome(body) {
          clearWrongTargets();
          showReaction('yep');
          awardPoints(1);
          body.slot.classList.add('correct-target');
          body.snapping = true;
          body.vx = 0;
          body.vy = 0;
          body.angularVelocity = 0;
          body.element.classList.add('snapped');
          const startX = body.x;
          const startY = body.y;
          const startAngle = ((body.angle + 180) % 360 + 360) % 360 - 180;
          const started = performance.now();
          const duration = 440;

          function dock(now) {
            const progress = Math.min(1, (now - started) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            body.x = startX + (body.homeX - startX) * eased;
            body.y = startY + (body.homeY - startY) * eased;
            body.angle = startAngle * (1 - eased);
            if (progress < 1) {
              requestAnimationFrame(dock);
              return;
            }
            body.x = body.homeX;
            body.y = body.homeY;
            body.angle = 0;
            body.snapping = false;
            body.snapped = true;
            body.slot.style.visibility = 'hidden';
            body.slot.classList.remove('correct-target');
            hideReaction();
            window.setTimeout(() => {
              body.snapped = false;
              body.pendingFloorReentry = true;
              body.slot.style.visibility = 'visible';
              body.element.classList.remove('snapped');
            }, 4000);
          }
          requestAnimationFrame(dock);
        }

        function finishDrag(body, event) {
          if (!body.dragging || event.pointerId !== body.pointerId) return;
          event.preventDefault();
          event.stopPropagation();
          const isAwwwardsRibbon = body.element.classList.contains('awwwards-badge');
          const wrongRelease = (Boolean(body.slot) || isAwwwardsRibbon) &&
            event.type === 'pointerup' && body.dragMoved &&
            bodies.some(candidate => candidate.slot && candidate !== body && !candidate.snapped &&
              overlapsSlot(body, candidate, 45));
          clearWrongTargets(wrongRelease);
          const releaseDelay = performance.now() - body.lastPointerTime;
          if (releaseDelay > 80) {
            const retained = Math.max(0, 1 - (releaseDelay - 80) / 220);
            body.vx *= retained;
            body.vy *= retained;
          }
          body.dragging = false;
          body.element.classList.remove('dragging');
          if (wrongRelease) {
            showReaction('nope');
            if (isAwwwardsRibbon) showRibbonErrorPrompt();
            awardPoints(-1);
            hideReaction(900);
            body.angularVelocity += clamp(body.vx / Math.max(body.width, body.height) * 7, -60, 60);
            body.pendingFloorReentry = true;
          } else if (body.slot && body.dragMoved && isOverOwnSlot(body)) {
            snapToHome(body);
          } else {
            body.angularVelocity += clamp(body.vx / Math.max(body.width, body.height) * 7, -60, 60);
          }
          if (body.element.hasPointerCapture(event.pointerId)) {
            body.element.releasePointerCapture(event.pointerId);
          }
          if (event.type === 'pointermove') {
            const endInteraction = () => {
              document.removeEventListener('pointerup', endInteraction, true);
              document.removeEventListener('pointercancel', endInteraction, true);
              pillDragActive = false;
              window.setTimeout(() => { suppressPhotoClicks = false; }, 0);
            };
            document.addEventListener('pointerup', endInteraction, true);
            document.addEventListener('pointercancel', endInteraction, true);
          } else {
            pillDragActive = false;
            window.setTimeout(() => { suppressPhotoClicks = false; }, 0);
          }
        }

        bodies.forEach(body => {
          body.element.addEventListener('pointerdown', event => {
            if (mobilePhysics) return;
            if (event.button !== 0 || body.snapped || body.snapping) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = true;
            body.dragMoved = false;
            body.pointerId = event.pointerId;
            body.dragOffsetX = event.clientX - body.x;
            body.dragOffsetY = event.clientY - body.y;
            body.dragStartX = event.clientX;
            body.dragStartY = event.clientY;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = performance.now();
            body.vx = 0;
            body.vy = 0;
            body.angularVelocity = 0;
            pillDragActive = true;
            suppressPhotoClicks = true;
            body.element.classList.add('dragging');
            body.element.setPointerCapture(event.pointerId);
          });

          body.element.addEventListener('pointermove', event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            const now = performance.now();
            const elapsed = Math.max((now - body.lastPointerTime) / 1000, .008);
            const nextX = event.clientX - body.dragOffsetX;
            const nextY = event.clientY - body.dragOffsetY;
            const instantVX = (event.clientX - body.lastPointerX) / elapsed;
            const instantVY = (event.clientY - body.lastPointerY) / elapsed;
            body.vx = clamp(instantVX, -2400, 2400);
            body.vy = clamp(instantVY, -2400, 2400);
            body.x = nextX;
            body.y = nextY;
            body.dragMoved ||= Math.hypot(
              event.clientX - body.dragStartX,
              event.clientY - body.dragStartY
            ) > 5;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = now;
            if (body.slot || body.element.classList.contains('awwwards-badge')) {
              updateWrongTargets(body);
              if (body.slot && body.dragMoved && isOverOwnSlot(body)) finishDrag(body, event);
            }
          });

          body.element.addEventListener('pointerup', event => finishDrag(body, event));
          body.element.addEventListener('pointercancel', event => finishDrag(body, event));
          body.element.addEventListener('click', event => {
            if (!body.dragMoved) {
              const href = body.element.getAttribute?.('href');
              if (href) {
                event.preventDefault();
                navigateFromHome(href);
              }
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            body.dragMoved = false;
          });
        });

        function capsule(body) {
          const radians = body.angle * Math.PI / 180;
          const horizontal = body.width >= body.height;
          const localX = horizontal ? 1 : 0;
          const localY = horizontal ? 0 : 1;
          const axisX = localX * Math.cos(radians) - localY * Math.sin(radians);
          const axisY = localX * Math.sin(radians) + localY * Math.cos(radians);
          const radius = Math.min(body.width, body.height) / 2;
          const halfSegment = (Math.max(body.width, body.height) - radius * 2) / 2;
          return {
            axisX,
            axisY,
            radius,
            halfSegment,
            ax: body.x - axisX * halfSegment,
            ay: body.y - axisY * halfSegment,
            bx: body.x + axisX * halfSegment,
            by: body.y + axisY * halfSegment
          };
        }

        function extents(body) {
          const shape = capsule(body);
          return {
            x: Math.abs(shape.axisX) * shape.halfSegment + shape.radius,
            y: Math.abs(shape.axisY) * shape.halfSegment + shape.radius
          };
        }

        function clamp(value, minimum, maximum) {
          return Math.max(minimum, Math.min(maximum, value));
        }

        function closestSegmentPoints(first, second) {
          const d1x = first.bx - first.ax;
          const d1y = first.by - first.ay;
          const d2x = second.bx - second.ax;
          const d2y = second.by - second.ay;
          const rx = first.ax - second.ax;
          const ry = first.ay - second.ay;
          const a = d1x * d1x + d1y * d1y;
          const e = d2x * d2x + d2y * d2y;
          const f = d2x * rx + d2y * ry;
          let s = 0;
          let t = 0;

          if (a <= .0001 && e <= .0001) {
            return { firstX: first.ax, firstY: first.ay, secondX: second.ax, secondY: second.ay };
          }
          if (a <= .0001) {
            t = clamp(f / e, 0, 1);
          } else {
            const c = d1x * rx + d1y * ry;
            if (e <= .0001) {
              s = clamp(-c / a, 0, 1);
            } else {
              const b = d1x * d2x + d1y * d2y;
              const denominator = a * e - b * b;
              if (denominator !== 0) s = clamp((b * f - c * e) / denominator, 0, 1);
              t = (b * s + f) / e;
              if (t < 0) {
                t = 0;
                s = clamp(-c / a, 0, 1);
              } else if (t > 1) {
                t = 1;
                s = clamp((b - c) / a, 0, 1);
              }
            }
          }
          return {
            firstX: first.ax + d1x * s,
            firstY: first.ay + d1y * s,
            secondX: second.ax + d2x * t,
            secondY: second.ay + d2y * t
          };
        }

        function resolvePair(first, second) {
          if (!first.active || !second.active) return;
          const firstShape = capsule(first);
          const secondShape = capsule(second);
          const closest = closestSegmentPoints(firstShape, secondShape);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const overlap = firstShape.radius + secondShape.radius - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = second.x - first.x || 1;
            ny = second.y - first.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;

          const inverseFirst = first.dragging || first.snapped || first.snapping ? 0 : 1 / first.mass;
          const inverseSecond = second.dragging || second.snapped || second.snapping ? 0 : 1 / second.mass;
          const inverseTotal = inverseFirst + inverseSecond;
          if (inverseTotal === 0) return;
          first.x -= nx * overlap * inverseFirst / inverseTotal;
          first.y -= ny * overlap * inverseFirst / inverseTotal;
          second.x += nx * overlap * inverseSecond / inverseTotal;
          second.y += ny * overlap * inverseSecond / inverseTotal;

          const relative = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
          if (relative < 0) {
            const impulse = -(1 + .30) * relative / inverseTotal;
            first.vx -= nx * impulse * inverseFirst;
            first.vy -= ny * impulse * inverseFirst;
            second.vx += nx * impulse * inverseSecond;
            second.vy += ny * impulse * inverseSecond;
          }
          if (Math.abs(ny) > .55) {
            if (ny > 0) first.supported = true;
            else second.supported = true;
          }
          const spin = (second.vx - first.vx) * .008;
          if (!first.dragging && !first.snapped && !first.snapping) first.angularVelocity -= spin;
          if (!second.dragging && !second.snapped && !second.snapping) second.angularVelocity += spin;
        }

        function containBody(body, delta = 0) {
          if (!body.active) return;
          const extent = extents(body);
          if (body.x - extent.x < 8) {
            body.x = 8 + extent.x;
            body.vx = Math.abs(body.vx) * .68;
            body.angularVelocity *= -.7;
          } else if (body.x + extent.x > physicsViewportWidth - 8) {
            body.x = physicsViewportWidth - 8 - extent.x;
            body.vx = -Math.abs(body.vx) * .68;
            body.angularVelocity *= -.7;
          }
          if (body.y - extent.y < 0 && (!mobilePhysics || (body.vy < 0 && body.y + extent.y > 0))) {
            body.y = extent.y;
            body.vy = Math.abs(body.vy) * .78;
            body.angularVelocity *= -.7;
          }
          const floor = physicsViewportHeight - (mobilePhysics ? 1 : 0);
          if (body.pendingFloorReentry) {
            if (body.y - extent.y > physicsViewportHeight + extent.y * 2) {
              body.y = -extent.y * (1.2 + Math.random() * .5);
              body.vy = Math.random() * 45;
              body.pendingFloorReentry = false;
            }
            return;
          }
          if (body.y + extent.y > floor) {
            body.y = floor - extent.y;
            body.vy = Math.abs(body.vy) > 72 ? -Math.abs(body.vy) * .31 : 0;
            body.angularVelocity *= .72;
            body.supported = true;
          }
        }

        function tipUnsupportedStandingPill(body, delta) {
          if (!body.supported || body.snapped || body.snapping) return;
          const shape = capsule(body);
          let angle = Math.atan2(shape.axisY, shape.axisX);
          if (angle > Math.PI / 2) angle -= Math.PI;
          if (angle < -Math.PI / 2) angle += Math.PI;

          const lean = Math.abs(angle);
          if (lean > .055) {
            const fallDirection = -Math.sign(angle);

            // A pill balanced on its end should lose balance quickly.
            // Add both rotational fall and a small sideways foot-slip.
            body.angularVelocity += fallDirection * 620 * delta;
            body.vx += fallDirection * 235 * delta;
          }
        }

        let previousTime = performance.now();
        function simulate(now) {
          const delta = Math.min((now - previousTime) / 1000, .02);
          previousTime = now;

          bodies.forEach(body => {
            if (!body.active) {
              if (now < body.spawnAt) return;
              body.active = true;
              body.element.style.visibility = 'visible';
            }
            body.supported = false;
            if (body.dragging || body.snapped || body.snapping) {
              containBody(body);
              return;
            }
            body.vy += (mobilePhysics ? 1050 : 1850) * delta;
            body.x += body.vx * delta;
            body.y += body.vy * delta;
            body.angle += body.angularVelocity * delta;
            body.angularVelocity *= Math.pow(.982, delta * 60);
            body.angularVelocity = clamp(body.angularVelocity, -85, 85);
            if (Math.abs(body.angularVelocity) < .25) body.angularVelocity = 0;

            containBody(body, delta);
          });

          for (let iteration = 0; iteration < 10; iteration++) {
            for (let first = 0; first < bodies.length; first++) {
              for (let second = first + 1; second < bodies.length; second++) {
                resolvePair(bodies[first], bodies[second]);
              }
            }
            bodies.forEach(containBody);
          }

          bodies.forEach(body => tipUnsupportedStandingPill(body, delta));

          // Ground contact friction: pills keep a little momentum, then settle naturally.
          // This avoids both the old endless ice-slide and an over-stiff instant stop.
          bodies.forEach(body => {
            if (!body.active || body.dragging || body.snapped || body.snapping || !body.supported) return;
            const shape = capsule(body);
            let groundAngle = Math.atan2(shape.axisY, shape.axisX);
            if (groundAngle > Math.PI / 2) groundAngle -= Math.PI;
            if (groundAngle < -Math.PI / 2) groundAngle += Math.PI;
            const stillFalling = Math.abs(groundAngle) > .20;

            // While tipping, preserve enough motion for a visible slide/bounce.
            // Once lying down, increase damping so the pill actually comes to rest.
            const groundFriction = Math.pow(
              stillFalling ? (mobilePhysics ? .982 : .978) : (mobilePhysics ? .93 : .90),
              delta * 60
            );
            const spinFriction = Math.pow(stillFalling ? .986 : .91, delta * 60);

            body.vx *= groundFriction;
            body.angularVelocity *= spinFriction;

            if (!stillFalling && Math.abs(body.vx) < 7) body.vx = 0;
            if (!stillFalling && Math.abs(body.angularVelocity) < .8) body.angularVelocity = 0;
          });

          bodies.forEach(body => {
            if (!body.active) return;
            body.element.style.transform =
              `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}deg)`;
          });
          requestAnimationFrame(simulate);
        }
        requestAnimationFrame(simulate);
      }

      document.querySelectorAll('.nav-pill[href]').forEach(pill => {
        pill.addEventListener('click', event => {
          if (pill.classList.contains('falling') || pill.classList.contains('mobile-falling') || event.defaultPrevented) return;
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          const href = pill.getAttribute('href');
          navigateFromHome(href);
        });
      });

      function dropMobileNavigationPills() {
        const pills = [...document.querySelectorAll('.nav-pill')];
        const mobileWidth = () => Math.round(window.visualViewport?.width || document.documentElement.clientWidth || innerWidth);
        const mobileHeight = () => Math.round(window.visualViewport?.height || document.documentElement.clientHeight || innerHeight);
        const started = performance.now() + 80;
        const bodies = pills.map((pill, index) => {
          const rect = pill.getBoundingClientRect();
          const width = Math.min(rect.width, mobileWidth() - 2);
          const height = Math.min(rect.height, 64);
          pill.classList.add('mobile-falling');
          Object.assign(pill.style, {
            position: 'fixed',
            zIndex: '30',
            left: '0px',
            top: '0px',
            width: width + 'px',
            height: height + 'px',
            visibility: 'hidden',
            touchAction: 'none'
          });
          document.body.appendChild(pill);
          return {
            element: pill,
            width,
            height,
            x: width / 2 + Math.random() * Math.max(0, mobileWidth() - width),
            y: -height / 2 - 12 - Math.random() * 50,
            vx: -90 + Math.random() * 180,
            vy: 0,
            angle: -28 + Math.random() * 56,
            angularVelocity: -32 + Math.random() * 64,
            mass: Math.max(1, width * height),
            dragging: false,
            dragMoved: false,
            active: false,
            releaseAt: started + index * 520 + Math.random() * 130
          };
        });

        let previous = performance.now();
        function mobileCapsule(body) {
          const radians = body.angle * Math.PI / 180;
          const horizontal = body.width >= body.height;
          const axisX = horizontal ? Math.cos(radians) : -Math.sin(radians);
          const axisY = horizontal ? Math.sin(radians) : Math.cos(radians);
          const radius = Math.min(body.width, body.height) / 2;
          const halfSegment = (Math.max(body.width, body.height) - radius * 2) / 2;
          return {
            axisX,
            axisY,
            radius,
            halfSegment,
            ax: body.x - axisX * halfSegment,
            ay: body.y - axisY * halfSegment,
            bx: body.x + axisX * halfSegment,
            by: body.y + axisY * halfSegment
          };
        }

        function mobileExtents(body) {
          const shape = mobileCapsule(body);
          return {
            x: Math.abs(shape.axisX) * shape.halfSegment + shape.radius,
            y: Math.abs(shape.axisY) * shape.halfSegment + shape.radius
          };
        }

        function closestMobileSegmentPoints(first, second) {
          const d1x = first.bx - first.ax;
          const d1y = first.by - first.ay;
          const d2x = second.bx - second.ax;
          const d2y = second.by - second.ay;
          const rx = first.ax - second.ax;
          const ry = first.ay - second.ay;
          const a = d1x * d1x + d1y * d1y;
          const e = d2x * d2x + d2y * d2y;
          const f = d2x * rx + d2y * ry;
          const clampMobile = value => Math.max(0, Math.min(1, value));
          let s = 0;
          let t = 0;
          if (a <= .0001 && e <= .0001) {
            return { firstX: first.ax, firstY: first.ay, secondX: second.ax, secondY: second.ay };
          }
          if (a <= .0001) {
            t = clampMobile(f / e);
          } else {
            const c = d1x * rx + d1y * ry;
            if (e <= .0001) {
              s = clampMobile(-c / a);
            } else {
              const b = d1x * d2x + d1y * d2y;
              const denominator = a * e - b * b;
              if (denominator !== 0) s = clampMobile((b * f - c * e) / denominator);
              t = (b * s + f) / e;
              if (t < 0) {
                t = 0;
                s = clampMobile(-c / a);
              } else if (t > 1) {
                t = 1;
                s = clampMobile((b - c) / a);
              }
            }
          }
          return {
            firstX: first.ax + d1x * s,
            firstY: first.ay + d1y * s,
            secondX: second.ax + d2x * t,
            secondY: second.ay + d2y * t
          };
        }

        function resolveMobileCollision(first, second, applySpin = false) {
          if (!first.active || !second.active) return;
          const firstShape = mobileCapsule(first);
          const secondShape = mobileCapsule(second);
          const closest = closestMobileSegmentPoints(firstShape, secondShape);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const collisionSeparation = 3;
          const overlap = firstShape.radius + secondShape.radius + collisionSeparation - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = second.x - first.x || 1;
            ny = second.y - first.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;
          const inverseFirst = first.dragging ? 0 : 1 / first.mass;
          const inverseSecond = second.dragging ? 0 : 1 / second.mass;
          const inverseTotal = inverseFirst + inverseSecond;
          if (inverseTotal === 0) return;
          first.x -= nx * overlap * inverseFirst / inverseTotal;
          first.y -= ny * overlap * inverseFirst / inverseTotal;
          second.x += nx * overlap * inverseSecond / inverseTotal;
          second.y += ny * overlap * inverseSecond / inverseTotal;
          const relative = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
          if (relative < 0) {
            const impulse = -(1 + .30) * relative / inverseTotal;
            first.vx -= nx * impulse * inverseFirst;
            first.vy -= ny * impulse * inverseFirst;
            second.vx += nx * impulse * inverseSecond;
            second.vy += ny * impulse * inverseSecond;
          }
          if (applySpin) {
            const spin = (second.vx - first.vx) * .004;
            first.angularVelocity -= spin;
            second.angularVelocity += spin;
          }
        }

        function containMobileBody(body) {
          const width = mobileWidth();
          const floor = mobileHeight() - 1;
          const extent = mobileExtents(body);
          if (body.x - extent.x < 0) {
            body.x = extent.x;
            body.vx = Math.abs(body.vx) * .55;
            body.angularVelocity *= -.7;
          } else if (body.x + extent.x > width) {
            body.x = width - extent.x;
            body.vx = -Math.abs(body.vx) * .55;
            body.angularVelocity *= -.7;
          }
          if (body.y + extent.y > floor) {
            body.y = floor - extent.y;
            body.vy = Math.abs(body.vy) > 90 ? -Math.abs(body.vy) * .27 : 0;
            body.vx *= .992;
            body.angularVelocity *= .86;
          }
        }

        function simulateMobile(now) {
          const delta = Math.min((now - previous) / 1000, .02);
          previous = now;
          bodies.forEach(body => {
            if (!body.active) {
              if (now < body.releaseAt) return;
              body.active = true;
              body.element.style.visibility = 'visible';
            }
            if (body.dragging) {
              containMobileBody(body);
              return;
            }
            body.vy += 1200 * delta;
            body.x += body.vx * delta;
            body.y += body.vy * delta;
            body.angle += body.angularVelocity * delta;
            body.angularVelocity *= Math.pow(.955, delta * 60);
            if (Math.abs(body.angularVelocity) < .35) body.angularVelocity = 0;
            containMobileBody(body);
          });
          for (let iteration = 0; iteration < 40; iteration++) {
            for (let first = 0; first < bodies.length; first++) {
              for (let second = first + 1; second < bodies.length; second++) {
                resolveMobileCollision(bodies[first], bodies[second], iteration === 0);
              }
            }
            bodies.forEach(body => body.active && containMobileBody(body));
          }
          bodies.forEach(body => {
            if (!body.active) return;
            body.element.style.transform =
              `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}deg)`;
          });
          requestAnimationFrame(simulateMobile);
        }

        bodies.forEach(body => {
          body.element.addEventListener('pointerdown', event => {
            if (event.button !== 0 || !body.active) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = true;
            body.dragMoved = false;
            body.pointerId = event.pointerId;
            body.dragOffsetX = event.clientX - body.x;
            body.dragOffsetY = event.clientY - body.y;
            body.dragStartX = event.clientX;
            body.dragStartY = event.clientY;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = performance.now();
            body.vx = 0;
            body.vy = 0;
            body.angularVelocity = 0;
            body.element.setPointerCapture(event.pointerId);
          });
          body.element.addEventListener('pointermove', event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            const now = performance.now();
            const elapsed = Math.max((now - body.lastPointerTime) / 1000, .008);
            body.x = event.clientX - body.dragOffsetX;
            body.y = event.clientY - body.dragOffsetY;
            body.vx = Math.max(-1800, Math.min(1800, (event.clientX - body.lastPointerX) / elapsed));
            body.vy = Math.max(-1800, Math.min(1800, (event.clientY - body.lastPointerY) / elapsed));
            body.dragMoved ||= Math.hypot(event.clientX - body.dragStartX, event.clientY - body.dragStartY) > 6;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = now;
            containMobileBody(body);
          });
          const releaseMobilePill = event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = false;
            if (body.element.hasPointerCapture(event.pointerId)) body.element.releasePointerCapture(event.pointerId);
            if (!body.dragMoved && event.type === 'pointerup') {
              navigateFromHome(body.element.getAttribute('href'));
            } else if (body.dragMoved) {
              body.angularVelocity += Math.max(-55, Math.min(55, body.vx / Math.max(body.width, body.height) * 6));
            }
            body.dragMoved = false;
          };
          body.element.addEventListener('pointerup', releaseMobilePill);
          body.element.addEventListener('pointercancel', releaseMobilePill);
        });
        requestAnimationFrame(simulateMobile);
      }

      if (document.documentElement.classList.contains('mobile-index')) {
        const startMobileNavigation = () => requestAnimationFrame(dropMobileNavigationPills);
        if (document.fonts?.ready) document.fonts.ready.then(startMobileNavigation);
        else startMobileNavigation();
      } else if (!matchMedia(mobileLayoutQuery).matches) {
        window.setTimeout(dropNavigationPills, 4000);
      }

      images.forEach(src => { const image = new Image(); image.src = src; });

      function randomGlyph() {
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }

      function shuffle(items) {
        for (let index = items.length - 1; index > 0; index--) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
        }
        return items;
      }

      function configureMask() {
        const rect = viewerImage.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        maskWidth = rect.width;
        maskHeight = rect.height;
        asciiFontSize = Math.max(12, Math.min(16, Math.round(rect.width / 70)));
        asciiCols = Math.ceil(maskWidth / asciiFontSize);
        asciiRows = Math.ceil(maskHeight / asciiFontSize);

        asciiMask.style.left = rect.left + 'px';
        asciiMask.style.top = rect.top + 'px';
        asciiMask.style.width = rect.width + 'px';
        asciiMask.style.height = rect.height + 'px';
        asciiMask.width = Math.max(1, Math.round(rect.width * ratio));
        asciiMask.height = Math.max(1, Math.round(rect.height * ratio));
        maskContext.setTransform(ratio, 0, 0, ratio, 0, 0);
        maskContext.textAlign = 'center';
        maskContext.textBaseline = 'middle';
        maskContext.font = `${asciiFontSize}px EurostileMNExtendedBold, Arial, "Arial Unicode MS", sans-serif`;

        const total = asciiCols * asciiRows;
        asciiGrid = Array.from({ length: total }, () => Math.floor(Math.random() * glyphs.length));
        nextAsciiGrid = new Array(total);
        shiftDirections = Array.from({ length: total }, (_, index) => {
          const x = index % asciiCols;
          const y = Math.floor(index / asciiCols);
          const regionX = Math.floor(x / 10);
          const regionY = Math.floor(y / 8);
          return 1 + Math.abs(((regionX * 3 + regionY * 5) % 8));
        });

        const sampler = document.createElement('canvas');
        sampler.width = Math.max(1, Math.round(maskWidth));
        sampler.height = Math.max(1, Math.round(maskHeight));
        const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
        try {
          samplerContext.drawImage(viewerImage, 0, 0, sampler.width, sampler.height);
          samplePixels = samplerContext.getImageData(0, 0, sampler.width, sampler.height).data;
        } catch (error) {
          samplePixels = null;
        }
      }

      function hashNoise(x, y) {
        const value = Math.sin(x * 127.1 + y * 311.7 + 74.7) * 43758.5453;
        return value - Math.floor(value);
      }

      function smoothNoise(x, y) {
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const tx = x - x0;
        const ty = y - y0;
        const sx = tx * tx * (3 - 2 * tx);
        const sy = ty * ty * (3 - 2 * ty);
        const a = hashNoise(x0, y0);
        const b = hashNoise(x0 + 1, y0);
        const c = hashNoise(x0, y0 + 1);
        const d = hashNoise(x0 + 1, y0 + 1);
        return (a + (b - a) * sx) + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sy;
      }

      function updateAsciiGrid(frameNumber) {
        for (let y = 0; y < asciiRows; y++) {
          for (let x = 0; x < asciiCols; x++) {
            const index = y * asciiCols + x;
            const direction = shiftDirections[index];
            let sourceX = x;
            let sourceY = y;
            if (direction === 1) sourceX--;
            if (direction === 2) sourceX++;
            if (direction === 3) sourceY++;
            if (direction === 4) sourceY--;
            if (direction === 5) { sourceX--; sourceY++; }
            if (direction === 6) { sourceX--; sourceY--; }
            if (direction === 7) { sourceX++; sourceY++; }
            if (direction === 8) { sourceX++; sourceY--; }
            sourceX = Math.max(0, Math.min(asciiCols - 1, sourceX));
            sourceY = Math.max(0, Math.min(asciiRows - 1, sourceY));
            nextAsciiGrid[index] = asciiGrid[sourceY * asciiCols + sourceX];
          }
        }
        [asciiGrid, nextAsciiGrid] = [nextAsciiGrid, asciiGrid];

        for (let count = 0; count < 40; count++) {
          const index = Math.floor(Math.random() * asciiGrid.length);
          asciiGrid[index] = Math.floor(Math.random() * glyphs.length);
        }
        for (let x = 0; x < asciiCols; x++) {
          asciiGrid[x] = Math.floor(Math.random() * glyphs.length);
          asciiGrid[(asciiRows - 1) * asciiCols + x] = Math.floor(Math.random() * glyphs.length);
        }
        if (frameNumber % 45 === 0) shuffle(shiftDirections);
      }

      function sampledColor(x, y) {
        if (!samplePixels) return '#fff';
        const sx = Math.max(0, Math.min(Math.round(maskWidth) - 1, Math.round(x)));
        const sy = Math.max(0, Math.min(Math.round(maskHeight) - 1, Math.round(y)));
        const index = (sy * Math.round(maskWidth) + sx) * 4;
        return `rgb(${samplePixels[index]},${samplePixels[index + 1]},${samplePixels[index + 2]})`;
      }

      function renderProcessingMask(progress, frameNumber) {
        maskContext.globalCompositeOperation = 'source-over';
        maskContext.clearRect(0, 0, maskWidth, maskHeight);
        maskContext.fillStyle = '#000';
        maskContext.fillRect(0, 0, maskWidth, maskHeight);
        if (frameNumber % 2 === 0) updateAsciiGrid(Math.floor(frameNumber / 2));

        for (let y = 0; y < asciiRows; y++) {
          for (let x = 0; x < asciiCols; x++) {
            const px = x * asciiFontSize;
            const py = y * asciiFontSize;
            const organic = smoothNoise(x * .115 + frameNumber * .003, y * .115 + frameNumber * .002);
            const edgeSoftness = .18;
            const threshold = progress * (1 + edgeSoftness) - edgeSoftness / 2;

            if (organic < threshold) {
              maskContext.clearRect(px, py, asciiFontSize + 1, asciiFontSize + 1);
            } else {
              maskContext.fillStyle = sampledColor(px + asciiFontSize / 2, py + asciiFontSize / 2);
              maskContext.fillText(
                glyphs[asciiGrid[y * asciiCols + x]],
                px + asciiFontSize / 2,
                py + asciiFontSize / 2
              );
            }
          }
        }
      }

      function animateMask(direction, duration = transitionDuration, synchronizedStart = null) {
        return new Promise(resolve => {
          const started = synchronizedStart ?? performance.now();
          asciiMask.style.opacity = '1';
          let frameNumber = 0;

          function frame(now) {
            const rawProgress = Math.min(1, (now - started) / duration);
            const eased = rawProgress < .5
              ? 2 * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
            const maskProgress = direction === 'reveal' ? eased : 1 - eased;
            renderProcessingMask(maskProgress, frameNumber++);

            if (rawProgress < 1) requestAnimationFrame(frame);
            else {
              if (direction === 'reveal') {
                maskContext.clearRect(0, 0, maskWidth, maskHeight);
                asciiMask.style.opacity = '0';
              } else {
                renderProcessingMask(0, frameNumber);
              }
              resolve();
            }
          }
          requestAnimationFrame(frame);
        });
      }

      function updateViewerTabs(section) {
        activeViewerSection = section;
        viewerTabs.querySelectorAll('.viewer-tab').forEach(tab => {
          const active = tab.dataset.section === section;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', String(active));
        });
      }

      function setActiveProject(nextProject) {
        if (!nextProject) return false;
        activeProject = nextProject;
        images = activeProject.images;
        viewerImageIndex = 0;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image 1 of ${images.length}`;
        viewerNextImage.alt = `${seoTitleCase(activeProject.title)}, next project image`;
        applyProjectSeo(activeProject);
        syncViewerInfoContent(activeProject);
        updateViewerTabs(activeProject.category);
        updateViewerBreadcrumb();
        return true;
      }

      function syncViewerInfoContent(currentProject) {
        if (!currentProject) return;
        const lines = projectInfo[currentProject.slug] || [
          `Project: ${currentProject.title}`,
          'Amogh R Raikar'
        ];
        const guides = document.createElement('div');
        guides.className = 'viewer-info-back-guides';
        guides.setAttribute('aria-hidden', 'true');
        guides.innerHTML = `
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line class="guide-dark" x1="99.5" y1=".5" x2=".5" y2="99.5"></line>
            <line class="guide-light" x1="99.5" y1=".5" x2=".5" y2="99.5"></line>
            <line class="guide-dark" x1=".5" y1=".5" x2="99.5" y2="99.5"></line>
            <line class="guide-light" x1=".5" y1=".5" x2="99.5" y2="99.5"></line>
          </svg>
          <i class="guide-corner top-left"></i>
          <i class="guide-corner top-right"></i>
          <i class="guide-corner bottom-left"></i>
          <i class="guide-corner bottom-right"></i>
        `;
        viewerInfoBack.replaceChildren(guides, ...lines.map(value => {
          const line = document.createElement('p');
          line.dataset.infoLine = value;
          return line;
        }));
      }

      syncViewerInfoContent(activeProject);

      function updateViewerBreadcrumb() {
        if (!activeProject) return;
        viewerBreadcrumbPath.innerHTML = `${activeProject.category}&nbsp;&nbsp;/&nbsp;&nbsp;${activeProject.title}&nbsp;&nbsp;/&nbsp;&nbsp;`;
        viewerBreadcrumbImage.textContent = activeProject.videoIndex === viewerImageIndex
          ? `VIDEO ${viewerImageIndex + 1}  •  ${images.length}`
          : `IMG ${viewerImageIndex + 1}  •  ${images.length}`;
      }

      function showMenuPreview(entry) {
        const source = entry?.dataset.preview;
        if (!source) return;
        const width = Math.min(560, innerWidth * .48);
        const height = Math.min(400, innerHeight * .44);
        viewerMenuPreview.src = source;
        viewerMenuPreview.style.left = `${32 + Math.random() * Math.max(0, innerWidth - width - 64)}px`;
        viewerMenuPreview.style.top = `${88 + Math.random() * Math.max(0, innerHeight - height - 144)}px`;
        viewerMenuPreview.classList.add('visible');
      }

      function setMenuEntryActive(entry) {
        const changed = entry !== hoveredMenuEntry;
        if (changed) {
          clearTimeout(cursorCountTimer);
          const previousLabel = hoveredMenuEntry?.querySelector('.viewer-menu-entry-label');
          if (previousLabel) previousLabel.style.transform = '';
          viewerMenuPreview.style.transform = '';
          hoveredMenuEntry?.classList.remove('cursor-hover');
          viewerMenuPreview.classList.remove('visible');
          cursorActionCount.classList.remove('visible');
          hoveredMenuEntry = entry;
        }
        if (!entry) {
          viewerMenuHighlight.classList.remove('visible');
          return;
        }
        const rect = entry.getBoundingClientRect();
        viewerMenuHighlight.style.top = `${rect.top}px`;
        viewerMenuHighlight.style.height = `${rect.height}px`;
        viewerMenuHighlight.classList.add('visible');
        updateMenuEntryWarp(entry, pointerClientX, pointerClientY);
        if (!changed) return;
        entry.classList.add('cursor-hover');
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().catch(() => {});
        showMenuPreview(entry);
        cursorActionCount.textContent = entry.dataset.mediaLabel;
        cursorCountTimer = window.setTimeout(() => cursorActionCount.classList.add('visible'), 160);
      }

      function updateMenuEntryWarp(entry, x, y) {
        const label = entry?.querySelector('.viewer-menu-entry-label');
        if (!label) return;
        const rect = entry.getBoundingClientRect();
        const px = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
        const py = Math.max(0, Math.min(1, (y - rect.top) / rect.height));
        const rotateY = (px - .5) * 26;
        const rotateX = (.5 - py) * 13;
        const translateX = (px - .5) * 8;
        const translateY = (py - .5) * 5;
        const depth = -42 - Math.abs(px - .5) * 14;
        const warp = `perspective(540px) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${depth.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        label.style.transform = warp;
        viewerMenuPreview.style.transform = warp;
      }

      function syncMenuHoverUnderCursor() {
        menuScrollHoverFrame = 0;
        if (!viewer.classList.contains('menu-open')) return;
        const entry = document.elementFromPoint(pointerClientX, pointerClientY)?.closest('.viewer-menu-entry');
        setMenuEntryActive(entry && viewerMenu.contains(entry) ? entry : null);
      }

      function syncMenuScrollCue() {
        const hasOverflow = viewerMenu.scrollHeight > viewerMenu.clientHeight + 2;
        viewerMenuScrollCue.classList.toggle('hidden', !hasOverflow || viewerMenu.scrollTop > 1 || menuCategoryTransitioning);
        const atBottom = hasOverflow
          && viewerMenu.scrollTop + viewerMenu.clientHeight >= viewerMenu.scrollHeight - 2;
        viewerMenu.classList.toggle('at-bottom', atBottom);
      }

      function setDisplayedArrowSide(side) {
        displayedArrowSide = side;
        cursorNavArrow.setAttribute('transform', side === 'left' ? 'rotate(180 40 40)' : '');
      }

      async function swapImageNavigationArrow(side) {
        if (!side) return;
        if (!displayedArrowSide) {
          requestedArrowSide = side;
          setDisplayedArrowSide(side);
          return;
        }
        if (side === requestedArrowSide) return;
        requestedArrowSide = side;
        const token = ++arrowSwapToken;
        cursorNavArrowGroup.getAnimations().forEach(animation => animation.cancel());

        if (side === displayedArrowSide) {
          cursorNavArrowGroup.style.transform = 'translateY(0)';
          cursorNavArrowGroup.style.opacity = '1';
          return;
        }

        const travel = displayedArrowSide === 'left' && side === 'right' ? 64 : -64;
        const outgoing = cursorNavArrowGroup.animate([
          { transform: 'translateY(0)', opacity: 1 },
          { transform: `translateY(${travel}px)`, opacity: 1 }
        ], {
          duration: 145,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        });
        await outgoing.finished.catch(() => {});
        if (token !== arrowSwapToken) return;
        outgoing.cancel();

        setDisplayedArrowSide(side);
        const incoming = cursorNavArrowGroup.animate([
          { transform: `translateY(${-travel}px)`, opacity: 1 },
          { transform: 'translateY(0)', opacity: 1 }
        ], {
          duration: 190,
          easing: 'cubic-bezier(0, .55, .45, 1)',
          fill: 'forwards'
        });
        await incoming.finished.catch(() => {});
        if (token !== arrowSwapToken) return;
        cursorNavArrowGroup.style.transform = 'translateY(0)';
        cursorNavArrowGroup.style.opacity = '1';
        incoming.cancel();
      }

      function clearImageNavigationCursor() {
        arrowSwapToken++;
        cursorNavArrowGroup.getAnimations().forEach(animation => animation.cancel());
        cursorNavArrowGroup.style.transform = '';
        cursorNavArrowGroup.style.opacity = '';
        displayedArrowSide = null;
        requestedArrowSide = null;
        document.body.classList.remove(
          'image-nav-left',
          'image-nav-right',
          'viewer-top-zone-hover',
          'viewer-close-hover'
        );
      }

      function clearViewerFluidPull() {
        if (fluidPullFrame) cancelAnimationFrame(fluidPullFrame);
        fluidPullFrame = 0;
        fluidPullCanvas?.remove();
        fluidPullCanvas = null;
        fluidPullTargetImage?.style.setProperty('opacity', '');
        fluidPullTargetImage = null;
        wasInsideViewerImage = false;
        lastViewerImagePoint = null;
        lastViewerOutsidePoint = null;
      }

      function positionViewerInfoElements() {
        const rect = viewerImage.getBoundingClientRect();
        viewerInfoPrompt.style.left = `${rect.left - 16}px`;
        viewerInfoPrompt.style.top = `${rect.top + rect.height / 2}px`;
        const promptRect = viewerInfoPrompt.getBoundingClientRect();
        const promptAnts = viewerInfoPrompt.querySelector('.viewer-info-prompt-ants');
        promptAnts.setAttribute('viewBox', `0 0 ${promptRect.width} ${promptRect.height}`);
        promptAnts.querySelectorAll('rect').forEach(outline => {
          outline.setAttribute('x', '.5');
          outline.setAttribute('y', '.5');
          outline.setAttribute('width', String(Math.max(1, promptRect.width - 1)));
          outline.setAttribute('height', String(Math.max(1, promptRect.height - 1)));
          const pillRadius = Math.max(1, (Math.min(promptRect.width, promptRect.height) - 1) / 2);
          outline.setAttribute('rx', String(pillRadius));
          outline.setAttribute('ry', String(pillRadius));
        });
        viewerInfoBack.style.left = `${rect.left}px`;
        viewerInfoBack.style.top = `${rect.top}px`;
        viewerInfoBack.style.width = `${rect.width}px`;
        viewerInfoBack.style.height = `${rect.height}px`;
        return rect;
      }

      function viewerInfoTransform(axis, degrees, twisted = false, twistDirection = 1) {
        const twist = twisted
          ? axis === 'Y'
            ? ` rotateX(${12 * twistDirection}deg) rotateZ(${5.5 * twistDirection}deg) skewY(${6.2 * twistDirection}deg) scale(.93, 1.07)`
            : ` rotateY(${12 * twistDirection}deg) rotateZ(${-5.2 * twistDirection}deg) skewX(${6.8 * twistDirection}deg) scale(1.07, .93)`
          : '';
        return `perspective(850px) rotate${axis}(${degrees}deg)${twist}`;
      }

      function viewerInfoFlipFrames(axis, from, to) {
        const direction = Math.sign(to - from) || 1;
        return [
          { transform: viewerInfoTransform(axis, from), offset: 0 },
          { transform: viewerInfoTransform(axis, from + (to - from) * .32, true, direction), offset: .32 },
          { transform: viewerInfoTransform(axis, from + (to - from) * .68, true, -direction), offset: .68 },
          { transform: viewerInfoTransform(axis, to), offset: 1 }
        ];
      }

      function clearViewerInfoHint() {
        clearTimeout(viewerInfoHintTimer);
        clearTimeout(viewerInfoHintHideTimer);
        viewerInfoHintTimer = 0;
        viewerInfoHintHideTimer = 0;
        viewer.classList.remove('info-hint');
      }

      function scheduleViewerInfoHint() {
        clearViewerInfoHint();
        if (!viewer.classList.contains('open') || viewer.classList.contains('menu-open') || viewerInfoOpen) return;
        if (viewerImageIndex !== 0) return;
        viewerInfoPromptLabel.textContent = 'PRESS I FOR INFO';
        positionViewerInfoElements();
        viewer.classList.add('info-hint');
      }

      function revealViewerInfoPrompt(label, previousRect = null) {
        if (viewerImageIndex !== 0) {
          clearViewerInfoHint();
          return;
        }
        viewerInfoPrompt.getAnimations().forEach(animation => animation.cancel());
        viewerInfoPromptLabel.textContent = label;
        positionViewerInfoElements();
        const targetRect = viewerInfoPrompt.getBoundingClientRect();
        viewer.classList.add('info-hint');
        if (!previousRect?.width || !previousRect?.height) return;
        const scaleX = previousRect.width / targetRect.width;
        const scaleY = previousRect.height / targetRect.height;
        viewerInfoPrompt.animate([
          { transform: `scale(${scaleX}, ${scaleY})`, opacity: .55 },
          { transform: 'scale(1, 1)', opacity: 1 }
        ], {
          duration: 440,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'none'
        });
      }

      function clearViewerInfoTyping() {
        viewerInfoTypeToken++;
        viewerInfoBack.querySelectorAll('[data-info-line]').forEach(line => line.replaceChildren());
      }

      function shiftViewerInfoCharacter(character) {
        if (!/[A-Za-z]/.test(character)) return character;
        const lower = character >= 'a' && character <= 'z';
        const alphabetStart = lower ? 97 : 65;
        const offset = character.charCodeAt(0) - alphabetStart;
        const direction = Math.random() < .5 ? -1 : 1;
        return String.fromCharCode(alphabetStart + (offset + direction + 26) % 26);
      }

      function randomViewerInfoCharacter(character) {
        if (!/[A-Za-z]/.test(character)) return character;
        const blocks = '█▓▒░■□▪▫▌▐▀▄';
        if (Math.random() < .58) return blocks[Math.floor(Math.random() * blocks.length)];
        const alphabet = character >= 'a' && character <= 'z'
          ? 'abcdefghijklmnopqrstuvwxyz'
          : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
      }

      function encryptViewerInfoText(value) {
        return [...value].map(shiftViewerInfoCharacter).join('');
      }

      function scrambleViewerInfoText(realValue, progress) {
        return [...realValue].map((character, index) => {
          if (!/[A-Za-z]/.test(character)) return character;
          const settlePoint = index / Math.max(1, realValue.length - 1);
          return progress >= settlePoint ? character : randomViewerInfoCharacter(character);
        }).join('');
      }

      function renderViewerInfoLine(line, value, cursor = null) {
        line.replaceChildren(document.createTextNode(value));
        if (cursor) line.appendChild(cursor);
      }

      function decorateViewerInfoLinks() {
        if (activeProject?.slug !== 'poster-series') return;
        const line = [...viewerInfoBack.querySelectorAll('[data-info-line]')].at(-1);
        if (!line) return;
        const value = line.dataset.infoLine || '';
        const linkText = 'get in touch';
        const linkStart = value.toLowerCase().lastIndexOf(linkText);
        if (linkStart < 0) return;
        const link = document.createElement('a');
        link.className = 'viewer-info-link';
        link.href = 'contact.html';
        link.textContent = value.slice(linkStart, linkStart + linkText.length);
        line.replaceChildren(
          document.createTextNode(value.slice(0, linkStart)),
          link,
          document.createTextNode(value.slice(linkStart + linkText.length))
        );
      }

      function decodeViewerInfoLines(lines, token) {
        return new Promise(resolve => {
          const started = performance.now();
          const settleDuration = 20;
          let frameNumber = 0;

          function frame(now) {
            if (token !== viewerInfoTypeToken) {
              resolve();
              return;
            }
            const elapsed = now - started;
            const progress = Math.min(1, elapsed / settleDuration);
            if (frameNumber % 2 === 0 || progress === 1) {
              lines.forEach(line => {
                const realValue = line.dataset.infoLine || '';
                renderViewerInfoLine(line, progress === 1
                  ? realValue
                  : scrambleViewerInfoText(realValue, progress));
              });
            }
            frameNumber++;
            if (progress === 1) resolve();
            else requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      }

      async function typeViewerInfoLines() {
        const token = ++viewerInfoTypeToken;
        const lines = [...viewerInfoBack.querySelectorAll('[data-info-line]')];
        const totalCharacters = lines.reduce((total, line) => total + (line.dataset.infoLine || '').length, 0);
        const characterDelay = Math.max(.067, Math.min(.467, 60 / Math.max(1, totalCharacters)));
        lines.forEach(line => line.replaceChildren());
        const cursor = document.createElement('span');
        cursor.className = 'viewer-info-terminal-cursor';
        cursor.setAttribute('aria-hidden', 'true');

        for (const line of lines) {
          if (token !== viewerInfoTypeToken) return;
          const realValue = line.dataset.infoLine || '';
          const encryptedValue = encryptViewerInfoText(realValue);
          let typedValue = '';
          renderViewerInfoLine(line, typedValue, cursor);
          for (let characterIndex = 0; characterIndex < encryptedValue.length; characterIndex += 3) {
            if (token !== viewerInfoTypeToken) return;
            typedValue += encryptedValue.slice(characterIndex, characterIndex + 3);
            renderViewerInfoLine(line, typedValue, cursor);
            await new Promise(resolve => setTimeout(resolve, characterDelay));
          }
          await new Promise(resolve => setTimeout(resolve, 1.067));
        }
        if (token !== viewerInfoTypeToken) return;
        // Let the fully encrypted credits remain readable before decoding.
        await new Promise(resolve => setTimeout(resolve, 6));
        cursor.remove();
        await decodeViewerInfoLines(lines, token);
        if (token === viewerInfoTypeToken) decorateViewerInfoLinks();
      }

      async function openViewerInfoCard() {
        if (viewerInfoOpen || viewerInfoFlipping || viewerTransitioning || viewer.classList.contains('menu-open')) return;
        if (viewerImageIndex !== 0) return;
        viewerInfoFlipping = true;
        const previousPromptRect = viewerInfoPrompt.getBoundingClientRect();
        clearViewerInfoHint();
        clearViewerFluidPull();
        clearImageNavigationCursor();
        const infoRect = positionViewerInfoElements();
        viewerInfoFlipAxis = infoRect.width >= infoRect.height ? 'X' : 'Y';
        viewerInfoBack.style.transform = viewerInfoTransform(viewerInfoFlipAxis, 180);
        viewerInfoBack.classList.add('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'false');
        clearViewerInfoTyping();
        document.body.classList.add('viewer-info-open');
        viewer.classList.add('info-card-open');
        window.setTimeout(() => {
          if (viewerInfoFlipping || viewerInfoOpen) typeViewerInfoLines();
        }, 90);
        const timing = {
          duration: 720,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        };
        const frontFlip = viewerImage.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 0, -180), timing);
        const backFlip = viewerInfoBack.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 180, 0), timing);
        await Promise.all([frontFlip.finished.catch(() => {}), backFlip.finished.catch(() => {})]);
        frontFlip.cancel();
        backFlip.cancel();
        viewerImage.style.transform = viewerInfoTransform(viewerInfoFlipAxis, -180);
        viewerImage.style.visibility = 'hidden';
        viewerInfoBack.style.transform = viewerInfoTransform(viewerInfoFlipAxis, 0);
        viewerInfoOpen = true;
        viewerInfoFlipping = false;
        revealViewerInfoPrompt('PRESS X TO CLOSE', previousPromptRect);
      }

      async function closeViewerInfoCard() {
        if (!viewerInfoOpen || viewerInfoFlipping) return;
        viewerInfoFlipping = true;
        const previousPromptRect = viewerInfoPrompt.getBoundingClientRect();
        clearViewerInfoHint();
        clearViewerInfoTyping();
        viewer.classList.remove('info-card-open');
        viewerImage.style.visibility = 'visible';
        const timing = {
          duration: 720,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        };
        const frontFlip = viewerImage.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, -180, 0), timing);
        const backFlip = viewerInfoBack.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 0, 180), timing);
        await Promise.all([frontFlip.finished.catch(() => {}), backFlip.finished.catch(() => {})]);
        frontFlip.cancel();
        backFlip.cancel();
        viewerImage.style.transform = '';
        viewerInfoBack.style.transform = '';
        viewerInfoBack.classList.remove('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('viewer-info-open');
        viewerInfoOpen = false;
        viewerInfoFlipping = false;
        revealViewerInfoPrompt('PRESS I FOR INFO', previousPromptRect);
        syncOverlayPointerState(pointerClientX, pointerClientY);
      }

      function resetViewerInfoCard() {
        clearViewerInfoHint();
        clearViewerInfoTyping();
        viewer.classList.remove('info-card-open');
        viewerInfoOpen = false;
        viewerInfoFlipping = false;
        viewerImage.style.transform = '';
        viewerImage.style.visibility = '';
        viewerInfoBack.style.transform = '';
        viewerInfoBack.classList.remove('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('viewer-info-open');
        viewerInfoPromptLabel.textContent = 'PRESS I FOR INFO';
      }

      function pullViewerImageEdge(rect, point, direction = 'outward', targetImage = viewerImage) {
        const distances = {
          left: Math.abs(point.x - rect.left),
          right: Math.abs(rect.right - point.x),
          top: Math.abs(point.y - rect.top),
          bottom: Math.abs(rect.bottom - point.y)
        };
        const edge = Object.keys(distances).reduce((closest, candidate) =>
          distances[candidate] < distances[closest] ? candidate : closest
        );
        if (distances[edge] > 24) return;
        clearViewerFluidPull();

        const padding = 340;
        const width = rect.width;
        const height = rect.height;
        const canvas = document.createElement('canvas');
        const ratio = Math.min(2, devicePixelRatio || 1);
        const canvasWidth = width + padding * 2;
        const canvasHeight = height + padding * 2;
        canvas.className = 'viewer-fluid-canvas';
        if (targetImage === viewerStaticImage) canvas.classList.add('viewer-static-fluid-canvas');
        canvas.width = Math.ceil(canvasWidth * ratio);
        canvas.height = Math.ceil(canvasHeight * ratio);
        canvas.style.left = `${rect.left - padding}px`;
        canvas.style.top = `${rect.top - padding}px`;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        viewer.appendChild(canvas);
        fluidPullCanvas = canvas;
        fluidPullTargetImage = targetImage;

        const context = canvas.getContext('2d');
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        const naturalWidth = targetImage.naturalWidth || width;
        const naturalHeight = targetImage.naturalHeight || height;
        const originX = padding;
        const originY = padding;
        const sampleWidth = Math.max(1, Math.round(width));
        const sampleHeight = Math.max(1, Math.round(height));
        let pullSamplePixels = null;
        try {
          const sampler = document.createElement('canvas');
          sampler.width = sampleWidth;
          sampler.height = sampleHeight;
          const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
          samplerContext.drawImage(targetImage, 0, 0, sampleWidth, sampleHeight);
          pullSamplePixels = samplerContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
        } catch (error) {
          pullSamplePixels = null;
        }
        function samplePullColor(px, py) {
          if (!pullSamplePixels) return [255, 255, 255];
          const sx = Math.max(0, Math.min(sampleWidth - 1, Math.round(px - originX)));
          const sy = Math.max(0, Math.min(sampleHeight - 1, Math.round(py - originY)));
          const sampleIndex = (sy * sampleWidth + sx) * 4;
          return [pullSamplePixels[sampleIndex], pullSamplePixels[sampleIndex + 1], pullSamplePixels[sampleIndex + 2]];
        }
        const localPointX = point.x - rect.left;
        const localPointY = point.y - rect.top;
        let fluidFocusX = localPointX;
        let fluidFocusY = localPointY;
        const band = Math.min(58, (edge === 'left' || edge === 'right' ? width : height) * .22);
        const radius = Math.min(145, (edge === 'left' || edge === 'right' ? height : width) * .34);
        const maxPull = 112;
        const cursorRadius = 40;
        const releaseDistance = 150;
        const strip = 4;
        let currentPull = 0;
        let released = false;
        let releaseStarted = 0;
        let releaseFrom = 0;
        let aberrationParticles = [];

        function isInwardVelocity(vx, vy) {
          if (edge === 'left') return vx > 0;
          if (edge === 'right') return vx < 0;
          if (edge === 'top') return vy > 0;
          return vy < 0;
        }

        function spawnAberrationParticle(px, py, axis, dirX, dirY) {
          const [colorR, colorG, colorB] = samplePullColor(px, py);
          const vx = dirX * (.7 + Math.random() * 3.4) + (axis === 'y' ? (Math.random() - .5) * 1.6 : 0);
          const vy = dirY * (.7 + Math.random() * 3.4) + (axis === 'x' ? (Math.random() - .5) * 1.6 : 0);
          aberrationParticles.push({
            x: px,
            y: py,
            axis,
            vx,
            vy,
            age: 0,
            life: 1,
            decay: .012 + Math.random() * .05,
            size: 1 + Math.random() * 2,
            inward: isInwardVelocity(vx, vy),
            colorR, colorG, colorB
          });
        }

        function getAberrationBurstRect() {
          const pillRect = cursorAction.getBoundingClientRect();
          const pillOpacity = parseFloat(getComputedStyle(cursorAction).opacity || '0');
          if (pillRect.width > 4 && pillRect.height > 4 && pillOpacity > .05) {
            return {
              left: pillRect.left - rect.left + padding,
              top: pillRect.top - rect.top + padding,
              right: pillRect.right - rect.left + padding,
              bottom: pillRect.bottom - rect.top + padding
            };
          }
          const cx = pointerClientX - rect.left + padding;
          const cy = pointerClientY - rect.top + padding;
          return { left: cx, top: cy, right: cx, bottom: cy };
        }

        function spawnAberrationBurst(count) {
          const burst = getAberrationBurstRect();
          const w = burst.right - burst.left;
          const h = burst.bottom - burst.top;
          for (let index = 0; index < count; index++) {
            let px;
            let py;
            if (w < 1 && h < 1) {
              px = burst.left;
              py = burst.top;
            } else {
              const side = Math.floor(Math.random() * 4);
              const t = Math.random();
              if (side === 0) { px = burst.left + w * t; py = burst.top; }
              else if (side === 1) { px = burst.right; py = burst.top + h * t; }
              else if (side === 2) { px = burst.left + w * t; py = burst.bottom; }
              else { px = burst.left; py = burst.top + h * t; }
            }
            const angle = Math.random() * Math.PI * 2;
            const speed = .5 + Math.random() * 2.6;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const [colorR, colorG, colorB] = samplePullColor(px, py);
            aberrationParticles.push({
              x: px,
              y: py,
              axis: Math.random() < .5 ? 'x' : 'y',
              vx,
              vy,
              age: 0,
              life: 1,
              decay: .012 + Math.random() * .05,
              size: 1 + Math.random() * 2,
              inward: isInwardVelocity(vx, vy),
              colorR, colorG, colorB
            });
          }
        }

        function drawAberrationParticles() {
          if (!aberrationParticles.length) return;
          context.globalCompositeOperation = 'source-over';
          for (let index = aberrationParticles.length - 1; index >= 0; index--) {
            const particle = aberrationParticles[index];
            particle.age++;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= .972;
            particle.vy *= .972;
            particle.life -= particle.decay;
            if (particle.life <= 0) {
              aberrationParticles.splice(index, 1);
              continue;
            }
            const alpha = Math.max(0, Math.min(1, particle.life));
            const half = particle.size / 2;
            context.fillStyle = particle.inward
              ? `rgba(0,0,0,${alpha * .9})`
              : `rgba(${particle.colorR},${particle.colorG},${particle.colorB},${alpha * .9})`;
            context.fillRect(particle.x - half, particle.y - half, particle.size, particle.size);
          }
          if (aberrationParticles.length > 900) aberrationParticles.length = 900;
        }

        function drawFrame(now) {
          if (fluidPullCanvas !== canvas) return;
          const targetFocusX = Math.max(0, Math.min(width, pointerClientX - rect.left));
          const targetFocusY = Math.max(0, Math.min(height, pointerClientY - rect.top));
          fluidFocusX += (targetFocusX - fluidFocusX) * .14;
          fluidFocusY += (targetFocusY - fluidFocusY) * .14;
          let outwardDistance = 0;
          if (direction === 'outward') {
            if (edge === 'left') outwardDistance = rect.left - (pointerClientX - cursorRadius);
            if (edge === 'right') outwardDistance = (pointerClientX + cursorRadius) - rect.right;
            if (edge === 'top') outwardDistance = rect.top - (pointerClientY - cursorRadius);
            if (edge === 'bottom') outwardDistance = (pointerClientY + cursorRadius) - rect.bottom;
          } else {
            if (edge === 'left') outwardDistance = (pointerClientX + cursorRadius) - rect.left;
            if (edge === 'right') outwardDistance = rect.right - (pointerClientX - cursorRadius);
            if (edge === 'top') outwardDistance = (pointerClientY + cursorRadius) - rect.top;
            if (edge === 'bottom') outwardDistance = rect.bottom - (pointerClientY - cursorRadius);
          }
          outwardDistance = Math.max(0, outwardDistance);

          const pointerInside =
            pointerClientX >= rect.left && pointerClientX <= rect.right
            && pointerClientY >= rect.top && pointerClientY <= rect.bottom;
          const pointerReversed = direction === 'outward' ? pointerInside : !pointerInside;
          if (!released && (outwardDistance >= releaseDistance || pointerReversed)) {
            released = true;
            releaseStarted = now;
            releaseFrom = currentPull;
          }

          if (released) {
            const releaseProgress = Math.min(1, (now - releaseStarted) / 620);
            const eased = 1 - Math.pow(1 - releaseProgress, 3);
            currentPull = releaseFrom * (1 - eased);
          } else {
            const targetPull = Math.min(maxPull, outwardDistance * .78);
            currentPull += (targetPull - currentPull) * .2;
          }
          const pull = direction === 'inward' ? -Math.min(currentPull, band * .82) : currentPull;
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.drawImage(targetImage, originX, originY, width, height);

          if (edge === 'left' || edge === 'right') {
            const sourceBand = naturalWidth * band / width;
            const sourceX = edge === 'left' ? 0 : naturalWidth - sourceBand;
            for (let y = 0; y < height; y += strip) {
              const center = y + strip / 2;
              const distance = (center - fluidFocusY) / radius;
              const weight = Math.exp(-distance * distance * 1.8);
              const ripple = .92 + .08 * Math.sin(y * .11 + now * .012);
              const amount = pull * weight * ripple;
              const destinationX = edge === 'left' ? originX - amount : originX + width - band;
              if (amount < 0) {
                if (edge === 'left') context.clearRect(originX, originY + y, -amount + 1, Math.min(strip + 1, height - y));
                else context.clearRect(originX + width + amount - 1, originY + y, -amount + 1, Math.min(strip + 1, height - y));
              }
              const sourceY = naturalHeight * y / height;
              const sourceHeight = naturalHeight * Math.min(strip + 1, height - y) / height;
              context.drawImage(
                targetImage,
                sourceX, sourceY, sourceBand, sourceHeight,
                destinationX - 1, originY + y, band + amount + 2, Math.min(strip + 1, height - y)
              );
              if (Math.abs(amount) > 1.5 && Math.random() < weight * .3) {
                spawnAberrationParticle(
                  destinationX + (edge === 'left' ? 0 : band + amount),
                  originY + center,
                  'x',
                  edge === 'left' ? -1 : 1,
                  0
                );
              }
            }
          } else {
            const sourceBand = naturalHeight * band / height;
            const sourceY = edge === 'top' ? 0 : naturalHeight - sourceBand;
            for (let x = 0; x < width; x += strip) {
              const center = x + strip / 2;
              const distance = (center - fluidFocusX) / radius;
              const weight = Math.exp(-distance * distance * 1.8);
              const ripple = .92 + .08 * Math.sin(x * .11 + now * .012);
              const amount = pull * weight * ripple;
              const destinationY = edge === 'top' ? originY - amount : originY + height - band;
              if (amount < 0) {
                if (edge === 'top') context.clearRect(originX + x, originY, Math.min(strip + 1, width - x), -amount + 1);
                else context.clearRect(originX + x, originY + height + amount - 1, Math.min(strip + 1, width - x), -amount + 1);
              }
              const sourceX = naturalWidth * x / width;
              const sourceWidth = naturalWidth * Math.min(strip + 1, width - x) / width;
              context.drawImage(
                targetImage,
                sourceX, sourceY, sourceWidth, sourceBand,
                originX + x, destinationY - 1, Math.min(strip + 1, width - x), band + amount + 2
              );
              if (Math.abs(amount) > 1.5 && Math.random() < weight * .3) {
                spawnAberrationParticle(
                  originX + center,
                  destinationY + (edge === 'top' ? 0 : band + amount),
                  'y',
                  0,
                  edge === 'top' ? -1 : 1
                );
              }
            }
          }

          if (Math.abs(currentPull) > 2) spawnAberrationBurst(2);
          drawAberrationParticles();

          if (!released || currentPull > .25) {
            fluidPullFrame = requestAnimationFrame(drawFrame);
          } else {
            clearViewerFluidPull();
          }
        }

        targetImage.style.opacity = '0';
        fluidPullFrame = requestAnimationFrame(drawFrame);
      }

      function syncViewerImageEdgeExit(detailOpen, insideImage, rect, x, y, targetImage = viewerImage) {
        if (!detailOpen) {
          wasInsideViewerImage = false;
          lastViewerImagePoint = null;
          lastViewerOutsidePoint = null;
          return;
        }
        if (insideImage) {
          if (!wasInsideViewerImage && lastViewerOutsidePoint) {
            pullViewerImageEdge(rect, { x, y }, 'inward', targetImage);
          }
          wasInsideViewerImage = true;
          lastViewerImagePoint = { x, y };
          lastViewerOutsidePoint = null;
          return;
        }
        if (wasInsideViewerImage && lastViewerImagePoint) {
          pullViewerImageEdge(rect, lastViewerImagePoint, 'outward', targetImage);
        }
        wasInsideViewerImage = false;
        lastViewerImagePoint = null;
        lastViewerOutsidePoint = { x, y };
      }

      function syncOverlayPointerState(x, y, target = document.elementFromPoint(x, y)) {
        const viewerOpen = viewer.classList.contains('open');
        const overThumbnail = Boolean(target?.closest?.('.viewer-thumbnail'));
        const overClose = Boolean(target?.closest?.('.viewer-close'));
        const overTab = Boolean(target?.closest?.('.viewer-tab, .viewer-logo'));
        const detailOpen = viewerOpen
          && !viewer.classList.contains('menu-open')
          && !viewer.classList.contains('video-open')
          && !viewer.classList.contains('static-page-open');
        if (viewerInfoOpen || viewerInfoFlipping) {
          const infoCardRect = viewerInfoBack.getBoundingClientRect();
          const aboveInfoCard = y < infoCardRect.top;
          clearImageNavigationCursor();
          document.body.classList.remove('thumbnail-hover', 'viewer-detail-menu-cursor');
          document.body.classList.toggle('viewer-top-zone-hover', aboveInfoCard);
          document.body.classList.toggle('viewer-tab-hover', overTab && !aboveInfoCard);
          document.body.classList.toggle('viewer-close-hover', overClose && !aboveInfoCard);
          return;
        }
        const staticPageOpen = viewerOpen && viewer.classList.contains('static-page-open');
        const imageRect = viewerImage.getBoundingClientRect();
        const insideImage = detailOpen && !overThumbnail && !overClose
          && x >= imageRect.left && x <= imageRect.right
          && y >= imageRect.top && y <= imageRect.bottom;
        const staticImageRect = viewerStaticImage.getBoundingClientRect();
        const insideStaticImage = staticPageOpen && !overClose && !overTab
          && viewerStaticImage.complete && viewerStaticImage.naturalWidth > 0
          && x >= staticImageRect.left && x <= staticImageRect.right
          && y >= staticImageRect.top && y <= staticImageRect.bottom;
        if (staticPageOpen) {
          syncViewerImageEdgeExit(true, insideStaticImage, staticImageRect, x, y, viewerStaticImage);
        } else {
          syncViewerImageEdgeExit(detailOpen, insideImage, imageRect, x, y, viewerImage);
        }
        const topZoneActive = detailOpen && !insideImage && !overThumbnail && !overClose
          && y <= imageRect.top;
        const imageLeftActive = insideImage && x < imageRect.left + imageRect.width / 2;
        if (insideImage) swapImageNavigationArrow(imageLeftActive ? 'left' : 'right');
        document.body.classList.toggle('image-nav-left', imageLeftActive);
        document.body.classList.toggle('image-nav-right', insideImage && !imageLeftActive);
        document.body.classList.remove('viewer-top-zone-hover');
        document.body.classList.toggle('viewer-close-hover', viewerOpen && overClose);
        document.body.classList.toggle(
          'viewer-detail-menu-cursor',
          detailOpen && !insideImage && !overThumbnail && !overClose && !overTab
        );
        document.body.classList.toggle(
          'thumbnail-hover',
          detailOpen && !insideImage && !topZoneActive && !overClose
            && (overThumbnail || x >= innerWidth - 152)
        );
      }

      function updateThumbnailSelection() {
        updateViewerBreadcrumb();
        viewerThumbnails.querySelectorAll('.viewer-thumbnail').forEach((thumbnail, index) => {
          const active = index === viewerImageIndex;
          thumbnail.classList.toggle('active', active);
          thumbnail.setAttribute('aria-current', active ? 'true' : 'false');
          if (active) thumbnail.scrollIntoView({ block: 'nearest' });
        });
      }

      async function selectViewerImage(index) {
        if (index === viewerImageIndex || viewerTransitioning || viewerInfoOpen || viewerInfoFlipping) return;
        if (index !== 0) clearViewerInfoHint();
        viewerTransitioning = true;
        viewer.classList.remove('video-open');
        viewerVideo.removeAttribute('src');
        clearViewerFluidPull();
        const previousRect = viewerImage.getBoundingClientRect();
        const source = images[index];
        const incoming = new Image();
        if (/^https?:/i.test(source)) incoming.crossOrigin = 'anonymous';
        incoming.src = source;
        const incomingReady = incoming.decode?.().catch(() => {})
          || new Promise(resolve => {
            incoming.onload = resolve;
            incoming.onerror = resolve;
          });
        configureMask();
        await animateMask('cover', 260);
        await incomingReady;
        viewerImageIndex = index;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image ${index + 1} of ${images.length}`;
        if (/^https?:/i.test(source)) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.src = source;
        await viewerImage.decode?.().catch(() => {});
        updateThumbnailSelection();

        viewerImage.style.scale = '1';
        viewerImage.style.width = `${previousRect.width}px`;
        viewerImage.style.height = `${previousRect.height}px`;
        const targetSize = getOverlayImageSize(viewerImage);
        viewerImage.style.width = `${targetSize.width}px`;
        viewerImage.style.height = `${targetSize.height}px`;
        const targetRect = viewerImage.getBoundingClientRect();
        configureMask();
        viewerImage.style.width = `${previousRect.width}px`;
        viewerImage.style.height = `${previousRect.height}px`;
        asciiMask.style.left = `${previousRect.left}px`;
        asciiMask.style.top = `${previousRect.top}px`;
        asciiMask.style.width = `${previousRect.width}px`;
        asciiMask.style.height = `${previousRect.height}px`;

        const resizeTiming = {
          duration: 780,
          easing: 'cubic-bezier(.4, 0, .2, 1)',
          fill: 'forwards'
        };
        const imageResize = viewerImage.animate([
          { width: `${previousRect.width}px`, height: `${previousRect.height}px` },
          { width: `${targetRect.width}px`, height: `${targetRect.height}px` }
        ], resizeTiming);
        const maskResize = asciiMask.animate([
          {
            left: `${previousRect.left}px`,
            top: `${previousRect.top}px`,
            width: `${previousRect.width}px`,
            height: `${previousRect.height}px`
          },
          {
            left: `${targetRect.left}px`,
            top: `${targetRect.top}px`,
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`
          }
        ], resizeTiming);
        const infoPillMove = viewerInfoPrompt.animate([
          {
            left: `${previousRect.left - 16}px`,
            top: `${previousRect.top + previousRect.height / 2}px`
          },
          {
            left: `${targetRect.left - 16}px`,
            top: `${targetRect.top + targetRect.height / 2}px`
          }
        ], resizeTiming);
        const synchronizedStart = document.timeline.currentTime ?? performance.now();
        imageResize.startTime = synchronizedStart;
        maskResize.startTime = synchronizedStart;
        infoPillMove.startTime = synchronizedStart;
        await Promise.all([
          animateMask('reveal', 780, synchronizedStart),
          imageResize.finished.catch(() => {}),
          maskResize.finished.catch(() => {}),
          infoPillMove.finished.catch(() => {})
        ]);

        // Preserve the exact final resize frame before cancelling the WAAPI
        // animations. Without this, cancel() exposes previousRect for one paint,
        // creating the visible shrink/grow jump after the ASCII reveal.
        if (typeof imageResize.commitStyles === 'function') imageResize.commitStyles();
        if (typeof maskResize.commitStyles === 'function') maskResize.commitStyles();
        if (typeof infoPillMove.commitStyles === 'function') infoPillMove.commitStyles();

        imageResize.cancel();
        maskResize.cancel();
        infoPillMove.cancel();

        // The committed width/height are already the final target geometry.
        // Remove them only after the browser has painted that identical final
        // frame, handing control back to the responsive CSS with no visual jump.
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        viewerImage.style.width = '';
        viewerImage.style.height = '';
        viewerImage.style.scale = '';
        configureMask();
        viewerTransitioning = false;
        if (activeProject.videoIndex === viewerImageIndex) {
          clearViewerInfoHint();
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(activeProject.video);
        } else {
          scheduleViewerInfoHint();
        }
        syncOverlayPointerState(pointerClientX, pointerClientY);
      }

      function renderViewerThumbnails() {
        viewerThumbnails.replaceChildren(...images.map((source, index) => {
          const button = document.createElement('button');
          const image = document.createElement('img');
          button.type = 'button';
          button.className = 'viewer-thumbnail';
          button.setAttribute('aria-label', `View image ${index + 1}`);
          image.src = source;
          image.alt = '';
          image.draggable = false;
          trackThumbnailLoad(button, image);
          button.appendChild(image);
          button.addEventListener('pointerenter', () => {
            menuHoverSound.currentTime = 0;
            menuHoverSound.play().catch(() => {});
          });
          button.addEventListener('click', event => {
            event.stopPropagation();
            selectViewerImage(index);
          });
          return button;
        }));
        updateThumbnailSelection();
        updateThumbnailRailLayout();
      }

      function updateThumbnailRailLayout() {
        viewerThumbnails.classList.remove('long-gallery');
        requestAnimationFrame(() => {
          const availableCenteredHeight = Math.max(0, innerHeight - 144);
          const isLongGallery = viewerThumbnails.scrollHeight > availableCenteredHeight + 1;
          viewerThumbnails.classList.toggle('long-gallery', isLongGallery);
        });
      }

      let mobileProjectWheelFrame = 0;
      let mobileProjectSelectedEntry = null;
      let mobileProjectWheelTouched = false;
      let mobileWheelReadyPromise = Promise.resolve();
      let mobileWheelThumbTrack = null;
      let mobileWheelIdleTimer = null;

      function updateMobileProjectWheel() {
        mobileProjectWheelFrame = 0;
        if (!document.documentElement.classList.contains('mobile-project-wheel')) return;
        const menuRect = viewerMenu.getBoundingClientRect();
        const centerY = menuRect.top + menuRect.height / 2;
        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        let selectedEntry = null;
        let selectedIndex = -1;
        let selectedDistance = Infinity;
        entries.forEach((entry, index) => {
          const rect = entry.getBoundingClientRect();
          const distance = rect.top + rect.height / 2 - centerY;
          const absoluteDistance = Math.abs(distance);
          if (absoluteDistance < selectedDistance) {
            selectedDistance = absoluteDistance;
            selectedEntry = entry;
            selectedIndex = index;
          }
          const progress = Math.max(-1, Math.min(1, distance / Math.max(90, menuRect.height * .32)));
          const rotateX = progress * -58;
          const depth = -Math.abs(progress) * 92;
          const scale = 1 - Math.abs(progress) * .16;
          entry.style.transform = `perspective(620px) translateZ(${depth.toFixed(1)}px) rotateX(${rotateX.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          entry.style.opacity = String(1 - Math.abs(progress) * .55);
        });
        entries.forEach(entry => entry.classList.toggle('wheel-selected', entry === selectedEntry));
        if (document.documentElement.classList.contains('mobile-project-wheel') && selectedIndex !== -1) {
          slideMobileWheelThumbRow(selectedIndex);
        }
        if (selectedEntry && selectedEntry !== mobileProjectSelectedEntry) {
          if (mobileProjectSelectedEntry) {
            mobileProjectSelectedEntry.classList.remove('wheel-loading');
          }
          mobileProjectSelectedEntry = selectedEntry;
          if (mobileWheelIdleTimer) {
            clearTimeout(mobileWheelIdleTimer);
            mobileWheelIdleTimer = null;
          }
          if (selectedEntry.dataset.preview) {
            viewerMenuPreview.src = selectedEntry.dataset.preview;
            viewerMenuPreview.classList.add('visible', 'wheel-preview');
          } else {
            viewerMenuPreview.classList.remove('visible', 'wheel-preview');
          }
          if (document.documentElement.classList.contains('mobile-project-wheel')) {
            mobileWheelCountPill.textContent = selectedEntry.dataset.mediaLabel || '';
          }
          if (mobileProjectWheelTouched && mobileWheelSoundUnlocked) {
            menuHoverSound.currentTime = 0;
            menuHoverSound.play().catch(() => {});
          }
          if (mobileProjectWheelTouched) {
            mobileWheelIdleTimer = setTimeout(() => {
              mobileWheelIdleTimer = null;
              if (!document.documentElement.classList.contains('mobile-project-wheel')) return;
              if (selectedEntry !== mobileProjectSelectedEntry) return;
              selectedEntry.classList.add('wheel-loading');
              window.setTimeout(() => {
                if (selectedEntry.dataset.externalLink) {
                  window.open(selectedEntry.dataset.externalLink, '_blank', 'noopener');
                  return;
                }
                openProjectFromMenu(selectedEntry);
              }, 220);
            }, 2000);
          }
        }
      }

      function setupMobileWheelThumbRow() {
        if (!document.documentElement.classList.contains('mobile-project-wheel')) return;
        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        mobileWheelThumbTrack = document.createElement('div');
        mobileWheelThumbTrack.className = 'mobile-wheel-thumb-track';
        mobileWheelThumbTrack.append(...entries.map(entry => {
          const frame = document.createElement('span');
          frame.className = 'mobile-wheel-thumb-frame';
          const image = document.createElement('img');
          image.className = 'mobile-wheel-thumb';
          image.src = entry.dataset.preview || '';
          image.alt = '';
          image.draggable = false;
          trackThumbnailLoad(frame, image);
          frame.appendChild(image);
          return frame;
        }));
        mobileWheelThumbRow.replaceChildren(mobileWheelThumbTrack);
        mobileWheelThumbRow.style.display = '';
        mobileWheelCountPill.style.display = '';
      }

      function slideMobileWheelThumbRow(index) {
        if (!mobileWheelThumbTrack) return;
        mobileWheelThumbRow.style.display = '';
        mobileWheelCountPill.style.display = '';
        const thumbs = [...mobileWheelThumbTrack.children];
        thumbs.forEach((thumb, thumbIndex) => thumb.classList.toggle('active', thumbIndex === index));
        const thumbWidth = 88;
        const trackWidth = thumbs.length * thumbWidth;
        const viewportWidth = mobileWheelThumbRow.clientWidth;
        let offset;
        if (trackWidth <= viewportWidth) {
          offset = (viewportWidth - trackWidth) / 2;
        } else {
          const centered = viewportWidth / 2 - thumbWidth / 2 - index * thumbWidth;
          const minOffset = viewportWidth - trackWidth;
          offset = Math.max(minOffset, Math.min(0, centered));
        }
        mobileWheelThumbTrack.style.transform = `translateX(${offset.toFixed(1)}px)`;
      }

      function scheduleMobileProjectWheel() {
        if (mobileProjectWheelFrame || !document.documentElement.classList.contains('mobile-project-wheel')) return;
        mobileProjectWheelFrame = requestAnimationFrame(updateMobileProjectWheel);
      }

      function fitViewerMenuEntryLabels() {
        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        entries.forEach(entry => {
          const label = entry.querySelector('.viewer-menu-entry-label');
          if (!label) return;
          label.style.fontSize = '';
          const available = entry.clientWidth - 48;
          if (available <= 0) return;
          let size = parseFloat(getComputedStyle(label).fontSize);
          const minSize = 14;
          while (label.scrollWidth > available && size > minSize) {
            size -= 1;
            label.style.fontSize = `${size}px`;
          }
        });
      }

      function setupMobileProjectWheel() {
        if (!document.documentElement.classList.contains('mobile-project-wheel')) return Promise.resolve();
        setupMobileWheelThumbRow();
        const activateWheelSound = () => {
          mobileProjectWheelTouched = true;
          unlockMobileWheelSound();
        };
        viewerMenu.addEventListener('touchstart', activateWheelSound, { once: true, passive: true });
        viewerMenu.addEventListener('pointerdown', activateWheelSound, { once: true, passive: true });
        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        entries.forEach(entry => {
          entry.addEventListener('click', event => {
            event.preventDefault();
            event.stopImmediatePropagation();
          }, { capture: true });
        });
        viewerMenuList.addEventListener('pointerdown', event => {
          viewerMenuList.dataset.downX = event.clientX;
          viewerMenuList.dataset.downY = event.clientY;
        }, { capture: true });
        viewerMenuList.addEventListener('pointerup', event => {
          const dx = Math.abs(event.clientX - Number(viewerMenuList.dataset.downX || event.clientX));
          const dy = Math.abs(event.clientY - Number(viewerMenuList.dataset.downY || event.clientY));
          if (dx > 10 || dy > 10) return;
          let entry = event.target.closest('.viewer-menu-entry');
          if (!entry) {
            const candidates = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
            let closest = null;
            let closestDistance = Infinity;
            candidates.forEach(candidate => {
              const rect = candidate.getBoundingClientRect();
              if (event.clientY < rect.top - 6 || event.clientY > rect.bottom + 6) return;
              const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
              if (distance < closestDistance) {
                closestDistance = distance;
                closest = candidate;
              }
            });
            entry = closest || viewerMenuList.querySelector('.viewer-menu-entry.wheel-selected');
          }
          if (!entry) return;
          if (entry.classList.contains('wheel-selected')) {
            if (mobileWheelIdleTimer) {
              clearTimeout(mobileWheelIdleTimer);
              mobileWheelIdleTimer = null;
            }
            if (entry.dataset.externalLink) {
              window.open(entry.dataset.externalLink, '_blank', 'noopener');
              return;
            }
            openProjectFromMenu(entry);
          } else {
            entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, { capture: true });
        return new Promise(resolve => {
          requestAnimationFrame(() => {
            const initialEntry = entries[Math.floor(entries.length / 2)];
            initialEntry?.scrollIntoView({ block: 'center' });
            fitViewerMenuEntryLabels();
            updateMobileProjectWheel();
            requestAnimationFrame(resolve);
          });
        });
      }

      function renderViewerMenu(section) {
        const projects = viewerProjects[section] || [];
        viewerMenuList.classList.toggle('compact', projects.length <= 5);
        viewerMenuList.replaceChildren(...projects.map(item => {
          const entry = document.createElement('button');
          const mixedMedia = Boolean(item.video && Number.isInteger(item.videoIndex));
          const imageCount = mixedMedia ? item.images.length : (item.video ? 1 : item.images.length);
          entry.type = 'button';
          entry.className = 'viewer-menu-entry';
          entry.dataset.projectSlug = item.slug;
          entry.dataset.imageCount = String(imageCount);
          entry.dataset.mediaLabel = item.externalLink
            ? (item.linkLabel || 'OPEN LINK')
            : (mixedMedia
              ? `${imageCount} MEDIA`
              : (item.video ? '1 VIDEO' : `${imageCount} ${imageCount === 1 ? 'IMAGE' : 'IMAGES'}`));
          entry.dataset.preview = item.preview || (item.images.length
            ? item.images[Math.floor(Math.random() * item.images.length)]
            : '');
          entry.dataset.externalLink = item.externalLink || '';
          const label = document.createElement('span');
          label.className = 'viewer-menu-entry-label';
          label.textContent = item.menuTitle || item.title;
          if (item.externalLink) {
            entry.classList.add('viewer-menu-entry-external');
            const externalIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            externalIcon.setAttribute('class', 'viewer-menu-entry-external-icon');
            externalIcon.setAttribute('viewBox', '0 0 24 24');
            externalIcon.setAttribute('aria-hidden', 'true');
            const externalPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            externalPath.setAttribute('d', 'M14 3h7v7M21 3L10 14M19 14v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6');
            externalPath.setAttribute('fill', 'none');
            externalPath.setAttribute('stroke', 'currentColor');
            externalPath.setAttribute('stroke-width', '2');
            externalPath.setAttribute('stroke-linecap', 'round');
            externalPath.setAttribute('stroke-linejoin', 'round');
            externalIcon.appendChild(externalPath);
            label.appendChild(externalIcon);
          }
          entry.appendChild(label);
          entry.addEventListener('pointerenter', () => setMenuEntryActive(entry));
          entry.addEventListener('pointerdown', () => setMenuEntryActive(entry));
          entry.addEventListener('click', event => {
            event.stopPropagation();
            if (entry.dataset.externalLink) {
              window.open(entry.dataset.externalLink, '_blank', 'noopener');
              return;
            }
            openProjectFromMenu(entry);
          });
          return entry;
        }));
        mobileWheelReadyPromise = setupMobileProjectWheel();
      }

      function createTransitionMenuList(titles) {
        const list = document.createElement('div');
        list.className = 'viewer-menu-list';
        list.classList.toggle('compact', titles.length <= 5);
        list.replaceChildren(...titles.map(item => {
          const entry = document.createElement('button');
          entry.type = 'button';
          entry.className = 'viewer-menu-entry';
          const label = document.createElement('span');
          label.className = 'viewer-menu-entry-label';
          label.textContent = item.menuTitle || item.title;
          splitTransitionLabelCharacters(label);
          entry.appendChild(label);
          return entry;
        }));
        return list;
      }

      function splitTransitionLabelCharacters(label) {
        const text = label.textContent || '';
        label.replaceChildren(...[...text].map(character => {
          const span = document.createElement('span');
          span.className = 'viewer-menu-transition-character';
          span.textContent = character === ' ' ? '\u00a0' : character;
          return span;
        }));
      }

      async function transitionViewerMenu(section) {
        if (menuCategoryTransitioning || section === activeViewerSection) return;
        menuCategoryTransitioning = true;
        syncMenuScrollCue();
        setMenuEntryActive(null);
        const layer = document.createElement('div');
        const outgoing = viewerMenuList.cloneNode(true);
        const incoming = createTransitionMenuList(viewerProjects[section]);
        layer.className = 'viewer-menu-transition-layer';
        outgoing.querySelectorAll('.cursor-hover').forEach(entry => entry.classList.remove('cursor-hover'));
        outgoing.querySelectorAll('.viewer-menu-entry-label').forEach(label => { label.style.transform = ''; });
        outgoing.querySelectorAll('.viewer-menu-entry-label').forEach(splitTransitionLabelCharacters);
        outgoing.style.translate = `0 ${-viewerMenu.scrollTop}px`;
        layer.append(outgoing, incoming);
        viewerMenu.appendChild(layer);
        viewerMenuList.style.visibility = 'hidden';
        updateViewerTabs(section);
        history.pushState({ page: section.toLowerCase() }, '', `${section.toLowerCase()}.html`);
        applyPageSeo(section);

        const timing = { duration: 430, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both' };
        const animations = [];
        outgoing.querySelectorAll('.viewer-menu-entry').forEach((entry, index) => {
          const rowDelay = index * 24;
          animations.push(entry.animate([
            { transform: 'translateX(0)', opacity: 1 },
            { transform: 'translateX(-110vw)', opacity: 0 }
          ], { ...timing, delay: rowDelay }));
          entry.querySelectorAll('.viewer-menu-transition-character').forEach((character, characterIndex) => {
            animations.push(character.animate([
              { transform: 'translateX(0)', opacity: 1 },
              { transform: 'translateX(-24px)', opacity: 0 }
            ], {
              duration: 330,
              delay: rowDelay + characterIndex * 7,
              easing: 'cubic-bezier(.55, 0, 1, .45)',
              fill: 'both'
            }));
          });
        });
        incoming.querySelectorAll('.viewer-menu-entry').forEach((entry, index) => {
          const rowDelay = 70 + index * 24;
          animations.push(entry.animate([
            { transform: 'translateX(110vw)', opacity: 0, offset: 0, easing: 'cubic-bezier(.22, 1, .36, 1)' },
            { transform: 'translateX(-120px)', opacity: 1, offset: .48, easing: 'cubic-bezier(.16, 1, .3, 1)' },
            { transform: 'translateX(0)', opacity: 1, offset: 1 }
          ], { ...timing, duration: 1200, delay: rowDelay }));
          entry.querySelectorAll('.viewer-menu-transition-character').forEach((character, characterIndex) => {
            animations.push(character.animate([
              { transform: 'translateX(38px)', opacity: 0 },
              { transform: 'translateX(0)', opacity: 1 }
            ], {
              duration: 520,
              delay: rowDelay + 120 + characterIndex * 9,
              easing: 'cubic-bezier(.16, 1, .3, 1)',
              fill: 'both'
            }));
          });
        });
        await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
        renderViewerMenu(section);
        viewerMenu.scrollTop = 0;
        viewerMenuList.style.visibility = '';
        layer.remove();
        menuCategoryTransitioning = false;
        syncMenuScrollCue();
        requestAnimationFrame(syncMenuHoverUnderCursor);
      }

      function openViewerMenu(section = activeViewerSection) {
        document.body.classList.remove('thumbnail-hover');
        clearViewerInfoHint();
        clearViewerFluidPull();
        clearImageNavigationCursor();
        updateViewerTabs(section);
        renderViewerMenu(section);
        viewerMenu.scrollTop = 0;
        syncMenuScrollCue();
        viewerMenuPreview.classList.remove('visible');
        hoveredMenuEntry = null;
        cursorActionCount.classList.remove('visible');
        viewer.classList.add('menu-open');
        document.body.classList.add('viewer-menu-open');
        cursorActionLabel.textContent = 'IMAGE';
      }

      async function openViewerMenuWithSweep(section = activeViewerSection) {
        if (menuCategoryTransitioning) return;
        menuCategoryTransitioning = true;
        updateViewerTabs(section);
        history.pushState({ page: section.toLowerCase() }, '', `${section.toLowerCase()}.html`);
        applyPageSeo(section);
        const breadcrumb = viewer.querySelector('.viewer-breadcrumb');
        breadcrumb.style.opacity = '0';
        viewer.classList.add('menu-open');
        const wheelMode = document.documentElement.classList.contains('mobile-project-wheel');
        const mobileTopbarElements = [mobileStaticLogo, mobileStaticClose].filter(Boolean);
        mobileTopbarElements.forEach(element => { element.style.opacity = '0'; });
        if (wheelMode) viewerMenuList.style.opacity = '0';

        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        viewer.appendChild(sweep);
        const sweepAnimation = sweep.animate([
          { transform: 'scaleY(0)' },
          { transform: 'scaleY(1)' }
        ], {
          duration: 460,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await sweepAnimation.finished.catch(() => {});

        openViewerMenu(section);
        breadcrumb.style.opacity = '';
        const topbarReveals = mobileTopbarElements.map((element, index) => element.animate([
          { opacity: 0, transform: 'translateY(-26px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 520,
          delay: 35 + index * 72,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both'
        }));
        let reveals = topbarReveals;
        if (wheelMode) {
          await mobileWheelReadyPromise;
          const listReveal = viewerMenuList.animate([
            { opacity: 0 },
            { opacity: 1 }
          ], { duration: 320, easing: 'ease', fill: 'both' });
          reveals = [...reveals, listReveal];
        } else {
          const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
          const entryReveals = entries.map((entry, index) => entry.animate([
            { opacity: 0, transform: 'translateY(-30px)' },
            { opacity: .28, transform: 'translateY(-18px)', offset: .38 },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 520,
            delay: 40 + index * 46,
            easing: 'cubic-bezier(.22, 1, .36, 1)',
            fill: 'both'
          }));
          reveals = [...reveals, ...entryReveals];
        }
        sweep.remove();
        await Promise.all(reveals.map(animation => animation.finished.catch(() => {})));
        reveals.forEach(animation => animation.cancel());
        viewerMenuList.style.opacity = '';
        mobileTopbarElements.forEach(element => { element.style.opacity = '1'; });
        menuCategoryTransitioning = false;
        syncMenuScrollCue();
        requestAnimationFrame(syncMenuHoverUnderCursor);
      }

      async function closeMenuWithStagger(destination = 'index.html') {
        if (menuCategoryTransitioning) return;
        menuCategoryTransitioning = true;
        const elements = [
          ...viewerMenuList.querySelectorAll('.viewer-menu-entry'),
          mobileStaticLogo,
          mobileStaticClose
        ].filter(Boolean);
        const exits = elements.map((element, index) => element.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-22px)' }
        ], {
          duration: 360,
          delay: index * 24,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));
        location.href = destination;
      }

      mobileSectionNav?.addEventListener('click', event => {
        const link = event.target.closest('a[href]');
        if (!link || link.classList.contains('active')) return;
        if (!matchMedia(mobileLayoutQuery).matches) return;
        event.preventDefault();
        const destination = link.getAttribute('href');
        if (/^\/?labz\/?(?:index\.html)?$/i.test(destination)) {
          navigateFromHome(destination);
          return;
        }
        closeMenuWithStagger(destination);
      });
      mobileStaticClose?.addEventListener('click', () => {
        if (document.documentElement.classList.contains('mobile-aito-detail')) {
          closeMobileDetailWithStagger();
          return;
        }
        closeMenuWithStagger('index.html');
      });

      function syncMobileSectionNavigation() {
        if (!mobileSectionNav || !matchMedia(mobileLayoutQuery).matches) return;
        const activeFile = pageSection.toLowerCase() + '.html';
        const links = [...mobileSectionNav.querySelectorAll('a[href]')];
        links.forEach(link => {
          const selected = link.getAttribute('href') === activeFile;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
        const activeLink = links.find(link => link.classList.contains('active'));
        requestAnimationFrame(() => activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }));
      }

      let mobileSectionNavStretchFrame = 0;
      function updateMobileSectionNavStretch() {
        mobileSectionNavStretchFrame = 0;
        if (!mobileSectionNav || !matchMedia(mobileLayoutQuery).matches) return;
        const containerRect = mobileSectionNav.getBoundingClientRect();
        const pills = mobileSectionNav.querySelectorAll('.mobile-section-pill');
        pills.forEach(pill => {
          const rect = pill.getBoundingClientRect();
          const width = rect.width || 1;
          let clipped = 0;
          let origin = '';
          if (rect.left < containerRect.left) {
            clipped = Math.min(1, (containerRect.left - rect.left) / width);
            origin = 'left center';
          } else if (rect.right > containerRect.right) {
            clipped = Math.min(1, (rect.right - containerRect.right) / width);
            origin = 'right center';
          }
          pill.style.zIndex = String(Math.round((1 - clipped) * 100));
          if (clipped > .01) {
            const eased = clipped * clipped * (3 - 2 * clipped);
            const stretch = 1 + eased * .3;
            const squish = 1 - eased * .14;
            pill.style.transformOrigin = origin;
            pill.style.transform = `scaleX(${stretch.toFixed(3)}) scaleY(${squish.toFixed(3)})`;
          } else {
            pill.style.transform = '';
            pill.style.transformOrigin = '';
          }
        });
      }
      function scheduleMobileSectionNavStretch() {
        if (mobileSectionNavStretchFrame || !mobileSectionNav) return;
        mobileSectionNavStretchFrame = requestAnimationFrame(updateMobileSectionNavStretch);
      }
      mobileSectionNav?.addEventListener('scroll', scheduleMobileSectionNavStretch, { passive: true });
      window.addEventListener('resize', scheduleMobileSectionNavStretch);

      const isMobileViewport = () => matchMedia(mobileLayoutQuery).matches;
      let mobileDetailScrollFrame = 0;
      let mobileDetailLastScrollTop = 0;
      let mobileDetailHeadingTimer = 0;
      let mobileDetailShowsTitle = false;
      const mobileDetailCounter = document.createElement('span');
      mobileDetailCounter.className = 'mobile-project-detail-counter';
      mobileDetailCounter.setAttribute('aria-live', 'polite');
      document.body.appendChild(mobileDetailCounter);

      function renderMobileDetailHeading() {
        if (mobileDetailShowsTitle) {
          mobileDetailCounter.textContent = activeProject?.title || '';
          mobileDetailCounter.classList.add('showing-project-title');
          return;
        }
        mobileDetailCounter.textContent = `IMG ${mobileDetailCounter.dataset.current || '1'} • ${mobileDetailCounter.dataset.total || '1'}`;
        mobileDetailCounter.classList.remove('showing-project-title');
      }

      function startMobileDetailHeadingSwap() {
        if (mobileDetailHeadingTimer) return;
        mobileDetailShowsTitle = false;
        renderMobileDetailHeading();
        mobileDetailHeadingTimer = window.setInterval(() => {
          mobileDetailShowsTitle = !mobileDetailShowsTitle;
          renderMobileDetailHeading();
        }, 4000);
      }

      function stopMobileDetailHeadingSwap() {
        clearInterval(mobileDetailHeadingTimer);
        mobileDetailHeadingTimer = 0;
        mobileDetailShowsTitle = false;
        renderMobileDetailHeading();
      }

      function syncMobileDetailHeadingSwap() {
        if (!document.documentElement.classList.contains('mobile-aito-detail')) return;
        const detailTop = mobileProjectDetail.getBoundingClientRect().top;
        const headingOutOfView = mobileProjectDetailTitle.getBoundingClientRect().bottom <= detailTop;
        if (headingOutOfView) startMobileDetailHeadingSwap();
        else stopMobileDetailHeadingSwap();
      }

      function setMobileDetailCounter(current, total, animate = true) {
        mobileDetailCounter.dataset.current = String(current);
        mobileDetailCounter.dataset.total = String(total);
        if (!mobileDetailShowsTitle) renderMobileDetailHeading();
      }

      async function closeMobileDetailWithStagger() {
        if (menuCategoryTransitioning) return;
        stopMobileDetailHeadingSwap();
        menuCategoryTransitioning = true;
        const visibleCards = [...mobileProjectDetailImages.querySelectorAll('.mobile-project-detail-card')]
          .filter(card => {
            const rect = card.getBoundingClientRect();
            return rect.bottom > 64 && rect.top < innerHeight - 64;
          });
        const elements = [
          mobileStaticLogo,
          mobileDetailCounter,
          mobileStaticClose,
          mobileProjectDetailTitle,
          ...visibleCards,
          mobileSectionNav
        ].filter(Boolean);
        const exits = elements.map((element, index) => element.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-20px)' }
        ], {
          duration: 420,
          delay: index * 38,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));
        location.href = `${pageSection.toLowerCase()}.html`;
      }

      function updateMobileDetailCounter() {
        mobileDetailScrollFrame = 0;
        if (!document.documentElement.classList.contains('mobile-aito-detail')) return;
        const cards = [...mobileProjectDetailImages.querySelectorAll('.mobile-project-detail-card')];
        let current = 0;
        cards.forEach((card, index) => {
          if (card.getBoundingClientRect().bottom <= 64.5) current = Math.min(index + 1, cards.length - 1);
        });
        setMobileDetailCounter(current + 1, cards.length, true);
      }

      function scheduleMobileDetailCounter() {
        if (mobileDetailScrollFrame) return;
        mobileDetailScrollFrame = requestAnimationFrame(updateMobileDetailCounter);
      }

      function syncMobileDetailTopbarVisibility() {
        if (!document.documentElement.classList.contains('mobile-aito-detail')) return;
        const currentScrollTop = Math.max(0, mobileProjectDetail.scrollTop);
        const delta = currentScrollTop - mobileDetailLastScrollTop;
        if (delta > 4 && currentScrollTop > 24) {
          document.documentElement.classList.add('mobile-detail-nav-hidden');
        } else if (delta < -4) {
          document.documentElement.classList.remove('mobile-detail-nav-hidden');
        }
        mobileDetailLastScrollTop = currentScrollTop;
      }

      function buildMobileInfoBack(projectItem) {
        const back = document.createElement('div');
        back.className = 'mobile-project-detail-back';
        const lines = projectInfo[projectItem.slug] || ['Project information coming soon.'];
        back.append(...lines.map(line => {
          const row = document.createElement('p');
          row.dataset.infoLine = line;
          row.textContent = line;
          return row;
        }));
        return back;
      }

      let mobileViewerInfoTypeToken = 0;

      async function typeMobileViewerInfoLines(back) {
        const token = ++mobileViewerInfoTypeToken;
        const lines = [...back.querySelectorAll('[data-info-line]')];
        lines.forEach(line => renderViewerInfoLine(
          line,
          encryptViewerInfoText(line.dataset.infoLine || '')
        ));
        if (token !== mobileViewerInfoTypeToken) return;
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => {
          const started = performance.now();
          const settleDuration = 240;
          let frameNumber = 0;
          const frame = now => {
            if (token !== mobileViewerInfoTypeToken) return resolve();
            const progress = Math.min(1, (now - started) / settleDuration);
            lines.forEach(line => {
              const realValue = line.dataset.infoLine || '';
              renderViewerInfoLine(line, progress === 1 ? realValue : scrambleViewerInfoText(realValue, progress));
            });
            frameNumber++;
            if (progress === 1) resolve();
            else requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        });
      }

      function openMobileProjectDetail(projectItem) {
        if (!isMobileViewport() || !projectItem || projectItem.category !== pageSection) return false;
        setActiveProject(projectItem);
        closeViewerMenu();
        mobileWheelThumbRow.style.display = 'none';
        mobileWheelCountPill.style.display = 'none';
        viewer.classList.add('open', 'mobile-detail-open');
        document.body.classList.add('viewer-open');
        document.documentElement.classList.add('mobile-aito-detail');
        mobileProjectDetailTitle.textContent = projectItem.title;
        mobileProjectDetailImages.replaceChildren(...projectItem.images.map((source, index) => {
          const card = document.createElement('article');
          card.className = 'mobile-project-detail-card';
          card.dataset.imageIndex = String(index);
          const inner = document.createElement('div');
          inner.className = 'mobile-project-detail-card-inner';
          const front = document.createElement('div');
          front.className = 'mobile-project-detail-front';
          const isVideo = Boolean(
            projectItem.video
            && Number.isInteger(projectItem.videoIndex)
            && projectItem.videoIndex === index
          );
          if (isVideo) {
            card.classList.add('is-video');
            const video = document.createElement('iframe');
            video.className = 'mobile-project-detail-video';
            video.src = resolveVideoEmbedUrl(projectItem.video);
            video.title = `${projectItem.title}, video ${index + 1} of ${projectItem.images.length}`;
            video.loading = 'lazy';
            video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            video.referrerPolicy = 'strict-origin-when-cross-origin';
            video.allowFullscreen = true;
            front.appendChild(video);
            inner.appendChild(front);
            card.appendChild(inner);
            return card;
          }
          const image = document.createElement('img');
          image.src = source;
          image.alt = `${projectItem.title}, image ${index + 1} of ${projectItem.images.length}`;
          image.draggable = false;
          front.appendChild(image);
          if (index === 0) {
            front.classList.add('is-loading');
            let firstImageRevealTimer = 0;
            const revealFirstImage = () => {
              clearTimeout(firstImageRevealTimer);
              const landscapeReferenceY = image.clientWidth * .375;
              const imageCenterY = image.clientHeight / 2;
              front.style.setProperty('--mobile-info-pill-y', `${Math.round(Math.min(imageCenterY, landscapeReferenceY))}px`);
              front.style.aspectRatio = 'auto';
              firstImageRevealTimer = setTimeout(() => {
                front.classList.add('is-loaded');
                card.classList.add('info-prompt-expired');
              }, 1800);
            };
            front.style.aspectRatio = '4 / 3';
            image.addEventListener('load', revealFirstImage, { once: true });
            if (image.complete && image.naturalWidth) requestAnimationFrame(revealFirstImage);
            const prompt = document.createElement('span');
            prompt.className = 'mobile-project-detail-info-pill ants-ready';
            prompt.style.cssText = 'width:176px;min-width:176px;height:44px;padding:0 24px;box-sizing:border-box;';
            const promptAnts = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            promptAnts.classList.add('mobile-project-detail-info-pill-ants');
            promptAnts.setAttribute('aria-hidden', 'true');
            promptAnts.setAttribute('viewBox', '0 0 176 44');
            const promptAntsBlack = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            const promptAntsWhite = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            promptAntsBlack.setAttribute('class', 'ants-black');
            promptAntsWhite.setAttribute('class', 'ants-white');
            [promptAntsBlack, promptAntsWhite].forEach(edge => {
              edge.setAttribute('x', '.5');
              edge.setAttribute('y', '.5');
              edge.setAttribute('width', '175');
              edge.setAttribute('height', '43');
              edge.setAttribute('rx', '21.5');
              edge.setAttribute('ry', '21.5');
            });
            promptAnts.append(promptAntsBlack, promptAntsWhite);
            const promptLabel = document.createElement('span');
            promptLabel.className = 'mobile-project-detail-info-pill-label';
            promptLabel.textContent = 'TAP FOR INFO';
            prompt.append(promptAnts, promptLabel);
            front.appendChild(prompt);
            const pulse = document.createElement('img');
            pulse.className = 'mobile-project-detail-pulse';
            pulse.src = 'assets/img/misc/pulse.svg';
            pulse.alt = '';
            pulse.setAttribute('aria-hidden', 'true');
            pulse.draggable = false;
            front.appendChild(pulse);
            const back = buildMobileInfoBack(projectItem);
            inner.append(front, back);
            let mobileCardFlipping = false;
            card.classList.add('is-flippable');
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Show project information');
            const setCardHeight = (height, animate = true) => {
              if (!animate) inner.style.transition = 'none';
              inner.style.height = `${Math.ceil(height)}px`;
              if (!animate) {
                inner.offsetHeight;
                inner.style.transition = '';
              }
            };
            const syncFlippedHeight = (animate = true) => {
              const frontHeight = front.offsetHeight;
              const targetHeight = card.classList.contains('is-flipped')
                ? Math.max(frontHeight, back.scrollHeight)
                : frontHeight;
              if (animate) {
                setCardHeight(inner.offsetHeight || frontHeight, false);
                requestAnimationFrame(() => setCardHeight(targetHeight));
              } else {
                setCardHeight(targetHeight, false);
              }
            };
            const toggle = () => {
              if (!front.classList.contains('is-loaded') || mobileCardFlipping) return;
              mobileCardFlipping = true;
              card.classList.add('is-flipping');
              card.classList.add('was-opened');
              const flipped = card.classList.toggle('is-flipped');
              const warpFlip = inner.animate(
                viewerInfoFlipFrames('Y', flipped ? 0 : 180, flipped ? 180 : 0),
                {
                  duration: 720,
                  easing: 'cubic-bezier(.65, 0, .35, 1)'
                }
              );
              warpFlip.finished.catch(() => {}).finally(() => {
                mobileCardFlipping = false;
                card.classList.remove('is-flipping');
              });
              card.setAttribute('aria-label', flipped ? 'Return to project image' : 'Show project information');
              syncFlippedHeight(true);
              if (flipped) {
                [...back.querySelectorAll('[data-info-line]')].forEach(line => {
                  renderViewerInfoLine(line, encryptViewerInfoText(line.dataset.infoLine || ''));
                });
                window.setTimeout(() => {
                  if (card.classList.contains('is-flipped')) typeMobileViewerInfoLines(back);
                }, 380);
              } else {
                mobileViewerInfoTypeToken++;
              }
            };
            card.addEventListener('click', toggle);
            card.addEventListener('keydown', event => {
              if (event.key !== 'Enter' && event.key !== ' ') return;
              event.preventDefault();
              toggle();
            });
            image.addEventListener('load', () => syncFlippedHeight(false), { once: true });
            addEventListener('resize', () => syncFlippedHeight(false), { passive: true });
          } else {
            inner.appendChild(front);
          }
          card.appendChild(inner);
          return card;
        }));
        mobileProjectDetail.setAttribute('aria-hidden', 'false');
        mobileProjectDetail.scrollTop = 0;
        mobileDetailLastScrollTop = 0;
        document.documentElement.classList.remove('mobile-detail-nav-hidden');
        setMobileDetailCounter(1, projectItem.images.length, false);
        stopMobileDetailHeadingSwap();
        const detailCards = [...mobileProjectDetailImages.querySelectorAll('.mobile-project-detail-card')];
        const revealObserver = new IntersectionObserver(entries => {
          entries.forEach(item => {
            if (!item.isIntersecting) return;
            item.target.classList.add('is-settled');
            revealObserver.unobserve(item.target);
          });
        }, { root: mobileProjectDetail, threshold: .18, rootMargin: '0px 0px -8% 0px' });
        detailCards.forEach(card => revealObserver.observe(card));
        try {
          const url = new URL(location.href);
          url.searchParams.set('project', projectItem.slug);
          history.pushState({ project: projectItem.slug }, '', url);
        } catch (_) {}
        requestAnimationFrame(updateMobileDetailCounter);
        return true;
      }

      mobileProjectDetail?.addEventListener('scroll', () => {
        scheduleMobileDetailCounter();
        syncMobileDetailTopbarVisibility();
        syncMobileDetailHeadingSwap();
      }, { passive: true });
      mobileProjectDetailBackTop?.addEventListener('click', () => {
        mobileProjectDetail.scrollTo({ top: 0, behavior: 'smooth' });
      });

      function navigateAdjacentMobileProject(direction) {
        const projects = projectCatalog[pageSection] || [];
        if (!projects.length || !activeProject) return;
        const currentIndex = Math.max(0, projects.findIndex(project => project.slug === activeProject.slug));
        const target = projects[(currentIndex + direction + projects.length) % projects.length];
        location.href = `${pageSection.toLowerCase()}.html?project=${encodeURIComponent(target.slug)}`;
      }

      mobileProjectDetailPrevious?.addEventListener('click', () => navigateAdjacentMobileProject(-1));
      mobileProjectDetailNext?.addEventListener('click', () => navigateAdjacentMobileProject(1));

      mobileSectionNav?.addEventListener('click', event => {
        const link = event.target.closest('.mobile-section-pill.active');
        if (!link || !document.documentElement.classList.contains('mobile-aito-detail')) return;
        event.preventDefault();
        location.href = `${pageSection.toLowerCase()}.html`;
      });

      async function openProjectFromMenu(entry) {
        if (menuCategoryTransitioning || !viewer.classList.contains('menu-open')) return;
        const selectedProject = projectBySlug.get(entry.dataset.projectSlug);
        if (!selectedProject) return;
        if (isMobileViewport() && selectedProject.category === pageSection) {
          location.href = `${pageSection.toLowerCase()}.html?project=${encodeURIComponent(selectedProject.slug)}`;
          return;
        }
        menuCategoryTransitioning = true;
        clearTimeout(cursorCountTimer);
        setMenuEntryActive(null);
        viewerMenuPreview.classList.remove('visible');
        cursorActionCount.classList.remove('visible');
        mobileWheelThumbRow.style.display = 'none';
        mobileWheelCountPill.style.display = 'none';

        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        const exits = entries.map((item, index) => item.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: .3, transform: 'translateY(18px)', offset: .62 },
          { opacity: 0, transform: 'translateY(30px)' }
        ], {
          duration: 380,
          delay: index * 34,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'both'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));

        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        sweep.style.transform = 'scaleY(1)';
        sweep.style.transformOrigin = '50% 100%';
        viewer.appendChild(sweep);
        closeViewerMenu();
        setActiveProject(selectedProject);
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        try {
          const url = new URL(location.href);
          url.searchParams.set('project', selectedProject.slug);
          history.pushState({ project: selectedProject.slug }, '', url);
        } catch (_) {}
        if (selectedProject.video && !Number.isInteger(selectedProject.videoIndex)) {
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(selectedProject.video);
          viewerThumbnails.replaceChildren();
          updateViewerBreadcrumb();
        } else {
          viewerImageIndex = 0;
          viewerImage.src = images[0];
          await viewerImage.decode?.().catch(() => {});
          renderViewerThumbnails();
          positionViewerInfoElements();
        }
        const reveal = sweep.animate([
          { transform: 'scaleY(1)' },
          { transform: 'scaleY(0)' }
        ], {
          duration: 500,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await reveal.finished.catch(() => {});
        sweep.remove();
        exits.forEach(animation => animation.cancel());
        menuCategoryTransitioning = false;
        syncOverlayPointerState(pointerClientX, pointerClientY);
        if (!selectedProject.video || Number.isInteger(selectedProject.videoIndex)) scheduleViewerInfoHint();
      }

      function closeViewerMenu() {
        viewer.classList.remove('menu-open');
        document.body.classList.remove('viewer-menu-open');
        document.body.classList.remove('thumbnail-hover');
        document.body.classList.remove('viewer-tab-hover');
        document.body.classList.remove('viewer-detail-menu-cursor');
        clearImageNavigationCursor();
        viewerMenuPreview.classList.remove('visible');
        clearTimeout(cursorCountTimer);
        setMenuEntryActive(null);
        cursorActionLabel.textContent = 'MENU';
      }

      function resolveVideoEmbedUrl(source) {
        const url = new URL(source, location.href);
        const clientOrigin = location.protocol === 'http:' || location.protocol === 'https:'
          ? location.origin
          : 'https://www.tokonoma.xyz';
        url.searchParams.set('origin', clientOrigin);
        url.searchParams.set('enablejsapi', '1');
        return url.href;
      }

      function updateStaticContentFades() {
        const hasOverflow = viewerStaticContent.scrollHeight > viewerStaticContent.clientHeight + 2;
        const isScrolled = viewerStaticContent.scrollTop > 2;
        const isAtBottom = viewerStaticContent.scrollTop + viewerStaticContent.clientHeight
          >= viewerStaticContent.scrollHeight - 2;
        viewerStaticContent.classList.toggle('has-overflow', hasOverflow);
        viewerStaticContent.classList.toggle('is-scrolled', hasOverflow && isScrolled);
        viewerStaticContent.classList.toggle('is-at-bottom', hasOverflow && isAtBottom);
      }

      viewerStaticContent.addEventListener('scroll', updateStaticContentFades, { passive: true });
      addEventListener('resize', updateStaticContentFades, { passive: true });
      if ('ResizeObserver' in window) {
        new ResizeObserver(updateStaticContentFades).observe(viewerStaticCopy);
      }

      let staticSlideshowTimer = null;
      let staticImageMasker = null;
      let staticImageBusy = false;
      function createGridFlipMasker(image) {
        const canvas = document.createElement('canvas');
        canvas.className = 'static-image-mask';
        viewer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const cols = 6;
        const rows = 4;
        let boxWidth = 0;
        let boxHeight = 0;

        function configure() {
          const rect = image.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          boxWidth = rect.width;
          boxHeight = rect.height;
          canvas.style.left = rect.left + 'px';
          canvas.style.top = rect.top + 'px';
          canvas.style.width = rect.width + 'px';
          canvas.style.height = rect.height + 'px';
          canvas.width = Math.max(1, Math.round(rect.width * ratio));
          canvas.height = Math.max(1, Math.round(rect.height * ratio));
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function containRect(naturalW, naturalH) {
          if (!naturalW || !naturalH) return { x: 0, y: 0, width: boxWidth, height: boxHeight };
          const scale = Math.min(boxWidth / naturalW, boxHeight / naturalH);
          const width = naturalW * scale;
          const height = naturalH * scale;
          return { x: (boxWidth - width) / 2, y: 0, width, height };
        }

        function drawFitCell(sourceImg, fit, boxX, boxY, cellW, cellH) {
          if (!fit.width || !fit.height) return;
          const relX = (boxX - fit.x) / fit.width;
          const relY = (boxY - fit.y) / fit.height;
          const relW = cellW / fit.width;
          const relH = cellH / fit.height;
          if (relX + relW <= 0 || relX >= 1 || relY + relH <= 0 || relY >= 1) return;
          const naturalW = sourceImg.naturalWidth || boxWidth;
          const naturalH = sourceImg.naturalHeight || boxHeight;
          ctx.drawImage(
            sourceImg,
            relX * naturalW, relY * naturalH,
            relW * naturalW, relH * naturalH,
            boxX, boxY, cellW, cellH
          );
        }

        async function transitionTo(nextSrc, duration = matchMedia(mobileLayoutQuery).matches ? 620 : 850) {
          configure();
          const oldFit = containRect(image.naturalWidth, image.naturalHeight);
          const nextImage = new Image();
          await new Promise(resolve => {
            nextImage.onload = resolve;
            nextImage.onerror = resolve;
            nextImage.src = nextSrc;
          });
          configure();
          const newFit = containRect(nextImage.naturalWidth, nextImage.naturalHeight);
          const cellW = boxWidth / cols;
          const cellH = boxHeight / rows;
          const delays = [];
          let maxDelay = 0;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const wave = (col / Math.max(1, cols - 1)) * .6 + (row / Math.max(1, rows - 1)) * .25 + Math.random() * .15;
              delays.push(wave);
              if (wave > maxDelay) maxDelay = wave;
            }
          }
          const cellDuration = duration * .55;
          const spreadDuration = Math.max(1, duration - cellDuration);
          canvas.style.opacity = '1';
          await new Promise(resolve => {
            const started = performance.now();
            function frame(now) {
              const elapsed = now - started;
              ctx.clearRect(0, 0, boxWidth, boxHeight);
              let allDone = true;
              for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                  const index = row * cols + col;
                  const cellStart = (delays[index] / (maxDelay || 1)) * spreadDuration;
                  if (elapsed < cellStart) { allDone = false; continue; }
                  let t = (elapsed - cellStart) / cellDuration;
                  t = Math.max(0, Math.min(1, t));
                  if (t < 1) allDone = false;
                  const boxX = col * cellW;
                  const boxY = row * cellH;
                  const cx = boxX + cellW / 2;
                  const cy = boxY + cellH / 2;
                  let scaleX;
                  let skew;
                  let alpha;
                  let sourceImg;
                  let fit;
                  if (t < .5) {
                    const p = t / .5;
                    scaleX = 1 - p;
                    skew = p * .3;
                    alpha = 1 - p * .55;
                    sourceImg = image;
                    fit = oldFit;
                  } else {
                    const p = (t - .5) / .5;
                    scaleX = p;
                    skew = (1 - p) * -.3;
                    alpha = .45 + p * .55;
                    sourceImg = nextImage;
                    fit = newFit;
                  }
                  ctx.save();
                  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
                  ctx.translate(cx, cy);
                  ctx.transform(scaleX, 0, skew, 1, 0, 0);
                  ctx.translate(-cx, -cy);
                  drawFitCell(sourceImg, fit, boxX, boxY, cellW, cellH);
                  ctx.restore();
                }
              }
              if (!allDone) requestAnimationFrame(frame);
              else {
                ctx.clearRect(0, 0, boxWidth, boxHeight);
                canvas.style.opacity = '0';
                resolve();
              }
            }
            requestAnimationFrame(frame);
          });
          image.src = nextSrc;
        }

        function destroy() {
          canvas.remove();
        }

        return { configure, transitionTo, destroy };
      }


      function openStaticPage(section) {
        const content = {
          ABOUT: {
            title: 'ABOUT',
            imageAlt: 'Amogh R Raikar — Software Developer & Creative Technologist',
            imagePool: projectBySlug.get('karatcore-erp')?.images || [],
            copy: `
              <p>I\'m <strong style="color:var(--cursor-color)">Amogh R Raikar</strong>, a BCA student, software developer, and technology enthusiast passionate about building practical software solutions and exploring emerging technologies based in Bengaluru, India.</p>
              <p>My interests include full-stack development, artificial intelligence, cybersecurity, blockchain, and UI/UX design. I enjoy transforming ideas into functional applications, solving real-world problems through technology, and creating intuitive digital experiences.</p>
              <p>From developing ERP systems and AI-powered productivity applications to experimenting with blockchain and modern web technologies, I\'m continuously expanding my skills and building projects that reflect my creativity, technical curiosity, and problem-solving abilities. My goal is to become a versatile software engineer who combines strong engineering fundamentals with thoughtful design.</p>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>ENGINEERING FOCUS</h2>
                <div class="viewer-static-reason">
                  <h3>PRACTICAL IMPACT</h3>
                  <p>Engineering robust, scalable software that addresses real business and user needs directly.</p>
                </div>
                <div class="viewer-static-reason">
                  <h3>EMERGING TECHNOLOGIES</h3>
                  <p>Integrating artificial intelligence, computer vision, and cryptographic ledgers into intuitive user flows.</p>
                </div>
                <div class="viewer-static-reason">
                  <h3>DESIGN &amp; USER EXPERIENCE</h3>
                  <p>Bridging backend precision with clean, modern, and responsive interface systems.</p>
                </div>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>SKILLS &amp; TECHNOLOGIES</h2>
                <h3>LANGUAGES</h3>
                <p>Python &bull; Java &bull; C &bull; C++ &bull; JavaScript &bull; SQL</p>
                <h3>FRONTEND</h3>
                <p>HTML &bull; CSS &bull; JavaScript &bull; Flutter</p>
                <h3>BACKEND</h3>
                <p>Python &bull; FastAPI &bull; Node.js &bull; Express.js &bull; REST APIs</p>
                <h3>DATABASES</h3>
                <p>PostgreSQL &bull; MongoDB &bull; Redis</p>
                <h3>AI &amp; EMERGING TECH</h3>
                <p>Generative AI &bull; Computer Vision &bull; Blockchain</p>
                <h3>TOOLS</h3>
                <p>Git &bull; GitHub &bull; Docker &bull; VS Code &bull; Figma &bull; Antigravity</p>
                <h3>DESIGN</h3>
                <p>UI/UX Design &bull; Responsive Design &bull; Prototyping &bull; Design Systems</p>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>FEATURED PROJECTS</h2>
                <h3>KARATCORE ERP</h3>
                <p>Comprehensive ERP platform for jewellery businesses and gold pledge-loan operations built with Flutter, FastAPI, PostgreSQL, Redis, and Docker.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar/Karatcore-ERP" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB: KARATCORE-ERP</span></a>
                <h3>MENTRA — AI STUDY COACH</h3>
                <p>AI-powered academic companion featuring attention monitoring, study assistants, and gamified productivity dashboards.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">VIEW ON GITHUB</span></a>
                <h3>MINI BLOCKCHAIN</h3>
                <p>Python-based distributed ledger implementation demonstrating cryptographic hashing (SHA-256), block validation, and Proof-of-Work consensus.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar/blockchain-project-1" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB: BLOCKCHAIN-PROJECT-1</span></a>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>LOCATION &amp; CONTACT</h2>
                <p>Bengaluru, Karnataka, India &bull; Open for software engineering roles &amp; tech collaborations.</p>
                <a class="viewer-static-pill" href="contact.html"><span class="viewer-static-pill-label">CONTACT ME</span></a>
              </section>`
          },
          CONTACT: {
            title: 'CONTACT',
            imageAlt: 'Contact Amogh R Raikar',
            imagePool: projectBySlug.get('mentra-ai')?.images || [],
            copy: `
              <div class="viewer-contact-details">
                <h2>AMOGH R RAIKAR</h2>
                <p>Software Developer &amp; Creative Technologist<br>Bengaluru, Karnataka, India</p>
                <div class="viewer-contact-divider">–</div>
                <h3>LOCATION</h3>
                <p>Bengaluru, Karnataka, India</p>
                <div class="viewer-contact-divider">–</div>
                <h3>EMAIL</h3>
                <p><a class="viewer-static-pill" href="mailto:amoghrraikar@gmail.com"><span class="viewer-static-pill-label">AMOGHRAIKAR@GMAIL.COM</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>GITHUB</h3>
                <p><a class="viewer-static-pill" href="https://github.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB.COM/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>LINKEDIN</h3>
                <p><a class="viewer-static-pill" href="https://linkedin.com/in/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">LINKEDIN.COM/IN/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>X / TWITTER</h3>
                <p><a class="viewer-static-pill" href="https://x.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">X.COM/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>CONNECT</h3>
                <p>Always open to exciting opportunities, innovative software projects, and tech conversations.</p>
              </div>`
          }
        }[section];
        if (!content) return;
        viewer.classList.add('open', 'static-page-open');
        viewer.classList.remove('menu-open', 'video-open');
        document.body.classList.add('viewer-open');
        document.body.classList.remove('viewer-menu-open');
        viewerStaticTitle.textContent = content.title;
        viewerStaticCopy.innerHTML = content.copy;
        revealStaticCopy(viewerStaticCopy, viewerStaticContent, viewerStaticPage);
        viewerStaticContent.scrollTop = 0;
        requestAnimationFrame(updateStaticContentFades);
        viewerStaticImage.alt = content.imageAlt;
        if (staticSlideshowTimer) { clearInterval(staticSlideshowTimer); staticSlideshowTimer = null; }
        if (staticImageMasker) { staticImageMasker.destroy(); staticImageMasker = null; }
        staticImageBusy = false;
        viewerStaticImage.onerror = null;
        viewerStaticImage.onload = null;
        viewerStaticImage.classList.remove('unavailable');
        const imagePool = content.imagePool || [];
        let staticImageIndex = 0;
        if (imagePool.length) {
          viewerStaticImage.src = imagePool[staticImageIndex];
          staticImageMasker = createGridFlipMasker(viewerStaticImage);
          staticSlideshowTimer = setInterval(() => {
            if (staticImageBusy || !viewer.classList.contains('static-page-open')) return;
            staticImageBusy = true;
            staticImageIndex = (staticImageIndex + 1) % imagePool.length;
            staticImageMasker.transitionTo(imagePool[staticImageIndex]).finally(() => {
              staticImageBusy = false;
            });
          }, 5000);
        } else {
          viewerStaticImage.removeAttribute('src');
          viewerStaticImage.classList.add('unavailable');
        }
        updateViewerTabs(section);
      }

      async function openStaticPageWithSweep(section) {
        const uiElements = [
          viewer.querySelector('.viewer-logo'),
          viewerTabs,
          viewerClose
        ];
        uiElements.forEach(element => { element.style.opacity = '0'; });
        viewer.classList.add('open', 'static-page-open');
        document.body.classList.add('viewer-open');
        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        viewer.appendChild(sweep);
        const sweepAnimation = sweep.animate([
          { transform: 'scaleY(0)' },
          { transform: 'scaleY(1)' }
        ], {
          duration: 460,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await sweepAnimation.finished.catch(() => {});
        openStaticPage(section);
        const contentElements = [viewerStaticTitle, viewerStaticImage];
        const reveals = [...uiElements, ...contentElements].map((element, index) => element.animate([
          { opacity: 0, transform: 'translateY(-26px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 520,
          delay: 35 + index * 72,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both'
        }));
        sweep.remove();
        await Promise.all(reveals.map(animation => animation.finished.catch(() => {})));
        reveals.forEach(animation => animation.cancel());
        uiElements.forEach(element => { element.style.opacity = ''; });
      }

      async function closeStaticPageWithStagger(destination = 'index.html') {
        if (viewerTransitioning) return;
        viewerTransitioning = true;
        const elements = [
          ...viewerStaticCopy.querySelectorAll('section, p, h2, h3, .viewer-static-pill'),
          viewerStaticImage,
          viewerStaticTitle,
          viewer.querySelector('.viewer-logo'),
          viewerTabs,
          viewerClose
        ].filter(Boolean);
        const exits = elements.map((element, index) => element.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-22px)' }
        ], {
          duration: 360,
          delay: index * 24,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));
        location.href = destination;
      }

      function getOverlayImageSize(image) {
        const naturalWidth = image.naturalWidth || 1;
        const naturalHeight = image.naturalHeight || 1;
        const fit = Math.min(
          1,
          (innerWidth - 112) / naturalWidth,
          (innerHeight - 125) / naturalHeight
        ) * .875;
        return {
          width: naturalWidth * fit,
          height: naturalHeight * fit
        };
      }

      function positionNextPreview() {
        if (!viewer.classList.contains('open') || viewer.classList.contains('menu-open')) return;
        const currentRect = viewerImage.getBoundingClientRect();
        const size = getOverlayImageSize(viewerNextImage);
        const left = Math.max(
          currentRect.right + 32,
          innerWidth - Math.min(size.width * .24, 220)
        );
        viewerNextImage.style.width = `${size.width}px`;
        viewerNextImage.style.height = `${size.height}px`;
        viewerNextImage.style.left = `${left}px`;
        viewerNextImage.style.top = '93px';
        viewerNextZone.style.left = `${left}px`;
        viewerNextZone.style.top = '93px';
        viewerNextZone.style.width = `${size.width}px`;
        viewerNextZone.style.height = `${size.height}px`;
        viewerNextZone.style.translate = '0 0';
      }

      async function positionNextCue() {
        if (!viewer.classList.contains('open') || !images.length || (activeProject?.video && !Number.isInteger(activeProject.videoIndex))) return;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
      }

      async function showNextPreview() {
        if (viewerTransitioning || nextImageTransitioning || viewer.classList.contains('menu-open')) return;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
        viewerNextImage.classList.add('peek');
      }

      function hideNextPreview() {
        if (!nextImageTransitioning) viewerNextImage.classList.remove('peek');
      }

      async function advanceViewerImage() {
        if (viewerTransitioning || nextImageTransitioning || viewer.classList.contains('menu-open')) return;
        nextImageTransitioning = true;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        if (nextIndex !== 0) clearViewerInfoHint();
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
        viewerNextImage.classList.add('peek');
        const target = viewerImage.getBoundingClientRect();
        const preview = viewerNextImage.getBoundingClientRect();
        const nextLeft = (innerWidth - preview.width) / 2;
        const timing = { duration: 520, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' };
        const oldAnimation = viewerImage.animate([
          { transform: 'translateX(0)', opacity: 1 },
          { transform: `translateX(${-target.right - 48}px)`, opacity: 0 }
        ], timing);
        const newAnimation = viewerNextImage.animate([
          { left: `${preview.left}px`, top: `${preview.top}px`, opacity: .3 },
          { left: `${nextLeft}px`, top: '93px', opacity: 1 }
        ], timing);
        await Promise.all([oldAnimation.finished.catch(() => {}), newAnimation.finished.catch(() => {})]);
        viewerImageIndex = nextIndex;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image ${nextIndex + 1} of ${images.length}`;
        if (/^https?:/i.test(images[viewerImageIndex])) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.src = images[viewerImageIndex];
        await viewerImage.decode?.().catch(() => {});
        oldAnimation.cancel();
        newAnimation.cancel();
        viewerNextImage.classList.remove('peek');
        nextImageTransitioning = false;
        updateThumbnailSelection();
        scheduleViewerInfoHint();
        await positionNextCue();
      }

      function openViewer(src, sourceIndex = images.findIndex(item => src.endsWith(item) || src === item)) {
        if (viewerTransitioning) return;
        cancelIdleImage();
        viewerTransitioning = true;
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        viewerImageIndex = sourceIndex >= 0 ? sourceIndex : 0;
        closeViewerMenu();
        updateViewerTabs(activeProject.category);
        updateViewerBreadcrumb();
        if (/^https?:/i.test(src)) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.onload = async () => {
          viewerImage.onload = null;
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          renderViewerThumbnails();
          viewer.focus({ preventScroll: true });
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await positionNextCue();
          if (document.fonts && document.fonts.load) {
            await document.fonts.load(`${asciiFontSize}px EurostileMNExtendedBold`).catch(() => {});
          }
          configureMask();
          await animateMask('reveal');
          viewerTransitioning = false;
          scheduleViewerInfoHint();
        };
        viewerImage.src = src;
      }

      async function closeViewer() {
        if (viewerTransitioning || menuCategoryTransitioning || !viewer.classList.contains('open')) return;
        viewerTransitioning = true;
        if (viewerInfoOpen) await closeViewerInfoCard();
        resetViewerInfoCard();
        clearViewerFluidPull();
        configureMask();
        await animateMask('cover');
        viewer.classList.remove('open');
        viewer.classList.remove('menu-open');
        viewer.classList.remove('video-open', 'static-page-open');
        document.body.classList.remove('viewer-open');
        document.body.classList.remove('viewer-menu-open');
        document.body.classList.remove('thumbnail-hover');
        document.body.classList.remove('viewer-tab-hover');
        clearImageNavigationCursor();
        asciiMask.style.opacity = '0';
        viewerImage.removeAttribute('src');
        viewerVideo.removeAttribute('src');
        viewerNextImage.removeAttribute('src');
        viewerNextImage.classList.remove('peek');
        viewerMenuPreview.classList.remove('visible');
        clearTimeout(cursorCountTimer);
        cursorActionCount.classList.remove('visible');
        cursorActionLabel.textContent = 'MENU';
        history.replaceState({ page: 'home' }, '', 'index.html');
        applyPageSeo('HOME');
        viewerTransitioning = false;
      }

      function cancelIdleImage() {
        window.clearTimeout(trailIdleTimer);
        trailIdleTimer = 0;
        document.body.classList.remove('trail-action');
        document.querySelectorAll('.trail-image.idle-focus').forEach(image => {
          image.classList.remove('idle-focus');
        });
      }

      function scheduleIdleImage(x, y) {
        if (awwwardsHoverActive) return;
        window.clearTimeout(trailIdleTimer);
        trailIdleTimer = window.setTimeout(() => {
          if (awwwardsHoverActive || viewer.classList.contains('open') || pillDragActive) return;
          if (!latestTrailImage?.isConnected) addTrailImage(x, y);
          latestTrailImage.style.zIndex = String(++topLayer);
          latestTrailImage.classList.add('idle-focus');
          document.body.classList.add('trail-action');
        }, 500);
      }

      function addTrailImage(x, y, failedAttempts = 0) {
        if (awwwardsHoverActive) return;
        const image = document.createElement('img');
        const trailItem = homeTrailItems[imageIndex++ % homeTrailItems.length];
        const assignedIndex = trailItem.imageIndex;
        image.className = 'trail-image';
        image.alt = '';
        image.style.left = x + 'px';
        image.style.top = y + 'px';
        image.style.visibility = 'hidden';
        image.style.zIndex = String(++topLayer);
        image.style.setProperty('--rotation', ((Math.random() * 10) - 5).toFixed(2) + 'deg');
        image.draggable = false;
        latestTrailImage = image;

        image.addEventListener('load', () => {
          image.style.visibility = 'visible';
        }, { once: true });
        image.addEventListener('error', () => {
          image.remove();
          if (latestTrailImage === image) latestTrailImage = null;
          console.warn('[Tokonoma trail] Skipped missing image:', trailItem.src);
          if (failedAttempts < homeTrailItems.length - 1) {
            addTrailImage(x, y, failedAttempts + 1);
          }
        }, { once: true });

        image.addEventListener('click', event => {
          event.stopPropagation();
          if (suppressPhotoClicks) {
            event.preventDefault();
            return;
          }
          setActiveProject(trailItem.project);
          openViewer(image.src, assignedIndex);
        });
        image.addEventListener('animationend', () => image.remove());
        area.appendChild(image);
        image.src = trailItem.src;
      }

      area.addEventListener('pointermove', event => {
        if (awwwardsHoverActive || pillDragActive || viewer.classList.contains('open') || event.pointerType === 'touch') return;

        // Newsletter pulse protected zone: never spawn cursor-trail images in the
        // top-right 200 × 100 px desktop area.
        if (event.clientX >= window.innerWidth - 200 && event.clientY <= 100) {
          cancelIdleImage();
          document.body.classList.remove('trail-cursor');
          previousX = -999;
          previousY = -999;
          return;
        }

        document.body.classList.add('trail-cursor');
        cancelIdleImage();
        const rect = area.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        lastTrailX = x;
        lastTrailY = y;
        scheduleIdleImage(lastTrailX, lastTrailY);
        const distance = Math.hypot(x - previousX, y - previousY);
        if (distance < minimumDistance) return;
        previousX = x;
        previousY = y;
        addTrailImage(x, y);
      });

      area.addEventListener('pointerleave', () => {
        cancelIdleImage();
        document.body.classList.remove('trail-cursor');
        previousX = -999;
        previousY = -999;
      });

      area.addEventListener('click', event => {
        if (suppressPhotoClicks) {
          event.preventDefault();
          return;
        }
        if (event.pointerType !== 'mouse') {
          const rect = area.getBoundingClientRect();
          addTrailImage(event.clientX - rect.left, event.clientY - rect.top);
        }
      });

      viewer.addEventListener('click', event => {
        if (event.target.closest('.viewer-close, .viewer-logo, .viewer-tab, .viewer-next-zone, .viewer-thumbnails, .viewer-info-link')) return;
        if (viewer.classList.contains('static-page-open')) return;
        if (menuCategoryTransitioning) return;
        if (viewerInfoOpen) {
          closeViewerInfoCard();
          return;
        }
        if (viewerInfoFlipping) return;
        if (document.body.classList.contains('image-nav-left')) {
          selectViewerImage((viewerImageIndex - 1 + images.length) % images.length);
          return;
        }
        if (document.body.classList.contains('image-nav-right')) {
          selectViewerImage((viewerImageIndex + 1) % images.length);
          return;
        }
        if (viewer.classList.contains('menu-open')) {
          closeViewerMenu();
          scheduleViewerInfoHint();
        } else {
          openViewerMenuWithSweep(activeProject?.category || activeViewerSection);
        }
      });
      viewerStaticCopy.addEventListener('click', event => {
        const link = event.target.closest('.viewer-static-pill');
        if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.protocol === 'mailto:' || link.target === '_blank') return;
        event.preventDefault();
        event.stopPropagation();
        closeStaticPageWithStagger(link.href);
      });
      viewerClose.addEventListener('click', event => {
        event.stopPropagation();
        playUiSound(closeTextSound);
        if (viewer.classList.contains('static-page-open')) {
          closeStaticPageWithStagger('index.html');
          return;
        }
        if (pageSection !== 'HOME' && (viewer.classList.contains('menu-open') || viewer.classList.contains('static-page-open'))) {
          location.href = 'index.html';
          return;
        }
        if (projectCatalog[pageSection] && !viewer.classList.contains('menu-open')) {
          viewer.classList.remove('video-open', 'static-page-open');
          viewerVideo.removeAttribute('src');
          openViewerMenuWithSweep(pageSection);
          return;
        }
        closeViewer();
      });
      viewerTabs.addEventListener('click', async event => {
        const tab = event.target.closest('.viewer-tab');
        if (!tab) return;
        event.stopPropagation();
        const section = tab.dataset.section;
        if (section === 'LABZ') {
          navigateFromHome('labz/');
          return;
        }
        if (section === 'ABOUT' || section === 'CONTACT') {
          location.href = `${section.toLowerCase()}.html`;
          return;
        }
        if (viewerInfoFlipping) return;
        if (viewerInfoOpen) await closeViewerInfoCard();
        resetViewerInfoCard();
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        if (viewer.classList.contains('menu-open')) transitionViewerMenu(section);
        else openViewerMenuWithSweep(section);
      });
      viewerTabs.querySelectorAll('.viewer-tab').forEach(tab => {
        tab.addEventListener('pointerenter', () => document.body.classList.add('viewer-tab-hover'));
        tab.addEventListener('pointerleave', () => document.body.classList.remove('viewer-tab-hover'));
      });
      document.querySelector('.viewer-logo').addEventListener('pointerenter', () => document.body.classList.add('viewer-tab-hover'));
      document.querySelector('.viewer-logo').addEventListener('pointerleave', () => document.body.classList.remove('viewer-tab-hover'));
      viewerNextZone.addEventListener('pointerenter', showNextPreview);
      viewerNextZone.addEventListener('pointerleave', hideNextPreview);
      viewerNextZone.addEventListener('click', event => {
        event.stopPropagation();
        advanceViewerImage();
      });
      viewerMenu.addEventListener('scroll', () => {
        syncMenuScrollCue();
        scheduleMobileProjectWheel();
        if (!menuScrollHoverFrame) menuScrollHoverFrame = requestAnimationFrame(syncMenuHoverUnderCursor);
      }, { passive: true });
      viewerMenu.addEventListener('pointerleave', () => setMenuEntryActive(null));
      document.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        pointerClientX = event.clientX;
        pointerClientY = event.clientY;
        syncOverlayPointerState(event.clientX, event.clientY, event.target);
        if (viewer.classList.contains('menu-open') && !menuScrollHoverFrame) {
          menuScrollHoverFrame = requestAnimationFrame(syncMenuHoverUnderCursor);
        }
        cursorAction.style.left = event.clientX + 'px';
        cursorAction.style.top = event.clientY + 'px';
        updateCursorPillPosition(event.clientX, event.clientY);
      });
      window.addEventListener('popstate', event => {
        const state = event.state;
        if (!state) { location.reload(); return; }
        if (state.project) {
          const project = projectBySlug.get(state.project);
          if (!project) { location.reload(); return; }
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          viewer.classList.remove('menu-open', 'static-page-open', 'video-open');
          viewerVideo.removeAttribute('src');
          setActiveProject(project);
          applyProjectSeo(project);
          return;
        }
        if (state.page && state.page !== 'home' && projectCatalog[state.page.toUpperCase()]) {
          const section = state.page.toUpperCase();
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          viewer.classList.remove('static-page-open', 'video-open');
          viewerVideo.removeAttribute('src');
          openViewerMenu(section);
          applyPageSeo(section);
          return;
        }
        closeViewer();
      });
      document.addEventListener('keydown', event => {
        if (!viewer.classList.contains('open')) return;
        if (event.key === 'Escape') {
          if (viewer.classList.contains('static-page-open')) {
            closeStaticPageWithStagger('index.html');
            return;
          }
          closeViewer();
          return;
        }
        if (event.key.toLowerCase() === 'i' && !viewer.classList.contains('menu-open') && !viewerInfoOpen) {
          event.preventDefault();
          if (viewerInfoFlipping) return;
          openViewerInfoCard();
          return;
        }
        if (event.key.toLowerCase() === 'x' && viewerInfoOpen) {
          event.preventDefault();
          if (viewerInfoFlipping) return;
          closeViewerInfoCard();
          return;
        }
        if (viewerInfoOpen || viewerInfoFlipping) return;
        if (viewer.classList.contains('menu-open') || viewerTransitioning || nextImageTransitioning) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          selectViewerImage((viewerImageIndex - 1 + images.length) % images.length);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          selectViewerImage((viewerImageIndex + 1) % images.length);
        }
      });
      window.addEventListener('resize', () => {
        viewerNextImage.classList.remove('peek');
        updateThumbnailRailLayout();
        if (viewerInfoOpen || viewerInfoFlipping || viewer.classList.contains('info-hint')) {
          positionViewerInfoElements();
        }
        requestAnimationFrame(positionNextCue);
      });

      function bootPage() {
        syncMobileSectionNavigation();
        requestAnimationFrame(updateMobileSectionNavStretch);
        applyPageSeo(pageSection);
        if (pageSection === 'ABOUT' || pageSection === 'CONTACT') {
          openStaticPageWithSweep(pageSection);
          return;
        }
        if (!projectCatalog[pageSection]) return;
        viewer.classList.add('open');
        document.body.classList.add('viewer-open');
        const requestedSlug = new URLSearchParams(location.search).get('project');
        const requestedProject = requestedSlug && projectBySlug.get(requestedSlug);
        if (!requestedProject || requestedProject.category !== pageSection) {
          openViewerMenuWithSweep(pageSection);
          return;
        }
        setActiveProject(requestedProject);
        if (openMobileProjectDetail(requestedProject)) return;
        if (requestedProject.video && !Number.isInteger(requestedProject.videoIndex)) {
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(requestedProject.video);
          updateViewerBreadcrumb();
          return;
        }
        viewer.classList.remove('open');
        document.body.classList.remove('viewer-open');
        openViewer(images[0], 0);
      }

      function preloadMobileWheelThumbnails() {
        if (!document.documentElement.classList.contains('mobile-project-wheel')) return;
        const seen = new Set();
        (projectCatalog[pageSection] || []).forEach(project => {
          const cover = project.images[0];
          if (!cover || seen.has(cover)) return;
          seen.add(cover);
          const preloadImage = new Image();
          preloadImage.src = cover;
        });
      }
      preloadMobileWheelThumbnails();

      bootPage();
    
  }

  async function runStatic(appData) {

      const projectCatalog = appData.projectCatalog;
      const projectInfo = appData.projectInfo;
      const allProjects = Object.values(projectCatalog).flat();
      const projectBySlug = new Map(allProjects.map(item => [item.slug, item]));
      const shuffleCatalog = values => {
        const result = [...values];
        for (let index = result.length - 1; index > 0; index--) {
          const swap = Math.floor(Math.random() * (index + 1));
          [result[index], result[swap]] = [result[swap], result[index]];
        }
        return result;
      };
      const homeTrailItems = shuffleCatalog(allProjects.flatMap(item =>
        item.images.map((src, imageIndex) => ({ src, project: item, imageIndex }))
      ));
      let activeProject = projectBySlug.get('karatcore-erp') || allProjects[0];
      let images = activeProject.images;
      const pageFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const pageSection = ({
        'analog.html': 'ANALOG',
        'ai.html': 'AI',
        'aito.html': 'AITO',
        'shows.html': 'SHOWS',
        'about.html': 'ABOUT',
        'contact.html': 'CONTACT'
      })[pageFile] || 'HOME';

      const area = document.querySelector('#trailArea');

      // Awwwards ribbon hover: random centered YEP GIF at 2x reaction size.
      // Project trail images are suspended only while the pointer is over the ribbon.
      let awwwardsHoverActive = false;
      const awwwardsHoverGif = document.createElement('img');
      awwwardsHoverGif.className = 'awwwards-hover-gif';
      awwwardsHoverGif.alt = '';
      awwwardsHoverGif.draggable = false;
      Object.assign(awwwardsHoverGif.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '10000',
        maxWidth: 'min(640px, 90vw)',
        maxHeight: 'min(320px, 70vh)',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        visibility: 'hidden'
      });
      document.body.appendChild(awwwardsHoverGif);

      let previousAwwwardsGif = 0;
      const showAwwwardsHoverGif = () => {
        let index;
        do index = 1 + Math.floor(Math.random() * 4);
        while (index === previousAwwwardsGif);
        previousAwwwardsGif = index;
        awwwardsHoverGif.src = `assets/img/gif/yep-${index}.gif?restart=${Date.now()}`;
        awwwardsHoverGif.style.visibility = 'visible';
      };
      const hideAwwwardsHoverGif = () => {
        awwwardsHoverGif.style.visibility = 'hidden';
        awwwardsHoverGif.removeAttribute('src');
      };

      // Fallen-pill hover prompt.
      const stitchPrompt = document.createElement('div');
      stitchPrompt.className = 'stitch-me-back-prompt';
      stitchPrompt.style.fontFamily = '"EurostileMNExtendedBold", "Eurostile", sans-serif';
      stitchPrompt.style.color = 'var(--cursor-color)';
      stitchPrompt.setAttribute('aria-hidden', 'true');
      'STITCH ME BACK'.split('').forEach((character, index) => {
        const span = document.createElement('span');
        span.textContent = character === ' ' ? '\u00a0' : character;
        span.style.transitionDelay = `${index * 28}ms`;
        stitchPrompt.appendChild(span);
      });
      Object.assign(stitchPrompt.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '9999',
        display: 'flex',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        visibility: 'hidden',
      });
      document.body.appendChild(stitchPrompt);

      const stitchPromptSpans = [...stitchPrompt.children];
      stitchPromptSpans.forEach(span => Object.assign(span.style, {
        display: 'inline-block',
        opacity: '0',
        transform: 'translateY(12px)',
        transition: 'opacity .32s ease, transform .42s cubic-bezier(.22, 1, .36, 1)'
      }));

      let stitchPromptHideTimer = 0;
      const showStitchPrompt = () => {
        window.clearTimeout(stitchPromptHideTimer);
        stitchPromptHideTimer = 0;
        stitchPrompt.style.visibility = 'visible';
        requestAnimationFrame(() => {
          stitchPromptSpans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
        });
      };

      const hideStitchPrompt = () => {
        stitchPromptSpans.forEach((span, index) => {
          span.style.transitionDelay = `${(stitchPromptSpans.length - 1 - index) * 18}ms`;
          span.style.opacity = '0';
          span.style.transform = 'translateY(-8px)';
        });
        window.clearTimeout(stitchPromptHideTimer);
        stitchPromptHideTimer = window.setTimeout(() => {
          stitchPrompt.style.visibility = 'hidden';
          stitchPromptSpans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 28}ms`;
            span.style.transform = 'translateY(12px)';
          });
          stitchPromptHideTimer = 0;
        }, 500);
      };

      document.addEventListener('pointerover', event => {
        if (matchMedia(mobileLayoutQuery).matches) return;
        const ribbon = event.target.closest?.('.awwwards-badge');
        if (!ribbon || ribbon.contains(event.relatedTarget)) return;
        awwwardsHoverActive = true;
        cancelIdleImage();
        document.querySelectorAll('.trail-image').forEach(image => image.remove());
        latestTrailImage = null;
        showAwwwardsHoverGif();
      });

      document.addEventListener('pointerout', event => {
        if (matchMedia(mobileLayoutQuery).matches) return;
        const ribbon = event.target.closest?.('.awwwards-badge');
        if (!ribbon || ribbon.contains(event.relatedTarget)) return;
        awwwardsHoverActive = false;
        hideAwwwardsHoverGif();
        previousX = -999;
        previousY = -999;
      });

      const viewer = document.querySelector('#viewer');
      const viewerImage = document.querySelector('#viewerImage');
      const viewerVideo = document.querySelector('#viewerVideo');
      const viewerStaticPage = document.querySelector('#viewerStaticPage');
      const viewerStaticTitle = document.querySelector('#viewerStaticTitle');
      const viewerStaticImage = document.querySelector('#viewerStaticImage');
      const viewerStaticContent = document.querySelector('.viewer-static-content');
      const viewerStaticCopy = document.querySelector('#viewerStaticCopy');
      const mobileSectionNav = document.querySelector('#mobileSectionNav');
      const mobileStaticClose = document.querySelector('#mobileStaticClose');
      const mobileStaticLogo = document.querySelector('.mobile-static-logo');
      if (matchMedia(mobileLayoutQuery).matches) {
        const heading = document.createElement('span');
        heading.className = 'mobile-static-page-heading';
        heading.textContent = pageSection;
        document.body.appendChild(heading);
        let lastStaticScrollTop = 0;
        viewerStaticPage.addEventListener('scroll', () => {
          const current = Math.max(0, viewerStaticPage.scrollTop);
          const delta = current - lastStaticScrollTop;
          const staticTop = viewerStaticPage.getBoundingClientRect().top;
          heading.classList.toggle('is-visible', viewerStaticTitle.getBoundingClientRect().bottom <= staticTop);
          if (delta > 4 && current > 24) document.documentElement.classList.add('mobile-static-nav-hidden');
          else if (delta < -4) document.documentElement.classList.remove('mobile-static-nav-hidden');
          lastStaticScrollTop = current;
        }, { passive: true });
      }
      const viewerInfoPrompt = document.querySelector('#viewerInfoPrompt');
      const viewerInfoPromptLabel = document.querySelector('#viewerInfoPromptLabel');
      const viewerInfoBack = document.querySelector('#viewerInfoBack');
      const viewerNextImage = document.querySelector('#viewerNextImage');
      const viewerNextZone = document.querySelector('#viewerNextZone');
      const viewerClose = document.querySelector('#viewerClose');
      const viewerTabs = document.querySelector('#viewerTabs');
      const viewerBreadcrumbPath = document.querySelector('#viewerBreadcrumbPath');
      const viewerBreadcrumbImage = document.querySelector('#viewerBreadcrumbImage');
      const viewerMenu = document.querySelector('#viewerMenu');
      const viewerMenuHighlight = document.querySelector('#viewerMenuHighlight');
      const viewerMenuScrollCue = document.querySelector('#viewerMenuScrollCue');
      const viewerMenuList = document.querySelector('#viewerMenuList');
      const viewerMenuPreview = document.querySelector('#viewerMenuPreview');
      const viewerThumbnails = document.querySelector('#viewerThumbnails');
      const asciiMask = document.querySelector('#asciiMask');
      const matchReaction = document.querySelector('#matchReaction');
      const pointsDisplay = document.querySelector('#pointsDisplay');
      const pointsValue = document.querySelector('#pointsValue');
      const pointsBorder = document.querySelector('#pointsBorder');
      const pointsBorderRect = pointsBorder.querySelector('rect');
      const cursorAction = document.querySelector('#cursorAction');
      const cursorActionLabel = document.querySelector('#cursorActionLabel');
      const cursorActionCount = document.querySelector('#cursorActionCount');
      const updateCursorPillPosition = createCursorPillFollower(cursorActionCount);
      const cursorNavArrowGroup = document.querySelector('#cursorNavArrowGroup');
      const cursorNavArrow = document.querySelector('#cursorNavArrow');
      const menuHoverSound = new Audio('assets/sounds/onscroll.mp3');
      menuHoverSound.preload = 'auto';
      function warmUpMenuHoverSound() {
        menuHoverSound.load();
        menuHoverSound.muted = true;
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().then(() => {
          menuHoverSound.pause();
          menuHoverSound.currentTime = 0;
          menuHoverSound.muted = false;
        }).catch(() => { menuHoverSound.muted = false; });
      }
      window.addEventListener('pointermove', warmUpMenuHoverSound, { once: true });
      window.addEventListener('pointerdown', warmUpMenuHoverSound, { once: true });
      window.addEventListener('touchstart', warmUpMenuHoverSound, { once: true, passive: true });
      const closeTextSound = new Audio('assets/sounds/close.mp3');
      closeTextSound.preload = 'auto';
      function playUiSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
      const maskContext = asciiMask.getContext('2d');
      const glyphs = 'αβγδεζθλμπσφψΩ∞∇∂∑∏∫≈≠≤≥⠀⠁⠂⠄⠈⠐⠠⡀⠃⠅⠉⠑⠡⡁⠆⠊ᚠᚢᚦᚪᚱᚷᚻᚾᛁᛃᛇᛏᛒᛖᛚᛟ■□▪▫▲△▶▼◆◇○●◐◑◒◓▓▒░▐▌▄▀█⌘⌥⌦⌫⎔⎛⎞⎡⎤⎧⎪⎯⎰⎲⎷⏎';
      let imageIndex = 0;
      let previousX = -999;
      let previousY = -999;
      let topLayer = 4;
      let latestTrailImage = null;
      let trailIdleTimer = 0;
      let lastTrailX = 0;
      let lastTrailY = 0;
      let viewerTransitioning = false;
      let viewerImageIndex = 0;
      let activeViewerSection = Object.keys(projectCatalog)[0] || 'FULL-STACK';
      let nextImageTransitioning = false;
      let viewerInfoOpen = false;
      let viewerInfoFlipping = false;
      let viewerInfoHintTimer = 0;
      let viewerInfoHintHideTimer = 0;
      let viewerInfoTypeToken = 0;
      let viewerInfoFlipAxis = 'Y';
      let cursorCountTimer = 0;
      let pointerClientX = 0;
      let pointerClientY = 0;
      let hoveredMenuEntry = null;
      let menuScrollHoverFrame = 0;
      let menuCategoryTransitioning = false;
      let wasInsideViewerImage = false;
      let lastViewerImagePoint = null;
      let lastViewerOutsidePoint = null;
      let fluidPullFrame = 0;
      let fluidPullCanvas = null;
      let fluidPullTargetImage = null;
      let displayedArrowSide = null;
      let requestedArrowSide = null;
      let arrowSwapToken = 0;
      let asciiGrid = [];
      let nextAsciiGrid = [];
      let shiftDirections = [];
      let samplePixels = null;
      let maskWidth = 0;
      let maskHeight = 0;
      let asciiPattern = {
        seed: Math.random() * 10000,
        angle: 0,
        scale: .115,
        secondaryScale: .23,
        driftX: .003,
        driftY: .002,
        ripple: 0,
        phase: 0
      };
      let asciiCols = 0;
      let asciiRows = 0;
      let asciiFontSize = 16;
      const minimumDistance = 95;
      const transitionDuration = 900;
      let pillDragActive = false;
      let suppressPhotoClicks = false;
      let reactionState = '';
      let reactionHideTimer = 0;
      let reactionActive = false;
      let homeNavigationTransitioning = false;
      const reactionSequence = { nope: 0, yep: 0 };
      let points = 0;
      const viewerProjects = projectCatalog;

      (() => {
        function hslToRgb(h, s, l) {
          const chroma = (1 - Math.abs(2 * l - 1)) * s;
          const second = chroma * (1 - Math.abs((h / 60) % 2 - 1));
          const match = l - chroma / 2;
          let red = 0;
          let green = 0;
          let blue = 0;
          if (h < 60) [red, green] = [chroma, second];
          else if (h < 120) [red, green] = [second, chroma];
          else if (h < 180) [green, blue] = [chroma, second];
          else if (h < 240) [green, blue] = [second, chroma];
          else if (h < 300) [red, blue] = [second, chroma];
          else [red, blue] = [chroma, second];
          return [red, green, blue].map(channel => Math.round((channel + match) * 255));
        }

        function relativeLuminance(red, green, blue) {
          const linear = value => {
            value /= 255;
            return value <= .03928 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
          };
          return .2126 * linear(red) + .7152 * linear(green) + .0722 * linear(blue);
        }

        function randomAccessibleVibrantColor() {
          const hue = Math.random() * 360;
          const saturation = .85;
          let lightness = .55;
          let color = hslToRgb(hue, saturation, lightness);
          while ((relativeLuminance(...color) + .05) / .05 < 4.5 && lightness < .95) {
            lightness += .02;
            color = hslToRgb(hue, saturation, lightness);
          }
          return color;
        }

        const cycleDuration = 5000;
        const root = document.documentElement;
        let from = randomAccessibleVibrantColor();
        let to = randomAccessibleVibrantColor();
        let cycleStart = performance.now();

        function interpolateCursorColor(now) {
          const progress = Math.min(1, (now - cycleStart) / cycleDuration);
          const red = Math.round(from[0] + (to[0] - from[0]) * progress);
          const green = Math.round(from[1] + (to[1] - from[1]) * progress);
          const blue = Math.round(from[2] + (to[2] - from[2]) * progress);
          root.style.setProperty('--cursor-color', `rgb(${red}, ${green}, ${blue})`);
          if (progress >= 1) {
            from = to;
            to = randomAccessibleVibrantColor();
            cycleStart = now;
          }
          requestAnimationFrame(interpolateCursorColor);
        }
        requestAnimationFrame(interpolateCursorColor);
      })();

      function syncPointsBorder() {
        const width = pointsDisplay.offsetWidth;
        const height = pointsDisplay.offsetHeight;
        pointsBorder.setAttribute('viewBox', `0 0 ${width} ${height}`);
        pointsBorderRect.setAttribute('x', '.5');
        pointsBorderRect.setAttribute('y', '.5');
        pointsBorderRect.setAttribute('width', String(width - 1));
        pointsBorderRect.setAttribute('height', String(height - 1));
        pointsBorderRect.setAttribute('rx', String((height - 1) / 2));
      }
      syncPointsBorder();
      document.fonts?.ready.then(() => {
        if (!pointsDisplay.classList.contains('falling')) syncPointsBorder();
      });

      async function navigateFromHome(href) {
        if (!href || homeNavigationTransitioning) return;
        const isLabzDestination = (() => {
          try {
            const target = new URL(href, location.href);
            return target.origin === location.origin && /\/labz\/?(?:index\.html)?$/.test(target.pathname);
          } catch (_) {
            return false;
          }
        })();
        if (isLabzDestination) {
          homeNavigationTransitioning = true;
          cancelIdleImage();
          document.body.classList.add('labz-page-exit');
          const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
          const mobileSweep = matchMedia('(max-width: 1100px), (hover: none) and (pointer: coarse)').matches;
          window.setTimeout(() => { location.href = href; }, mobileSweep ? 1120 : (reducedMotion ? 260 : 1120));
          return;
        }
        if (/^https?:/i.test(href)) {
          window.open(href, '_blank', 'noopener');
          return;
        }
        if (pageSection !== 'HOME') {
          location.href = href;
          return;
        }
        homeNavigationTransitioning = true;
        cancelIdleImage();
        const elements = [
          ...document.querySelectorAll('.nav-pill, .tokonoma-logo, .trail-image'),
          pointsDisplay
        ].filter(Boolean).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const fades = elements.map((element, index) => element.animate([
          { opacity: getComputedStyle(element).opacity || 1, translate: '0 0' },
          { opacity: 0, translate: '0 -18px' }
        ], {
          duration: 320,
          delay: Math.min(index * 28, 280),
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        }));
        await Promise.all(fades.map(animation => animation.finished.catch(() => {})));
        location.href = href;
      }

      function dropNavigationPills({ mobilePhysics = false } = {}) {
        const pills = [...document.querySelectorAll('.nav-pill')];
        const originalLayout = pills.map(pill => ({ pill, rect: pill.getBoundingClientRect() }));
        const viewportWidth = () => mobilePhysics
          ? Math.round(window.visualViewport?.width || document.documentElement.clientWidth || innerWidth)
          : innerWidth;
        const viewportHeight = () => mobilePhysics
          ? Math.round(window.visualViewport?.height || document.documentElement.clientHeight || innerHeight)
          : innerHeight;
        let physicsViewportWidth = viewportWidth();
        let physicsViewportHeight = viewportHeight();
        const mobileSpawnStart = performance.now() + 80;
        const logo = document.querySelector('.tokonoma-logo');
        const logoRect = logo.getBoundingClientRect();
        Object.assign(logo.style, {
          position: 'fixed',
          left: logoRect.left + 'px',
          top: logoRect.top + 'px'
        });
        const bodies = originalLayout.map(({ pill, rect }, index) => {
          const homeAnchor = pill.closest('.brand-nav')
            ? 'left'
            : pill.closest('.center-nav')
              ? 'center'
              : 'right';
          const slot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const slotFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const blackEdge = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const whiteDashes = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          const radius = Math.max(0, (Math.min(rect.width, rect.height) - 1) / 2);
          slot.setAttribute('class', 'pill-slot');
          slot.setAttribute('aria-hidden', 'true');
          slot.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
          slotFill.setAttribute('class', 'slot-fill');
          slotFill.setAttribute('x', '.5');
          slotFill.setAttribute('y', '.5');
          slotFill.setAttribute('width', String(rect.width - 1));
          slotFill.setAttribute('height', String(rect.height - 1));
          slotFill.setAttribute('rx', String(radius));
          [blackEdge, whiteDashes].forEach(edge => {
            edge.setAttribute('x', '.5');
            edge.setAttribute('y', '.5');
            edge.setAttribute('width', String(rect.width - 1));
            edge.setAttribute('height', String(rect.height - 1));
            edge.setAttribute('rx', String(radius));
            edge.setAttribute('fill', 'none');
            edge.setAttribute('stroke-width', '1');
            edge.setAttribute('vector-effect', 'non-scaling-stroke');
          });
          blackEdge.setAttribute('stroke', '#000');
          whiteDashes.setAttribute('stroke', '#fff');
          whiteDashes.setAttribute('class', 'ants-white');
          slot.append(slotFill, blackEdge, whiteDashes);
          Object.assign(slot.style, {
            left: rect.left + 'px',
            top: rect.top + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px'
          });
          document.body.appendChild(slot);

          pill.classList.add('falling');
          Object.assign(pill.style, {
            left: '0px',
            top: '0px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            visibility: mobilePhysics ? 'hidden' : ''
          });
          document.body.appendChild(pill);

          return {
            element: pill,
            slot,
            width: rect.width,
            height: rect.height,
            x: mobilePhysics
              ? rect.width / 2 + 8 + Math.random() * Math.max(0, physicsViewportWidth - rect.width - 16)
              : rect.left + rect.width / 2,
            y: mobilePhysics
              ? -rect.height * (1.35 + Math.random() * .65)
              : rect.top + rect.height / 2,
            homeX: rect.left + rect.width / 2,
            homeY: rect.top + rect.height / 2,
            homeAnchor,
            homeHorizontalOffset: homeAnchor === 'left'
              ? rect.left + rect.width / 2
              : homeAnchor === 'center'
                ? rect.left + rect.width / 2 - physicsViewportWidth / 2
                : physicsViewportWidth - (rect.left + rect.width / 2),
            homeVerticalOffset: rect.top + rect.height / 2,
            vx: mobilePhysics ? -110 + Math.random() * 220 : ([-95, 62, 80, -55, 72, -88, 54, 90][index] || 0),
            vy: mobilePhysics ? Math.random() * 45 : 0,
            angle: 0,
            angularVelocity: mobilePhysics ? -8 + Math.random() * 16 : ([-7, 4, 5, -4, 6, -5, 4, -6][index] || 0),
            mass: Math.max(1, rect.width * rect.height),
            supported: false,
            dragging: false,
            dragMoved: false,
            snapped: false,
            snapping: false,
            active: !mobilePhysics,
            pendingFloorReentry: false,
            spawnAt: mobilePhysics ? mobileSpawnStart + index * 620 + Math.random() * 160 : 0
          };
        });

        // Only fallen nav pills trigger the centered STITCH ME BACK prompt.
        // The Awwwards ribbon is intentionally excluded.
        bodies.forEach(body => {
          if (!body.element.classList.contains('nav-pill')) return;
          body.element.addEventListener('pointerenter', () => {
            if (body.snapped || body.snapping || body.dragging) return;
            const extent = extents(body);
            const atBottom = body.y + extent.y >= physicsViewportHeight - 8;
            const restingOnAnotherPill = body.supported;
            if (atBottom || restingOnAnotherPill) showStitchPrompt();
          });
          body.element.addEventListener('pointerleave', hideStitchPrompt);
        });

        let pointsBody = null;
        if (!mobilePhysics) {
          syncPointsBorder();
          const pointsRect = pointsDisplay.getBoundingClientRect();
          pointsDisplay.classList.add('falling', 'static');
          Object.assign(pointsDisplay.style, {
            left: '0px',
            top: '0px',
            width: pointsRect.width + 'px',
            height: pointsRect.height + 'px'
          });
          document.body.appendChild(pointsDisplay);
          pointsBody = {
            element: pointsDisplay,
            slot: null,
            width: pointsRect.width,
            height: pointsRect.height,
            x: pointsRect.left + pointsRect.width / 2,
            y: pointsRect.top + pointsRect.height / 2,
            homeX: 0,
            homeY: 0,
            vx: -42,
            vy: 0,
            angle: 0,
            angularVelocity: -2,
            mass: Math.max(1, pointsRect.width * pointsRect.height),
            supported: false,
            dragging: false,
            dragMoved: false,
            snapped: true,
            snapping: false,
            active: true
          };
          bodies.push(pointsBody);
        }

        // Awwwards ribbon participates in physics on desktop AND mobile.
        // On mobile it is deliberately the first object to fall.
        const awwwardsBody = createAwwwardsBody(physicsViewportWidth);
        if (awwwardsBody) {
          if (mobilePhysics) {
            awwwardsBody.spawnAt = performance.now() + 20;
            awwwardsBody.y = -awwwardsBody.height;
            awwwardsBody.vy = 0;
          }
          bodies.push(awwwardsBody);
        }

        function reconcilePhysicsViewport() {
          const nextWidth = viewportWidth();
          const nextHeight = viewportHeight();
          if (nextWidth === physicsViewportWidth && nextHeight === physicsViewportHeight) return;

          bodies.forEach(body => {
            if (body === pointsBody) {
              body.x = nextWidth - 32 - body.width / 2;
              body.y = nextHeight - 32 - body.height / 2;
              body.vx = 0;
              body.vy = 0;
              body.angle = 0;
              body.angularVelocity = 0;
              return;
            }

            const oldExtent = extents(body);
            const wasOnGround = body.y + oldExtent.y >= physicsViewportHeight - 2;
            if (body.homeAnchor === 'left') {
              body.homeX = body.homeHorizontalOffset;
            } else if (body.homeAnchor === 'center') {
              body.homeX = nextWidth / 2 + body.homeHorizontalOffset;
            } else {
              body.homeX = nextWidth - body.homeHorizontalOffset;
            }
            body.homeY = body.homeVerticalOffset;

            if (body.slot) {
              body.slot.style.left = body.homeX - body.width / 2 + 'px';
              body.slot.style.top = body.homeY - body.height / 2 + 'px';
            }

            if (body.snapped && !body.snapping) {
              body.x = body.homeX;
              body.y = body.homeY;
              body.angle = 0;
            } else {
              body.x = body.x / physicsViewportWidth * nextWidth;
              body.y = wasOnGround
                ? nextHeight - extents(body).y
                : body.y / physicsViewportHeight * nextHeight;
              containBody(body);
            }
          });

          physicsViewportWidth = nextWidth;
          physicsViewportHeight = nextHeight;
        }

        window.addEventListener('resize', reconcilePhysicsViewport);
        window.visualViewport?.addEventListener('resize', reconcilePhysicsViewport);

        function resizePointsPill() {
          if (!pointsBody) return;
          const rightEdge = pointsBody.x + pointsBody.width / 2;
          pointsDisplay.style.width = 'auto';
          pointsDisplay.style.height = 'auto';
          const width = pointsDisplay.offsetWidth;
          const height = pointsDisplay.offsetHeight;
          pointsBody.width = width;
          pointsBody.height = height;
          pointsBody.x = rightEdge - width / 2;
          pointsBody.mass = Math.max(1, width * height);
          pointsDisplay.style.width = width + 'px';
          pointsDisplay.style.height = height + 'px';
          syncPointsBorder();
        }

        function overlapsSlot(body, target, tolerance = 0) {
          const currentShape = capsule(body);
          const homeShape = capsule({
            width: target.width,
            height: target.height,
            x: target.homeX,
            y: target.homeY,
            angle: 0
          });
          const closest = closestSegmentPoints(currentShape, homeShape);
          return Math.hypot(
            closest.secondX - closest.firstX,
            closest.secondY - closest.firstY
          ) <= currentShape.radius + homeShape.radius + tolerance;
        }

        function isOverOwnSlot(body) {
          return overlapsSlot(body, body);
        }

        function clearWrongTargets(preserveReaction = false) {
          bodies.forEach(candidate => candidate.slot?.classList.remove('wrong-target'));
          if (!preserveReaction) hideReaction();
        }

        // Awwwards is a square/ribbon, not a pill: dropping it on any pill slot is an error.
        let ribbonErrorPrompt = null;
        let ribbonErrorHideTimer = 0;
        function showRibbonErrorPrompt() {
          window.clearTimeout(ribbonErrorHideTimer);
          if (!ribbonErrorPrompt) {
            ribbonErrorPrompt = document.createElement('div');
            ribbonErrorPrompt.className = 'stitch-me-back-prompt ribbon-pill-error';
            ribbonErrorPrompt.style.fontFamily = '"EurostileMNExtendedBold", "Eurostile", sans-serif';
            ribbonErrorPrompt.style.color = 'var(--cursor-color)';
            ribbonErrorPrompt.setAttribute('aria-hidden', 'true');
            '404: PILL NOT FOUND'.split('').forEach((character, index) => {
              const span = document.createElement('span');
              span.textContent = character === ' ' ? '\u00a0' : character;
              span.style.transitionDelay = `${index * 28}ms`;
              Object.assign(span.style, {
                display: 'inline-block',
                opacity: '0',
                transform: 'translateY(12px)',
                transition: 'opacity .32s ease, transform .42s cubic-bezier(.22, 1, .36, 1)'
              });
              ribbonErrorPrompt.appendChild(span);
            });
            Object.assign(ribbonErrorPrompt.style, {
              position: 'fixed',
              left: '50%',
              top: '50%',
              zIndex: '10001',
              display: 'flex',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              visibility: 'hidden'
            });
            document.body.appendChild(ribbonErrorPrompt);
          }
          // Place the 404 label 32px above the centered Awwwards GIF.
          const gifRect = awwwardsHoverGif.getBoundingClientRect();
          if (gifRect.height > 0) {
            ribbonErrorPrompt.style.top = `${gifRect.top - 32}px`;
            ribbonErrorPrompt.style.transform = 'translate(-50%, -100%)';
          } else {
            ribbonErrorPrompt.style.top = '50%';
            ribbonErrorPrompt.style.transform = 'translate(-50%, calc(-50% - 192px))';
          }
          ribbonErrorPrompt.style.visibility = 'visible';
          const spans = [...ribbonErrorPrompt.children];
          spans.forEach((span, index) => {
            span.style.transitionDelay = `${index * 28}ms`;
            span.style.opacity = '0';
            span.style.transform = 'translateY(12px)';
          });
          requestAnimationFrame(() => requestAnimationFrame(() => {
            spans.forEach(span => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0)';
            });
          }));
          ribbonErrorHideTimer = window.setTimeout(() => {
            spans.forEach((span, index) => {
              span.style.transitionDelay = `${(spans.length - 1 - index) * 18}ms`;
              span.style.opacity = '0';
              span.style.transform = 'translateY(-8px)';
            });
            ribbonErrorHideTimer = window.setTimeout(() => {
              ribbonErrorPrompt.style.visibility = 'hidden';
            }, 500);
          }, 900);
        }

        function updateWrongTargets(body) {
          let hasWrongOverlap = false;
          bodies.forEach(candidate => {
            if (!candidate.slot) return;
            const wrongOverlap = candidate !== body && !candidate.snapped &&
              overlapsSlot(body, candidate);
            candidate.slot.classList.toggle('wrong-target', wrongOverlap);
            hasWrongOverlap ||= wrongOverlap;
          });
          if (hasWrongOverlap) showReaction('nope');
          else hideReaction();
        }

        function showReaction(state, force = false) {
          window.clearTimeout(reactionHideTimer);
          reactionHideTimer = 0;
          if (!force && reactionActive && reactionState === state) return;
          reactionActive = true;
          reactionState = state;
          const previousIndex = reactionSequence[state];
          do {
            reactionSequence[state] = 1 + Math.floor(Math.random() * 4);
          } while (reactionSequence[state] === previousIndex);
          matchReaction.src =
            `assets/img/gif/${state}-${reactionSequence[state]}.gif?restart=${Date.now()}`;
          matchReaction.classList.remove('exiting');
          matchReaction.classList.add('show');
        }

        function hideReaction(delay = 2000) {
          if (!reactionState || reactionHideTimer) return;
          reactionActive = false;
          reactionHideTimer = window.setTimeout(() => {
            matchReaction.classList.add('exiting');
            reactionHideTimer = window.setTimeout(() => {
              reactionHideTimer = 0;
              reactionState = '';
              matchReaction.classList.add('resetting');
              matchReaction.classList.remove('show', 'exiting');
              void matchReaction.offsetWidth;
              matchReaction.classList.remove('resetting');
            }, 450);
          }, delay);
        }

        function awardPoints(amount) {
          points += amount;
          pointsValue.textContent = points > 0 ? `POINTS +${points}` : `POINTS ${points}`;
          pointsDisplay.classList.toggle('positive', points > 0);
          pointsDisplay.classList.toggle('negative', points < 0);
          resizePointsPill();
        }

        function snapToHome(body) {
          clearWrongTargets();
          showReaction('yep');
          awardPoints(1);
          body.slot.classList.add('correct-target');
          body.snapping = true;
          body.vx = 0;
          body.vy = 0;
          body.angularVelocity = 0;
          body.element.classList.add('snapped');
          const startX = body.x;
          const startY = body.y;
          const startAngle = ((body.angle + 180) % 360 + 360) % 360 - 180;
          const started = performance.now();
          const duration = 440;

          function dock(now) {
            const progress = Math.min(1, (now - started) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            body.x = startX + (body.homeX - startX) * eased;
            body.y = startY + (body.homeY - startY) * eased;
            body.angle = startAngle * (1 - eased);
            if (progress < 1) {
              requestAnimationFrame(dock);
              return;
            }
            body.x = body.homeX;
            body.y = body.homeY;
            body.angle = 0;
            body.snapping = false;
            body.snapped = true;
            body.slot.style.visibility = 'hidden';
            body.slot.classList.remove('correct-target');
            hideReaction();
            window.setTimeout(() => {
              body.snapped = false;
              body.pendingFloorReentry = true;
              body.slot.style.visibility = 'visible';
              body.element.classList.remove('snapped');
            }, 4000);
          }
          requestAnimationFrame(dock);
        }

        function finishDrag(body, event) {
          if (!body.dragging || event.pointerId !== body.pointerId) return;
          event.preventDefault();
          event.stopPropagation();
          const isAwwwardsRibbon = body.element.classList.contains('awwwards-badge');
          const wrongRelease = (Boolean(body.slot) || isAwwwardsRibbon) &&
            event.type === 'pointerup' && body.dragMoved &&
            bodies.some(candidate => candidate.slot && candidate !== body && !candidate.snapped &&
              overlapsSlot(body, candidate, 45));
          clearWrongTargets(wrongRelease);
          const releaseDelay = performance.now() - body.lastPointerTime;
          if (releaseDelay > 80) {
            const retained = Math.max(0, 1 - (releaseDelay - 80) / 220);
            body.vx *= retained;
            body.vy *= retained;
          }
          body.dragging = false;
          body.element.classList.remove('dragging');
          if (wrongRelease) {
            showReaction('nope');
            if (isAwwwardsRibbon) showRibbonErrorPrompt();
            awardPoints(-1);
            hideReaction(900);
            body.angularVelocity += clamp(body.vx / Math.max(body.width, body.height) * 7, -60, 60);
            body.pendingFloorReentry = true;
          } else if (body.slot && body.dragMoved && isOverOwnSlot(body)) {
            snapToHome(body);
          } else {
            body.angularVelocity += clamp(body.vx / Math.max(body.width, body.height) * 7, -60, 60);
          }
          if (body.element.hasPointerCapture(event.pointerId)) {
            body.element.releasePointerCapture(event.pointerId);
          }
          if (event.type === 'pointermove') {
            const endInteraction = () => {
              document.removeEventListener('pointerup', endInteraction, true);
              document.removeEventListener('pointercancel', endInteraction, true);
              pillDragActive = false;
              window.setTimeout(() => { suppressPhotoClicks = false; }, 0);
            };
            document.addEventListener('pointerup', endInteraction, true);
            document.addEventListener('pointercancel', endInteraction, true);
          } else {
            pillDragActive = false;
            window.setTimeout(() => { suppressPhotoClicks = false; }, 0);
          }
        }

        bodies.forEach(body => {
          body.element.addEventListener('pointerdown', event => {
            if (mobilePhysics) return;
            if (event.button !== 0 || body.snapped || body.snapping) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = true;
            body.dragMoved = false;
            body.pointerId = event.pointerId;
            body.dragOffsetX = event.clientX - body.x;
            body.dragOffsetY = event.clientY - body.y;
            body.dragStartX = event.clientX;
            body.dragStartY = event.clientY;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = performance.now();
            body.vx = 0;
            body.vy = 0;
            body.angularVelocity = 0;
            pillDragActive = true;
            suppressPhotoClicks = true;
            body.element.classList.add('dragging');
            body.element.setPointerCapture(event.pointerId);
          });

          body.element.addEventListener('pointermove', event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            const now = performance.now();
            const elapsed = Math.max((now - body.lastPointerTime) / 1000, .008);
            const nextX = event.clientX - body.dragOffsetX;
            const nextY = event.clientY - body.dragOffsetY;
            const instantVX = (event.clientX - body.lastPointerX) / elapsed;
            const instantVY = (event.clientY - body.lastPointerY) / elapsed;
            body.vx = clamp(instantVX, -2400, 2400);
            body.vy = clamp(instantVY, -2400, 2400);
            body.x = nextX;
            body.y = nextY;
            body.dragMoved ||= Math.hypot(
              event.clientX - body.dragStartX,
              event.clientY - body.dragStartY
            ) > 5;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = now;
            if (body.slot || body.element.classList.contains('awwwards-badge')) {
              updateWrongTargets(body);
              if (body.slot && body.dragMoved && isOverOwnSlot(body)) finishDrag(body, event);
            }
          });

          body.element.addEventListener('pointerup', event => finishDrag(body, event));
          body.element.addEventListener('pointercancel', event => finishDrag(body, event));
          body.element.addEventListener('click', event => {
            if (!body.dragMoved) {
              const href = body.element.getAttribute?.('href');
              if (href) {
                event.preventDefault();
                navigateFromHome(href);
              }
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            body.dragMoved = false;
          });
        });

        function capsule(body) {
          const radians = body.angle * Math.PI / 180;
          const horizontal = body.width >= body.height;
          const localX = horizontal ? 1 : 0;
          const localY = horizontal ? 0 : 1;
          const axisX = localX * Math.cos(radians) - localY * Math.sin(radians);
          const axisY = localX * Math.sin(radians) + localY * Math.cos(radians);
          const radius = Math.min(body.width, body.height) / 2;
          const halfSegment = (Math.max(body.width, body.height) - radius * 2) / 2;
          return {
            axisX,
            axisY,
            radius,
            halfSegment,
            ax: body.x - axisX * halfSegment,
            ay: body.y - axisY * halfSegment,
            bx: body.x + axisX * halfSegment,
            by: body.y + axisY * halfSegment
          };
        }

        function extents(body) {
          const shape = capsule(body);
          return {
            x: Math.abs(shape.axisX) * shape.halfSegment + shape.radius,
            y: Math.abs(shape.axisY) * shape.halfSegment + shape.radius
          };
        }

        function clamp(value, minimum, maximum) {
          return Math.max(minimum, Math.min(maximum, value));
        }

        function closestSegmentPoints(first, second) {
          const d1x = first.bx - first.ax;
          const d1y = first.by - first.ay;
          const d2x = second.bx - second.ax;
          const d2y = second.by - second.ay;
          const rx = first.ax - second.ax;
          const ry = first.ay - second.ay;
          const a = d1x * d1x + d1y * d1y;
          const e = d2x * d2x + d2y * d2y;
          const f = d2x * rx + d2y * ry;
          let s = 0;
          let t = 0;

          if (a <= .0001 && e <= .0001) {
            return { firstX: first.ax, firstY: first.ay, secondX: second.ax, secondY: second.ay };
          }
          if (a <= .0001) {
            t = clamp(f / e, 0, 1);
          } else {
            const c = d1x * rx + d1y * ry;
            if (e <= .0001) {
              s = clamp(-c / a, 0, 1);
            } else {
              const b = d1x * d2x + d1y * d2y;
              const denominator = a * e - b * b;
              if (denominator !== 0) s = clamp((b * f - c * e) / denominator, 0, 1);
              t = (b * s + f) / e;
              if (t < 0) {
                t = 0;
                s = clamp(-c / a, 0, 1);
              } else if (t > 1) {
                t = 1;
                s = clamp((b - c) / a, 0, 1);
              }
            }
          }
          return {
            firstX: first.ax + d1x * s,
            firstY: first.ay + d1y * s,
            secondX: second.ax + d2x * t,
            secondY: second.ay + d2y * t
          };
        }

        function resolvePair(first, second) {
          if (!first.active || !second.active) return;
          const firstShape = capsule(first);
          const secondShape = capsule(second);
          const closest = closestSegmentPoints(firstShape, secondShape);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const overlap = firstShape.radius + secondShape.radius - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = second.x - first.x || 1;
            ny = second.y - first.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;

          const inverseFirst = first.dragging || first.snapped || first.snapping ? 0 : 1 / first.mass;
          const inverseSecond = second.dragging || second.snapped || second.snapping ? 0 : 1 / second.mass;
          const inverseTotal = inverseFirst + inverseSecond;
          if (inverseTotal === 0) return;
          first.x -= nx * overlap * inverseFirst / inverseTotal;
          first.y -= ny * overlap * inverseFirst / inverseTotal;
          second.x += nx * overlap * inverseSecond / inverseTotal;
          second.y += ny * overlap * inverseSecond / inverseTotal;

          const relative = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
          if (relative < 0) {
            const impulse = -(1 + .30) * relative / inverseTotal;
            first.vx -= nx * impulse * inverseFirst;
            first.vy -= ny * impulse * inverseFirst;
            second.vx += nx * impulse * inverseSecond;
            second.vy += ny * impulse * inverseSecond;
          }
          if (Math.abs(ny) > .55) {
            if (ny > 0) first.supported = true;
            else second.supported = true;
          }
          const spin = (second.vx - first.vx) * .008;
          if (!first.dragging && !first.snapped && !first.snapping) first.angularVelocity -= spin;
          if (!second.dragging && !second.snapped && !second.snapping) second.angularVelocity += spin;
        }

        function containBody(body, delta = 0) {
          if (!body.active) return;
          const extent = extents(body);
          if (body.x - extent.x < 8) {
            body.x = 8 + extent.x;
            body.vx = Math.abs(body.vx) * .68;
            body.angularVelocity *= -.7;
          } else if (body.x + extent.x > physicsViewportWidth - 8) {
            body.x = physicsViewportWidth - 8 - extent.x;
            body.vx = -Math.abs(body.vx) * .68;
            body.angularVelocity *= -.7;
          }
          if (body.y - extent.y < 0 && (!mobilePhysics || (body.vy < 0 && body.y + extent.y > 0))) {
            body.y = extent.y;
            body.vy = Math.abs(body.vy) * .78;
            body.angularVelocity *= -.7;
          }
          const floor = physicsViewportHeight - (mobilePhysics ? 1 : 0);
          if (body.pendingFloorReentry) {
            if (body.y - extent.y > physicsViewportHeight + extent.y * 2) {
              body.y = -extent.y * (1.2 + Math.random() * .5);
              body.vy = Math.random() * 45;
              body.pendingFloorReentry = false;
            }
            return;
          }
          if (body.y + extent.y > floor) {
            body.y = floor - extent.y;
            body.vy = Math.abs(body.vy) > 72 ? -Math.abs(body.vy) * .31 : 0;
            body.angularVelocity *= .72;
            body.supported = true;
          }
        }

        function tipUnsupportedStandingPill(body, delta) {
          if (!body.supported || body.snapped || body.snapping) return;
          const shape = capsule(body);
          let angle = Math.atan2(shape.axisY, shape.axisX);
          if (angle > Math.PI / 2) angle -= Math.PI;
          if (angle < -Math.PI / 2) angle += Math.PI;

          const lean = Math.abs(angle);
          if (lean > .055) {
            const fallDirection = -Math.sign(angle);

            // A pill balanced on its end should lose balance quickly.
            // Add both rotational fall and a small sideways foot-slip.
            body.angularVelocity += fallDirection * 620 * delta;
            body.vx += fallDirection * 235 * delta;
          }
        }

        let previousTime = performance.now();
        function simulate(now) {
          const delta = Math.min((now - previousTime) / 1000, .02);
          previousTime = now;

          bodies.forEach(body => {
            if (!body.active) {
              if (now < body.spawnAt) return;
              body.active = true;
              body.element.style.visibility = 'visible';
            }
            body.supported = false;
            if (body.dragging || body.snapped || body.snapping) {
              containBody(body);
              return;
            }
            body.vy += (mobilePhysics ? 1050 : 1850) * delta;
            body.x += body.vx * delta;
            body.y += body.vy * delta;
            body.angle += body.angularVelocity * delta;
            body.angularVelocity *= Math.pow(.982, delta * 60);
            body.angularVelocity = clamp(body.angularVelocity, -85, 85);
            if (Math.abs(body.angularVelocity) < .25) body.angularVelocity = 0;

            containBody(body, delta);
          });

          for (let iteration = 0; iteration < 10; iteration++) {
            for (let first = 0; first < bodies.length; first++) {
              for (let second = first + 1; second < bodies.length; second++) {
                resolvePair(bodies[first], bodies[second]);
              }
            }
            bodies.forEach(containBody);
          }

          bodies.forEach(body => tipUnsupportedStandingPill(body, delta));

          // Ground contact friction: pills keep a little momentum, then settle naturally.
          // This avoids both the old endless ice-slide and an over-stiff instant stop.
          bodies.forEach(body => {
            if (!body.active || body.dragging || body.snapped || body.snapping || !body.supported) return;
            const shape = capsule(body);
            let groundAngle = Math.atan2(shape.axisY, shape.axisX);
            if (groundAngle > Math.PI / 2) groundAngle -= Math.PI;
            if (groundAngle < -Math.PI / 2) groundAngle += Math.PI;
            const stillFalling = Math.abs(groundAngle) > .20;

            // While tipping, preserve enough motion for a visible slide/bounce.
            // Once lying down, increase damping so the pill actually comes to rest.
            const groundFriction = Math.pow(
              stillFalling ? (mobilePhysics ? .982 : .978) : (mobilePhysics ? .93 : .90),
              delta * 60
            );
            const spinFriction = Math.pow(stillFalling ? .986 : .91, delta * 60);

            body.vx *= groundFriction;
            body.angularVelocity *= spinFriction;

            if (!stillFalling && Math.abs(body.vx) < 7) body.vx = 0;
            if (!stillFalling && Math.abs(body.angularVelocity) < .8) body.angularVelocity = 0;
          });

          bodies.forEach(body => {
            if (!body.active) return;
            body.element.style.transform =
              `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}deg)`;
          });
          requestAnimationFrame(simulate);
        }
        requestAnimationFrame(simulate);
      }

      document.querySelectorAll('.nav-pill[href]').forEach(pill => {
        pill.addEventListener('click', event => {
          if (pill.classList.contains('falling') || pill.classList.contains('mobile-falling') || event.defaultPrevented) return;
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          const href = pill.getAttribute('href');
          navigateFromHome(href);
        });
      });

      function dropMobileNavigationPills() {
        const pills = [...document.querySelectorAll('.nav-pill')];
        const mobileWidth = () => Math.round(window.visualViewport?.width || document.documentElement.clientWidth || innerWidth);
        const mobileHeight = () => Math.round(window.visualViewport?.height || document.documentElement.clientHeight || innerHeight);
        const started = performance.now() + 80;
        const bodies = pills.map((pill, index) => {
          const rect = pill.getBoundingClientRect();
          const width = Math.min(rect.width, mobileWidth() - 2);
          const height = Math.min(rect.height, 64);
          pill.classList.add('mobile-falling');
          Object.assign(pill.style, {
            position: 'fixed',
            zIndex: '30',
            left: '0px',
            top: '0px',
            width: width + 'px',
            height: height + 'px',
            visibility: 'hidden',
            touchAction: 'none'
          });
          document.body.appendChild(pill);
          return {
            element: pill,
            width,
            height,
            x: width / 2 + Math.random() * Math.max(0, mobileWidth() - width),
            y: -height / 2 - 12 - Math.random() * 50,
            vx: -90 + Math.random() * 180,
            vy: 0,
            angle: -28 + Math.random() * 56,
            angularVelocity: -32 + Math.random() * 64,
            mass: Math.max(1, width * height),
            dragging: false,
            dragMoved: false,
            active: false,
            releaseAt: started + index * 520 + Math.random() * 130
          };
        });

        let previous = performance.now();
        function mobileCapsule(body) {
          const radians = body.angle * Math.PI / 180;
          const horizontal = body.width >= body.height;
          const axisX = horizontal ? Math.cos(radians) : -Math.sin(radians);
          const axisY = horizontal ? Math.sin(radians) : Math.cos(radians);
          const radius = Math.min(body.width, body.height) / 2;
          const halfSegment = (Math.max(body.width, body.height) - radius * 2) / 2;
          return {
            axisX,
            axisY,
            radius,
            halfSegment,
            ax: body.x - axisX * halfSegment,
            ay: body.y - axisY * halfSegment,
            bx: body.x + axisX * halfSegment,
            by: body.y + axisY * halfSegment
          };
        }

        function mobileExtents(body) {
          const shape = mobileCapsule(body);
          return {
            x: Math.abs(shape.axisX) * shape.halfSegment + shape.radius,
            y: Math.abs(shape.axisY) * shape.halfSegment + shape.radius
          };
        }

        function closestMobileSegmentPoints(first, second) {
          const d1x = first.bx - first.ax;
          const d1y = first.by - first.ay;
          const d2x = second.bx - second.ax;
          const d2y = second.by - second.ay;
          const rx = first.ax - second.ax;
          const ry = first.ay - second.ay;
          const a = d1x * d1x + d1y * d1y;
          const e = d2x * d2x + d2y * d2y;
          const f = d2x * rx + d2y * ry;
          const clampMobile = value => Math.max(0, Math.min(1, value));
          let s = 0;
          let t = 0;
          if (a <= .0001 && e <= .0001) {
            return { firstX: first.ax, firstY: first.ay, secondX: second.ax, secondY: second.ay };
          }
          if (a <= .0001) {
            t = clampMobile(f / e);
          } else {
            const c = d1x * rx + d1y * ry;
            if (e <= .0001) {
              s = clampMobile(-c / a);
            } else {
              const b = d1x * d2x + d1y * d2y;
              const denominator = a * e - b * b;
              if (denominator !== 0) s = clampMobile((b * f - c * e) / denominator);
              t = (b * s + f) / e;
              if (t < 0) {
                t = 0;
                s = clampMobile(-c / a);
              } else if (t > 1) {
                t = 1;
                s = clampMobile((b - c) / a);
              }
            }
          }
          return {
            firstX: first.ax + d1x * s,
            firstY: first.ay + d1y * s,
            secondX: second.ax + d2x * t,
            secondY: second.ay + d2y * t
          };
        }

        function resolveMobileCollision(first, second, applySpin = false) {
          if (!first.active || !second.active) return;
          const firstShape = mobileCapsule(first);
          const secondShape = mobileCapsule(second);
          const closest = closestMobileSegmentPoints(firstShape, secondShape);
          let nx = closest.secondX - closest.firstX;
          let ny = closest.secondY - closest.firstY;
          let distance = Math.hypot(nx, ny);
          const collisionSeparation = 3;
          const overlap = firstShape.radius + secondShape.radius + collisionSeparation - distance;
          if (overlap <= 0) return;
          if (distance < .001) {
            nx = second.x - first.x || 1;
            ny = second.y - first.y;
            distance = Math.hypot(nx, ny) || 1;
          }
          nx /= distance;
          ny /= distance;
          const inverseFirst = first.dragging ? 0 : 1 / first.mass;
          const inverseSecond = second.dragging ? 0 : 1 / second.mass;
          const inverseTotal = inverseFirst + inverseSecond;
          if (inverseTotal === 0) return;
          first.x -= nx * overlap * inverseFirst / inverseTotal;
          first.y -= ny * overlap * inverseFirst / inverseTotal;
          second.x += nx * overlap * inverseSecond / inverseTotal;
          second.y += ny * overlap * inverseSecond / inverseTotal;
          const relative = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
          if (relative < 0) {
            const impulse = -(1 + .30) * relative / inverseTotal;
            first.vx -= nx * impulse * inverseFirst;
            first.vy -= ny * impulse * inverseFirst;
            second.vx += nx * impulse * inverseSecond;
            second.vy += ny * impulse * inverseSecond;
          }
          if (applySpin) {
            const spin = (second.vx - first.vx) * .004;
            first.angularVelocity -= spin;
            second.angularVelocity += spin;
          }
        }

        function containMobileBody(body) {
          const width = mobileWidth();
          const floor = mobileHeight() - 1;
          const extent = mobileExtents(body);
          if (body.x - extent.x < 0) {
            body.x = extent.x;
            body.vx = Math.abs(body.vx) * .55;
            body.angularVelocity *= -.7;
          } else if (body.x + extent.x > width) {
            body.x = width - extent.x;
            body.vx = -Math.abs(body.vx) * .55;
            body.angularVelocity *= -.7;
          }
          if (body.y + extent.y > floor) {
            body.y = floor - extent.y;
            body.vy = Math.abs(body.vy) > 90 ? -Math.abs(body.vy) * .27 : 0;
            body.vx *= .992;
            body.angularVelocity *= .86;
          }
        }

        function simulateMobile(now) {
          const delta = Math.min((now - previous) / 1000, .02);
          previous = now;
          bodies.forEach(body => {
            if (!body.active) {
              if (now < body.releaseAt) return;
              body.active = true;
              body.element.style.visibility = 'visible';
            }
            if (body.dragging) {
              containMobileBody(body);
              return;
            }
            body.vy += 1200 * delta;
            body.x += body.vx * delta;
            body.y += body.vy * delta;
            body.angle += body.angularVelocity * delta;
            body.angularVelocity *= Math.pow(.955, delta * 60);
            if (Math.abs(body.angularVelocity) < .35) body.angularVelocity = 0;
            containMobileBody(body);
          });
          for (let iteration = 0; iteration < 40; iteration++) {
            for (let first = 0; first < bodies.length; first++) {
              for (let second = first + 1; second < bodies.length; second++) {
                resolveMobileCollision(bodies[first], bodies[second], iteration === 0);
              }
            }
            bodies.forEach(body => body.active && containMobileBody(body));
          }
          bodies.forEach(body => {
            if (!body.active) return;
            body.element.style.transform =
              `translate3d(${body.x - body.width / 2}px, ${body.y - body.height / 2}px, 0) rotate(${body.angle}deg)`;
          });
          requestAnimationFrame(simulateMobile);
        }

        bodies.forEach(body => {
          body.element.addEventListener('pointerdown', event => {
            if (event.button !== 0 || !body.active) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = true;
            body.dragMoved = false;
            body.pointerId = event.pointerId;
            body.dragOffsetX = event.clientX - body.x;
            body.dragOffsetY = event.clientY - body.y;
            body.dragStartX = event.clientX;
            body.dragStartY = event.clientY;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = performance.now();
            body.vx = 0;
            body.vy = 0;
            body.angularVelocity = 0;
            body.element.setPointerCapture(event.pointerId);
          });
          body.element.addEventListener('pointermove', event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            const now = performance.now();
            const elapsed = Math.max((now - body.lastPointerTime) / 1000, .008);
            body.x = event.clientX - body.dragOffsetX;
            body.y = event.clientY - body.dragOffsetY;
            body.vx = Math.max(-1800, Math.min(1800, (event.clientX - body.lastPointerX) / elapsed));
            body.vy = Math.max(-1800, Math.min(1800, (event.clientY - body.lastPointerY) / elapsed));
            body.dragMoved ||= Math.hypot(event.clientX - body.dragStartX, event.clientY - body.dragStartY) > 6;
            body.lastPointerX = event.clientX;
            body.lastPointerY = event.clientY;
            body.lastPointerTime = now;
            containMobileBody(body);
          });
          const releaseMobilePill = event => {
            if (!body.dragging || event.pointerId !== body.pointerId) return;
            event.preventDefault();
            event.stopPropagation();
            body.dragging = false;
            if (body.element.hasPointerCapture(event.pointerId)) body.element.releasePointerCapture(event.pointerId);
            if (!body.dragMoved && event.type === 'pointerup') {
              navigateFromHome(body.element.getAttribute('href'));
            } else if (body.dragMoved) {
              body.angularVelocity += Math.max(-55, Math.min(55, body.vx / Math.max(body.width, body.height) * 6));
            }
            body.dragMoved = false;
          };
          body.element.addEventListener('pointerup', releaseMobilePill);
          body.element.addEventListener('pointercancel', releaseMobilePill);
        });
        requestAnimationFrame(simulateMobile);
      }

      if (document.documentElement.classList.contains('mobile-index')) {
        const startMobileNavigation = () => requestAnimationFrame(dropMobileNavigationPills);
        if (document.fonts?.ready) document.fonts.ready.then(startMobileNavigation);
        else startMobileNavigation();
      } else if (!matchMedia(mobileLayoutQuery).matches) {
        window.setTimeout(dropNavigationPills, 4000);
      }

      images.forEach(src => { const image = new Image(); image.src = src; });

      function randomGlyph() {
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }

      function shuffle(items) {
        for (let index = items.length - 1; index > 0; index--) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
        }
        return items;
      }

      function configureMask() {
        const rect = viewerImage.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        maskWidth = rect.width;
        maskHeight = rect.height;
        asciiFontSize = Math.max(12, Math.min(16, Math.round(rect.width / 70)));
        asciiCols = Math.ceil(maskWidth / asciiFontSize);
        asciiRows = Math.ceil(maskHeight / asciiFontSize);

        asciiMask.style.left = rect.left + 'px';
        asciiMask.style.top = rect.top + 'px';
        asciiMask.style.width = rect.width + 'px';
        asciiMask.style.height = rect.height + 'px';
        asciiMask.width = Math.max(1, Math.round(rect.width * ratio));
        asciiMask.height = Math.max(1, Math.round(rect.height * ratio));
        maskContext.setTransform(ratio, 0, 0, ratio, 0, 0);
        maskContext.textAlign = 'center';
        maskContext.textBaseline = 'middle';
        maskContext.font = `${asciiFontSize}px EurostileMNExtendedBold, Arial, "Arial Unicode MS", sans-serif`;

        const total = asciiCols * asciiRows;
        asciiGrid = Array.from({ length: total }, () => Math.floor(Math.random() * glyphs.length));
        nextAsciiGrid = new Array(total);
        shiftDirections = Array.from({ length: total }, (_, index) => {
          const x = index % asciiCols;
          const y = Math.floor(index / asciiCols);
          const regionX = Math.floor(x / 10);
          const regionY = Math.floor(y / 8);
          return 1 + Math.abs(((regionX * 3 + regionY * 5) % 8));
        });

        const sampler = document.createElement('canvas');
        sampler.width = Math.max(1, Math.round(maskWidth));
        sampler.height = Math.max(1, Math.round(maskHeight));
        const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
        try {
          samplerContext.drawImage(viewerImage, 0, 0, sampler.width, sampler.height);
          samplePixels = samplerContext.getImageData(0, 0, sampler.width, sampler.height).data;
        } catch (error) {
          samplePixels = null;
        }
      }

      function randomizeAsciiPattern() {
        asciiPattern = {
          seed: Math.random() * 10000,
          angle: Math.random() * Math.PI * 2,
          scale: .075 + Math.random() * .105,
          secondaryScale: .18 + Math.random() * .18,
          driftX: (Math.random() * .008 - .004) || .002,
          driftY: (Math.random() * .008 - .004) || -.002,
          ripple: Math.random() * .13,
          phase: Math.random() * Math.PI * 2
        };
        shuffle(shiftDirections);
      }

      function hashNoise(x, y) {
        const value = Math.sin(x * 127.1 + y * 311.7 + 74.7 + asciiPattern.seed) * 43758.5453;
        return value - Math.floor(value);
      }

      function smoothNoise(x, y) {
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const tx = x - x0;
        const ty = y - y0;
        const sx = tx * tx * (3 - 2 * tx);
        const sy = ty * ty * (3 - 2 * ty);
        const a = hashNoise(x0, y0);
        const b = hashNoise(x0 + 1, y0);
        const c = hashNoise(x0, y0 + 1);
        const d = hashNoise(x0 + 1, y0 + 1);
        return (a + (b - a) * sx) + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sy;
      }

      function updateAsciiGrid(frameNumber) {
        for (let y = 0; y < asciiRows; y++) {
          for (let x = 0; x < asciiCols; x++) {
            const index = y * asciiCols + x;
            const direction = shiftDirections[index];
            let sourceX = x;
            let sourceY = y;
            if (direction === 1) sourceX--;
            if (direction === 2) sourceX++;
            if (direction === 3) sourceY++;
            if (direction === 4) sourceY--;
            if (direction === 5) { sourceX--; sourceY++; }
            if (direction === 6) { sourceX--; sourceY--; }
            if (direction === 7) { sourceX++; sourceY++; }
            if (direction === 8) { sourceX++; sourceY--; }
            sourceX = Math.max(0, Math.min(asciiCols - 1, sourceX));
            sourceY = Math.max(0, Math.min(asciiRows - 1, sourceY));
            nextAsciiGrid[index] = asciiGrid[sourceY * asciiCols + sourceX];
          }
        }
        [asciiGrid, nextAsciiGrid] = [nextAsciiGrid, asciiGrid];

        for (let count = 0; count < 40; count++) {
          const index = Math.floor(Math.random() * asciiGrid.length);
          asciiGrid[index] = Math.floor(Math.random() * glyphs.length);
        }
        for (let x = 0; x < asciiCols; x++) {
          asciiGrid[x] = Math.floor(Math.random() * glyphs.length);
          asciiGrid[(asciiRows - 1) * asciiCols + x] = Math.floor(Math.random() * glyphs.length);
        }
        if (frameNumber % 45 === 0) shuffle(shiftDirections);
      }

      function sampledColor(x, y) {
        if (!samplePixels) return '#fff';
        const sx = Math.max(0, Math.min(Math.round(maskWidth) - 1, Math.round(x)));
        const sy = Math.max(0, Math.min(Math.round(maskHeight) - 1, Math.round(y)));
        const index = (sy * Math.round(maskWidth) + sx) * 4;
        return `rgb(${samplePixels[index]},${samplePixels[index + 1]},${samplePixels[index + 2]})`;
      }

      function renderProcessingMask(progress, frameNumber) {
        maskContext.globalCompositeOperation = 'source-over';
        maskContext.clearRect(0, 0, maskWidth, maskHeight);
        maskContext.fillStyle = '#000';
        maskContext.fillRect(0, 0, maskWidth, maskHeight);
        if (frameNumber % 2 === 0) updateAsciiGrid(Math.floor(frameNumber / 2));

        for (let y = 0; y < asciiRows; y++) {
          for (let x = 0; x < asciiCols; x++) {
            const px = x * asciiFontSize;
            const py = y * asciiFontSize;
            const cosine = Math.cos(asciiPattern.angle);
            const sine = Math.sin(asciiPattern.angle);
            const rotatedX = x * cosine - y * sine;
            const rotatedY = x * sine + y * cosine;
            const primary = smoothNoise(
              rotatedX * asciiPattern.scale + frameNumber * asciiPattern.driftX,
              rotatedY * asciiPattern.scale + frameNumber * asciiPattern.driftY
            );
            const secondary = smoothNoise(
              rotatedX * asciiPattern.secondaryScale - frameNumber * asciiPattern.driftY * .65 + 31.7,
              rotatedY * asciiPattern.secondaryScale + frameNumber * asciiPattern.driftX * .65 - 18.9
            );
            const ripple = Math.sin(
              rotatedX * .19 + rotatedY * .11 + asciiPattern.phase + frameNumber * .012
            ) * asciiPattern.ripple;
            const organic = Math.max(0, Math.min(1, primary * .72 + secondary * .28 + ripple));
            const edgeSoftness = .18;
            const threshold = progress * (1 + edgeSoftness) - edgeSoftness / 2;

            if (organic < threshold) {
              maskContext.clearRect(px, py, asciiFontSize + 1, asciiFontSize + 1);
            } else {
              maskContext.fillStyle = sampledColor(px + asciiFontSize / 2, py + asciiFontSize / 2);
              maskContext.fillText(
                glyphs[asciiGrid[y * asciiCols + x]],
                px + asciiFontSize / 2,
                py + asciiFontSize / 2
              );
            }
          }
        }
      }

      function animateMask(direction, duration = transitionDuration, synchronizedStart = null) {
        return new Promise(resolve => {
          randomizeAsciiPattern();
          const started = synchronizedStart ?? performance.now();
          asciiMask.style.opacity = '1';
          let frameNumber = 0;

          function frame(now) {
            const rawProgress = Math.min(1, (now - started) / duration);
            const eased = rawProgress < .5
              ? 2 * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
            const maskProgress = direction === 'reveal' ? eased : 1 - eased;
            renderProcessingMask(maskProgress, frameNumber++);

            if (rawProgress < 1) requestAnimationFrame(frame);
            else {
              if (direction === 'reveal') {
                maskContext.clearRect(0, 0, maskWidth, maskHeight);
                asciiMask.style.opacity = '0';
              } else {
                renderProcessingMask(0, frameNumber);
              }
              resolve();
            }
          }
          requestAnimationFrame(frame);
        });
      }

      function updateViewerTabs(section) {
        activeViewerSection = section;
        viewerTabs.querySelectorAll('.viewer-tab').forEach(tab => {
          const active = tab.dataset.section === section;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', String(active));
        });
      }

      function setActiveProject(nextProject) {
        if (!nextProject) return false;
        activeProject = nextProject;
        images = activeProject.images;
        viewerImageIndex = 0;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image 1 of ${images.length}`;
        viewerNextImage.alt = `${seoTitleCase(activeProject.title)}, next project image`;
        applyProjectSeo(activeProject);
        syncViewerInfoContent(activeProject);
        updateViewerTabs(activeProject.category);
        updateViewerBreadcrumb();
        return true;
      }

      function syncViewerInfoContent(currentProject) {
        if (!currentProject) return;
        const lines = projectInfo[currentProject.slug] || [
          `Project: ${currentProject.title}`,
          'Amogh R Raikar'
        ];
        const guides = document.createElement('div');
        guides.className = 'viewer-info-back-guides';
        guides.setAttribute('aria-hidden', 'true');
        guides.innerHTML = `
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line class="guide-dark" x1="99.5" y1=".5" x2=".5" y2="99.5"></line>
            <line class="guide-light" x1="99.5" y1=".5" x2=".5" y2="99.5"></line>
            <line class="guide-dark" x1=".5" y1=".5" x2="99.5" y2="99.5"></line>
            <line class="guide-light" x1=".5" y1=".5" x2="99.5" y2="99.5"></line>
          </svg>
          <i class="guide-corner top-left"></i>
          <i class="guide-corner top-right"></i>
          <i class="guide-corner bottom-left"></i>
          <i class="guide-corner bottom-right"></i>
        `;
        viewerInfoBack.replaceChildren(guides, ...lines.map(value => {
          const line = document.createElement('p');
          line.dataset.infoLine = value;
          return line;
        }));
      }

      syncViewerInfoContent(activeProject);

      function updateViewerBreadcrumb() {
        if (!activeProject) return;
        viewerBreadcrumbPath.innerHTML = `${activeProject.category}&nbsp;&nbsp;/&nbsp;&nbsp;${activeProject.title}&nbsp;&nbsp;/&nbsp;&nbsp;`;
        viewerBreadcrumbImage.textContent = activeProject.videoIndex === viewerImageIndex
          ? `VIDEO ${viewerImageIndex + 1}  •  ${images.length}`
          : `IMG ${viewerImageIndex + 1}  •  ${images.length}`;
      }

      function showMenuPreview(entry) {
        const source = entry?.dataset.preview;
        if (!source) return;
        const width = Math.min(560, innerWidth * .48);
        const height = Math.min(400, innerHeight * .44);
        viewerMenuPreview.src = source;
        viewerMenuPreview.style.left = `${32 + Math.random() * Math.max(0, innerWidth - width - 64)}px`;
        viewerMenuPreview.style.top = `${88 + Math.random() * Math.max(0, innerHeight - height - 144)}px`;
        viewerMenuPreview.classList.add('visible');
      }

      function setMenuEntryActive(entry) {
        const changed = entry !== hoveredMenuEntry;
        if (changed) {
          clearTimeout(cursorCountTimer);
          const previousLabel = hoveredMenuEntry?.querySelector('.viewer-menu-entry-label');
          if (previousLabel) previousLabel.style.transform = '';
          viewerMenuPreview.style.transform = '';
          hoveredMenuEntry?.classList.remove('cursor-hover');
          viewerMenuPreview.classList.remove('visible');
          cursorActionCount.classList.remove('visible');
          hoveredMenuEntry = entry;
        }
        if (!entry) {
          viewerMenuHighlight.classList.remove('visible');
          return;
        }
        const rect = entry.getBoundingClientRect();
        viewerMenuHighlight.style.top = `${rect.top}px`;
        viewerMenuHighlight.style.height = `${rect.height}px`;
        viewerMenuHighlight.classList.add('visible');
        updateMenuEntryWarp(entry, pointerClientX, pointerClientY);
        if (!changed) return;
        entry.classList.add('cursor-hover');
        menuHoverSound.currentTime = 0;
        menuHoverSound.play().catch(() => {});
        showMenuPreview(entry);
        cursorActionCount.textContent = entry.dataset.mediaLabel;
        cursorCountTimer = window.setTimeout(() => cursorActionCount.classList.add('visible'), 160);
      }

      function updateMenuEntryWarp(entry, x, y) {
        const label = entry?.querySelector('.viewer-menu-entry-label');
        if (!label) return;
        const rect = entry.getBoundingClientRect();
        const px = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
        const py = Math.max(0, Math.min(1, (y - rect.top) / rect.height));
        const rotateY = (px - .5) * 26;
        const rotateX = (.5 - py) * 13;
        const translateX = (px - .5) * 8;
        const translateY = (py - .5) * 5;
        const depth = -42 - Math.abs(px - .5) * 14;
        const warp = `perspective(540px) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${depth.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        label.style.transform = warp;
        viewerMenuPreview.style.transform = warp;
      }

      function syncMenuHoverUnderCursor() {
        menuScrollHoverFrame = 0;
        if (!viewer.classList.contains('menu-open')) return;
        const entry = document.elementFromPoint(pointerClientX, pointerClientY)?.closest('.viewer-menu-entry');
        setMenuEntryActive(entry && viewerMenu.contains(entry) ? entry : null);
      }

      function syncMenuScrollCue() {
        const hasOverflow = viewerMenu.scrollHeight > viewerMenu.clientHeight + 2;
        viewerMenuScrollCue.classList.toggle('hidden', !hasOverflow || viewerMenu.scrollTop > 1 || menuCategoryTransitioning);
        const atBottom = hasOverflow
          && viewerMenu.scrollTop + viewerMenu.clientHeight >= viewerMenu.scrollHeight - 2;
        viewerMenu.classList.toggle('at-bottom', atBottom);
      }

      function setDisplayedArrowSide(side) {
        displayedArrowSide = side;
        cursorNavArrow.setAttribute('transform', side === 'left' ? 'rotate(180 40 40)' : '');
      }

      async function swapImageNavigationArrow(side) {
        if (!side) return;
        if (!displayedArrowSide) {
          requestedArrowSide = side;
          setDisplayedArrowSide(side);
          return;
        }
        if (side === requestedArrowSide) return;
        requestedArrowSide = side;
        const token = ++arrowSwapToken;
        cursorNavArrowGroup.getAnimations().forEach(animation => animation.cancel());

        if (side === displayedArrowSide) {
          cursorNavArrowGroup.style.transform = 'translateY(0)';
          cursorNavArrowGroup.style.opacity = '1';
          return;
        }

        const travel = displayedArrowSide === 'left' && side === 'right' ? 64 : -64;
        const outgoing = cursorNavArrowGroup.animate([
          { transform: 'translateY(0)', opacity: 1 },
          { transform: `translateY(${travel}px)`, opacity: 1 }
        ], {
          duration: 145,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        });
        await outgoing.finished.catch(() => {});
        if (token !== arrowSwapToken) return;
        outgoing.cancel();

        setDisplayedArrowSide(side);
        const incoming = cursorNavArrowGroup.animate([
          { transform: `translateY(${-travel}px)`, opacity: 1 },
          { transform: 'translateY(0)', opacity: 1 }
        ], {
          duration: 190,
          easing: 'cubic-bezier(0, .55, .45, 1)',
          fill: 'forwards'
        });
        await incoming.finished.catch(() => {});
        if (token !== arrowSwapToken) return;
        cursorNavArrowGroup.style.transform = 'translateY(0)';
        cursorNavArrowGroup.style.opacity = '1';
        incoming.cancel();
      }

      function clearImageNavigationCursor() {
        arrowSwapToken++;
        cursorNavArrowGroup.getAnimations().forEach(animation => animation.cancel());
        cursorNavArrowGroup.style.transform = '';
        cursorNavArrowGroup.style.opacity = '';
        displayedArrowSide = null;
        requestedArrowSide = null;
        document.body.classList.remove(
          'image-nav-left',
          'image-nav-right',
          'viewer-top-zone-hover',
          'viewer-close-hover'
        );
      }

      function clearViewerFluidPull() {
        if (fluidPullFrame) cancelAnimationFrame(fluidPullFrame);
        fluidPullFrame = 0;
        fluidPullCanvas?.remove();
        fluidPullCanvas = null;
        fluidPullTargetImage?.style.setProperty('opacity', '');
        fluidPullTargetImage = null;
        wasInsideViewerImage = false;
        lastViewerImagePoint = null;
        lastViewerOutsidePoint = null;
      }

      function positionViewerInfoElements() {
        const rect = viewerImage.getBoundingClientRect();
        viewerInfoPrompt.style.left = `${rect.left - 16}px`;
        viewerInfoPrompt.style.top = `${rect.top + rect.height / 2}px`;
        const promptRect = viewerInfoPrompt.getBoundingClientRect();
        const promptAnts = viewerInfoPrompt.querySelector('.viewer-info-prompt-ants');
        promptAnts.setAttribute('viewBox', `0 0 ${promptRect.width} ${promptRect.height}`);
        promptAnts.querySelectorAll('rect').forEach(outline => {
          outline.setAttribute('x', '.5');
          outline.setAttribute('y', '.5');
          outline.setAttribute('width', String(Math.max(1, promptRect.width - 1)));
          outline.setAttribute('height', String(Math.max(1, promptRect.height - 1)));
          const pillRadius = Math.max(1, (Math.min(promptRect.width, promptRect.height) - 1) / 2);
          outline.setAttribute('rx', String(pillRadius));
          outline.setAttribute('ry', String(pillRadius));
        });
        viewerInfoBack.style.left = `${rect.left}px`;
        viewerInfoBack.style.top = `${rect.top}px`;
        viewerInfoBack.style.width = `${rect.width}px`;
        viewerInfoBack.style.height = `${rect.height}px`;
        return rect;
      }

      function viewerInfoTransform(axis, degrees, twisted = false, twistDirection = 1) {
        const twist = twisted
          ? axis === 'Y'
            ? ` rotateX(${12 * twistDirection}deg) rotateZ(${5.5 * twistDirection}deg) skewY(${6.2 * twistDirection}deg) scale(.93, 1.07)`
            : ` rotateY(${12 * twistDirection}deg) rotateZ(${-5.2 * twistDirection}deg) skewX(${6.8 * twistDirection}deg) scale(1.07, .93)`
          : '';
        return `perspective(850px) rotate${axis}(${degrees}deg)${twist}`;
      }

      function viewerInfoFlipFrames(axis, from, to) {
        const direction = Math.sign(to - from) || 1;
        return [
          { transform: viewerInfoTransform(axis, from), offset: 0 },
          { transform: viewerInfoTransform(axis, from + (to - from) * .32, true, direction), offset: .32 },
          { transform: viewerInfoTransform(axis, from + (to - from) * .68, true, -direction), offset: .68 },
          { transform: viewerInfoTransform(axis, to), offset: 1 }
        ];
      }

      function clearViewerInfoHint() {
        clearTimeout(viewerInfoHintTimer);
        clearTimeout(viewerInfoHintHideTimer);
        viewerInfoHintTimer = 0;
        viewerInfoHintHideTimer = 0;
        viewer.classList.remove('info-hint');
      }

      function scheduleViewerInfoHint() {
        clearViewerInfoHint();
        if (!viewer.classList.contains('open') || viewer.classList.contains('menu-open') || viewerInfoOpen) return;
        if (viewerImageIndex !== 0) return;
        viewerInfoPromptLabel.textContent = 'PRESS I FOR INFO';
        positionViewerInfoElements();
        viewer.classList.add('info-hint');
      }

      function revealViewerInfoPrompt(label, previousRect = null) {
        if (viewerImageIndex !== 0) {
          clearViewerInfoHint();
          return;
        }
        viewerInfoPrompt.getAnimations().forEach(animation => animation.cancel());
        viewerInfoPromptLabel.textContent = label;
        positionViewerInfoElements();
        const targetRect = viewerInfoPrompt.getBoundingClientRect();
        viewer.classList.add('info-hint');
        if (!previousRect?.width || !previousRect?.height) return;
        const scaleX = previousRect.width / targetRect.width;
        const scaleY = previousRect.height / targetRect.height;
        viewerInfoPrompt.animate([
          { transform: `scale(${scaleX}, ${scaleY})`, opacity: .55 },
          { transform: 'scale(1, 1)', opacity: 1 }
        ], {
          duration: 440,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'none'
        });
      }

      function clearViewerInfoTyping() {
        viewerInfoTypeToken++;
        viewerInfoBack.querySelectorAll('[data-info-line]').forEach(line => line.replaceChildren());
      }

      function shiftViewerInfoCharacter(character) {
        if (!/[A-Za-z]/.test(character)) return character;
        const lower = character >= 'a' && character <= 'z';
        const alphabetStart = lower ? 97 : 65;
        const offset = character.charCodeAt(0) - alphabetStart;
        const direction = Math.random() < .5 ? -1 : 1;
        return String.fromCharCode(alphabetStart + (offset + direction + 26) % 26);
      }

      function randomViewerInfoCharacter(character) {
        if (!/[A-Za-z]/.test(character)) return character;
        const blocks = '█▓▒░■□▪▫▌▐▀▄';
        if (Math.random() < .58) return blocks[Math.floor(Math.random() * blocks.length)];
        const alphabet = character >= 'a' && character <= 'z'
          ? 'abcdefghijklmnopqrstuvwxyz'
          : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
      }

      function encryptViewerInfoText(value) {
        return [...value].map(shiftViewerInfoCharacter).join('');
      }

      function scrambleViewerInfoText(realValue, progress) {
        return [...realValue].map((character, index) => {
          if (!/[A-Za-z]/.test(character)) return character;
          const settlePoint = index / Math.max(1, realValue.length - 1);
          return progress >= settlePoint ? character : randomViewerInfoCharacter(character);
        }).join('');
      }

      function renderViewerInfoLine(line, value, cursor = null) {
        line.replaceChildren(document.createTextNode(value));
        if (cursor) line.appendChild(cursor);
      }

      function decorateViewerInfoLinks() {
        if (activeProject?.slug !== 'poster-series') return;
        const line = [...viewerInfoBack.querySelectorAll('[data-info-line]')].at(-1);
        if (!line) return;
        const value = line.dataset.infoLine || '';
        const linkText = 'get in touch';
        const linkStart = value.toLowerCase().lastIndexOf(linkText);
        if (linkStart < 0) return;
        const link = document.createElement('a');
        link.className = 'viewer-info-link';
        link.href = 'contact.html';
        link.textContent = value.slice(linkStart, linkStart + linkText.length);
        line.replaceChildren(
          document.createTextNode(value.slice(0, linkStart)),
          link,
          document.createTextNode(value.slice(linkStart + linkText.length))
        );
      }

      function decodeViewerInfoLines(lines, token) {
        return new Promise(resolve => {
          const started = performance.now();
          const settleDuration = 50;
          let frameNumber = 0;

          function frame(now) {
            if (token !== viewerInfoTypeToken) {
              resolve();
              return;
            }
            const elapsed = now - started;
            const progress = Math.min(1, elapsed / settleDuration);
            if (frameNumber % 2 === 0 || progress === 1) {
              lines.forEach(line => {
                const realValue = line.dataset.infoLine || '';
                renderViewerInfoLine(line, progress === 1
                  ? realValue
                  : scrambleViewerInfoText(realValue, progress));
              });
            }
            frameNumber++;
            if (progress === 1) resolve();
            else requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      }

      async function typeViewerInfoLines() {
        const token = ++viewerInfoTypeToken;
        const lines = [...viewerInfoBack.querySelectorAll('[data-info-line]')];
        const totalCharacters = lines.reduce((total, line) => total + (line.dataset.infoLine || '').length, 0);
        const characterDelay = Math.max(.167, Math.min(1.167, 150 / Math.max(1, totalCharacters)));
        lines.forEach(line => line.replaceChildren());
        const cursor = document.createElement('span');
        cursor.className = 'viewer-info-terminal-cursor';
        cursor.setAttribute('aria-hidden', 'true');

        for (const line of lines) {
          if (token !== viewerInfoTypeToken) return;
          const realValue = line.dataset.infoLine || '';
          const encryptedValue = encryptViewerInfoText(realValue);
          let typedValue = '';
          renderViewerInfoLine(line, typedValue, cursor);
          for (let characterIndex = 0; characterIndex < encryptedValue.length; characterIndex += 3) {
            if (token !== viewerInfoTypeToken) return;
            typedValue += encryptedValue.slice(characterIndex, characterIndex + 3);
            renderViewerInfoLine(line, typedValue, cursor);
            await new Promise(resolve => setTimeout(resolve, characterDelay));
          }
          await new Promise(resolve => setTimeout(resolve, 2.667));
        }
        if (token !== viewerInfoTypeToken) return;
        // Let the fully encrypted credits remain readable before decoding.
        await new Promise(resolve => setTimeout(resolve, 15));
        cursor.remove();
        await decodeViewerInfoLines(lines, token);
        if (token === viewerInfoTypeToken) decorateViewerInfoLinks();
      }

      async function openViewerInfoCard() {
        if (viewerInfoOpen || viewerInfoFlipping || viewerTransitioning || viewer.classList.contains('menu-open')) return;
        viewerInfoFlipping = true;
        const previousPromptRect = viewerInfoPrompt.getBoundingClientRect();
        clearViewerInfoHint();
        clearViewerFluidPull();
        clearImageNavigationCursor();
        const infoRect = positionViewerInfoElements();
        viewerInfoFlipAxis = infoRect.width >= infoRect.height ? 'X' : 'Y';
        viewerInfoBack.style.transform = viewerInfoTransform(viewerInfoFlipAxis, 180);
        viewerInfoBack.classList.add('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'false');
        clearViewerInfoTyping();
        document.body.classList.add('viewer-info-open');
        viewer.classList.add('info-card-open');
        window.setTimeout(() => {
          if (viewerInfoFlipping || viewerInfoOpen) typeViewerInfoLines();
        }, 90);
        const timing = {
          duration: 720,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        };
        const frontFlip = viewerImage.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 0, -180), timing);
        const backFlip = viewerInfoBack.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 180, 0), timing);
        await Promise.all([frontFlip.finished.catch(() => {}), backFlip.finished.catch(() => {})]);
        frontFlip.cancel();
        backFlip.cancel();
        viewerImage.style.transform = viewerInfoTransform(viewerInfoFlipAxis, -180);
        viewerImage.style.visibility = 'hidden';
        viewerInfoBack.style.transform = viewerInfoTransform(viewerInfoFlipAxis, 0);
        viewerInfoOpen = true;
        viewerInfoFlipping = false;
        revealViewerInfoPrompt('PRESS X TO CLOSE', previousPromptRect);
      }

      async function closeViewerInfoCard() {
        if (!viewerInfoOpen || viewerInfoFlipping) return;
        viewerInfoFlipping = true;
        const previousPromptRect = viewerInfoPrompt.getBoundingClientRect();
        clearViewerInfoHint();
        clearViewerInfoTyping();
        viewer.classList.remove('info-card-open');
        viewerImage.style.visibility = 'visible';
        const timing = {
          duration: 720,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        };
        const frontFlip = viewerImage.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, -180, 0), timing);
        const backFlip = viewerInfoBack.animate(viewerInfoFlipFrames(viewerInfoFlipAxis, 0, 180), timing);
        await Promise.all([frontFlip.finished.catch(() => {}), backFlip.finished.catch(() => {})]);
        frontFlip.cancel();
        backFlip.cancel();
        viewerImage.style.transform = '';
        viewerInfoBack.style.transform = '';
        viewerInfoBack.classList.remove('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('viewer-info-open');
        viewerInfoOpen = false;
        viewerInfoFlipping = false;
        revealViewerInfoPrompt('PRESS I FOR INFO', previousPromptRect);
        syncOverlayPointerState(pointerClientX, pointerClientY);
      }

      function resetViewerInfoCard() {
        clearViewerInfoHint();
        clearViewerInfoTyping();
        viewer.classList.remove('info-card-open');
        viewerInfoOpen = false;
        viewerInfoFlipping = false;
        viewerImage.style.transform = '';
        viewerImage.style.visibility = '';
        viewerInfoBack.style.transform = '';
        viewerInfoBack.classList.remove('visible');
        viewerInfoBack.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('viewer-info-open');
        viewerInfoPromptLabel.textContent = 'PRESS I FOR INFO';
      }

      function pullViewerImageEdge(rect, point, direction = 'outward', targetImage = viewerImage) {
        const distances = {
          left: Math.abs(point.x - rect.left),
          right: Math.abs(rect.right - point.x),
          top: Math.abs(point.y - rect.top),
          bottom: Math.abs(rect.bottom - point.y)
        };
        const edge = Object.keys(distances).reduce((closest, candidate) =>
          distances[candidate] < distances[closest] ? candidate : closest
        );
        if (distances[edge] > 24) return;
        clearViewerFluidPull();

        const padding = 340;
        const width = rect.width;
        const height = rect.height;
        const canvas = document.createElement('canvas');
        const ratio = Math.min(2, devicePixelRatio || 1);
        const canvasWidth = width + padding * 2;
        const canvasHeight = height + padding * 2;
        canvas.className = 'viewer-fluid-canvas';
        if (targetImage === viewerStaticImage) canvas.classList.add('viewer-static-fluid-canvas');
        canvas.width = Math.ceil(canvasWidth * ratio);
        canvas.height = Math.ceil(canvasHeight * ratio);
        canvas.style.left = `${rect.left - padding}px`;
        canvas.style.top = `${rect.top - padding}px`;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        viewer.appendChild(canvas);
        fluidPullCanvas = canvas;
        fluidPullTargetImage = targetImage;

        const context = canvas.getContext('2d');
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        const naturalWidth = targetImage.naturalWidth || width;
        const naturalHeight = targetImage.naturalHeight || height;
        const originX = padding;
        const originY = padding;
        const sampleWidth = Math.max(1, Math.round(width));
        const sampleHeight = Math.max(1, Math.round(height));
        let pullSamplePixels = null;
        try {
          const sampler = document.createElement('canvas');
          sampler.width = sampleWidth;
          sampler.height = sampleHeight;
          const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
          samplerContext.drawImage(targetImage, 0, 0, sampleWidth, sampleHeight);
          pullSamplePixels = samplerContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
        } catch (error) {
          pullSamplePixels = null;
        }
        function samplePullColor(px, py) {
          if (!pullSamplePixels) return [255, 255, 255];
          const sx = Math.max(0, Math.min(sampleWidth - 1, Math.round(px - originX)));
          const sy = Math.max(0, Math.min(sampleHeight - 1, Math.round(py - originY)));
          const sampleIndex = (sy * sampleWidth + sx) * 4;
          return [pullSamplePixels[sampleIndex], pullSamplePixels[sampleIndex + 1], pullSamplePixels[sampleIndex + 2]];
        }
        const localPointX = point.x - rect.left;
        const localPointY = point.y - rect.top;
        let fluidFocusX = localPointX;
        let fluidFocusY = localPointY;
        const band = Math.min(58, (edge === 'left' || edge === 'right' ? width : height) * .22);
        const radius = Math.min(145, (edge === 'left' || edge === 'right' ? height : width) * .34);
        const maxPull = 112;
        const cursorRadius = 40;
        const releaseDistance = 150;
        const strip = 4;
        let currentPull = 0;
        let released = false;
        let releaseStarted = 0;
        let releaseFrom = 0;
        let aberrationParticles = [];

        function isInwardVelocity(vx, vy) {
          if (edge === 'left') return vx > 0;
          if (edge === 'right') return vx < 0;
          if (edge === 'top') return vy > 0;
          return vy < 0;
        }

        function spawnAberrationParticle(px, py, axis, dirX, dirY) {
          const [colorR, colorG, colorB] = samplePullColor(px, py);
          const vx = dirX * (.7 + Math.random() * 3.4) + (axis === 'y' ? (Math.random() - .5) * 1.6 : 0);
          const vy = dirY * (.7 + Math.random() * 3.4) + (axis === 'x' ? (Math.random() - .5) * 1.6 : 0);
          aberrationParticles.push({
            x: px,
            y: py,
            axis,
            vx,
            vy,
            age: 0,
            life: 1,
            decay: .012 + Math.random() * .05,
            size: 1 + Math.random() * 2,
            inward: isInwardVelocity(vx, vy),
            colorR, colorG, colorB
          });
        }

        function getAberrationBurstRect() {
          const pillRect = cursorAction.getBoundingClientRect();
          const pillOpacity = parseFloat(getComputedStyle(cursorAction).opacity || '0');
          if (pillRect.width > 4 && pillRect.height > 4 && pillOpacity > .05) {
            return {
              left: pillRect.left - rect.left + padding,
              top: pillRect.top - rect.top + padding,
              right: pillRect.right - rect.left + padding,
              bottom: pillRect.bottom - rect.top + padding
            };
          }
          const cx = pointerClientX - rect.left + padding;
          const cy = pointerClientY - rect.top + padding;
          return { left: cx, top: cy, right: cx, bottom: cy };
        }

        function spawnAberrationBurst(count) {
          const burst = getAberrationBurstRect();
          const w = burst.right - burst.left;
          const h = burst.bottom - burst.top;
          for (let index = 0; index < count; index++) {
            let px;
            let py;
            if (w < 1 && h < 1) {
              px = burst.left;
              py = burst.top;
            } else {
              const side = Math.floor(Math.random() * 4);
              const t = Math.random();
              if (side === 0) { px = burst.left + w * t; py = burst.top; }
              else if (side === 1) { px = burst.right; py = burst.top + h * t; }
              else if (side === 2) { px = burst.left + w * t; py = burst.bottom; }
              else { px = burst.left; py = burst.top + h * t; }
            }
            const angle = Math.random() * Math.PI * 2;
            const speed = .5 + Math.random() * 2.6;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const [colorR, colorG, colorB] = samplePullColor(px, py);
            aberrationParticles.push({
              x: px,
              y: py,
              axis: Math.random() < .5 ? 'x' : 'y',
              vx,
              vy,
              age: 0,
              life: 1,
              decay: .012 + Math.random() * .05,
              size: 1 + Math.random() * 2,
              inward: isInwardVelocity(vx, vy),
              colorR, colorG, colorB
            });
          }
        }

        function drawAberrationParticles() {
          if (!aberrationParticles.length) return;
          context.globalCompositeOperation = 'source-over';
          for (let index = aberrationParticles.length - 1; index >= 0; index--) {
            const particle = aberrationParticles[index];
            particle.age++;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= .972;
            particle.vy *= .972;
            particle.life -= particle.decay;
            if (particle.life <= 0) {
              aberrationParticles.splice(index, 1);
              continue;
            }
            const alpha = Math.max(0, Math.min(1, particle.life));
            const half = particle.size / 2;
            context.fillStyle = particle.inward
              ? `rgba(0,0,0,${alpha * .9})`
              : `rgba(${particle.colorR},${particle.colorG},${particle.colorB},${alpha * .9})`;
            context.fillRect(particle.x - half, particle.y - half, particle.size, particle.size);
          }
          if (aberrationParticles.length > 900) aberrationParticles.length = 900;
        }

        function drawFrame(now) {
          if (fluidPullCanvas !== canvas) return;
          const targetFocusX = Math.max(0, Math.min(width, pointerClientX - rect.left));
          const targetFocusY = Math.max(0, Math.min(height, pointerClientY - rect.top));
          fluidFocusX += (targetFocusX - fluidFocusX) * .14;
          fluidFocusY += (targetFocusY - fluidFocusY) * .14;
          let outwardDistance = 0;
          if (direction === 'outward') {
            if (edge === 'left') outwardDistance = rect.left - (pointerClientX - cursorRadius);
            if (edge === 'right') outwardDistance = (pointerClientX + cursorRadius) - rect.right;
            if (edge === 'top') outwardDistance = rect.top - (pointerClientY - cursorRadius);
            if (edge === 'bottom') outwardDistance = (pointerClientY + cursorRadius) - rect.bottom;
          } else {
            if (edge === 'left') outwardDistance = (pointerClientX + cursorRadius) - rect.left;
            if (edge === 'right') outwardDistance = rect.right - (pointerClientX - cursorRadius);
            if (edge === 'top') outwardDistance = (pointerClientY + cursorRadius) - rect.top;
            if (edge === 'bottom') outwardDistance = rect.bottom - (pointerClientY - cursorRadius);
          }
          outwardDistance = Math.max(0, outwardDistance);

          const pointerInside =
            pointerClientX >= rect.left && pointerClientX <= rect.right
            && pointerClientY >= rect.top && pointerClientY <= rect.bottom;
          const pointerReversed = direction === 'outward' ? pointerInside : !pointerInside;
          if (!released && (outwardDistance >= releaseDistance || pointerReversed)) {
            released = true;
            releaseStarted = now;
            releaseFrom = currentPull;
          }

          if (released) {
            const releaseProgress = Math.min(1, (now - releaseStarted) / 620);
            const eased = 1 - Math.pow(1 - releaseProgress, 3);
            currentPull = releaseFrom * (1 - eased);
          } else {
            const targetPull = Math.min(maxPull, outwardDistance * .78);
            currentPull += (targetPull - currentPull) * .2;
          }
          const pull = direction === 'inward' ? -Math.min(currentPull, band * .82) : currentPull;
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.drawImage(targetImage, originX, originY, width, height);

          if (edge === 'left' || edge === 'right') {
            const sourceBand = naturalWidth * band / width;
            const sourceX = edge === 'left' ? 0 : naturalWidth - sourceBand;
            for (let y = 0; y < height; y += strip) {
              const center = y + strip / 2;
              const distance = (center - fluidFocusY) / radius;
              const weight = Math.exp(-distance * distance * 1.8);
              const ripple = .92 + .08 * Math.sin(y * .11 + now * .012);
              const amount = pull * weight * ripple;
              const destinationX = edge === 'left' ? originX - amount : originX + width - band;
              if (amount < 0) {
                if (edge === 'left') context.clearRect(originX, originY + y, -amount + 1, Math.min(strip + 1, height - y));
                else context.clearRect(originX + width + amount - 1, originY + y, -amount + 1, Math.min(strip + 1, height - y));
              }
              const sourceY = naturalHeight * y / height;
              const sourceHeight = naturalHeight * Math.min(strip + 1, height - y) / height;
              context.drawImage(
                targetImage,
                sourceX, sourceY, sourceBand, sourceHeight,
                destinationX - 1, originY + y, band + amount + 2, Math.min(strip + 1, height - y)
              );
              if (Math.abs(amount) > 1.5 && Math.random() < weight * .3) {
                spawnAberrationParticle(
                  destinationX + (edge === 'left' ? 0 : band + amount),
                  originY + center,
                  'x',
                  edge === 'left' ? -1 : 1,
                  0
                );
              }
            }
          } else {
            const sourceBand = naturalHeight * band / height;
            const sourceY = edge === 'top' ? 0 : naturalHeight - sourceBand;
            for (let x = 0; x < width; x += strip) {
              const center = x + strip / 2;
              const distance = (center - fluidFocusX) / radius;
              const weight = Math.exp(-distance * distance * 1.8);
              const ripple = .92 + .08 * Math.sin(x * .11 + now * .012);
              const amount = pull * weight * ripple;
              const destinationY = edge === 'top' ? originY - amount : originY + height - band;
              if (amount < 0) {
                if (edge === 'top') context.clearRect(originX + x, originY, Math.min(strip + 1, width - x), -amount + 1);
                else context.clearRect(originX + x, originY + height + amount - 1, Math.min(strip + 1, width - x), -amount + 1);
              }
              const sourceX = naturalWidth * x / width;
              const sourceWidth = naturalWidth * Math.min(strip + 1, width - x) / width;
              context.drawImage(
                targetImage,
                sourceX, sourceY, sourceWidth, sourceBand,
                originX + x, destinationY - 1, Math.min(strip + 1, width - x), band + amount + 2
              );
              if (Math.abs(amount) > 1.5 && Math.random() < weight * .3) {
                spawnAberrationParticle(
                  originX + center,
                  destinationY + (edge === 'top' ? 0 : band + amount),
                  'y',
                  0,
                  edge === 'top' ? -1 : 1
                );
              }
            }
          }

          if (Math.abs(currentPull) > 2) spawnAberrationBurst(2);
          drawAberrationParticles();

          if (!released || currentPull > .25) {
            fluidPullFrame = requestAnimationFrame(drawFrame);
          } else {
            clearViewerFluidPull();
          }
        }

        targetImage.style.opacity = '0';
        fluidPullFrame = requestAnimationFrame(drawFrame);
      }

      function syncViewerImageEdgeExit(detailOpen, insideImage, rect, x, y, targetImage = viewerImage) {
        if (!detailOpen) {
          wasInsideViewerImage = false;
          lastViewerImagePoint = null;
          lastViewerOutsidePoint = null;
          return;
        }
        if (insideImage) {
          if (!wasInsideViewerImage && lastViewerOutsidePoint) {
            pullViewerImageEdge(rect, { x, y }, 'inward', targetImage);
          }
          wasInsideViewerImage = true;
          lastViewerImagePoint = { x, y };
          lastViewerOutsidePoint = null;
          return;
        }
        if (wasInsideViewerImage && lastViewerImagePoint) {
          pullViewerImageEdge(rect, lastViewerImagePoint, 'outward', targetImage);
        }
        wasInsideViewerImage = false;
        lastViewerImagePoint = null;
        lastViewerOutsidePoint = { x, y };
      }

      function syncOverlayPointerState(x, y, target = document.elementFromPoint(x, y)) {
        const viewerOpen = viewer.classList.contains('open');
        const overThumbnail = Boolean(target?.closest?.('.viewer-thumbnail'));
        const overClose = Boolean(target?.closest?.('.viewer-close'));
        const overTab = Boolean(target?.closest?.('.viewer-tab, .viewer-logo'));
        const detailOpen = viewerOpen
          && !viewer.classList.contains('menu-open')
          && !viewer.classList.contains('video-open')
          && !viewer.classList.contains('static-page-open');
        if (viewerInfoOpen || viewerInfoFlipping) {
          const infoCardRect = viewerInfoBack.getBoundingClientRect();
          const aboveInfoCard = y < infoCardRect.top;
          clearImageNavigationCursor();
          document.body.classList.remove('thumbnail-hover', 'viewer-detail-menu-cursor');
          document.body.classList.toggle('viewer-top-zone-hover', aboveInfoCard);
          document.body.classList.toggle('viewer-tab-hover', overTab && !aboveInfoCard);
          document.body.classList.toggle('viewer-close-hover', overClose && !aboveInfoCard);
          return;
        }
        const staticPageOpen = viewerOpen && viewer.classList.contains('static-page-open');
        const imageRect = viewerImage.getBoundingClientRect();
        const insideImage = detailOpen && !overThumbnail && !overClose
          && x >= imageRect.left && x <= imageRect.right
          && y >= imageRect.top && y <= imageRect.bottom;
        const staticImageRect = viewerStaticImage.getBoundingClientRect();
        const insideStaticImage = staticPageOpen && !overClose && !overTab
          && viewerStaticImage.complete && viewerStaticImage.naturalWidth > 0
          && x >= staticImageRect.left && x <= staticImageRect.right
          && y >= staticImageRect.top && y <= staticImageRect.bottom;
        if (staticPageOpen) {
          syncViewerImageEdgeExit(true, insideStaticImage, staticImageRect, x, y, viewerStaticImage);
        } else {
          syncViewerImageEdgeExit(detailOpen, insideImage, imageRect, x, y, viewerImage);
        }
        const topZoneActive = detailOpen && !insideImage && !overThumbnail && !overClose
          && y <= imageRect.top;
        const imageLeftActive = insideImage && x < imageRect.left + imageRect.width / 2;
        if (insideImage) swapImageNavigationArrow(imageLeftActive ? 'left' : 'right');
        document.body.classList.toggle('image-nav-left', imageLeftActive);
        document.body.classList.toggle('image-nav-right', insideImage && !imageLeftActive);
        document.body.classList.remove('viewer-top-zone-hover');
        document.body.classList.toggle('viewer-close-hover', viewerOpen && overClose);
        document.body.classList.toggle(
          'viewer-detail-menu-cursor',
          detailOpen && !insideImage && !overThumbnail && !overClose && !overTab
        );
        document.body.classList.toggle(
          'thumbnail-hover',
          detailOpen && !insideImage && !topZoneActive && !overClose
            && (overThumbnail || x >= innerWidth - 152)
        );
      }

      function updateThumbnailSelection() {
        updateViewerBreadcrumb();
        viewerThumbnails.querySelectorAll('.viewer-thumbnail').forEach((thumbnail, index) => {
          const active = index === viewerImageIndex;
          thumbnail.classList.toggle('active', active);
          thumbnail.setAttribute('aria-current', active ? 'true' : 'false');
          if (active) thumbnail.scrollIntoView({ block: 'nearest' });
        });
      }

      async function selectViewerImage(index) {
        if (index === viewerImageIndex || viewerTransitioning || viewerInfoOpen || viewerInfoFlipping) return;
        viewerTransitioning = true;
        viewer.classList.remove('video-open');
        viewerVideo.removeAttribute('src');
        clearViewerFluidPull();
        const previousRect = viewerImage.getBoundingClientRect();
        const source = images[index];
        const incoming = new Image();
        if (/^https?:/i.test(source)) incoming.crossOrigin = 'anonymous';
        incoming.src = source;
        const incomingReady = incoming.decode?.().catch(() => {})
          || new Promise(resolve => {
            incoming.onload = resolve;
            incoming.onerror = resolve;
          });
        configureMask();
        await animateMask('cover', 260);
        await incomingReady;
        viewerImageIndex = index;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image ${index + 1} of ${images.length}`;
        if (/^https?:/i.test(source)) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.src = source;
        await viewerImage.decode?.().catch(() => {});
        updateThumbnailSelection();

        viewerImage.style.scale = '1';
        viewerImage.style.width = `${previousRect.width}px`;
        viewerImage.style.height = `${previousRect.height}px`;
        const targetSize = getOverlayImageSize(viewerImage);
        viewerImage.style.width = `${targetSize.width}px`;
        viewerImage.style.height = `${targetSize.height}px`;
        const targetRect = viewerImage.getBoundingClientRect();
        configureMask();
        viewerImage.style.width = `${previousRect.width}px`;
        viewerImage.style.height = `${previousRect.height}px`;
        asciiMask.style.left = `${previousRect.left}px`;
        asciiMask.style.top = `${previousRect.top}px`;
        asciiMask.style.width = `${previousRect.width}px`;
        asciiMask.style.height = `${previousRect.height}px`;

        const resizeTiming = {
          duration: 780,
          easing: 'cubic-bezier(.4, 0, .2, 1)',
          fill: 'forwards'
        };
        const imageResize = viewerImage.animate([
          { width: `${previousRect.width}px`, height: `${previousRect.height}px` },
          { width: `${targetRect.width}px`, height: `${targetRect.height}px` }
        ], resizeTiming);
        const maskResize = asciiMask.animate([
          {
            left: `${previousRect.left}px`,
            top: `${previousRect.top}px`,
            width: `${previousRect.width}px`,
            height: `${previousRect.height}px`
          },
          {
            left: `${targetRect.left}px`,
            top: `${targetRect.top}px`,
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`
          }
        ], resizeTiming);
        const infoPillMove = viewerInfoPrompt.animate([
          {
            left: `${previousRect.left - 16}px`,
            top: `${previousRect.top + previousRect.height / 2}px`
          },
          {
            left: `${targetRect.left - 16}px`,
            top: `${targetRect.top + targetRect.height / 2}px`
          }
        ], resizeTiming);
        const synchronizedStart = document.timeline.currentTime ?? performance.now();
        imageResize.startTime = synchronizedStart;
        maskResize.startTime = synchronizedStart;
        infoPillMove.startTime = synchronizedStart;
        await Promise.all([
          animateMask('reveal', 780, synchronizedStart),
          imageResize.finished.catch(() => {}),
          maskResize.finished.catch(() => {}),
          infoPillMove.finished.catch(() => {})
        ]);

        // Preserve the exact final resize frame before cancelling the WAAPI
        // animations. Without this, cancel() exposes previousRect for one paint,
        // creating the visible shrink/grow jump after the ASCII reveal.
        if (typeof imageResize.commitStyles === 'function') imageResize.commitStyles();
        if (typeof maskResize.commitStyles === 'function') maskResize.commitStyles();
        if (typeof infoPillMove.commitStyles === 'function') infoPillMove.commitStyles();

        imageResize.cancel();
        maskResize.cancel();
        infoPillMove.cancel();

        // The committed width/height are already the final target geometry.
        // Remove them only after the browser has painted that identical final
        // frame, handing control back to the responsive CSS with no visual jump.
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        viewerImage.style.width = '';
        viewerImage.style.height = '';
        viewerImage.style.scale = '';
        configureMask();
        viewerTransitioning = false;
        if (activeProject.videoIndex === viewerImageIndex) {
          clearViewerInfoHint();
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(activeProject.video);
        } else {
          scheduleViewerInfoHint();
        }
        syncOverlayPointerState(pointerClientX, pointerClientY);
      }

      function renderViewerThumbnails() {
        viewerThumbnails.replaceChildren(...images.map((source, index) => {
          const button = document.createElement('button');
          const image = document.createElement('img');
          button.type = 'button';
          button.className = 'viewer-thumbnail';
          button.setAttribute('aria-label', `View image ${index + 1}`);
          image.src = source;
          image.alt = '';
          image.draggable = false;
          trackThumbnailLoad(button, image);
          button.appendChild(image);
          button.addEventListener('pointerenter', () => {
            menuHoverSound.currentTime = 0;
            menuHoverSound.play().catch(() => {});
          });
          button.addEventListener('click', event => {
            event.stopPropagation();
            selectViewerImage(index);
          });
          return button;
        }));
        updateThumbnailSelection();
        updateThumbnailRailLayout();
      }

      function updateThumbnailRailLayout() {
        viewerThumbnails.classList.remove('long-gallery');
        requestAnimationFrame(() => {
          const availableCenteredHeight = Math.max(0, innerHeight - 144);
          const isLongGallery = viewerThumbnails.scrollHeight > availableCenteredHeight + 1;
          viewerThumbnails.classList.toggle('long-gallery', isLongGallery);
        });
      }

      function renderViewerMenu(section) {
        const projects = viewerProjects[section] || [];
        viewerMenuList.classList.toggle('compact', projects.length <= 5);
        viewerMenuList.replaceChildren(...projects.map(item => {
          const entry = document.createElement('button');
          const mixedMedia = Boolean(item.video && Number.isInteger(item.videoIndex));
          const imageCount = mixedMedia ? item.images.length : (item.video ? 1 : item.images.length);
          entry.type = 'button';
          entry.className = 'viewer-menu-entry';
          entry.dataset.projectSlug = item.slug;
          entry.dataset.imageCount = String(imageCount);
          entry.dataset.mediaLabel = item.externalLink
            ? (item.linkLabel || 'OPEN LINK')
            : (mixedMedia
              ? `${imageCount} MEDIA`
              : (item.video ? '1 VIDEO' : `${imageCount} ${imageCount === 1 ? 'IMAGE' : 'IMAGES'}`));
          entry.dataset.preview = item.preview || (item.images.length
            ? item.images[Math.floor(Math.random() * item.images.length)]
            : '');
          entry.dataset.externalLink = item.externalLink || '';
          const label = document.createElement('span');
          label.className = 'viewer-menu-entry-label';
          label.textContent = item.menuTitle || item.title;
          if (item.externalLink) {
            entry.classList.add('viewer-menu-entry-external');
            const externalIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            externalIcon.setAttribute('class', 'viewer-menu-entry-external-icon');
            externalIcon.setAttribute('viewBox', '0 0 24 24');
            externalIcon.setAttribute('aria-hidden', 'true');
            const externalPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            externalPath.setAttribute('d', 'M14 3h7v7M21 3L10 14M19 14v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6');
            externalPath.setAttribute('fill', 'none');
            externalPath.setAttribute('stroke', 'currentColor');
            externalPath.setAttribute('stroke-width', '2');
            externalPath.setAttribute('stroke-linecap', 'round');
            externalPath.setAttribute('stroke-linejoin', 'round');
            externalIcon.appendChild(externalPath);
            label.appendChild(externalIcon);
          }
          entry.appendChild(label);
          entry.addEventListener('pointerenter', () => setMenuEntryActive(entry));
          entry.addEventListener('click', event => {
            event.stopPropagation();
            if (entry.dataset.externalLink) {
              window.open(entry.dataset.externalLink, '_blank', 'noopener');
              return;
            }
            openProjectFromMenu(entry);
          });
          return entry;
        }));
      }

      function createTransitionMenuList(titles) {
        const list = document.createElement('div');
        list.className = 'viewer-menu-list';
        list.classList.toggle('compact', titles.length <= 5);
        list.replaceChildren(...titles.map(item => {
          const entry = document.createElement('button');
          entry.type = 'button';
          entry.className = 'viewer-menu-entry';
          const label = document.createElement('span');
          label.className = 'viewer-menu-entry-label';
          label.textContent = item.menuTitle || item.title;
          splitTransitionLabelCharacters(label);
          entry.appendChild(label);
          return entry;
        }));
        return list;
      }

      function splitTransitionLabelCharacters(label) {
        const text = label.textContent || '';
        label.replaceChildren(...[...text].map(character => {
          const span = document.createElement('span');
          span.className = 'viewer-menu-transition-character';
          span.textContent = character === ' ' ? '\u00a0' : character;
          return span;
        }));
      }

      async function transitionViewerMenu(section) {
        if (menuCategoryTransitioning || section === activeViewerSection) return;
        menuCategoryTransitioning = true;
        syncMenuScrollCue();
        setMenuEntryActive(null);
        const layer = document.createElement('div');
        const outgoing = viewerMenuList.cloneNode(true);
        const incoming = createTransitionMenuList(viewerProjects[section]);
        layer.className = 'viewer-menu-transition-layer';
        outgoing.querySelectorAll('.cursor-hover').forEach(entry => entry.classList.remove('cursor-hover'));
        outgoing.querySelectorAll('.viewer-menu-entry-label').forEach(label => { label.style.transform = ''; });
        outgoing.querySelectorAll('.viewer-menu-entry-label').forEach(splitTransitionLabelCharacters);
        outgoing.style.translate = `0 ${-viewerMenu.scrollTop}px`;
        layer.append(outgoing, incoming);
        viewerMenu.appendChild(layer);
        viewerMenuList.style.visibility = 'hidden';
        updateViewerTabs(section);
        history.pushState({ page: section.toLowerCase() }, '', `${section.toLowerCase()}.html`);
        applyPageSeo(section);

        const timing = { duration: 430, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both' };
        const animations = [];
        outgoing.querySelectorAll('.viewer-menu-entry').forEach((entry, index) => {
          const rowDelay = index * 24;
          animations.push(entry.animate([
            { transform: 'translateX(0)', opacity: 1 },
            { transform: 'translateX(-110vw)', opacity: 0 }
          ], { ...timing, delay: rowDelay }));
          entry.querySelectorAll('.viewer-menu-transition-character').forEach((character, characterIndex) => {
            animations.push(character.animate([
              { transform: 'translateX(0)', opacity: 1 },
              { transform: 'translateX(-24px)', opacity: 0 }
            ], {
              duration: 330,
              delay: rowDelay + characterIndex * 7,
              easing: 'cubic-bezier(.55, 0, 1, .45)',
              fill: 'both'
            }));
          });
        });
        incoming.querySelectorAll('.viewer-menu-entry').forEach((entry, index) => {
          const rowDelay = 70 + index * 24;
          animations.push(entry.animate([
            { transform: 'translateX(110vw)', opacity: 0, offset: 0, easing: 'cubic-bezier(.22, 1, .36, 1)' },
            { transform: 'translateX(-120px)', opacity: 1, offset: .48, easing: 'cubic-bezier(.16, 1, .3, 1)' },
            { transform: 'translateX(0)', opacity: 1, offset: 1 }
          ], { ...timing, duration: 1200, delay: rowDelay }));
          entry.querySelectorAll('.viewer-menu-transition-character').forEach((character, characterIndex) => {
            animations.push(character.animate([
              { transform: 'translateX(38px)', opacity: 0 },
              { transform: 'translateX(0)', opacity: 1 }
            ], {
              duration: 520,
              delay: rowDelay + 120 + characterIndex * 9,
              easing: 'cubic-bezier(.16, 1, .3, 1)',
              fill: 'both'
            }));
          });
        });
        await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
        renderViewerMenu(section);
        viewerMenu.scrollTop = 0;
        viewerMenuList.style.visibility = '';
        layer.remove();
        menuCategoryTransitioning = false;
        syncMenuScrollCue();
        requestAnimationFrame(syncMenuHoverUnderCursor);
      }

      function openViewerMenu(section = activeViewerSection) {
        document.body.classList.remove('thumbnail-hover');
        clearViewerInfoHint();
        clearViewerFluidPull();
        clearImageNavigationCursor();
        updateViewerTabs(section);
        renderViewerMenu(section);
        viewerMenu.scrollTop = 0;
        syncMenuScrollCue();
        viewerMenuPreview.classList.remove('visible');
        hoveredMenuEntry = null;
        cursorActionCount.classList.remove('visible');
        viewer.classList.add('menu-open');
        document.body.classList.add('viewer-menu-open');
        cursorActionLabel.textContent = 'IMAGE';
      }

      async function openViewerMenuWithSweep(section = activeViewerSection) {
        if (menuCategoryTransitioning) return;
        menuCategoryTransitioning = true;
        updateViewerTabs(section);
        history.pushState({ page: section.toLowerCase() }, '', `${section.toLowerCase()}.html`);
        applyPageSeo(section);
        const breadcrumb = viewer.querySelector('.viewer-breadcrumb');
        breadcrumb.style.opacity = '0';
        viewer.classList.add('menu-open');

        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        viewer.appendChild(sweep);
        const sweepAnimation = sweep.animate([
          { transform: 'scaleY(0)' },
          { transform: 'scaleY(1)' }
        ], {
          duration: 460,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await sweepAnimation.finished.catch(() => {});

        openViewerMenu(section);
        breadcrumb.style.opacity = '';
        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        const reveals = entries.map((entry, index) => entry.animate([
          { opacity: 0, transform: 'translateY(-30px)' },
          { opacity: .28, transform: 'translateY(-18px)', offset: .38 },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 520,
          delay: 40 + index * 46,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both'
        }));
        sweep.remove();
        await Promise.all(reveals.map(animation => animation.finished.catch(() => {})));
        reveals.forEach(animation => animation.cancel());
        menuCategoryTransitioning = false;
        syncMenuScrollCue();
        requestAnimationFrame(syncMenuHoverUnderCursor);
      }

      async function openProjectFromMenu(entry) {
        if (menuCategoryTransitioning || !viewer.classList.contains('menu-open')) return;
        const selectedProject = projectBySlug.get(entry.dataset.projectSlug);
        if (!selectedProject) return;
        if (selectedProject.slug === 'harvey-nichols') {
          location.href = 'aito.html?project=harvey-nichols&v=hn-mobile-1';
          return;
        }
        menuCategoryTransitioning = true;
        clearTimeout(cursorCountTimer);
        setMenuEntryActive(null);
        viewerMenuPreview.classList.remove('visible');
        cursorActionCount.classList.remove('visible');

        const entries = [...viewerMenuList.querySelectorAll('.viewer-menu-entry')];
        const exits = entries.map((item, index) => item.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: .3, transform: 'translateY(18px)', offset: .62 },
          { opacity: 0, transform: 'translateY(30px)' }
        ], {
          duration: 380,
          delay: index * 34,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'both'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));

        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        sweep.style.transform = 'scaleY(1)';
        sweep.style.transformOrigin = '50% 100%';
        viewer.appendChild(sweep);
        closeViewerMenu();
        setActiveProject(selectedProject);
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        try {
          const url = new URL(location.href);
          url.searchParams.set('project', selectedProject.slug);
          history.pushState({ project: selectedProject.slug }, '', url);
        } catch (_) {}
        if (selectedProject.video && !Number.isInteger(selectedProject.videoIndex)) {
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(selectedProject.video);
          viewerThumbnails.replaceChildren();
          updateViewerBreadcrumb();
        } else {
          viewerImageIndex = 0;
          viewerImage.src = images[0];
          await viewerImage.decode?.().catch(() => {});
          renderViewerThumbnails();
          positionViewerInfoElements();
        }
        const reveal = sweep.animate([
          { transform: 'scaleY(1)' },
          { transform: 'scaleY(0)' }
        ], {
          duration: 500,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await reveal.finished.catch(() => {});
        sweep.remove();
        exits.forEach(animation => animation.cancel());
        menuCategoryTransitioning = false;
        syncOverlayPointerState(pointerClientX, pointerClientY);
        if (!selectedProject.video || Number.isInteger(selectedProject.videoIndex)) scheduleViewerInfoHint();
      }

      function closeViewerMenu() {
        viewer.classList.remove('menu-open');
        document.body.classList.remove('viewer-menu-open');
        document.body.classList.remove('thumbnail-hover');
        document.body.classList.remove('viewer-tab-hover');
        document.body.classList.remove('viewer-detail-menu-cursor');
        clearImageNavigationCursor();
        viewerMenuPreview.classList.remove('visible');
        clearTimeout(cursorCountTimer);
        setMenuEntryActive(null);
        cursorActionLabel.textContent = 'MENU';
      }

      function resolveVideoEmbedUrl(source) {
        const url = new URL(source, location.href);
        const clientOrigin = location.protocol === 'http:' || location.protocol === 'https:'
          ? location.origin
          : 'https://www.tokonoma.xyz';
        url.searchParams.set('origin', clientOrigin);
        url.searchParams.set('enablejsapi', '1');
        return url.href;
      }

      function updateStaticContentFades() {
        const hasOverflow = viewerStaticContent.scrollHeight > viewerStaticContent.clientHeight + 2;
        const isScrolled = viewerStaticContent.scrollTop > 2;
        const isAtBottom = viewerStaticContent.scrollTop + viewerStaticContent.clientHeight
          >= viewerStaticContent.scrollHeight - 2;
        viewerStaticContent.classList.toggle('has-overflow', hasOverflow);
        viewerStaticContent.classList.toggle('is-scrolled', hasOverflow && isScrolled);
        viewerStaticContent.classList.toggle('is-at-bottom', hasOverflow && isAtBottom);
      }

      viewerStaticContent.addEventListener('scroll', updateStaticContentFades, { passive: true });
      addEventListener('resize', updateStaticContentFades, { passive: true });
      if ('ResizeObserver' in window) {
        new ResizeObserver(updateStaticContentFades).observe(viewerStaticCopy);
      }

      let staticSlideshowTimer = null;
      let staticImageMasker = null;
      let staticImageBusy = false;
      function createGridFlipMasker(image) {
        const canvas = document.createElement('canvas');
        canvas.className = 'static-image-mask';
        viewer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const cols = 6;
        const rows = 4;
        let boxWidth = 0;
        let boxHeight = 0;

        function configure() {
          const rect = image.getBoundingClientRect();
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          boxWidth = rect.width;
          boxHeight = rect.height;
          canvas.style.left = rect.left + 'px';
          canvas.style.top = rect.top + 'px';
          canvas.style.width = rect.width + 'px';
          canvas.style.height = rect.height + 'px';
          canvas.width = Math.max(1, Math.round(rect.width * ratio));
          canvas.height = Math.max(1, Math.round(rect.height * ratio));
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function containRect(naturalW, naturalH) {
          if (!naturalW || !naturalH) return { x: 0, y: 0, width: boxWidth, height: boxHeight };
          const scale = Math.min(boxWidth / naturalW, boxHeight / naturalH);
          const width = naturalW * scale;
          const height = naturalH * scale;
          return { x: (boxWidth - width) / 2, y: 0, width, height };
        }

        function drawFitCell(sourceImg, fit, boxX, boxY, cellW, cellH) {
          if (!fit.width || !fit.height) return;
          const relX = (boxX - fit.x) / fit.width;
          const relY = (boxY - fit.y) / fit.height;
          const relW = cellW / fit.width;
          const relH = cellH / fit.height;
          if (relX + relW <= 0 || relX >= 1 || relY + relH <= 0 || relY >= 1) return;
          const naturalW = sourceImg.naturalWidth || boxWidth;
          const naturalH = sourceImg.naturalHeight || boxHeight;
          ctx.drawImage(
            sourceImg,
            relX * naturalW, relY * naturalH,
            relW * naturalW, relH * naturalH,
            boxX, boxY, cellW, cellH
          );
        }

        async function transitionTo(nextSrc, duration = matchMedia(mobileLayoutQuery).matches ? 620 : 850) {
          configure();
          const oldFit = containRect(image.naturalWidth, image.naturalHeight);
          const nextImage = new Image();
          await new Promise(resolve => {
            nextImage.onload = resolve;
            nextImage.onerror = resolve;
            nextImage.src = nextSrc;
          });
          configure();
          const newFit = containRect(nextImage.naturalWidth, nextImage.naturalHeight);
          const cellW = boxWidth / cols;
          const cellH = boxHeight / rows;
          const delays = [];
          let maxDelay = 0;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const wave = (col / Math.max(1, cols - 1)) * .6 + (row / Math.max(1, rows - 1)) * .25 + Math.random() * .15;
              delays.push(wave);
              if (wave > maxDelay) maxDelay = wave;
            }
          }
          const cellDuration = duration * .55;
          const spreadDuration = Math.max(1, duration - cellDuration);
          canvas.style.opacity = '1';
          await new Promise(resolve => {
            const started = performance.now();
            function frame(now) {
              const elapsed = now - started;
              ctx.clearRect(0, 0, boxWidth, boxHeight);
              let allDone = true;
              for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                  const index = row * cols + col;
                  const cellStart = (delays[index] / (maxDelay || 1)) * spreadDuration;
                  if (elapsed < cellStart) { allDone = false; continue; }
                  let t = (elapsed - cellStart) / cellDuration;
                  t = Math.max(0, Math.min(1, t));
                  if (t < 1) allDone = false;
                  const boxX = col * cellW;
                  const boxY = row * cellH;
                  const cx = boxX + cellW / 2;
                  const cy = boxY + cellH / 2;
                  let scaleX;
                  let skew;
                  let alpha;
                  let sourceImg;
                  let fit;
                  if (t < .5) {
                    const p = t / .5;
                    scaleX = 1 - p;
                    skew = p * .3;
                    alpha = 1 - p * .55;
                    sourceImg = image;
                    fit = oldFit;
                  } else {
                    const p = (t - .5) / .5;
                    scaleX = p;
                    skew = (1 - p) * -.3;
                    alpha = .45 + p * .55;
                    sourceImg = nextImage;
                    fit = newFit;
                  }
                  ctx.save();
                  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
                  ctx.translate(cx, cy);
                  ctx.transform(scaleX, 0, skew, 1, 0, 0);
                  ctx.translate(-cx, -cy);
                  drawFitCell(sourceImg, fit, boxX, boxY, cellW, cellH);
                  ctx.restore();
                }
              }
              if (!allDone) requestAnimationFrame(frame);
              else {
                ctx.clearRect(0, 0, boxWidth, boxHeight);
                canvas.style.opacity = '0';
                resolve();
              }
            }
            requestAnimationFrame(frame);
          });
          image.src = nextSrc;
        }

        function destroy() {
          canvas.remove();
        }

        return { configure, transitionTo, destroy };
      }


      function openStaticPage(section) {
        const content = {
          ABOUT: {
            title: 'ABOUT',
            imageAlt: 'Amogh R Raikar — Software Developer & Creative Technologist',
            imagePool: projectBySlug.get('karatcore-erp')?.images || [],
            copy: `
              <p>I\'m <strong style="color:var(--cursor-color)">Amogh R Raikar</strong>, a BCA student, software developer, and technology enthusiast passionate about building practical software solutions and exploring emerging technologies based in Bengaluru, India.</p>
              <p>My interests include full-stack development, artificial intelligence, cybersecurity, blockchain, and UI/UX design. I enjoy transforming ideas into functional applications, solving real-world problems through technology, and creating intuitive digital experiences.</p>
              <p>From developing ERP systems and AI-powered productivity applications to experimenting with blockchain and modern web technologies, I\'m continuously expanding my skills and building projects that reflect my creativity, technical curiosity, and problem-solving abilities. My goal is to become a versatile software engineer who combines strong engineering fundamentals with thoughtful design.</p>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>ENGINEERING FOCUS</h2>
                <div class="viewer-static-reason">
                  <h3>PRACTICAL IMPACT</h3>
                  <p>Engineering robust, scalable software that addresses real business and user needs directly.</p>
                </div>
                <div class="viewer-static-reason">
                  <h3>EMERGING TECHNOLOGIES</h3>
                  <p>Integrating artificial intelligence, computer vision, and cryptographic ledgers into intuitive user flows.</p>
                </div>
                <div class="viewer-static-reason">
                  <h3>DESIGN &amp; USER EXPERIENCE</h3>
                  <p>Bridging backend precision with clean, modern, and responsive interface systems.</p>
                </div>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>SKILLS &amp; TECHNOLOGIES</h2>
                <h3>LANGUAGES</h3>
                <p>Python &bull; Java &bull; C &bull; C++ &bull; JavaScript &bull; SQL</p>
                <h3>FRONTEND</h3>
                <p>HTML &bull; CSS &bull; JavaScript &bull; Flutter</p>
                <h3>BACKEND</h3>
                <p>Python &bull; FastAPI &bull; Node.js &bull; Express.js &bull; REST APIs</p>
                <h3>DATABASES</h3>
                <p>PostgreSQL &bull; MongoDB &bull; Redis</p>
                <h3>AI &amp; EMERGING TECH</h3>
                <p>Generative AI &bull; Computer Vision &bull; Blockchain</p>
                <h3>TOOLS</h3>
                <p>Git &bull; GitHub &bull; Docker &bull; VS Code &bull; Figma &bull; Antigravity</p>
                <h3>DESIGN</h3>
                <p>UI/UX Design &bull; Responsive Design &bull; Prototyping &bull; Design Systems</p>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>FEATURED PROJECTS</h2>
                <h3>KARATCORE ERP</h3>
                <p>Comprehensive ERP platform for jewellery businesses and gold pledge-loan operations built with Flutter, FastAPI, PostgreSQL, Redis, and Docker.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar/Karatcore-ERP" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB: KARATCORE-ERP</span></a>
                <h3>MENTRA — AI STUDY COACH</h3>
                <p>AI-powered academic companion featuring attention monitoring, study assistants, and gamified productivity dashboards.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">VIEW ON GITHUB</span></a>
                <h3>MINI BLOCKCHAIN</h3>
                <p>Python-based distributed ledger implementation demonstrating cryptographic hashing (SHA-256), block validation, and Proof-of-Work consensus.</p>
                <a class="viewer-static-pill" href="https://github.com/amoghraikar/blockchain-project-1" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB: BLOCKCHAIN-PROJECT-1</span></a>
              </section>
              <section>
                <div class="viewer-contact-divider">–</div>
                <h2>LOCATION &amp; CONTACT</h2>
                <p>Bengaluru, Karnataka, India &bull; Open for software engineering roles &amp; tech collaborations.</p>
                <a class="viewer-static-pill" href="contact.html"><span class="viewer-static-pill-label">CONTACT ME</span></a>
              </section>`
          },
          CONTACT: {
            title: 'CONTACT',
            imageAlt: 'Contact Amogh R Raikar',
            imagePool: projectBySlug.get('mentra-ai')?.images || [],
            copy: `
              <div class="viewer-contact-details">
                <h2>AMOGH R RAIKAR</h2>
                <p>Software Developer &amp; Creative Technologist<br>Bengaluru, Karnataka, India</p>
                <div class="viewer-contact-divider">–</div>
                <h3>LOCATION</h3>
                <p>Bengaluru, Karnataka, India</p>
                <div class="viewer-contact-divider">–</div>
                <h3>EMAIL</h3>
                <p><a class="viewer-static-pill" href="mailto:amoghrraikar@gmail.com"><span class="viewer-static-pill-label">AMOGHRAIKAR@GMAIL.COM</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>GITHUB</h3>
                <p><a class="viewer-static-pill" href="https://github.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">GITHUB.COM/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>LINKEDIN</h3>
                <p><a class="viewer-static-pill" href="https://linkedin.com/in/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">LINKEDIN.COM/IN/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>X / TWITTER</h3>
                <p><a class="viewer-static-pill" href="https://x.com/amoghraikar" target="_blank" rel="noopener"><span class="viewer-static-pill-label">X.COM/AMOGHRAIKAR</span></a></p>
                <div class="viewer-contact-divider">–</div>
                <h3>CONNECT</h3>
                <p>Always open to exciting opportunities, innovative software projects, and tech conversations.</p>
              </div>`
          }
        }[section];
        if (!content) return;
        viewer.classList.add('open', 'static-page-open');
        viewer.classList.remove('menu-open', 'video-open');
        document.body.classList.add('viewer-open');
        document.body.classList.remove('viewer-menu-open');
        viewerStaticTitle.textContent = content.title;
        viewerStaticCopy.innerHTML = content.copy;
        revealStaticCopy(viewerStaticCopy, viewerStaticContent, viewerStaticPage);
        viewerStaticContent.scrollTop = 0;
        requestAnimationFrame(updateStaticContentFades);
        viewerStaticImage.alt = content.imageAlt;
        if (staticSlideshowTimer) { clearInterval(staticSlideshowTimer); staticSlideshowTimer = null; }
        if (staticImageMasker) { staticImageMasker.destroy(); staticImageMasker = null; }
        staticImageBusy = false;
        viewerStaticImage.onerror = null;
        viewerStaticImage.onload = null;
        viewerStaticImage.classList.remove('unavailable');
        const imagePool = content.imagePool || [];
        let staticImageIndex = 0;
        if (imagePool.length) {
          viewerStaticImage.src = imagePool[staticImageIndex];
          staticImageMasker = createGridFlipMasker(viewerStaticImage);
          staticSlideshowTimer = setInterval(() => {
            if (staticImageBusy || !viewer.classList.contains('static-page-open')) return;
            staticImageBusy = true;
            staticImageIndex = (staticImageIndex + 1) % imagePool.length;
            staticImageMasker.transitionTo(imagePool[staticImageIndex]).finally(() => {
              staticImageBusy = false;
            });
          }, 5000);
        } else {
          viewerStaticImage.removeAttribute('src');
          viewerStaticImage.classList.add('unavailable');
        }
        updateViewerTabs(section);
      }

      async function openStaticPageWithSweep(section) {
        const uiElements = [
          viewer.querySelector('.viewer-logo'),
          viewerTabs,
          viewerClose
        ];
        const mobileTopbarElements = [mobileStaticLogo, mobileStaticClose].filter(Boolean);
        [...uiElements, ...mobileTopbarElements].forEach(element => { element.style.opacity = '0'; });
        viewer.classList.add('open', 'static-page-open');
        document.body.classList.add('viewer-open');
        const sweep = document.createElement('div');
        sweep.className = 'viewer-menu-opening-sweep';
        viewer.appendChild(sweep);
        const sweepAnimation = sweep.animate([
          { transform: 'scaleY(0)' },
          { transform: 'scaleY(1)' }
        ], {
          duration: 460,
          easing: 'cubic-bezier(.65, 0, .35, 1)',
          fill: 'forwards'
        });
        await sweepAnimation.finished.catch(() => {});
        openStaticPage(section);
        const contentElements = [viewerStaticTitle, viewerStaticImage];
        const reveals = [...uiElements, ...mobileTopbarElements, ...contentElements].map((element, index) => element.animate([
          { opacity: 0, transform: 'translateY(-26px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 520,
          delay: 35 + index * 72,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both'
        }));
        sweep.remove();
        await Promise.all(reveals.map(animation => animation.finished.catch(() => {})));
        reveals.forEach(animation => animation.cancel());
        uiElements.forEach(element => { element.style.opacity = ''; });
        mobileTopbarElements.forEach(element => { element.style.opacity = '1'; });
      }

      async function closeStaticPageWithStagger(destination = 'index.html') {
        if (viewerTransitioning) return;
        viewerTransitioning = true;
        const elements = [
          ...viewerStaticCopy.querySelectorAll('section, p, h2, h3, .viewer-static-pill'),
          viewerStaticImage,
          viewerStaticTitle,
          viewer.querySelector('.viewer-logo'),
          viewerTabs,
          viewerClose
        ].filter(Boolean);
        const exits = elements.map((element, index) => element.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-22px)' }
        ], {
          duration: 360,
          delay: index * 24,
          easing: 'cubic-bezier(.55, 0, 1, .45)',
          fill: 'forwards'
        }));
        await Promise.all(exits.map(animation => animation.finished.catch(() => {})));
        location.href = destination;
      }

      mobileSectionNav?.addEventListener('click', event => {
        const link = event.target.closest('a[href]');
        if (!link || link.classList.contains('active')) return;
        if (!matchMedia(mobileLayoutQuery).matches) return;
        event.preventDefault();
        const destination = link.getAttribute('href');
        if (/^\/?labz\/?(?:index\.html)?$/i.test(destination)) {
          navigateFromHome(destination);
          return;
        }
        closeStaticPageWithStagger(destination);
      });
      mobileStaticClose?.addEventListener('click', () => closeStaticPageWithStagger('index.html'));

      function syncMobileSectionNavigation() {
        if (!mobileSectionNav || !matchMedia(mobileLayoutQuery).matches) return;
        const activeFile = pageSection.toLowerCase() + '.html';
        const links = [...mobileSectionNav.querySelectorAll('a[href]')];
        links.forEach(link => {
          const selected = link.getAttribute('href') === activeFile;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
        const activeLink = links.find(link => link.classList.contains('active'));
        requestAnimationFrame(() => activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }));
      }

      let mobileSectionNavStretchFrame = 0;
      function updateMobileSectionNavStretch() {
        mobileSectionNavStretchFrame = 0;
        if (!mobileSectionNav || !matchMedia(mobileLayoutQuery).matches) return;
        const containerRect = mobileSectionNav.getBoundingClientRect();
        const pills = mobileSectionNav.querySelectorAll('.mobile-section-pill');
        pills.forEach(pill => {
          const rect = pill.getBoundingClientRect();
          const width = rect.width || 1;
          let clipped = 0;
          let origin = '';
          if (rect.left < containerRect.left) {
            clipped = Math.min(1, (containerRect.left - rect.left) / width);
            origin = 'left center';
          } else if (rect.right > containerRect.right) {
            clipped = Math.min(1, (rect.right - containerRect.right) / width);
            origin = 'right center';
          }
          pill.style.zIndex = String(Math.round((1 - clipped) * 100));
          if (clipped > .01) {
            const eased = clipped * clipped * (3 - 2 * clipped);
            const stretch = 1 + eased * .3;
            const squish = 1 - eased * .14;
            pill.style.transformOrigin = origin;
            pill.style.transform = `scaleX(${stretch.toFixed(3)}) scaleY(${squish.toFixed(3)})`;
          } else {
            pill.style.transform = '';
            pill.style.transformOrigin = '';
          }
        });
      }
      function scheduleMobileSectionNavStretch() {
        if (mobileSectionNavStretchFrame || !mobileSectionNav) return;
        mobileSectionNavStretchFrame = requestAnimationFrame(updateMobileSectionNavStretch);
      }
      mobileSectionNav?.addEventListener('scroll', scheduleMobileSectionNavStretch, { passive: true });
      window.addEventListener('resize', scheduleMobileSectionNavStretch);

      function getOverlayImageSize(image) {
        const naturalWidth = image.naturalWidth || 1;
        const naturalHeight = image.naturalHeight || 1;
        const fit = Math.min(
          1,
          (innerWidth - 112) / naturalWidth,
          (innerHeight - 125) / naturalHeight
        ) * .875;
        return {
          width: naturalWidth * fit,
          height: naturalHeight * fit
        };
      }

      function positionNextPreview() {
        if (!viewer.classList.contains('open') || viewer.classList.contains('menu-open')) return;
        const currentRect = viewerImage.getBoundingClientRect();
        const size = getOverlayImageSize(viewerNextImage);
        const left = Math.max(
          currentRect.right + 32,
          innerWidth - Math.min(size.width * .24, 220)
        );
        viewerNextImage.style.width = `${size.width}px`;
        viewerNextImage.style.height = `${size.height}px`;
        viewerNextImage.style.left = `${left}px`;
        viewerNextImage.style.top = '93px';
        viewerNextZone.style.left = `${left}px`;
        viewerNextZone.style.top = '93px';
        viewerNextZone.style.width = `${size.width}px`;
        viewerNextZone.style.height = `${size.height}px`;
        viewerNextZone.style.translate = '0 0';
      }

      async function positionNextCue() {
        if (!viewer.classList.contains('open') || !images.length || activeProject?.video) return;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
      }

      async function showNextPreview() {
        if (viewerTransitioning || nextImageTransitioning || viewer.classList.contains('menu-open')) return;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
        viewerNextImage.classList.add('peek');
      }

      function hideNextPreview() {
        if (!nextImageTransitioning) viewerNextImage.classList.remove('peek');
      }

      async function advanceViewerImage() {
        if (viewerTransitioning || nextImageTransitioning || viewer.classList.contains('menu-open')) return;
        nextImageTransitioning = true;
        const nextIndex = (viewerImageIndex + 1) % images.length;
        viewerNextImage.src = images[nextIndex];
        await viewerNextImage.decode?.().catch(() => {});
        positionNextPreview();
        viewerNextImage.classList.add('peek');
        const target = viewerImage.getBoundingClientRect();
        const preview = viewerNextImage.getBoundingClientRect();
        const nextLeft = (innerWidth - preview.width) / 2;
        const timing = { duration: 520, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' };
        const oldAnimation = viewerImage.animate([
          { transform: 'translateX(0)', opacity: 1 },
          { transform: `translateX(${-target.right - 48}px)`, opacity: 0 }
        ], timing);
        const newAnimation = viewerNextImage.animate([
          { left: `${preview.left}px`, top: `${preview.top}px`, opacity: .3 },
          { left: `${nextLeft}px`, top: '93px', opacity: 1 }
        ], timing);
        await Promise.all([oldAnimation.finished.catch(() => {}), newAnimation.finished.catch(() => {})]);
        viewerImageIndex = nextIndex;
        viewerImage.alt = `${seoTitleCase(activeProject.title)}, image ${nextIndex + 1} of ${images.length}`;
        if (/^https?:/i.test(images[viewerImageIndex])) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.src = images[viewerImageIndex];
        await viewerImage.decode?.().catch(() => {});
        oldAnimation.cancel();
        newAnimation.cancel();
        viewerNextImage.classList.remove('peek');
        nextImageTransitioning = false;
        await positionNextCue();
      }

      function openViewer(src, sourceIndex = images.findIndex(item => src.endsWith(item) || src === item)) {
        if (viewerTransitioning) return;
        cancelIdleImage();
        viewerTransitioning = true;
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        viewerImageIndex = sourceIndex >= 0 ? sourceIndex : 0;
        closeViewerMenu();
        updateViewerTabs(activeProject.category);
        updateViewerBreadcrumb();
        if (/^https?:/i.test(src)) viewerImage.crossOrigin = 'anonymous';
        else viewerImage.removeAttribute('crossorigin');
        viewerImage.onload = async () => {
          viewerImage.onload = null;
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          renderViewerThumbnails();
          viewer.focus({ preventScroll: true });
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          await positionNextCue();
          if (document.fonts && document.fonts.load) {
            await document.fonts.load(`${asciiFontSize}px EurostileMNExtendedBold`).catch(() => {});
          }
          configureMask();
          await animateMask('reveal');
          viewerTransitioning = false;
          scheduleViewerInfoHint();
        };
        viewerImage.src = src;
      }

      async function closeViewer() {
        if (viewerTransitioning || menuCategoryTransitioning || !viewer.classList.contains('open')) return;
        viewerTransitioning = true;
        if (viewerInfoOpen) await closeViewerInfoCard();
        resetViewerInfoCard();
        clearViewerFluidPull();
        configureMask();
        await animateMask('cover');
        viewer.classList.remove('open');
        viewer.classList.remove('menu-open');
        viewer.classList.remove('video-open', 'static-page-open');
        document.body.classList.remove('viewer-open');
        document.body.classList.remove('viewer-menu-open');
        document.body.classList.remove('thumbnail-hover');
        document.body.classList.remove('viewer-tab-hover');
        clearImageNavigationCursor();
        asciiMask.style.opacity = '0';
        viewerImage.removeAttribute('src');
        viewerVideo.removeAttribute('src');
        viewerNextImage.removeAttribute('src');
        viewerNextImage.classList.remove('peek');
        viewerMenuPreview.classList.remove('visible');
        clearTimeout(cursorCountTimer);
        cursorActionCount.classList.remove('visible');
        cursorActionLabel.textContent = 'MENU';
        viewerTransitioning = false;
      }

      function cancelIdleImage() {
        window.clearTimeout(trailIdleTimer);
        trailIdleTimer = 0;
        document.body.classList.remove('trail-action');
        document.querySelectorAll('.trail-image.idle-focus').forEach(image => {
          image.classList.remove('idle-focus');
        });
      }

      function scheduleIdleImage(x, y) {
        if (awwwardsHoverActive) return;
        window.clearTimeout(trailIdleTimer);
        trailIdleTimer = window.setTimeout(() => {
          if (awwwardsHoverActive || viewer.classList.contains('open') || pillDragActive) return;
          if (!latestTrailImage?.isConnected) addTrailImage(x, y);
          latestTrailImage.style.zIndex = String(++topLayer);
          latestTrailImage.classList.add('idle-focus');
          document.body.classList.add('trail-action');
        }, 500);
      }

      function addTrailImage(x, y, failedAttempts = 0) {
        if (awwwardsHoverActive) return;
        const image = document.createElement('img');
        const trailItem = homeTrailItems[imageIndex++ % homeTrailItems.length];
        const assignedIndex = trailItem.imageIndex;
        image.className = 'trail-image';
        image.alt = '';
        image.style.left = x + 'px';
        image.style.top = y + 'px';
        image.style.visibility = 'hidden';
        image.style.zIndex = String(++topLayer);
        image.style.setProperty('--rotation', ((Math.random() * 10) - 5).toFixed(2) + 'deg');
        image.draggable = false;
        latestTrailImage = image;

        image.addEventListener('load', () => {
          image.style.visibility = 'visible';
        }, { once: true });
        image.addEventListener('error', () => {
          image.remove();
          if (latestTrailImage === image) latestTrailImage = null;
          console.warn('[Tokonoma trail] Skipped missing image:', trailItem.src);
          if (failedAttempts < homeTrailItems.length - 1) {
            addTrailImage(x, y, failedAttempts + 1);
          }
        }, { once: true });

        image.addEventListener('click', event => {
          event.stopPropagation();
          if (suppressPhotoClicks) {
            event.preventDefault();
            return;
          }
          setActiveProject(trailItem.project);
          openViewer(image.src, assignedIndex);
        });
        image.addEventListener('animationend', () => image.remove());
        area.appendChild(image);
        image.src = trailItem.src;
      }

      area.addEventListener('pointermove', event => {
        if (awwwardsHoverActive || pillDragActive || viewer.classList.contains('open') || event.pointerType === 'touch') return;

        // Newsletter pulse protected zone: never spawn cursor-trail images in the
        // top-right 200 × 100 px desktop area.
        if (event.clientX >= window.innerWidth - 200 && event.clientY <= 100) {
          cancelIdleImage();
          document.body.classList.remove('trail-cursor');
          previousX = -999;
          previousY = -999;
          return;
        }

        document.body.classList.add('trail-cursor');
        cancelIdleImage();
        const rect = area.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        lastTrailX = x;
        lastTrailY = y;
        scheduleIdleImage(lastTrailX, lastTrailY);
        const distance = Math.hypot(x - previousX, y - previousY);
        if (distance < minimumDistance) return;
        previousX = x;
        previousY = y;
        addTrailImage(x, y);
      });

      area.addEventListener('pointerleave', () => {
        cancelIdleImage();
        document.body.classList.remove('trail-cursor');
        previousX = -999;
        previousY = -999;
      });

      area.addEventListener('click', event => {
        if (suppressPhotoClicks) {
          event.preventDefault();
          return;
        }
        if (event.pointerType !== 'mouse') {
          const rect = area.getBoundingClientRect();
          addTrailImage(event.clientX - rect.left, event.clientY - rect.top);
        }
      });

      viewer.addEventListener('click', event => {
        if (event.target.closest('.viewer-close, .viewer-logo, .viewer-tab, .viewer-next-zone, .viewer-thumbnails, .viewer-info-link')) return;
        if (viewer.classList.contains('static-page-open')) return;
        if (menuCategoryTransitioning) return;
        if (viewerInfoOpen) {
          closeViewerInfoCard();
          return;
        }
        if (viewerInfoFlipping) return;
        if (document.body.classList.contains('image-nav-left')) {
          selectViewerImage((viewerImageIndex - 1 + images.length) % images.length);
          return;
        }
        if (document.body.classList.contains('image-nav-right')) {
          selectViewerImage((viewerImageIndex + 1) % images.length);
          return;
        }
        if (viewer.classList.contains('menu-open')) {
          closeViewerMenu();
          scheduleViewerInfoHint();
        } else {
          openViewerMenuWithSweep(activeProject?.category || activeViewerSection);
        }
      });
      viewerStaticCopy.addEventListener('click', event => {
        const link = event.target.closest('.viewer-static-pill');
        if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.protocol === 'mailto:' || link.target === '_blank') return;
        event.preventDefault();
        event.stopPropagation();
        closeStaticPageWithStagger(link.href);
      });
      viewerClose.addEventListener('click', event => {
        event.stopPropagation();
        playUiSound(closeTextSound);
        if (viewer.classList.contains('static-page-open')) {
          closeStaticPageWithStagger('index.html');
          return;
        }
        if (pageSection !== 'HOME' && (viewer.classList.contains('menu-open') || viewer.classList.contains('static-page-open'))) {
          location.href = 'index.html';
          return;
        }
        if (projectCatalog[pageSection] && !viewer.classList.contains('menu-open')) {
          viewer.classList.remove('video-open', 'static-page-open');
          viewerVideo.removeAttribute('src');
          openViewerMenuWithSweep(pageSection);
          return;
        }
        closeViewer();
      });
      viewerTabs.addEventListener('click', async event => {
        const tab = event.target.closest('.viewer-tab');
        if (!tab) return;
        event.stopPropagation();
        const section = tab.dataset.section;
        if (section === 'LABZ') {
          navigateFromHome('labz/');
          return;
        }
        if (section === 'ABOUT' || section === 'CONTACT') {
          location.href = `${section.toLowerCase()}.html`;
          return;
        }
        if (viewerInfoFlipping) return;
        if (viewerInfoOpen) await closeViewerInfoCard();
        resetViewerInfoCard();
        viewer.classList.remove('video-open', 'static-page-open');
        viewerVideo.removeAttribute('src');
        if (viewer.classList.contains('menu-open')) transitionViewerMenu(section);
        else openViewerMenuWithSweep(section);
      });
      viewerTabs.querySelectorAll('.viewer-tab').forEach(tab => {
        tab.addEventListener('pointerenter', () => document.body.classList.add('viewer-tab-hover'));
        tab.addEventListener('pointerleave', () => document.body.classList.remove('viewer-tab-hover'));
      });
      document.querySelector('.viewer-logo').addEventListener('pointerenter', () => document.body.classList.add('viewer-tab-hover'));
      document.querySelector('.viewer-logo').addEventListener('pointerleave', () => document.body.classList.remove('viewer-tab-hover'));
      viewerNextZone.addEventListener('pointerenter', showNextPreview);
      viewerNextZone.addEventListener('pointerleave', hideNextPreview);
      viewerNextZone.addEventListener('click', event => {
        event.stopPropagation();
        advanceViewerImage();
      });
      viewerMenu.addEventListener('scroll', () => {
        syncMenuScrollCue();
        if (!menuScrollHoverFrame) menuScrollHoverFrame = requestAnimationFrame(syncMenuHoverUnderCursor);
      }, { passive: true });
      viewerMenu.addEventListener('pointerleave', () => setMenuEntryActive(null));
      document.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        pointerClientX = event.clientX;
        pointerClientY = event.clientY;
        syncOverlayPointerState(event.clientX, event.clientY, event.target);
        if (viewer.classList.contains('menu-open') && !menuScrollHoverFrame) {
          menuScrollHoverFrame = requestAnimationFrame(syncMenuHoverUnderCursor);
        }
        cursorAction.style.left = event.clientX + 'px';
        cursorAction.style.top = event.clientY + 'px';
        updateCursorPillPosition(event.clientX, event.clientY);
      });
      window.addEventListener('popstate', event => {
        const state = event.state;
        if (!state) { location.reload(); return; }
        if (state.project) {
          const project = projectBySlug.get(state.project);
          if (!project) { location.reload(); return; }
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          viewer.classList.remove('menu-open', 'static-page-open', 'video-open');
          viewerVideo.removeAttribute('src');
          setActiveProject(project);
          applyProjectSeo(project);
          return;
        }
        if (state.page && state.page !== 'home' && projectCatalog[state.page.toUpperCase()]) {
          const section = state.page.toUpperCase();
          viewer.classList.add('open');
          document.body.classList.add('viewer-open');
          viewer.classList.remove('static-page-open', 'video-open');
          viewerVideo.removeAttribute('src');
          openViewerMenu(section);
          applyPageSeo(section);
          return;
        }
        closeViewer();
      });
      document.addEventListener('keydown', event => {
        if (!viewer.classList.contains('open')) return;
        if (event.key === 'Escape') {
          if (viewer.classList.contains('static-page-open')) {
            closeStaticPageWithStagger('index.html');
            return;
          }
          closeViewer();
          return;
        }
        if (event.key.toLowerCase() === 'i' && !viewer.classList.contains('menu-open') && !viewerInfoOpen) {
          event.preventDefault();
          if (viewerInfoFlipping) return;
          openViewerInfoCard();
          return;
        }
        if (event.key.toLowerCase() === 'x' && viewerInfoOpen) {
          event.preventDefault();
          if (viewerInfoFlipping) return;
          closeViewerInfoCard();
          return;
        }
        if (viewerInfoOpen || viewerInfoFlipping) return;
        if (viewer.classList.contains('menu-open') || viewerTransitioning || nextImageTransitioning) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          selectViewerImage((viewerImageIndex - 1 + images.length) % images.length);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          selectViewerImage((viewerImageIndex + 1) % images.length);
        }
      });
      window.addEventListener('resize', () => {
        viewerNextImage.classList.remove('peek');
        updateThumbnailRailLayout();
        if (viewerInfoOpen || viewerInfoFlipping || viewer.classList.contains('info-hint')) {
          positionViewerInfoElements();
        }
        requestAnimationFrame(positionNextCue);
      });

      function bootPage() {
        syncMobileSectionNavigation();
        requestAnimationFrame(updateMobileSectionNavStretch);
        applyPageSeo(pageSection);
        if (pageSection === 'ABOUT' || pageSection === 'CONTACT') {
          openStaticPageWithSweep(pageSection);
          return;
        }
        if (!projectCatalog[pageSection]) return;
        viewer.classList.add('open');
        document.body.classList.add('viewer-open');
        const requestedSlug = new URLSearchParams(location.search).get('project');
        const requestedProject = requestedSlug && projectBySlug.get(requestedSlug);
        if (!requestedProject || requestedProject.category !== pageSection) {
          openViewerMenuWithSweep(pageSection);
          return;
        }
        setActiveProject(requestedProject);
        if (requestedProject.video && !Number.isInteger(requestedProject.videoIndex)) {
          viewer.classList.add('video-open');
          viewerVideo.src = resolveVideoEmbedUrl(requestedProject.video);
          updateViewerBreadcrumb();
          return;
        }
        viewer.classList.remove('open');
        document.body.classList.remove('viewer-open');
        openViewer(images[0], 0);
      }

      bootPage();
    
  }

  load().catch(error => console.error('[Tokonoma]', error));
})();
