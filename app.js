const STORAGE_KEY = "tradeDailyJournal.v1";
const SHEET_WEB_APP_KEY = "tradeDailyJournal.sheetWebAppUrl";
const LAST_BACKUP_KEY = "tradeDailyJournal.lastBackupAt";

const dictionary = {
  en: {
    appName: "Trade Daily",
    appSub: "Forex journal",
    dashboard: "Dashboard",
    journal: "Trade journal",
    assets: "Assets",
    growth: "Year growth",
    workspaceLabel: "Trading workspace",
    connectGoogle: "Connect Google",
    disconnectGoogle: "Disconnect Google",
    googleConnected: "Connected",
    googleNotConnected: "Google not connected",
    googleNeedsServer: "Run through the server to use Google login",
    openGoogleSheet: "Open backup sheet",
    backupNeedsGoogle: "Connect Google before backup",
    saveLocal: "Save",
    backupSheet: "Backup",
    importBackup: "Import backup",
    weekPnl: "This week",
    monthPnl: "This month",
    yearPnl: "This year",
    winRate: "Win rate",
    dailyPnlCalendar: "Daily PnL calendar",
    recentTrades: "Recent trades",
    addTradeShort: "Add trade",
    newTrade: "New trade",
    date: "Date",
    asset: "Asset",
    assetType: "Asset type",
    pnl: "PnL",
    notes: "Notes",
    actions: "Actions",
    saveTrade: "Save trade",
    updateTrade: "Update trade",
    clear: "Clear",
    allTrades: "All trades",
    clearAll: "Clear all",
    assetSummary: "Asset type summary",
    yearlyComparison: "Yearly growth comparison",
    forex: "Forex",
    metal: "Metal",
    index: "Index",
    crypto: "Crypto",
    other: "Other",
    trades: "trades",
    noTrades: "No trades yet",
    bestType: "Best type",
    baseYear: "Show year",
    allYears: "All years",
    monthlyTotal: "Monthly total",
    chartTitle: "Cumulative PnL by month",
    cumulativePnl: "Cumulative PnL",
    monthAxis: "Month",
    profitFactor: "Profit factor",
    profitFactorHelp: "Gross profit divided by gross loss",
    grossProfit: "Gross profit",
    grossLoss: "Gross loss",
    delete: "Delete",
    edit: "Edit",
    savedLocal: "JSON file saved",
    backupReady: "Backup sent to your Google Sheet",
    backupFailed: "Backup failed",
    importedBackup: "Backup imported",
    importFailed: "Import failed",
    invalidBackupUrl: "Use the Apps Script Web App URL ending in /exec",
    sheetPrompt: "Paste your Google Apps Script Web App URL ending in /exec",
    lastBackup: "Last backup",
    neverBackedUp: "No backup yet"
  },
  th: {
    appName: "Trade Daily",
    appSub: "บันทึก Forex",
    dashboard: "ภาพรวม",
    journal: "บันทึกเทรด",
    assets: "สินทรัพย์",
    growth: "เติบโตรายปี",
    workspaceLabel: "พื้นที่ทำงานเทรด",
    saveLocal: "บันทึก",
    backupSheet: "สำรอง",
    importBackup: "นำเข้า backup",
    weekPnl: "สัปดาห์นี้",
    monthPnl: "เดือนนี้",
    yearPnl: "ปีนี้",
    winRate: "อัตราชนะ",
    dailyPnlCalendar: "ปฏิทิน PnL รายวัน",
    recentTrades: "รายการล่าสุด",
    addTradeShort: "เพิ่มรายการ",
    newTrade: "รายการใหม่",
    date: "วันที่",
    asset: "สินทรัพย์",
    assetType: "ประเภทสินทรัพย์",
    pnl: "PnL",
    notes: "บันทึก",
    actions: "จัดการ",
    saveTrade: "บันทึก",
    updateTrade: "อัปเดต",
    clear: "ล้าง",
    allTrades: "รายการทั้งหมด",
    clearAll: "ล้างทั้งหมด",
    assetSummary: "สรุปตามประเภทสินทรัพย์",
    yearlyComparison: "เปรียบเทียบการเติบโตรายปี",
    forex: "Forex",
    metal: "ทอง/โลหะ",
    index: "ดัชนี",
    crypto: "คริปโต",
    other: "อื่น ๆ",
    trades: "รายการ",
    noTrades: "ยังไม่มีรายการเทรด",
    bestType: "ประเภทที่ดีที่สุด",
    baseYear: "แสดงปี",
    allYears: "ทุกปี",
    monthlyTotal: "ยอดรายเดือน",
    chartTitle: "PnL สะสมรายเดือน",
    cumulativePnl: "PnL สะสม",
    monthAxis: "เดือน",
    profitFactor: "Profit factor",
    profitFactorHelp: "กำไรรวม ÷ ขาดทุนรวม",
    grossProfit: "กำไรรวม",
    grossLoss: "ขาดทุนรวม",
    delete: "ลบ",
    edit: "แก้ไข",
    savedLocal: "บันทึกไฟล์ JSON แล้ว",
    backupReady: "ส่งสำรองไป Google Sheet แล้ว",
    backupFailed: "สำรองข้อมูลไม่สำเร็จ",
    importedBackup: "นำเข้า backup แล้ว",
    importFailed: "นำเข้า backup ไม่สำเร็จ",
    invalidBackupUrl: "ต้องใช้ Apps Script Web App URL ที่ลงท้ายด้วย /exec",
    sheetPrompt: "วาง Google Apps Script Web App URL ที่ลงท้ายด้วย /exec",
    lastBackup: "Backup ล่าสุด",
    neverBackedUp: "ยังไม่มี backup"
  }
};

Object.assign(dictionary.th, {
  connectGoogle: "เชื่อมต่อ Google",
  disconnectGoogle: "ยกเลิก Google",
  googleConnected: "เชื่อมต่อแล้ว",
  googleNotConnected: "ยังไม่ได้เชื่อมต่อ Google",
  googleNeedsServer: "ต้องเปิดผ่านเซิร์ฟเวอร์เพื่อใช้ Google login",
  openGoogleSheet: "เปิดชีต backup",
  backupNeedsGoogle: "เชื่อมต่อ Google ก่อน backup",
  backupReady: "ส่งสำรองไป Google Sheet ของคุณแล้ว"
});

const typeLabels = {
  forex: { en: "Forex", th: "Forex" },
  metal: { en: "Metal", th: "ทอง/โลหะ" },
  index: { en: "Index", th: "ดัชนี" },
  crypto: { en: "Crypto", th: "คริปโต" },
  other: { en: "Other", th: "อื่น ๆ" }
};

let state = {
  lang: "th",
  view: "dashboard",
  cursor: new Date(),
  editingTradeId: null,
  google: {
    connected: false,
    email: "",
    spreadsheetId: "",
    spreadsheetUrl: ""
  },
  trades: loadTrades()
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const money = (value) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2
}).format(value || 0);

function loadTrades() {
  try {
    return normalizeTrades(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
  } catch {
    return [];
  }
}

function saveTrades() {
  state.trades = normalizeTrades(state.trades);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.trades));
}

function normalizeTrades(trades) {
  const seen = new Set();
  if (!Array.isArray(trades)) return [];

  return trades
    .filter((trade) => trade && trade.date && trade.asset && trade.pnl !== undefined)
    .map((trade) => {
      let id = String(trade.id || "");
      if (!id || seen.has(id)) id = crypto.randomUUID();
      seen.add(id);
      return {
        id,
        date: String(trade.date),
        asset: String(trade.asset).trim().toUpperCase(),
        type: typeLabels[trade.type] ? trade.type : "other",
        pnl: Number(trade.pnl) || 0,
        notes: trade.notes ? String(trade.notes) : ""
      };
    });
}

function formatDateTime(value) {
  if (!value) return "";
  const locale = state.lang === "th" ? "th-TH" : "en-US";
  return new Date(value).toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderBackupTime() {
  const backupTime = $("#backupTime");
  const backedUpAt = localStorage.getItem(LAST_BACKUP_KEY);
  backupTime.textContent = backedUpAt
    ? `${dictionary[state.lang].lastBackup}: ${formatDateTime(backedUpAt)}`
    : dictionary[state.lang].neverBackedUp;
}

function showStatus(messageKey) {
  const status = $("#syncStatus");
  status.textContent = dictionary[state.lang][messageKey] || "";
  window.clearTimeout(showStatus.timer);
  showStatus.timer = window.setTimeout(() => {
    status.textContent = "";
  }, 3200);
}

function isAppsScriptWebAppUrl(value) {
  try {
    const url = new URL(value);
    return url.hostname === "script.google.com"
      && url.pathname.startsWith("/macros/s/")
      && url.pathname.endsWith("/exec");
  } catch {
    return false;
  }
}

function isServerMode() {
  return location.protocol === "http:" || location.protocol === "https:";
}

async function apiJson(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  if (!response.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

async function refreshGoogleStatus() {
  if (!isServerMode()) {
    state.google = { connected: false, email: "", spreadsheetId: "", spreadsheetUrl: "" };
    renderGoogleStatus();
    return;
  }

  try {
    state.google = await apiJson("/api/auth/status");
  } catch {
    state.google = { connected: false, email: "", spreadsheetId: "", spreadsheetUrl: "" };
  }
  renderGoogleStatus();
}

function renderGoogleStatus() {
  const button = $("#googleConnect");
  const status = $("#googleStatus");
  const link = $("#googleSheetLink");
  if (!button || !status || !link) return;

  if (!isServerMode()) {
    button.textContent = dictionary[state.lang].connectGoogle;
    button.disabled = true;
    status.textContent = dictionary[state.lang].googleNeedsServer;
    link.hidden = true;
    return;
  }

  button.disabled = false;
  button.textContent = state.google.connected
    ? dictionary[state.lang].disconnectGoogle
    : dictionary[state.lang].connectGoogle;
  status.textContent = state.google.connected
    ? `${dictionary[state.lang].googleConnected}: ${state.google.email || "Google"}`
    : dictionary[state.lang].googleNotConnected;

  if (state.google.spreadsheetUrl) {
    link.href = state.google.spreadsheetUrl;
    link.hidden = false;
    link.textContent = dictionary[state.lang].openGoogleSheet;
  } else {
    link.hidden = true;
  }
}

function backupPayload(timestamp = new Date().toISOString()) {
  return {
    source: "Trade Daily",
    exportedAt: timestamp,
    backedUpAt: timestamp,
    trades: state.trades
  };
}

function downloadJsonBackup() {
  saveTrades();
  const timestamp = new Date().toISOString();
  const fileSafeTime = timestamp.replace(/[:.]/g, "-");
  const blob = new Blob([JSON.stringify(backupPayload(timestamp), null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `trade-daily-backup-${fileSafeTime}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showStatus("savedLocal");
}

function normalizeImportedTrades(value) {
  const trades = Array.isArray(value) ? value : value?.trades;
  if (!Array.isArray(trades)) return null;

  return normalizeTrades(trades);
}

function importJsonBackup(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = normalizeImportedTrades(JSON.parse(reader.result));
      if (!imported) throw new Error("Invalid backup file");
      state.trades = imported;
      saveTrades();
      render();
      showStatus("importedBackup");
    } catch {
      showStatus("importFailed");
    }
  });
  reader.addEventListener("error", () => showStatus("importFailed"));
  reader.readAsText(file);
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sameYear(date, year) {
  return parseDate(date).getFullYear() === year;
}

function sameMonth(date, cursor) {
  const item = parseDate(date);
  return item.getFullYear() === cursor.getFullYear() && item.getMonth() === cursor.getMonth();
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[lang][key]) node.textContent = dictionary[lang][key];
  });
  $$(".language-option").forEach((button) => button.classList.toggle("active", button.dataset.lang === lang));
  $$("option[data-i18n]").forEach((option) => {
    option.textContent = dictionary[lang][option.dataset.i18n];
  });
}

function switchView(view) {
  state.view = view;
  $$(".view").forEach((node) => node.classList.toggle("active", node.id === view));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $("#viewTitle").textContent = dictionary[state.lang][view];
}

function setTradeFormMode() {
  const submitButton = $("#tradeForm button[type='submit']");
  submitButton.textContent = state.editingTradeId
    ? dictionary[state.lang].updateTrade
    : dictionary[state.lang].saveTrade;
}

function fillTradeForm(trade) {
  state.editingTradeId = trade.id;
  $("#tradeDate").value = trade.date;
  $("#tradeAsset").value = trade.asset;
  $("#tradeType").value = trade.type;
  $("#tradePnl").value = trade.pnl;
  $("#tradeNotes").value = trade.notes || "";
  switchView("journal");
  setTradeFormMode();
  $("#tradeAsset").focus();
}

function resetTradeForm(form = $("#tradeForm"), shouldResetFields = true) {
  state.editingTradeId = null;
  if (shouldResetFields) form.reset();
  $("#tradeDate").value = dateKey(new Date());
  setTradeFormMode();
}

function sumTrades(trades) {
  return trades.reduce((total, trade) => total + Number(trade.pnl), 0);
}

function renderMonthControl() {
  const locale = state.lang === "th" ? "th-TH" : "en-US";
  $("#monthLabel").textContent = state.cursor.toLocaleDateString(locale, { month: "long" });
  $("#yearLabel").textContent = state.cursor.toLocaleDateString(locale, { year: "numeric" });
}

function renderMetrics() {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const year = state.cursor.getFullYear();

  const weekTrades = state.trades.filter((trade) => {
    const date = parseDate(trade.date);
    return date >= weekStart && date < weekEnd;
  });
  const monthTrades = state.trades.filter((trade) => sameMonth(trade.date, state.cursor));
  const yearTrades = state.trades.filter((trade) => sameYear(trade.date, year));
  const winners = yearTrades.filter((trade) => Number(trade.pnl) > 0).length;

  setMoneyMetric("#weekPnl", sumTrades(weekTrades));
  setMoneyMetric("#monthPnl", sumTrades(monthTrades));
  setMoneyMetric("#yearPnl", sumTrades(yearTrades));
  $("#winRate").textContent = yearTrades.length ? `${Math.round((winners / yearTrades.length) * 100)}%` : "0%";
}

function setMoneyMetric(selector, value) {
  const node = $(selector);
  node.textContent = money(value);
  node.classList.toggle("profit", value > 0);
  node.classList.toggle("loss", value < 0);
}

function renderCalendar() {
  const calendar = $("#calendar");
  const weekdays = $("#weekdayRow");
  calendar.innerHTML = "";
  weekdays.innerHTML = "";

  const locale = state.lang === "th" ? "th-TH" : "en-US";
  const weekdayBase = new Date(2024, 0, 1);
  for (let i = 0; i < 7; i += 1) {
    const label = document.createElement("div");
    const day = new Date(weekdayBase);
    day.setDate(weekdayBase.getDate() + i);
    label.textContent = day.toLocaleDateString(locale, { weekday: "short" });
    weekdays.appendChild(label);
  }

  const year = state.cursor.getFullYear();
  const month = state.cursor.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));

  const monthTrades = state.trades.filter((trade) => sameMonth(trade.date, state.cursor));
  $("#tradeCount").textContent = `${monthTrades.length} ${dictionary[state.lang].trades}`;

  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const key = dateKey(day);
    const trades = state.trades.filter((trade) => trade.date === key);
    const total = sumTrades(trades);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "day-cell";
    cell.classList.toggle("outside", day.getMonth() !== month);
    cell.classList.toggle("positive", total > 0);
    cell.classList.toggle("negative", total < 0);
    cell.innerHTML = `
      <span class="day-number">${day.getDate()}</span>
      <span class="day-pnl ${total > 0 ? "profit" : total < 0 ? "loss" : ""}">${trades.length ? money(total) : " "}</span>
      <span class="day-trades">${trades.length ? `${trades.length} ${dictionary[state.lang].trades}` : " "}</span>
    `;
    cell.addEventListener("click", () => {
      switchView("journal");
      $("#tradeDate").value = key;
    });
    calendar.appendChild(cell);
  }
}

function renderRecentTrades() {
  const list = $("#recentTrades");
  const recent = [...state.trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  list.innerHTML = recent.length ? "" : `<div class="empty-state">${dictionary[state.lang].noTrades}</div>`;
  recent.forEach((trade) => {
    const card = document.createElement("article");
    card.className = "trade-card";
    card.innerHTML = `
      <div>
        <strong>${trade.asset}</strong>
        <span>${trade.date} · ${typeLabels[trade.type]?.[state.lang] || trade.type}</span>
      </div>
      <strong class="${trade.pnl >= 0 ? "profit" : "loss"}">${money(trade.pnl)}</strong>
    `;
    list.appendChild(card);
  });
}

function renderRows() {
  const body = $("#tradeRows");
  body.innerHTML = "";
  [...state.trades].sort((a, b) => b.date.localeCompare(a.date)).forEach((trade) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${trade.date}</td>
      <td><strong>${trade.asset}</strong></td>
      <td>${typeLabels[trade.type]?.[state.lang] || trade.type}</td>
      <td class="${trade.pnl >= 0 ? "profit" : "loss"}"><strong>${money(trade.pnl)}</strong></td>
      <td>${trade.notes || ""}</td>
      <td>
        <div class="row-actions">
          <button type="button" class="edit-row" title="${dictionary[state.lang].edit}" data-action="edit" data-id="${trade.id}">✎</button>
          <button type="button" class="delete-row" title="${dictionary[state.lang].delete}" data-action="delete" data-id="${trade.id}">×</button>
        </div>
      </td>
    `;
    body.appendChild(row);
  });
}

function renderAssetSuggestions() {
  const suggestions = $("#assetSuggestions");
  suggestions.innerHTML = "";
  [...new Set(state.trades.map((trade) => trade.asset))].sort().forEach((asset) => {
    const option = document.createElement("option");
    option.value = asset;
    suggestions.appendChild(option);
  });
}

function renderAssetSummary() {
  const wrap = $("#assetSummary");
  const byType = Object.keys(typeLabels).map((type) => {
    const trades = state.trades.filter((trade) => trade.type === type);
    const pnl = sumTrades(trades);
    const wins = trades.filter((trade) => Number(trade.pnl) > 0).length;
    return { type, trades, pnl, wins };
  });
  const max = Math.max(1, ...byType.map((item) => Math.abs(item.pnl)));
  const best = byType.reduce((top, item) => (item.pnl > top.pnl ? item : top), byType[0]);
  $("#bestAsset").textContent = `${dictionary[state.lang].bestType}: ${typeLabels[best.type][state.lang]} ${money(best.pnl)}`;
  wrap.innerHTML = "";

  byType.forEach((item) => {
    const card = document.createElement("article");
    card.className = "asset-card";
    const winRate = item.trades.length ? Math.round((item.wins / item.trades.length) * 100) : 0;
    card.innerHTML = `
      <h3>${typeLabels[item.type][state.lang]}</h3>
      <strong class="${item.pnl >= 0 ? "profit" : "loss"}">${money(item.pnl)}</strong>
      <p>${item.trades.length} ${dictionary[state.lang].trades} · ${winRate}% ${dictionary[state.lang].winRate}</p>
      <div class="asset-bar"><span style="width:${Math.max(6, (Math.abs(item.pnl) / max) * 100)}%"></span></div>
    `;
    wrap.appendChild(card);
  });
}

function cumulativeByMonth(year) {
  let running = 0;
  return Array.from({ length: 12 }, (_, month) => {
    running += sumTrades(state.trades.filter((trade) => {
      const date = parseDate(trade.date);
      return date.getFullYear() === year && date.getMonth() === month;
    }));
    return running;
  });
}

function renderGrowth() {
  const years = [...new Set(state.trades.map((trade) => parseDate(trade.date).getFullYear()))].sort();
  const select = $("#baseYear");
  const previous = select.value || "all";
  select.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = `${dictionary[state.lang].baseYear}: ${dictionary[state.lang].allYears}`;
  select.appendChild(allOption);
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${dictionary[state.lang].baseYear}: ${year}`;
    select.appendChild(option);
  });
  select.value = previous === "all" || years.includes(Number(previous)) ? previous : "all";

  const visibleYears = select.value === "all" ? years : years.filter((year) => year === Number(select.value));
  drawGrowthChart(visibleYears);
  renderYearCards(visibleYears);
}

function niceStep(range, tickCount = 5) {
  if (!Number.isFinite(range) || range <= 0) return 1;
  const rawStep = range / tickCount;
  const power = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / power;
  if (normalized <= 1) return power;
  if (normalized <= 2) return 2 * power;
  if (normalized <= 5) return 5 * power;
  return 10 * power;
}

function compactMoney(value) {
  const absolute = Math.abs(value);
  if (absolute >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (absolute >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return money(value).replace(".00", "");
}

function drawGrowthChart(years) {
  const canvas = $("#growthChart");
  const ctx = canvas.getContext("2d");
  const bounds = canvas.getBoundingClientRect();
  const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  const width = Math.round(bounds.width || 1000);
  const height = Math.round(bounds.height || 420);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const locale = state.lang === "th" ? "th-TH" : "en-US";
  const monthLabels = Array.from({ length: 12 }, (_, month) =>
    new Date(2024, month, 1).toLocaleDateString(locale, { month: "short" })
  );

  if (!years.length) {
    ctx.fillStyle = "#17201b";
    ctx.textAlign = "left";
    ctx.font = "700 22px sans-serif";
    ctx.fillText(dictionary[state.lang].chartTitle, 38, 42);
    ctx.fillStyle = "#66736b";
    ctx.textAlign = "center";
    ctx.font = "18px sans-serif";
    ctx.fillText(dictionary[state.lang].noTrades, width / 2, height / 2);
    return;
  }

  const series = years.map((year) => ({ year, values: cumulativeByMonth(year) }));
  const values = series.flatMap((item) => item.values);
  const rawMin = Math.min(0, ...values);
  const rawMax = Math.max(0, ...values);
  const step = niceStep(rawMax - rawMin || Math.max(Math.abs(rawMax), 1));
  let min = Math.floor(rawMin / step) * step;
  let max = Math.ceil(rawMax / step) * step;
  if (rawMax >= 0) max += step;
  if (rawMin < 0) min -= step;
  if (min === max) {
    min -= step;
    max += step;
  }
  const span = max - min;
  const chart = {
    left: 88,
    right: width - 92,
    top: 78,
    bottom: height - 66
  };
  const plotWidth = chart.right - chart.left;
  const plotHeight = chart.bottom - chart.top;
  const colors = ["#2364aa", "#0f8a5f", "#b87514", "#bd3a3a", "#6b5ca5"];

  ctx.fillStyle = "#17201b";
  ctx.textAlign = "left";
  ctx.font = "700 22px sans-serif";
  ctx.fillText(dictionary[state.lang].chartTitle, 38, 42);

  ctx.fillStyle = "#66736b";
  ctx.font = "13px sans-serif";
  ctx.fillText(dictionary[state.lang].cumulativePnl, chart.left, 62);

  ctx.strokeStyle = "#dfe5dc";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#66736b";
  ctx.textAlign = "right";
  ctx.font = "12px sans-serif";
  for (let value = min; value <= max + step * 0.5; value += step) {
    const y = chart.bottom - ((value - min) / span) * plotHeight;
    ctx.beginPath();
    ctx.moveTo(chart.left, y);
    ctx.lineTo(chart.right, y);
    ctx.stroke();
    ctx.fillText(compactMoney(value), chart.left - 12, y + 4);
    if (Math.abs(value) < step / 1000) {
      ctx.save();
      ctx.strokeStyle = "#9ca89f";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(chart.left, y);
      ctx.lineTo(chart.right, y);
      ctx.stroke();
      ctx.restore();
    }
  }

  ctx.strokeStyle = "#9ca89f";
  ctx.beginPath();
  ctx.moveTo(chart.left, chart.top);
  ctx.lineTo(chart.left, chart.bottom);
  ctx.lineTo(chart.right, chart.bottom);
  ctx.stroke();

  ctx.fillStyle = "#66736b";
  ctx.textAlign = "center";
  ctx.font = "12px sans-serif";
  monthLabels.forEach((label, month) => {
    const x = chart.left + (plotWidth / 11) * month;
    ctx.fillText(label, x, chart.bottom + 24);
  });
  ctx.font = "13px sans-serif";
  ctx.fillText(dictionary[state.lang].monthAxis, chart.left + plotWidth / 2, height - 14);

  const pointFor = (value, month) => ({
    x: chart.left + (plotWidth / 11) * month,
    y: chart.bottom - ((value - min) / span) * plotHeight
  });

  const legendStartX = chart.left + 260;
  const legendY = 56;
  series.forEach((item, index) => {
    const color = colors[index % colors.length];
    const x = legendStartX + index * 92;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, legendY - 3, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = "left";
    ctx.font = "700 13px sans-serif";
    ctx.fillText(String(item.year), x + 12, legendY + 2);
  });

  series.forEach((item, index) => {
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = 3;
    ctx.beginPath();
    item.values.forEach((value, month) => {
      const point = pointFor(value, month);
      if (month === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    const last = item.values[item.values.length - 1];
    const point = pointFor(last, 11);
    ctx.fillStyle = colors[index % colors.length];
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = "left";
    ctx.font = "700 13px sans-serif";
    ctx.fillText(String(item.year), point.x + 14, Math.max(chart.top + 5, Math.min(chart.bottom, point.y)));
  });
}

function renderYearCards(years) {
  const wrap = $("#yearCards");
  wrap.innerHTML = years.length ? "" : `<div class="empty-state">${dictionary[state.lang].noTrades}</div>`;
  years.forEach((year) => {
    const trades = state.trades.filter((trade) => sameYear(trade.date, year));
    const profit = sumTrades(trades.filter((trade) => Number(trade.pnl) > 0));
    const loss = Math.abs(sumTrades(trades.filter((trade) => Number(trade.pnl) < 0)));
    const factor = loss ? (profit / loss).toFixed(2) : profit ? "∞" : "0.00";
    const card = document.createElement("article");
    card.className = "year-card";
    card.innerHTML = `
      <h3>${year}</h3>
      <strong class="${sumTrades(trades) >= 0 ? "profit" : "loss"}">${money(sumTrades(trades))}</strong>
      <p>${trades.length} ${dictionary[state.lang].trades}</p>
      <p>${dictionary[state.lang].grossProfit}: ${money(profit)} · ${dictionary[state.lang].grossLoss}: ${money(loss)}</p>
      <p>${dictionary[state.lang].profitFactor}: <strong>${factor}</strong></p>
    `;
    wrap.appendChild(card);
  });
}

async function backupToGoogleSheet() {
  if (isServerMode()) {
    await backupToConnectedGoogleSheet();
    return;
  }
  await backupToAppsScript();
}

async function backupToConnectedGoogleSheet() {
  saveTrades();
  if (!state.google.connected) {
    showStatus("backupNeedsGoogle");
    window.location.href = "/api/auth/google/start";
    return;
  }

  const backedUpAt = new Date().toISOString();
  const payload = backupPayload(backedUpAt);

  try {
    const result = await apiJson("/api/sheets/backup", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    localStorage.setItem(LAST_BACKUP_KEY, result.backedUpAt || backedUpAt);
    state.google = {
      ...state.google,
      connected: true,
      spreadsheetId: result.spreadsheetId || state.google.spreadsheetId,
      spreadsheetUrl: result.spreadsheetUrl || state.google.spreadsheetUrl
    };
    renderBackupTime();
    renderGoogleStatus();
    showStatus("backupReady");
  } catch (error) {
    if (error.status === 401) {
      window.location.href = "/api/auth/google/start";
      return;
    }
    showStatus("backupFailed");
  }
}

async function backupToAppsScript() {
  saveTrades();
  let endpoint = localStorage.getItem(SHEET_WEB_APP_KEY) || "";
  if (endpoint && !isAppsScriptWebAppUrl(endpoint)) {
    localStorage.removeItem(SHEET_WEB_APP_KEY);
    endpoint = "";
    showStatus("invalidBackupUrl");
  }
  if (!endpoint) {
    endpoint = window.prompt(dictionary[state.lang].sheetPrompt, "");
    if (!endpoint) return;
    endpoint = endpoint.trim();
    if (!isAppsScriptWebAppUrl(endpoint)) {
      localStorage.removeItem(SHEET_WEB_APP_KEY);
      showStatus("invalidBackupUrl");
      return;
    }
    localStorage.setItem(SHEET_WEB_APP_KEY, endpoint);
  }

  const backedUpAt = new Date().toISOString();
  const payload = backupPayload(backedUpAt);

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    localStorage.setItem(LAST_BACKUP_KEY, backedUpAt);
    renderBackupTime();
    showStatus("backupReady");
  } catch {
    localStorage.removeItem(SHEET_WEB_APP_KEY);
    showStatus("backupFailed");
  }
}

function render() {
  setLanguage(state.lang);
  switchView(state.view);
  renderMonthControl();
  renderMetrics();
  renderCalendar();
  renderRecentTrades();
  renderRows();
  renderAssetSuggestions();
  renderAssetSummary();
  renderGrowth();
  renderBackupTime();
  renderGoogleStatus();
  setTradeFormMode();
}

function bindEvents() {
  $$(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $$("[data-switch]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.switch)));
  $$(".language-option").forEach((button) => button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    render();
  }));
  $("#prevMonth").addEventListener("click", () => {
    state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() - 1, 1);
    render();
  });
  $("#nextMonth").addEventListener("click", () => {
    state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() + 1, 1);
    render();
  });
  $("#baseYear").addEventListener("change", renderGrowth);
  $("#googleConnect").addEventListener("click", () => {
    if (!isServerMode()) return;
    window.location.href = state.google.connected ? "/api/auth/logout" : "/api/auth/google/start";
  });
  $("#tradeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const tradeData = {
      date: $("#tradeDate").value,
      asset: $("#tradeAsset").value.trim().toUpperCase(),
      type: $("#tradeType").value,
      pnl: Number($("#tradePnl").value),
      notes: $("#tradeNotes").value.trim()
    };
    if (state.editingTradeId) {
      state.trades = state.trades.map((trade) => (
        trade.id === state.editingTradeId ? { ...trade, ...tradeData } : trade
      ));
    } else {
      state.trades.push({
        id: crypto.randomUUID(),
        ...tradeData
      });
    }
    saveTrades();
    resetTradeForm(event.target);
    render();
  });
  $("#tradeForm").addEventListener("reset", () => {
    window.setTimeout(() => resetTradeForm($("#tradeForm"), false), 0);
  });
  $("#tradeRows").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const trade = state.trades.find((item) => item.id === button.dataset.id);
    if (!trade) return;
    if (button.dataset.action === "edit") {
      event.preventDefault();
      fillTradeForm(trade);
      return;
    }
    if (state.editingTradeId === trade.id) {
      resetTradeForm();
    }
    state.trades = state.trades.filter((item) => item.id !== trade.id);
    saveTrades();
    render();
  });
  $("#clearTrades").addEventListener("click", () => {
    state.trades = [];
    resetTradeForm();
    saveTrades();
    render();
  });
  $("#saveLocal").addEventListener("click", () => {
    downloadJsonBackup();
  });
  $("#backupSheet").addEventListener("click", backupToGoogleSheet);
  $("#importBackup").addEventListener("click", () => {
    $("#backupFile").click();
  });
  $("#backupFile").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importJsonBackup(file);
    event.target.value = "";
  });
}

bindEvents();
$("#tradeDate").value = dateKey(new Date());
render();
refreshGoogleStatus();
