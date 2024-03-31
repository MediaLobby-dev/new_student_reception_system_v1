// シート名
const SHEET_NAME = "新入生DB";

// 学生データ型
type StudentData = {
  studentId: string; // 学籍番号
  studentName: string; // 氏名
  kana: string; // カナ
  department: string; // 学科
  remarks: string; // 備考欄
  supply: string; // サプライ品購入状況
  isDeprecatedPC: boolean; // 非推奨PCフラグ
  isNeedNotify: boolean; // 案内所要フラグ
  receptionStatus: boolean; // 受付状況
}

// キャッシュストア型
type CacheStore = {
  get: (key: string) => string | null;
  put: (key: string, value: string) => void;
  remove: (key: string) => void;
}

// ======================================================================================
// GAS依存関数群
// ======================================================================================

// メニューに起動ボタンを追加
function onOpen(): void {
  SpreadsheetApp.getUi()
    .createMenu("新入生受付システム")
    .addItem("起動", "showModal")
    .addToUi();
}

// モーダルダイアログを表示
function showModal(): void {
  const container: GoogleAppsScript.HTML.HtmlOutput = HtmlService.createHtmlOutputFromFile("webpanel/index.html").setWidth(1300).setHeight(1000);
  SpreadsheetApp.getUi().showModalDialog(container, "新入生受付システム");
}

// プリントサービス
function doGet(e): GoogleAppsScript.HTML.HtmlOutput {
  const printPage: GoogleAppsScript.HTML.HtmlTemplate = HtmlService.createTemplateFromFile("printPage/index.html")
  const { studentId, studentName, kana } = e.parameter;
  printPage.studentId = studentId;
  printPage.studentName = studentName;
  printPage.kana = kana;
  printPage.timestamp = new Date().toLocaleString();
  return printPage.evaluate();
}

// シート名チェック
const getActiveSheet = (): GoogleAppsScript.Spreadsheet.Sheet => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (sheet === null) {
    throw new Error("[Error] シート名が誤っています。処理を行いたいシートの名称を「新入生DB」に設定してください。");
  }

  return sheet;
}

// キャッシュストア
const cacheStore = (): CacheStore => {
  const cache = CacheService.getScriptCache();
  return {
    get: (key: string) => {
      return cache.get(key);
    },
    put: (key: string, value: string) => {
      cache.put(key, value);
    },
    remove: (key: string) => {
      cache.remove(key);
    }
  }
}

// ======================================================================================

// ======================================================================================
// 以下がバックエンド処理関数群
// ======================================================================================

// 事前にデータをキャッシュする関数
function cacheStudentData(): void {
  const sheet = getActiveSheet();
  const lastRow = sheet.getLastRow() - 1;
  const db = sheet.getRange(2, 1, lastRow, 9).getValues();

  const cache = cacheStore();
  cache.put("studentData", JSON.stringify(db));
  cache.put("lastRow", lastRow.toString());
}


// スプシ上のデータを走査して、該当するデータをWebPanel側に返す関数 (TODO: @sage)
function getStudentData(studentId: string): StudentData | null {
  const cache = cacheStore();

  // 取得結果のキャッシュ
  if (cache.get("studentData") === null || cache.get("lastRow") === null) {
    cacheStudentData();
  }

  const db = JSON.parse(cache.get("studentData") as string);
  const lastRow = db.length - 1;

  const studentData: StudentData = {
    studentId: "",
    studentName: "",
    department: "",
    kana: "",
    remarks: "",
    supply: "",
    isDeprecatedPC: false,
    isNeedNotify: false,
    receptionStatus: false,
  };

  for (let i = 0; i < lastRow; i++) {
    if (db[i][0] === studentId) {
      studentData.studentId = db[i][0];
      studentData.studentName = db[i][1];
      studentData.kana = db[i][2];
      studentData.department = db[i][3];
      studentData.remarks = db[i][4];
      studentData.supply = db[i][5];

      // 受付済みの場合
      if (db[i][6] !== "") {
        studentData.receptionStatus = true;
      }

      // 非推奨判定
      if (db[i][7] !== "") {
        studentData.isDeprecatedPC = true;
      }

      // 案内所要フラグ
      if (db[i][8] !== "") {
        studentData.isNeedNotify = true;
      }
    }
  }
  // 該当するデータがなかった場合
  if (studentData.studentId === "") {
    return null;
  }
  else {
    return studentData;
  }
}

// Webパネルから受け取った位置情報の行の色を変更する関数 (TODO: @sage)
function make_accepted_processing(studentId: string): boolean {
  const sheet = getActiveSheet();

  // キャッシュからデータを取得
  const cache = cacheStore();
  const db = JSON.parse(cache.get("studentData") as string);

  const lastRow = db.length - 1;

  // 走査結果
  let status: boolean = false;

  for (let i = 0; i <= lastRow; i++) {
    if (db[i][0] === studentId) {
      sheet.getRange(i + 2, 7).setValue("受付済み"); // 該当者の受付状況を「受付済み」に変更
      sheet.getRange(i + 2, 1, 1, 7).setBackground("#bce2e8"); // 受付完了者の行の背景色を緑に変更
      status = true;
    }
  }

  return status;
}

// 備考欄の編集を行う関数
function editRemarks(studentId: string, remarks: string): boolean {
  const sheet = getActiveSheet();

  // キャッシュからデータを取得
  const cache = cacheStore();
  const db = JSON.parse(cache.get("studentData") as string);

  const lastRow = db.length - 1;

  // 走査結果
  let status: boolean = false;

  for (let i = 0; i <= lastRow; i++) {
    if (db[i][0] === studentId) {
      sheet.getRange(i + 2, 5).setValue(remarks); // 該当者の備考欄を編集
      status = true;
    }
  }

  return status;
}

// 受付をキャンセルする関数
function cancelReception(studentId: string): boolean {
  const sheet = getActiveSheet();

  // キャッシュからデータを取得
  const cache = cacheStore();
  const db = JSON.parse(cache.get("studentData") as string);

  const lastRow = db.length - 1;

  // 走査結果
  let status: boolean = false;

  for (let i = 0; i <= lastRow; i++) {
    if (db[i][0] === studentId) {
      sheet.getRange(i + 2, 7).setValue(""); // 該当者の受付状況を「」に変更
      sheet.getRange(i + 2, 1, 1, 7).setBackground("#ffffff"); // 受付完了者の行の背景色を白に変更
      status = true;
    }
  }

  return status;
}
