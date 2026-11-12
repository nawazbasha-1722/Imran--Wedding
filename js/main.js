/**
 * Main Application Script for Imran & Saniya's Royal Islamic Wedding Invitation
 * Features: 3D Envelope Opening, Live IST Countdown,
 * Dua Guestbook, Calendar Integration, WhatsApp Share.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CINEMATIC INTRO & 3D ENVELOPE OPENING
  // ==========================================
  const cinematicIntro = document.getElementById('cinematicIntro');
  const btnOpenInvitation = document.getElementById('btnOpenInvitation');
  const waxSeal = document.getElementById('waxSeal');

  function openInvitation() {
    if (!cinematicIntro || cinematicIntro.classList.contains('revealed')) return;

    // Trigger visual opening effects
    if (waxSeal) {
      waxSeal.style.transform = 'scale(0.85) rotate(-15deg)';
      waxSeal.style.opacity = '0';
      waxSeal.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    setTimeout(() => {
      cinematicIntro.classList.add('revealed');
      document.body.style.overflow = 'auto';

      // Trigger hero entrance reveals
      triggerScrollReveals();
    }, 600);
  }

  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener('click', openInvitation);
  }
  if (waxSeal) {
    waxSeal.addEventListener('click', openInvitation);
  }

  // ==========================================
  // 0. DYNAMIC ADMIN DATA SYNCHRONIZATION
  // ==========================================
  let targetDateIST = new Date('2026-12-13T22:00:00+05:30').getTime();

  function applyAdminData() {
    let adminData = null;
    try {
      const stored = localStorage.getItem('weddingSiteData');
      if (stored) adminData = JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read weddingSiteData:', e);
    }

    if (!adminData) return;

    // 1. Couple Names & Tagline
    const groom = adminData.groomName || 'Shaik Imran';
    const bride = adminData.brideName || 'Shaik Saniya';
    const tagline = adminData.tagline || 'Two hearts, one beautiful journey.';

    // Title & Meta
    document.title = `Wedding Invitation | ${groom} & ${bride}`;

    // Intro Overlay Names
    const introNames = document.querySelector('.intro-royal-names');
    if (introNames) {
      introNames.innerHTML = `${escapeHTML(groom)} <span class="ampersand">&amp;</span> ${escapeHTML(bride)}`;
    }

    // Hero Section Names
    const heroGroom = document.querySelector('.hero-groom-name');
    if (heroGroom) heroGroom.textContent = groom.toUpperCase();
    const heroBride = document.querySelector('.hero-bride-name');
    if (heroBride) heroBride.textContent = bride.toUpperCase();
    const heroQuote = document.querySelector('.hero-quote');
    if (heroQuote) heroQuote.textContent = `“${tagline}”`;

    // Brand Monogram & Title in Nav
    const brandMonogram = document.querySelector('.brand-monogram');
    if (brandMonogram) {
      const gInitial = groom.trim().split(' ').pop().charAt(0) || 'I';
      const bInitial = bride.trim().split(' ').pop().charAt(0) || 'S';
      brandMonogram.textContent = `${gInitial}${bInitial}`;
    }
    const brandNameText = document.querySelector('.brand-name-text');
    if (brandNameText) brandNameText.textContent = `${groom} & ${bride}`;

    // Royal Scroll Decree
    const parchmentCoupleNames = document.querySelector('.parchment-couple-names');
    if (parchmentCoupleNames) {
      parchmentCoupleNames.innerHTML = `${escapeHTML(groom.toUpperCase())} <span class="parchment-names-amp">&amp;</span> ${escapeHTML(bride.toUpperCase())}`;
    }
    if (adminData.decreeParchment) {
      const decreeBody = document.querySelector('.parchment-text-body');
      if (decreeBody) decreeBody.textContent = adminData.decreeParchment;
    }

    // Blessing Family Names & Footer
    const blessingFamily = document.querySelector('.blessing-family-names');
    if (blessingFamily) blessingFamily.textContent = `${groom}, ${bride} & Family`;
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      footerCopy.innerHTML = `${escapeHTML(groom)} &amp; ${escapeHTML(bride)} • Royal Islamic Wedding Celebration • 13 – 14 December 2026<br>${escapeHTML(adminData.addressLine1 || 'Kangala Village')}, ${escapeHTML(adminData.addressLine2 || 'Bapatla District')}, ${escapeHTML(adminData.addressLine3 || 'Andhra Pradesh')}.`;
    }

    // 2. Haldi Ceremony (Event 01)
    const eventCards = document.querySelectorAll('.event-card');
    if (eventCards.length >= 1) {
      const haldiCard = eventCards[0];
      const detailsList = haldiCard.querySelectorAll('.event-detail-item .event-detail-text');
      if (detailsList.length >= 3) {
        if (adminData.haldiDate) detailsList[0].innerHTML = `<strong>${escapeHTML(adminData.haldiDate)}</strong>`;
        if (adminData.haldiTime) detailsList[1].innerHTML = `<strong>${escapeHTML(adminData.haldiTime)}</strong>`;
        if (adminData.haldiVenue) detailsList[2].textContent = adminData.haldiVenue;
      }
      if (adminData.haldiDesc) {
        const descEl = haldiCard.querySelector('.event-description');
        if (descEl) descEl.textContent = adminData.haldiDesc;
      }
      if (adminData.photos && adminData.photos.haldi) {
        const haldiImg = haldiCard.querySelector('.event-card-img');
        if (haldiImg) haldiImg.src = adminData.photos.haldi;
      }
    }

    // 3. Nikah Ceremony (Event 02)
    if (eventCards.length >= 2) {
      const nikahCard = eventCards[1];
      const detailsList = nikahCard.querySelectorAll('.event-detail-item .event-detail-text');
      if (detailsList.length >= 3) {
        if (adminData.nikahDate) detailsList[0].innerHTML = `<strong>${escapeHTML(adminData.nikahDate)}</strong>`;
        if (adminData.nikahTime) detailsList[1].innerHTML = `<strong>${escapeHTML(adminData.nikahTime)}</strong>`;
        if (adminData.nikahVenue) detailsList[2].textContent = adminData.nikahVenue;
      }
      if (adminData.nikahDesc) {
        const descEl = nikahCard.querySelector('.event-description');
        if (descEl) descEl.textContent = adminData.nikahDesc;
      }
      if (adminData.photos && adminData.photos.nikah) {
        const nikahImg = nikahCard.querySelector('.event-card-img');
        if (nikahImg) nikahImg.src = adminData.photos.nikah;
      }
    }

    // 4. Venue & Map Link
    if (adminData.venueTitle) {
      const resName = document.querySelector('.venue-residence-name');
      if (resName) resName.textContent = adminData.venueTitle;
    }
    const addressBlock = document.querySelector('.venue-address-block');
    if (addressBlock) {
      addressBlock.innerHTML = `
        <div class="venue-address-line"><strong>${escapeHTML(adminData.addressLine1 || 'Kangala Village')}</strong></div>
        <div class="venue-address-line">${escapeHTML(adminData.addressLine2 || 'Bapatla District')}</div>
        <div class="venue-address-line">${escapeHTML(adminData.addressLine3 || 'Andhra Pradesh, India.')}</div>
      `;
    }
    if (adminData.railwayStation) {
      const travelItems = document.querySelectorAll('.venue-travel-item span');
      if (travelItems.length >= 2) {
        travelItems[1].textContent = `Nearest Railway Station: ${adminData.railwayStation}`;
      }
    }
    if (adminData.mapsUrl) {
      const dirBtns = document.querySelectorAll('.btn-get-directions, a[href*="maps.app.goo.gl"]');
      dirBtns.forEach(btn => btn.setAttribute('href', adminData.mapsUrl));
    }

    // 5. Countdown Target
    if (adminData.targetISO) {
      const parsed = new Date(adminData.targetISO).getTime();
      if (!isNaN(parsed) && parsed > 0) {
        targetDateIST = parsed;
      }
    }

    // 6. Surprise Secret Message
    if (adminData.surpriseMsg) {
      const noteBody = document.querySelector('.gift-note-body p');
      if (noteBody) noteBody.textContent = `“${adminData.surpriseMsg}”`;
    }

    // 7. Core Photos
    if (adminData.photos) {
      if (adminData.photos.hero) {
        const heroImg = document.querySelector('.hero-portrait-image');
        if (heroImg) heroImg.src = adminData.photos.hero;
      }
    }

    // 8. Memories Album Gallery
    if (adminData.memoriesAlbum) {
      const isUnlocked = Boolean(adminData.memoriesAlbum.unlocked);
      const pill = document.querySelector('.memories-status-pill');
      if (pill) {
        pill.textContent = isUnlocked ? '✦ OFFICIAL WEDDING ALBUM • LIVE ✦' : '✦ POST-WEDDING DIGITAL ALBUM ✦';
      }

      if (adminData.memoriesAlbum.items && adminData.memoriesAlbum.items.length > 0) {
        const grid = document.querySelector('.memories-grid');
        if (grid) {
          grid.innerHTML = '';
          adminData.memoriesAlbum.items.forEach(item => {
            const art = document.createElement('article');
            art.className = 'memory-album-card';
            art.setAttribute('data-category', item.category || 'all');
            art.innerHTML = `
              <div class="memory-card-cover">
                <img src="${item.img}" alt="${escapeHTML(item.title)}" onerror="this.src='assets/images/haldi-ceremony.jpg'">
                <div class="memory-card-overlay"></div>
                <span class="memory-card-tag">${escapeHTML(item.date || '')}</span>
              </div>
              <div class="memory-card-body">
                <h3 class="memory-card-title">${escapeHTML(item.title)}</h3>
                <p class="memory-card-desc">${escapeHTML(item.desc || '')}</p>
                <div class="memory-card-meta">
                  <span>${escapeHTML(item.category ? item.category.toUpperCase() : 'ALBUM')}</span>
                  <span style="color: ${isUnlocked ? '#2ecc71' : 'var(--color-gold-light)'};">
                    ${isUnlocked ? '✦ View Photo' : 'Unlocks Post-Event'}
                  </span>
                </div>
              </div>
            `;
            grid.appendChild(art);
          });
        }
      }
    }
  }

  // Run dynamic admin hydration immediately
  applyAdminData();

  // Admin Desk Shortcut: Ctrl+Shift+A
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.open('admin.html', '_blank');
    }
  });

  // ==========================================
  // 2. LUXURY GOLDEN FLIP CLOCK COUNTDOWN (IST)
  // Target: 13 December 2026, 10:00 PM IST (UTC+05:30)
  // ==========================================

  const flipClockContainer = document.querySelector('.flip-clock-container');
  const celebrationMessage = document.getElementById('celebrationMessage');

  let previousValues = { days: '', hours: '', mins: '', secs: '' };
  let isFirstCountdownLoad = true;

  function updateFlipCard(unitId, newValue, isInitial = false) {
    const unit = document.getElementById(unitId);
    if (!unit) return;

    const topNumber = unit.querySelector('.flip-panel-top .flip-number');
    const bottomNumber = unit.querySelector('.flip-panel-bottom .flip-number');
    const leafFrontNumber = unit.querySelector('.flip-leaf-front .flip-number');
    const leafBackNumber = unit.querySelector('.flip-leaf-back .flip-number');
    const card = unit.querySelector('.flip-card');

    if (!topNumber || !bottomNumber || !leafFrontNumber || !leafBackNumber || !card) return;

    if (isInitial) {
      topNumber.textContent = newValue;
      bottomNumber.textContent = newValue;
      leafFrontNumber.textContent = newValue;
      leafBackNumber.textContent = newValue;
      return;
    }

    const currentVal = topNumber.textContent;
    if (currentVal === newValue) return;

    // Authentic split-flap choreography:
    // 1. Falling front leaf carries the old top number down
    leafFrontNumber.textContent = currentVal;
    // 2. Unfolding back leaf carries the new bottom number down
    leafBackNumber.textContent = newValue;
    // 3. Static top panel reveals the new top number immediately behind the falling leaf
    topNumber.textContent = newValue;
    // 4. Static bottom panel remains showing the old value until covered by the falling leaf
    bottomNumber.textContent = currentVal;

    // Trigger 3D flip animation
    card.classList.remove('flip-animating');
    void card.offsetWidth; // Force CSS repaint
    card.classList.add('flip-animating');

    setTimeout(() => {
      bottomNumber.textContent = newValue;
      card.classList.remove('flip-animating');
    }, 550);
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDateIST - now;

    if (difference <= 0) {
      if (flipClockContainer) flipClockContainer.style.display = 'none';
      if (celebrationMessage) celebrationMessage.classList.add('active');
      return;
    }

    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');

    if (isFirstCountdownLoad) {
      updateFlipCard('flipDays', days, true);
      updateFlipCard('flipHours', hours, true);
      updateFlipCard('flipMins', minutes, true);
      updateFlipCard('flipSecs', seconds, true);
      previousValues = { days, hours, mins: minutes, secs: seconds };
      isFirstCountdownLoad = false;
      return;
    }

    if (days !== previousValues.days) {
      updateFlipCard('flipDays', days);
      previousValues.days = days;
    }
    if (hours !== previousValues.hours) {
      updateFlipCard('flipHours', hours);
      previousValues.hours = hours;
    }
    if (minutes !== previousValues.mins) {
      updateFlipCard('flipMins', minutes);
      previousValues.mins = minutes;
    }
    if (seconds !== previousValues.secs) {
      updateFlipCard('flipSecs', seconds);
      previousValues.secs = seconds;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 4. ADD TO CALENDAR FUNCTIONALITY
  // ==========================================
  window.addToGoogleCalendar = function (eventType) {
    let title, details, location, startTime, endTime;

    if (eventType === 'haldi') {
      title = 'Haldi Ceremony - Shaik Imran & Shaik Saniya';
      details = 'Join us for the Haldi & Mayun ceremony of Shaik Imran and Shaik Saniya.';
      location = 'At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India';
      // 13 Dec 2026 22:00 IST to 14 Dec 2026 01:00 IST
      // UTC equivalent: 20261213T163000Z / 20261213T193000Z
      startTime = '20261213T163000Z';
      endTime = '20261213T193000Z';
    } else {
      title = 'Nikah Ceremony - Shaik Imran & Shaik Saniya';
      details = 'Join us for the auspicious Nikah wedding ceremony of Shaik Imran and Shaik Saniya.';
      location = 'At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India';
      // 14 Dec 2026 09:00 IST to 14 Dec 2026 14:00 IST
      // UTC equivalent: 20261214T033000Z / 20261214T083000Z
      startTime = '20261214T033000Z';
      endTime = '20261214T083000Z';
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  window.downloadICalFile = function (eventType) {
    let title, details, location, dtStart, dtEnd, filename;

    if (eventType === 'haldi') {
      title = 'Haldi Ceremony - Shaik Imran & Shaik Saniya';
      details = 'Haldi & Mayun celebration of Shaik Imran & Shaik Saniya';
      location = 'At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India';
      dtStart = '20261213T163000Z';
      dtEnd = '20261213T193000Z';
      filename = 'imran-saniya-haldi.ics';
    } else {
      title = 'Nikah Ceremony - Shaik Imran & Shaik Saniya';
      details = 'Nikah wedding ceremony of Shaik Imran & Shaik Saniya';
      location = 'At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India';
      dtStart = '20261214T033000Z';
      dtEnd = '20261214T083000Z';
      filename = 'imran-saniya-nikah.ics';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Royal Islamic Wedding Invitation//Shaik Imran & Shaik Saniya//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar event downloaded!');
  };

  // ==========================================
  // 5. STICKY NAV & MOBILE MENU
  // ==========================================
  const mainNav = document.getElementById('mainNav');
  const btnMobileToggle = document.getElementById('btnMobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (btnMobileToggle && mobileMenu) {
    btnMobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });

  // Back to top action
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================
  function triggerScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  triggerScrollReveals();

  // ==========================================
  // UNROLLING WEDDING SCROLL (ROYAL PARCHMENT)
  // ==========================================
  const royalParchment = document.getElementById('royalParchment');
  const btnToggleScroll = document.getElementById('btnToggleScroll');

  window.toggleRoyalScroll = function () {
    if (!royalParchment) return;
    if (royalParchment.classList.contains('rolled')) {
      royalParchment.classList.remove('rolled');
      royalParchment.classList.add('unrolled');
      if (btnToggleScroll) {
        btnToggleScroll.innerHTML = `<span>Roll Up Decree</span><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;
      }
      showToast('✦ Royal Nikah Scroll Unfurled ✦');
    } else {
      royalParchment.classList.add('rolled');
      royalParchment.classList.remove('unrolled');
      if (btnToggleScroll) {
        btnToggleScroll.innerHTML = `<span>Unfurl Royal Scroll</span><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;
      }
    }
  };

  if (btnToggleScroll) {
    btnToggleScroll.addEventListener('click', toggleRoyalScroll);
  }

  // Auto unfurl when scrolling into royal scroll section
  const scrollSection = document.getElementById('royalScroll');
  if (scrollSection && royalParchment) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && royalParchment.classList.contains('rolled')) {
          toggleRoyalScroll();
        }
      });
    }, { threshold: 0.25 });
    scrollObserver.observe(scrollSection);
  }

  // ==========================================
  // TAP TO REVEAL A SURPRISE (GLOWING GIFT BOX)
  // ==========================================
  const giftBox = document.getElementById('giftBox');
  const giftRevealedCard = document.getElementById('giftRevealedCard');
  const giftStage = document.getElementById('giftStage');
  const giftTapPrompt = document.getElementById('giftTapPrompt');

  window.openGiftSurprise = function () {
    if (!giftRevealedCard || !giftStage) return;
    giftStage.classList.add('gift-opened');
    giftRevealedCard.classList.add('active');
    if (giftTapPrompt) {
      giftTapPrompt.textContent = "✦ A Heartfelt Note For You ✦";
    }
    showToast('✨ "Your presence is the greatest gift we could ask for."');
  };

  if (giftBox) {
    giftBox.addEventListener('click', openGiftSurprise);
  }

  window.blessWithAmeen = function () {
    showToast('🤲 Ameen! May Allah accept your prayers and shower you with goodness.');
  };

  // ==========================================
  // WEDDING MEMORIES GALLERY (POST-WEDDING ALBUM)
  // ==========================================
  window.filterMemoriesTab = function (category, tabBtn) {
    document.querySelectorAll('.btn-memories-tab').forEach((b) => b.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');

    const cards = document.querySelectorAll('.memory-album-card');
    cards.forEach((card) => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'block';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  };

  window.remindMemories = function () {
    try {
      localStorage.setItem('imran_saniya_memories_reminder', 'true');
    } catch (e) {}
    showToast('✦ Reminder Registered! Revisit after 14 Dec 2026 for the full album.');
  };

  window.openPhotoUploadPrompt = function () {
    showToast('📷 Guest photo submission portal opens on 13 Dec 2026!');
  };

  // ==========================================
  // 7. DUA & WISHES GUESTBOOK (Local Persistence)
  // ==========================================
  const duaForm = document.getElementById('duaForm');
  const duasContainer = document.getElementById('duasCardsGrid');

  const defaultDuas = [
    {
      name: 'Uncle Rashid & Family',
      relation: 'Groom\'s Family',
      message: 'Barakallahu lakuma wa baraka alaykuma wa jama\'a baynakuma fee khayr! May Allah bless Imran & Saniya with infinite joy, understanding, and eternal love on this sacred journey.'
    },
    {
      name: 'Aunt Yasmeen & Uncle Farooq',
      relation: 'Bride\'s Family',
      message: 'Dearest Saniya and Imran, our heart overflows with happiness seeing you both unite in the grace of Allah. May your home always be filled with peace (sakeenah) and warm laughter.'
    },
    {
      name: 'Zameer & Friends',
      relation: 'Childhood Friends',
      message: 'Heartiest congratulations to Imran bhai and Saniya bhabhi! May your marriage be as beautiful, inspiring, and enduring as royal Islamic history.'
    }
  ];

  function loadDuas() {
    let savedDuas = [];
    try {
      const stored = localStorage.getItem('imran_saniya_wedding_duas');
      savedDuas = stored ? JSON.parse(stored) : defaultDuas;
    } catch (e) {
      savedDuas = defaultDuas;
    }

    renderDuas(savedDuas);
  }

  function renderDuas(duasList) {
    if (!duasContainer) return;
    duasContainer.innerHTML = '';

    duasList.forEach((dua) => {
      const card = document.createElement('div');
      card.className = 'dua-card reveal-on-scroll revealed';
      card.innerHTML = `
        <p class="dua-card-quote">“${escapeHTML(dua.message)}”</p>
        <div class="dua-card-footer">
          <div>
            <div class="dua-author-name">${escapeHTML(dua.name)}</div>
            <div class="dua-author-relation">${escapeHTML(dua.relation || 'Well Wisher')}</div>
          </div>
          <span class="dua-card-star">✦</span>
        </div>
      `;
      duasContainer.appendChild(card);
    });
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (duaForm) {
    duaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('duaSenderName');
      const relationInput = document.getElementById('duaSenderRelation');
      const messageInput = document.getElementById('duaSenderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const relation = relationInput ? relationInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !message) {
        showToast('Please enter your name and heartfelt blessing.');
        return;
      }

      const newDua = {
        name,
        relation: relation || 'Beloved Guest',
        message
      };

      let existingDuas = [];
      try {
        const stored = localStorage.getItem('imran_saniya_wedding_duas');
        existingDuas = stored ? JSON.parse(stored) : defaultDuas;
      } catch (e) {
        existingDuas = defaultDuas;
      }

      existingDuas.unshift(newDua);

      try {
        localStorage.setItem('imran_saniya_wedding_duas', JSON.stringify(existingDuas));
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }

      renderDuas(existingDuas);
      duaForm.reset();
      showToast('JazakAllah Khair! Your Dua has been shared.');
    });
  }

  loadDuas();

  // ==========================================
  // 9. WHATSAPP & WEB SHARING
  // ==========================================
  window.shareOnWhatsApp = function () {
    const weddingText = `✨ *ROYAL WEDDING INVITATION* ✨\n\n` +
      `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\n` +
      `Together with the blessings of Allah, you are cordially invited to celebrate the auspicious union of:\n\n` +
      `💍 *SHAIK IMRAN*\n` +
      `& *SHAIK SANIYA*\n\n` +
      `📅 *Wedding Events:*\n` +
      `• *Haldi:* 13 December 2026 – 10:00 PM onwards\n` +
      `• *Nikah:* 14 December 2026 – 9:00 AM\n\n` +
      `📍 *Venue:*\n` +
      `At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India.\n` +
      `Google Maps: https://maps.app.goo.gl/do8WPFCzZCyU77vG6\n\n` +
      `View our digital wedding invitation experience:\n` +
      `${window.location.href}\n\n` +
      `We eagerly seek your gracious presence and heartfelt duas! 🌙✨`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(weddingText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  window.shareInvitationNative = function () {
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Invitation: Shaik Imran & Shaik Saniya',
        text: 'Join us in celebrating the royal wedding of Shaik Imran & Shaik Saniya (13-14 December 2026).',
        url: window.location.href
      }).catch((err) => {
        copyInvitationLink();
      });
    } else {
      copyInvitationLink();
    }
  };

  window.copyInvitationLink = function () {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Invitation link copied to clipboard!');
      }).catch(() => {
        fallbackCopyText(url);
      });
    } else {
      fallbackCopyText(url);
    }
  };

  window.copyVenueAddress = function () {
    const address = `At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India. Location: https://maps.app.goo.gl/do8WPFCzZCyU77vG6`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).then(() => {
        showToast('Venue address copied to clipboard!');
      }).catch(() => {
        fallbackCopyText(address);
      });
    } else {
      fallbackCopyText(address);
    }
  };

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard!');
    } catch (err) {
      showToast('Please copy: ' + text);
    }
    document.body.removeChild(textarea);
  }

  // ==========================================
  // 10. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});

