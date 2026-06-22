const SHEET_NAME = "Trade Daily Backup";
const SPREADSHEET_ID = "1J8bAqJpRJ0Lm0I8f_5ob9L6vEz3c4NEdYzhEZ-qECb4";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  const trades = Array.isArray(payload.trades) ? payload.trades : [];
  const sheet = getBackupSheet_();

  sheet.clearContents();
  sheet.getRange(1, 1, 1, 7).setValues([[
    "Backup Time",
    "Date",
    "Asset",
    "Asset Type",
    "PnL",
    "Notes",
    "Trade ID"
  ]]);

  if (trades.length) {
    const rows = trades.map((trade) => [
      payload.backedUpAt || new Date().toISOString(),
      trade.date || "",
      trade.asset || "",
      trade.type || "",
      Number(trade.pnl || 0),
      trade.notes || "",
      trade.id || ""
    ]);
    sheet.getRange(2, 1, rows.length, 7).setValues(rows);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, rows: trades.length }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getBackupSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}
