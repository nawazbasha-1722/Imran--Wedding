/**
 * ROYAL ISLAMIC WEDDING INVITATION - ADMIN DESK SCRIPT
 * Manages wedding details, ceremony photos, memories album, and guest duas.
 * Fully synchronized with index.html via LocalStorage.
 */

(function () {
  'use strict';

  // Master Storage Keys
  const STORAGE_KEY_DATA = 'weddingSiteData';
  const STORAGE_KEY_DUAS = 'imran_saniya_wedding_duas';
  const STORAGE_KEY_PIN = 'weddingAdminPIN';
  const SESSION_AUTH_KEY = 'weddingAdminAuthenticated';

  // Default Wedding Data Structure
  const DEFAULT_WEDDING_DATA = {
    groomName: 'Shaik Imran',
    brideName: 'Shaik Saniya',
    tagline: 'Two hearts, one beautiful journey.',
    haldiDate: 'Sunday, 13 December 2026',
    haldiTime: '10:00 PM Onwards',
    haldiVenue: 'At Our Residence, Kangala Village, Bapatla District',
    haldiDesc: 'A radiant evening of joyous turmeric blessings, fragrant yellow marigolds, festive melodies, and cherished laughter surrounded by loved ones as we initiate the wedding celebrations.',
    nikahDate: 'Monday, 14 December 2026',
    nikahTime: '9:00 AM',
    nikahVenue: 'At Our Residence, Kangala Village, Bapatla District',
    nikahDesc: 'The sacred solemnization of Nikah where two souls enter into a holy covenant of marriage in the presence of Allah, receiving heartfelt duas, followed by the celebratory feast.',
    venueTitle: 'At Our Residence',
    addressLine1: 'Kangala Village',
    addressLine2: 'Bapatla District',
    addressLine3: 'Andhra Pradesh, India.',
    railwayStation: 'Bhattiprolu Railway Station',
    mapsUrl: 'https://maps.app.goo.gl/do8WPFCzZCyU77vG6',
    targetISO: '2026-12-13T22:00',
    surpriseMsg: 'Your presence is the greatest gift we could ask for.',
    decreeParchment: "With the solemn decree and divine blessings of Allah Subhanahu Wa Ta'ala, you are cordially requested to grace the auspicious wedding ceremonies of Shaik Imran and Shaik Saniya.",
    photos: {
      hero: '',
      haldi: '',
      nikah: '',
      mosque: ''
    },
    memoriesAlbum: {
      unlocked: false,
      items: [
        {
          id: '1',
          title: 'Haldi & Mayun Joy',
          category: 'haldi',
          date: '13 Dec 2026',
          desc: 'Candid turmeric rituals, laughter with cousins, flower showers, and festive evening family celebrations.',
          img: 'assets/images/haldi-ceremony.jpg'
        },
        {
          id: '2',
          title: 'Sacred Nikah Union',
          category: 'nikah',
          date: '14 Dec 2026',
          desc: 'Solemnization of marriage, Quranic recitations, signature of Nikahnama, and emotional family duas.',
          img: 'assets/images/nikah-ceremony.jpg'
        },
        {
          id: '3',
          title: 'Royal Wedding Film',
          category: 'film',
          date: '4K Highlights',
          desc: 'Official 4K cinematic highlights reel, drone cinematography, and unforgettable memories captured in time.',
          img: 'assets/images/hero-mosque-bg.jpg'
        }
      ]
    }
  };

  let currentData = JSON.parse(JSON.stringify(DEFAULT_WEDDING_DATA));

  // ==========================================
  // 1. AUTHENTICATION & PIN GATE
  // ==========================================
  function initAuth() {
    const loginGate = document.getElementById('adminLoginGate');
    const pinForm = document.getElementById('adminPinForm');
    const pinInput = document.getElementById('adminPinInput');
    const loginCard = document.querySelector('.login-card');
    const btnLogout = document.getElementById('btnLogout');

    const isAuthenticated = sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';

    if (isAuthenticated) {
      if (loginGate) loginGate.classList.add('hidden');
      loadAllData();
    } else {
      if (loginGate) loginGate.classList.remove('hidden');
      if (pinInput) pinInput.focus();
    }

    if (pinForm) {
      pinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredPin = pinInput.value.trim();
        const storedPin = localStorage.getItem(STORAGE_KEY_PIN) || '1314';

        if (enteredPin === storedPin) {
          sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
          loginGate.classList.add('hidden');
          showAdminToast('✦ Welcome to Royal Admin Desk ✦');
          loadAllData();
        } else {
          loginCard.classList.remove('shake');
          void loginCard.offsetWidth; // Trigger reflow
          loginCard.classList.add('shake');
          pinInput.value = '';
          showAdminToast('⚠ Incorrect PIN. Default is 1314');
        }
      });
    }

    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_AUTH_KEY);
        window.location.reload();
      });
    }

    // Click-to-fill hint helper
    const defaultPinHint = document.getElementById('defaultPinHint');
    if (defaultPinHint && pinInput) {
      defaultPinHint.addEventListener('click', () => {
        pinInput.value = defaultPinHint.textContent.trim();
        pinInput.focus();
      });
    }
  }

  // ==========================================
  // 2. DATA LOADING & FORM HYDRATION
  // ==========================================
  function loadAllData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DATA);
      if (stored) {
        currentData = Object.assign({}, DEFAULT_WEDDING_DATA, JSON.parse(stored));
        if (!currentData.photos) currentData.photos = Object.assign({}, DEFAULT_WEDDING_DATA.photos);
        if (!currentData.memoriesAlbum) currentData.memoriesAlbum = Object.assign({}, DEFAULT_WEDDING_DATA.memoriesAlbum);
      }
    } catch (err) {
      console.warn('Failed to parse weddingSiteData:', err);
      currentData = JSON.parse(JSON.stringify(DEFAULT_WEDDING_DATA));
    }

    hydrateFormFields();
    hydratePhotoPreviews();
    renderMemoriesGrid();
    renderDuasTable();
  }

  function hydrateFormFields() {
    // Couple details
    setVal('groomName', currentData.groomName);
    setVal('brideName', currentData.brideName);
    setVal('weddingTagline', currentData.tagline);

    // Haldi
    setVal('haldiDate', currentData.haldiDate);
    setVal('haldiTime', currentData.haldiTime);
    setVal('haldiVenue', currentData.haldiVenue);
    setVal('haldiDesc', currentData.haldiDesc);

    // Nikah
    setVal('nikahDate', currentData.nikahDate);
    setVal('nikahTime', currentData.nikahTime);
    setVal('nikahVenue', currentData.nikahVenue);
    setVal('nikahDesc', currentData.nikahDesc);

    // Venue & Travel
    setVal('venueResidence', currentData.venueTitle);
    setVal('addressLine1', currentData.addressLine1);
    setVal('addressLine2', currentData.addressLine2);
    setVal('addressLine3', currentData.addressLine3);
    setVal('railwayStation', currentData.railwayStation);
    setVal('mapsUrl', currentData.mapsUrl);

    // Countdown target
    setVal('countdownTargetISO', currentData.targetISO);

    // Messages
    setVal('surpriseMessage', currentData.surpriseMsg);
    setVal('decreeMessage', currentData.decreeParchment);

    // Album status
    const albumToggle = document.getElementById('toggleAlbumStatus');
    if (albumToggle) {
      albumToggle.checked = Boolean(currentData.memoriesAlbum && currentData.memoriesAlbum.unlocked);
      updateAlbumStatusText(albumToggle.checked);
    }
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // ==========================================
  // 3. SAVING DATA TO LOCALSTORAGE
  // ==========================================
  window.saveAllAdminData = function () {
    currentData.groomName = getVal('groomName') || DEFAULT_WEDDING_DATA.groomName;
    currentData.brideName = getVal('brideName') || DEFAULT_WEDDING_DATA.brideName;
    currentData.tagline = getVal('weddingTagline') || DEFAULT_WEDDING_DATA.tagline;

    currentData.haldiDate = getVal('haldiDate') || DEFAULT_WEDDING_DATA.haldiDate;
    currentData.haldiTime = getVal('haldiTime') || DEFAULT_WEDDING_DATA.haldiTime;
    currentData.haldiVenue = getVal('haldiVenue') || DEFAULT_WEDDING_DATA.haldiVenue;
    currentData.haldiDesc = getVal('haldiDesc') || DEFAULT_WEDDING_DATA.haldiDesc;

    currentData.nikahDate = getVal('nikahDate') || DEFAULT_WEDDING_DATA.nikahDate;
    currentData.nikahTime = getVal('nikahTime') || DEFAULT_WEDDING_DATA.nikahTime;
    currentData.nikahVenue = getVal('nikahVenue') || DEFAULT_WEDDING_DATA.nikahVenue;
    currentData.nikahDesc = getVal('nikahDesc') || DEFAULT_WEDDING_DATA.nikahDesc;

    currentData.venueTitle = getVal('venueResidence') || DEFAULT_WEDDING_DATA.venueTitle;
    currentData.addressLine1 = getVal('addressLine1') || DEFAULT_WEDDING_DATA.addressLine1;
    currentData.addressLine2 = getVal('addressLine2') || DEFAULT_WEDDING_DATA.addressLine2;
    currentData.addressLine3 = getVal('addressLine3') || DEFAULT_WEDDING_DATA.addressLine3;
    currentData.railwayStation = getVal('railwayStation') || DEFAULT_WEDDING_DATA.railwayStation;
    currentData.mapsUrl = getVal('mapsUrl') || DEFAULT_WEDDING_DATA.mapsUrl;

    currentData.targetISO = getVal('countdownTargetISO') || DEFAULT_WEDDING_DATA.targetISO;
    currentData.surpriseMsg = getVal('surpriseMessage') || DEFAULT_WEDDING_DATA.surpriseMsg;
    currentData.decreeParchment = getVal('decreeMessage') || DEFAULT_WEDDING_DATA.decreeParchment;

    const albumToggle = document.getElementById('toggleAlbumStatus');
    if (albumToggle) {
      if (!currentData.memoriesAlbum) currentData.memoriesAlbum = {};
      currentData.memoriesAlbum.unlocked = albumToggle.checked;
    }

    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(currentData));
      showAdminToast('✦ Changes Saved! Live site is synchronized ✦');
    } catch (e) {
      console.error(e);
      showAdminToast('⚠ Error saving to local storage: Storage quota exceeded.');
    }
  };

  // ==========================================
  // 4. PHOTO MANAGEMENT
  // ==========================================
  function hydratePhotoPreviews() {
    setPreviewSrc('previewHeroImg', currentData.photos.hero || 'assets/images/couple-arch.jpg');
    setPreviewSrc('previewHaldiImg', currentData.photos.haldi || 'assets/images/haldi-ceremony.jpg');
    setPreviewSrc('previewNikahImg', currentData.photos.nikah || 'assets/images/nikah-ceremony.jpg');
    setPreviewSrc('previewMosqueImg', currentData.photos.mosque || 'assets/images/hero-mosque-bg.jpg');
  }

  function setPreviewSrc(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src;
  }

  window.handlePhotoUpload = function (photoKey, inputEl) {
    if (!inputEl || !inputEl.files || !inputEl.files[0]) return;
    const file = inputEl.files[0];

    // Read and optimize image to Base64
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Data = e.target.result;
      currentData.photos[photoKey] = base64Data;
      hydratePhotoPreviews();
      window.saveAllAdminData();
      showAdminToast(`✦ Photo updated for ${photoKey.toUpperCase()}! ✦`);
    };
    reader.readAsDataURL(file);
  };

  window.resetPhotoToDefault = function (photoKey) {
    currentData.photos[photoKey] = '';
    hydratePhotoPreviews();
    window.saveAllAdminData();
    showAdminToast(`✦ Reset ${photoKey} to original illustration ✦`);
  };

  // ==========================================
  // 5. POST-WEDDING MEMORIES ALBUM
  // ==========================================
  function renderMemoriesGrid() {
    const container = document.getElementById('adminMemoriesGrid');
    if (!container) return;

    const items = (currentData.memoriesAlbum && currentData.memoriesAlbum.items) || [];
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--color-ivory-muted); opacity: 0.7;">
          No photos in album yet. Use the "Add New Memory Photo" form below.
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'memory-admin-item';
      card.innerHTML = `
        <div class="memory-thumb-wrap">
          <img src="${item.img}" alt="${escapeHTML(item.title)}" class="memory-thumb" onerror="this.src='assets/images/haldi-ceremony.jpg'">
          <span class="memory-category-tag">${escapeHTML(item.category)}</span>
        </div>
        <div class="memory-item-body">
          <div class="memory-item-title">${escapeHTML(item.title)}</div>
          <div style="font-size: 0.75rem; color: var(--color-gold-metallic); margin-bottom: 0.3rem;">${escapeHTML(item.date || '')}</div>
          <div class="memory-item-desc">${escapeHTML(item.desc || '')}</div>
          <button class="btn-delete-memory" onclick="deleteMemoryItem(${index})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 4px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Remove from Album
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  window.addNewMemoryItem = function (e) {
    if (e) e.preventDefault();

    const title = getVal('newMemTitle');
    const category = getVal('newMemCategory') || 'haldi';
    const date = getVal('newMemDate') || 'Dec 2026';
    const desc = getVal('newMemDesc');
    const fileInput = document.getElementById('newMemFile');

    if (!title) {
      alert('Please enter a photo title.');
      return;
    }

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        const newItem = {
          id: String(Date.now()),
          title,
          category,
          date,
          desc,
          img: evt.target.result
        };

        if (!currentData.memoriesAlbum.items) currentData.memoriesAlbum.items = [];
        currentData.memoriesAlbum.items.push(newItem);
        renderMemoriesGrid();
        window.saveAllAdminData();
        clearMemoryForm();
        showAdminToast('✦ New Photo Added to Album! ✦');
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      const urlInput = getVal('newMemUrl');
      const newItem = {
        id: String(Date.now()),
        title,
        category,
        date,
        desc,
        img: urlInput || 'assets/images/haldi-ceremony.jpg'
      };

      if (!currentData.memoriesAlbum.items) currentData.memoriesAlbum.items = [];
      currentData.memoriesAlbum.items.push(newItem);
      renderMemoriesGrid();
      window.saveAllAdminData();
      clearMemoryForm();
      showAdminToast('✦ New Photo Added to Album! ✦');
    }
  };

  function clearMemoryForm() {
    setVal('newMemTitle', '');
    setVal('newMemDate', '');
    setVal('newMemDesc', '');
    setVal('newMemUrl', '');
    const f = document.getElementById('newMemFile');
    if (f) f.value = '';
  }

  window.deleteMemoryItem = function (index) {
    if (!confirm('Are you sure you want to remove this photo from the memories album?')) return;
    if (currentData.memoriesAlbum && currentData.memoriesAlbum.items) {
      currentData.memoriesAlbum.items.splice(index, 1);
      renderMemoriesGrid();
      window.saveAllAdminData();
      showAdminToast('✦ Photo removed from album ✦');
    }
  };

  function updateAlbumStatusText(isUnlocked) {
    const label = document.getElementById('albumStatusLabel');
    if (label) {
      label.textContent = isUnlocked
        ? 'Unlocked (Guests can view live photos now)'
        : 'Locked ("Unlocks Post-Event" placeholder mode)';
      label.style.color = isUnlocked ? '#2ecc71' : 'var(--color-gold-light)';
    }
  }

  // ==========================================
  // 6. DUAS & GUESTBOOK MODERATION
  // ==========================================
  function renderDuasTable() {
    const tableBody = document.getElementById('duasTableBody');
    const countEl = document.getElementById('duasCount');
    if (!tableBody) return;

    let duas = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DUAS);
      duas = stored ? JSON.parse(stored) : [];
    } catch (e) {
      duas = [];
    }

    if (countEl) countEl.textContent = duas.length;
    tableBody.innerHTML = '';

    if (duas.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 2rem; color: var(--color-ivory-muted); opacity: 0.7;">
            No guest duas received yet.
          </td>
        </tr>
      `;
      return;
    }

    duas.forEach((dua, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${duas.length - idx}</td>
        <td class="dua-author-cell">
          <strong>${escapeHTML(dua.name || 'Anonymous Guest')}</strong>
          <span>${escapeHTML(dua.relation || 'Guest')}</span>
        </td>
        <td class="dua-message-cell">“${escapeHTML(dua.message || '')}”</td>
        <td>
          <button class="btn-table-del" onclick="deleteDuaItem(${idx})">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  window.deleteDuaItem = function (index) {
    if (!confirm('Are you sure you want to delete this guest dua?')) return;
    let duas = [];
    try {
      duas = JSON.parse(localStorage.getItem(STORAGE_KEY_DUAS) || '[]');
    } catch (e) {
      duas = [];
    }

    duas.splice(index, 1);
    try {
      localStorage.setItem(STORAGE_KEY_DUAS, JSON.stringify(duas));
      renderDuasTable();
      showAdminToast('✦ Dua removed from guestbook ✦');
    } catch (e) {
      console.error(e);
    }
  };

  window.exportDuasCSV = function () {
    let duas = [];
    try {
      duas = JSON.parse(localStorage.getItem(STORAGE_KEY_DUAS) || '[]');
    } catch (e) {
      duas = [];
    }

    if (duas.length === 0) {
      alert('No duas to export.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,Name,Relation,Dua Message\n';
    duas.forEach((d) => {
      const row = [
        `"${(d.name || '').replace(/"/g, '""')}"`,
        `"${(d.relation || '').replace(/"/g, '""')}"`,
        `"${(d.message || '').replace(/"/g, '""')}"`
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `imran-saniya-wedding-duas-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAdminToast('✦ Duas exported to CSV ✦');
  };

  // ==========================================
  // 7. BACKUP, RESTORE & FACTORY RESET
  // ==========================================
  window.downloadBackupJSON = function () {
    window.saveAllAdminData();
    const backup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      weddingData: currentData,
      duas: JSON.parse(localStorage.getItem(STORAGE_KEY_DUAS) || '[]')
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `wedding-config-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showAdminToast('✦ Backup JSON Downloaded ✦');
  };

  window.handleBackupImport = function (inputEl) {
    if (!inputEl || !inputEl.files || !inputEl.files[0]) return;
    const file = inputEl.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.weddingData) {
          localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(parsed.weddingData));
        }
        if (parsed.duas && Array.isArray(parsed.duas)) {
          localStorage.setItem(STORAGE_KEY_DUAS, JSON.stringify(parsed.duas));
        }
        showAdminToast('✦ Backup Imported Successfully! ✦');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  window.resetToFactoryDefaults = function () {
    const confirmPrompt = confirm(
      'Are you sure you want to reset all wedding details, photos, and settings back to original defaults for Imran & Saniya? This cannot be undone.'
    );
    if (!confirmPrompt) return;

    localStorage.removeItem(STORAGE_KEY_DATA);
    currentData = JSON.parse(JSON.stringify(DEFAULT_WEDDING_DATA));
    loadAllData();
    showAdminToast('✦ Reset to Original Wedding Defaults ✦');
  };

  window.changeMasterPIN = function (e) {
    if (e) e.preventDefault();
    const currentEntered = getVal('currentPIN');
    const newPIN = getVal('newPIN');
    const confirmNewPIN = getVal('confirmNewPIN');

    const storedPin = localStorage.getItem(STORAGE_KEY_PIN) || '1314';

    if (currentEntered !== storedPin) {
      alert('The current PIN entered is incorrect.');
      return;
    }

    if (!newPIN || newPIN.length < 4) {
      alert('New PIN must be at least 4 digits.');
      return;
    }

    if (newPIN !== confirmNewPIN) {
      alert('New PIN and Confirm PIN do not match.');
      return;
    }

    localStorage.setItem(STORAGE_KEY_PIN, newPIN);
    setVal('currentPIN', '');
    setVal('newPIN', '');
    setVal('confirmNewPIN', '');
    showAdminToast('✦ Master PIN updated successfully! ✦');
  };

  // ==========================================
  // 8. TABS CONTROLLER
  // ==========================================
  window.switchAdminTab = function (tabId, btnEl) {
    document.querySelectorAll('.btn-admin-tab').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach((p) => p.classList.remove('active'));

    if (btnEl) btnEl.classList.add('active');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
  };

  // ==========================================
  // 9. TOAST SYSTEM & UTILITIES
  // ==========================================
  function showAdminToast(msg) {
    const toast = document.getElementById('adminToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // DOM Ready Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initAuth();

    // Album status toggle listener
    const albumToggle = document.getElementById('toggleAlbumStatus');
    if (albumToggle) {
      albumToggle.addEventListener('change', () => {
        updateAlbumStatusText(albumToggle.checked);
      });
    }

    // Ctrl + S shortcut to quick save
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        window.saveAllAdminData();
      }
    });
  });
})();

