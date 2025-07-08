function doGet(e) {
  return ContentService.createTextOutput("Hello from Web App!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var result = {};
  try {
    var sheet = SpreadsheetApp.openById('INSERT_YOUR_SHEET_ID_HERE').getSheetByName('Sheet1');
    var data = e.parameter;
    var fileUrl = '';
    // If screenshot is sent as base64 string
    if (data.screenshot && data.screenshot.length > 0 && data.screenshotType && data.screenshotName) {
      var blob = Utilities.newBlob(Utilities.base64Decode(data.screenshot), data.screenshotType, data.screenshotName);
      var file = DriveApp.getFolderById('INSERT_YOUR_DRIVE_FOLDER_ID_HERE').createFile(blob);
      fileUrl = file.getUrl();
    }
    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.email,
      data.college,
      data.department,
      fileUrl
    ]);
    result.success = true;
  } catch (err) {
    result.success = false;
    result.message = err.message;
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
} 