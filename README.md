# 🌙 Royal Islamic Wedding Invitation: Shaik Imran & Shaik Saniya

> An extraordinary, cinematic, luxury Muslim wedding invitation website crafted with deep emerald green, metallic gold, grand Mughal/Moroccan architecture, ambient soundscapes, live countdown, and interactive guest experiences.

---

## 💍 Wedding Overview

* **Groom:** Shaik Imran
* **Bride:** Shaik Saniya
* **Key Events:**
  * **Haldi & Mayun Ceremony:** Sunday, 13 December 2026 – 10:00 PM onwards
  * **Nikah Ceremony:** Monday, 14 December 2026 – 9:00 AM
* **Venue:**
  * At Our Residence, Kangala Village, Bapatla District, Andhra Pradesh, India.
* **Google Maps Location:**
  * [https://maps.app.goo.gl/do8WPFCzZCyU77vG6](https://maps.app.goo.gl/do8WPFCzZCyU77vG6)

---

## ✨ Creative Design Direction & Features

### 1. Royal Color Palette
* **Deep Emerald Green:** `#063B30` / `#032019` / `#021410`
* **Royal Forest Green:** `#092820`
* **Metallic Gold:** `#D4AF62` (Multi-stop gold foil gradient)
* **Champagne Gold:** `#F3E5BD`
* **Ivory & Cream:** `#FFF9ED` / `#E6DFD3`

### 2. Cinematic 3D Envelope Opening Experience
* Dark emerald celestial backdrop with glowing crescent moon and twinkling stars.
* Intertwined royal **"I & S"** monogram gold wax seal stamp with soft pulsing aura.
* Bismillahir Rahmanir Raheem (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`) in Arabic calligraphy.
* Tactile seal unsealing animation with smooth transition into the main website.

### 3. Full-Screen Hero & Architectural Background
* Panoramic illuminated mosque twilight background.
* Custom illustrated Muslim couple inside a grand scalloped Mughal archway:
  * Bride in deep emerald bridal hijab with intricate gold zardozi embroidery and royal jewelry.
  * Groom in ivory embroidered sherwani, Islamic cap, and emerald silk shawl.
* Swaying golden Moroccan lanterns with gentle pendulum animation and candle flame glow.
* Golden stardust particle canvas reacting softly to mouse/touch movements.

### 4. Unrolling Wedding Scroll (Royal Nikah Parchment)
* Ancient royal scroll flanked by metallic gold rods with ornate finials.
* Auto-unfurls as guests scroll into view (or via the interactive "Unfurl Royal Scroll" toggle).
* Displays the official Nikah decree, Bismillah calligraphy, family invitation, and royal seal.

### 5. Golden Split-Flap Flip Clock Countdown
* Target: **13 December 2026, 10:00 PM IST**.
* Mechanical 3D split-flap cards for Days, Hours, Minutes, and Seconds that flip like a luxury timepiece.
* One-click Google Calendar integration and downloadable `.ics` iCalendar file.

### 6. Detailed Wedding Events Cards
* **Event 01 – Haldi:** Turmeric-inspired golden brass urli with marigolds, fairy lights, and festive evening vibes.
* **Event 02 – Nikah:** Sacred Holy Quran on carved golden rehal, jasmine garlands, wedding rings, and grand mosque architecture.

### 7. Our Journey & Sacred Covenant
* Quranic Ayah from **Surah Ar-Rum (30:21)** with classical Arabic typography and English translation.
* A meaningful reflection on love, mercy, faith, and lifelong companionship.

### 8. Venue & Travel Guide
* Detailed residence address in Kangala Village, Bapatla District.
* Nearest Railway Station: **Bhattiprolu Railway Station**.
* Prominent **"GET DIRECTIONS"** button linking directly to Google Maps.
* One-click "Copy Address" with instant toast notification.
* Embedded interactive map preview with travel guidance.

### 9. Tap to Reveal a Surprise
* 3D royal emerald velvet gift box adorned with a metallic gold ribbon and bow.
* Touching the gift box lifts the lid with sparkling golden particles to unveil a heartfelt message:
  > *“Your presence is the greatest gift we could ask for.”*
* Includes a "Say Ameen 🤲" button with blessing toast.

### 10. Post-Wedding Memories Gallery (Digital Keepsake Album)
* Transforms the digital invitation into an everlasting family album after 14 December 2026.
* Features filter tabs for Haldi, Nikah, and Cinematic 4K Film highlights.
* Interactive "Notify Me When Memories Go Live" registration and guest photo contribution prompt.

### 11. Interactive Duas & Wishes Guestbook
* Live guest blessing submission form (Name, Relation, Message) with LocalStorage persistence.
* Pre-loaded with warm family blessings.

### 12. WhatsApp & Social Sharing
* Pre-composed royal wedding invitation text ready to share with friends and family via WhatsApp in one tap.
* Web Share API integration for native mobile share sheets.

---

## 📁 Project Structure

```text
WEDDING/
├── index.html                   # Semantic HTML5 luxury wedding website
├── css/
│   └── styles.css               # Complete luxury responsive design system
├── js/
│   ├── main.js                  # Interactivity, audio engine, countdown, lightbox, duas
│   └── particles.js             # Canvas golden stardust & floating bokeh engine
├── assets/
│   ├── audio/
│   │   └── bismillah-song.mp3   # Islamic Wedding Bismillah Song
│   ├── icons/
│   │   ├── crescent-star.svg    # Glowing crescent moon and 8-pointed star
│   │   ├── lantern.svg          # Detailed Moroccan/Ramadan hanging lantern
│   │   ├── islamic-divider.svg  # Arabesque horizontal divider
│   │   ├── corner-ornament.svg  # Gold filigree card corner borders
│   │   └── islamic-arch.svg     # Scalloped Mughal arch frame
│   └── images/
│       ├── couple-arch.jpg      # Couple beneath royal Islamic arch
│       ├── couple-mosque-view.jpg # Balcony overlooking grand mosque at twilight
│       ├── couple-portrait.jpg  # Close-up royal portrait in emerald & gold
│       ├── couple-silhouette.jpg# Romantic silhouette with lanterns & jasmine
│       ├── haldi-ceremony.jpg   # Haldi brass urli and marigold flowers
│       ├── nikah-ceremony.jpg   # Sacred Nikah Quran and rings scene
│       ├── hero-mosque-bg.jpg   # Panoramic illuminated mosque background
│       └── royal-seal.jpg       # 3D embossed metallic gold wax seal
├── package.json                 # Project manifest & local dev scripts
├── vercel.json                  # Production Vercel deployment configuration
├── netlify.toml                 # Production Netlify deployment configuration
└── README.md                    # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Using Python (Recommended & Built-in)
Run the following command in PowerShell / Terminal:
```bash
python -m http.server 3000
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### Option 2: Using Node.js
```bash
npx serve -l 3000 .
```

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 How to Deploy for Free

### Deploying to Netlify (Recommended)
1. **Drag & Drop:**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
   - Drag and drop this entire `WEDDING` folder.
   - Netlify will instantly assign a public live URL (e.g., `https://imran-saniya-wedding.netlify.app`).
2. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```

### Deploying to Vercel
1. Install Vercel CLI (or push to GitHub and import into [Vercel Dashboard](https://vercel.com)):
   ```bash
   npx vercel --prod
   ```
2. Your live website URL will be generated immediately.

### Deploying to GitHub Pages
1. Push this repository to GitHub.
2. In your repository, go to **Settings > Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website will be live at `https://<username>.github.io/<repo-name>/`.

---

## 👑 Wedding Administration Desk (`admin.html`)

A dedicated, password-protected administrative portal designed for the couple and wedding organizers to effortlessly customize wedding details, upload ceremony and memories photos, and manage guest wishes in real time.

### How to Access:
- **Direct URL:** `http://localhost:3000/admin.html` (or `<your-domain>/admin.html`)
- **Footer Link:** Click the **"⚙ Admin Desk"** button in the footer of `index.html`.
- **Keyboard Shortcut:** Press **`Ctrl + Shift + A`** (or `Cmd + Shift + A`) from any page.
- **Default Master PIN:** `1314` (customizable inside the Settings tab).

### Admin Features:
1. **💍 Wedding Details & Events:**
   - Update Groom & Bride names, romantic tagline, and page title.
   - Edit Haldi & Nikah dates, timings, venues, and descriptions.
   - Update Venue residence name, address lines, nearest railway station, and Google Maps URL.
   - Adjust live countdown target timestamp.
   - Customize Royal Scroll decree and 3D Velvet Gift Box secret message.
2. **📸 Ceremony & Gallery Photos:**
   - Upload custom photos for Hero couple, Haldi cover, Nikah cover, and Mosque background.
   - Manage Post-Wedding Memories Album: Add new photos with category tags and captions, delete photos, or toggle Album Status between *Locked* and *Live*.
3. **💌 Duas & Guestbook Moderation:**
   - View all guest wishes and prayers submitted on the website.
   - Delete inappropriate or duplicate entries.
   - Export all guest duas directly to CSV.
4. **⚙ Settings & Backup:**
   - Change Master Access PIN.
   - Download complete configuration & photo backup as `.json`.
   - Restore configuration from a `.json` backup file.
   - One-click reset to factory defaults for Imran & Saniya.


