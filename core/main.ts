// メニューに起動ボタンを追加
function onOpen():void {
  SpreadsheetApp.getUi()
      .createMenu("新入生受付システム")
      .addItem("起動", "showModal")
      .addToUi();
}

function showModal():void {
  const container: GoogleAppsScript.HTML.HtmlOutput = HtmlService.createHtmlOutputFromFile("webpanel/index.html").setWidth(1200).setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(container, "新入生受付システム");
}
