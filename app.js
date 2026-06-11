/* תיקי נסיעות — לוגיקת האתר.
   הנתונים הקבועים מגיעים מ-data.js; תוספות שנעשות בדפדפן
   נשמרות ב-localStorage וניתנות לייצוא כקובץ JSON מעודכן. */

const OVERLAY_KEY = "lazar-trips-overlay-v1";
const $ = (sel, el = document) => el.querySelector(sel);

const DAY_NAMES = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

function loadOverlay() {
  try { return JSON.parse(localStorage.getItem(OVERLAY_KEY)) || {}; }
  catch { return {}; }
}
function saveOverlay(ov) { localStorage.setItem(OVERLAY_KEY, JSON.stringify(ov)); }

function mergedTrip(trip) {
  const ov = loadOverlay()[trip.id] || {};
  return {
    ...trip,
    services: [...trip.services, ...(ov.services || [])],
    excursions: [...trip.excursions, ...(ov.excursions || [])]
  };
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return `יום ${DAY_NAMES[d.getDay()]}, ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}
function shortDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()}.${d.getMonth() + 1}`;
}
function daysUntil(iso) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.round((new Date(iso + "T00:00:00") - now) / 86400000);
}

/* ---------- מסך ראשי: רשימת תיקים ---------- */
function renderHome() {
  const data = window.TRIPS_DATA;
  $("#stamp").textContent = `עדכון אחרון: ${fmtDate(data.lastUpdated)} · נוסעים: ${data.travelers.join(" ו")}`;
  const grid = $("#view");
  grid.innerHTML = "";
  grid.className = "grid";

  data.trips.forEach(t => {
    const m = mergedTrip(t);
    const dleft = daysUntil(t.outbound.date);
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${t.title}</h2>
      <div class="dest">✈️ ${t.destination} · ${t.airline}</div>
      <div class="dates">${shortDate(t.outbound.date)} ← ${shortDate(t.inbound.date)} (${fmtDate(t.outbound.date).split(",")[0]})</div>
      <div class="meta">
        <span class="chip">קוד הזמנה: ${t.bookingCode}</span>
        <span class="chip green">${t.status}</span>
        ${dleft >= 0 ? `<span class="chip gold">בעוד ${dleft} ימים</span>` : `<span class="chip">הסתיימה</span>`}
      </div>
      <div class="counts">🏨 ${m.services.length} שירותי תיירות · 🥾 ${m.excursions.length} טיולים בתיק</div>`;
    card.onclick = () => { location.hash = t.id; };
    grid.appendChild(card);
  });
}

/* ---------- תיק נסיעה ---------- */
function flightRow(dir, f) {
  return `
    <div class="flight">
      <span class="dir">${dir}</span>
      <span class="route">${f.from} ← ${f.to}<br><span class="small">${fmtDate(f.date)} · טיסה ${f.flightNo}</span></span>
      <span class="times">${f.depTime} ← ${f.arrTime}${f.arrDate ? ` <span class="small">(נחיתה ${shortDate(f.arrDate)})</span>` : ""}</span>
    </div>`;
}

function serviceItem(s) {
  const dates = s.endDate ? `${fmtDate(s.date)} – ${fmtDate(s.endDate)}` : fmtDate(s.date);
  return `
    <div class="item">
      <div class="head">
        <span class="name">${s.type ? s.type + ": " : ""}${s.name}</span>
        ${s.ref ? `<span class="chip">אסמכתא ${s.ref}</span>` : ""}
      </div>
      <div class="desc">${dates}</div>
      ${s.note ? `<div class="note">${s.note}</div>` : ""}
      <div class="links">
        ${s.mapUrl ? `<a class="drive" href="${s.mapUrl}" target="_blank" rel="noopener">🗺️ מיקום במפה</a>` : ""}
      </div>
    </div>`;
}

function excursionItem(e) {
  return `
    <div class="item">
      <div class="head">
        <span class="name">${e.name}</span>
        <span>
          <span class="chip gold">${e.length}</span>
          <span class="chip">${e.mode}</span>
        </span>
      </div>
      ${e.desc ? `<div class="desc">${e.desc}</div>` : ""}
      <div class="links">
        ${e.driveUrl ? `<a class="drive" href="${e.driveUrl}" target="_blank" rel="noopener">🚗 ניווט Google Maps</a>` : ""}
        ${e.wazeUrl ? `<a class="drive" href="${e.wazeUrl}" target="_blank" rel="noopener">🚗 Waze</a>` : ""}
        ${e.komootUrl ? `<a href="${e.komootUrl}" target="_blank" rel="noopener">🥾 Komoot</a>` : ""}
        ${e.alltrailsUrl ? `<a href="${e.alltrailsUrl}" target="_blank" rel="noopener">🥾 AllTrails</a>` : ""}
      </div>
    </div>`;
}

function renderTrip(id) {
  const base = window.TRIPS_DATA.trips.find(t => t.id === id);
  if (!base) { location.hash = ""; return; }
  const t = mergedTrip(base);
  const view = $("#view");
  view.className = "";
  view.innerHTML = `
    <div class="back"><button class="btn ghost" onclick="location.hash=''">→ חזרה לכל התיקים</button></div>

    <section class="block">
      <h3>✈️ טיסות — ${t.title} (${t.airline}, קוד ${t.bookingCode})</h3>
      ${flightRow("הלוך", t.outbound)}
      ${flightRow("חזור", t.inbound)}
      <div class="links" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
        <span class="chip green">${t.status}</span>
        ${t.price ? `<span class="chip gold">מחיר: ${t.price}</span>` : ""}
        <a class="chip" style="text-decoration:none" href="${t.manageUrl}" target="_blank" rel="noopener">ניהול ההזמנה באתר ${t.airline} ↗</a>
      </div>
    </section>

    <section class="block">
      <h3>🏨 שירותי תיירות (מלונות, רכב, אטרקציות)</h3>
      <div id="services">${t.services.map(serviceItem).join("") || `<div class="empty">עדיין אין הזמנות בתיק זה — כל אישור הזמנה חדש יתווסף כאן.</div>`}</div>
      <button class="btn secondary" onclick="toggleForm('svc-form')">+ הוספת שירות</button>
      <form class="adder" id="svc-form">
        <div class="row">
          <div><label>סוג</label>
            <select name="type"><option>מלון</option><option>רכב שכור</option><option>אטרקציה</option><option>הסעה</option><option>אחר</option></select>
          </div>
          <div><label>שם</label><input name="name" required></div>
        </div>
        <div class="row">
          <div><label>מתאריך</label><input type="date" name="date" required></div>
          <div><label>עד תאריך (לא חובה)</label><input type="date" name="endDate"></div>
        </div>
        <div class="row">
          <div><label>מס' אסמכתא</label><input name="ref"></div>
          <div><label>קישור מפה (לא חובה)</label><input name="mapUrl" placeholder="https://maps.google.com/?q=..."></div>
        </div>
        <label>הערה</label><input name="note">
        <div class="actions">
          <button class="btn" type="submit">שמירה</button>
          <button class="btn ghost" type="button" onclick="toggleForm('svc-form')">ביטול</button>
        </div>
      </form>
    </section>

    <section class="block">
      <h3>🥾 טיולים ומסלולים — קצרים וארוכים, ברכב וברגל</h3>
      <div id="excursions">${t.excursions.map(excursionItem).join("") || `<div class="empty">עדיין אין טיולים בתיק זה — אפשר להוסיף מסלולים עם קישורי ניווט.</div>`}</div>
      <button class="btn secondary" onclick="toggleForm('exc-form')">+ הוספת טיול</button>
      <form class="adder" id="exc-form">
        <label>שם הטיול</label><input name="name" required>
        <div class="row">
          <div><label>אורך</label>
            <select name="length"><option>קצר</option><option>ארוך</option></select>
          </div>
          <div><label>אופן</label>
            <select name="mode"><option>רגלי</option><option>רכב</option><option>רכב + רגלי</option><option>אופניים</option></select>
          </div>
        </div>
        <label>תיאור</label><textarea name="desc" rows="2"></textarea>
        <div class="row">
          <div><label>ניווט ברכב — Google Maps</label><input name="driveUrl" placeholder="https://maps.google.com/?q=..."></div>
          <div><label>ניווט ברכב — Waze</label><input name="wazeUrl" placeholder="https://waze.com/ul?q=..."></div>
        </div>
        <div class="row">
          <div><label>מסלול רגלי/אופניים — Komoot</label><input name="komootUrl"></div>
          <div><label>מסלול רגלי — AllTrails</label><input name="alltrailsUrl"></div>
        </div>
        <div class="actions">
          <button class="btn" type="submit">שמירה</button>
          <button class="btn ghost" type="button" onclick="toggleForm('exc-form')">ביטול</button>
        </div>
      </form>
    </section>`;

  $("#svc-form").onsubmit = ev => { ev.preventDefault(); addItem(id, "services", ev.target); };
  $("#exc-form").onsubmit = ev => { ev.preventDefault(); addItem(id, "excursions", ev.target); };
}

window.toggleForm = fid => $("#" + fid).classList.toggle("open");

function addItem(tripId, kind, form) {
  const entry = {};
  new FormData(form).forEach((v, k) => { if (String(v).trim()) entry[k] = String(v).trim(); });
  const ov = loadOverlay();
  ov[tripId] = ov[tripId] || {};
  ov[tripId][kind] = ov[tripId][kind] || [];
  ov[tripId][kind].push(entry);
  saveOverlay(ov);
  renderTrip(tripId);
}

/* ייצוא הנתונים המלאים (בסיס + תוספות) לקובץ JSON */
function exportData() {
  const out = {
    ...window.TRIPS_DATA,
    lastUpdated: new Date().toISOString().slice(0, 10),
    trips: window.TRIPS_DATA.trips.map(mergedTrip)
  };
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `trips-${out.lastUpdated}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function route() {
  const id = location.hash.replace("#", "");
  if (id) renderTrip(id); else renderHome();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => {
  $("#export").onclick = exportData;
  $("#clear").onclick = () => {
    if (confirm("למחוק את כל התוספות שנשמרו בדפדפן זה? (הנתונים הקבועים מ-data.js יישארו)")) {
      localStorage.removeItem(OVERLAY_KEY);
      route();
    }
  };
  route();
});
