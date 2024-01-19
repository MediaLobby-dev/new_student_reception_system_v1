// メニューに起動ボタンを追加
function onOpen():void {
  SpreadsheetApp.getUi()
      .createMenu("新入生受付システム")
      .addItem("起動", "showModal")
      .addToUi();
}

// モーダルダイアログを表示
function showModal():void {
  const container: GoogleAppsScript.HTML.HtmlOutput = HtmlService.createHtmlOutputFromFile("webpanel/index.html").setWidth(1200).setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(container, "新入生受付システム");
}

// ======================================================================================
// 型定義
// ======================================================================================
interface StudentData { // 学生データ
  studentId: string;
  studentName: string;
  pseudonym: string;
  department: string;
  remarks: string;
  dataPosition: {
    row: number;
    column: number;
  };
}


// ======================================================================================
// 以下がバックエンド処理関数群
// ======================================================================================

// スプシ上のデータを走査して、該当するデータをWebPanel側に返す関数 (TODO: @sage)
function getStudentData(studentId: string): StudentData {
  
  // 学籍番号のバリデーション

  // 走査処理

  
  return { 
    studentId: studentId,
    studentName: "山田太郎",
    department: "情報工学科",
    remarks: "特になし",
    dataPosition: {
      row: 2,
      column: 3
    }
  };
}

// Webパネルから受け取った位置情報の行の色を変更する関数 (TODO: @sage)
function fillingLine({row, column}: {row: number, column: number}): string {
  
  // 位置を特定

  // 塗りつぶし

  return "success";
}

