import { make_accepted_processing } from "./gas"

// レシートプリント
export async function printRecipt(studentId: string, studentName: string, kana: string, success: () => void) {
    // プリントページを開く
    const printPage = window.open(`https://script.google.com/macros/s/${import.meta.env.VITE_PRINT_SERVICE_DEPLOY_ID}/exec?studentId=${studentId}&studentName=${studentName}&kana=${kana}`, "印刷ページ", "popup")

    // GASで行塗りつぶしの受付処理を行う
    const res = await make_accepted_processing(studentId)

    if (res === false) {
        alert("[Error] 受付処理(GAS側)の最中にエラーが発生しました。")
    }

    setTimeout(() => {
        if (printPage?.closed) {
            alert("プリントページが閉じられました。")
        }else{
            printPage?.close()
        }
        success()
    }, 3000)
}

export function printTest() {
    const printPage = window.open(`https://script.google.com/macros/s/${import.meta.env.VITE_PRINT_SERVICE_DEPLOY_ID}/exec?studentId=1234567890&studentName=テスト&kana=テスト`, "印刷ページ", "popup")
    setTimeout(() => {
        if (printPage?.closed) {
            alert("プリントページが閉じられました。")
        }else{
            printPage?.close()
        }
    }, 3000)
}
