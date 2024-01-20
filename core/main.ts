// メニューに起動ボタンを追加
function onOpen(): void {
  SpreadsheetApp.getUi()
    .createMenu("新入生受付システム")
    .addItem("起動", "showModal")
    .addToUi();
}

// モーダルダイアログを表示
function showModal(): void {
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
  };
}


// ======================================================================================
// 以下がバックエンド処理関数群
// ======================================================================================

// スプシ上のデータを走査して、該当するデータをWebPanel側に返す関数 (TODO: @sage)
function getStudentData(studentId: string): StudentData | null {

  // 学籍番号のバリデーション

  // 走査処理

  // アクティブシートの取得
  const mainsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');

  if (mainsheet === null) return null;

  //シートの行数をA列で数える
  const sprt_values = mainsheet.getRange('A:A').getValues();
  //空白の要素を除いた長さを取得
  const sprt_lastrow = sprt_values.filter(String).length;

  const studentIDColumn = 1;
  const namelColumn = 2;
  const furiganaColumn = 3;
  const facultyColumn = 4;
  const remarksColumn = 5;

  const studentData: StudentData = {
    studentId: "",
    studentName: "",
    department: "",
    pseudonym: "",
    remarks: "",
    dataPosition: {
      row: 0
    }
  };

  for (let i = 1; i <= sprt_lastrow; i++) {
    if (mainsheet.getRange(i, 1).getValue() === studentId) {
      studentData.dataPosition.row = i;
      studentData.studentId = mainsheet.getRange(i, studentIDColumn).getValue();
      studentData.studentName = mainsheet.getRange(i, namelColumn).getValue();
      studentData.pseudonym = mainsheet.getRange(i, furiganaColumn).getValue();
      studentData.department = mainsheet.getRange(i, facultyColumn).getValue();
      studentData.remarks = mainsheet.getRange(i, remarksColumn).getValue();
    }
  }

  return studentData;
}

// Webパネルから受け取った位置情報の行の色を変更する関数 (TODO: @sage)
function fillingLine({ row, column }: { row: number, column: number }): string {

  // 位置を特定

  // 塗りつぶし

  return "success";
}

